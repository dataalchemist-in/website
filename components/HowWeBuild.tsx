import { Reveal, SpotlightCard } from "./motion";
import { FastVisual, PrivateVisual, SimpleVisual, TapsVisual } from "./RuleVisuals";

// Not numbered: these are rules we hold, not a sequence.
const rules = [
  {
    title: "Three taps or less",
    body: "If a job takes more than three taps, we go back and redesign it.",
    visual: <TapsVisual />,
  },
  {
    title: "If Mummy can't use it, we don't ship it",
    body: "Plain words, big buttons, no jargon. We build for people who don't love apps.",
    visual: <SimpleVisual />,
  },
  {
    title: "Your data is yours",
    body: "We collect only what the app needs. Your private records are end-to-end encrypted, so only you can read them.",
    visual: <PrivateVisual />,
  },
  {
    title: "Fast on any phone",
    body: "Made for budget phones and patchy networks. The app answers at once, and the rest happens in the background.",
    visual: <FastVisual />,
  },
];

export function HowWeBuild() {
  return (
    <section
      id="how"
      className="mx-auto grid max-w-[1200px] gap-10 px-6 py-20 sm:py-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-14"
    >
      <Reveal className="flex flex-col gap-4 lg:sticky lg:top-28 lg:self-start">
        <span className="text-[15px] font-medium text-verdigris">How we build</span>
        <h2 className="font-serif text-section font-normal">Four rules we don&apos;t break.</h2>
        <p className="max-w-[24em] text-[18px] text-muted">
          Every app we make has to pass these four tests before it reaches your phone.
        </p>
      </Reveal>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-4">
        {rules.map((r, i) => (
          <Reveal key={r.title} delay={i * 0.08} className="h-full">
            <SpotlightCard
              className="h-full rounded-[24px] border border-line bg-surface p-2.5 transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-30px_rgba(19,34,31,0.45)]"
              glow="rgba(46, 107, 94, 0.14)"
            >
              <div className="flex h-full flex-col gap-2">
                {r.visual}
                <div className="flex flex-col gap-1.5 px-3 pt-2 pb-3">
                  <h3 className="text-[19px]/[1.25] font-bold text-balance">{r.title}</h3>
                  <p className="text-[15px] text-muted">{r.body}</p>
                </div>
              </div>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
