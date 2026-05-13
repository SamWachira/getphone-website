FROM python:3.11-slim

WORKDIR /app

# Install dependencies first for better Docker layer caching
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Security: Run as non-root user to limit container escape impact (L1)
RUN adduser --disabled-password --gecos '' --no-create-home appuser
USER appuser

# Cloud Run provides the PORT environment variable
CMD exec uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8080}
