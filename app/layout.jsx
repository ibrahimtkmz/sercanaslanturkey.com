import Script from "next/script";
import "./globals.css";

export const metadata = {
  title: "Sercan Aslan Clinic",
  description: "Eksozom Tedavisi",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body className="ambient-body">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-16989737357"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'AW-16989737357');
          `}
        </Script>
        <div className="ambient-light" aria-hidden />
        {children}
      </body>
    </html>
  );
}
