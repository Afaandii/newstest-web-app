import Navbar from "@/components/website/navbar";
import Footer from "@/components/website/footer";

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background:
          "linear-gradient(160deg, #0a1628 0%, #0d2137 25%, #0a2a2a 50%, #0d1f35 75%, #0a1628 100%)",
      }}
    >
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
