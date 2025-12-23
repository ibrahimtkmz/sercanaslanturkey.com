import "./globals.css";

export const metadata = {
  title: "Doku Clinic | Eksozom Saç Uygulaması",
  description:
    "Eksozom, saç ekimi ve saç dökülmesi için doktor kontrolünde kişiye özel planlama, hızlı WhatsApp iletişimi ve şeffaf fiyat bilgisi.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
