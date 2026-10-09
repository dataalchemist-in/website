import { Logo } from "./Logo";

const inputs = [
  { label: "Printed lists", tilt: "-rotate-2" },
  { label: "Phone calls", tilt: "rotate-[1.5deg]" },
  { label: "Paper registers", tilt: "-rotate-1" },
  { label: "Cash slips", tilt: "rotate-[2.5deg]" },
  { label: "Forwarded messages", tilt: "-rotate-[2.5deg]" },
  { label: "Spreadsheets", tilt: "rotate-1" },
  { label: "Handwritten orders", tilt: "-rotate-[1.5deg]" },
];

export function Hero() {
  return (
    <section
      id="top"
      className="mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(min(100%,440px),1fr))] items-center gap-12 px-6 pt-10 pb-24 sm:gap-16 sm:pt-[72px] sm:pb-28"
    >
      <div className="flex min-w-0 flex-col gap-7">
        <h1 className="font-serif text-display font-normal">We make everyday business simple.</h1>
        <p className="max-w-[34em] text-[20px] text-muted">
          Data Alchemist is a product company from India. We take slow, paper-heavy work and turn it
          into small, clear products that anyone can use in a few taps.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <a
            href="#products"
            className="inline-flex min-h-12 items-center rounded-full bg-ink px-6 font-medium text-ground no-underline hover:bg-verdigris hover:text-ground"
          >
            See our products
          </a>
          <a href="#contact" className="inline-flex min-h-12 items-center px-2 font-medium">
            Get in touch
          </a>
        </div>
      </div>

      <figure
        aria-label="Everyday paperwork becomes simple products"
        className="flex min-w-0 flex-col gap-7 rounded-[28px] border border-line bg-surface p-6 sm:p-9"
      >
        <div className="flex flex-col gap-3.5">
          <span className="text-sm text-muted-soft">How small businesses run today</span>
          <ul className="flex flex-wrap gap-2.5">
            {inputs.map((input) => (
              <li
                key={input.label}
                className={`rounded-lg border border-dashed border-chip-line px-3.5 py-1.5 text-[15px] ${input.tilt}`}
              >
                {input.label}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center gap-4" aria-hidden="true">
          <div className="h-px flex-1 bg-rule" />
          <Logo settle width={90} height={64} />
          <div className="h-px flex-1 bg-rule" />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-gold px-[22px] py-[18px] text-ink">
          <span className="text-lg font-bold">Simple products. A few taps.</span>
          <span className="text-[15px]">Built for the people who use them</span>
        </div>
        <figcaption className="text-sm text-muted-soft">
          Everyday paperwork in, simple products out.
        </figcaption>
      </figure>
    </section>
  );
}
