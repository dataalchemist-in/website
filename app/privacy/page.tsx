import type { Metadata } from "next";
import { email } from "@/components/Contact";
import { AppPolicyLinks, LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy | Data Alchemist",
  description: "How Data Alchemist handles your data on dataalchemist.in, and where to find each app's policy.",
  alternates: { canonical: "/privacy" },
};

// OPEN ITEM (README.md): have this reviewed before relying on it as a legal document.
export default function Privacy() {
  return (
    <LegalPage title="Privacy" updated="31 October 2026">
      <p>
        {/* OPEN ITEM (README.md): add a postal address here if the operator wants one published. */}
        Data Alchemist is the trading name of Nitesh Singla, a sole proprietor based in New Delhi,
        India. We make simple apps for everyday India. This page explains how we handle your
        data on this website, and where to find the privacy policy for each of our apps.
      </p>

      <h2>Our apps</h2>
      <p>
        Each app has its own privacy policy, because each one handles different data. When you use an
        app, its policy applies:
      </p>
      <AppPolicyLinks path="/privacy" label="privacy policy" />

      <h2>This website</h2>
      <p>We do not collect your personal data on dataalchemist.in. The website:</p>
      <ul>
        <li>has no sign-up, login or forms,</li>
        <li>sets no cookies of our own (Cloudflare may set a short-lived security cookie if it checks for suspicious traffic),</li>
        <li>uses no analytics or advertising trackers,</li>
        <li>loads its fonts from our own server, not from a third party.</li>
      </ul>

      <h2>Hosting</h2>
      <p>
        Cloudflare hosts this website. Like any web host, Cloudflare processes basic technical data,
        such as your IP address and browser type, to deliver the page and protect it from attacks. We
        do not use this data to identify you. Cloudflare&apos;s servers are inside and outside India,
        and Cloudflare keeps this data under its own privacy policy.
      </p>

      <h2>When you email us</h2>
      <p>
        If you write to {email}, we receive your email address and your message. We use them only to
        reply to you. We do not share them or add you to any mailing list. We keep your email for as
        long as we need it to deal with your message, then delete it. Our mail passes through
        Cloudflare Email Routing and a mailbox provider, so it may be processed outside India.
      </p>

      <h2>Changes and questions</h2>
      <p>
        If this page changes, we update the date at the top. For questions or complaints about your
        data, write to <a href={`mailto:${email}`}>{email}</a>. Nitesh Singla answers them and replies
        within 30 days. If you are not satisfied, you may complain to the Data Protection Board of
        India.
      </p>
    </LegalPage>
  );
}
