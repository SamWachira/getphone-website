"use client";

import { useState } from "react";
import Link from "next/link";

interface AppItem {
  id: string;
  name: string;
  category: string;
  badge: string;
  badgeColor: string;
  description: string;
  apkUrl: string;
  iconSvg: string;
}

const APPS: AppItem[] = [
  {
    id: "eget-sales",
    name: "eGet Sales App",
    category: "ZTE Baseline Tool",
    badge: "Field Tool",
    badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
    description: "Official ZTE baseline application for field agents, device provisioning, and sales registration.",
    apkUrl: "https://vdmscdn.ztems.com/apk/2026/4/7/FIBM-Baseline-v2.1.7.2603261557-e7852da.apk",
    iconSvg: "eget",
  },
  {
    id: "getphone-sales",
    name: "Getphone Sales App",
    category: "Internal Sales Tool",
    badge: "Sales Team",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
    description: "Dedicated sales management and client onboarding application for Getphone representatives.",
    apkUrl: "https://firebasestorage.googleapis.com/v0/b/getphone-website.firebasestorage.app/o/apks%2Fgetphone-sales.apk?alt=media",
    iconSvg: "sales",
  },
  {
    id: "getphone-customer",
    name: "Getphone Customer App",
    category: "Client Mobile App",
    badge: "Customer App",
    badgeColor: "bg-blue-100 text-blue-800 border-blue-200",
    description: "Self-service mobile app for customers to manage accounts, track installment payments, and view benefits.",
    apkUrl: "https://firebasestorage.googleapis.com/v0/b/getphone-website.firebasestorage.app/o/apks%2Fgetphone-customer.apk?alt=media",
    iconSvg: "customer",
  },
];

export default function SalesPage() {
  const [selectedAppId, setSelectedAppId] = useState<string>("getphone-sales");

  const currentApp = APPS.find((a) => a.id === selectedAppId) || APPS[0];
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
    currentApp.apkUrl
  )}`;

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="section-container px-6">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Getphone Mobile Applications
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Internal & Customer Applications</h1>
          <p className="text-lg text-gray-600">
            Download the latest Android APK builds directly for your device or scan the QR code.
          </p>
        </div>

        {/* App Selector Tabs */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-1.5 bg-gray-200/70 rounded-2xl">
            {APPS.map((app) => {
              const isSelected = app.id === selectedAppId;
              return (
                <button
                  key={app.id}
                  onClick={() => setSelectedAppId(app.id)}
                  className={`flex flex-col items-center justify-center py-3.5 px-4 rounded-xl transition-all duration-200 text-center ${
                    isSelected
                      ? "bg-white text-gray-900 shadow-md font-bold"
                      : "text-gray-600 hover:text-gray-900 hover:bg-white/50 font-medium"
                  }`}
                >
                  <span className="text-base">{app.name}</span>
                  <span className="text-xs opacity-75 font-normal">{app.badge}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Download Card */}
          <div className="card-elevated flex flex-col items-center text-center p-10 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${currentApp.badgeColor}`}>
                {currentApp.badge}
              </span>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-2">{currentApp.name}</h2>
            <p className="text-gray-500 text-sm mb-6 max-w-sm">{currentApp.description}</p>

            <a
              href={currentApp.apkUrl}
              className="btn btn-primary w-full py-4 text-lg font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              download
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 17V3"/>
                <path d="m6 11 6 6 6-6"/>
                <path d="M19 21H5"/>
              </svg>
              Download {currentApp.name} (APK)
            </a>

            <div className="mt-8 pt-8 border-t border-gray-100 w-full">
              <p className="text-xs text-gray-400 mb-4 font-semibold uppercase tracking-wider">Or Scan QR Code</p>
              <div className="bg-white p-4 rounded-2xl border border-gray-200 inline-block shadow-sm">
                <img
                  src={qrCodeUrl}
                  alt={`${currentApp.name} QR Code`}
                  className="w-40 h-40 object-contain"
                />
              </div>
              <p className="mt-4 text-xs text-gray-500">
                Scan with your phone camera to start direct download
              </p>
            </div>
          </div>

          {/* Instructions Card */}
          <div className="card bg-white p-10 rounded-3xl border border-gray-100 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 16v-4"/>
                <path d="M12 8h.01"/>
              </svg>
              Installation Guide
            </h2>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-emerald-50 text-primary rounded-full flex items-center justify-center font-bold text-sm">1</div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm mb-0.5">Download the APK</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">Tap the download button. Browser will prompt asking to save the file. Tap <strong>"Download anyway"</strong>.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-emerald-50 text-primary rounded-full flex items-center justify-center font-bold text-sm">2</div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm mb-0.5">Enable Unknown Sources</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">If prompted, go to <strong>Settings</strong> and enable <strong>"Allow installation from this source"</strong> for your browser.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-emerald-50 text-primary rounded-full flex items-center justify-center font-bold text-sm">3</div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm mb-0.5">Install & Launch</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">Open the downloaded `.apk` file and tap <strong>"Install"</strong>. Once completed, launch the application.</p>
                </div>
              </div>
            </div>

            {/* Security Warning Box */}
            <div className="mt-8 p-4 bg-amber-50 border border-amber-100 rounded-2xl flex gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600 flex-shrink-0 mt-0.5">
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
                <path d="M12 9v4"/>
                <path d="M12 17h.01"/>
              </svg>
              <div>
                <p className="text-xs font-bold text-amber-900 mb-0.5">Internal App Notice</p>
                <p className="text-[11px] text-amber-800 leading-relaxed">
                  Because internal tools are distributed directly outside the Google Play Store, Android will show a standard safety prompt. This is expected. Tap <strong>"Install anyway"</strong> to proceed.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Link */}
        <div className="mt-12 text-center">
          <Link href="/" className="text-sm text-gray-400 hover:text-primary transition-colors inline-flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            Return to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}
