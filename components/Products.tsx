import type { ReactNode } from "react";
import { Carousel } from "./Carousel";
import { Reveal, SpotlightCard } from "./motion";
import { BookshawMock, KipsaMock } from "./ProductMocks";

// OPEN ITEM (docs/brief.md): both products are under development. Add a "Live" chip back when each launches.
const apps = [
  {
    name: "Kipsa",
    tagline: "Receipts and bills, safe and easy to find.",
    problem:
      "Receipts and bills end up in a drawer, a chat or your phone gallery. Finding one later is hard. Deleting it for good is harder. And anyone who opens your phone can see them.",
    fix: "Kipsa keeps all your receipts, bills and payments in one place. Find any of them in seconds, and delete them for good when you want. Everything is locked with your PIN before it leaves your phone, so only you can read it. Not even our team.",
    points: [
      "End-to-end encrypted with your own PIN",
      "Search in seconds, delete for good",
      "A generous free plan",
    ],
    pointsLabel: "Why Kipsa",
    numbered: false,
    note: undefined,
    href: "https://kipsa.in",
    link: "Visit kipsa.in",
    mock: <KipsaMock />,
  },
  {
    name: "Bookshaw",
    tagline: "Every book for the class, in one click.",
    problem:
      "Only a few shops sell your school's books, so there are no discounts. Every new session, parents stand in long queues, and often go back because a book is out of stock.",
    fix: "Pick your child's school and class, and buy the whole booklist in one click. Many bookshops sell on Bookshaw, so you get better prices, and everything is delivered home. No queues.",
    points: ["Find the school", "Pick the class", "Buy in one click"],
    pointsLabel: "How a parent orders",
    numbered: true,
    note: "Run a bookshop? List your stock against school booklists and handle orders, dispatch and payouts in one place.",
    href: "https://bookshaw.in",
    link: "Visit bookshaw.in",
    mock: <BookshawMock />,
  },
];

const Icon = ({ path }: { path: string }) => (
  <svg aria-hidden="true" viewBox="0 0 24 24" className="size-3.5 fill-none stroke-current stroke-[3]">
    <path d={path} />
  </svg>
);
const CROSS = "M6 6l12 12M18 6 6 18";
const TICK = "m5 12 5 5 9-10";

function Block({ kind, children }: { kind: "problem" | "fix"; children: ReactNode }) {
  const fix = kind === "fix";
  return (
    <div
      className={`flex gap-3 rounded-2xl border p-4 ${
        fix ? "border-verdigris/25 bg-live/60" : "border-line bg-surface/70"
      }`}
    >
      <span
        className={`mt-0.5 grid size-6 shrink-0 place-items-center rounded-full ${
          fix ? "bg-verdigris text-on-dark" : "bg-danger/10 text-danger"
        }`}
      >
        <Icon path={fix ? TICK : CROSS} />
      </span>
      <div className="flex min-w-0 flex-col gap-1">
        <span className={`text-[13px] font-bold ${fix ? "text-verdigris" : "text-danger"}`}>
          {fix ? "What we built" : "The problem"}
        </span>
        <p className={fix ? "text-ink" : "text-muted"}>{children}</p>
      </div>
    </div>
  );
}

export function Products() {
  return (
    <section id="products" className="relative isolate border-b border-line bg-surface">
      <div aria-hidden="true" className="bg-dots absolute inset-0 -z-10" />
      <div className="mx-auto flex max-w-[1200px] flex-col gap-6 px-6 py-12 sm:py-14">
        <Reveal className="flex flex-col gap-2">
          <span className="text-[15px] font-medium text-verdigris">Our apps</span>
          <h2 className="font-serif text-[clamp(28px,3.2vw,40px)]/[1.1] font-normal tracking-[-0.02em]">
            Two everyday problems. Two simple apps.
          </h2>
        </Reveal>

        <Reveal>
          <Carousel label="Our apps" names={apps.map((a) => a.name)}>
            {apps.map((app, index) => (
              <SpotlightCard
                key={app.name}
                className="w-full rounded-[32px] border border-line bg-ground shadow-[0_1px_0_rgba(255,255,255,0.8)_inset,0_30px_60px_-40px_rgba(19,34,31,0.45)]"
                glow={index ? "rgba(212, 161, 42, 0.14)" : "rgba(46, 107, 94, 0.16)"}
              >
                <article className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-stretch gap-2 p-2">
                  <div
                    className={`flex min-w-0 flex-col gap-4 p-5 text-[15px]/[1.55] sm:p-7 ${index % 2 ? "lg:order-2" : ""}`}
                  >
                    <header className="flex flex-col gap-1.5">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="font-serif text-[clamp(30px,3.4vw,40px)]/[1.05] font-normal">
                          {app.name}
                        </h3>
                        <span className="inline-flex items-center gap-2 rounded-full border border-dashed border-chip-line px-3 py-0.5 text-[13px] font-medium text-muted">
                          <span className="size-1.5 rounded-full bg-gold" aria-hidden="true" />
                          Coming soon
                        </span>
                      </div>
                      <p className="text-[19px]/[1.35] font-medium text-balance">{app.tagline}</p>
                    </header>

                    <div className="flex flex-col gap-2.5">
                      <Block kind="problem">{app.problem}</Block>
                      <Block kind="fix">{app.fix}</Block>
                    </div>

                    <ol
                      aria-label={app.pointsLabel}
                      className="flex flex-wrap gap-x-5 gap-y-1.5 text-[14px] font-medium"
                    >
                      {app.points.map((point, i) => (
                        <li key={point} className="inline-flex items-center gap-1.5">
                          {app.numbered ? (
                            <span
                              className="grid size-5 place-items-center rounded-full bg-ink font-serif text-[11px] text-on-dark"
                              aria-hidden="true"
                            >
                              {i + 1}
                            </span>
                          ) : (
                            <span className="text-verdigris">
                              <Icon path={TICK} />
                            </span>
                          )}
                          {point}
                        </li>
                      ))}
                    </ol>

                    <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-1">
                      <a
                        href={app.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/link inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-5 font-medium text-on-dark no-underline transition hover:bg-verdigris hover:text-on-dark"
                      >
                        {app.link}
                        <span className="sr-only">(opens in a new tab)</span>
                        <span
                          aria-hidden="true"
                          className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                        >
                          ↗
                        </span>
                      </a>
                      {app.note && <p className="min-w-0 flex-1 basis-56 text-[13px] text-muted">{app.note}</p>}
                    </div>
                  </div>

                  <div className="relative isolate flex min-w-0 items-center justify-center overflow-hidden rounded-[26px] bg-ink px-5 py-6 sm:px-8">
                    <div aria-hidden="true" className="bg-dots-dark absolute inset-0 -z-10" />
                    <div
                      aria-hidden="true"
                      className={`absolute -z-10 size-[420px] rounded-full blur-[110px] ${
                        index ? "-top-40 -right-24 bg-gold/25" : "-bottom-40 -left-24 bg-verdigris/50"
                      }`}
                    />
                    <div className="w-full max-w-[400px]">{app.mock}</div>
                  </div>
                </article>
              </SpotlightCard>
            ))}
          </Carousel>
        </Reveal>
      </div>
    </section>
  );
}
