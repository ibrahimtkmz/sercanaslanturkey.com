import "./globals.css";

export const metadata = {
  title: "Sercan Aslan Clinic",
  description: "Eksozom Tedavisi",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body className="ambient-body">
        <div className="ambient-light" aria-hidden />
        {children}
      </body>
    </html>
  );
}
