export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <style>{`
        /* Hide the main site navigation, footer, and chatbot on admin pages */
        header.fixed,
        body > main ~ footer,
        body > main ~ div[class*="chat"],
        body > main ~ div > button[class*="chat"] {
          display: none !important;
        }
        /* Reset the top padding since fixed navbar is hidden */
        body {
          padding-top: 0 !important;
        }
      `}</style>
      {children}
    </>
  );
}
