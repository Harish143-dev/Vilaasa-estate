import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { InquiryFormDialog } from "@/components/InquiryFormDialog";
import heritageVilla from "@/assets/heritage-villa.jpg";
import { useCurrency } from "@/contexts/CurrencyContext";

const DomesticRealEstate = () => {
  const [activeType, setActiveType] = useState<string | null>(null);
  const [activeLocation, setActiveLocation] = useState<string | null>(null);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const { formatAmount } = useCurrency();
  // Properties catalog
  const properties = [
    {
      id: "krillam-marine-wellness",
      name: "Krillam Marine Wellness Resorts",
      location: "kerala",
      type: "resort",
      price: 5000000,
      roi: "15-18% IRR",
      image:
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
      status: "Investment Open",
      features: [
        "Marine Wellness Hub",
        "Backwater Access",
        "Eco-Luxury Villas",
        "3 Prime Locations",
      ],
    },
    {
      id: "chaturvatika-villas",
      name: "Chaturvatika Luxury Villas",
      location: "ongole",
      type: "villa",
      price: 50000000,
      roi: "Premium Appreciation",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      status: "97 Villas Left",
      features: [
        "3, 4 & 5 BHK Villas",
        "25 Acre Township",
        "Smart Home Integration",
        "Wellness by Tattva",
      ],
    },
    {
      id: "flamingo-villas-pulicat",
      name: "Flamingo Villas",
      location: "pulicat",
      type: "villa",
      price: 8000000,
      roi: "20-Year Lease-Back",
      image:
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
      status: "40 Premium Villas",
      features: [
        "70 km from Chennai",
        "Marine Wellness",
        "Flamingo Habitat",
        "Assured Returns",
      ],
    },
    {
      id: "oxygen-forest-hyderabad",
      name: "Oxygen Forest (Pranavayu Vanam)",
      location: "hyderabad",
      type: "farmland",
      price: 51000000,
      roi: "Smart Green Investment",
      image:
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
      status: "160-Acre Gated Community",
      features: [
        "3630 & 2057 Sq Yards",
        "450+ Trees per Unit",
        "Organic Farm Produce",
        "25,000-Acre Forest Border",
      ],
      hasVideo: true,
    },
    {
      id: "heritage-villa-chennai",
      name: "Heritage Villa",
      location: "chennai",
      type: "villa",
      price: 8000000,
      image: heritageVilla,
      features: [
        "4 BHK + Pooja Room",
        "Heritage Architecture",
        "6,000 Sq. Ft. Plot",
      ],
    },
    {
      id: "sea-view-apartment",
      name: "Sea View Apartment",
      location: "goa",
      type: "apartment",
      price: 9000000,
      image: heritageVilla,
      features: ["3 BHK Sea Facing", "Premium High-Rise", "Infinity Pool"],
    },
    {
      id: "premium-plot-mumbai",
      name: "Premium Plot",
      location: "mumbai",
      type: "plot",
      price: 5000000,
      image: heritageVilla,
      features: ["2,400 Sq. Ft.", "Metro Corridor", "NA Converted"],
    },
    {
      id: "luxury-villa-goa",
      name: "Luxury Villa",
      location: "goa",
      type: "villa",
      price: 5000000,
      image: heritageVilla,
      features: ["5 BHK + Staff", "Private Pool", "12,000 Sq. Ft. Plot"],
    },
  ];

  const filteredProperties = properties.filter((p) => {
    if (activeType && p.type !== activeType) return false;
    if (activeLocation && p.location !== activeLocation) return false;
    return true;
  });

  const clearFilters = () => {
    setActiveType(null);
    setActiveLocation(null);
  };

  const handlePropertyClick = (property: { id: string; name: string }) => {
    setSelectedProperty(property);
    setInquiryOpen(true);
  };

  const propertyTypes = useMemo(() => {
    return Array.from(new Set(properties.map((p) => p.type)));
  }, []);
  const propertyLocations = useMemo(() => {
    return Array.from(new Set(properties.map((p) => p.location)));
  }, []);

  return (
    <div className="overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <header className="relative flex min-h-[60vh] w-full flex-col justify-center items-center overflow-hidden pt-24">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-background z-10" />
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${heritageVilla})` }}
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
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm"
            >
              <span className="material-symbols-outlined text-base">
                arrow_back
              </span>
              Back to Domestic
            </Link>

            <h1 className="text-foreground text-4xl md:text-6xl lg:text-7xl font-light leading-[1.1] tracking-[-0.02em] max-w-4xl font-luxia italic">
              Signature Real Estate
            </h1>

            <p className="text-foreground/80 text-lg md:text-xl font-light leading-relaxed max-w-xl">
              Heritage homes & tier-1 assets across India
            </p>
          </motion.div>
        </div>
      </header>

      {/* Filters Section */}
      <section className="py-12 px-4 bg-card border-b border-border">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-col gap-8">
            {/* Property Types */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-4">
                Property Type
              </h3>
              <div className="flex flex-wrap gap-3">
                {propertyTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() =>
                      setActiveType(activeType === type ? null : type)
                    }
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
            </div>

            {/* Locations */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-4">
                Location
              </h3>
              <div className="flex flex-wrap gap-3">
                {propertyLocations.map((loc) => (
                  <button
                    key={loc}
                    onClick={() =>
                      setActiveLocation(activeLocation === loc ? null : loc)
                    }
                    className={`px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-sm transition-all ${
                      activeLocation === loc
                        ? "bg-primary text-primary-foreground"
                        : "border border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                    }`}
                  >
                    {loc}
                  </button>
                ))}
              </div>
            </div>

            {/* Clear Filters */}
            {(activeType || activeLocation) && (
              <button
                onClick={clearFilters}
                className="text-sm text-muted-foreground hover:text-primary transition-colors w-fit flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-base">
                  close
                </span>
                Clear all filters
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex items-center justify-between mb-8">
            <p className="text-muted-foreground">
              Showing {filteredProperties.length} properties
            </p>
          </div>

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
                      style={{ backgroundImage: `url(${property.image})` }}
                    />
                    <div className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded uppercase tracking-wide">
                      {property.type}
                    </div>
                    {property.status && (
                      <div className="absolute top-4 right-4 bg-gold text-gold-foreground text-xs font-bold px-3 py-1 rounded uppercase tracking-wide">
                        {property.status}
                      </div>
                    )}
                    {property.hasVideo && (
                      <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm text-foreground text-xs font-bold px-3 py-1 rounded flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">
                          play_circle
                        </span>
                        Video
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
                        {property.features.slice(0, 3).map((feature, idx) => (
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
                          {`${formatAmount(property.price)}${" "}Onwards`}
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
                  </div>
                </button>
              </motion.div>
            ))}
          </div>

          {filteredProperties.length === 0 && (
            <div className="text-center py-20">
              <span className="material-symbols-outlined text-5xl text-muted-foreground/50">
                search_off
              </span>
              <p className="text-muted-foreground mt-4">
                No properties match your filters. Try adjusting your selection.
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
        projectType="real-estate"
        projectId={selectedProperty?.id}
        projectName={selectedProperty?.name}
      />
    </div>
  );
};

export default DomesticRealEstate;
