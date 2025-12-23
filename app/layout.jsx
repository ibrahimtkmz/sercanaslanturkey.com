import "./globals.css";

export const metadata = {
  title: "Doku Clinic | Eksozom Saç Uygulaması",
  description:
    "Eksozom, saç ekimi ve saç dökülmesi için doktor kontrolünde kişiye özel planlama, hızlı WhatsApp iletişimi ve şeffaf fiyat bilgisi.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
