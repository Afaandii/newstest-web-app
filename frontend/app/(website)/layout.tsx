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
        background: "#f8f8f8",
        color: "#1a1a1a",
      }}
    >
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
