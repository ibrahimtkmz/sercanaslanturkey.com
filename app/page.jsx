"use client";

import Image from "next/image";
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  CalendarClock,
  CheckCircle2,
  HeartPulse,
  Instagram,
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
import heroImage from "../hero_image-eksozom.webp";

const WHATSAPP_PHONE_E164 = "905467372284";
const PHONE_DISPLAY = "0546 737 22 84";
const PHONE_TEL = "+905467372284";
const INSTAGRAM_URL =
  "https://www.instagram.com/sercanaslanhairturkey?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw%3D%3D";
const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/place/Sercan+Aslan+-+Hair+Transplant+Turkey/@41.065804,28.997298,11z/data=!4m6!3m5!1s0x14cab7f4bdbae7ab:0x643f2261dec39eaa!8m2!3d41.065804!4d28.9972984!16s%2Fg%2F11rb3wk1_9?hl=tr-TR&entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoKLDEwMDc5MjA2OUgBUAM%3D";
const MAP_EMBED_URL = "https://www.google.com/maps?q=41.065804,28.997298&z=14&output=embed";

const fade = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-120px" },
  transition: { duration: 0.7, ease: "easeOut" },
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

  const services = useMemo(
    () => [
      {
        title: "Eksozom güçlendirme",
        desc: "Saçlı deriyi onaran, kökleri koruyan ve canlılığı artıran protokol.",
        icon: <HeartPulse className="h-5 w-5" />,
      },
      {
        title: "Saç ekimi sonrası bakım",
        desc: "İyileşmeyi hızlandıran, kızarıklık ve kabuklanmayı azaltan özel bakım.",
        icon: <Stethoscope className="h-5 w-5" />,
      },
      {
        title: "Yoğun kök desteği",
        desc: "Dökülme döneminde kökleri güçlendiren yoğunlaştırılmış seanslar.",
        icon: <ShieldCheck className="h-5 w-5" />,
      },
    ],
    []
  );

  const steps = useMemo(
    () => [
      {
        title: "Hızlı ön görüşme",
        desc: "WhatsApp veya telefonla saç durumunu paylaş, aynı gün yanıt al.",
      },
      {
        title: "Kişisel plan",
        desc: "Dr. İbrahim saçlı derini inceleyip seans sayısını ve içerikleri belirler.",
      },
      {
        title: "20-30 dakikalık seanslar",
        desc: "Konforlu uygulamalar ve her seans sonrası iyileşme takibi.",
      },
      {
        title: "Gözle görülür takip",
        desc: "Fotoğraf ve klinik kontrollerle gelişimin şeffaf paylaşımı.",
      },
    ],
    []
  );

  const faqItems = useMemo(
    () => [
      {
        q: "Eksozom uygulaması acıtır mı?",
        a: "Lokal anestezi destekli, kısa süren ve tolere edilebilir konfor düzeyinde uygulanır.",
      },
      {
        q: "Kaç seans gerekir?",
        a: "Dökülme seviyesi ve hedefe göre 3-6 seans arası kişiye özel plan yapılır.",
      },
      {
        q: "Sonuçları ne zaman görürüm?",
        a: "İlk seanslardan itibaren deride rahatlama; 4-8 hafta içinde canlılık artışı gözlemlenir.",
      },
      {
        q: "Fiyat nasıl paylaşılır?",
        a: "Kısa bir WhatsApp mesajından sonra şeffaf seans ve ücret detayını iletiyoruz.",
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
      <header className="sticky top-0 z-40 border-b border-white/5 bg-slate-950/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-400 shadow-lg shadow-emerald-500/30" />
            <div className="leading-tight">
              <p className="text-[11px] uppercase tracking-[0.18em] text-emerald-200">Sercan Aslan Clinic</p>
              <p className="text-sm font-semibold text-white">Saç ekimi & eksozom bakım</p>
            </div>
          </div>

          <div className="hidden items-center gap-2 sm:flex">
            <Button
              variant="outline"
              className="rounded-2xl border-white/25 bg-transparent text-white hover:bg-white/10"
              onClick={() => quickContact("Telefon")}
            >
              <Phone className="h-4 w-4" />
              <span className="ml-2">{PHONE_DISPLAY}</span>
            </Button>
            <Button className="rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 hover:opacity-90" onClick={() => quickContact("WhatsApp")}>
              <MessageCircle className="h-4 w-4" />
              <span className="ml-2">WhatsApp</span>
            </Button>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden border-b border-white/5">
          <div className="absolute inset-0 -z-20">
            <Image
              src={heroImage}
              alt="Eksozom uygulaması hero görseli"
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-950/80 to-slate-900/40" />
          </div>
          <div className="absolute -left-20 top-10 h-64 w-64 rounded-full bg-emerald-500/25 blur-3xl" />
          <div className="absolute right-10 bottom-0 h-72 w-72 rounded-full bg-cyan-500/25 blur-3xl" />

          <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-20">
            <motion.div {...fade} className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs text-emerald-100">
                <BadgeCheck className="h-3.5 w-3.5" />
                Dr. İbrahim kontrolünde planlanan yeni nesil saç bakımı
              </div>

              <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">
                Saç köklerini güçlendiren
                <span className="block bg-gradient-to-r from-emerald-300 via-cyan-200 to-white bg-clip-text text-transparent">
                  eksozom bakım deneyimi.
                </span>
              </h1>

              <p className="max-w-2xl text-base leading-relaxed text-slate-100 sm:text-lg">
                Saç dökülmesi, saç ekimi sonrası iyileşme veya saçlı deri bakımında bilimsel içeriklerle desteklenen, kişiye özel eksozom protokolü. Her seans sonrası net takip ve şeffaf fiyat paylaşımı.
              </p>

              <div className="grid gap-3 sm:grid-cols-3">
                {["Klinik onayı", "Aynı gün dönüş", "Şeffaf fiyat"].map((item) => (
                  <div key={item} className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-4 py-3">
                    <CheckCircle2 className="h-4 w-4 text-emerald-200" />
                    <span className="text-sm text-slate-100">{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <Button
                  size="lg"
                  className="rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 hover:opacity-90"
                  onClick={submitLead}
                >
                  <MessageCircle className="h-4 w-4" />
                  <span className="ml-2">WhatsApp’ta bilgi al</span>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-2xl border-white/25 bg-white/5 text-white hover:bg-white/10"
                  onClick={() => quickContact("Randevu")}
                >
                  <CalendarClock className="h-4 w-4" />
                  <span className="ml-2">Kliniğe gelmek istiyorum</span>
                </Button>
              </div>

              <div className="flex items-center gap-3 rounded-2xl bg-slate-900/70 p-4 ring-1 ring-white/10">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-100">
                  <Star className="h-5 w-5" />
                </div>
                <div className="leading-tight">
                  <p className="text-sm font-semibold text-white">4.8/5 Google yorumları</p>
                  <p className="text-xs text-slate-200">Gerçek hastaların iyileşme sürecine dair deneyimler.</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative w-full"
            >
              <div className="absolute -inset-4 -z-10 rounded-[32px] bg-slate-900/60 blur-2xl" />
              <Card className="relative overflow-hidden rounded-3xl border-white/15 bg-white/10 shadow-2xl backdrop-blur-xl">
                <div className="absolute inset-x-6 -top-10 flex items-center gap-2 text-xs text-emerald-100">
                  <div className="rounded-full border border-white/20 bg-slate-900/60 px-3 py-1 font-semibold">Kişisel plan</div>
                  <div className="rounded-full border border-white/20 bg-slate-900/60 px-3 py-1 font-semibold">Doktor kontrolü</div>
                </div>
                <CardContent className="space-y-5 p-6 sm:p-8">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm text-emerald-100">Sercan Aslan Clinic</p>
                      <p className="mt-1 text-2xl font-semibold tracking-tight text-white">1 dakikada WhatsApp formu</p>
                      <p className="mt-2 text-sm text-slate-200">Hangi uygulamaya ihtiyacın olduğunu seç, bilgilerini yaz, hazır mesaj açılsın.</p>
                    </div>
                    <Badge className="rounded-full bg-white/15 text-white">Gizlilik</Badge>
                  </div>

                  <form className="grid gap-4" onSubmit={submitLead}>
                    <div className="grid gap-2">
                      <Label htmlFor="interest" className="text-slate-200">
                        Uygulama tercihi
                      </Label>
                      <div className="grid grid-cols-2 gap-2">
                        {["Eksozom", "Saç Ekimi", "Mezoterapi", "PRP"].map((item) => (
                          <button
                            key={item}
                            type="button"
                            onClick={() => setInterest(item)}
                            className={`rounded-2xl border px-3 py-2 text-sm transition ${
                              interest === item
                                ? "border-emerald-200 bg-emerald-500/20 text-white shadow-[0_10px_40px_-25px_rgba(16,185,129,0.9)]"
                                : "border-white/10 bg-white/5 text-slate-200 hover:border-white/25"
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

                    <Button type="submit" size="lg" className="rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 hover:opacity-90">
                      <MessageCircle className="h-4 w-4" />
                      <span className="ml-2">WhatsApp’ta mesaj oluştur</span>
                    </Button>

                    <p className="text-xs text-slate-300">Gönderdiğinde WhatsApp’ta hazır mesaj açılır. Bilgilerin gizlilikle saklanır.</p>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <motion.div {...fade} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Dr. İbrahim tarafından planlanır", icon: ShieldCheck },
              { title: "Klinik standartta hijyen", icon: Sparkles },
              { title: "Aynı gün dönüş garantisi", icon: MessageCircle },
              { title: "Şeffaf seans ücretleri", icon: CalendarClock },
            ].map((item) => (
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

        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6" id="services">
          <motion.div {...fade} className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">İhtiyacına göre yeni düzen</h2>
              <p className="mt-2 max-w-2xl text-slate-200">Saç köklerini hedefleyen modern eksozom yaklaşımı; bakım, onarım ve güçlendirme için üç farklı yoğunlukta plan.</p>
            </div>
            <Button
              className="w-full rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 hover:opacity-90 lg:w-auto"
              onClick={() => quickContact("Plan talebi")}
            >
              <ArrowRight className="h-4 w-4" />
              <span className="ml-2">Hangi plan uygun?</span>
            </Button>
          </motion.div>

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {services.map((item, idx) => (
              <motion.div key={item.title} {...fade} transition={{ ...fade.transition, delay: idx * 0.05 }}>
                <Card className="h-full rounded-3xl border-white/10 bg-white/5">
                  <CardContent className="flex h-full flex-col gap-4 p-6">
                    <div className="flex items-center gap-3">
                      <span className="rounded-2xl bg-white/10 p-3 text-emerald-200">{item.icon}</span>
                      <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                    </div>
                    <p className="text-sm text-slate-200">{item.desc}</p>
                    <div className="mt-auto flex items-center gap-2 text-xs text-emerald-100">
                      <BadgeCheck className="h-4 w-4" />
                      Dr. İbrahim takipli seanslar
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6" id="process">
          <motion.div {...fade} className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Yeni süreç tasarımı</h2>
              <p className="mt-2 text-slate-200">İlk mesajdan son kontrole kadar her adımın şeffaf ve ölçülebilir olduğu yeni akış.</p>
            </div>
            <Button
              variant="outline"
              className="w-full rounded-2xl border-white/25 bg-transparent text-white hover:bg-white/10 lg:w-auto"
              onClick={() => quickContact("Süreç detayı")}
            >
              <MessageCircle className="h-4 w-4" />
              <span className="ml-2">Nasıl ilerler?</span>
            </Button>
          </motion.div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, idx) => (
              <motion.div key={step.title} {...fade} transition={{ ...fade.transition, delay: idx * 0.05 }}>
                <Card className="relative h-full overflow-hidden rounded-3xl border-white/10 bg-white/5">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-cyan-500/10" />
                  <CardContent className="relative p-6">
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-emerald-200">Adım {idx + 1}</span>
                      <Sparkles className="h-4 w-4 text-emerald-200" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-white">{step.title}</h3>
                    <p className="mt-2 text-sm text-slate-200">{step.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6" id="faq">
          <motion.div {...fade} className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Sık sorulanlar</h2>
              <p className="mt-2 text-slate-200">Kısa yanıtlar; detaylı bilgi için WhatsApp’tan yazabilirsin.</p>
            </div>
            <Button
              className="w-full rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 hover:opacity-90 lg:w-auto"
              onClick={() => quickContact("Soru")}
            >
              <MessageCircle className="h-4 w-4" />
              <span className="ml-2">Hızlı soru gönder</span>
            </Button>
          </motion.div>

          <div className="mt-6 grid gap-3">
            {faqItems.map((item, idx) => (
              <motion.details
                key={item.q}
                className="group rounded-3xl border border-white/10 bg-white/5 p-4"
                {...fade}
                transition={{ ...fade.transition, delay: idx * 0.05 }}
              >
                <summary className="flex cursor-pointer items-center justify-between gap-3 text-sm font-semibold text-white">
                  {item.q}
                  <ArrowRight className="h-4 w-4 text-emerald-200 transition group-open:rotate-90" />
                </summary>
                <p className="mt-2 text-sm text-slate-200">{item.a}</p>
              </motion.details>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-14 sm:px-6" id="contact">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <motion.div {...fade} className="rounded-3xl border border-white/10 bg-white/5">
              <CardContent className="grid gap-5 p-6 sm:p-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-100">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">Hızlı iletişim</p>
                    <p className="text-xs text-slate-200">Telefon, WhatsApp veya Instagram üzerinden ulaşabilirsin.</p>
                  </div>
                </div>

                <div className="grid gap-3 text-sm text-slate-200 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => window.open(`tel:${PHONE_TEL}`, "_self")}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left transition hover:border-white/25"
                  >
                    <span>Telefon: {PHONE_DISPLAY}</span>
                    <ArrowRight className="h-4 w-4 text-emerald-200" />
                  </button>
                  <button
                    type="button"
                    onClick={() => quickContact("WhatsApp bağlantı")}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left transition hover:border-white/25"
                  >
                    <span>WhatsApp ile randevu</span>
                    <ArrowRight className="h-4 w-4 text-emerald-200" />
                  </button>
                  <button
                    type="button"
                    onClick={() => window.open(INSTAGRAM_URL, "_blank", "noopener,noreferrer")}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left transition hover:border-white/25"
                  >
                    <span>Instagram / sercanaslanhairturkey</span>
                    <ArrowRight className="h-4 w-4 text-emerald-200" />
                  </button>
                  <button
                    type="button"
                    onClick={() => quickContact("Fiyat sorusu")}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left transition hover:border-white/25"
                  >
                    <span>Seans & fiyat bilgisi</span>
                    <ArrowRight className="h-4 w-4 text-emerald-200" />
                  </button>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-white">
                    <MapPin className="h-4 w-4 text-emerald-200" />
                    Klinik adresi
                  </div>
                  <p className="mt-2 text-sm text-slate-200">
                    <a
                      href={GOOGLE_MAPS_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="underline decoration-emerald-300/70 decoration-dotted underline-offset-4"
                    >
                      Merkez Mah. İstiklal Cad. No: 36, Şişli / İstanbul
                    </a>
                  </p>
                  <Button
                    variant="outline"
                    className="mt-3 w-full rounded-2xl border-white/20 bg-transparent text-white hover:bg-white/10"
                    onClick={() => window.open(GOOGLE_MAPS_URL, "_blank", "noopener,noreferrer")}
                  >
                    <MapPin className="h-4 w-4" />
                    <span className="ml-2">Haritada aç</span>
                  </Button>
                </div>
              </CardContent>
            </motion.div>

            <motion.div {...fade} className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/80">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-cyan-500/15" />
              <iframe
                src={MAP_EMBED_URL}
                title="Sercan Aslan Clinic Harita"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="relative h-full min-h-[360px] w-full"
              />
              <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-slate-950/70 px-3 py-1 text-xs font-semibold text-emerald-100 ring-1 ring-white/10">
                <MapPin className="h-3.5 w-3.5" />
                <span>Sercan Aslan Clinic</span>
              </div>
              <div className="absolute bottom-4 right-4 rounded-full bg-slate-950/70 px-3 py-1 text-[11px] font-semibold text-emerald-100 ring-1 ring-white/10">
                Konumu büyütmek için haritaya tıklayın
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 py-6">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 text-xs text-slate-300 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <span>© {new Date().getFullYear()} Sercan Aslan Clinic • Saç ekimi ve eksozom uygulamaları.</span>
          <span>Bilgilendirme amaçlıdır; tanı/tedavi yerine geçmez.</span>
        </div>
      </footer>
    </div>
  );
}
