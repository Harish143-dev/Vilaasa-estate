import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { InquiryFormDialog } from "@/components/InquiryFormDialog";
import wellnessResortKerala from "@/assets/wellness-resort-kerala.jpg";
import carltonWellnessSpa from "@/assets/carlton-wellness-spa.jpg";
import coltonBeachResort from "@/assets/colton-beach-resort.jpg";
import luxePremiumSaloon from "@/assets/luxe-premium-saloon.jpg";
import zenWellnessSpa from "@/assets/zen-wellness-spa.jpg";
import ayurWellnessCenter from "@/assets/ayur-wellness-center.jpg";
import { useCurrency } from "@/contexts/CurrencyContext";

const DomesticFranchise = () => {
  const [activeType, setActiveType] = useState<string | null>(null);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [selectedFranchise, setSelectedFranchise] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const { formatAmount } = useCurrency();

  // Franchise opportunities
  const franchises = [
    {
      id: "wellness-resorts-kerala",
      name: "Wellness Resorts",
      location: "Kerala & Pondicherry",
      type: "wellness",
      investment: 7000000,
      roi: "24% annually",
      image: wellnessResortKerala,
      status: "Opening 2025",
      features: [
        "Authentic Ayurvedic treatments",
        "Yoga & meditation programs",
        "Transformative wellness journeys",
        "5,000+ years healing wisdom",
      ],
    },
    {
      id: "carlton-wellness-spa",
      name: "Carlton Wellness Spa",
      location: "Integrated Across All Properties",
      type: "spa",
      investment: 7000000,
      roi: "26% annually",
      image: carltonWellnessSpa,
      status: "Available Now",
      features: [
        "Bespoke wellness treatments",
        "Ayurvedic & contemporary therapies",
        "Available at all properties",
        "Signature Carlton experiences",
      ],
    },
    {
      id: "colton-resort-chennai",
      name: "Colton Beach Resort",
      location: "Chennai ECR",
      type: "resort",
      investment: 7000000,
      roi: "22% annually",
      image: coltonBeachResort,
      status: "Available Now",
      features: ["Beachfront location", "Premium amenities", "FOCO model"],
    },
    {
      id: "luxe-saloon-mumbai",
      name: "Luxe Premium Saloon",
      location: "Mumbai, Delhi, Bangalore",
      type: "saloon",
      investment: 7000000,
      roi: "28% annually",
      image: luxePremiumSaloon,
      status: "Available Now",
      features: ["European techniques", "Premium clientele", "Monthly payouts"],
    },
    {
      id: "zen-wellness-goa",
      name: "Zen Wellness Spa",
      location: "Goa, Kerala, Rishikesh",
      type: "wellness",
      investment: 70300000,
      roi: "25% annually",
      image: zenWellnessSpa,
      status: "Available Now",
      features: [
        "Holistic wellness",
        "Ayurveda + modern spa",
        "Retreat packages",
      ],
    },
    {
      id: "ayur-wellness-bangalore",
      name: "Ayur Wellness Center",
      location: "Bangalore, Chennai, Pune",
      type: "wellness",
      investment: 9000000,
      roi: "30% annually",
      image: ayurWellnessCenter,
      status: "Available Now",
      features: ["Medical wellness", "Subscription model", "Doctor network"],
    },
    {
      id: "wellness-bangalore",
      name: "Ayur Wellness Center",
      location: "Bangalore, Chennai, Pune",
      type: "Hotel",
      investment: 7000000,
      roi: "30% annually",
      image: ayurWellnessCenter,
      status: "Available Now",
      features: ["Medical wellness", "Subscription model", "Doctor network"],
    },
  ];

  const clearFilters = () => {
    setActiveType(null);
  };

  const handleFranchiseClick = (franchise: { id: string; name: string }) => {
    setSelectedFranchise(franchise);
    setInquiryOpen(true);
  };
  const franchiseTypes = useMemo(() => {
    return Array.from(new Set(franchises.map((p) => p.type)));
  }, []);

  const filteredFranchises = franchises.filter((p) => {
    if (activeType && p.type !== activeType) return false;
    return true;
  });

  return (
    <div className="overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <header className="relative flex min-h-[60vh] w-full flex-col justify-center items-center overflow-hidden pt-24">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-background z-10" />
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${wellnessResortKerala})` }}
          />
        </div>

        <div className="relative z-20 px-4 max-w-[1280px] flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex flex-col gap-4 items-center"
          >
            <Link
              to="/domestic"
              className="flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors text-sm"
            >
              <span className="material-symbols-outlined text-base">
                arrow_back
              </span>
              Back to Domestic
            </Link>

            <h1 className="text-foreground text-4xl md:text-6xl lg:text-7xl font-light leading-[1.1] tracking-[-0.02em] max-w-4xl font-luxia italic">
              Franchise Opportunities
            </h1>

            <p className="text-foreground/80 text-lg md:text-xl font-light leading-relaxed max-w-xl">
              Strategic business ownership with proven models
            </p>
          </motion.div>
        </div>
      </header>

      {/* Filters Section */}
      <section className="py-12 px-4 bg-card border-b border-border">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-col gap-8">
            {/* Franchise Types */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-4">
                Franchise Category
              </h3>
              <div className="flex flex-wrap gap-3">
                {franchiseTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() =>
                      setActiveType(activeType === type ? null : type)
                    }
                    className={`px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-sm transition-all flex items-center gap-2 ${
                      activeType === type
                        ? "bg-gold text-gold-foreground"
                        : "border border-border text-muted-foreground hover:border-gold/50 hover:text-foreground"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Clear Filters */}
            {activeType && (
              <button
                onClick={clearFilters}
                className="text-sm text-muted-foreground hover:text-gold transition-colors w-fit flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-base">
                  close
                </span>
                Clear filter
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Franchises Grid */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex items-center justify-between mb-8">
            <p className="text-muted-foreground">
              Showing {filteredFranchises.length} opportunities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFranchises.map((franchise, index) => (
              <motion.div
                key={franchise.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <button
                  onClick={() =>
                    handleFranchiseClick({
                      id: franchise.id,
                      name: franchise.name,
                    })
                  }
                  className="group block overflow-hidden rounded-sm border border-border bg-card hover:border-gold/50 transition-all w-full text-left"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <div
                      className="w-full h-full bg-cover bg-center transform group-hover:scale-105 transition-transform duration-700"
                      style={{ backgroundImage: `url(${franchise.image})` }}
                    />
                    <div className="absolute top-4 left-4 bg-gold text-gold-foreground text-xs font-bold px-3 py-1 rounded uppercase tracking-wide">
                      {franchise.type}
                    </div>
                    {franchise.status === "Opening 2025" && (
                      <div className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded uppercase tracking-wide">
                        Coming Soon
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-light text-foreground group-hover:text-gold transition-colors">
                      {franchise.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {franchise.location}
                    </p>

                    {/* Features */}
                    <div className="mt-4 space-y-2">
                      {franchise.features.slice(0, 3).map((feature, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-sm text-foreground/70"
                        >
                          <span className="material-symbols-outlined text-primary text-sm">
                            check_circle
                          </span>
                          {feature}
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border">
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wide">
                          Investment
                        </p>
                        <p className="text-lg font-bold text-gold">
                          {`${formatAmount(franchise.investment)}+`}
                        </p>
                      </div>
                      <div className="h-8 w-px bg-border" />
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wide">
                          Expected ROI
                        </p>
                        <p className="text-lg font-bold text-primary">
                          {franchise.roi}
                        </p>
                      </div>
                    </div>
                  </div>
                </button>
              </motion.div>
            ))}
          </div>

          {filteredFranchises.length === 0 && (
            <div className="text-center py-20">
              <span className="material-symbols-outlined text-5xl text-muted-foreground/50">
                search_off
              </span>
              <p className="text-muted-foreground mt-4">
                No franchises match your filter. Try a different category.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />

      {/* Inquiry Form Dialog */}
      <InquiryFormDialog
        open={inquiryOpen}
        onOpenChange={setInquiryOpen}
        projectType="franchise"
        projectId={selectedFranchise?.id}
        projectName={selectedFranchise?.name}
      />
    </div>
  );
};

export default DomesticFranchise;
