import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import AgeGate from "@/components/layout/AgeGate";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="pt-16 md:pb-0">{children}</main>
      <Footer />
      <BottomNav />
      <AgeGate />
    </>
  );
}
