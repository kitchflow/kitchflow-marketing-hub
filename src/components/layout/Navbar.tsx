import { useEffect, useRef, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  ChevronDown,
  CheckSquare,
  Menu,
  Package,
  Recycle,
  ShoppingCart,
  Users,
  X,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/KFButton";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { Logo } from "@/components/ui/Logo";
import { APP_STORE_URL } from "@/lib/seo";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [mobileFeaturesOpen, setMobileFeaturesOpen] = useState(false);
  const featuresRef = useRef<HTMLDivElement>(null);
  const { location } = useRouterState();

  const featureLinks = [
    { to: "/restaurant-inventory-management", key: "inventory", Icon: Package },
    { to: "/restaurant-food-waste-management", key: "waste", Icon: Recycle },
    { to: "/restaurant-staff-scheduling", key: "staff", Icon: Users },
    { to: "/kitchen-task-management", key: "tasks", Icon: CheckSquare },
    { to: "/restaurant-supplier-management", key: "supplier", Icon: ShoppingCart },
  ] as const;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setFeaturesOpen(false);
    setMobileFeaturesOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (!featuresRef.current?.contains(event.target as Node)) setFeaturesOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setFeaturesOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const navLink = (to: string, label: string) => (
    <Link
      to={to}
      className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
      activeProps={{ className: "text-foreground" }}
    >
      {label}
    </Link>
  );

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-xl shadow-soft border-b border-border/60"
          : "bg-background/60 backdrop-blur-md",
      )}
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex-shrink-0">
            <Logo iconSize={36} textClassName="text-xl sm:text-2xl" />
          </Link>

          <nav className="hidden md:flex items-center gap-7" aria-label={t("nav.primaryLabel")}>
            <div className="relative" ref={featuresRef}>
              <Button
                variant="ghost"
                size="sm"
                className="gap-1 px-2 text-foreground/80 shadow-none"
                aria-expanded={featuresOpen}
                aria-haspopup="menu"
                onClick={() => setFeaturesOpen((current) => !current)}
              >
                {t("nav.features")}
                <ChevronDown className={cn("h-4 w-4 transition-transform", featuresOpen && "rotate-180")} />
              </Button>
              <div
                className={cn(
                  "absolute top-[calc(100%+0.75rem)] start-0 w-80 rounded-lg border border-border bg-popover p-2 shadow-lift transition-all duration-200",
                  featuresOpen
                    ? "visible translate-y-0 opacity-100"
                    : "invisible -translate-y-2 opacity-0",
                )}
                role="menu"
              >
                {featureLinks.map(({ to, key, Icon }) => (
                  <Link
                    key={key}
                    to={to}
                    role="menuitem"
                    className="flex items-center gap-3 rounded-md px-3 py-2.5 transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    onClick={() => setFeaturesOpen(false)}
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary-soft text-primary">
                      <Icon className="h-4.5 w-4.5" />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold">{t(`features.list.${key}.title`)}</span>
                      <span className="block text-xs text-muted-foreground">{t(`features.list.${key}.desc`)}</span>
                    </span>
                  </Link>
                ))}
                <Link
                  to="/"
                  hash="features"
                  role="menuitem"
                  className="mt-1 flex items-center justify-between border-t border-border px-3 pt-3 pb-2 text-sm font-semibold text-primary"
                  onClick={() => setFeaturesOpen(false)}
                >
                  {t("nav.viewAllFeatures")}
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
            {navLink("/about", t("nav.about"))}
            <Link
              to="/"
              hash="faq"
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
            >
              {t("nav.faq")}
            </Link>
            {navLink("/blog", t("nav.blog"))}
            {navLink("/contact", t("nav.contact"))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <LanguageSwitcher compact />
            <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer">
              <Button size="sm">{t("nav.download")}</Button>
            </a>
          </div>

          <Button
            variant="ghost"
            className="h-12 w-12 rounded-full p-0 md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label={t("nav.menuLabel")}
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={cn(
          "md:hidden overflow-y-auto transition-all duration-300 ease-out border-b border-border bg-background",
          open ? "max-h-[calc(100vh-4rem)]" : "max-h-0 overflow-hidden",
        )}
      >
        <div className="px-5 py-4 flex flex-col gap-2">
          <Button
            variant="ghost"
            className="h-11 w-full justify-between rounded-md px-2 text-base"
            aria-expanded={mobileFeaturesOpen}
            onClick={() => setMobileFeaturesOpen((current) => !current)}
          >
            {t("nav.features")}
            <ChevronDown className={cn("h-4 w-4 transition-transform", mobileFeaturesOpen && "rotate-180")} />
          </Button>
          <div className={cn("grid overflow-hidden transition-all", mobileFeaturesOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
            <div className="min-h-0">
              <div className="ms-2 border-s border-border py-1 ps-3">
                {featureLinks.map(({ to, key }) => (
                  <Link key={key} to={to} className="block rounded-md px-3 py-2.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground">
                    {t(`features.list.${key}.title`)}
                  </Link>
                ))}
                <Link to="/" hash="features" className="block rounded-md px-3 py-2.5 text-sm font-semibold text-primary">
                  {t("nav.viewAllFeatures")}
                </Link>
              </div>
            </div>
          </div>
          <Link to="/about" className="rounded-md px-2 py-2 text-base font-medium hover:bg-muted">
            {t("nav.about")}
          </Link>
          <Link to="/" hash="faq" className="rounded-md px-2 py-2 text-base font-medium hover:bg-muted">
            {t("nav.faq")}
          </Link>
          <Link to="/blog" className="rounded-md px-2 py-2 text-base font-medium hover:bg-muted">
            {t("nav.blog")}
          </Link>
          <Link to="/contact" className="rounded-md px-2 py-2 text-base font-medium hover:bg-muted">
            {t("nav.contact")}
          </Link>
          <div className="flex items-center justify-between pt-2">
            <LanguageSwitcher />
            <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer">
              <Button size="sm">{t("nav.download")}</Button>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
