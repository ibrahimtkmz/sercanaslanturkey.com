"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Clock,
  CheckCircle2,
  Star,
  Info,
  MapPin,
  BadgeCheck,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

/**
 * Tek sayfalık satış odaklı klinik landing page.
 * - Saç ekimi ana odak
 * - Eksozom, Mezoterapi, Ozon Terapi, Botox ikincil hizmetler
 * - Paket/tek seans fiyat alanları
 * - CTA butonları + popup form
 * - Popup form (İsim Soyisim + Telefon) -> WhatsApp mesajına ekler ve 05467372284'e yönlendirir.
 *
 * Kurulum notu:
 * - Tailwind + shadcn/ui + framer-motion + lucide-react
 * - Next.js'te /app/page.jsx veya ilgili sayfada kullanabilirsiniz.
 */

const WHATSAPP_PHONE_E164 = "905467372284"; // 0546 737 22 84

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function formatPhoneTR(input) {
  // Basit TR telefon maskeleme (opsiyonel): sadece rakam
  const digits = (input || "").replace(/\D/g, "");
  // 0 ile başlarsa koru, değilse eklemeye çalışma.
  return digits.slice(0, 11);
}

function buildWhatsAppUrl({ name, phone, interest }) {
  const lines = [
    "Merhaba, web sitenizden bilgi almak istiyorum.",
    `\nİsim Soyisim: ${name || "-"}`,
    `Telefon: ${phone || "-"}`,
    interest ? `İlgilendiğim uygulama: ${interest}` : null,
    "\nMüsait olduğunuzda dönüş yapabilir misiniz?",
  ].filter(Boolean);

  const text = lines.join("\n");
  const encoded = encodeURIComponent(text);
  return `https://wa.me/${WHATSAPP_PHONE_E164}?text=${encoded}`;
}

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-120px" },
  transition: { duration: 0.6, ease: "easeOut" },
};

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedInterest, setSelectedInterest] = useState("Saç Ekimi");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(true);

  const primaryCtas = useMemo(
    () => [
      {
        label: "Hemen İletişime Geç",
        icon: <MessageCircle className="h-4 w-4" />,
        action: () => {
          setSelectedInterest("Saç Ekimi");
          setIsOpen(true);
        },
      },
      {
        label: "Daha Fazla Bilgi Al",
        icon: <Info className="h-4 w-4" />,
        action: () => {
          setSelectedInterest("Saç Ekimi");
          setIsOpen(true);
        },
      },
    ],
    []
  );

  const services = useMemo(
    () => [
      {
        key: "sac-ekimi",
        name: "Saç Ekimi",
        short:
          "Doğal çizgi, yoğun görünüm ve kişiye özel planlama ile kalıcı çözümler.",
        icon: <Stethoscope className="h-5 w-5" />,
        bullets: [
          "Seyrelme ve bölgesel dökülmede etkili",
          "Doğal saç çizgisi tasarımı",
          "İyileşme süreci planlı takip",
          "Kişiye özel greft planlaması",
        ],
        when: [
          "Ön saç çizgisi gerilemesi",
          "Tepe bölgesinde açıklık",
          "Genetik dökülme (erkek tipi)",
          "Saç yoğunluğu belirgin azaldıysa",
        ],
        price: {
          package: "Paket: 45.000 – 85.000 TL",
          single: "Kontrol / Değerlendirme: 0 – 2.500 TL",
          note: "Fiyat, greft sayısı ve planlamaya göre değişir.",
        },
        cta: "Saç ekimi için uygun musun?",
      },
      {
        key: "eksozom",
        name: "Eksozom",
        short:
          "Saçlı derinin desteklenmesi ve toparlanma sürecine yardımcı ileri bakım yaklaşımı.",
        icon: <Sparkles className="h-5 w-5" />,
        bullets: [
          "Saçlı deride canlılık desteği",
          "Dökülme dönemlerinde bakım",
          "Ekimi destekleyici protokoller",
          "Kişisel plana göre seans",
        ],
        when: [
          "Mevsimsel dökülme artışı",
          "Saç ekimi sonrası destek ihtiyacı",
          "Saç kalitesinde incelme",
        ],
        price: {
          package: "Paket: 12.000 – 28.000 TL (3–6 seans)",
          single: "Tek Seans: 4.500 – 7.500 TL",
          note: "Protokol, klinik değerlendirmeye göre belirlenir.",
        },
        cta: "Eksozom planını öğren",
      },
      {
        key: "mezoterapi",
        name: "Mezoterapi",
        short:
          "Saçlı deriye özel içeriklerle hedefli bakım: canlılık ve güçlenme desteği.",
        icon: <BadgeCheck className="h-5 w-5" />,
        bullets: [
          "Seyrelmede destekleyici bakım",
          "Kırılma ve yıpranmada yardımcı",
          "Periyodik seans planı",
          "Kombine protokollere uygun",
        ],
        when: [
          "Saç telinde zayıflama",
          "Stres/yoğun tempo dönemleri",
          "Doğum sonrası dökülme dönemi",
        ],
        price: {
          package: "Paket: 7.500 – 18.000 TL (4–8 seans)",
          single: "Tek Seans: 2.000 – 3.500 TL",
          note: "Seans aralığı kişiye göre düzenlenir.",
        },
        cta: "Mezoterapi seansını sor",
      },
      {
        key: "ozon",
        name: "Ozon Terapi",
        short:
          "Genel iyilik halini destekleyen, planlı ve kontrollü uygulama protokolleri.",
        icon: <ShieldCheck className="h-5 w-5" />,
        bullets: [
          "Planlı protokoller",
          "Genel destek amaçlı yaklaşım",
          "Takip ve seans planı",
          "Kişiye özel değerlendirme",
        ],
        when: [
          "Destekleyici bakım arayanlar",
          "Yoğun tempo / halsizlik dönemleri",
          "Kombine protokollerde destek",
        ],
        price: {
          package: "Paket: 6.000 – 15.000 TL (3–6 seans)",
          single: "Tek Seans: 1.800 – 3.000 TL",
          note: "Uygulama şekli hekim değerlendirmesine bağlıdır.",
        },
        cta: "Ozon terapi bilgisi al",
      },
      {
        key: "botox",
        name: "Botox",
        short:
          "Mimiki yumuşatır, yüz ifadesini koruyarak daha dinlenmiş görünüm hedefler.",
        icon: <Star className="h-5 w-5" />,
        bullets: [
          "Alın – kaş arası – göz çevresi",
          "Kısa uygulama süresi",
          "Doğal görünüm odaklı",
          "Kişiye uygun doz planı",
        ],
        when: [
          "Mimik çizgileri belirginleştiyse",
          "Daha dinlenmiş görünüm isteniyorsa",
          "Düzenli bakım rutini arayanlar",
        ],
        price: {
          package: "Paket: 8.500 – 18.500 TL (bölgeye göre)",
          single: "Tek Uygulama: 8.500 – 18.500 TL",
          note: "Fiyat bölge ve ihtiyaca göre değişir.",
        },
        cta: "Botox için fiyat al",
      },
    ],
    []
  );

  const pricing = useMemo(
    () =>
      services.map((s) => ({
        name: s.name,
        package: s.price.package,
        single: s.price.single,
        note: s.price.note,
      })),
    [services]
  );

  const openLead = (interest = "Saç Ekimi") => {
    setSelectedInterest(interest);
    setIsOpen(true);
  };

  const submitLead = (e) => {
    e?.preventDefault?.();
    if (!name.trim() || phone.replace(/\D/g, "").length < 10) return;
    if (!consent) return;

    const url = buildWhatsAppUrl({ name: name.trim(), phone: phone.trim(), interest: selectedInterest });
    window.open(url, "_blank", "noopener,noreferrer");
    setIsOpen(false);
  };

  // ESC ile popup kapatma
  useEffect(() => {
    const onKey = (ev) => {
      if (ev.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Sticky Top Bar */}
      <div className="sticky top-0 z-50 border-b border-slate-200 bg-white/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-2xl bg-slate-900" />
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-tight">Dr. İbrahim</div>
              <div className="text-xs text-slate-500">Saç Ekimi • Estetik Uygulamalar</div>
            </div>
          </div>

          <div className="hidden items-center gap-2 sm:flex">
            <Button variant="outline" className="rounded-2xl" onClick={() => openLead("Bilgi")}
              >
              <Phone className="h-4 w-4" />
              <span className="ml-2">Bilgi Al</span>
            </Button>
            <Button className="rounded-2xl" onClick={() => openLead("Saç Ekimi")}
              >
              <MessageCircle className="h-4 w-4" />
              <span className="ml-2">WhatsApp</span>
            </Button>
          </div>

          <Button className="rounded-2xl sm:hidden" onClick={() => openLead("Saç Ekimi")}
            >
            <MessageCircle className="h-4 w-4" />
            <span className="ml-2">İletişim</span>
          </Button>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-slate-100 blur-3xl" />
          <div className="absolute -right-24 top-24 h-96 w-96 rounded-full bg-slate-100 blur-3xl" />
        </div>

        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-2">
          <motion.div {...fadeUp}>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600 shadow-sm">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Danışan odaklı planlama • Şeffaf fiyatlandırma • Hızlı dönüş</span>
            </div>

            <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
              Saç ekimi ve estetik uygulamalarda
              <span className="block text-slate-600">güvenli, satış odaklı değil — sonuç odaklı yaklaşım.</span>
            </h1>

            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              Dr. İbrahim ile kişiye özel değerlendirme: saç ekimi, eksozom, mezoterapi, ozon terapi ve botox
              seçeneklerini hedefinize göre planlayalım.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {primaryCtas.map((c) => (
                <Button
                  key={c.label}
                  className="rounded-2xl"
                  size="lg"
                  onClick={c.action}
                >
                  {c.icon}
                  <span className="ml-2">{c.label}</span>
                </Button>
              ))}
              <Button
                variant="outline"
                size="lg"
                className="rounded-2xl"
                onClick={() => {
                  const el = document.getElementById("pricing");
                  el?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              >
                <span>Fiyatları Gör</span>
              </Button>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {["Ücretsiz ön değerlendirme", "Hızlı WhatsApp dönüş", "Kişiye özel plan"].map((t) => (
                <div
                  key={t}
                  className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  <span className="text-sm text-slate-700">{t}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative"
          >
            <Card className="rounded-3xl border-slate-200 shadow-lg">
              <CardContent className="p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-sm font-medium text-slate-600">Öne çıkan</div>
                    <div className="mt-1 text-xl font-semibold tracking-tight">Saç Ekimi Ön Görüşme</div>
                    <div className="mt-2 text-sm text-slate-600">
                      2 dakikada bilgilerini bırak — WhatsApp’tan sana özel planı iletelim.
                    </div>
                  </div>
                  <Badge className="rounded-2xl">Hızlı</Badge>
                </div>

                <div className="mt-6 grid gap-3">
                  <div className="rounded-2xl border border-slate-200 p-4">
                    <div className="flex items-center gap-2 text-sm font-semibold">
                      <Clock className="h-4 w-4" />
                      <span>Yanıt süresi</span>
                    </div>
                    <div className="mt-1 text-sm text-slate-600">Yoğunluğa göre aynı gün / 24 saat içinde dönüş.</div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 p-4">
                    <div className="flex items-center gap-2 text-sm font-semibold">
                      <ShieldCheck className="h-4 w-4" />
                      <span>Şeffaflık</span>
                    </div>
                    <div className="mt-1 text-sm text-slate-600">Plan, seans sayısı ve ücret bilgisi net paylaşılır.</div>
                  </div>

                  <Button className="mt-1 rounded-2xl" size="lg" onClick={() => openLead("Saç Ekimi")}
                    >
                    <MessageCircle className="h-4 w-4" />
                    <span className="ml-2">WhatsApp’ta Ücretsiz Bilgi Al</span>
                  </Button>

                  <div className="text-xs text-slate-500">
                    *Formu gönderdiğinde WhatsApp’ta hazır mesaj açılır.
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="pointer-events-none absolute -bottom-6 -left-6 h-24 w-24 rounded-3xl bg-slate-100 blur-2xl" />
          </motion.div>
        </div>
      </section>

      {/* Trust */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <motion.div {...fadeUp} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: <BadgeCheck className="h-5 w-5" />, title: "Doktor vurgusu", desc: "Dr. İbrahim ile planlama" },
            { icon: <ShieldCheck className="h-5 w-5" />, title: "Güven odaklı", desc: "Takip ve bilgilendirme" },
            { icon: <Sparkles className="h-5 w-5" />, title: "Modern protokoller", desc: "Kombine seçenekler" },
            { icon: <MessageCircle className="h-5 w-5" />, title: "Hızlı iletişim", desc: "WhatsApp ile kolay" },
          ].map((b) => (
            <Card key={b.title} className="rounded-3xl border-slate-200">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  {b.icon}
                  <span>{b.title}</span>
                </div>
                <div className="mt-1 text-sm text-slate-600">{b.desc}</div>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6" id="services">
        <motion.div {...fadeUp} className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Uygulamalar</h2>
            <p className="mt-2 text-slate-600">
              Her uygulama için: <span className="font-medium">faydalar</span>, <span className="font-medium">ne zaman avantajlı</span> ve
              <span className="font-medium"> fiyat</span> bilgisi.
            </p>
          </div>
          <div className="hidden sm:block">
            <Button variant="outline" className="rounded-2xl" onClick={() => openLead("Genel Bilgi")}
              >
              <Info className="h-4 w-4" />
              <span className="ml-2">Sorunu Yaz, Planı Al</span>
            </Button>
          </div>
        </motion.div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {services.map((s, idx) => (
            <motion.div
              key={s.key}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: idx * 0.05 }}
            >
              <Card className="rounded-3xl border-slate-200 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 text-base font-semibold">
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white">
                          {s.icon}
                        </span>
                        <span>{s.name}</span>
                      </div>
                      <div className="mt-2 text-sm text-slate-600">{s.short}</div>
                    </div>
                    <Badge variant="secondary" className="rounded-2xl">{s.name === "Saç Ekimi" ? "Ana" : "Ek"}</Badge>
                  </div>

                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-slate-200 p-4">
                      <div className="text-sm font-semibold">Faydaları</div>
                      <ul className="mt-2 space-y-1.5 text-sm text-slate-600">
                        {s.bullets.map((b) => (
                          <li key={b} className="flex gap-2">
                            <CheckCircle2 className="mt-0.5 h-4 w-4" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-2xl border border-slate-200 p-4">
                      <div className="text-sm font-semibold">Ne zaman avantajlı?</div>
                      <ul className="mt-2 space-y-1.5 text-sm text-slate-600">
                        {s.when.map((w) => (
                          <li key={w} className="flex gap-2">
                            <CheckCircle2 className="mt-0.5 h-4 w-4" />
                            <span>{w}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="grid gap-2 sm:grid-cols-3 sm:items-center">
                      <div>
                        <div className="text-xs text-slate-500">Paket</div>
                        <div className="text-sm font-semibold">{s.price.package}</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500">Tek seans / hizmet</div>
                        <div className="text-sm font-semibold">{s.price.single}</div>
                      </div>
                      <div className="sm:text-right">
                        <Button className="w-full rounded-2xl sm:w-auto" onClick={() => openLead(s.name)}>
                          <MessageCircle className="h-4 w-4" />
                          <span className="ml-2">{s.cta}</span>
                        </Button>
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-slate-500">{s.price.note}</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Doctor */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6" id="doctor">
        <motion.div {...fadeUp}>
          <Card className="rounded-3xl border-slate-200">
            <CardContent className="grid gap-8 p-6 sm:p-10 lg:grid-cols-3 lg:items-center">
              <div className="lg:col-span-1">
                <div className="aspect-square w-full rounded-3xl bg-slate-100" />
                <div className="mt-3 text-xs text-slate-500">*Buraya doktor fotoğrafı / portre görseli ekleyebilirsiniz.</div>
              </div>

              <div className="lg:col-span-2">
                <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600">
                  <Stethoscope className="h-3.5 w-3.5" />
                  <span>Hekim değerlendirmesi ile planlama</span>
                </div>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">Dr. İbrahim</h3>
                <p className="mt-2 text-slate-600">
                  Her danışanda hedef; <span className="font-medium">doğal görünüm</span>, <span className="font-medium">doğru plan</span> ve
                  <span className="font-medium"> şeffaf iletişim</span>. Saç ekimi ve destek uygulamaları (eksozom/mezoterapi/ozon) için kişiye özel
                  değerlendirme yapılır.
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {["Kişiye özel saç çizgisi tasarımı", "Takip planı ve bilgilendirme", "Şeffaf fiyat ve seans planı", "WhatsApp üzerinden hızlı iletişim"].map(
                    (t) => (
                      <div key={t} className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3">
                        <CheckCircle2 className="h-4 w-4" />
                        <span className="text-sm text-slate-700">{t}</span>
                      </div>
                    )
                  )}
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Button className="rounded-2xl" size="lg" onClick={() => openLead("Doktor Görüşmesi")}
                    >
                    <MessageCircle className="h-4 w-4" />
                    <span className="ml-2">Doktora Soru Sor</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-2xl"
                    size="lg"
                    onClick={() => {
                      const el = document.getElementById("pricing");
                      el?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                  >
                    <span>Fiyat Tablosu</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* Pricing */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6" id="pricing">
        <motion.div {...fadeUp} className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Paket ve Tek Seans Fiyatları</h2>
            <p className="mt-2 text-slate-600">
              Aşağıdaki fiyatlar bilgilendirme amaçlı aralıktır. En net plan için WhatsApp üzerinden kısa bilgi bırakman yeterli.
            </p>
          </div>
          <Button className="hidden rounded-2xl sm:inline-flex" onClick={() => openLead("Fiyat")}
            >
            <MessageCircle className="h-4 w-4" />
            <span className="ml-2">Kişisel Teklif Al</span>
          </Button>
        </motion.div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {pricing.map((p) => (
            <Card key={p.name} className="rounded-3xl border-slate-200">
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-lg font-semibold">{p.name}</div>
                    <div className="mt-1 text-sm text-slate-600">{p.note}</div>
                  </div>
                  <Button variant="outline" className="rounded-2xl" onClick={() => openLead(p.name)}>
                    <span>Bilgi Al</span>
                  </Button>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="text-xs text-slate-500">Paket</div>
                    <div className="mt-1 text-sm font-semibold">{p.package}</div>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="text-xs text-slate-500">Tek seans</div>
                    <div className="mt-1 text-sm font-semibold">{p.single}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-4 text-xs text-slate-500">
          Not: Tıbbi uygulamalar için uygunluk, beklenti ve riskler hekim değerlendirmesiyle belirlenir.
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6" id="faq">
        <motion.div {...fadeUp}>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Sık Sorulan Sorular</h2>
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {[
              {
                q: "Uygun muyum?",
                a: "Uygunluk; dökülme tipi, donör alan, beklenti ve genel sağlık durumuna göre belirlenir. En hızlı yol WhatsApp’tan fotoğrafsız da kısa bilgi bırakmak.",
              },
              {
                q: "Fiyatlar neden aralık?",
                a: "Seans sayısı, uygulama kapsamı ve kişisel plan fiyatı etkiler. Size net fiyatı değerlendirmeden sonra paylaşmak en doğrusudur.",
              },
              {
                q: "Ne kadar sürede dönüş alırım?",
                a: "Yoğunluğa göre aynı gün veya 24 saat içinde dönüş hedeflenir.",
              },
              {
                q: "Bilgilerim nereye gidiyor?",
                a: "Formu gönderdiğinizde WhatsApp’ta hazır mesaj oluşturulur; siz onaylayıp gönderirsiniz.",
              },
            ].map((item) => (
              <Card key={item.q} className="rounded-3xl border-slate-200">
                <CardContent className="p-6">
                  <div className="text-sm font-semibold">{item.q}</div>
                  <div className="mt-2 text-sm text-slate-600">{item.a}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Footer / Contact */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-2xl bg-slate-900" />
              <div>
                <div className="text-sm font-semibold">Dr. İbrahim</div>
                <div className="text-xs text-slate-500">Saç Ekimi • Estetik Uygulamalar</div>
              </div>
            </div>
            <p className="mt-3 text-sm text-slate-600">
              Randevu ve bilgi için WhatsApp üzerinden hızlıca iletişime geçebilirsiniz.
            </p>
          </div>

          <div>
            <div className="text-sm font-semibold">İletişim</div>
            <div className="mt-3 space-y-2 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>0546 737 22 84</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                <button className="underline" onClick={() => openLead("İletişim")}>WhatsApp ile yaz</button>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>İstanbul (Konum alanı)</span>
              </div>
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold">Hızlı CTA</div>
            <div className="mt-3 grid gap-2">
              <Button className="rounded-2xl" onClick={() => openLead("Saç Ekimi")}
                >
                <MessageCircle className="h-4 w-4" />
                <span className="ml-2">Saç Ekimi Bilgisi Al</span>
              </Button>
              <Button variant="outline" className="rounded-2xl" onClick={() => openLead("Eksozom")}
                >
                <Sparkles className="h-4 w-4" />
                <span className="ml-2">Eksozom Sor</span>
              </Button>
              <Button variant="outline" className="rounded-2xl" onClick={() => openLead("Botox")}
                >
                <Star className="h-4 w-4" />
                <span className="ml-2">Botox Sor</span>
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 py-6">
          <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <span>© {new Date().getFullYear()} Dr. İbrahim • Tüm hakları saklıdır.</span>
            <span>Bilgilendirme amaçlıdır; tanı/tedavi yerine geçmez.</span>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <div className="fixed bottom-4 right-4 z-40">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => openLead(selectedInterest || "Saç Ekimi")}
          className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-lg"
        >
          <MessageCircle className="h-4 w-4" />
          WhatsApp
        </motion.button>
      </div>

      {/* Popup Form */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 sm:items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className="w-full max-w-lg"
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.98 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <Card className="rounded-3xl border-slate-200 shadow-2xl">
                <CardContent className="p-6 sm:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-sm font-medium text-slate-600">Hızlı bilgi formu</div>
                      <div className="mt-1 text-xl font-semibold tracking-tight">WhatsApp’ta hazır mesaj oluşturalım</div>
                      <div className="mt-2 text-sm text-slate-600">
                        İsim ve telefonunu yaz — mesajına <span className="font-medium">{selectedInterest}</span> bilgisi eklensin.
                      </div>
                    </div>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="rounded-2xl border border-slate-200 px-3 py-2 text-sm"
                      aria-label="Kapat"
                    >
                      Kapat
                    </button>
                  </div>

                  <form className="mt-6 grid gap-4" onSubmit={submitLead}>
                    <div className="grid gap-2">
                      <Label htmlFor="name">İsim Soyisim</Label>
                      <Input
                        id="name"
                        placeholder="Örn. Ahmet Yılmaz"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="rounded-2xl"
                        required
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="phone">Telefon</Label>
                      <Input
                        id="phone"
                        placeholder="Örn. 05XXXXXXXXX"
                        value={phone}
                        onChange={(e) => setPhone(formatPhoneTR(e.target.value))}
                        inputMode="tel"
                        className="rounded-2xl"
                        required
                      />
                      <div className="text-xs text-slate-500">En az 10 hane girin.</div>
                    </div>

                    <label className="flex cursor-pointer items-start gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
                      <input
                        type="checkbox"
                        className="mt-1"
                        checked={consent}
                        onChange={(e) => setConsent(e.target.checked)}
                      />
                      <span>
                        Bilgilerim WhatsApp mesajına eklenerek iletilsin.
                        <span className="block text-xs text-slate-500">(Mesajı siz onaylayıp gönderirsiniz.)</span>
                      </span>
                    </label>

                    <div className="mt-1 grid gap-2 sm:grid-cols-2">
                      <Button
                        type="button"
                        variant="outline"
                        className="rounded-2xl"
                        onClick={() => setIsOpen(false)}
                      >
                        Vazgeç
                      </Button>
                      <Button
                        type="submit"
                        className={cn("rounded-2xl", (!name.trim() || phone.replace(/\D/g, "").length < 10 || !consent) && "opacity-60")}
                        disabled={!name.trim() || phone.replace(/\D/g, "").length < 10 || !consent}
                      >
                        <MessageCircle className="h-4 w-4" />
                        <span className="ml-2">WhatsApp’ta Mesajı Aç</span>
                      </Button>
                    </div>

                    <div className="text-xs text-slate-500">
                      Alternatif: Mesaj açılmazsa, doğrudan WhatsApp’tan <span className="font-medium">0546 737 22 84</span> numarasına yazabilirsiniz.
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
