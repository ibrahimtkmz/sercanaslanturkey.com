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
  Info,
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

const WHATSAPP_PHONE_E164 = "905467372284"; // 0546 737 22 84
const PHONE_DISPLAY = "0546 737 22 84";
const PHONE_TEL = "+905467372284";
const INSTAGRAM_URL =
  "https://www.instagram.com/sercanaslanhairturkey?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw%3D%3D";
const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/place/Sercan+Aslan+-+Hair+Transplant+Turkey/@41.065804,28.997298,11z/data=!4m6!3m5!1s0x14cab7f4bdbae7ab:0x643f2261dec39eaa!8m2!3d41.065804!4d28.9972984!16s%2Fg%2F11rb3wk1_9?hl=tr-TR&entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoKLDEwMDc5MjA2OUgBUAM%3D";
const MAP_EMBED_URL = "https://www.google.com/maps?q=41.065804,28.997298&z=14&output=embed";

const fade = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-120px" },
  transition: { duration: 0.65, ease: "easeOut" },
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
        title: "Saç dökülmesi", 
        desc: "Saç tellerinin güçlendirilmesi ve dökülme döneminde destek.",
        icon: <HeartPulse className="h-5 w-5" />,
      },
      {
        title: "Saç ekimi sonrası", 
        desc: "Operasyon sonrası iyileşmeyi hızlandıran onarıcı yaklaşım.",
        icon: <Stethoscope className="h-5 w-5" />,
      },
      {
        title: "Güçlü deri bakımı",
        desc: "Nem dengesi, canlılık ve sağlık için mikro ortam desteği.",
        icon: <ShieldCheck className="h-5 w-5" />,
      },
    ],
    []
  );

  const steps = useMemo(
    () => [
      {
        title: "Hızlı ön görüşme",
        desc: "WhatsApp ile saç durumunu paylaş, aynı gün medikal danışman geri dönüş yapsın.",
      },
      {
        title: "Dr. İbrahim değerlendirmesi",
        desc: "Saçlı deri ihtiyacı ve hedeflere göre Dr. İbrahim tarafından eksozom protokolü planlanır.",
      },
      {
        title: "Kişiye özel seans",
        desc: "20-30 dakikalık uygulamalar, gerekli seans sayısı ve aralıkları netleştirilir.",
      },
      {
        title: "Takip ve bakım",
        desc: "Her seans sonrası kontrol, destekleyici bakım ve sonuç takibi sağlanır.",
      },
    ],
    []
  );

  const packages = useMemo(
    () => [
      {
        name: "Destekleyici Plan",
        price: "3 seans • 12.000 – 18.000 TL",
        desc: "Saç ekimi sonrası iyileşme sürecini desteklemek için planlı uygulamalar.",
      },
      {
        name: "Yoğun Bakım",
        price: "5-6 seans • 20.000 – 28.000 TL",
        desc: "Dökülme döneminde saçlı derinin güçlendirilmesi ve kök desteği.",
      },
      {
        name: "Kombine Protokol",
        price: "Eksozom + Mezoterapi",
        desc: "Dr. İbrahim eşliğinde belirlenen eksozom ve mezoterapi kombine planı.",
      },
    ],
    []
  );

  const faqItems = useMemo(
    () => [
      {
        q: "Eksozom uygulaması acıtır mı?",
        a: "Uygulama lokal anestezi destekli, kısa süren ve tolere edilebilir düzeyde konforlu gerçekleştirilir.",
      },
      {
        q: "Seanslar ne kadar sürüyor?",
        a: "Planlanan protokole bağlı olarak 20-30 dakika arasında değişir ve aynı gün gündelik yaşama dönüş mümkündür.",
      },
      {
        q: "Kaç seans gerekir?",
        a: "Dr. İbrahim değerlendirmesi sonrası saç dökülme seviyesi ve hedefe göre 3-6 seans arası kişiye özel plan oluşturulur.",
      },
      {
        q: "Fiyat bilgisi nasıl paylaşılır?",
        a: "Hızlı WhatsApp mesajı sonrası uzman ekip ihtiyacına göre şeffaf seans ve ücret detayını paylaşır.",
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
      <header className="sticky top-0 z-40 border-b border-white/5 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl gradient-accent" />
            <div className="leading-tight">
              <p className="text-xs uppercase tracking-[0.15em] text-emerald-200">Sercan Aslan Clinic</p>
              <p className="text-sm font-semibold text-white">Eksozom Saç Bakım Uygulaması</p>
            </div>
          </div>

          <div className="hidden items-center gap-2 sm:flex">
            <Button
              variant="outline"
              className="rounded-2xl border-white/20 bg-transparent text-white hover:bg-white/5"
              onClick={() => quickContact("Telefon")}
            >
              <Phone className="h-4 w-4" />
              <span className="ml-2">{PHONE_DISPLAY}</span>
            </Button>
            <Button
              className="rounded-2xl gradient-primary hover:opacity-90"
              onClick={() => quickContact("WhatsApp")}
            >
              <MessageCircle className="h-4 w-4" />
              <span className="ml-2">WhatsApp</span>
            </Button>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden border-b border-white/5">
          <div className="absolute inset-0 -z-10 gradient-hero" />
          <div className="absolute -left-40 top-10 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl" />
          <div className="absolute right-0 top-40 h-96 w-96 rounded-full bg-cyan-500/15 blur-3xl" />

          <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-14 sm:px-6 lg:grid-cols-2">
            <motion.div {...fade} className="space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-emerald-100">
                <BadgeCheck className="h-3.5 w-3.5" />
                Dr. İbrahim kontrolünde eksozom protokolü
              </div>

              <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">
                Eksozom terapi ile saçlı deride
                <span className="block text-emerald-200">onarıcı bakım ve hızlı takip.</span>
              </h1>

              <p className="max-w-2xl text-base leading-relaxed text-slate-200 sm:text-lg">
                Saç dökülmesi, saç ekimi sonrası bakım veya saç derisi güçlendirme için Sercan Aslan Clinic’te Dr. İbrahim tarafından
                kişiye özel eksozom planı. WhatsApp üzerinden aynı gün seni arayıp seans sayısı ve fiyat bilgisini paylaşalım.
              </p>

              <div className="grid gap-3 sm:grid-cols-2">
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

              <div className="flex flex-wrap gap-3">
                <Button
                  className="rounded-2xl gradient-primary hover:opacity-90"
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

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
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
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl">
                <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-slate-950/70 px-3 py-1 text-[11px] font-semibold text-emerald-100 backdrop-blur">
                  Google yorumları 4.8/5
                </div>
                <Image
                  src={heroImage}
                  alt="Sercan Aslan Clinic eksozom uygulaması için danışmanlık formu"
                  priority
                  className="h-full w-full object-cover"
                  sizes="(min-width: 1024px) 600px, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent" />
              </div>

              <Card className="relative -mt-16 rounded-3xl border-white/10 bg-white/5 shadow-2xl backdrop-blur lg:-mt-24 lg:max-w-xl lg:translate-x-8">
                <CardContent className="p-6 sm:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-emerald-100">Sercan Aslan Clinic</p>
                      <p className="mt-1 text-xl font-semibold tracking-tight text-white">2 dakikada WhatsApp’a yönlendirelim</p>
                      <p className="mt-2 text-sm text-slate-200">
                        Dr. İbrahim’e ulaşmak için ilgilendiğin uygulamayı seç, bilgilerini bırak, hazır mesaj açılsın.
                      </p>
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

                    <Button type="submit" size="lg" className="rounded-2xl gradient-primary hover:opacity-90">
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

        <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <motion.div {...fade} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Dr. İbrahim kontrolünde", icon: ShieldCheck },
              { title: "Sercan Aslan Clinic", icon: Star },
              { title: "Planlı takip", icon: CalendarClock },
              { title: "Hızlı iletişim", icon: MessageCircle },
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

        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6" id="benefits">
          <motion.div {...fade} className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Eksozom uygulaması kimler için?</h2>
              <p className="mt-2 max-w-2xl text-slate-200">
                Saç dökülme döneminde, saç ekimi sonrası iyileşme sürecinde veya saçlı deri bakımını güçlendirmek isteyenler için
                Dr. İbrahim’in planladığı protokoller.
              </p>
            </div>
            <Button
              variant="outline"
              className="w-full rounded-2xl border-white/20 bg-transparent text-white hover:bg-white/5 lg:w-auto"
              onClick={() => quickContact("Plan")}
            >
              <Info className="h-4 w-4" />
              <span className="ml-2">Durumunu Paylaş</span>
            </Button>
          </motion.div>

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {highlights.map((item, idx) => (
              <motion.div key={item.title} {...fade} transition={{ ...fade.transition, delay: idx * 0.05 }}>
                <Card className="rounded-3xl border-white/10 bg-white/5 shadow-sm">
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
        </section>

        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6" id="steps">
          <motion.div {...fade} className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Plan nasıl ilerliyor?</h2>
              <p className="mt-2 text-slate-200">İlk mesajdan Dr. İbrahim’in seans sonu kontrolüne kadar şeffaf süreç yönetimi.</p>
            </div>
            <Button
              className="w-full rounded-2xl gradient-primary hover:opacity-90 lg:w-auto"
              onClick={() => quickContact("Süreç")}
            >
              <ArrowRight className="h-4 w-4" />
              <span className="ml-2">Süreç Hakkında Sor</span>
            </Button>
          </motion.div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, idx) => (
              <motion.div key={step.title} {...fade} transition={{ ...fade.transition, delay: idx * 0.05 }}>
                <Card className="relative h-full rounded-3xl border-white/10 bg-white/5">
                  <CardContent className="p-6">
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

        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6" id="packages">
          <motion.div {...fade} className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Paket ve fiyat bilgisi</h2>
              <p className="mt-2 text-slate-200">Kişisel ihtiyaca göre net seans sayısı ve ücretleri paylaşılır.</p>
            </div>
            <Button
              variant="outline"
              className="w-full rounded-2xl border-white/20 bg-transparent text-white hover:bg-white/5 lg:w-auto"
              onClick={() => quickContact("Fiyat")}
            >
              <Info className="h-4 w-4" />
              <span className="ml-2">Kendi Planını Sor</span>
            </Button>
          </motion.div>

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {packages.map((pack, idx) => (
              <motion.div key={pack.name} {...fade} transition={{ ...fade.transition, delay: idx * 0.05 }}>
                <Card className="h-full rounded-3xl border-white/10 bg-white/5">
                  <CardContent className="flex h-full flex-col gap-4 p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-emerald-200">Paket</p>
                        <h3 className="text-lg font-semibold text-white">{pack.name}</h3>
                      </div>
                      <Badge className="rounded-full bg-white/10 text-white">Önerilen</Badge>
                    </div>
                    <p className="text-sm text-slate-200">{pack.desc}</p>
                    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white">{pack.price}</div>
                    <Button
                      className="mt-auto rounded-2xl gradient-primary hover:opacity-90"
                      onClick={() => quickContact(`${pack.name} fiyat`)}
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span className="ml-2">WhatsApp ile Öğren</span>
                    </Button>
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
              <p className="mt-2 text-slate-200">Kısa bilgiler; merak ettiğin detaylar için WhatsApp’tan yazabilirsin.</p>
            </div>
            <Button
              className="w-full rounded-2xl gradient-primary hover:opacity-90 lg:w-auto"
              onClick={() => quickContact("Soru")}
            >
              <MessageCircle className="h-4 w-4" />
              <span className="ml-2">Soru Sor</span>
            </Button>
          </motion.div>

          <div className="mt-6 grid gap-3">
            {faqItems.map((item, idx) => (
              <motion.details
                key={item.q}
                {...fade}
                transition={{ ...fade.transition, delay: idx * 0.05 }}
                className="group rounded-3xl border border-white/10 bg-white/5 p-5"
              >
                <summary className="flex cursor-pointer items-center justify-between text-sm font-semibold text-white">
                  {item.q}
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-emerald-100 group-open:bg-emerald-500/20">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm text-slate-200">{item.a}</p>
              </motion.details>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-14 sm:px-6" id="contact">
          <div className="grid gap-6 rounded-3xl border border-white/10 bg-white/5 p-6 sm:grid-cols-2 sm:p-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-emerald-100">
                <ShieldCheck className="h-3.5 w-3.5" />
                Dr. İbrahim eşliğinde
              </div>
              <h3 className="text-2xl font-semibold text-white">Sorunu yaz, planı aynı gün öğren</h3>
              <p className="text-sm text-slate-200">
                Hızlı randevu, değerlendirme ve fiyat paylaşımı için WhatsApp’tan yazabilirsin. Ekip, seans sıklığı ve uygulama detaylarını aktarsın.
              </p>
              <div className="space-y-2 text-sm text-slate-200">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-emerald-200" />
                  <a href={`tel:${PHONE_TEL}`} className="hover:underline">
                    {PHONE_DISPLAY}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4 text-emerald-200" />
                  <button className="underline" onClick={() => quickContact("WhatsApp")}>WhatsApp ile yaz</button>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-emerald-200" />
                  <span>İstanbul • Sercan Aslan Clinic</span>
                </div>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <Card className="rounded-3xl border-white/10 bg-white/5">
                <CardContent className="space-y-2 p-5">
                  <p className="text-sm font-semibold text-white">Hızlı WhatsApp</p>
                  <p className="text-sm text-slate-200">Mesaj gönder, aynı gün geri dönüş al.</p>
                  <Button
                    className="w-full rounded-2xl gradient-primary hover:opacity-90"
                    onClick={() => quickContact("WhatsApp hızlı")}
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span className="ml-2">Mesaj Gönder</span>
                  </Button>
                </CardContent>
              </Card>

              <Card className="rounded-3xl border-white/10 bg-white/5">
                <CardContent className="space-y-2 p-5">
                  <p className="text-sm font-semibold text-white">Randevu oluştur</p>
                  <p className="text-sm text-slate-200">Uygun saatleri öğren, planı netleştir.</p>
                  <Button
                    variant="outline"
                    className="w-full rounded-2xl border-white/20 bg-transparent text-white hover:bg-white/5"
                    onClick={() => quickContact("Randevu isteği")}
                  >
                    <CalendarClock className="h-4 w-4" />
                    <span className="ml-2">Randevu Talep Et</span>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-14 sm:px-6">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0b0d1c] via-[#0f172a] to-slate-950" />
            <div className="absolute -left-10 top-4 h-40 w-40 rounded-full bg-emerald-500/10 blur-3xl" />
            <div className="absolute right-0 bottom-0 h-52 w-52 rounded-full bg-cyan-500/10 blur-3xl" />

            <div className="relative grid gap-0 lg:grid-cols-[1.05fr_1fr]">
              <div className="space-y-5 border-b border-white/10 p-6 sm:p-8 lg:border-b-0 lg:border-r">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-emerald-100">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Klinik iletişim ve yönlendirme
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-semibold text-white">Kliniğimize ulaşın</h3>
                  <p className="text-sm text-slate-200">
                    Şişli&rsquo;deki kliniğimizde saç ekimi ve destekleyici tedavi süreçleri için yüz yüze görüşme yapabilirsiniz.
                    Konumu açın, uygun saatleri konuşalım ve sizi bekleyen ekibimizle tanışın.
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-sm">
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
                      className="mt-3 w-full rounded-2xl border-white/20 bg-transparent text-white hover:bg-white/5"
                      onClick={() => window.open(GOOGLE_MAPS_URL, "_blank", "noopener,noreferrer")}
                    >
                      <MapPin className="h-4 w-4" />
                      <span className="ml-2">Haritada Aç</span>
                    </Button>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-sm">
                    <div className="flex items-center gap-2 text-sm font-semibold text-white">
                      <Phone className="h-4 w-4 text-emerald-200" />
                      Hızlı bağlantılar
                    </div>
                    <div className="mt-2 space-y-2 text-sm text-slate-200">
                      <button
                        type="button"
                        onClick={() => window.open(`tel:${PHONE_TEL}`, "_self")}
                        className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-left transition hover:border-white/20"
                      >
                        <span>Telefon: {PHONE_DISPLAY}</span>
                        <ArrowRight className="h-4 w-4 text-emerald-200" />
                      </button>
                      <button
                        type="button"
                        onClick={() => window.open(INSTAGRAM_URL, "_blank", "noopener,noreferrer")}
                        className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-left transition hover:border-white/20"
                      >
                        <span>Instagram / sercanaslanhairturkey</span>
                        <ArrowRight className="h-4 w-4 text-emerald-200" />
                      </button>
                    </div>
                    <Button
                      className="mt-3 w-full rounded-2xl gradient-primary hover:opacity-90"
                      onClick={() => quickContact("Konum için WhatsApp")}
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span className="ml-2">WhatsApp ile Randevu</span>
                    </Button>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <Card className="rounded-2xl border-white/10 bg-white/5">
                    <CardContent className="space-y-2 p-4">
                      <p className="text-sm font-semibold text-white">Danışman desteği</p>
                      <p className="text-sm text-slate-200">Seans ve fiyat planlamasını WhatsApp üzerinden hızlıca öğrenin.</p>
                      <Button
                        className="w-full rounded-2xl gradient-primary hover:opacity-90"
                        onClick={() => quickContact("WhatsApp hızlı")}
                      >
                        <MessageCircle className="h-4 w-4" />
                        <span className="ml-2">Mesaj Gönder</span>
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="rounded-2xl border-white/10 bg-white/5">
                    <CardContent className="space-y-2 p-4">
                      <p className="text-sm font-semibold text-white">Randevu oluştur</p>
                      <p className="text-sm text-slate-200">Uygun saatleri öğren, planı netleştir ve kliniğe gel.</p>
                      <Button
                        variant="outline"
                        className="w-full rounded-2xl border-white/20 bg-transparent text-white hover:bg-white/5"
                        onClick={() => quickContact("Randevu isteği")}
                      >
                        <CalendarClock className="h-4 w-4" />
                        <span className="ml-2">Randevu Talep Et</span>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="relative h-full overflow-hidden rounded-b-3xl lg:rounded-bl-none lg:rounded-r-3xl">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-cyan-500/15" />
                <iframe
                  src={MAP_EMBED_URL}
                  title="Sercan Aslan Clinic Harita"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="relative h-full min-h-[320px] w-full"
                />
                <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-slate-950/70 px-3 py-1 text-xs font-semibold text-emerald-100 ring-1 ring-white/10">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>Sercan Aslan Clinic</span>
                </div>
                <div className="absolute bottom-4 right-4 rounded-full bg-slate-950/70 px-3 py-1 text-[11px] font-semibold text-emerald-100 ring-1 ring-white/10">
                  Konumu büyütmek için haritaya tıklayın
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 py-6">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 text-xs text-slate-300 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <span>© {new Date().getFullYear()} Sercan Aslan Clinic • Eksozom ve saç uygulamaları.</span>
          <span>Bilgilendirme amaçlıdır; tanı/tedavi yerine geçmez.</span>
        </div>
      </footer>
    </div>
  );
}
