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
  Star,
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
  logo: "/assets/eksozom/logo.svg", // (istersen değiştir)
  hero: "/assets/eksozom/hero.jpg",
  doctor: "/assets/eksozom/doctor.jpg",
  cover: "/hero_image-eksozom.webp",
  ctaBg: "/assets/eksozom/cta-bg.jpg",
  // Galeri/mosaic
  g1: "/assets/eksozom/gallery-1.jpg",
  g2: "/assets/eksozom/gallery-2.jpg",
  g3: "/assets/eksozom/gallery-3.jpg",
  g4: "/assets/eksozom/gallery-4.jpg",
  g5: "/assets/eksozom/gallery-5.jpg",
  g6: "/assets/eksozom/gallery-6.jpg",
  g7: "/assets/eksozom/gallery-7.jpg",
  g8: "/assets/eksozom/gallery-8.jpg",
  g9: "/assets/eksozom/gallery-9.jpg",
  g10: "/assets/eksozom/gallery-10.jpg",
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

  // ✅ FIX: newline must be escaped inside the string
  // (Previous version had a real line-break inside quotes -> "Unterminated string constant")
  const text = lines.join("\n");

  return `https://wa.me/${WHATSAPP_PHONE_E164}?text=${encodeURIComponent(text)}`;
}

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-120px" },
  transition: { duration: 0.6, ease: "easeOut" },
};

const theme = {
  page: "min-h-screen bg-[#0B1022] text-white",
  container: "mx-auto max-w-6xl px-4 sm:px-6",
  topbar:
    "sticky top-0 z-50 border-b border-white/10 bg-[#0B1022]/70 backdrop-blur",
  card:
    "rounded-[28px] border border-white/12 bg-white/5 backdrop-blur shadow-[0_20px_60px_rgba(0,0,0,0.35)]",
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
      <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
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
    />
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
            <div className={cn("pt-3 text-sm leading-relaxed", theme.textSub)}>
              {a}
            </div>
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

  return (
    <div className={theme.page}>
      {/* Top Bar */}
      <div className={theme.topbar}>
        <div className={cn(theme.container, "flex items-center justify-between py-3")}>
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-2xl bg-gradient-to-br from-[#6B4C8C] to-[#D28FB0]" />
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-tight">Sercan Aslan Clinic</div>
              <div className={cn("text-xs", theme.textMuted)}>Eksozom Tedavisi</div>
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
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-[#6B4C8C]/25 blur-[120px]" />
          <div className="absolute -right-40 top-10 h-[560px] w-[560px] rounded-full bg-[#D28FB0]/20 blur-[130px]" />
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-[#0B1022]" />
        </div>

        <div
          className={cn(
            theme.container,
            "grid gap-10 py-10 sm:py-14 lg:grid-cols-2 lg:items-center"
          )}
        >
          <motion.div {...fadeUp}>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">
              Eksozom Tedavisi:
              <span className="mt-2 block text-white/90">
                Cilt Gençleştirme ve Saç Onarımında
              </span>
              <span className="mt-2 block text-white">
                Hücresel Yenilenmenin Gücünü Keşfedin
              </span>
            </h1>

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
                className={cn("rounded-full border border-[#D28FB0]/60 text-[#D28FB0] hover:bg-[#D28FB0]/10", "px-7")}
                onClick={() => {
                  const el = document.getElementById("process");
                  el?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              >
                Uygulama Süreci
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative"
          >
            <Card className={cn(theme.card, "overflow-hidden")}>
              <div className="grid sm:grid-cols-2">
                <div className="p-6 sm:p-7">
                  <Badge className="rounded-full bg-white/10 border border-white/15 text-white">
                    Ücretsiz
                  </Badge>
                  <div className="mt-3 text-2xl font-semibold leading-tight text-[#D28FB0]">Danışmanlık İçin<br />Hemen Başvurun!</div>
                  <p className={cn("mt-2 text-sm", theme.textSub)}>
                    Formu doldurun; uzmanlarımız WhatsApp üzerinden sizinle iletişime
                    geçsin.
                  </p>
                  <Button
                    className={cn(theme.btnPrimary, "mt-4 w-full")}
                    onClick={() => openLead("Ücretsiz Danışmanlık")}
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span className="ml-2">Başvur</span>
                  </Button>
                  <div className={cn("mt-3 text-xs", theme.textMuted)}>
                    *Mesaj, WhatsApp’ta hazır olarak açılır.
                  </div>
                </div>

                <div className="relative hidden sm:block">
                  <Img src={ASSETS.cover} alt="Kapak görsel" className="min-h-[240px]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
                </div>
              </div>
            </Card>

            <div className="pointer-events-none absolute -bottom-8 -left-8 h-28 w-28 rounded-3xl bg-[#6B4C8C]/25 blur-2xl" />
          </motion.div>
        </div>
      </section>

      {/* Hücresel Yenilenme */}
      <section className={cn(theme.container, "py-12")}>
        <motion.div {...fadeUp} className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionTitle
              title="Hücresel Yenilenme: Saçta ve Ciltte Doğal Güç"
              desc="Eksozomlar, vücudun doğal iyileşme sürecini yöneten güçlü hücresel sinyaller taşır. Cilt ve saçlı deriye uygulandığında, hasarlı hücrelerin onarımını hızlandırmaya; yenilenme kapasitesini artırmaya yardımcı olur."
            />

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className={cn(theme.tile, "p-5")}>
                <div className="text-2xl font-semibold">Daha güçlü saç</div>
                <div className={cn("mt-2 text-sm", theme.textSub)}>
                  Saç köklerinde hücresel iletişimi destekleyerek saçlı derinin canlılığını
                  artırmaya yardımcı olur.
                </div>
              </div>
              <div className={cn(theme.tile, "p-5")}>
                <div className="text-2xl font-semibold">Daha yenilenmiş cilt</div>
                <div className={cn("mt-2 text-sm", theme.textSub)}>
                  Kolajen/elastin süreçlerini destekleyerek daha parlak ve dengeli görünüm
                  hedefler.
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Button className={theme.btnPrimary} size="lg" onClick={() => openLead("Eksozom")}
              >
                <Sparkles className="h-4 w-4" />
                <span className="ml-2">EKSOZOM’U KEŞFET!</span>
              </Button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className={cn(theme.tile, "overflow-hidden")}>
              <Img src={ASSETS.g1} alt="Görsel 1" className="aspect-[4/5]" />
            </div>
            <div className={cn(theme.tile, "overflow-hidden")}>
              <Img src={ASSETS.g2} alt="Görsel 2" className="aspect-[4/5]" />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Mosaic / Galeri (sayfadaki blok gibi) */}
      <section className={cn(theme.container, "pb-12")}>
        <motion.div {...fadeUp} className="grid gap-4 md:grid-cols-3">
          {[ASSETS.g3, ASSETS.g4, ASSETS.g5, ASSETS.g6, ASSETS.g7, ASSETS.g8].map(
            (src, i) => (
              <div key={i} className={cn(theme.tile, "overflow-hidden")}>
                <Img src={src} alt={`Galeri ${i + 3}`} className="aspect-[4/3]" />
              </div>
            )
          )}
        </motion.div>

        <motion.div {...fadeUp} className={cn("mt-8", theme.textSub)}>
          Sercan Aslan Clinic, Türkiye’nin önde gelen dermatoloji ve medikal estetik merkezlerinden biri
          olarak, eksozom gibi ileri teknolojili uygulamalarda global standartlarda hizmet sunar.
        </motion.div>
      </section>

      {/* Uygulama Alanları */}
      <section className={cn(theme.container, "py-12")}>
        <motion.div {...fadeUp}>
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
                  <Button
                    className={cn(theme.btnPrimary, "mt-5")}
                    onClick={() => openLead("Eksozom")}
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span className="ml-2">Ücretsiz Bilgi Al</span>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Neden Sercan Aslan Clinic + Yorumlar */}
      <section className={cn(theme.container, "py-12")}>
        <motion.div {...fadeUp}>
          <SectionTitle
            title="Neden Sercan Aslan Clinic?"
            desc="Dermatoloji ve medikal estetik alanında modern, güvenli ve kişiye özel deneyim sunmayı hedefler."
          />

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {[
              {
                name: "Luigi Rosato",
                time: "1 ay önce",
                text: "Son derece özenli ve profesyonel yaklaşım. Kendimi güvende hissettim.",
              },
              {
                name: "Gloria Sanchez",
                time: "5 gün önce",
                text: "Personel çok ilgili ve güler yüzlü. Tekrar gelmeyi düşünürüm.",
              },
              {
                name: "Renáta Szakos-Pétervári",
                time: "2 hafta önce",
                text: "Organizasyon ve bakım beklentimin üstündeydi.",
              },
              {
                name: "Alessio Minichiello",
                time: "2 hafta önce",
                text: "Tertemiz, düzenli ve her adımda açıklayıcı bir ekip.",
              },
            ].map((r) => (
              <Card key={r.name} className={theme.tile}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-sm font-semibold">{r.name}</div>
                      <div className={cn("text-xs", theme.textMuted)}>{r.time}</div>
                    </div>
                    <div className="flex gap-1 text-white/90">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <Star key={i} className="h-4 w-4" />
                      ))}
                    </div>
                  </div>
                  <div className={cn("mt-3 text-sm leading-relaxed", theme.textSub)}>
                    {r.text}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-6">
            <Button className={theme.btnPrimary} size="lg" onClick={() => openLead("Randevu")}>
              <MessageCircle className="h-4 w-4" />
              <span className="ml-2">HEMEN RANDEVUNUZU OLUŞTURUN</span>
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Uygulama Süreci */}
      <section className={cn(theme.container, "py-12")} id="process">
        <motion.div {...fadeUp}>
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
            <Button
              className={theme.btnPrimary}
              size="lg"
              onClick={() => openLead("Seans & Fiyat")}
            >
              <MessageCircle className="h-4 w-4" />
              <span className="ml-2">Eksozom Seans & Fiyat Bilgisi İçin Başvurun</span>
            </Button>
          </div>
        </motion.div>
      </section>

      {/* FAQ */}
      <section className={cn(theme.container, "py-12")}>
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
                <div className={cn("text-xs", theme.textMuted)}>Eksozom Tedavisi</div>
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
                      İsim ve telefonunu yaz — mesajına{" "}
                      <span className="font-semibold">{selectedInterest}</span> bilgisi eklensin.
                    </div>
                    <div className="mt-6 rounded-2xl bg-white/15 p-4 text-white/90 text-sm">
                      *Mesajı siz onaylayıp gönderirsiniz.
                    </div>
                  </div>

                  <div className="sm:col-span-3 bg-white p-6 sm:p-8 text-[#0B1022]">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-sm font-medium text-slate-600">Hızlı bilgi formu</div>
                        <div className="mt-1 text-xl font-semibold tracking-tight">
                          WhatsApp’ta hazır mesaj oluşturalım
                        </div>
                        <div className="mt-2 text-sm text-slate-600">
                          İsim ve telefonunu yaz — mesajına{" "}
                          <span className="font-medium">{selectedInterest}</span> bilgisi eklensin.
                        </div>
                      </div>
                      <button
                        onClick={() => setIsOpen(false)}
                        className="rounded-full border border-slate-200 px-3 py-2 text-sm"
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

  __assert(url.startsWith(`https://wa.me/${WHATSAPP_PHONE_E164}?text=`), "URL prefix correct");

  const encoded = url.split("?text=")[1] || "";
  const decoded = decodeURIComponent(encoded);

  // newline is preserved as real \n in decoded text
  __assert(decoded.includes("İsim Soyisim: Ahmet Yılmaz"), "Name included");
  __assert(decoded.includes("Telefon: 05551234567"), "Phone included");
  __assert(decoded.includes("İlgilendiğim uygulama: Eksozom"), "Interest included");
  __assert(decoded.includes("\n"), "Contains newline separators");
}

// Run tests during Next.js build/server-side only (not in the browser)
if (typeof window === "undefined" && process?.env?.NODE_ENV !== "production") {
  __runTests();
}
