"use client";

import { useState, useEffect, useCallback } from "react";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

// ── Configuration ────────────────────────────────────────────────────
// Replace with your Cloud Run URL after deployment
const API_BASE = "https://getphone-bundles-api-577769500526.us-central1.run.app";

// ── Types ────────────────────────────────────────────────────────────
interface BundleNumber {
  mobile_number: string;
  network?: string;
  status: string;
  last_attempt_at: string | null;
  last_success_at: string | null;
  next_run_at: string | null;
  failure_count: number;
  last_response_status: string | null;
  last_response_message: string | null;
  created_by: string | null;
  created_at: string | null;
}

interface DashboardData {
  active_count: number;
  paused_count: number;
  stopped_count: number;
  successful_today: number;
  failed_today: number;
  last_job_time: string | null;
}

interface LogEntry {
  id: number;
  mobile_number: string;
  network?: string;
  call_type: string;
  triggered_by: string;
  http_status: number | null;
  response_code: string | null;
  response_status: string | null;
  response_message: string | null;
  attempted_at: string | null;
}

// ── API Helper ───────────────────────────────────────────────────────
async function apiFetch(path: string, token: string, options: RequestInit = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });
  return res;
}

function fmtDate(d: string | null) {
  if (!d) return "—";
  // Backend stores UTC but Pydantic serializes without 'Z' suffix.
  // Append 'Z' so JS Date() correctly interprets it as UTC.
  const utcStr = d.endsWith("Z") || d.includes("+") ? d : d + "Z";
  return new Date(utcStr).toLocaleString("en-GB", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
    timeZone: "Africa/Mogadishu",
  });
}

// ── Status & Network Badges ──────────────────────────────────────────
function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    active: "bg-green-100 text-green-800",
    paused: "bg-amber-100 text-amber-800",
    stopped: "bg-red-100 text-red-800",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${colors[status] || "bg-gray-100 text-gray-800"}`}>
      {status}
    </span>
  );
}

function NetworkBadge({ network, number }: { network?: string; number?: string }) {
  const net = (network || (number?.startsWith("68") ? "somnet" : "hormuud")).toLowerCase();
  const isSomnet = net === "somnet";

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider ${
      isSomnet ? "bg-blue-100 text-blue-800 border border-blue-200" : "bg-emerald-100 text-emerald-800 border border-emerald-200"
    }`}>
      {isSomnet ? "Somnet" : "Hormuud"}
    </span>
  );
}

// ══════════════════════════════════════════════════════════════════════
// LOGIN SCREEN
// ══════════════════════════════════════════════════════════════════════
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onLogin();
    } catch {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="card-elevated w-full max-w-md p-8 animate-fade-in-up">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Bundle Admin</h1>
          <p className="text-sm text-gray-500 mt-1">Getphone Internal Tool</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="login-email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input id="login-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition" placeholder="Email" />
          </div>
          <div>
            <label htmlFor="login-password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <input id="login-password" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition" placeholder="Password" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition" aria-label={showPassword ? "Hide password" : "Show password"}>
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                )}
              </button>
            </div>
          </div>
          {error && <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">{error}</p>}
          <button type="submit" disabled={loading} className="btn btn-primary w-full py-3 text-base disabled:opacity-50">
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════
// MAIN ADMIN DASHBOARD
// ══════════════════════════════════════════════════════════════════════
function AdminDashboard({ user }: { user: User }) {
  const [tab, setTab] = useState<"dashboard" | "numbers" | "logs">("dashboard");
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [numbers, setNumbers] = useState<BundleNumber[]>([]);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [newNumber, setNewNumber] = useState("");
  const [addMsg, setAddMsg] = useState<{ type: "success" | "error" | "info"; text: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [logFilter, setLogFilter] = useState("");

  // ── 30-minute inactivity auto-logout ──────────────────────────────
  useEffect(() => {
    const INACTIVITY_LIMIT = 30 * 60 * 1000; // 30 minutes in ms
    let timer: ReturnType<typeof setTimeout>;

    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(() => signOut(auth), INACTIVITY_LIMIT);
    };

    const events = ["mousemove", "keydown", "scroll", "touchstart", "click"];
    events.forEach((evt) => window.addEventListener(evt, resetTimer));
    resetTimer(); // start the timer

    return () => {
      clearTimeout(timer);
      events.forEach((evt) => window.removeEventListener(evt, resetTimer));
    };
  }, []);

  const getToken = useCallback(async () => {
    return await user.getIdToken();
  }, [user]);

  // Fetch dashboard data
  const fetchDashboard = useCallback(async () => {
    try {
      const token = await getToken();
      const res = await apiFetch("/dashboard", token);
      if (res.ok) setDashboard(await res.json());
    } catch { /* ignore */ }
  }, [getToken]);

  // Fetch numbers
  const fetchNumbers = useCallback(async () => {
    try {
      const token = await getToken();
      const res = await apiFetch("/numbers", token);
      if (res.ok) setNumbers(await res.json());
    } catch { /* ignore */ }
  }, [getToken]);

  // Fetch logs
  const fetchLogs = useCallback(async () => {
    try {
      const token = await getToken();
      const path = logFilter ? `/logs?mobile_number=${encodeURIComponent(logFilter)}` : "/logs";
      const res = await apiFetch(path, token);
      if (res.ok) setLogs(await res.json());
    } catch { /* ignore */ }
  }, [getToken, logFilter]);

  useEffect(() => {
    fetchDashboard();
    fetchNumbers();
  }, [fetchDashboard, fetchNumbers]);

  useEffect(() => {
    if (tab === "logs") fetchLogs();
  }, [tab, fetchLogs]);

  // Add number
  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNumber.trim()) return;
    setLoading(true);
    setAddMsg(null);
    try {
      const token = await getToken();
      const res = await apiFetch("/numbers", token, {
        method: "POST",
        body: JSON.stringify({ mobile_number: newNumber.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setAddMsg({ type: "error", text: data.detail || "Failed to add number" });
      } else if (data.provisioning_result?.status === "exists") {
        setAddMsg({ type: "info", text: data.provisioning_result.message });
      } else if (data.provisioning_result?.status === "success") {
        setAddMsg({ type: "success", text: `Bundle activated for ${data.mobile_number}` });
        setNewNumber("");
      } else {
        setAddMsg({ type: "error", text: data.provisioning_result?.message || "Provisioning failed" });
      }
      fetchNumbers();
      fetchDashboard();
    } catch {
      setAddMsg({ type: "error", text: "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  // Number actions
  const handleAction = async (number: string, action: string, method: string = "PATCH") => {
    setActionLoading(`${number}-${action}`);
    try {
      const token = await getToken();
      await apiFetch(`/numbers/${number}/${action}`, token, { method });
      fetchNumbers();
      fetchDashboard();
    } catch { /* ignore */ }
    setActionLoading(null);
  };

  // Check offer
  const handleCheckOffer = async (number: string) => {
    setActionLoading(`${number}-offer`);
    try {
      const token = await getToken();
      const res = await apiFetch(`/numbers/${number}/offer`, token);
      const data = await res.json();
      const activeOffers = data.active_offers || [];
      if (activeOffers.length > 0) {
        alert(`Active offers for ${number}:\n\n${activeOffers.map((o: { offerName?: string; offerID?: string; subscriptionEndTime?: string }) => `• ${o.offerName || o.offerID} (expires: ${fmtDate(o.subscriptionEndTime || null)})`).join("\n")}`);
      } else {
        alert(`No active offers found for ${number}`);
      }
    } catch {
      alert("Failed to check offer. Please try again.");
    }
    setActionLoading(null);
  };

  const tabs = [
    { id: "dashboard" as const, label: "Dashboard" },
    { id: "numbers" as const, label: "Numbers" },
    { id: "logs" as const, label: "Logs" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="section-container px-4 sm:px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>
            </div>
            <h1 className="text-lg font-bold text-gray-900 hidden sm:block">Bundle Admin</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500 hidden sm:block">{user.email}</span>
            <button onClick={() => signOut(auth)} className="text-sm text-red-600 hover:text-red-800 font-medium transition">Sign Out</button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-100">
        <div className="section-container px-4 sm:px-6 flex gap-1">
          {tabs.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)} className={`px-4 py-3 text-sm font-semibold border-b-2 transition ${tab === t.id ? "border-primary text-primary" : "border-transparent text-gray-500 hover:text-gray-700"}`}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <main className="section-container px-4 sm:px-6 py-6">
        {/* ── Dashboard Tab ─────────────────────────────── */}
        {tab === "dashboard" && (
          <div className="space-y-6 animate-fade-in">
            {/* Metric Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { label: "Active Numbers", value: dashboard?.active_count ?? "—", color: "text-green-600", bg: "bg-green-50" },
                { label: "Paused", value: dashboard?.paused_count ?? "—", color: "text-amber-600", bg: "bg-amber-50" },
                { label: "Stopped", value: dashboard?.stopped_count ?? "—", color: "text-red-600", bg: "bg-red-50" },
                { label: "Successful Today", value: dashboard?.successful_today ?? "—", color: "text-primary", bg: "bg-blue-50" },
                { label: "Failed Today", value: dashboard?.failed_today ?? "—", color: "text-red-600", bg: "bg-red-50" },
                { label: "Last Scheduler Run", value: fmtDate(dashboard?.last_job_time ?? null), color: "text-gray-700", bg: "bg-gray-50", isText: true },
              ].map((m) => (
                <div key={m.label} className={`${m.bg} rounded-xl p-4 sm:p-5`}>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">{m.label}</p>
                  <p className={`${("isText" in m) ? "text-sm" : "text-2xl sm:text-3xl"} font-bold ${m.color}`}>{m.value}</p>
                </div>
              ))}
            </div>

            {/* Quick Add */}
            <div className="card-elevated p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Add Customer Number</h2>
              <form onSubmit={handleAdd} className="flex flex-col sm:flex-row gap-3">
                <input type="text" value={newNumber} onChange={(e) => setNewNumber(e.target.value)} placeholder="e.g. 610000000" className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition text-base" required />
                <button type="submit" disabled={loading} className="btn btn-primary py-3 px-8 disabled:opacity-50 whitespace-nowrap">
                  {loading ? "Adding..." : "Add & Provision"}
                </button>
              </form>
              {addMsg && (
                <div className={`mt-3 p-3 rounded-lg text-sm ${addMsg.type === "success" ? "bg-green-50 text-green-800" : addMsg.type === "error" ? "bg-red-50 text-red-800" : "bg-blue-50 text-blue-800"}`}>
                  {addMsg.text}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── Numbers Tab ───────────────────────────────── */}
        {tab === "numbers" && (
          <div className="space-y-4 animate-fade-in">
            {/* Add Form */}
            <div className="card p-4">
              <form onSubmit={handleAdd} className="flex flex-col sm:flex-row gap-3">
                <input type="text" value={newNumber} onChange={(e) => setNewNumber(e.target.value)} placeholder="Add new number, e.g. 610000000" className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition" required />
                <button type="submit" disabled={loading} className="btn btn-primary py-2.5 px-6 disabled:opacity-50 text-sm">
                  {loading ? "Adding..." : "Add & Provision"}
                </button>
              </form>
              {addMsg && (
                <div className={`mt-3 p-3 rounded-lg text-sm ${addMsg.type === "success" ? "bg-green-50 text-green-800" : addMsg.type === "error" ? "bg-red-50 text-red-800" : "bg-blue-50 text-blue-800"}`}>
                  {addMsg.text}
                </div>
              )}
            </div>

            {/* Numbers Table */}
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="text-left px-4 py-3 font-semibold text-gray-600">Number</th>
                      <th className="text-left px-4 py-3 font-semibold text-gray-600">Network</th>
                      <th className="text-left px-4 py-3 font-semibold text-gray-600">Status</th>
                      <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden md:table-cell">Last Success</th>
                      <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden lg:table-cell">Next Run</th>
                      <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden lg:table-cell">Fails</th>
                      <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden xl:table-cell">Last Response</th>
                      <th className="text-right px-4 py-3 font-semibold text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {numbers.map((n) => (
                      <tr key={n.mobile_number} className="hover:bg-gray-50/50 transition">
                        <td className="px-4 py-3 font-mono font-medium text-gray-900">{n.mobile_number}</td>
                        <td className="px-4 py-3"><NetworkBadge network={n.network} number={n.mobile_number} /></td>
                        <td className="px-4 py-3"><StatusBadge status={n.status} /></td>
                        <td className="px-4 py-3 text-gray-500 hidden md:table-cell">{fmtDate(n.last_success_at)}</td>
                        <td className="px-4 py-3 text-gray-500 hidden lg:table-cell">{fmtDate(n.next_run_at)}</td>
                        <td className="px-4 py-3 hidden lg:table-cell">
                          <span className={n.failure_count > 0 ? "text-red-600 font-semibold" : "text-gray-400"}>{n.failure_count}</span>
                        </td>
                        <td className="px-4 py-3 text-gray-500 hidden xl:table-cell max-w-[200px] truncate">{n.last_response_message || "—"}</td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-1 flex-wrap">
                            <button onClick={() => handleAction(n.mobile_number, "retry", "POST")} disabled={actionLoading === `${n.mobile_number}-retry`} className="px-2.5 py-1 text-xs font-medium rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition disabled:opacity-50" title="Retry">
                              Retry
                            </button>
                            {n.status === "active" && (
                              <button onClick={() => handleAction(n.mobile_number, "pause")} disabled={actionLoading === `${n.mobile_number}-pause`} className="px-2.5 py-1 text-xs font-medium rounded-lg bg-amber-100 text-amber-700 hover:bg-amber-200 transition disabled:opacity-50" title="Pause">
                                Pause
                              </button>
                            )}
                            {n.status === "paused" && (
                              <button onClick={() => handleAction(n.mobile_number, "resume")} disabled={actionLoading === `${n.mobile_number}-resume`} className="px-2.5 py-1 text-xs font-medium rounded-lg bg-green-100 text-green-700 hover:bg-green-200 transition disabled:opacity-50" title="Resume">
                                Resume
                              </button>
                            )}
                            {n.status !== "stopped" && (
                              <button onClick={() => handleAction(n.mobile_number, "stop")} disabled={actionLoading === `${n.mobile_number}-stop`} className="px-2.5 py-1 text-xs font-medium rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition disabled:opacity-50" title="Stop">
                                Stop
                              </button>
                            )}
                            <button onClick={() => handleCheckOffer(n.mobile_number)} disabled={actionLoading === `${n.mobile_number}-offer`} className="px-2.5 py-1 text-xs font-medium rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition disabled:opacity-50" title="Check Offer">
                              Check
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {numbers.length === 0 && (
                      <tr><td colSpan={7} className="px-4 py-12 text-center text-gray-400">No numbers registered yet</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ── Logs Tab ──────────────────────────────────── */}
        {tab === "logs" && (
          <div className="space-y-4 animate-fade-in">
            {/* Filter */}
            <div className="card p-4 flex flex-col sm:flex-row gap-3">
              <input type="text" value={logFilter} onChange={(e) => setLogFilter(e.target.value)} placeholder="Filter by number (optional)" className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition" />
              <button onClick={fetchLogs} className="btn btn-navy py-2.5 px-6 text-sm">Refresh</button>
            </div>

            {/* Logs Table */}
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="text-left px-4 py-3 font-semibold text-gray-600">Time</th>
                      <th className="text-left px-4 py-3 font-semibold text-gray-600">Number</th>
                      <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden sm:table-cell">Trigger</th>
                      <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden md:table-cell">HTTP</th>
                      <th className="text-left px-4 py-3 font-semibold text-gray-600">Status</th>
                      <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden lg:table-cell">Message</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {logs.map((log) => (
                      <tr key={log.id} className="hover:bg-gray-50/50 transition">
                        <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{fmtDate(log.attempted_at)}</td>
                        <td className="px-4 py-3 font-mono font-medium text-gray-900">{log.mobile_number}</td>
                        <td className="px-4 py-3 text-gray-500 hidden sm:table-cell">
                          <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${log.triggered_by === "scheduler" ? "bg-purple-100 text-purple-700" : log.triggered_by === "manual" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600"}`}>
                            {log.triggered_by}
                          </span>
                        </td>
                        <td className="px-4 py-3 hidden md:table-cell">
                          <span className={`font-mono text-xs ${log.http_status === 200 ? "text-green-600" : "text-red-600"}`}>{log.http_status || "—"}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${log.response_status === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                            {log.response_status || "—"}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-500 hidden lg:table-cell max-w-[350px] truncate" title={log.response_message || ""}>{log.response_message || "—"}</td>
                      </tr>
                    ))}
                    {logs.length === 0 && (
                      <tr><td colSpan={6} className="px-4 py-12 text-center text-gray-400">No logs found</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════
// ROOT COMPONENT — Auth Gate
// ══════════════════════════════════════════════════════════════════════
export default function BundleAdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setChecking(false);
    });
    return unsubscribe;
  }, []);

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginScreen onLogin={() => {}} />;
  }

  return <AdminDashboard user={user} />;
}
