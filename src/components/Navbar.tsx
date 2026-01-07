import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CurrencyToggle } from "@/components/CurrencyToggle";
import vilaasaLogo from "@/assets/vilaasa-logo.svg";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Domestic", href: "/domestic" },
    { label: "International", href: "/international" },
    { label: "Wealth Projector", href: "/wealth-projector" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/90 backdrop-blur-md py-4"
            : "bg-gradient-to-b from-black/80 to-transparent pt-4 pb-8"
        }`}
      >
        <div className="px-4 md:px-10 flex justify-center">
          <div
            className={`w-full max-w-[1280px] flex items-center justify-between border-b pb-4 transition-colors ${
              isScrolled ? "border-border/20" : "border-foreground/10"
            }`}
          >
            {/* Logo */}
            <Link to="/home" className="flex items-center">
              <img
                src={vilaasaLogo}
                alt="Vilaasa Estates"
                className="h-6 md:h-8"
              />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`text-xs font-medium uppercase tracking-[0.1em] transition-colors ${
                    location.pathname === link.href
                      ? "text-primary"
                      : "text-foreground/80 hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 md:gap-4">
              {/* Currency Toggle - Desktop */}
              <div className="hidden md:block">
                <CurrencyToggle />
              </div>

              {/* Vault Login */}
              <Link to="/vault">
                <Button
                  variant="ghost"
                  size="sm"
                  className="hidden sm:flex gap-2 text-xs text-gold hover:text-gold hover:bg-gold/10"
                >
                  <span className="material-symbols-outlined text-base">
                    lock
                  </span>
                  The Vault
                </Button>
              </Link>

              <Link to="/calendar">
                <Button variant="ghost" className="hidden sm:flex gap-2">
                  <span className="material-symbols-outlined text-base">
                    calendar_month
                  </span>
                  Book a Site Visit
                </Button>
              </Link>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden text-foreground"
              >
                <span className="material-symbols-outlined">
                  {isMobileMenuOpen ? "close" : "menu"}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:hidden bg-background/95 backdrop-blur-md border-t border-border"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {/* Mobile Currency Toggle */}
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <span className="text-sm text-muted-foreground">Currency</span>
                <CurrencyToggle />
              </div>

              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-sm font-medium uppercase tracking-[0.1em] transition-colors py-2 ${
                    location.pathname === link.href
                      ? "text-primary"
                      : "text-foreground/80 hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <Link
                to="/vault"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-sm font-medium uppercase tracking-[0.1em] transition-colors py-2 text-gold hover:text-gold/80"
              >
                The Vault
              </Link>

              <Link to="/calendar" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full mt-4 gap-2">
                  <span className="material-symbols-outlined text-base">
                    calendar_month
                  </span>
                  Book a Site Visit
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </motion.nav>
    </>
  );
};
