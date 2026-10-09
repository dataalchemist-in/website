// OPEN ITEM (docs/brief.md): confirm the hello@ mailbox exists (Cloudflare Email Routing).
const email = "hello@dataalchemist.in";
const city = "New Delhi, Delhi";

export function Contact() {
  return (
    <section id="contact" className="bg-ink text-on-dark [&_a:focus-visible]:outline-gold">
      <div className="mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-end gap-14 px-6 py-20 sm:py-24">
        <div className="flex min-w-0 flex-col gap-5">
          <h2 className="font-serif text-section font-normal">A small product company in India.</h2>
          <p className="max-w-[32em] text-on-dark-muted">
            We build, run and support our products ourselves. Write to us about a product, a
            partnership or a job.
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
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-ink">
      <div className="mx-auto flex max-w-[1200px] flex-wrap justify-between gap-3 border-t border-dark-line px-6 pt-6 pb-10 text-sm text-dark-faint">
        <span>© {new Date().getFullYear()} Data Alchemist</span>
        <span>dataalchemist.in</span>
      </div>
    </footer>
  );
}
