// Not numbered: these are principles, not a sequence.
const principles = [
  {
    title: "Fewest steps",
    body: "Every screen has to save the user a step. If it does not, we cut it.",
  },
  {
    title: "No waiting",
    body: "Anything you do not need to see right away happens in the background, so the app answers at once.",
  },
  {
    title: "Product first",
    body: "We spend our time on features people use today, not on technology for its own sake.",
  },
];

export function HowWeBuild() {
  return (
    <section
      id="how"
      className="mx-auto flex max-w-[1200px] flex-col gap-12 px-6 py-20 sm:py-24"
    >
      <h2 className="font-serif text-section font-normal">How we build</h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-10">
        {principles.map((p) => (
          <div key={p.title} className="flex min-w-0 flex-col gap-3 border-t-2 border-ink pt-6">
            <h3 className="text-[21px] font-bold">{p.title}</h3>
            <p className="text-muted">{p.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
