import Link from "next/link";
import { Logo } from "./Logo";

// Paths start with "/" so the links also work from the privacy and terms pages.
const links = [
  { href: "/#products", label: "Products" },
  { href: "/#how", label: "How we build" },
];

// Logo on the left, links centred, "Get in touch" on the right. Phones show the logo and the button only.
export function Header() {
  return (
    <header className="sticky top-0 z-50 -mb-20 px-3 pt-3 sm:px-6 sm:pt-4">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-x-2 rounded-full border border-white/10 bg-ink/90 py-1.5 pr-1.5 pl-4 text-on-dark shadow-[0_8px_32px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:grid sm:grid-cols-[1fr_auto_1fr] sm:rounded-full sm:pl-5 [&_a:focus-visible]:outline-gold">
        <Link
          href="/#top"
          className="flex min-h-11 items-center min-w-0 gap-2 justify-self-start sm:gap-2.5 text-on-dark no-underline hover:text-on-dark"
        >
          <Logo variant="dark" settle width={40} height={29} />
          <span className="font-serif text-[17px] tracking-[-0.01em] whitespace-nowrap sm:text-[19px]">Data Alchemist</span>
        </Link>
        <nav
          aria-label="Main"
          className="hidden items-center justify-center gap-3 text-[15px] lg:gap-6 font-medium sm:flex"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="inline-flex min-h-11 items-center rounded-full px-3.5 text-on-dark-muted no-underline transition-colors hover:bg-white/10 hover:text-on-dark"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/#contact"
          className="inline-flex min-h-11 shrink-0 items-center gap-1.5 justify-self-end rounded-full bg-on-dark px-3.5 text-[14px] whitespace-nowrap sm:px-5 sm:text-[15px] font-medium text-ink no-underline transition hover:bg-white hover:text-ink"
        >
          Get in touch
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </header>
  );
}
