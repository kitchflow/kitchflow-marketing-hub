import { Link } from "@tanstack/react-router";
import { Instagram, Linkedin, Twitter } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Logo } from "@/components/ui/Logo";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { APP_STORE_URL } from "@/lib/seo";

export function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border bg-background mt-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Logo />
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              {t("footer.tagline")}
            </p>
            <p className="mt-3 text-xs text-muted-foreground">
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors underline underline-offset-2"
              >
                {t("footer.available")}
              </a>
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Links</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-foreground transition-colors">About</Link></li>
              <li><a href="/restaurant-inventory-management" className="hover:text-foreground transition-colors">Inventory</a></li>
              <li><a href="/restaurant-food-waste-management" className="hover:text-foreground transition-colors">Waste</a></li>
              <li><a href="/restaurant-staff-scheduling" className="hover:text-foreground transition-colors">Staff</a></li>
              <li><a href="/kitchen-task-management" className="hover:text-foreground transition-colors">Tasks</a></li>
              <li><Link to="/blog" className="hover:text-foreground transition-colors">{t("nav.blog")}</Link></li>
              <li><Link to="/contact" className="hover:text-foreground transition-colors">{t("nav.contact")}</Link></li>
              <li><Link to="/privacy" className="hover:text-foreground transition-colors">{t("footer.privacy")}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Connect</h4>
            <div className="flex gap-3 mb-5">
              {[Instagram, Linkedin, Twitter].map((Icon, i) => (
                <a key={i} href="#" aria-label="social" className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-border hover:border-foreground/40 hover:bg-muted transition-all">
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
            <LanguageSwitcher />
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {year} KitchFlow. {t("footer.rights")}</p>
          <p>Made with care 🌿</p>
        </div>
      </div>
    </footer>
  );
}
