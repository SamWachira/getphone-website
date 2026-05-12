# Deployment Guide — Getphone Bundle Provisioning System

This guide walks through every step to deploy the backend and connect it to the frontend.

## Prerequisites

- Google Cloud CLI (`gcloud`) installed and authenticated
- Access to the `getphone-website` GCP project
- Hormuud API credentials (username + password)

---

## Step 1: Set Your Project

```bash
gcloud config set project getphone-website
```

## Step 2: Create Cloud SQL PostgreSQL Instance

```bash
gcloud sql instances create getphone-bundles-db \
  --database-version=POSTGRES_15 \
  --tier=db-f1-micro \
  --region=us-central1
```

This takes 3–5 minutes.

## Step 3: Create Database and User

```bash
# Create the database
gcloud sql databases create getphone_bundles \
  --instance=getphone-bundles-db

# Create the database user (replace YOUR_DB_PASSWORD with a strong password)
gcloud sql users create getphone_app \
  --instance=getphone-bundles-db \
  --password="YOUR_DB_PASSWORD"
```

**Save this password** — you'll need it for the DATABASE_URL secret.

## Step 4: Store Secrets in Secret Manager

```bash
# Hormuud API username
echo -n "YOUR_HORMUUD_USERNAME" | gcloud secrets create hormuud-username --data-file=-

# Hormuud API password
echo -n "YOUR_HORMUUD_PASSWORD" | gcloud secrets create hormuud-password --data-file=-

# Database URL (replace YOUR_DB_PASSWORD with the password from Step 3)
echo -n "postgresql://getphone_app:YOUR_DB_PASSWORD@/getphone_bundles?host=/cloudsql/getphone-website:us-central1:getphone-bundles-db" | gcloud secrets create database-url --data-file=-

# Scheduler secret (generate a random string)
echo -n "$(openssl rand -hex 32)" | gcloud secrets create scheduler-secret --data-file=-
```

**Important**: Save the scheduler secret value. You'll need it for Cloud Scheduler.

To retrieve it later:
```bash
gcloud secrets versions access latest --secret=scheduler-secret
```

## Step 5: Initial Deploy to Cloud Run

From the repo root directory:

```bash
gcloud run deploy getphone-bundles-api \
  --source ./getphone-bundles-backend \
  --region us-central1 \
  --allow-unauthenticated \
  --add-cloudsql-instances getphone-website:us-central1:getphone-bundles-db \
  --set-secrets DATABASE_URL=database-url:latest,HORMUUD_USERNAME=hormuud-username:latest,HORMUUD_PASSWORD=hormuud-password:latest,SCHEDULER_SECRET=scheduler-secret:latest \
  --set-env-vars HORMUUD_BASE_URL=https://hintegrations.hormuud.com/api,OFFER_ID=getPhone_24hours_0.25USD,PRODUCT_ID=3000060,SAFETY_GUARD_HOURS=6,TIMEZONE=Africa/Mogadishu,CORS_ORIGINS=https://getphone-website.web.app,https://getphone-website.firebaseapp.com
```

After deployment, note the **Service URL** printed (e.g., `https://getphone-bundles-api-xxxxx-uc.a.run.app`).

**Verify it's running:**
```bash
curl https://YOUR_CLOUD_RUN_URL/health
# Should return: {"status":"ok"}
```

## Step 6: Run Database Migration

```bash
gcloud sql connect getphone-bundles-db --user=getphone_app
```

When prompted for password, enter the DB password from Step 3. Then paste the contents of `getphone-bundles-backend/migrations/init.sql` and press Enter.

Type `\q` to exit.

## Step 7: Create Cloud Scheduler Job

```bash
# First, retrieve the scheduler secret
SCHEDULER_SECRET=$(gcloud secrets versions access latest --secret=scheduler-secret)

# Create the job
gcloud scheduler jobs create http provision-daily-bundles \
  --schedule="0 0 * * *" \
  --uri="https://YOUR_CLOUD_RUN_URL/jobs/provision-daily" \
  --http-method=POST \
  --headers="X-Scheduler-Secret=$SCHEDULER_SECRET" \
  --time-zone="Africa/Mogadishu" \
  --location=us-central1
```

Replace `YOUR_CLOUD_RUN_URL` with the actual Cloud Run service URL from Step 5.

## Step 8: Update Frontend API URL

Edit `src/app/admin/bundles/page.tsx` and replace:
```typescript
const API_BASE = "https://YOUR_CLOUD_RUN_URL";
```
with your actual Cloud Run URL.

Then push to `main` — GitHub Actions will auto-deploy the website.

## Step 9: Set Up Workload Identity Federation (for GitHub Actions CI/CD)

This is a one-time setup that allows GitHub Actions to deploy to Cloud Run without long-lived keys.

```bash
# Create a service account
gcloud iam service-accounts create github-deployer \
  --display-name="GitHub Actions Deployer"

# Grant Cloud Run deployer role
gcloud projects add-iam-policy-binding getphone-website \
  --member="serviceAccount:github-deployer@getphone-website.iam.gserviceaccount.com" \
  --role="roles/run.admin"

# Grant Cloud Build permissions
gcloud projects add-iam-policy-binding getphone-website \
  --member="serviceAccount:github-deployer@getphone-website.iam.gserviceaccount.com" \
  --role="roles/cloudbuild.builds.builder"

# Grant Artifact Registry permissions
gcloud projects add-iam-policy-binding getphone-website \
  --member="serviceAccount:github-deployer@getphone-website.iam.gserviceaccount.com" \
  --role="roles/artifactregistry.writer"

# Grant Secret Manager access
gcloud projects add-iam-policy-binding getphone-website \
  --member="serviceAccount:github-deployer@getphone-website.iam.gserviceaccount.com" \
  --role="roles/secretmanager.secretAccessor"

# Grant Cloud SQL client
gcloud projects add-iam-policy-binding getphone-website \
  --member="serviceAccount:github-deployer@getphone-website.iam.gserviceaccount.com" \
  --role="roles/cloudsql.client"

# Grant Service Account User (needed for Cloud Run)
gcloud projects add-iam-policy-binding getphone-website \
  --member="serviceAccount:github-deployer@getphone-website.iam.gserviceaccount.com" \
  --role="roles/iam.serviceAccountUser"

# Create Workload Identity Pool
gcloud iam workload-identity-pools create github-pool \
  --location="global" \
  --display-name="GitHub Actions Pool"

# Create OIDC Provider
gcloud iam workload-identity-pools providers create-oidc github-provider \
  --location="global" \
  --workload-identity-pool="github-pool" \
  --display-name="GitHub Provider" \
  --attribute-mapping="google.subject=assertion.sub,attribute.repository=assertion.repository" \
  --issuer-uri="https://token.actions.githubusercontent.com"

# Allow GitHub repo to impersonate the service account
# Replace YOUR_GITHUB_ORG/YOUR_REPO with your actual repo (e.g., SamWachira/getphone-website)
gcloud iam service-accounts add-iam-policy-binding \
  github-deployer@getphone-website.iam.gserviceaccount.com \
  --role="roles/iam.workloadIdentityUser" \
  --member="principalSet://iam.googleapis.com/projects/577769500526/locations/global/workloadIdentityPools/github-pool/attribute.repository/YOUR_GITHUB_ORG/YOUR_REPO"
```

## Step 10: Add GitHub Secrets

Go to your GitHub repo → Settings → Secrets and variables → Actions → New repository secret.

Add these secrets:

| Secret Name | Value |
|---|---|
| `GCP_PROJECT_ID` | `getphone-website` |
| `GCP_SA_EMAIL` | `github-deployer@getphone-website.iam.gserviceaccount.com` |
| `GCP_WORKLOAD_IDENTITY_PROVIDER` | `projects/577769500526/locations/global/workloadIdentityPools/github-pool/providers/github-provider` |

## Step 11: Smoke Test

1. Open `https://yoursite.com/admin/bundles/`
2. Log in with `info@getphonelimited.com`
3. Add a test Hormuud number
4. Verify the dashboard updates
5. Check the Logs tab for the API call record
6. Test Retry, Pause, Resume, Stop actions

## Step 12: Test Cloud Scheduler

To manually trigger the scheduler (without waiting until midnight):

```bash
gcloud scheduler jobs run provision-daily-bundles --location=us-central1
```

Check the Logs tab in the admin page to verify it ran.
