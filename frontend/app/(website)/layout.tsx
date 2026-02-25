export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar akan ditambahkan di sini nanti */}
      <main className="flex-1">{children}</main>
      {/* Footer akan ditambahkan di sini nanti */}
    </div>
  );
}
