"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  Phone,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Clock,
  BadgeCheck,
  MapPin,
  ChevronDown,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

/**
 * ✅ lp.dokuclinic.com/v6/eksozom/ tasarım kurgusuna göre (bölüm sırası + görsel yerleşimi + CTA dili)
 * ✅ Görselleri sen yükleyeceğin için hepsi placeholder src ile ayarlı
 * ✅ CTA'lar form popup açar, form WhatsApp hazır mesajına gider
 *
 * Görselleri sunucuna koy:
 * /public/assets/eksozom/...  (Next.js public klasörü)
 */

const WHATSAPP_PHONE_E164 = "905467372284"; // 0546 737 22 84

const ASSETS = {
  logo: "/assets/eksozom/logo.svg",

  // Hero & CTA
  hero: "/assets/eksozom/hero-eksozom.jpg",
  cover: "/assets/eksozom/cta-bg.jpg?v=1",
  ctaBg: "/assets/eksozom/cta-bg.jpg?v=1",

  // Doktor / Klinik
  doctor: "/assets/eksozom/doctor-ibrahim.jpg",

  // Hücresel yenilenme – yakın plan
  g1: "/assets/eksozom/cilt-yenilenme.jpg",
  g2: "/assets/eksozom/sac-koku-yakin.jpg",
  g9: "/assets/eksozom/eksozom-uygulama.jpg",

  // Hücresel yenilenme (ekran görüntüsü bölümü)
  hairDiagram: "/assets/eksozom/section-infographic-left.png",
  skinDiagram: "/assets/eksozom/section-infographic-right.png",
  beforeFace: "/assets/eksozom/before-after-cilt.jpg",
  beforeHair: "/assets/eksozom/before-after-sac.jpg",
  beforeEye: "/assets/eksozom/before-after-goz.jpg",

  // Galeri / atmosfer
  g3: "/assets/eksozom/klinik-ortam-1.jpg",
  g4: "/assets/eksozom/klinik-ortam-2.jpg",
  g5: "/assets/eksozom/sac-analiz.jpg",
  g6: "/assets/eksozom/cilt-analiz.jpg",
  g7: "/assets/eksozom/uygulama-sureci.jpg",
  g8: "/assets/eksozom/danismanlik.jpg",
};

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function formatPhoneTR(input) {
  const digits = (input || "").replace(/[^0-9]/g, "");
  return digits.slice(0, 11);
}

function buildWhatsAppUrl({ name, phone, interest }) {
  const lines = [
    "Merhaba, web sitenizden bilgi almak istiyorum.",
    "",
    `İsim Soyisim: ${name || "-"}`,
    `Telefon: ${phone || "-"}`,
    interest ? `İlgilendiğim uygulama: ${interest}` : null,
    "",
    "Müsait olduğunuzda dönüş yapabilir misiniz?",
  ].filter(Boolean);

  const text = lines.join("\n");

  return `https://wa.me/${WHATSAPP_PHONE_E164}?text=${encodeURIComponent(text)}`;
}

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-120px" },
  transition: { duration: 0.6, ease: "easeOut" },
};

const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const fadeItem = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};


const theme = {
  page: "relative min-h-screen bg-[#0B1022] text-white overflow-hidden",
  container: "mx-auto max-w-6xl px-4 sm:px-6",
  topbar:
    "sticky top-0 z-50 border-b border-white/10 bg-[#0B1022]/70 backdrop-blur",
  card:
    "rounded-[28px] border border-white/12 bg-white/10 backdrop-blur shadow-[0_20px_60px_rgba(0,0,0,0.35)]",
  tile: "rounded-2xl border border-white/12 bg-white/5 backdrop-blur",
  chip:
    "inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/90",
  btnPrimary:
    "rounded-full bg-gradient-to-r from-[#6B4C8C] to-[#D28FB0] text-white hover:opacity-90 shadow-[0_12px_40px_rgba(210,143,176,0.25)]",
  btnOutline: "rounded-full border-white/30 text-white hover:bg-white/10",
  textSub: "text-white/75",
  textMuted: "text-white/55",
};

function SectionTitle({ kicker, title, desc }) {
  return (
    <div>
      {kicker && (
        <div className={cn(theme.chip, "w-fit")}>
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>{kicker}</span>
        </div>
      )}
      <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl text-[#D28FB0]">
        {title}
      </h2>
      {desc && (
        <p className={cn("mt-2 text-sm sm:text-base", theme.textSub)}>{desc}</p>
      )}
    </div>
  );
}

function Img({ src, alt, className }) {
  return (
    <img
      src={src}
      alt={alt}
      className={cn("block h-full w-full object-cover", "bg-white/5", className)}
      loading="lazy"
      decoding="async"
      onError={(e) => {
        // Görsel 404 vs. durumlarında (özellikle deploy/case) UI bozulmasın
        e.currentTarget.style.opacity = "0";
      }}
    />
  );
}

function BackgroundHairField() {
  // Arkaplanda sayfayı dolduran, blurlu ve düşük opaklıkta "iyileşen saç teli" hissi
  // Performans: SVG + hafif framer-motion animasyonları
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

  const strands = useMemo(() => {
    // Deterministik dağılım — farklı genişlik ve yönlerde saç telleri
    const xs = [6, 10, 14, 19, 24, 30, 36, 42, 48, 54, 60, 66, 72, 78, 84, 90, 94];
    return xs.map((x, i) => {
      const y0 = 92 + ((i % 3) - 1) * 2;
      const y1 = 10 + (i % 5) * 6;
      const bend = 18 + (i % 7) * 4;
      const side = i % 2 === 0 ? -1 : 1;
      return {
        id: i,
        d: `M ${x} ${y0} C ${x + side * bend} ${y0 - 24}, ${x + side * (bend / 2)} ${y1 + 18}, ${x + side * 2} ${y1}`,
        delay: (i % 7) * 0.12,
        dur: 2.2 + (i % 5) * 0.25,
      };
    });
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-20">
      <div className="absolute inset-0 opacity-[0.26] [filter:blur(18px)]">
        <motion.svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="h-full w-full"
          initial="rest"
          animate={prefersReducedMotion ? "rest" : "run"}
        >
          {/* hafif deri çizgisi */}
          <motion.path
            d="M 0 92 C 22 88, 42 96, 62 91 C 78 87, 90 93, 100 90"
            fill="none"
            stroke="rgba(255,255,255,0.14)"
            strokeWidth="0.6"
            variants={{
              rest: { opacity: 0.55 },
              run: {
                opacity: 0.85,
                transition: { duration: 3.2, repeat: Infinity, repeatType: "reverse" },
              },
            }}
          />

          {strands.map((s) => (
            <motion.path
              key={s.id}
              d={s.d}
              fill="none"
              stroke="url(#bgHair)"
              strokeLinecap="round"
              variants={{
                rest: { strokeWidth: 0.9, opacity: 0.35 },
                run: {
                  strokeWidth: 2.2,
                  opacity: 0.78,
                  transition: {
                    duration: s.dur,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: s.delay,
                  },
                },
              }}
            />
          ))}

          {/* hafif parıltılar */}
          {[12, 34, 58, 76, 88].map((x, i) => (
            <motion.circle
              key={x}
              cx={x}
              cy={22 + i * 10}
              r={0.7}
              fill="rgba(255,255,255,0.55)"
              variants={{
                rest: { opacity: 0.08 },
                run: {
                  opacity: 0.22,
                  transition: {
                    duration: 2.6,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: i * 0.35,
                  },
                },
              }}
            />
          ))}

          <defs>
            <linearGradient id="bgHair" x1="0" y1="100" x2="0" y2="0">
              <stop offset="0" stopColor="rgba(107,76,140,0.95)" />
              <stop offset="1" stopColor="rgba(210,143,176,0.95)" />
            </linearGradient>
          </defs>
        </motion.svg>
      </div>

      {/* mevcut rengin arkasında yumuşak dursun diye overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B1022]/30 via-transparent to-[#0B1022]/55" />
    </div>
  );
}

function HairStrandStrengthAnim() {
  // Referans görsele benzer: kökte damla folikül + yukarı doğru incelen saç teli
  // Animasyon: belirgin kalınlaşıp incelme + hafif parıltı
  const strands = useMemo(() => [140, 260, 380], []);

  return (
    <div className="relative w-full max-w-[520px]">
      <div className="absolute -inset-3 rounded-[28px] bg-gradient-to-r from-[#6B4C8C]/15 to-[#D28FB0]/15 blur-2xl" />
      <div className={cn(theme.tile, "relative overflow-hidden p-4")}>
        <div className="mt-1">
          <motion.svg
            viewBox="0 0 520 160"
            className="h-[110px] w-full"
            initial="rest"
            animate="run"
          >
            {/* DERİ ÇİZGİSİ */}
            <line
              x1="0"
              y1="95"
              x2="520"
              y2="95"
              stroke="rgba(255,255,255,0.25)"
              strokeWidth="2"
            />

            {strands.map((x, i) => {
              const delay = i * 0.18;

              return (
                <motion.g
                  key={x}
                  style={{ transformOrigin: `${x}px 95px` }}
                  variants={{
                    rest: {
                      opacity: 0.6,
                      filter: "drop-shadow(0px 0px 0px rgba(210,143,176,0))",
                    },
                    run: {
                      opacity: 1,
                      filter: "drop-shadow(0px 0px 10px rgba(210,143,176,0.18))",
                      transition: {
                        duration: 0.9,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay,
                      },
                    },
                  }}
                >
                  {/* FOLİKÜL / KÖK (damla form) */}
                  <motion.path
                    d={`M ${x} 95
                        C ${x - 18} 98, ${x - 26} 120, ${x} 126
                        C ${x + 26} 120, ${x + 18} 98, ${x} 95 Z`}
                    fill="url(#rootGrad)"
                    variants={{
                      rest: { scale: 0.92 },
                      run: {
                        scale: 1.08,
                        transition: {
                          duration: 0.9,
                          ease: "easeInOut",
                          repeat: Infinity,
                          repeatType: "reverse",
                          delay,
                        },
                      },
                    }}
                    style={{ transformOrigin: `${x}px 95px` }}
                  />

                  {/* SAÇ TELİ – belirgin şekilde kalınlaşıp incelir */}
                  <motion.path
                    d={`M ${x} 95
                        C ${x - 22} 62, ${x - 10} 30, ${x - 2} 10`}
                    fill="none"
                    stroke="url(#hairGrad)"
                    strokeLinecap="round"
                    variants={{
                      rest: { strokeWidth: 7 },
                      run: {
                        strokeWidth: 13,
                        transition: {
                          duration: 0.9,
                          ease: "easeInOut",
                          repeat: Infinity,
                          repeatType: "reverse",
                          delay,
                        },
                      },
                    }}
                  />

                  {/* İnce "uç" highlight */}
                  <motion.path
                    d={`M ${x - 2} 10 C ${x - 4} 8, ${x - 6} 6, ${x - 8} 4`}
                    fill="none"
                    stroke="rgba(255,255,255,0.55)"
                    strokeLinecap="round"
                    variants={{
                      rest: { opacity: 0.15, strokeWidth: 1 },
                      run: {
                        opacity: 0.45,
                        strokeWidth: 1.6,
                        transition: {
                          duration: 0.9,
                          ease: "easeInOut",
                          repeat: Infinity,
                          repeatType: "reverse",
                          delay,
                        },
                      },
                    }}
                  />
                </motion.g>
              );
            })}

            <defs>
              <linearGradient
                id="hairGrad"
                x1="0"
                y1="95"
                x2="0"
                y2="10"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stopColor="#6B4C8C" />
                <stop offset="1" stopColor="#D28FB0" />
              </linearGradient>
              <radialGradient id="rootGrad" cx="0.5" cy="0.25" r="0.95">
                <stop offset="0" stopColor="#D28FB0" />
                <stop offset="1" stopColor="#6B4C8C" />
              </radialGradient>
            </defs>
          </motion.svg>
        </div>

        <div className="mt-2 flex flex-wrap gap-2">
          <span className={cn(theme.chip, "bg-white/0")}>Kökten güçlenme</span>
          <span className={cn(theme.chip, "bg-white/0")}>Daha kalın saç telleri</span>
          <span className={cn(theme.chip, "bg-white/0")}>Canlı foliküller</span>
        </div>
      </div>
    </div>
  );
}

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setOpen((v) => !v)}
      className={cn(theme.tile, "w-full text-left p-5")}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="text-sm font-semibold">{q}</div>
        <ChevronDown
          className={cn("h-4 w-4 opacity-80 transition", open && "rotate-180")}
        />
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className={cn("pt-3 text-sm leading-relaxed", theme.textSub)}>{a}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedInterest, setSelectedInterest] = useState("Eksozom");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(true);
  const [inlineName, setInlineName] = useState("");
  const [inlineEmail, setInlineEmail] = useState("");
  const [inlinePhone, setInlinePhone] = useState("");
  const [inlineConsent, setInlineConsent] = useState(false);

  const openLead = (interest = "Eksozom") => {
    setSelectedInterest(interest);
    setIsOpen(true);
  };

  const submitLead = (e) => {
    e?.preventDefault?.();
    if (!name.trim() || phone.replace(/[^0-9]/g, "").length < 10) return;
    if (!consent) return;

    const url = buildWhatsAppUrl({
      name: name.trim(),
      phone: phone.trim(),
      interest: selectedInterest,
    });

    window.open(url, "_blank", "noopener,noreferrer");
    setIsOpen(false);
  };

  useEffect(() => {
    const onKey = (ev) => {
      if (ev.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

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
      "Dermatoloji uzmanlığıyla güvenlidir",
    ],
    []
  );

  const beforeAfterItems = useMemo(
    () => [
      { src: ASSETS.beforeFace, alt: "Cilt yenilenme öncesi sonrası" },
      { src: ASSETS.beforeHair, alt: "Saç dökülmesi öncesi sonrası" },
      { src: ASSETS.beforeEye, alt: "Göz çevresi öncesi sonrası" },
    ],
    []
  );

  const submitInlineForm = (e) => {
    e?.preventDefault?.();
    if (!inlineName.trim() || formatPhoneTR(inlinePhone).length < 10 || !inlineConsent) return;

    const lines = [
      "Merhaba, eksozom seans & fiyat bilgisi almak istiyorum.",
      "",
      `İsim Soyisim: ${inlineName.trim()}`,
      `E-Posta: ${inlineEmail.trim() || "-"}`,
      `Telefon: ${formatPhoneTR(inlinePhone)}`,
      "İlgilendiğim uygulama: Eksozom",
    ];

    const url = `https://wa.me/${WHATSAPP_PHONE_E164}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className={theme.page}>
      <BackgroundHairField />
      {/* Top Bar */}
      <div className={theme.topbar}>
        <div className={cn(theme.container, "flex items-center justify-between py-3")}>
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-2xl bg-gradient-to-br from-[#6B4C8C] to-[#D28FB0]" />
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-tight">Sercan Aslan Clinic</div>
              <div className={cn("text-xs", theme.textMuted)}>Eksozom Tedavisi • Saç & Cilt</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`https://wa.me/${WHATSAPP_PHONE_E164}`}
              target="_blank"
              rel="noreferrer"
              className={cn(
                "hidden sm:inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm",
                "hover:bg-white/10"
              )}
            >
              <Phone className="h-4 w-4" />
              <span>+90 546 737 22 84</span>
            </a>
            <Button className={theme.btnPrimary} onClick={() => openLead("Eksozom")}>
              <MessageCircle className="h-4 w-4" />
              <span className="ml-2">HEMEN BİLGİ AL</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Hero */}
     <section className="relative overflow-hidden pt-6 pb-2">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-[#6B4C8C]/25 blur-[120px]" />
          <div className="absolute -right-40 top-10 h-[560px] w-[560px] rounded-full bg-[#D28FB0]/20 blur-[130px]" />
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-[#0B1022]" />
        </div>

        {/* Sayfayı 2'ye bölen hero: sol içerik / sağ görsel arka plan + form */}
        <div className="mx-auto max-w-[1200px] px-6 sm:px-8">
          <div className="grid gap-6 lg:min-h-[680px] lg:grid-cols-[52%_48%] lg:gap-8">
            {/* SOL */}
            <div className="flex items-center">
              <div className="w-full py-8 sm:py-12">
                <motion.div {...fadeUp}>
                  <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">
                    Eksozom Tedavisi
                    <span className="mt-2 block text-white/90">Cilt Gençleştirme ve Saç Onarımında</span>
                    <span className="mt-2 block text-white">Hücresel Yenilenmenin Gücünü Keşfedin</span>
                  </h1>

                  <div className="mt-6">
                    <HairStrandStrengthAnim />
                  </div>

                  <div className="mt-6 grid gap-2">
                    {heroBullets.map((b) => (
                      <div key={b} className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 text-white/90" />
                        <div className={cn("text-sm", theme.textSub)}>{b}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-7 flex flex-wrap gap-3">
                    <Button
                      className={cn(theme.btnPrimary, "px-7")}
                      size="lg"
                      onClick={() => openLead("Eksozom")}
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span className="ml-2">HEMEN BİLGİ AL</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className={cn(
                        "rounded-full border border-[#D28FB0]/60 text-[#D28FB0] hover:bg-[#D28FB0]/10",
                        "px-7"
                      )}
                      onClick={() => {
                        const el = document.getElementById("process");
                        el?.scrollIntoView({ behavior: "smooth", block: "start" });
                      }}
                    >
                      Uygulama Süreci
                    </Button>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* SAĞ: arka plan tam görsel + form kartı üstte */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="relative overflow-hidden rounded-[32px] border border-white/10"
            >
              {/* FULL BACKGROUND IMAGE */}
              <Img
                src={ASSETS.cover}
                alt="Kapak görsel"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/25 to-black/10" />

              {/* FORM KARTI */}
              <div className="relative flex h-full items-end p-4 sm:p-6 lg:items-center">
                <Card className={cn(theme.card, "w-full max-w-xl overflow-hidden")}>
                  <CardContent className="p-6 sm:p-7">
                    <Badge className="rounded-full bg-white/10 border border-white/15 text-white">
                      Ücretsiz
                    </Badge>
                    <div className="mt-3 text-2xl font-semibold leading-tight text-[#D28FB0]">
                      Canlı Online Danışmanlık
                      <br />
                      Dr. İbrahim şimdi değerlendirsin
                      <br />
                      anında yanıt alın
                    </div>
                    <p className={cn("mt-2 text-sm", theme.textSub)}>
                      Formu doldurun; uzmanlarımız WhatsApp üzerinden sizinle iletişime geçsin.
                    </p>
                    <Button
                      className={cn(theme.btnPrimary, "mt-4 w-full")}
                      onClick={() => openLead("Ücretsiz Danışmanlık")}
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span className="ml-2">Başvur</span>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Diğer Uygulamalar */}
      <section className={cn(theme.container, "py-16")}>
        <motion.div {...fadeUp}>
          <SectionTitle
            kicker="Uygulamalar"
            title="Ozon Terapi, Eksozom ve Mezoterapi"
            desc="Saç ve cilt sağlığını desteklemeye yönelik uygulamalar hakkında hızlıca bilgi alın. Uygunluk ve planlama, uzman değerlendirmesiyle belirlenir."
          />

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              {
                key: "Ozon Terapi",
                title: "Ozon Terapi",
                desc:
                  "Saçlı deride dolaşım ve oksijenlenme desteği hedefleyen, destekleyici bir uygulama yaklaşımıdır.",
                bullets: [
                  "Saçlı deride canlılık desteği",
                  "Dolaşım/oksijenlenme desteği",
                  "Bakım protokollerine uyumlu",
                ],
              },
              {
                key: "Eksozom",
                title: "Eksozom",
                desc:
                  "Hücresel iletişimi desteklemeyi hedefleyen biyolojik yaklaşım; saç ve cilt yenilenmesine destek amaçlı planlanabilir.",
                bullets: [
                  "Hücresel yenilenme desteği",
                  "Saç köklerine destek",
                  "Cilt parlaklığı/doku desteği",
                ],
              },
              {
                key: "Mezoterapi",
                title: "Mezoterapi",
                desc:
                  "Vitamin-mineral içeriklerle saçlı deriyi ve cildi desteklemeye yönelik, kişiye özel planlanabilen bir uygulamadır.",
                bullets: [
                  "Saçlı deriye içerik desteği",
                  "Mevsimsel dökülmede destek",
                  "Kişiye özel kür planı",
                ],
              },
            ].map((t) => (
              <Card key={t.key} className={cn(theme.card, "overflow-hidden")}>
                <CardContent className="p-6">
                  <div className="text-lg font-semibold text-[#D28FB0]">{t.title}</div>
                  <p className={cn("mt-2 text-sm", theme.textSub)}>{t.desc}</p>

                  <div className="mt-4 grid gap-2">
                    {t.bullets.map((b) => (
                      <div key={b} className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 text-white/90" />
                        <div className={cn("text-sm", theme.textSub)}>{b}</div>
                      </div>
                    ))}
                  </div>

                  <Button
                    className={cn(theme.btnPrimary, "mt-5 w-full")}
                    onClick={() => openLead(t.key)}
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span className="ml-2">Bilgi Al</span>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Hücresel Yenilenme */}
      <section className={cn(theme.container, "py-16")}>
        <motion.div {...fadeUp} className="grid gap-10">
          <div className="text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Hücresel Yenilenme: Saçta ve Ciltte Doğal Güç
            </h2>
            <p className={cn("mx-auto mt-3 max-w-3xl text-sm sm:text-base", theme.textSub)}>
              Eksozomlar, vücudun doğal iyileşme sürecini yöneten güçlü hücresel sinyaller taşır. Cilt
              ve saçlı deriye uygulandığında, hasarlı hücrelerin onarımını hızlandırır; iltihabı azaltır ve
              yenilenme kapasitesini artırır.
            </p>
          </div>

          <div className="flex flex-col items-center gap-6 lg:flex-row lg:justify-center lg:gap-10">
            <div className={cn(theme.tile, "relative w-full max-w-[360px] overflow-hidden p-6")}>
              <Img src={ASSETS.hairDiagram} alt="Daha güçlü saç diyagramı" className="h-52" />
              <div className="mt-4 text-center text-xl font-semibold">Daha güçlü saç</div>
            </div>
            <div className="hidden h-32 w-px bg-white/15 lg:block" />
            <div className={cn(theme.tile, "relative w-full max-w-[360px] overflow-hidden p-6")}>
              <Img src={ASSETS.skinDiagram} alt="Daha yenilenmiş cilt diyagramı" className="h-52" />
              <div className="mt-4 text-center text-xl font-semibold">Daha yenilenmiş cilt</div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {beforeAfterItems.map((item) => (
              <div
                key={item.alt}
                className={cn(
                  theme.tile,
                  "relative overflow-hidden rounded-[24px] border-white/12 bg-white/5"
                )}
              >
                <Img src={item.src} alt={item.alt} className="aspect-[4/5]" />
                <span className="absolute left-3 top-3 rounded-full bg-black/55 px-3 py-1 text-xs font-semibold uppercase">
                  before
                </span>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <Button className={theme.btnPrimary} size="lg" onClick={() => openLead("Eksozom")}>
              <Sparkles className="h-4 w-4" />
              <span className="ml-2">EKSOZOM’U KEŞFET!</span>
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Mosaic / Galeri */}
      <section className={cn(theme.container, "pb-12")}>
        <motion.div {...fadeUp} className="grid gap-4 md:grid-cols-3">
          {[ASSETS.g3, ASSETS.g4, ASSETS.g5, ASSETS.g6, ASSETS.g7, ASSETS.g8].map((src, i) => (
            <div key={i} className={cn(theme.tile, "overflow-hidden")}>
              <Img src={src} alt={`Galeri ${i + 3}`} className="aspect-[4/3] max-h-[240px]" />
            </div>
          ))}
        </motion.div>

        <motion.div {...fadeUp} className={cn("mt-8", theme.textSub)}>
          Sercan Aslan Clinic, eksozom tedavisi odağında; saç ve cilt yenilenmesini destekleyen modern
          uygulamalarla danışanlarına kişiye özel planlar sunmayı hedefler.
        </motion.div>
      </section>

     {/* Neden tercih etmeli + Form */}
<section className="relative py-16">
  <div className="absolute inset-0 -z-10 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-[#0f1329] via-[#171e3d] to-[#0f1329]" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,rgba(210,143,176,0.22),transparent_40%)]" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_10%,rgba(107,76,140,0.18),transparent_36%)]" />
  </div>

  <motion.div
    {...fadeUp}
    className={cn(theme.container, "relative grid gap-8 lg:grid-cols-2 lg:items-start")}
  >
    {/* SOL: Metin + Liste (stagger) */}
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-120px" }}
    >
      <motion.h3
        variants={fadeItem}
        className="text-3xl font-semibold tracking-tight sm:text-4xl"
      >
        Neden Sercan Aslan Clinic’i Tercih Etmelisiniz?
      </motion.h3>

      <motion.p variants={fadeItem} className={cn("mt-3 text-sm sm:text-base", theme.textSub)}>
        Sercan Aslan Clinic, uzman dermatolog kadrosu ve uluslararası sertifikalı teknolojileriyle
        Eksozom uygulamasında güvenli, modern ve kişiye özel bir deneyim sunar.
      </motion.p>

      <div className="mt-5 grid gap-2 text-sm sm:text-base">
        {[
          "Uzman Dermatologlar: Saç ve cilt yenilenmesinde ileri düzey uzmanlık",
          "Uluslararası Protokoller: Klinik onaylı ve güvenilir eksozom içerikleri",
          "Kişiye Özel Plan: Soruna ve bölgeye özel tedavi",
          "Ücretsiz Danışmanlık: Ön değerlendirme ve yönlendirme",
          "Konforlu Uygulama: Yüksek konforlu ve hızlı toparlanan bir süreç",
          "Doğal Sonuçlar: Hücresel yenilenmeye dayalı ve doğal görünümlü etki",
          "Yüksek Memnuniyet: Türkiye ve yurt dışından güçlü referanslar",
          "Modern Klinik Ortamı: Hijyenik ve ileri teknoloji altyapısı",
          "Deneyimli Uygulama Ekibi: Hassas ve kontrollü işlem",
          "Sürekli Takip: Seans sürecinde düzenli bilgilendirme",
        ].map((row) => (
          <motion.div key={row} variants={fadeItem} className="flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 h-4 w-4 text-white/90" />
            <span className={theme.textSub}>{row}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>

    {/* SAĞ: Form kartı (kart gecikmeli + içerik stagger) */}
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
    >
      <Card className={cn(theme.card, "overflow-hidden border-white/20 bg-white/5")}>
        <CardContent className="p-6 sm:p-8">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-120px" }}
          >
            <motion.div variants={fadeItem} className="text-2xl font-semibold text-white">
              Eksozom Seans & Fiyat Bilgisi İçin Başvurun
            </motion.div>

            <motion.p variants={fadeItem} className={cn("mt-2 text-sm", theme.textSub)}>
              Seans sayısı, uygulanacak bölgeler ve fiyat aralığıyla ilgili size özel bilgiyi
              ücretsiz paylaşalım.
            </motion.p>

            {/* Form (istersen bunu da tek tek animasyonlatırız ama şimdilik temiz kalsın) */}
            <form className="mt-6 grid gap-4" onSubmit={submitInlineForm}>
              <div className="grid gap-2">
                <Label htmlFor="inline-name" className="text-white">
                  İsim, Soyisim
                </Label>
                <Input
                  id="inline-name"
                  placeholder="Örn. Ahmet Yılmaz"
                  value={inlineName}
                  onChange={(e) => setInlineName(e.target.value)}
                  className="rounded-full border-white/20 bg-white/10 text-white placeholder:text-white/50"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="inline-email" className="text-white">
                  E-Posta
                </Label>
                <Input
                  id="inline-email"
                  type="email"
                  placeholder="ornek@mail.com"
                  value={inlineEmail}
                  onChange={(e) => setInlineEmail(e.target.value)}
                  className="rounded-full border-white/20 bg-white/10 text-white placeholder:text-white/50"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="inline-phone" className="text-white">
                  Telefon
                </Label>
                <Input
                  id="inline-phone"
                  placeholder="+90 5XX XXX XX XX"
                  value={inlinePhone}
                  onChange={(e) => setInlinePhone(formatPhoneTR(e.target.value))}
                  inputMode="tel"
                  className="rounded-full border-white/20 bg-white/10 text-white placeholder:text-white/50"
                  required
                />
              </div>

              <label className="flex cursor-pointer items-start gap-2 rounded-2xl border border-white/20 bg-white/5 p-3 text-sm text-white/80">
                <input
                  type="checkbox"
                  className="mt-1"
                  checked={inlineConsent}
                  onChange={(e) => setInlineConsent(e.target.checked)}
                />
                <span>KVKK ve Gizlilik Sözleşmesi’ni okudum, onaylıyorum.</span>
              </label>

              <Button
                type="submit"
                className={cn(
                  theme.btnPrimary,
                  "rounded-full",
                  (!inlineName.trim() || formatPhoneTR(inlinePhone).length < 10 || !inlineConsent) &&
                    "opacity-60"
                )}
                disabled={!inlineName.trim() || formatPhoneTR(inlinePhone).length < 10 || !inlineConsent}
              >
                Gönder
              </Button>
            </form>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  </motion.div>
</section>


      {/* Uygulama Alanları */}
      <section className="relative py-16">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b1022] via-[#0f1733] to-[#0b1022]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(210,143,176,0.12),transparent_42%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_20%,rgba(107,76,140,0.14),transparent_40%)]" />
        </div>
        <motion.div {...fadeUp} className={cn(theme.container, "relative")}>
          <SectionTitle
            title="Eksozom Uygulama Alanları: Saç ve Ciltte Hücresel Yenilenme"
            desc="Eksozom tedavisi; hasarlı hücreleri onarmayı, iltihabı azaltmayı ve doku yenilenmesini hızlandırmayı hedefleyen gelişmiş bir biyolojik yaklaşım olarak değerlendirilir."
          />

          <div className="mt-6 grid gap-4">
            {[
              {
                t: "1 Saçlı Deri – Saç Dökülmesi ve Seyrelme",
                p: "Eksozomlar, saç köklerindeki hücresel iletişimi destekleyerek folikül aktivitesine yardımcı olur.",
                b: [
                  "Zayıflamış saç köklerinin desteklenmesi",
                  "Saç yoğunluğu ve gücünün artışına destek",
                  "Dökülme hızının azalmasına yardımcı",
                  "Saç ekimi sonrası iyileşmeyi destekleme",
                ],
              },
              {
                t: "2 Yüz – Işıltı, Doku, Leke ve İnce Çizgiler",
                p: "Kolajen ve elastin süreçlerini destekleyerek daha parlak ve dengeli görünüm hedefler.",
                b: [
                  "Cilt tonu eşitliğine yardımcı",
                  "İnce çizgi görünümünü azaltmaya destek",
                  "Gözenek görünümünde sıkılaşma",
                  "Cilt bariyerini güçlendirmeye yardımcı",
                ],
              },
              {
                t: "3 Boyun & Dekolte – Sıkılaşma ve Doku Onarımı",
                p: "Hassas bölgelerde dokusal yenilenmeye destek olur.",
                b: [
                  "Daha sıkı ve daha düzgün görünüm",
                  "Elastikiyet kaybını azaltmaya yardımcı",
                  "Güneş hasarı görünümünde destek",
                ],
              },
              {
                t: "4 Problemli Cilt – İzler, Lekeler, Güneş Hasarı",
                p: "Hasarlı hücrelerin onarımına yardımcı olarak doku görünümünü iyileştirmeyi hedefler.",
                b: [
                  "Akne izi görünümünde azalma desteği",
                  "Leke görünümünde iyileşme desteği",
                  "Daha homojen doku görünümü",
                ],
              },
            ].map((sec) => (
              <Card key={sec.t} className={theme.card}>
                <CardContent className="p-6 sm:p-8">
                  <div className="text-lg font-semibold text-[#D28FB0]">{sec.t}</div>
                  <div className={cn("mt-2 text-sm", theme.textSub)}>{sec.p}</div>
                  <div className="mt-4 grid gap-2">
                    {sec.b.map((x) => (
                      <div key={x} className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4" />
                        <div className={cn("text-sm", theme.textSub)}>{x}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* ✅ Tek CTA (kartların içinde değil, bölüm sonunda) */}
          <div className="mt-8 flex justify-center">
            <Button
              className={cn(theme.btnPrimary, "px-10")}
              size="lg"
              onClick={() => openLead("Eksozom")}
            >
              <MessageCircle className="h-4 w-4" />
              <span className="ml-2">Ücretsiz Bilgi Al</span>
            </Button>
          </div>
        </motion.div>
      </section>


      {/* Uygulama Süreci */}
      <section className="relative py-12" id="process">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b1022] via-[#101831] to-[#0b1022]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(210,143,176,0.12),transparent_38%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_12%,rgba(107,76,140,0.12),transparent_40%)]" />
        </div>
        <motion.div {...fadeUp} className={cn(theme.container, "relative")}>
          <SectionTitle
            title="Uygulama Süreci"
            desc="Eksozom tedavisi ortalama 30–40 dakika süren, konforlu ve minimal girişimli bir uygulama olarak planlanır."
          />

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: <Clock className="h-5 w-5" />, t: "Uygulama Süresi", v: "30 Dakika" },
              { icon: <BadgeCheck className="h-5 w-5" />, t: "Önerilen Seans", v: "3–4" },
              { icon: <Sparkles className="h-5 w-5" />, t: "İşe Dönüş", v: "Hemen" },
              { icon: <ShieldCheck className="h-5 w-5" />, t: "Anestezi", v: "Yok" },
              { icon: <CheckCircle2 className="h-5 w-5" />, t: "Hassasiyet Süresi", v: "Yok" },
              { icon: <MessageCircle className="h-5 w-5" />, t: "Kalıcılık", v: "Kişiye göre değişir" },
            ].map((x) => (
              <Card key={x.t} className={theme.tile}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-white/90">
                    {x.icon}
                    <div className="text-sm font-semibold">{x.t}</div>
                  </div>
                  <div className="mt-2 text-2xl font-semibold">{x.v}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-6">
            <Button className={theme.btnPrimary} size="lg" onClick={() => openLead("Seans & Fiyat")}>
              <MessageCircle className="h-4 w-4" />
              <span className="ml-2">Eksozom Seans & Fiyat Bilgisi İçin Başvurun</span>
            </Button>
          </div>
        </motion.div>
      </section>

      {/* FAQ */}
      <section className={cn(theme.container, "py-16")}>
        <motion.div {...fadeUp}>
          <SectionTitle title="Sıkça Sorulan Sorular" />
          <div className="mt-6 grid gap-3">
            <FAQItem
              q="Eksozom tedavisi nedir? Nasıl çalışır?"
              a="Eksozomlar, hücreler arası iletişimi destekleyen biyolojik yapılar olarak değerlendirilir. Uygulama; saçlı deride folikül aktivitesini desteklemeye, ciltte yenilenme süreçlerine yardımcı olmaya yönelik planlanır."
            />
            <FAQItem
              q="Eksozom saç dökülmesine gerçekten iyi gelir mi?"
              a="Kişiye göre değişir. Eksozomlar saç köklerinin hücresel iletişimini destekleyerek seyrelmiş bölgelerde yoğunluk artışına yardımcı olabilir. Uygunluk mutlaka uzman değerlendirmesiyle belirlenir."
            />
            <FAQItem
              q="Saç ekimi öncesi/sonrası kullanılabilir mi?"
              a="Klinik protokole göre planlanabilir. Öncesinde saçlı deriyi güçlendirmeye; sonrasında iyileşme sürecini desteklemeye yardımcı bir yaklaşım olarak değerlendirilebilir."
            />
            <FAQItem
              q="Uygulama kaç dakika sürer, kaç seans gerekir?"
              a="Ortalama 30–40 dakika sürebilir. Sıklıkla 3–4 seanslık bir plan önerilebilir; seans sayısı cilt/saç durumuna göre değişir."
            />
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/20">
        <div className={cn(theme.container, "grid gap-8 py-10 lg:grid-cols-3")}>
          <div>
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-2xl bg-gradient-to-br from-[#6B4C8C] to-[#D28FB0]" />
              <div>
                <div className="text-sm font-semibold">Sercan Aslan Clinic</div>
                <div className={cn("text-xs", theme.textMuted)}>Eksozom Tedavisi • Saç & Cilt</div>
              </div>
            </div>
            <p className={cn("mt-3 text-sm", theme.textSub)}>
              Ücretsiz danışmanlık için WhatsApp üzerinden hızlıca iletişime geçin.
            </p>
          </div>

          <div>
            <div className="text-sm font-semibold">İletişim</div>
            <div className={cn("mt-3 space-y-2 text-sm", theme.textSub)}>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>0546 737 22 84</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                <button className="underline" onClick={() => openLead("İletişim")}>
                  WhatsApp ile yaz
                </button>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>İstanbul (konum alanı)</span>
              </div>
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold">Hızlı CTA</div>
            <div className="mt-3 grid gap-2">
              <Button className={cn(theme.btnPrimary, "w-full")} onClick={() => openLead("Eksozom")}>
                <Sparkles className="h-4 w-4" />
                <span className="ml-2">HEMEN BİLGİ AL</span>
              </Button>
              <Button
                variant="outline"
                className={cn(
                  "rounded-full border border-[#D28FB0]/60 text-[#D28FB0] hover:bg-[#D28FB0]/10",
                  "w-full"
                )}
                onClick={() => openLead("Seans & Fiyat")}
              >
                Seans & Fiyat
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 py-6">
          <div
            className={cn(
              theme.container,
              "flex flex-col gap-2 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between"
            )}
          >
            <span>© {new Date().getFullYear()} • Tüm hakları saklıdır.</span>
            <span>Bilgilendirme amaçlıdır; tanı/tedavi yerine geçmez.</span>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <div className="fixed bottom-4 right-4 z-40">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => openLead("Eksozom")}
          className={cn(
            "inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold",
            theme.btnPrimary,
            "rounded-full"
          )}
        >
          <MessageCircle className="h-4 w-4" />
          WhatsApp
        </motion.button>
      </div>

      {/* Popup Form */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/55 p-4 sm:items-center"
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
              <Card className={cn(theme.card, "overflow-hidden")}>
                <div className="grid sm:grid-cols-5">
                  <div className="hidden sm:block sm:col-span-2 bg-gradient-to-b from-[#6B4C8C] to-[#D28FB0] p-6">
                    <div className="text-white/90 text-xs font-semibold">Ücretsiz danışmanlık</div>
                    <div className="mt-2 text-white text-2xl font-semibold leading-tight">
                      WhatsApp’ta
                      <br />
                      hazır mesaj
                    </div>
                    <div className="mt-3 text-white/90 text-sm">
                      Bilgileri doldurup anında bilgi alabilirsiniz  — mesajına{" "}
                      <span className="font-semibold">{selectedInterest}</span> Uzman Doktorumuz sizin için en faydalı süreci planlayacaktır.
                    </div>
                    <div className="mt-6 rounded-2xl bg-white/15 p-4 text-white/90 text-sm">
                      *DR İbrahim anlık bilgi alın.
                    </div>
                  </div>

                  <div className="sm:col-span-3 bg-white p-6 sm:p-8 text-[#0B1022]">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-sm font-medium text-slate-600">Hızlı bilgi formu</div>
                        <div className="mt-1 text-xl font-semibold tracking-tight">
                          WhatsApp’tan Online CheckUp yaptırın, Anlık bilgi alın 
                        </div>
                        <div className="mt-2 text-sm text-slate-600">
                          İsim ve numaranızı yazın — mesajına{" "}
                          <span className="font-medium">{selectedInterest}</span> bilgisi eklensin.
                        </div>
                      </div>
                      <button
                        onClick={() => setIsOpen(false)}
                        className="rounded-full border border-slate-200 px-3 py-2 text-sm"
                        aria-label="Kapat"
                        type="button"
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
                          className="rounded-full bg-white text-[#0B1022]"
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
                          className="rounded-full bg-white text-[#0B1022]"
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
                          <span className="block text-xs text-slate-500">
                            (Mesajı siz onaylayıp gönderirsiniz.)
                          </span>
                        </span>
                      </label>

                      <div className="mt-1 grid gap-2 sm:grid-cols-2">
                        <Button
                          type="button"
                          variant="outline"
                          className="rounded-full"
                          onClick={() => setIsOpen(false)}
                        >
                          Vazgeç
                        </Button>
                        <Button
                          type="submit"
                          className={cn(
                            theme.btnPrimary,
                            "rounded-full",
                            (!name.trim() ||
                              phone.replace(/[^0-9]/g, "").length < 10 ||
                              !consent) && "opacity-60"
                          )}
                          disabled={
                            !name.trim() ||
                            phone.replace(/[^0-9]/g, "").length < 10 ||
                            !consent
                          }
                        >
                          <MessageCircle className="h-4 w-4" />
                          <span className="ml-2">WhatsApp’ta Mesajı Aç</span>
                        </Button>
                      </div>

                      <div className="text-xs text-slate-500">
                        Alternatif: WhatsApp’tan{" "}
                        <span className="font-medium">0546 737 22 84</span> numarasına yazabilirsiniz.
                      </div>
                    </form>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * ------------------------------------------------------------
 * Minimal tests (no test runner required)
 * - These run ONLY in development and ONLY when executed in Node (build step)
 * - They prevent regressions like the broken newline string.
 * ------------------------------------------------------------
 */
function __assert(cond, msg) {
  if (!cond) throw new Error(`Test failed: ${msg}`);
}

function __runTests() {
  const url = buildWhatsAppUrl({
    name: "Ahmet Yılmaz",
    phone: "05551234567",
    interest: "Eksozom",
  });

  __assert(
    url.startsWith(`https://wa.me/${WHATSAPP_PHONE_E164}?text=`),
    "URL prefix correct"
  );

  const encoded = url.split("?text=")[1] || "";
  const decoded = decodeURIComponent(encoded);

  __assert(decoded.includes("İsim Soyisim: Ahmet Yılmaz"), "Name included");
  __assert(decoded.includes("Telefon: 05551234567"), "Phone included");
  __assert(decoded.includes("İlgilendiğim uygulama: Eksozom"), "Interest included");
  __assert(decoded.includes("\n"), "Contains newline separators");
  __assert(!decoded.includes("undefined"), "No undefined leakage");

  const urlNoInterest = buildWhatsAppUrl({ name: "A", phone: "0", interest: "" });
  const decoded2 = decodeURIComponent(urlNoInterest.split("?text=")[1] || "");
  __assert(!decoded2.includes("İlgilendiğim uygulama:"), "Empty interest omitted");

  const urlNoName = buildWhatsAppUrl({
    name: "",
    phone: "05000000000",
    interest: "Mezoterapi",
  });
  const decoded3 = decodeURIComponent(urlNoName.split("?text=")[1] || "");
  __assert(decoded3.includes("İsim Soyisim: -"), "Empty name becomes -");

  const formatted = formatPhoneTR("+90 (546) 737-22-84");
  __assert(formatted === "90546737228", "formatPhoneTR strips non-digits and limits length");
}

// Run tests during Next.js build/server-side only (not in the browser)
if (typeof window === "undefined" && process?.env?.NODE_ENV !== "production") {
  __runTests();
}
