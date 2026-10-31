import type { Metadata } from "next";
import { email } from "@/components/Contact";
import { AppPolicyLinks, LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms | Data Alchemist",
  description: "The terms for using dataalchemist.in and where to find each app's terms.",
  alternates: { canonical: "/terms" },
};

// OPEN ITEM (README.md): have this reviewed before relying on it as a legal document.
export default function Terms() {
  return (
    <LegalPage title="Terms" updated="31 October 2026">
      <p>
        Data Alchemist is the trading name of Nitesh Singla, a sole proprietor based in New Delhi,
        India. These terms apply when you use dataalchemist.in. By using this website, you agree to them.
      </p>

      <h2>Our apps</h2>
      <p>
        Each app has its own terms, published on the app&apos;s own website before the app launches.
        When you use an app, its terms apply.
      </p>
      <AppPolicyLinks path="/terms" label="terms" />

      <h2>About this website</h2>
      <p>
        This website tells you about Data Alchemist and our apps. We try to keep it accurate, but the
        information is general and may change without notice. Apps marked &ldquo;Coming soon&rdquo; are still being
        built, and their features may change before launch.
      </p>

      <h2>Our content</h2>
      <p>
        We made the text, pictures and design of this website. Please ask us before you copy them.
      </p>

      <h2>No warranty</h2>
      <p>
        We provide this website &ldquo;as is&rdquo;, without any warranty. To the extent Indian law
        allows, we are not liable for any loss that comes from using it or relying on it.
      </p>

      <h2>Law</h2>
      <p>
        Indian law governs these terms. Courts in New Delhi have jurisdiction over any dispute,
        subject to any rights you have under Indian consumer law.
      </p>

      <h2>Changes and questions</h2>
      <p>
        If these terms change, we update the date at the top. Questions? Write to{" "}
        <a href={`mailto:${email}`}>{email}</a>.
      </p>
    </LegalPage>
  );
}
