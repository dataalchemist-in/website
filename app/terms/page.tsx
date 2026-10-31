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
        These terms apply when you use dataalchemist.in. By using this website, you agree to them.
      </p>

      <h2>Our apps</h2>
      <p>Each app has its own terms. When you use an app, its terms apply:</p>
      <AppPolicyLinks path="/terms" label="terms" />

      <h2>About this website</h2>
      <p>
        This website tells you about Data Alchemist and our apps. We keep it accurate, but the
        information is general and may change. Apps marked &ldquo;Coming soon&rdquo; are still being
        built, and their features may change before launch.
      </p>

      <h2>Our names and content</h2>
      <p>
        The names Data Alchemist, Bookshaw and Kipsa, our logos, and the text and design of this
        website belong to Data Alchemist. Please ask us before you copy them.
      </p>

      <h2>No warranty</h2>
      <p>
        We provide this website &ldquo;as is&rdquo;. To the extent the law allows, we are not
        responsible for any loss that comes from using it.
      </p>

      <h2>Law</h2>
      <p>These terms follow the laws of India. Courts in New Delhi handle any dispute about them.</p>

      <h2>Changes and questions</h2>
      <p>
        If these terms change, we update the date at the top. Questions? Write to{" "}
        <a href={`mailto:${email}`}>{email}</a>.
      </p>
    </LegalPage>
  );
}
