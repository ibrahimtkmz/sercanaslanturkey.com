"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  CalendarClock,
  CheckCircle2,
  HeartPulse,
  Info,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  Stethoscope,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

const WHATSAPP_PHONE_E164 = "905467372284"; // 0546 737 22 84

const fade = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.55, ease: "easeOut" },
};

function formatPhoneTR(input) {
  const digits = (input || "").replace(/\D/g, "");
  return digits.slice(0, 11);
}

function buildWhatsAppUrl({ name, phone, interest }) {
  const lines = [
    "Merhaba, eksozom sayfanızdan bilgi almak istiyorum.",
    name ? `\nİsim Soyisim: ${name}` : null,
    phone ? `Telefon: ${phone}` : null,
    interest ? `İlgilendiğim uygulama: ${interest}` : null,
    "\nMüsait olduğunuzda dönüş yapabilir misiniz?",
  ].filter(Boolean);

  const encoded = encodeURIComponent(lines.join("\n"));
  return `https://wa.me/${WHATSAPP_PHONE_E164}?text=${encoded}`;
}

export default function Page() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [interest, setInterest] = useState("Eksozom");

  const highlights = useMemo(
    () => [
      {
        title: "Doktor kontrolünde",
        desc: "Kişiye özel eksozom protokolü ve düzenli takip",
        icon: <ShieldCheck className="h-5 w-5" />,
      },
      {
        title: "Hızlı dönüş",
        desc: "WhatsApp üzerinden aynı gün randevu",
        icon: <MessageCircle className="h-5 w-5" />,
      },
      {
        title: "Şeffaf fiyat",
        desc: "Seans sayısı ve ücretler net paylaşılır",
        icon: <BadgeCheck className="h-5 w-5" />,
      },
      {
        title: "Modern klinik",
        desc: "Hijyenik ortam ve konforlu uygulama alanı",
        icon: <Star className="h-5 w-5" />,
      },
    ],
    []
  );

  const benefits = useMemo(
    () => [
      {
        title: "Onarım ve destek",
        desc: "Saçlı derinin ihtiyaç duyduğu büyüme faktörlerini hedefler.",
        icon: <HeartPulse className="h-5 w-5" />,
      },
      {
        title: "Uygulama sonrası bakım",
        desc: "Saç ekimi sonrasında iyileşme dönemini destekleyici yaklaşım.",
        icon: <Stethoscope className="h-5 w-5" />,
      },
      {
        title: "Kısa seans",
        desc: "Planlanan protokole göre 20-30 dakikalık uygulamalar.",
        icon: <CalendarClock className="h-5 w-5" />,
      },
      {
        title: "Kişiye özel",
        desc: "Durumunuza ve beklentinize göre seans aralıkları belirlenir.",
        icon: <Sparkles className="h-5 w-5" />,
      },
    ],
    []
  );

  const steps = useMemo(
    () => [
      {
        title: "Ön görüşme",
        desc: "Durumunu WhatsApp ile paylaş, medikal danışman seni arasın.",
      },
      {
        title: "Değerlendirme",
        desc: "Doktor kontrolünde saçlı deri ihtiyacın belirlenir.",
      },
      {
        title: "Protokol",
        desc: "Eksozom seans sayısı, destekleyici bakım ve fiyat bilgisi netleşir.",
      },
      {
        title: "Takip",
        desc: "Her seans sonrası kontrol ve bakım önerileri sunulur.",
      },
    ],
    []
  );

  const packages = useMemo(
    () => [
      {
        name: "Destekleyici Plan",
        price: "3 seans • 12.000 – 18.000 TL",
        desc: "Saç ekimi sonrası toparlanma ve bakım amaçlı",
      },
      {
        name: "Yoğun Bakım",
        price: "5-6 seans • 20.000 – 28.000 TL",
        desc: "Dökülme döneminde saçlı deriyi güçlendirme odaklı",
      },
      {
        name: "Kombine Protokol",
        price: "Eksozom + Mezoterapi",
        desc: "Kişiye özel plan ve fiyatlandırma, doktor değerlendirmesi ile",
      },
    ],
    []
  );

  const submitLead = (event) => {
    event?.preventDefault();
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 10) return;

    const url = buildWhatsAppUrl({ name: name.trim(), phone: digits, interest });
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const quickContact = (selected) => {
    setInterest(selected);
    const url = buildWhatsAppUrl({ name: name.trim(), phone: phone.trim(), interest: selected });
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-[#050915] via-[#0b132a] to-slate-950" />
      <div className="fixed -left-40 top-20 -z-10 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="fixed right-0 top-60 -z-10 h-[420px] w-[420px] rounded-full bg-cyan-500/10 blur-3xl" />

      <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-500" />
            <div className="leading-tight">
              <p className="text-xs uppercase tracking-[0.15em] text-emerald-200">Doku Clinic</p>
              <p className="text-sm font-semibold text-white">Eksozom ve Saç Uygulamaları</p>
            </div>
          </div>

          <div className="hidden items-center gap-2 sm:flex">
            <Button
              variant="outline"
              className="rounded-2xl border-white/20 bg-transparent text-white hover:bg-white/5"
              onClick={() => quickContact("Hemen Ara")}
            >
              <Phone className="h-4 w-4" />
              <span className="ml-2">Hemen Ara</span>
            </Button>
            <Button
              className="rounded-2xl bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 text-slate-950 hover:opacity-90"
              onClick={() => quickContact("WhatsApp")}
            >
              <MessageCircle className="h-4 w-4" />
              <span className="ml-2">WhatsApp</span>
            </Button>
          </div>
        </div>
      </header>

      <main>
        <section className="border-b border-white/5">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:py-16">
            <motion.div {...fade}>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-emerald-100">
                <BadgeCheck className="h-3.5 w-3.5" />
                Doktor kontrolünde eksozom planı
              </div>

              <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
                Eksozom terapi ile saçlı deride
                <span className="block text-emerald-200">destek, onarım ve hızlı takip.</span>
              </h1>

              <p className="mt-4 text-base leading-relaxed text-slate-200 sm:text-lg">
                Doku Clinic ekibiyle ihtiyacına göre eksozom protokolü, seans sayısı ve fiyat bilgisi. WhatsApp üzerinden aynı gün içinde sana özel planı paylaşalım.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Button
                  className="rounded-2xl bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 text-slate-950 hover:opacity-90"
                  size="lg"
                  onClick={(e) => {
                    e.preventDefault();
                    submitLead();
                  }}
                >
                  <MessageCircle className="h-4 w-4" />
                  <span className="ml-2">WhatsApp’ta Bilgi Al</span>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-2xl border-white/20 bg-transparent text-white hover:bg-white/5"
                  onClick={() => quickContact("Randevu")}
                >
                  <CalendarClock className="h-4 w-4" />
                  <span className="ml-2">Randevu Talep Et</span>
                </Button>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {["Aynı gün dönüş", "Kişiye özel plan", "Şeffaf fiyat"].map((t) => (
                  <div key={t} className="flex items-center gap-2 rounded-2xl border border-white/5 bg-white/5 px-4 py-3">
                    <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                    <span className="text-sm text-slate-200">{t}</span>
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
              <Card className="rounded-3xl border-white/10 bg-white/5 shadow-2xl backdrop-blur">
                <CardContent className="p-6 sm:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-emerald-100">Hızlı bilgi formu</p>
                      <p className="mt-1 text-xl font-semibold tracking-tight text-white">2 dakikada WhatsApp’a yönlendirelim</p>
                      <p className="mt-2 text-sm text-slate-200">İlgilendiğin uygulamayı seç, bilgilerini bırak, hazır mesaj açılsın.</p>
                    </div>
                    <Badge className="rounded-2xl bg-white/10 text-white">Güvenli</Badge>
                  </div>

                  <form className="mt-6 grid gap-4" onSubmit={submitLead}>
                    <div className="grid gap-2">
                      <Label htmlFor="interest" className="text-slate-200">
                        Uygulama
                      </Label>
                      <div className="grid grid-cols-2 gap-2">
                        {["Eksozom", "Saç Ekimi", "Mezoterapi", "Botox"].map((item) => (
                          <button
                            key={item}
                            type="button"
                            onClick={() => setInterest(item)}
                            className={`rounded-2xl border px-3 py-2 text-sm transition ${
                              interest === item
                                ? "border-emerald-300 bg-emerald-500/20 text-white"
                                : "border-white/10 bg-white/5 text-slate-200 hover:border-white/30"
                            }`}
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="name" className="text-slate-200">
                        İsim Soyisim
                      </Label>
                      <Input
                        id="name"
                        placeholder="Örn. Ahmet Yılmaz"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="rounded-2xl border-white/10 bg-white/10 text-white placeholder:text-slate-300"
                        required
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="phone" className="text-slate-200">
                        Telefon
                      </Label>
                      <Input
                        id="phone"
                        placeholder="05xx xxx xx xx"
                        value={phone}
                        onChange={(e) => setPhone(formatPhoneTR(e.target.value))}
                        className="rounded-2xl border-white/10 bg-white/10 text-white placeholder:text-slate-300"
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="rounded-2xl bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 text-slate-950 hover:opacity-90"
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span className="ml-2">WhatsApp’ta Mesaj Oluştur</span>
                    </Button>

                    <p className="text-xs text-slate-300">*Formu gönderdiğinde WhatsApp’ta hazır mesaj açılır. Bilgilerin üçüncü kişilerle paylaşılmaz.</p>
                  </form>
                </CardContent>
              </Card>

              <div className="pointer-events-none absolute -bottom-6 -left-6 h-24 w-24 rounded-3xl bg-emerald-500/10 blur-2xl" />
            </motion.div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <motion.div {...fade} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[{ title: "Doktor kontrolünde", icon: ShieldCheck }, { title: "Modern klinik", icon: Star }, { title: "Planlı takip", icon: CalendarClock }, { title: "Hızlı iletişim", icon: MessageCircle }].map((item) => (
              <Card key={item.title} className="rounded-3xl border-white/10 bg-white/5">
                <CardContent className="flex items-center gap-3 p-5">
                  <span className="rounded-xl bg-white/10 p-2 text-emerald-200">
                    <item.icon className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-semibold text-white">{item.title}</span>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </section>

        <section className="border-y border-white/5 bg-white/5">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
            <motion.div {...fade} className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Eksozom uygulaması kimler için?</h2>
                <p className="mt-2 max-w-2xl text-slate-200">Dökülme döneminde saçlı deride bakım, saç ekimi sonrası destek veya genel güçlendirme ihtiyacı olanlar için planlı protokoller.</p>
              </div>
              <Button
                variant="outline"
                className="w-full rounded-2xl border-white/20 bg-transparent text-white hover:bg-white/10 lg:w-auto"
                onClick={() => quickContact("Plan")}
              >
                <Info className="h-4 w-4" />
                <span className="ml-2">Durumunu Paylaş</span>
              </Button>
            </motion.div>

            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              {benefits.map((item, idx) => (
                <motion.div key={item.title} {...fade} transition={{ ...fade.transition, delay: idx * 0.05 }}>
                  <Card className="rounded-3xl border-white/10 bg-slate-900/70 shadow-sm">
                    <CardContent className="flex gap-4 p-6">
                      <div className="h-10 w-10 rounded-2xl bg-white/10 p-2 text-emerald-200">{item.icon}</div>
                      <div>
                        <p className="text-base font-semibold text-white">{item.title}</p>
                        <p className="mt-2 text-sm text-slate-200">{item.desc}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <motion.div {...fade} className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Klinikte seni nasıl ilerletiyoruz?</h2>
              <p className="mt-2 max-w-2xl text-slate-200">Kısa görüşme sonrası durumunu değerlendirip kişiselleştirilmiş eksozom protokolünü, seans sayısını ve fiyatını netleştiriyoruz.</p>
            </div>
            <Button
              className="w-full rounded-2xl bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 text-slate-950 hover:opacity-90 lg:w-auto"
              onClick={() => quickContact("WhatsApp")}
            >
              <MessageCircle className="h-4 w-4" />
              <span className="ml-2">WhatsApp’tan Yaz</span>
            </Button>
          </motion.div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((item, idx) => (
              <motion.div key={item.title} {...fade} transition={{ ...fade.transition, delay: idx * 0.05 }}>
                <Card className="h-full rounded-3xl border-white/10 bg-white/5">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-emerald-100">Adım {idx + 1}</p>
                      <ArrowRight className="h-4 w-4 text-emerald-200" />
                    </div>
                    <p className="mt-3 text-lg font-semibold text-white">{item.title}</p>
                    <p className="mt-2 text-sm text-slate-200">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="border-y border-white/5 bg-white/5">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
            <motion.div {...fade} className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Paket ve seans bilgisi</h2>
                <p className="text-slate-200">Eksozom protokolü, doktor değerlendirmesiyle kişiye göre şekillenir.</p>
              </div>
              <Button
                variant="outline"
                className="mt-3 w-full rounded-2xl border-white/20 bg-transparent text-white hover:bg-white/10 sm:mt-0 sm:w-auto"
                onClick={() => quickContact("Fiyat")}
              >
                <Info className="h-4 w-4" />
                <span className="ml-2">Fiyat Bilgisi Al</span>
              </Button>
            </motion.div>

            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              {packages.map((item, idx) => (
                <motion.div key={item.name} {...fade} transition={{ ...fade.transition, delay: idx * 0.05 }}>
                  <Card className="h-full rounded-3xl border-white/10 bg-slate-900/70">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-emerald-100">{item.name}</p>
                        <Badge className="rounded-xl bg-white/10 text-white">Eksozom</Badge>
                      </div>
                      <p className="mt-3 text-xl font-semibold text-white">{item.price}</p>
                      <p className="mt-2 text-sm text-slate-200">{item.desc}</p>
                      <Button
                        variant="outline"
                        className="mt-6 w-full rounded-2xl border-white/20 text-white hover:bg-white/10"
                        onClick={() => quickContact(item.name)}
                      >
                        Planı öğren
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <motion.div {...fade}>
              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-emerald-200">Doku Clinic</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Modern klinik ve ulaşım kolaylığı</h2>
              <p className="mt-3 max-w-2xl text-slate-200">
                Kliniğimizde hijyenik ortam, uzman ekip ve konforlu bakım alanlarıyla eksozom ve saç uygulamalarını gerçekleştiriyoruz. İstanbul içinde kolay ulaşım ve park imkanı ile kısa sürede randevu alabilirsin.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {highlights.map((item) => (
                  <div key={item.title} className="flex items-start gap-3 rounded-2xl border border-white/5 bg-white/5 px-4 py-3">
                    <span className="mt-0.5 rounded-xl bg-white/10 p-2 text-emerald-200">{item.icon}</span>
                    <div>
                      <p className="text-sm font-semibold text-white">{item.title}</p>
                      <p className="text-xs text-slate-200">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Button
                  className="rounded-2xl bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 text-slate-950 hover:opacity-90"
                  onClick={() => quickContact("Konum")}
                >
                  <MapPin className="h-4 w-4" />
                  <span className="ml-2">Yol Tarifi Al</span>
                </Button>
                <Button
                  variant="outline"
                  className="rounded-2xl border-white/20 text-white hover:bg-white/5"
                  onClick={() => quickContact("Randevu")}
                >
                  <Phone className="h-4 w-4" />
                  <span className="ml-2">Randevu İçin Ara</span>
                </Button>
              </div>
            </motion.div>

            <motion.div {...fade} className="space-y-4">
              {["Saç ekimi sonrası bakım", "Dökülme döneminde destek", "Kişisel protokol planlama"].map((item, idx) => (
                <Card key={item} className="rounded-3xl border-white/10 bg-white/5">
                  <CardContent className="flex items-center justify-between p-5">
                    <div>
                      <p className="text-sm font-semibold text-emerald-100">Öne çıkan</p>
                      <p className="text-base font-semibold text-white">{item}</p>
                    </div>
                    <CheckCircle2 className="h-5 w-5 text-emerald-300" />
                  </CardContent>
                </Card>
              ))}

              <Card className="rounded-3xl border-emerald-200/40 bg-gradient-to-br from-emerald-500/20 via-cyan-400/20 to-blue-500/10">
                <CardContent className="p-6">
                  <p className="text-sm font-semibold text-slate-950">Hızlı iletişim</p>
                  <p className="mt-2 text-lg font-semibold text-slate-950">WhatsApp’tan hemen yaz, aynı gün dönüş yapalım.</p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <Button
                      className="rounded-2xl bg-slate-950 text-white hover:bg-slate-900"
                      onClick={() => quickContact("WhatsApp")}
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span className="ml-2">WhatsApp</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="rounded-2xl border-slate-900 text-slate-950 hover:bg-white/60"
                      onClick={() => quickContact("Hemen Ara")}
                    >
                      <Phone className="h-4 w-4" />
                      <span className="ml-2">Hemen Ara</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-slate-950/80">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 text-sm text-slate-300 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-500" />
            <div>
              <p className="font-semibold text-white">Doku Clinic</p>
              <p className="text-xs text-slate-300">Eksozom • Saç Ekimi • Mezoterapi</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              variant="outline"
              className="rounded-xl border-white/20 text-white hover:bg-white/5"
              onClick={() => quickContact("Randevu")}
            >
              <CalendarClock className="h-4 w-4" />
              <span className="ml-2">Randevu</span>
            </Button>
            <Button
              size="sm"
              className="rounded-xl bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 text-slate-950 hover:opacity-90"
              onClick={() => quickContact("WhatsApp")}
            >
              <MessageCircle className="h-4 w-4" />
              <span className="ml-2">WhatsApp</span>
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}
