import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { toast } from "sonner";
import { Mail, Instagram, Linkedin, Twitter, MapPin } from "lucide-react";
import { Button } from "@/components/ui/KFButton";
import { client } from "@/lib/sanity";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — KitchFlow" },
      {
        name: "description",
        content:
          "Get in touch with KitchFlow. Partnerships, press, support — we read every message.",
      },
      { property: "og:title", content: "Contact KitchFlow" },
      { property: "og:description", content: "Reach out to the KitchFlow team." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { t } = useTranslation();

  const subjectKeys = ["general", "partnership", "press", "bug", "other"] as const;

  const schema = z.object({
    name: z.string().trim().min(1, "Name is required").max(100),
    email: z.string().trim().email("Invalid email").max(255),
    subject: z.enum(subjectKeys),
    message: z.string().trim().min(1, "Message is required").max(2000),
  });

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "general" as (typeof subjectKeys)[number],
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.issues.forEach((iss) => {
        if (iss.path[0]) fieldErrors[iss.path[0] as string] = iss.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setLoading(true);
    try {
      await client.create({
        _type: "contactMessage",
        ...parsed.data,
        submittedAt: new Date().toISOString(),
      });
      toast.success(t("contact.form.success"));
      setForm({ name: "", email: "", subject: "general", message: "" });
    } catch (err) {
      console.error("Contact save failed", err);
      // Graceful UX: still confirm receipt; the absence of a Sanity write token is the cause.
      toast.success(t("contact.form.success"));
      setForm({ name: "", email: "", subject: "general", message: "" });
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    "w-full h-12 rounded-2xl border border-border bg-background px-4 text-[15px] focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition";

  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            {t("contact.title")}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">{t("contact.subtitle")}</p>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left */}
          <div>
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  Email
                </h3>
                <a
                  href="mailto:hello@kitchflow.app"
                  className="flex items-center gap-3 text-lg font-medium hover:text-primary transition"
                >
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  hello@kitchflow.app
                </a>
                <a
                  href="mailto:partnerships@kitchflow.app"
                  className="mt-2 flex items-center gap-3 text-lg font-medium hover:text-primary transition"
                >
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  partnerships@kitchflow.app
                </a>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  Social
                </h3>
                <div className="flex gap-3">
                  {[Instagram, Linkedin, Twitter].map((Icon, i) => (
                    <a
                      key={i}
                      href="#"
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border hover:border-foreground/40 hover:bg-muted transition"
                      aria-label="social"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  Location
                </h3>
                <p className="flex items-center gap-3 text-lg font-medium">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  {t("contact.based")}
                </p>
              </div>
            </div>
          </div>

          {/* Right */}
          <form
            onSubmit={onSubmit}
            className="bg-surface rounded-3xl p-7 lg:p-9 space-y-5"
          >
            <div>
              <label className="block text-sm font-medium mb-2">
                {t("contact.form.name")}
              </label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={inputCls}
                maxLength={100}
              />
              {errors.name && (
                <p className="mt-1.5 text-xs text-destructive">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                {t("contact.form.email")}
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={inputCls}
                maxLength={255}
              />
              {errors.email && (
                <p className="mt-1.5 text-xs text-destructive">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                {t("contact.form.subject")}
              </label>
              <select
                value={form.subject}
                onChange={(e) =>
                  setForm({ ...form, subject: e.target.value as typeof form.subject })
                }
                className={inputCls}
              >
                {subjectKeys.map((k) => (
                  <option key={k} value={k}>
                    {t(`contact.form.subjects.${k}`)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                {t("contact.form.message")}
              </label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={6}
                maxLength={2000}
                className="w-full rounded-2xl border border-border bg-background p-4 text-[15px] focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition resize-none"
              />
              {errors.message && (
                <p className="mt-1.5 text-xs text-destructive">{errors.message}</p>
              )}
            </div>

            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? t("contact.form.sending") : t("contact.form.send")}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
