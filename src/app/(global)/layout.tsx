import GlobalNavbar from "@/components/GlobalNavbar";
import GlobalFooter from "@/components/GlobalFooter";
import GeoRouter from "@/components/GeoRouter";

export default function GlobalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <GeoRouter />
      <GlobalNavbar />
      <main className="flex-1">{children}</main>
      <GlobalFooter />
    </>
  );
}
