import type { ReactNode } from "react";
import { Footer } from "./Contact";
import { Header } from "./Header";
import { MotionRoot } from "./motion";

// Every app publishes its own privacy policy and terms at <site>/privacy and <site>/terms.
// Add a new app here and both legal pages list it.
export const appPolicies = [
  { name: "Kipsa", site: "https://kipsa.in" },
  // OPEN ITEM (README.md): add Bookshaw back once bookshaw.in/privacy and /terms are final.
];

/** A list of each app's own policy page, for the privacy and terms pages. */
export function AppPolicyLinks({ path, label }: { path: "/privacy" | "/terms"; label: string }) {
  return (
    <ul>
      {appPolicies.map((app) => (
        <li key={app.name}>
          <a href={`${app.site}${path}`} target="_blank" rel="noopener noreferrer">
            {app.name} {label}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>{" "}
          <span className="text-muted-soft">on {app.site.replace("https://", "")}</span>
        </li>
      ))}
    </ul>
  );
}

/** Layout for the privacy and terms pages: the site header, a readable column, the footer. */
export function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <MotionRoot>
      <Header />
      <main>
        <div className="bg-ink pt-28 text-on-dark sm:pt-32">
          <div className="mx-auto flex max-w-[760px] flex-col gap-3 px-6 pb-12">
            <h1 className="font-serif text-section font-normal">{title}</h1>
            <p className="text-on-dark-muted">Last updated {updated}</p>
          </div>
        </div>
        <article className="mx-auto flex max-w-[760px] flex-col gap-4 px-6 py-14 text-[17px] [&_h2]:mt-6 [&_h2]:font-serif [&_h2]:text-[24px] [&_h2]:font-normal [&_li]:ml-5 [&_li]:list-disc [&_p]:text-muted [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-2 [&_ul]:text-muted">
          {children}
        </article>
      </main>
      <Footer />
    </MotionRoot>
  );
}
