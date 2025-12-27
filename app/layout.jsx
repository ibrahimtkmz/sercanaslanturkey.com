import "./globals.css";

export const metadata = {
  title: "Sercan Aslan Clinic",
  description: "Eksozom Tedavisi - Landing Page",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
