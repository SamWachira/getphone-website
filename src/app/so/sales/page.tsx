import Link from "next/link";

export default function SalesPage() {
  const apkUrl = "https://vdmscdn.ztems.com/apk/2026/4/7/FIBM-Baseline-v2.1.7.2603261557-e7852da.apk";
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(apkUrl)}`;

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="section-container px-6">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4 invisible">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Internal Sales Tools
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">eGet Sales App</h1>
          <p className="text-lg text-gray-600">
            Download the latest version of the eGet Sales application for Android devices.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Download Card */}
          <div className="card-elevated flex flex-col items-center text-center p-10">
            <div className="w-20 h-20 bg-accent/10 rounded-2xl flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                <path d="M12 17V3"/>
                <path d="m6 11 6 6 6-6"/>
                <path d="M19 21H5"/>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Direct Download</h2>
            <p className="text-gray-500 mb-8">Download the APK file directly to your device.</p>
            
            <a 
              href={apkUrl}
              className="btn btn-primary w-full py-4 text-lg"
              download
            >
              Download APK
            </a>
            
            <div className="mt-8 pt-8 border-t border-gray-100 w-full">
              <p className="text-sm text-gray-400 mb-4 font-medium uppercase tracking-wider">Or Scan QR Code</p>
              <div className="bg-white p-4 rounded-xl border border-gray-100 inline-block shadow-sm">
                <img 
                  src={qrCodeUrl} 
                  alt="Download QR Code" 
                  className="w-40 h-40 object-contain"
                />
              </div>
              <p className="mt-4 text-xs text-gray-500">
                Open your camera app to scan and download
              </p>
            </div>
          </div>

          {/* Instructions Card */}
          <div className="card bg-white p-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 16v-4"/>
                <path d="M12 8h.01"/>
              </svg>
              Installation Guide
            </h2>

            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center font-bold text-primary">1</div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Download the APK</h3>
                  <p className="text-sm text-gray-600">Tap the download button. Your browser may warn you that the file could be harmful. Tap <strong>"Download anyway"</strong>.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center font-bold text-primary">2</div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Enable Unknown Sources</h3>
                  <p className="text-sm text-gray-600">If prompted, go to <strong>Settings</strong> and toggle on <strong>"Allow from this source"</strong> for your browser (e.g., Chrome).</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center font-bold text-primary">3</div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Install Anyway</h3>
                  <p className="text-sm text-gray-600">Android may flag the app as unrecognized. Tap <strong>"Install anyway"</strong> or <strong>"More details"</strong> then "Install anyway".</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center font-bold text-primary">4</div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Open & Log In</h3>
                  <p className="text-sm text-gray-600">Once installed, open the app and log in with your sales credentials provided by the administrator.</p>
                </div>
              </div>
            </div>

            {/* Warning Box */}
            <div className="mt-10 p-5 bg-amber-50 border border-amber-100 rounded-xl flex gap-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600 flex-shrink-0">
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
                <path d="M12 9v4"/>
                <path d="M12 17h.01"/>
              </svg>
              <div>
                <p className="text-sm font-bold text-amber-900 mb-1">Android Security Warning</p>
                <p className="text-xs text-amber-800 leading-relaxed">
                  Because this app is distributed internally and not via the Play Store, Android will display several warnings. These are normal for internal tools. Please proceed with installation.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Link */}
        <div className="mt-12 text-center">
          <Link href="/" className="text-sm text-gray-400 hover:text-primary transition-colors flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            Return to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}
