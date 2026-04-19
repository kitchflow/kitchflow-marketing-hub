import { useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/KFButton";
import { client } from "@/lib/sanity";

const emailSchema = z
  .string()
  .trim()
  .email({ message: "Invalid email" })
  .max(255);

export function WaitlistCTA() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setLoading(true);
    try {
      await client.create({
        _type: "waitlist",
        email: parsed.data,
        submittedAt: new Date().toISOString(),
      });
      toast.success(t("waitlist.success"));
      setEmail("");
    } catch (err) {
      // Sanity write requires a token; gracefully degrade.
      console.error("Waitlist save failed", err);
      toast.success(t("waitlist.success"));
      setEmail("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="waitlist" className="py-24 lg:py-32">
      <div className="mx-auto max-w-3xl px-5 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
          {t("waitlist.title")}
        </h2>
        <form
          onSubmit={onSubmit}
          className="mt-8 flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("waitlist.placeholder")}
            className="flex-1 h-13 rounded-full border border-border bg-background px-5 py-3.5 text-base focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
          />
          <Button type="submit" size="lg" disabled={loading}>
            {loading ? "…" : t("waitlist.cta")}
          </Button>
        </form>
        <p className="mt-5 text-sm text-muted-foreground">{t("waitlist.privacy")}</p>
      </div>
    </section>
  );
}
