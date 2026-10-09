import { Logo } from "./Logo";

const links = [
  { href: "#products", label: "Products" },
  { href: "#how", label: "How we build" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-x-4 gap-y-2 px-6 py-6 sm:py-7">
      <a
        href="#top"
        className="flex min-h-11 items-center gap-3 text-ink no-underline hover:text-ink"
      >
        <Logo />
        <span className="font-serif text-[22px] tracking-[-0.01em]">Data Alchemist</span>
      </a>
      <nav aria-label="Main" className="-mx-2 flex flex-wrap text-[15px] font-medium sm:gap-x-3">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="inline-flex min-h-11 items-center px-2 no-underline"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
