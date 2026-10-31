import { DotGrid } from "./DotGrid";
import { Reveal } from "./motion";

// OPEN ITEM (docs/brief.md): confirm the hello@ mailbox exists (Cloudflare Email Routing).
export const email = "hello@dataalchemist.in";
const city = "New Delhi, Delhi";

export function Contact() {
  return (
    <section
      id="contact"
      className="relative isolate overflow-hidden bg-ink text-on-dark [&_a:focus-visible]:outline-gold"
    >
      <DotGrid className="absolute inset-0 -z-10 size-full" />
      <div
        aria-hidden="true"
        className="absolute -bottom-60 left-1/4 -z-10 size-[640px] rounded-full bg-gold/15 blur-[140px]"
      />
      <Reveal className="mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-end gap-14 px-6 py-20 sm:py-24">
        <div className="flex min-w-0 flex-col gap-5">
          <h2 className="font-serif text-section font-normal">A small team in New Delhi.</h2>
          <p className="max-w-[32em] text-on-dark-muted">
            We build and run our apps ourselves. Write to us about our apps, a partnership or a
            job.
          </p>
        </div>
        <div className="flex min-w-0 flex-col gap-2.5">
          <span className="text-[15px] text-on-dark-muted">Email</span>
          <a
            href={`mailto:${email}`}
            className="inline-flex min-h-11 items-center self-start font-serif text-[clamp(22px,3vw,36px)] text-gold no-underline [overflow-wrap:anywhere] hover:text-on-dark hover:underline"
          >
            {email}
          </a>
          <span className="text-[15px] text-on-dark-muted">{city}</span>
        </div>
      </Reveal>
    </section>
  );
}

const footerLinks = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

export function Footer() {
  return (
    <footer className="bg-ink [&_a:focus-visible]:outline-gold">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-dark-line px-6 pt-4 pb-8 text-sm text-dark-faint">
        <span>© {new Date().getFullYear()} Data Alchemist, New Delhi</span>
        <nav aria-label="Legal" className="-mx-2 flex">
          {footerLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="inline-flex min-h-11 items-center px-2 text-dark-faint no-underline hover:text-on-dark hover:underline"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
