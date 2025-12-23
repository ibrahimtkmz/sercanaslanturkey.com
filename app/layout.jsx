import "./globals.css";

export const metadata = {
  title: "Dr. İbrahim | Saç Ekimi ve Estetik Uygulamalar",
  description: "Saç ekimi, eksozom, mezoterapi, ozon terapi ve botox için kişiye özel planlama ve hızlı iletişim.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
