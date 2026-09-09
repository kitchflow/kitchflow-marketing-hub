import { APP_STORE_URL } from "@/lib/seo";

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
  return (
    <section className="py-20 lg:py-28" id="faq">
      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-center">
          Frequently asked questions
        </h2>
        <dl className="mt-12 space-y-8">
          {FAQS.map((item) => (
            <div key={item.q}>
              <dt className="text-lg font-semibold">{item.q}</dt>
              <dd className="mt-2 text-muted-foreground leading-relaxed">{item.a}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-10 text-center text-sm text-muted-foreground">
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
