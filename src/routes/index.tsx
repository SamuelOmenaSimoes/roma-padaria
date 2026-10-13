import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, MapPin, Phone, Star, ArrowUpRight } from "lucide-react";
import hero from "@/assets/hero.jpg";
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
    solid: "bg-primary text-primary-foreground hover:bg-coffee",
    outline: "border border-foreground/30 text-foreground hover:bg-foreground hover:text-background",
    light: "bg-cream text-coffee hover:bg-wheat",
    ghostLight: "border border-cream/50 text-cream hover:bg-cream hover:text-coffee",
  }[variant];
  const ext = href.startsWith("http");
  return (
    <a href={href} {...(ext ? { target: "_blank", rel: "noreferrer" } : {})}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-sm px-7 text-sm font-medium tracking-wide transition-all duration-500 ${styles}`}>
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
  const light = !scrolled && !open;
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled || open ? "bg-cream/85 backdrop-blur-md border-b border-border/60" : "bg-transparent"}`}>
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:px-10">
        <a href="#inicio" className={`flex items-center gap-3 ${light ? "text-cream" : "text-foreground"}`}>
          <img src={logo.url} alt="Logo Padaria Roma" className="h-10 w-10 shrink-0 object-contain" />
          <span className="leading-none">
            <span className="block font-serif text-3xl italic">Roma</span>
            <span className="eyebrow block text-[0.55rem] opacity-80">Casa de Pães</span>
          </span>
        </a>
        <nav className={`hidden items-center gap-8 text-sm lg:flex ${light ? "text-cream" : "text-foreground"}`}>
          {nav.map(([l, h]) => <a key={h} href={h} className="link-underline">{l}</a>)}
          <Btn href={MAPS} variant={light ? "ghostLight" : "solid"}>Como chegar</Btn>
        </nav>
        <button aria-label="Menu" onClick={() => setOpen(!open)} className={`grid h-11 w-11 place-items-center lg:hidden ${light ? "text-cream" : "text-foreground"}`}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <div className="h-[calc(100svh-5rem)] border-t border-border/60 bg-cream px-6 pt-8 lg:hidden">
          {nav.map(([l, h]) => (
            <a key={h} href={h} onClick={() => setOpen(false)} className="block border-b border-border/60 py-4 font-serif text-3xl">{l}</a>
          ))}
          <div className="mt-8"><Btn href={MAPS}>Como chegar</Btn></div>
        </div>
      )}
    </header>
  );
}

function Hero() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const on = () => setY(window.scrollY);
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <section id="inicio" className="relative h-[100svh] min-h-[620px] overflow-hidden bg-coffee">
      <img src={hero} alt="Balcão da padaria com pães, baguetes, croissants e pão de queijo" width={1920} height={1152}
        className="absolute inset-0 h-full w-full object-cover" style={{ transform: `translateY(${y * 0.15}px) scale(1.05)` }} />
      <div className="absolute inset-0 bg-gradient-to-t from-coffee/85 via-coffee/35 to-coffee/30" />
      <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-5 pb-14 md:px-10 md:pb-20">
        <p className="eyebrow mb-6 text-wheat">Padaria • Cafeteria • Confeitaria</p>
        <h1 className="max-w-4xl text-[3.1rem] leading-[0.95] text-cream sm:text-7xl md:text-[6.5rem]">
          Todo dia começa<br /><em className="text-wheat">melhor</em> com pão fresco.
        </h1>
        <div className="mt-8 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <p className="max-w-md text-base leading-relaxed text-cream/85 md:text-lg">
            Pães, cafés e sabores preparados para fazer parte dos melhores momentos do seu dia.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Btn href="#sabores" variant="light">Conheça nossos sabores</Btn>
            <Btn href={MAPS} variant="ghostLight">Como chegar</Btn>
          </div>
        </div>
        <p className="mt-10 flex items-center gap-2 border-t border-cream/20 pt-5 text-xs tracking-widest text-cream/70 uppercase">
          <MapPin size={14} /> Av. BPS, 35 • Itajubá — MG
        </p>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="a-roma" className="mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-40">
      <div className="grid gap-12 md:grid-cols-12 md:gap-10">
        <div className="reveal img-zoom md:col-span-6 md:-ml-10">
          <img src={oven} alt="Pães saindo do forno" loading="lazy" width={1024} height={1280} className="aspect-[4/5] w-full object-cover" />
        </div>
        <div className="reveal md:col-span-5 md:col-start-8 md:pt-24">
          <p className="eyebrow text-caramel">Um pouco da Roma</p>
          <h2 className="mt-5 text-4xl leading-[1.05] md:text-6xl">Uma padaria feita para fazer parte do seu dia.</h2>
          <p className="mt-8 leading-relaxed text-muted-foreground">
            Na Roma, cada fornada é preparada com cuidado e atenção aos detalhes. Pães fresquinhos, café passado na hora e aquela mesa onde dá vontade de sentar sem pressa.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            É a padaria do bairro, do jeito que a gente gosta: próxima, acolhedora e com o cheiro de pão saindo do forno.
          </p>
          <ul className="mt-10 grid grid-cols-2 gap-x-6 border-t border-border">
            {["Pães frescos", "Café da manhã", "Confeitaria", "Encomendas"].map((t, i) => (
              <li key={t} className="flex items-baseline gap-3 border-b border-border py-4">
                <span className="font-serif text-sm italic text-caramel">0{i + 1}</span>
                <span className="text-sm font-medium">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

const flavors = [
  { n: "01", t: "Pães & Baguetes", d: "Pães para começar o dia, acompanhar refeições ou simplesmente comer ainda quentinhos.", img: paofrances },
  { n: "02", t: "Café da Manhã", d: "Café passado, pão de queijo, lanches e aquele começo de dia sem pressa.", img: coffee },
  { n: "03", t: "Confeitaria", d: "Bolos, tortas e doces para deixar o cotidiano um pouco mais especial.", img: cakes },
  { n: "04", t: "Salgados & Lanches", d: "Opções para aquela pausa rápida ou para acompanhar um bom café.", img: salgados },
];

function Flavors() {
  return (
    <section id="sabores" className="bg-card py-24 md:py-40">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="reveal max-w-3xl">
          <p className="eyebrow text-caramel">Nossos sabores</p>
          <h2 className="mt-5 text-4xl leading-[1.05] md:text-7xl">Tem sempre alguma coisa boa <em>saindo do forno.</em></h2>
        </div>

        <div className="mt-20 space-y-24 md:space-y-36">
          {flavors.map((f, i) => {
            const right = i % 2 === 1;
            return (
              <article key={f.n} className="reveal grid items-center gap-8 md:grid-cols-12">
                <div className={`img-zoom ${right ? "md:order-2 md:col-span-6 md:col-start-7" : "md:col-span-7"} ${i === 2 ? "md:col-span-5" : ""}`}>
                  <img src={f.img} alt={f.t} loading="lazy" className={`w-full object-cover ${i % 2 ? "aspect-[4/3]" : "aspect-[5/4]"}`} />
                </div>
                <div className={`${right ? "md:order-1 md:col-span-4 md:col-start-2" : "md:col-span-4 md:col-start-9"}`}>
                  <span className="font-serif text-6xl italic text-wheat md:text-8xl">{f.n}</span>
                  <h3 className="mt-2 text-3xl md:text-5xl">{f.t}</h3>
                  <p className="mt-5 max-w-sm leading-relaxed text-muted-foreground">{f.d}</p>
                </div>
              </article>
            );
          })}
          <article className="reveal grid items-end gap-8 border-t border-border pt-16 md:grid-cols-12">
            <span className="font-serif text-6xl italic text-wheat md:col-span-2 md:text-8xl">05</span>
            <h3 className="text-3xl md:col-span-4 md:text-5xl">Encomendas</h3>
            <p className="leading-relaxed text-muted-foreground md:col-span-4">Doces, bolos e preparos especiais para comemorações e momentos importantes.</p>
            <a href="#encomendas" className="link-underline inline-flex items-center gap-1 justify-self-start text-sm font-medium md:col-span-2 md:justify-self-end">Saiba mais <ArrowUpRight size={16} /></a>
          </article>
        </div>
      </div>
    </section>
  );
}

function Breakfast() {
  return (
    <section id="cafe" className="relative overflow-hidden bg-coffee text-coffee-foreground">
      <Wheat className="pointer-events-none absolute right-6 top-10 hidden h-64 text-wheat/20 md:block" />
      <div className="grid md:grid-cols-2">
        <div className="img-zoom">
          <img src={breakfast} alt="Mesa de café da manhã com pão de queijo, café e frutas" loading="lazy" width={1280} height={1280} className="h-full min-h-[420px] w-full object-cover" />
        </div>
        <div className="reveal flex flex-col justify-center px-6 py-20 md:px-16 lg:px-24">
          <p className="eyebrow text-caramel">As manhãs na Roma</p>
          <h2 className="mt-6 text-4xl leading-[1.05] text-cream md:text-6xl">Seu café da manhã merece um <em className="text-wheat">lugar especial.</em></h2>
          <p className="mt-8 max-w-md leading-relaxed text-coffee-foreground/75">
            Do café quentinho ao pão de queijo, das torradas aos doces: escolha seus favoritos e comece o dia do melhor jeito.
          </p>
          <div className="mt-10"><Btn href={MAPS} variant="light">Venha tomar um café</Btn></div>
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
  { t: "Pão de queijo", img: breakfast, c: "" },
  { t: "Baguetes", img: hero, c: "md:col-span-2" },
];

function Showcase() {
  return (
    <section className="py-24 md:py-40">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="reveal flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2 className="max-w-2xl text-4xl leading-[1.05] md:text-6xl">Os sabores que fazem parte da Roma.</h2>
          <p className="max-w-xs text-sm text-muted-foreground">Pão francês, pão de queijo, croissants, baguetes, bolos, tortas, cafés e salgados.</p>
        </div>
        <div className="no-scrollbar -mx-5 mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 md:mx-0 md:grid md:auto-rows-[220px] md:grid-cols-4 md:overflow-visible md:px-0">
          {showcase.map((s) => (
            <figure key={s.t} className={`img-zoom group relative h-80 w-[72vw] shrink-0 snap-start md:h-auto md:w-auto ${s.c}`}>
              <img src={s.img} alt={s.t} loading="lazy" className="h-full w-full object-cover" />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-coffee/80 to-transparent p-5 font-serif text-2xl italic text-cream">{s.t}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Orders() {
  return (
    <section id="encomendas" className="bg-wheat/40 py-24 md:py-36">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:grid-cols-12 md:px-10">
        <div className="reveal md:col-span-5 md:col-start-2">
          <p className="font-serif text-2xl italic text-wine">Tem um momento especial chegando?</p>
          <h2 className="mt-5 text-5xl leading-[1] md:text-7xl">Deixe a Roma fazer parte dele.</h2>
          <p className="mt-8 max-w-md leading-relaxed text-muted-foreground">Consulte nossas opções de bolos, tortas, doces e encomendas especiais.</p>
          <div className="mt-10"><Btn href={WHATSAPP}>Fazer uma encomenda</Btn></div>
        </div>
        <div className="reveal img-zoom md:col-span-5 md:col-start-8 md:-mb-48">
          <img src={cakes} alt="Bolos e tortas da confeitaria" loading="lazy" width={1024} height={1280} className="aspect-[4/5] w-full object-cover" />
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
            <p className="eyebrow text-caramel">Prova social</p>
            <h2 className="mt-5 text-4xl leading-[1.05] md:text-6xl">Quem passa pela Roma, <em>volta.</em></h2>
          </div>
          <div className="md:col-span-5 md:col-start-8">
            <div className="flex items-end gap-5">
              <span className="font-serif text-8xl leading-none">4.6</span>
              <div className="pb-2">
                <div className="flex gap-1 text-caramel">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={18} fill="currentColor" strokeWidth={0} />)}</div>
                <p className="mt-2 text-sm text-muted-foreground">+200 avaliações no Google</p>
              </div>
            </div>
            <ul className="mt-10 border-t border-border">
              {notes.map((n) => <li key={n} className="border-b border-border py-4 font-serif text-2xl italic">"{n}"</li>)}
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
          <h2 className="text-5xl leading-[1] md:text-7xl">Estamos te <em>esperando.</em></h2>
          <div className="mt-12 grid gap-10 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
            <div>
              <p className="eyebrow text-caramel">Endereço</p>
              <p className="mt-4 leading-relaxed">Padaria Roma — Casa de Pães<br />Av. BPS, 35 · Pinheirinho<br />Itajubá — MG<br />CEP 37500-176</p>
              <a href="tel:+5535984382807" className="link-underline mt-4 inline-flex items-center gap-2 text-sm"><Phone size={14} /> (35) 98438-2807</a>
            </div>
            <div>
              <p className="eyebrow text-caramel">Horário</p>
              <p className="mt-4">Segunda a sábado</p>
              <p className="font-serif text-4xl">06:00 — 20:00</p>
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
    <section className="relative overflow-hidden bg-coffee py-32 md:py-48">
      <img src={coffee} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-45" />
      <div className="absolute inset-0 bg-gradient-to-r from-coffee via-coffee/70 to-transparent" />
      <div className="reveal relative mx-auto max-w-7xl px-5 md:px-10">
        <h2 className="max-w-3xl text-5xl leading-[1] text-cream md:text-8xl">Tem coisa melhor que <em className="text-wheat">pão quentinho?</em></h2>
        <p className="mt-8 max-w-md text-lg text-cream/80">Passe na Roma e descubra seu próximo favorito.</p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Btn href={MAPS} variant="light">Como chegar</Btn>
          <Btn href={WHATSAPP} variant="ghostLight">Falar pelo WhatsApp</Btn>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-coffee text-coffee-foreground/70">
      <div className="mx-auto grid max-w-7xl gap-12 border-t border-cream/10 px-5 py-16 md:grid-cols-4 md:px-10">
        <div className="md:col-span-2">
          <p className="font-serif text-5xl italic text-cream">Roma</p>
          <p className="eyebrow mt-1 text-wheat">Casa de Pães</p>
          <p className="mt-6 text-sm">Av. BPS, 35 · Itajubá — MG</p>
        </div>
        <ul className="space-y-3 text-sm">
          {[["Início", "#inicio"], ["A Roma", "#a-roma"], ["Sabores", "#sabores"], ["Encomendas", "#encomendas"], ["Contato", "#contato"]].map(([l, h]) => (
            <li key={h}><a href={h} className="link-underline hover:text-cream">{l}</a></li>
          ))}
        </ul>
        <ul className="space-y-3 text-sm">
          <li><a href="#" className="link-underline hover:text-cream">Instagram</a></li>
          <li><a href={WHATSAPP} target="_blank" rel="noreferrer" className="link-underline hover:text-cream">WhatsApp</a></li>
        </ul>
      </div>
      <p className="mx-auto max-w-7xl px-5 pb-10 text-xs md:px-10">© Padaria Roma Casa de Pães. Todos os direitos reservados.</p>
    </footer>
  );
}

function WhatsFloat() {
  return (
    <a href={WHATSAPP} target="_blank" rel="noreferrer" aria-label="Falar pelo WhatsApp"
      className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform duration-500 hover:scale-105">
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
