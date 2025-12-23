"use client";

import { useMemo, useState } from "react";

const BRAND = {
  name: "YENİ KLİNİK ADI", // <-- SADECE BURAYI DEĞİŞTİR
  doctor: "Dr. İbrahim",
  whatsappPhoneDisplay: "+90 555 140 04 04",
  whatsappPhoneE164: "905551400404", // + ve boşluk olmadan
  heroTitleTop: "Eksozom Tedavisi:",
  heroTitleMid: "Cilt Gençleştirme ve Saç Onarımında",
  heroTitleBottom: "Hücresel Yenilenmenin Gücünü Keşfedin",
};

function waLink(message) {
  const text = encodeURIComponent(message || "Merhaba, bilgi almak istiyorum.");
  return `https://api.whatsapp.com/send?phone=${BRAND.whatsappPhoneE164}&text=${text}`;
}

const Icon = {
  Check: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
      <path d="M20 6L9 17l-5-5" />
    </svg>
  ),
  Star: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M12 17.27l5.18 3.04-1.4-5.97L20.5 9.5l-6.1-.52L12 3.5 9.6 8.98l-6.1.52 4.72 4.84-1.4 5.97L12 17.27z" />
    </svg>
  ),
};

export default function Page() {
  const [form, setForm] = useState({ name: "", phone: "", note: "" });

  const heroBullets = useMemo(
    () => [
      "Ciltte hücresel yenilenmeyi destekler",
      "Saç köklerini güçlendirir, dökülmeyi azaltmaya yardımcı olur",
      "Yüz, boyun, dekolte ve elde gençleştirme etkisi sağlar",
      "Cilt tonunu eşitleyip parlaklık kazandırır",
      "İnce çizgi ve mat görünümü iyileştirir",
      "Cilt dokusunu onararak canlılık kazandırır",
      "Saç ekimi sonrası iyileşmeyi destekler",
      "Doğal ve konforlu bir uygulamadır",
      "Kişiye özel protokollerle uygulanır",
      `${BRAND.name} dermatoloji uzmanlığıyla güvenlidir`,
    ],
    []
  );

  const testimonials = useMemo(
    () => [
      {
        name: "Luigi Rosato",
        when: "1 ay önce",
        text:
          "Kendimi gerçekten güvende hissettim. Ekibin yaklaşımı çok profesyoneldi ve her adım açık şekilde anlatıldı.",
      },
      {
        name: "Gloria Sanchez",
        when: "5 gün önce",
        text:
          "Tüm personel çok yardımsever ve güler yüzlü. Tekrar gelirim ve memnuniyetle tavsiye ederim.",
      },
      {
        name: "Renáta Szakos-Pétervári",
        when: "2 hafta önce",
        text:
          "Organizasyon mükemmeldi. Klinik ortamı modern ve konforlu; süreç profesyonelce yönetildi.",
      },
      {
        name: "Alessio Minichiello",
        when: "2 hafta önce",
        text:
          "Her şey tertemiz ve düzenliydi. Personel her adımda rahat hissettirdi. Şiddetle tavsiye ederim.",
      },
    ],
    []
  );

  const faqs = useMemo(
    () => [
      {
        q: "Eksozom tedavisi nedir? Nasıl çalışır?",
        a:
          "Eksozom tedavisi; hücrelerin yenilenme ve onarım sinyallerini destekleyen biyolojik içeriklerle yapılan gelişmiş bir uygulamadır. Saç köklerinde folikül aktivitesini destekler; ciltte kolajen/elastin üretimine yardımcı olur.",
      },
      {
        q: "Eksozom tedavisi saç dökülmesine gerçekten iyi gelir mi?",
        a:
          "Kişiden kişiye değişmekle birlikte; eksozomlar saç köklerinin hücresel iletişimini destekleyerek zayıflamış foliküllerin yeniden aktive olmasına ve dökülmenin yavaşlamasına yardımcı olabilir.",
      },
      {
        q: "Eksozom tedavisi cilde hangi faydaları sağlar?",
        a:
          "Parlaklık, sıkılık, elastikiyet artışı, gözenek görünümünde iyileşme, ince çizgilerde azalma ve doku yenilenmesini destekleme gibi etkiler hedeflenir.",
      },
      {
        q: "Uygulama süreci ne kadar sürer?",
        a:
          "Genelde 30–40 dakika sürer. İşlem sonrası çoğu kişi günlük hayatına aynı gün devam edebilir. Önerilen seans sayısı ihtiyaca göre planlanır.",
      },
    ],
    []
  );

  const onSubmit = (e) => {
    e.preventDefault();
    const msg =
      `Merhaba, ücretsiz danışmanlık için form doldurdum.\n\n` +
      `Ad Soyad: ${form.name}\n` +
      `Telefon: ${form.phone}\n` +
      `Not: ${form.note || "-"}\n\n` +
      `Eksozom hakkında bilgi almak istiyorum.`;
    window.open(waLink(msg), "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-[#0b1220] text-white">
      {/* Sticky WhatsApp */}
      <a
        href={waLink("Merhaba, bilgi almak istiyorum.")}
        className="fixed bottom-5 right-5 z-50 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-black shadow-lg hover:opacity-90"
      >
        WhatsApp • {BRAND.whatsappPhoneDisplay}
      </a>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0b1220]/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-white/10" />
            <div className="leading-tight">
              <div className="text-sm font-semibold">{BRAND.name}</div>
              <div className="text-xs text-white/60">{BRAND.doctor}</div>
            </div>
          </div>
          <a
            href={waLink("Merhaba, hemen bilgi almak istiyorum.")}
            className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-[#0b1220] hover:opacity-90"
          >
            Hemen Bilgi Al
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 lg:grid-cols-2 lg:py-16">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
              Eksozom • Saç & Cilt
            </div>

            <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
              {BRAND.heroTitleTop}
              <br />
              <span className="text-white/90">{BRAND.heroTitleMid}</span>
              <br />
              <span className="text-white">{BRAND.heroTitleBottom}</span>
            </h1>

            <ul className="mt-6 grid gap-2 text-sm text-white/85">
              {heroBullets.map((b, i) => (
                <li key={i} className="flex gap-2">
                  <Icon.Check className="mt-0.5 h-5 w-5 text-[#7dd3fc]" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={waLink("Merhaba, eksozom için ücretsiz danışmanlık istiyorum.")}
                className="rounded-2xl bg-[#7dd3fc] px-5 py-3 text-sm font-bold text-[#0b1220] hover:opacity-90"
              >
                Hemen Bilgi Al
              </a>
              <a
                href="#form"
                className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
              >
                Ücretsiz Danışmanlık Formu
              </a>
            </div>

            <p className="mt-4 text-xs text-white/55">
              * Bilgilendirme amaçlıdır. Kesin plan, muayene ve değerlendirme sonrası belirlenir.
            </p>
          </div>

          {/* Form Card */}
          <div id="form" className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl">
            <div className="text-sm font-semibold text-white/80">Ücretsiz Danışmanlık İçin</div>
            <div className="mt-1 text-2xl font-extrabold">Hemen Başvurun!</div>

            <form onSubmit={onSubmit} className="mt-6 grid gap-3">
              <input
                value={form.name}
                onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
                placeholder="Ad Soyad"
                className="rounded-2xl border border-white/10 bg-[#0b1220]/60 px-4 py-3 text-sm outline-none focus:border-white/25"
                required
              />
              <input
                value={form.phone}
                onChange={(e) => setForm((s) => ({ ...s, phone: e.target.value }))}
                placeholder="Telefon"
                className="rounded-2xl border border-white/10 bg-[#0b1220]/60 px-4 py-3 text-sm outline-none focus:border-white/25"
                required
              />
              <textarea
                value={form.note}
                onChange={(e) => setForm((s) => ({ ...s, note: e.target.value }))}
                placeholder="Not (opsiyonel)"
                rows={3}
                className="rounded-2xl border border-white/10 bg-[#0b1220]/60 px-4 py-3 text-sm outline-none focus:border-white/25"
              />
              <button
                type="submit"
                className="mt-2 rounded-2xl bg-white px-5 py-3 text-sm font-bold text-[#0b1220] hover:opacity-90"
              >
                WhatsApp’tan Gönder
              </button>
            </form>

            <div className="mt-4 text-xs text-white/60">
              Formu gönderince WhatsApp açılır ve mesaj otomatik hazırlanır.
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="border-t border-white/10 bg-black/10">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-2xl font-extrabold">Hücresel Yenilenme: Saçta ve Ciltte Doğal Güç</h2>
          <p className="mt-3 max-w-3xl text-sm text-white/75">
            Eksozomlar, vücudun doğal iyileşme sürecini yöneten güçlü hücresel sinyaller taşır. Cilt ve saçlı deriye
            uygulandığında, hasarlı hücrelerin onarımını destekler; yenilenme kapasitesini artırmaya yardımcı olur.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { t: "Daha güçlü saç", d: "Folikül aktivitesini desteklemeye yardımcı" },
              { t: "Daha yenilenmiş cilt", d: "Doku onarımını ve canlı görünümü destekler" },
              { t: "Kısa süreç", d: "Çoğu kişi aynı gün rutinine döner" },
              { t: "Kişiye özel plan", d: "Bölge ve ihtiyaca göre protokol" },
            ].map((c, i) => (
              <div key={i} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <div className="text-base font-bold">{c.t}</div>
                <div className="mt-1 text-sm text-white/70">{c.d}</div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <a
              href={waLink("Merhaba, eksozom için değerlendirme ve seans bilgisi almak istiyorum.")}
              className="inline-flex rounded-2xl bg-[#7dd3fc] px-5 py-3 text-sm font-bold text-[#0b1220] hover:opacity-90"
            >
              EKSOZOM’U KEŞFET!
            </a>
          </div>
        </div>
      </section>

      {/* Areas */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-2xl font-extrabold">
            Eksozom Uygulama Alanları: <span className="text-white/85">Saç ve Ciltte Hücresel Yenilenme</span>
          </h2>

          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {[
              {
                h: "1) Saçlı Deri – Saç Dökülmesi ve Seyrelme",
                p: "Eksozomlar, saç köklerindeki hücresel iletişimi destekleyerek folikül aktivitesini artırmaya yardımcı olur.",
                bullets: [
                  "Zayıflamış saç köklerinin yeniden aktive olmasına destek",
                  "Saç yoğunluğu ve gücünde artışı destekleme",
                  "Dökülme hızını yavaşlatmaya yardımcı",
                  "Saçlı deride canlılık ve iyileşme desteği",
                  "Saç ekimi sonrası süreci destekleme",
                ],
              },
              {
                h: "2) Yüz – Işıltı, Doku, Leke ve İnce Çizgiler",
                p: "Cilde uygulandığında kolajen ve elastin üretimini destekleyerek daha parlak ve dengeli bir görünüm hedeflenir.",
                bullets: [
                  "Cilt tonunun eşitlenmesine yardımcı",
                  "İnce çizgi görünümünde azalmayı destekler",
                  "Gözenek görünümünü iyileştirmeye yardımcı",
                  "Cilt bariyerini güçlendirmeyi hedefler",
                ],
              },
              {
                h: "3) Boyun & Dekolte – Sıkılaşma ve Doku Onarımı",
                p: "Hassas bölgelerde dokusal onarımı destekleyerek daha pürüzsüz bir görünüm hedeflenir.",
                bullets: [
                  "Sıkılık ve elastikiyet desteği",
                  "İnce çizgi görünümünü azaltmaya yardımcı",
                  "Güneş kaynaklı doku hasarının görünümünü iyileştirmeye destek",
                ],
              },
              {
                h: "4) Problemli Cilt Alanları – İz, Leke, Güneş Hasarı",
                p: "Hasarlı cilt hücrelerini hedefleyen onarıma destekleyici bir yaklaşım olarak değerlendirilir.",
                bullets: [
                  "Akne izi görünümünü azaltmaya yardımcı",
                  "Leke/güneş hasarı görünümünde iyileşmeye destek",
                  "Daha homojen bir cilt dokusu hedefler",
                ],
              },
            ].map((card, idx) => (
              <div key={idx} className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <div className="text-lg font-bold">{card.h}</div>
                <p className="mt-2 text-sm text-white/75">{card.p}</p>
                <ul className="mt-4 grid gap-2 text-sm text-white/80">
                  {card.bullets.map((b, i) => (
                    <li key={i} className="flex gap-2">
                      <Icon.Check className="mt-0.5 h-5 w-5 text-[#7dd3fc]" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-t border-white/10 bg-black/10">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-2xl font-extrabold">Neden {BRAND.name}?</h2>
          <p className="mt-3 max-w-3xl text-sm text-white/75">
            Modern klinik altyapısı, uzman ekip yaklaşımı ve düzenli takip ile kişiye özel bir deneyim hedeflenir.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {testimonials.map((t, i) => (
              <div key={i} className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-bold">{t.name}</div>
                    <div className="text-xs text-white/55">{t.when}</div>
                  </div>
                  <div className="flex gap-1 text-[#fbbf24]">
                    {Array.from({ length: 5 }).map((_, k) => (
                      <Icon.Star key={k} className="h-4 w-4" />
                    ))}
                  </div>
                </div>
                <p className="mt-3 text-sm text-white/80">{t.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <a
              href={waLink("Merhaba, randevu oluşturmak istiyorum.")}
              className="inline-flex rounded-2xl bg-white px-5 py-3 text-sm font-bold text-[#0b1220] hover:opacity-90"
            >
              Hemen Randevunuzu Oluşturun
            </a>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-2xl font-extrabold">Uygulama Süreci</h2>
          <p className="mt-3 max-w-4xl text-sm text-white/75">
            Eksozom uygulaması genellikle kısa süren, konforlu ve minimal girişimli bir süreç olarak değerlendirilir.
            Seans planı kişiye, bölgeye ve ihtiyaca göre belirlenir.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { t: "Uygulama Süresi", v: "30–40 dk" },
              { t: "Önerilen Seans", v: "3–4 (kişiye göre)" },
              { t: "İşe Dönüş", v: "Hemen" },
              { t: "Anestezi", v: "Genelde gerekmez" },
              { t: "Hassasiyet", v: "Çoğu kişide minimal" },
              { t: "Kalıcılık", v: "Kişiye göre değişir" },
            ].map((m, i) => (
              <div key={i} className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <div className="text-sm text-white/70">{m.t}</div>
                <div className="mt-1 text-xl font-extrabold">{m.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-white/10 bg-black/10">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-2xl font-extrabold">Sıkça Sorulan Sorular</h2>

          <div className="mt-6 grid gap-4">
            {faqs.map((f, i) => (
              <details key={i} className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <summary className="cursor-pointer select-none text-base font-bold">{f.q}</summary>
                <p className="mt-3 text-sm text-white/75">{f.a}</p>
              </details>
            ))}
          </div>

          <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="text-lg font-extrabold">Eksozom Seans & Fiyat Bilgisi İçin Başvurun</div>
            <p className="mt-2 text-sm text-white/75">
              Seans sayısı, uygulanacak bölgeler ve fiyat aralığıyla ilgili size özel bilgiyi ücretsiz paylaşalım.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href={waLink("Merhaba, eksozom seans ve fiyat bilgisi almak istiyorum.")}
                className="rounded-2xl bg-[#7dd3fc] px-5 py-3 text-sm font-bold text-[#0b1220] hover:opacity-90"
              >
                WhatsApp’tan Yaz
              </a>
              <a
                href="#form"
                className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
              >
                Formu Doldur
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-8 text-xs text-white/55">
          © {new Date().getFullYear()} {BRAND.name} • Tüm hakları saklıdır.
        </div>
      </footer>
    </div>
  );
}
