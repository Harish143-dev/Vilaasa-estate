import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { DiamondIcon } from "@/components/icons/DiamondIcon";
import { InquiryFormDialog } from "@/components/InquiryFormDialog";
import { useCurrency } from "@/contexts/CurrencyContext";
import dubaiVideo from "../assets/dubai.mp4";

const properties = [
  {
    id: "palm-royale",
    location: "Dubai, UAE",
    name: "Palm Royale Villa",
    price: 3000,
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
  },
  {
    id: "the-aurum",
    location: "London, UK",
    name: "The Aurum Residence",
    price: 2000,
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
  },
  {
    id: "manhattan-heights",
    location: "New York, USA",
    name: "Manhattan Heights",
    price: 2000,
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
  },
  {
    id: "beverly-estate",
    location: "Los Angeles, USA",
    name: "Beverly Hills Estate",
    price: 2000,
    image:
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80",
  },
  {
    id: "marina-bay-penthouse",
    location: "Singapore",
    name: "Marina Bay Penthouse",
    price: 2000,
    image:
      "https://images.unsplash.com/photo-1565967511849-76a60a516170?w=800&q=80",
  },
  {
    id: "monaco-harbour",
    location: "Monaco",
    name: "Monaco Harbour Residence",
    price: 2000,
    image:
      "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=800&q=80",
  },
  {
    id: "swiss-alps-chalet",
    location: "Verbier, Switzerland",
    name: "Swiss Alps Chalet",
    price: 2000,
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
  },
  {
    id: "mumbai-sea-link",
    location: "Mumbai, India",
    name: "Sea Link Towers",
    price: 6000,
    image:
      "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800&q=80",
  },
];

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

const International = () => {
  const { formatAmount } = useCurrency();
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const handlePropertyClick = (property: { id: string; name: string }) => {
    setSelectedProperty(property);
    setInquiryOpen(true);
  };

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
          <video autoPlay muted loop className="w-full h-full object-cover">
            <source src={dubaiVideo} />
            {/* <source src="/hero-mobile.mp4" media="(max-width: 767px)" /> */}
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
              <Button variant="hero" size="lg">
                Explore Listings
              </Button>
              <Button variant="heroOutline" size="lg">
                Why UAE?
              </Button>
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
          <motion.div
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
          </motion.div>

          {/* Lifestyle Filters */}
          <div className="flex flex-wrap gap-3 mb-12">
            <span className="text-muted-foreground text-sm mr-4">
              Explore by Lifestyle
            </span>
            {["Downtown Views", "Waterfront", "Investment Yield"].map(
              (filter) => (
                <button
                  key={filter}
                  className="px-4 py-2 text-xs uppercase tracking-wider border border-border/30 text-foreground/80 hover:border-gold-accent hover:text-gold-accent transition-colors rounded"
                >
                  {filter}
                </button>
              )
            )}
          </div>

          {/* Property Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {properties.map((property, idx) => (
              <motion.div
                key={property.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group cursor-pointer"
                onClick={() =>
                  handlePropertyClick({ id: property.id, name: property.name })
                }
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded mb-4">
                  <img
                    src={property.image}
                    alt={property.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <span className="text-gold-accent/70 text-xs uppercase tracking-wider">
                  {property.location}
                </span>
                <h3 className="text-white font-medium mt-1">{property.name}</h3>
                <p className="text-muted-foreground text-sm mt-1">
                  {formatAmount(property.price)}
                </p>
              </motion.div>
            ))}
          </div>
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
          <DiamondIcon className="w-12 h-12 text-gold-accent" />
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
            <Button variant="hero" size="lg">
              Book Consultation
            </Button>
            <Button variant="heroOutline" size="lg">
              Download Market Report
            </Button>
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
