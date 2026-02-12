import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { DiamondIcon } from "@/components/icons/DiamondIcon";
import { InquiryFormDialog } from "@/components/InquiryFormDialog";
import { useCurrency } from "@/contexts/CurrencyContext";
import { Link } from "react-router-dom";
import { useProperties } from "@/hooks/useNewProperties";

const benefits = [
  {
    icon: "account_balance",
    title: "Dollar-Pegged Stability",
    desc: "With the AED pegged to the USD, your investment is shielded from currency volatility, offering a secure store of value akin to holding dollars.",
  },
  {
    icon: "percent",
    title: "Tax Efficiency",
    desc: "Benefit from zero property tax, zero capital gains tax, and zero income tax on rental yields. Maximize your net returns legally.",
  },
  {
    icon: "flight_takeoff",
    title: "Golden Visa Access",
    desc: "Strategic property acquisition opens the door to long-term residency for you and your family, unlocking global mobility.",
  },
];

const heroVideos = [
  "/internationalVideo/video_1.mp4",
  "/internationalVideo/video_2.mp4",
  "/internationalVideo/video_3.mp4",
  "/internationalVideo/video_4.mp4",
];
const International = () => {
  const { formatAmount } = useCurrency();
  const { data: properties = [], isLoading, isError } = useProperties();
  const [activeType, setActiveType] = useState<string | null>(null);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const internaltional = properties.filter(
    (p) => p.franchiseCategory === "International",
  );

  const filteredProperties = internaltional.filter((p) => {
    if (activeType && p.type !== activeType) return false;
    return true;
  });

  const clearFilters = () => {
    setActiveType(null);
  };

  const handlePropertyClick = (property: { id: string; name: string }) => {
    setSelectedProperty(property);
    setInquiryOpen(true);
  };

  const handleVideoEnd = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % heroVideos.length);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.load();
      video.play().catch(() => {
        // autoplay might be blocked, ignore
      });
    }
  }, [currentVideoIndex]);

  const propertyTypes = useMemo(() => {
    return Array.from(new Set(internaltional.map((p) => p.type)));
  }, [internaltional]);

  return (
    <div className="overflow-x-hidden bg-background">
      <Navbar />

      {/* Hero Section */}
      <header className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-background z-10" />
          {/* <img 
            src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&q=80" 
            alt="Dubai Skyline"
            className="w-full h-full object-cover"
          /> */}
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            preload="auto"
            onEnded={handleVideoEnd}
            className="w-full h-full object-cover"
          >
            <source src={heroVideos[currentVideoIndex]} type="video/mp4" />
          </video>
        </div>

        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center gap-6"
          >
            <span className="text-gold-accent text-xs md:text-sm font-bold uppercase tracking-[0.3em]">
              International Collection
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white leading-[1.1] font-luxia">
              Borders Are Not <br />
              <span className="italic text-gold-accent">Barriers.</span>
            </h1>
            <p className="text-white/70 text-lg md:text-xl max-w-xl leading-relaxed">
              Dollar-denominated assets. World-class infrastructure.
              Tax-efficient returns.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <a href="#property">
                <Button variant="hero" size="lg">
                  Explore Listings
                </Button>
              </a>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/50">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <span className="material-symbols-outlined">
              keyboard_arrow_down
            </span>
          </motion.div>
        </div>
      </header>

      {/* Collection Section */}
      <section className="py-24 md:py-32 px-4 md:px-10 bg-[#0c1a14]">
        <div className="max-w-[1280px] mx-auto">
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6 mb-16"
          >
            <span className="text-gold-accent/60 uppercase tracking-[0.2em] text-xs font-bold">
              Curated Portfolio
            </span>
            <h2 className="text-4xl md:text-5xl font-light text-white">
              The Dubai{" "}
              <span className="font-serif italic text-gold-accent">
                Collection
              </span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
              We simplify the acquisition of premium UAE properties for the
              Indian investor. In a market defined by rapid growth and
              architectural marvels, discerning the exceptional from the merely
              expensive requires local intelligence.
            </p>
            <p className="text-muted-foreground/70 text-base max-w-2xl">
              Fully vetted for legal clarity and rental yield, our portfolio
              represents the pinnacle of desert modernism and waterfront luxury.
            </p>
          </motion.div> */}

          {/* Lifestyle Filters */}
          <div className="flex flex-wrap gap-3 mb-5 items-center">
            <span className="text-muted-foreground text-sm mr-4">
              Explore by Lifestyle
            </span>
            {propertyTypes.map((type) => (
              <button
                key={type}
                onClick={() => setActiveType(activeType === type ? null : type)}
                className={`px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-sm transition-all ${
                  activeType === type
                    ? "bg-primary text-primary-foreground"
                    : "border border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
          {/* Clear Filters */}
          {activeType && (
            <button
              onClick={clearFilters}
              className="text-sm text-muted-foreground hover:text-primary transition-colors w-fit flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-base">close</span>
              Clear all filters
            </button>
          )}
          {/* Property Grid */}
          <section id="property" className="px-4 mt-5">
            <div className="max-w-[1280px] mx-auto">
              <div className="flex items-center justify-between mb-8">
                <p className="text-muted-foreground">
                  {isLoading
                    ? "Loading properties..."
                    : `Showing ${filteredProperties.length} properties`}
                </p>
              </div>

              {/* Loading State */}
              {isLoading && (
                <div className="flex flex-col items-center justify-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                  <p className="text-muted-foreground mt-4">
                    Loading properties from server...
                  </p>
                </div>
              )}

              {/* Error State */}
              {isError && (
                <div className="text-center py-20">
                  <span className="material-symbols-outlined text-5xl text-red-500/50">
                    error
                  </span>
                  <p className="text-muted-foreground mt-4">
                    Failed to load properties. Please make sure the backend
                    server is running.
                  </p>
                </div>
              )}

              {/* Properties Grid */}
              {!isLoading && !isError && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProperties.map((property, index) => (
                    <motion.div
                      key={property.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <button
                        onClick={() =>
                          handlePropertyClick({
                            id: property.id,
                            name: property.name,
                          })
                        }
                        className="group block overflow-hidden rounded-sm border border-border bg-card hover:border-primary/50 transition-all w-full text-left"
                      >
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <div
                            className="w-full h-full bg-cover bg-center transform group-hover:scale-105 transition-transform duration-700"
                            style={{
                              backgroundImage: `url(${property.image})`,
                            }}
                          />
                          <div className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded uppercase tracking-wide">
                            {property.type}
                          </div>
                          {property.status && (
                            <div className="absolute top-4 right-4 bg-gold text-gold-foreground text-xs font-bold px-3 py-1 rounded uppercase tracking-wide">
                              {property.status}
                            </div>
                          )}
                        </div>
                        <div className="p-6">
                          <h3 className="text-xl font-light text-foreground group-hover:text-primary transition-colors">
                            {property.name}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1 capitalize">
                            {property.location.replace("-", " ")}
                          </p>

                          {/* Features */}
                          {property.features && (
                            <div className="mt-3 space-y-1">
                              {property.features
                                .slice(0, 3)
                                .map((feature, idx) => (
                                  <div
                                    key={idx}
                                    className="flex items-center gap-2 text-xs text-foreground/70"
                                  >
                                    <span className="material-symbols-outlined text-primary text-xs">
                                      check_circle
                                    </span>
                                    {feature}
                                  </div>
                                ))}
                            </div>
                          )}

                          <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border">
                            <div>
                              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                                Price
                              </p>
                              <p className="text-lg font-bold text-primary">
                                {formatAmount(property.price)}
                              </p>
                            </div>
                            {property.roi && (
                              <>
                                <div className="h-8 w-px bg-border" />
                                <div>
                                  <p className="text-xs text-muted-foreground uppercase tracking-wide">
                                    Returns
                                  </p>
                                  <p className="text-sm font-medium text-gold">
                                    {property.roi}
                                  </p>
                                </div>
                              </>
                            )}
                          </div>

                          <div className="mt-4 w-full">
                            <button className="w-full bg-primary text-primary-foreground py-2 text-sm uppercase tracking-wider font-bold hover:bg-primary/90 transition-colors">
                              View Details
                            </button>
                          </div>
                        </div>
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}

              {filteredProperties.length === 0 && !isLoading && !isError && (
                <div className="text-center py-20">
                  <span className="material-symbols-outlined text-5xl text-muted-foreground/50">
                    search_off
                  </span>
                  <p className="text-muted-foreground mt-4">
                    No properties match your filters. Try adjusting your
                    selection.
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 md:py-32 px-4 md:px-10 bg-background border-t border-border/10">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {benefits.map((benefit, idx) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col gap-4"
            >
              <span className="material-symbols-outlined text-4xl text-gold-accent">
                {benefit.icon}
              </span>
              <h3 className="text-xl font-medium text-foreground">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {benefit.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-16 px-4 bg-[#0c1a14] border-y border-gold-accent/10">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-gold-accent/50 text-xs uppercase tracking-widest mb-4 block">
            Our Standard
          </span>
          <p className="text-2xl md:text-3xl text-white/90 font-light italic font-serif">
            "We reject 98% of available inventory to ensure only the highest
            performing assets reach you."
          </p>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 md:py-32 px-4 md:px-10 bg-background">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-gold-accent/60 uppercase tracking-[0.2em] text-xs font-bold">
              The Process
            </span>
            <h2 className="text-4xl md:text-5xl font-light text-foreground mt-4 mb-6">
              Vetted for{" "}
              <span className="font-serif italic text-gold-accent">
                Excellence
              </span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Vilaasa Estate goes beyond the brochure. We deploy local surveyors
              to physically inspect assets, verify title deeds with the Dubai
              Land Department, and analyze community service charges to forecast
              true net yields.
            </p>
            <ul className="flex flex-col gap-4">
              {[
                "Developer Track Record Analysis",
                "Off-Plan Payment Plan Negotiation",
                "Post-Handover Property Management",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-foreground/80"
                >
                  <span className="material-symbols-outlined text-primary">
                    check_circle
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative aspect-square rounded-lg overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1546412414-e1885259563a?w=800&q=80"
              alt="Dubai Architecture"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-4 overflow-hidden">
        <div
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&q=80')] bg-cover bg-center bg-fixed"
          style={{ filter: "brightness(0.2)" }}
        />
        <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center gap-8">
          <DiamondIcon className="text-gold-accent" />
          <h2 className="text-3xl md:text-5xl font-light text-white leading-tight">
            Secure your piece of the <br />
            <span className="font-serif italic text-gold-accent">
              future skyline.
            </span>
          </h2>
          <p className="text-white/60 text-lg">
            Schedule a private consultation with our UAE Investment Director to
            discuss your portfolio goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/calendar">
              <Button variant="hero" size="lg">
                Book Consultation
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      <InquiryFormDialog
        open={inquiryOpen}
        onOpenChange={setInquiryOpen}
        projectType="real-estate"
        projectId={selectedProperty?.id}
        projectName={selectedProperty?.name}
      />
    </div>
  );
};

export default International;
