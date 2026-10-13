import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, MapPin, Phone, Star, ArrowUpRight } from "lucide-react";
import hero from "@/assets/hero.jpg";
import heroRoma from "@/assets/hero-roma.jpg";
import paodequeijo from "@/assets/paodequeijo.jpg";
import breakfast from "@/assets/breakfast.jpg";
import cakes from "@/assets/cakes.jpg";
import oven from "@/assets/oven.jpg";
import coffee from "@/assets/coffee.jpg";
import salgados from "@/assets/salgados.jpg";
import paofrances from "@/assets/paofrances.jpg";
import croissant from "@/assets/croissant.jpg";
import logo from "@/assets/roma-logo.png.asset.json";
import americano from "@/assets/americano.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Padaria Roma — Casa de Pães | Itajubá — MG" },
      { name: "description", content: "Pães frescos, café da manhã, confeitaria e encomendas na Av. BPS, 35 — Pinheirinho, Itajubá." },
      { property: "og:title", content: "Padaria Roma — Casa de Pães" },
      { property: "og:description", content: "Todo dia começa melhor com pão fresco. Padaria, cafeteria e confeitaria em Itajubá." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const WHATSAPP = "https://wa.me/5535984382807";
const MAPS = "https://www.google.com/maps/search/?api=1&query=Padaria+Roma+Av.+BPS+35+Pinheirinho+Itajub%C3%A1+MG";

const nav = [
  ["Início", "#inicio"],
  ["A Roma", "#a-roma"],
  ["Nossos Sabores", "#sabores"],
  ["Café da Manhã", "#cafe"],
  ["Encomendas", "#encomendas"],
  ["Contato", "#contato"],
];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && (e.target.classList.add("is-visible"), io.unobserve(e.target))),
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Btn({ href, children, variant = "solid" }: { href: string; children: React.ReactNode; variant?: "solid" | "outline" | "light" | "ghostLight" }) {
  const styles = {
    solid: "bg-primary text-primary-foreground hover:bg-wine-dark",
    outline: "border border-wine text-wine hover:bg-wine hover:text-cream",
    light: "bg-cream text-wine hover:bg-wheat",
    ghostLight: "border border-cream/60 text-cream hover:bg-cream hover:text-wine",
  }[variant];
  const ext = href.startsWith("http");
  return (
    <a href={href} {...(ext ? { target: "_blank", rel: "noreferrer" } : {})}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-[4px] px-7 text-xs font-bold uppercase tracking-[0.16em] transition-colors duration-300 ${styles}`}>
      {children}
    </a>
  );
}

function Wheat({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 160" className={className} fill="none" stroke="currentColor" strokeWidth="1" aria-hidden>
      <path d="M20 160V20" />
      {Array.from({ length: 7 }).map((_, i) => (
        <g key={i}>
          <path d={`M20 ${30 + i * 16} C 10 ${24 + i * 16}, 6 ${16 + i * 16}, 8 ${10 + i * 16} C 16 ${14 + i * 16}, 20 ${22 + i * 16}, 20 ${30 + i * 16}`} />
          <path d={`M20 ${30 + i * 16} C 30 ${24 + i * 16}, 34 ${16 + i * 16}, 32 ${10 + i * 16} C 24 ${14 + i * 16}, 20 ${22 + i * 16}, 20 ${30 + i * 16}`} />
        </g>
      ))}
    </svg>
  );
}

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header className={`fixed inset-x-0 top-0 z-50 bg-cream transition-shadow duration-500 ${scrolled || open ? "shadow-[0_1px_0_var(--border)]" : ""}`}>
      <div className="h-1 bg-wine" />
      <div className={`mx-auto flex max-w-7xl items-center justify-between px-5 transition-all duration-500 md:px-10 ${scrolled ? "h-20" : "h-24 md:h-28"}`}>
        <a href="#inicio" aria-label="Padaria Roma — início" className="shrink-0">
          <img src={logo.url} alt="Padaria Roma Casa de Pães" className={`w-auto transition-all duration-500 ${scrolled ? "h-14" : "h-16 md:h-20"}`} />
        </a>
        <nav className="hidden items-center gap-7 text-sm font-medium text-brown lg:flex">
          {nav.slice(1).map(([l, h]) => <a key={h} href={h} className="link-underline transition-colors hover:text-wine">{l}</a>)}
          <Btn href={MAPS}>Como chegar</Btn>
        </nav>
        <button aria-label="Menu" onClick={() => setOpen(!open)} className="grid h-11 w-11 place-items-center text-wine lg:hidden">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {open && (
        <div className="h-[calc(100svh-6rem)] border-t border-border bg-cream px-6 pt-6 lg:hidden">
          {nav.map(([l, h], i) => (
            <a key={h} href={h} onClick={() => setOpen(false)} className="flex items-baseline gap-4 border-b border-border py-4 font-serif text-3xl text-brown">
              <span className="font-sans text-xs font-bold text-caramel">0{i + 1}</span>{l}
            </a>
          ))}
          <div className="mt-8"><Btn href={MAPS}>Como chegar</Btn></div>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="inicio" className="relative bg-cream pt-28 md:pt-32">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 pb-16 md:grid-cols-12 md:items-center md:px-10 md:pb-24">
        <div className="order-2 md:order-1 md:col-span-5">
          <p className="eyebrow text-wine">Casa de Pães · Itajubá</p>
          <h1 className="mt-6 text-[2.9rem] leading-[1.02] text-brown sm:text-6xl lg:text-[4.6rem]">
            Todo dia começa <em className="text-wine">melhor</em> com pão fresco.
          </h1>
          <p className="mt-7 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
            Pães, cafés e sabores preparados para fazer parte dos melhores momentos do seu dia.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Btn href="#sabores">Conheça nossos sabores</Btn>
            <Btn href={MAPS} variant="outline">Como chegar</Btn>
          </div>
          <div className="mt-12 grid grid-cols-3 border-t border-wine/30 pt-5 text-brown">
            {[["06h", "abre cedo"], ["Seg–Sáb", "06:00 às 20:00"], ["4.6★", "no Google"]].map(([a, b]) => (
              <div key={a}><p className="font-serif text-2xl text-wine">{a}</p><p className="mt-1 text-xs text-muted-foreground">{b}</p></div>
            ))}
          </div>
        </div>
        <div className="relative order-1 md:order-2 md:col-span-7">
          <div className="overflow-hidden rounded-t-[999px] border border-wine/20 p-2 md:ml-8">
            <img src={heroRoma} alt="Mesa com pão francês, pão de queijo e café" width={1280} height={1600}
              className="aspect-[4/5] w-full rounded-t-[999px] object-cover md:aspect-[5/5.4]" />
          </div>
          <div className="absolute -bottom-6 left-0 grid h-28 w-28 place-items-center rounded-full bg-wine p-3 text-center text-cream shadow-[0_10px_30px_-10px_var(--wine)] md:-left-2 md:h-32 md:w-32">
            <div className="rounded-full border border-cream/40 p-3">
              <p className="eyebrow justify-center text-[0.5rem] text-caramel before:hidden">Desde sempre</p>
              <p className="font-serif text-lg italic leading-tight">Pão quentinho</p>
              <p className="text-[0.6rem] uppercase tracking-widest">toda manhã</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 border-y border-border bg-card px-5 py-4 text-xs font-medium uppercase tracking-[0.2em] text-brown md:px-10">
        <MapPin size={14} className="text-wine" /> Av. BPS, 35 · Pinheirinho · Itajubá — MG
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="a-roma" className="bg-card"><div className="mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-36">
      <div className="grid gap-12 md:grid-cols-12 md:gap-10">
        <div className="reveal img-zoom md:col-span-6">
          <img src={oven} alt="Pães saindo do forno" loading="lazy" width={1024} height={1280} className="aspect-[4/5] w-full object-cover" />
        </div>
        <div className="reveal md:col-span-5 md:col-start-8 md:pt-24">
          <p className="eyebrow text-wine">Casa de Pães</p>
          <h2 className="mt-5 text-4xl leading-[1.08] text-brown md:text-6xl">Uma padaria feita para fazer parte do seu dia.</h2>
          <p className="mt-8 leading-relaxed text-muted-foreground">
            Na Roma, cada fornada é preparada com cuidado e atenção aos detalhes. Pães fresquinhos, café passado na hora e aquela mesa onde dá vontade de sentar sem pressa.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            É a padaria do bairro, do jeito que a gente gosta: próxima, acolhedora e com o cheiro de pão saindo do forno.
          </p>
          <ul className="mt-10 grid grid-cols-2 gap-x-6 border-t border-border">
            {["Pães frescos", "Café da manhã", "Confeitaria", "Encomendas"].map((t, i) => (
              <li key={t} className="flex items-baseline gap-3 border-b border-border py-4">
                <span className="font-sans text-xs font-bold text-wine">0{i + 1}</span>
                <span className="text-sm font-medium">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div></section>
  );
}

const flavors = [
  { n: "01", t: "Pães & Baguetes", d: "Pães para começar o dia, acompanhar refeições ou simplesmente comer ainda quentinhos.", img: paofrances },
  { n: "02", t: "Pão de queijo & Café", d: "Pão de queijo quentinho, café passado na hora e aquele começo de dia sem pressa.", img: paodequeijo },
  { n: "03", t: "Confeitaria", d: "Bolos, tortas e doces para deixar o cotidiano um pouco mais especial.", img: cakes },
  { n: "04", t: "Salgados & Lanches", d: "Opções para aquela pausa rápida ou para acompanhar um bom café.", img: salgados },
];

function Flavors() {
  return (
    <section id="sabores" className="relative overflow-hidden bg-wine py-24 text-cream md:py-36">
      <Wheat className="pointer-events-none absolute right-8 top-12 hidden h-56 text-caramel/40 md:block" />
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="reveal max-w-3xl">
          <p className="eyebrow text-caramel">Nossos sabores</p>
          <h2 className="mt-5 text-4xl leading-[1.08] text-wheat md:text-6xl">Tem sempre alguma coisa boa <em className="text-caramel">saindo do forno.</em></h2>
        </div>

        <div className="mt-20 space-y-24 md:space-y-36">
          {flavors.map((f, i) => {
            const right = i % 2 === 1;
            return (
              <article key={f.n} className="reveal grid items-center gap-8 md:grid-cols-12">
                <div className={`img-zoom ${right ? "md:order-2 md:col-span-6 md:col-start-7" : "md:col-span-7"} ${i === 2 ? "md:col-span-5" : ""}`}>
                  <img src={f.img} alt={f.t} loading="lazy" className={`w-full border border-caramel/30 object-cover ${i % 2 ? "aspect-[4/3]" : "aspect-[5/4]"}`} />
                </div>
                <div className={`${right ? "md:order-1 md:col-span-4 md:col-start-2" : "md:col-span-4 md:col-start-9"}`}>
                  <span className="font-serif text-5xl italic text-caramel md:text-7xl">{f.n}</span>
                  <h3 className="mt-2 text-3xl text-wheat md:text-5xl">{f.t}</h3>
                  <p className="mt-5 max-w-sm leading-relaxed text-cream/80">{f.d}</p>
                </div>
              </article>
            );
          })}
          <article className="reveal grid items-end gap-8 border-t border-caramel/40 pt-16 md:grid-cols-12">
            <span className="font-serif text-5xl italic text-caramel md:col-span-2 md:text-7xl">05</span>
            <h3 className="text-3xl text-wheat md:col-span-4 md:text-5xl">Encomendas</h3>
            <p className="leading-relaxed text-cream/80 md:col-span-4">Doces, bolos e preparos especiais para comemorações e momentos importantes.</p>
            <a href="#encomendas" className="link-underline inline-flex items-center gap-1 justify-self-start text-sm font-semibold text-caramel md:col-span-2 md:justify-self-end">Saiba mais <ArrowUpRight size={16} /></a>
          </article>
        </div>
      </div>
    </section>
  );
}

function Breakfast() {
  return (
    <section id="cafe" className="relative overflow-hidden bg-wheat text-brown">
      <Wheat className="pointer-events-none absolute right-6 top-10 hidden h-64 text-wine/20 md:block" />
      <div className="grid md:grid-cols-2">
        <div className="img-zoom">
          <img src={breakfast} alt="Mesa de café da manhã com pão de queijo, café e frutas" loading="lazy" width={1280} height={1280} className="h-full min-h-[420px] w-full object-cover" />
        </div>
        <div className="reveal flex flex-col justify-center px-6 py-20 md:px-16 lg:px-24">
          <p className="eyebrow text-wine">Café da manhã</p>
          <h2 className="mt-6 text-4xl leading-[1.08] md:text-6xl">Seu café da manhã merece um <em className="text-wine">lugar especial.</em></h2>
          <p className="mt-8 max-w-md leading-relaxed text-muted-foreground">
            Do café quentinho ao pão de queijo, das torradas aos doces: escolha seus favoritos e comece o dia do melhor jeito.
          </p>
          <div className="mt-10"><Btn href={MAPS}>Venha tomar um café</Btn></div>
        </div>
      </div>
    </section>
  );
}

const showcase = [
  { t: "Pão francês", img: paofrances, c: "md:col-span-2 md:row-span-2" },
  { t: "Croissant", img: croissant, c: "" },
  { t: "Cafés", img: coffee, c: "" },
  { t: "Bolos & Tortas", img: cakes, c: "md:row-span-2" },
  { t: "Lanches", img: americano.url, c: "md:row-span-2" },
  { t: "Salgados", img: salgados, c: "" },
  { t: "Pão de queijo", img: paodequeijo, c: "" },
  { t: "Baguetes", img: hero, c: "md:col-span-2" },
];

function Showcase() {
  return (
    <section className="bg-card py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="reveal flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div><p className="eyebrow text-wine">Vitrine</p><h2 className="mt-5 max-w-2xl text-4xl leading-[1.08] text-brown md:text-6xl">Os sabores que fazem parte da Roma.</h2></div>
          <p className="max-w-xs text-sm text-muted-foreground">Pão francês, pão de queijo, croissants, baguetes, bolos, tortas, cafés e salgados.</p>
        </div>
        <div className="no-scrollbar -mx-5 mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 md:mx-0 md:grid md:auto-rows-[220px] md:grid-cols-4 md:overflow-visible md:px-0">
          {showcase.map((s) => (
            <figure key={s.t} className={`img-zoom group relative h-80 w-[72vw] shrink-0 snap-start md:h-auto md:w-auto ${s.c}`}>
              <img src={s.img} alt={s.t} loading="lazy" className="h-full w-full object-cover" />
              <figcaption className="absolute bottom-4 left-4 rounded-[3px] bg-cream px-3 py-1.5 font-serif text-lg italic text-wine">{s.t}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Orders() {
  return (
    <section id="encomendas" className="bg-cream py-24 md:py-36">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:grid-cols-12 md:px-10">
        <div className="reveal md:col-span-5 md:col-start-2">
          <p className="eyebrow text-wine">Encomendas</p>
          <p className="mt-5 font-serif text-2xl italic text-wine">Tem um momento especial chegando?</p>
          <h2 className="mt-3 text-5xl leading-[1.05] text-brown md:text-6xl">Deixe a Roma fazer parte dele.</h2>
          <p className="mt-8 max-w-md leading-relaxed text-muted-foreground">Consulte nossas opções de bolos, tortas, doces e encomendas especiais.</p>
          <div className="mt-10"><Btn href={WHATSAPP}>Fazer uma encomenda</Btn></div>
        </div>
        <div className="reveal img-zoom md:col-span-5 md:col-start-8 md:-mb-48">
          <img src={cakes} alt="Bolos e tortas da confeitaria" loading="lazy" width={1024} height={1280} className="aspect-[4/5] w-full rounded-t-[999px] object-cover" />
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  const notes = ["Pão sempre fresquinho", "Café da manhã caprichado", "Atendimento acolhedor"];
  return (
    <section className="py-24 md:pb-32 md:pt-64">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="reveal grid gap-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="eyebrow text-wine">Avaliações</p>
            <h2 className="mt-5 text-4xl leading-[1.08] text-brown md:text-6xl">Quem passa pela Roma, <em className="text-wine">volta.</em></h2>
          </div>
          <div className="md:col-span-5 md:col-start-8">
            <div className="flex items-end gap-5">
              <span className="font-serif text-8xl leading-none text-wine">4.6</span>
              <div className="pb-2">
                <div className="flex gap-1 text-caramel">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={18} fill="currentColor" strokeWidth={0} />)}</div>
                <p className="mt-2 text-sm text-muted-foreground">+200 avaliações no Google</p>
              </div>
            </div>
            <ul className="mt-10 border-t border-border">
              {notes.map((n) => <li key={n} className="border-b border-border py-4 font-serif text-2xl italic text-brown">"{n}"</li>)}
            </ul>
            <a href={MAPS} target="_blank" rel="noreferrer" className="link-underline mt-8 inline-flex items-center gap-1 text-sm font-medium">Veja nossas avaliações no Google <ArrowUpRight size={16} /></a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Location() {
  return (
    <section id="contato" className="border-t border-border bg-card py-24 md:py-36">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 md:grid-cols-12 md:px-10">
        <div className="reveal md:col-span-5">
          <p className="eyebrow text-wine">Contato</p>
          <h2 className="mt-5 text-5xl leading-[1.05] text-brown md:text-6xl">Estamos te <em className="text-wine">esperando.</em></h2>
          <div className="mt-12 grid gap-10 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
            <div>
              <p className="eyebrow text-wine">Endereço</p>
              <p className="mt-4 leading-relaxed">Padaria Roma — Casa de Pães<br />Av. BPS, 35 · Pinheirinho<br />Itajubá — MG<br />CEP 37500-176</p>
              <a href="tel:+5535984382807" className="link-underline mt-4 inline-flex items-center gap-2 text-sm"><Phone size={14} /> (35) 98438-2807</a>
            </div>
            <div>
              <p className="eyebrow text-wine">Horário</p>
              <p className="mt-4">Segunda a sábado</p>
              <p className="font-serif text-4xl text-wine">06:00 — 20:00</p>
            </div>
          </div>
          <div className="mt-12"><Btn href={MAPS}><MapPin size={16} /> Abrir no Google Maps</Btn></div>
        </div>
        <div className="reveal md:col-span-6 md:col-start-7">
          <iframe title="Mapa Padaria Roma" loading="lazy" className="h-[420px] w-full border border-border grayscale-[0.4] md:h-full md:min-h-[520px]"
            src="https://www.google.com/maps?q=Av.+BPS,+35+-+Pinheirinho,+Itajub%C3%A1+-+MG&output=embed" />
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="bg-coffee text-cream">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-24 md:grid-cols-12 md:px-10 md:py-32">
        <div className="reveal md:col-span-7">
          <p className="eyebrow text-caramel">Venha nos visitar</p>
          <h2 className="mt-6 text-5xl leading-[1.05] text-wheat md:text-7xl">Tem coisa melhor que <em className="text-caramel">pão quentinho?</em></h2>
          <p className="mt-8 max-w-md text-lg text-cream/75">Passe na Roma e descubra seu próximo favorito.</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Btn href={MAPS}>Como chegar</Btn>
            <Btn href={WHATSAPP} variant="ghostLight">Falar pelo WhatsApp</Btn>
          </div>
        </div>
        <div className="reveal img-zoom md:col-span-5">
          <img src={coffee} alt="Café passado na Roma" loading="lazy" className="aspect-[4/5] w-full rounded-t-[999px] object-cover" />
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-coffee text-cream/70">
      <div className="mx-auto max-w-7xl px-5 md:px-10"><div className="ornament text-caramel"><Wheat className="h-10 w-4 rotate-90" /></div></div>
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-4 md:px-10">
        <div className="md:col-span-2">
          <div className="inline-block rounded-[4px] bg-cream p-4"><img src={logo.url} alt="Padaria Roma Casa de Pães" loading="lazy" className="h-20 w-auto" /></div>
          <p className="mt-6 text-sm">Av. BPS, 35 · Pinheirinho · Itajubá — MG</p>
          <p className="mt-1 text-sm">Segunda a sábado · 06:00 — 20:00</p>
        </div>
        <ul className="space-y-3 text-sm">
          {[["Início", "#inicio"], ["A Roma", "#a-roma"], ["Sabores", "#sabores"], ["Encomendas", "#encomendas"], ["Contato", "#contato"]].map(([l, h]) => (
            <li key={h}><a href={h} className="link-underline hover:text-caramel">{l}</a></li>
          ))}
        </ul>
        <ul className="space-y-3 text-sm">
          <li><a href="https://www.instagram.com/romacasadepaes/" target="_blank" rel="noreferrer" className="link-underline hover:text-caramel">Instagram</a></li>
          <li><a href={WHATSAPP} target="_blank" rel="noreferrer" className="link-underline hover:text-caramel">WhatsApp</a></li>
          <li><a href="tel:+5535984382807" className="link-underline hover:text-caramel">(35) 98438-2807</a></li>
        </ul>
      </div>
      <div className="border-t border-cream/10"><p className="mx-auto max-w-7xl px-5 py-6 text-xs md:px-10">© Padaria Roma Casa de Pães. Todos os direitos reservados.</p></div>
    </footer>
  );
}

function WhatsFloat() {
  return (
    <a href={WHATSAPP} target="_blank" rel="noreferrer" aria-label="Falar pelo WhatsApp"
      className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg transition-colors duration-300 hover:bg-wine-dark">
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.4a.5.5 0 0 0 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.3c0-.1-.2-.2-.5-.3Z" /></svg>
    </a>
  );
}

function Index() {
  useReveal();
  return (
    <main className="overflow-x-hidden">
      <Header />
      <Hero />
      <About />
      <Flavors />
      <Breakfast />
      <Showcase />
      <Orders />
      <Reviews />
      <Location />
      <FinalCta />
      <Footer />
      <WhatsFloat />
    </main>
  );
}
