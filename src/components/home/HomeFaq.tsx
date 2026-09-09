import { useState } from "react";
import { ChevronDown, MessageCircleQuestion } from "lucide-react";
import { Button } from "@/components/ui/KFButton";
import { APP_STORE_URL } from "@/lib/seo";
import { cn } from "@/lib/utils";

const FAQS = [
  {
    q: "What is KitchFlow?",
    a: "KitchFlow is a kitchen operations management app for restaurants and cafés. It combines inventory management, food-waste tracking, staff scheduling, task management and supplier management in one iOS app.",
  },
  {
    q: "Who is KitchFlow designed for?",
    a: "Restaurant managers, cafe owners, catering teams and food-service operators who need day-to-day kitchen ops in one place.",
  },
  {
    q: "Can KitchFlow manage restaurant inventory?",
    a: "Yes. KitchFlow supports stock counts, low-stock alerts, QR receiving and shopping lists built from inventory levels.",
  },
  {
    q: "Can KitchFlow track food waste?",
    a: "Yes. You can log waste by reason, attach cost, and review patterns over time.",
  },
  {
    q: "Does KitchFlow include staff scheduling?",
    a: "Yes. Invite staff by code, manage shifts and keep ownership clear across the team.",
  },
  {
    q: "Is KitchFlow available for iPhone?",
    a: "Yes. KitchFlow is available now on the App Store for iPhone.",
  },
];

export function HomeFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="border-y border-border bg-surface py-20 lg:py-28" id="faq">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-8">
        <div>
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-primary-soft text-primary">
            <MessageCircleQuestion className="h-5 w-5" />
          </span>
          <p className="mt-5 text-sm font-semibold uppercase text-primary">Support</p>
          <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
            Frequently asked questions
          </h2>
          <p className="mt-4 max-w-md leading-relaxed text-muted-foreground">
            Quick answers about KitchFlow, its kitchen tools, and where to download the app.
          </p>
          <p className="mt-7 text-sm text-muted-foreground">
            Ready to get started? Download KitchFlow on the{" "}
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary hover:underline"
            >
              App Store
            </a>
            .
          </p>
        </div>

        <div className="divide-y divide-border border-y border-border">
          {FAQS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={item.q}>
                <Button
                  variant="ghost"
                  className="h-auto min-h-16 w-full justify-between rounded-none px-0 py-5 text-start text-base shadow-none sm:text-lg"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span className="whitespace-normal pe-5 font-semibold">{item.q}</span>
                  <ChevronDown className={cn("h-5 w-5 shrink-0 text-muted-foreground transition-transform", isOpen && "rotate-180 text-primary")} />
                </Button>
                <div
                  id={`faq-answer-${index}`}
                  className={cn("grid transition-all duration-300", isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}
                >
                  <div className="min-h-0 overflow-hidden">
                    <p className="max-w-2xl pb-5 pe-10 leading-relaxed text-muted-foreground">{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <p className="sr-only">
          Download KitchFlow on the{" "}
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary font-medium hover:underline"
          >
            App Store
          </a>
          .
        </p>
      </div>
    </section>
  );
}
