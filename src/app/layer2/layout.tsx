export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <div>
        <div className="w-full">Second Layout</div>
        {children}
      </div>
  );
}
