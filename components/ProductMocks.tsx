"use client";

import { motion } from "motion/react";
import { Appear, ScreenTitle, Search, Tap, Typed, Workflow, type WorkflowStep } from "./Workflow";

// Animated walkthroughs for the product rows. Sample data only: the school, names and amounts are made up.

const Lock = ({ open = false, className = "size-4" }: { open?: boolean; className?: string }) => (
  <svg aria-hidden="true" viewBox="0 0 24 24" className={`fill-none stroke-current stroke-2 ${className}`}>
    <rect x="5" y="11" width="14" height="10" rx="2" />
    <path d={open ? "M8 11V8a4 4 0 0 1 7.5-2" : "M8 11V8a4 4 0 0 1 8 0v3"} />
  </svg>
);

const Check = ({ className = "size-3" }: { className?: string }) => (
  <svg aria-hidden="true" viewBox="0 0 24 24" className={`fill-none stroke-current stroke-[3] ${className}`}>
    <path d="m5 12 5 5 9-10" />
  </svg>
);

/* Bookshaw: find the school, pick the class, see the list, buy in one click. */

const classes = ["Nursery", "KG", "Class 1", "Class 2", "Class 3", "Class 4", "Class 5", "Class 6", "Class 7"];
const books = ["English reader", "Maths textbook", "Hindi workbook", "Notebooks x 6"];

const bookshawSteps: WorkflowStep[] = [
  {
    caption: "Find the school",
    ms: 3400,
    screen: (
      <>
        <ScreenTitle sub="Delhi">Find your school</ScreenTitle>
        <Search text="Green Valley" />
        <Appear delay={1.5} className="relative overflow-hidden rounded-xl border border-verdigris bg-live px-3 py-2.5">
          <div className="font-bold">Green Valley Public School</div>
          <div className="text-[13px] text-muted">Rohini, Delhi</div>
          <Tap delay={2.4} />
        </Appear>
        <Appear delay={1.65} className="rounded-xl border border-line px-3 py-2.5 opacity-60">
          <div className="font-bold">Green Valley Academy</div>
          <div className="text-[13px] text-muted">Pitampura, Delhi</div>
        </Appear>
      </>
    ),
  },
  {
    caption: "Pick the class",
    ms: 2800,
    screen: (
      <>
        <ScreenTitle sub="Green Valley Public School">Pick the class</ScreenTitle>
        <div className="grid grid-cols-3 gap-2">
          {classes.map((c, i) => (
            <motion.div
              key={c}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={
                c === "Class 5"
                  ? { opacity: 1, scale: [0.9, 1, 1, 0.94, 1], backgroundColor: ["#f7f8f5", "#f7f8f5", "#f7f8f5", "#13221f", "#13221f"], color: ["#13221f", "#13221f", "#13221f", "#e8eeea", "#e8eeea"] }
                  : { opacity: 1, scale: 1 }
              }
              transition={c === "Class 5" ? { duration: 1.6, times: [0, 0.2, 0.6, 0.75, 1] } : { delay: i * 0.04 }}
              className="relative rounded-xl border border-line bg-surface py-2.5 text-center text-[12px] font-medium"
            >
              {c}
            </motion.div>
          ))}
        </div>
      </>
    ),
  },
  {
    caption: "See the full list",
    ms: 3600,
    screen: (
      <>
        <ScreenTitle sub="Green Valley Public School">Class 5 booklist</ScreenTitle>
        <ul className="flex flex-col divide-y divide-line rounded-xl border border-line bg-ground px-3">
          {books.map((b, i) => (
            <Appear key={b} delay={0.2 + i * 0.18} className="flex items-center justify-between gap-2 py-2">
              {b}
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 16, delay: 0.45 + i * 0.18 }}
                className="grid size-5 place-items-center rounded-full bg-verdigris text-on-dark"
              >
                <Check />
              </motion.span>
            </Appear>
          ))}
        </ul>
        <Appear delay={1.3} className="text-[13px] text-muted-soft">
          and 10 more, 14 items in all
        </Appear>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0, scale: [1, 1, 0.95, 1] }}
          transition={{ delay: 1.5, duration: 1.6, times: [0, 0.6, 0.8, 1] }}
          className="relative mt-auto rounded-full bg-gold py-3 text-center font-bold"
        >
          Buy all in one click
          <Tap delay={2.6} />
        </motion.div>
      </>
    ),
  },
  {
    caption: "Buy in one click",
    ms: 2600,
    screen: (
      <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
        <motion.span
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 14 }}
          className="grid size-16 place-items-center rounded-full bg-verdigris text-on-dark"
        >
          <Check className="size-8" />
        </motion.span>
        <Appear delay={0.3}>
          <span className="font-serif text-[22px]">Order placed</span>
        </Appear>
        <Appear delay={0.5} className="text-muted">
          All 14 items, delivered to your door.
        </Appear>
      </div>
    ),
  },
];

export function BookshawMock() {
  return <Workflow label="Animated walkthrough of ordering on Bookshaw" steps={bookshawSteps} />;
}

/* Kipsa: unlock with the PIN, record a payment you made, find it, share proof once. */

const payments = [
  { to: "Ramesh", amount: "₹2,000", when: "2 Nov", match: true },
  { to: "Sunita", amount: "₹1,500", when: "30 Oct", match: false },
  { to: "Ramesh", amount: "₹800", when: "21 Oct", match: true },
  { to: "Milk supplier", amount: "₹450", when: "18 Oct", match: false },
  { to: "Ajay", amount: "₹1,200", when: "12 Oct", match: false },
];

const kipsaSteps: WorkflowStep[] = [
  {
    caption: "Unlock with your PIN",
    ms: 3000,
    screen: (
      <div className="flex flex-1 flex-col items-center justify-center gap-6 text-center">
        <motion.span
          className="grid size-14 place-items-center rounded-2xl bg-ink text-gold"
          animate={{ scale: [1, 1, 1.12, 1] }}
          transition={{ duration: 2.4, times: [0, 0.8, 0.9, 1] }}
        >
          <Lock className="size-6" />
        </motion.span>
        <span className="font-serif text-[19px]">Enter your PIN</span>
        <div className="flex gap-3">
          {Array.from({ length: 6 }, (_, i) => (
            <motion.span
              key={i}
              className="size-3.5 rounded-full border-2 border-ink"
              initial={{ backgroundColor: "rgba(19,34,31,0)" }}
              animate={{ backgroundColor: "rgba(19,34,31,1)" }}
              transition={{ delay: 0.3 + i * 0.25, duration: 0.1 }}
            />
          ))}
        </div>
        <Appear delay={2} className="inline-flex items-center gap-1.5 text-verdigris">
          <Lock open /> Unlocked on this phone
        </Appear>
      </div>
    ),
  },
  {
    caption: "Record a payment",
    ms: 3800,
    screen: (
      <>
        <ScreenTitle>New payment</ScreenTitle>
        <div className="flex rounded-full bg-ground p-1 text-center text-[12px] font-medium">
          <span className="flex-1 rounded-full bg-ink py-1.5 text-on-dark">I paid</span>
          <span className="flex-1 py-1.5 text-muted">I received</span>
        </div>
        <div className="flex flex-col items-center gap-0.5 py-1">
          <span className="font-serif text-[30px]/[1.1]">
            ₹<Typed text="2,000" delay={0.3} speed={0.12} />
          </span>
          <Appear delay={1.0} className="text-muted">
            to <span className="font-bold text-ink">Ramesh</span> by UPI
          </Appear>
        </div>
        <Appear delay={1.5} className="flex items-center gap-3 rounded-xl border border-line bg-ground px-3 py-2">
          <span className="flex h-10 w-8 flex-col gap-1 rounded bg-ink/10 p-1.5" aria-hidden="true">
            <span className="h-1 w-full rounded bg-ink/30" />
            <span className="h-1 w-3/4 rounded bg-ink/20" />
            <span className="h-1 w-1/2 rounded bg-ink/20" />
          </span>
          <span className="flex flex-col">
            <span>UPI screenshot</span>
            <span className="text-[12px] text-muted-soft">Attached as proof</span>
          </span>
        </Appear>
        <Appear delay={2.3} className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-full bg-ink py-3 font-medium text-on-dark">
          <span className="text-gold">
            <Lock />
          </span>
          Saved and encrypted
        </Appear>
      </>
    ),
  },
  {
    caption: "Find it in seconds",
    ms: 3400,
    screen: (
      <>
        <ScreenTitle>Payments</ScreenTitle>
        <Search text="Ramesh" delay={0.3} />
        <ul className="flex flex-col">
          {payments.map((p, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 1, height: 36 }}
              animate={p.match ? { backgroundColor: ["rgba(220,233,228,0)", "rgba(220,233,228,1)"] } : { opacity: 0, height: 0 }}
              transition={{ delay: 1.2, duration: 0.45 }}
              className="flex items-center justify-between overflow-hidden rounded-lg px-2"
            >
              <span>
                Paid {p.amount} to {p.to}
              </span>
              <span className="text-[12px] text-muted-soft">{p.when}</span>
            </motion.li>
          ))}
        </ul>
        <Appear delay={1.8} className="rounded-xl bg-ink px-3 py-2.5 text-on-dark">
          You paid Ramesh <span className="font-bold text-gold">₹2,800</span> in all
        </Appear>
      </>
    ),
  },
  {
    caption: "Share proof once",
    ms: 6000,
    screen: (
      <>
        <ScreenTitle sub="2 Nov, by UPI">Paid ₹2,000 to Ramesh</ScreenTitle>
        <div className="flex items-center gap-3 rounded-xl border border-line bg-ground px-3 py-2.5">
          <span className="flex h-10 w-8 flex-col gap-1 rounded bg-ink/10 p-1.5" aria-hidden="true">
            <span className="h-1 w-full rounded bg-ink/30" />
            <span className="h-1 w-3/4 rounded bg-ink/20" />
          </span>
          UPI screenshot
        </div>
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1, 0.95, 1] }}
          transition={{ duration: 1, times: [0, 0.6, 0.8, 1] }}
          className="relative rounded-full bg-gold py-3 text-center font-bold"
        >
          Share proof
          <Tap delay={0.7} />
        </motion.div>
        <Appear delay={1.2} className="flex flex-col gap-1 rounded-xl bg-ink px-3 py-3 text-on-dark">
          <span className="inline-flex items-center gap-1.5 font-medium">
            <span className="text-gold">
              <Lock />
            </span>
            Link ready for Ramesh
          </span>
          <span className="text-[12px] text-on-dark-muted">Opens once. Expires in 24 hours.</span>
        </Appear>
        <Appear delay={2.2} className="mt-auto text-center text-[12px] text-muted-soft">
          He sees this one payment. Nothing else.
        </Appear>
      </>
    ),
  },
];

export function KipsaMock() {
  return <Workflow label="Animated walkthrough of recording a payment in Kipsa" steps={kipsaSteps} />;
}
