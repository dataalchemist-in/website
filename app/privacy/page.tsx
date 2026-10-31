import type { Metadata } from "next";
import { email } from "@/components/Contact";
import { AppPolicyLinks, LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy | Data Alchemist",
  description: "How Data Alchemist handles your data on dataalchemist.in and in our apps.",
  alternates: { canonical: "/privacy" },
};

// OPEN ITEM (README.md): have this reviewed before relying on it as a legal document.
export default function Privacy() {
  return (
    <LegalPage title="Privacy" updated="31 October 2026">
      <p>
        Data Alchemist makes simple apps for everyday India. This page explains how we handle your
        data on this website, and where to find the privacy policy for each of our apps.
      </p>

      <h2>Our apps</h2>
      <p>
        Each app has its own privacy policy, because each one handles different data. When you use an
        app, its policy applies:
      </p>
      <AppPolicyLinks path="/privacy" label="privacy policy" />

      <h2>This website</h2>
      <p>dataalchemist.in collects nothing that identifies you. It:</p>
      <ul>
        <li>has no sign-up, login or forms,</li>
        <li>sets no cookies,</li>
        <li>uses no analytics or advertising trackers,</li>
        <li>loads its fonts from our own server, not from a third party.</li>
      </ul>

      <h2>Hosting</h2>
      <p>
        Cloudflare hosts this website. Like any web host, Cloudflare processes basic technical data,
        such as your IP address and browser type, to deliver the page and protect it from attacks. We
        do not use this data to identify you.
      </p>

      <h2>When you email us</h2>
      <p>
        If you write to {email}, we receive your email address and your message. We use them only to
        reply to you. We do not share them or add you to any mailing list.
      </p>

      <h2>Changes and questions</h2>
      <p>
        If this page changes, we update the date at the top. Questions about your privacy? Write to{" "}
        <a href={`mailto:${email}`}>{email}</a>.
      </p>
    </LegalPage>
  );
}
