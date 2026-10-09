// OPEN ITEM (docs/brief.md): confirm the parent flow and the bookshop line with the operator.
const steps = [
  { title: "Choose the school.", detail: "Search by name or area." },
  { title: "Pick the class.", detail: "The full booklist loads, ready to edit." },
  { title: "Pay once.", detail: "The order is packed and delivered home." },
];

export function Products() {
  return (
    <section id="products" className="border-y border-line bg-surface">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-12 px-6 py-20 sm:py-24">
        <h2 className="font-serif text-section font-normal">Products</h2>

        <article className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] gap-10 rounded-[28px] border border-line bg-ground p-6 sm:gap-12 sm:p-10">
          <div className="flex min-w-0 flex-col gap-5">
            <div className="flex flex-wrap items-center gap-3.5">
              <h3 className="font-serif text-4xl/[1.1] font-normal">Bookshaw</h3>
              <span className="inline-flex items-center gap-2 rounded-full bg-live px-3 py-1 text-sm font-medium text-live-ink">
                <span className="size-2 rounded-full bg-verdigris" aria-hidden="true" />
                Live
              </span>
            </div>
            <p className="max-w-[32em] text-[19px]">
              School booklists and stationery, ordered in one go. Parents choose their school and
              class, and Bookshaw puts the whole list in the cart.
            </p>
            <p className="max-w-[32em] text-muted">
              Bookshops get their orders, payments and deliveries in one place, without new hardware
              or training.
            </p>
            <a
              href="https://bookshaw.in"
              className="inline-flex min-h-11 items-center self-start font-medium"
            >
              Visit bookshaw.in
            </a>
          </div>
          <ol aria-label="How a parent orders" className="flex min-w-0 flex-col gap-3.5">
            {steps.map((step, i) => (
              <li
                key={step.title}
                className="flex items-baseline gap-[18px] rounded-2xl bg-surface px-5 py-[18px]"
              >
                <span className="font-serif text-[22px] text-verdigris" aria-hidden="true">
                  {i + 1}
                </span>
                <span>
                  <strong className="font-bold">{step.title}</strong> {step.detail}
                </span>
              </li>
            ))}
          </ol>
        </article>

        <p className="text-muted-soft">
          More products are on the way. Each one does one job for one kind of business.
        </p>
      </div>
    </section>
  );
}
