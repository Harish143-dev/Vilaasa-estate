import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { InquiryFormDialog } from "@/components/InquiryFormDialog";
import heritageVilla from "@/assets/heritage-villa.jpg";
import { useCurrency } from "@/contexts/CurrencyContext";
import { useProperties } from "@/hooks/useProperties";

const DomesticRealEstate = () => {
  const [activeLocation, setActiveLocation] = useState<string | null>(null);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const { formatAmount } = useCurrency();
  /* Removed hardcoded properties */
  const { data: properties = [], isLoading, isError } = useProperties();

  const filteredProperties = properties.filter((p) => {
    // Strict filter for Luxury Property
    if (p.type !== "Luxury Property") return false;

    if (activeLocation && p.location !== activeLocation) return false;
    return true;
  });

  const clearFilters = () => {
    setActiveLocation(null);
  };

  /* propertyTypes memo removed as it's no longer used for filtering */

  const propertyLocations = useMemo(() => {
    return Array.from(new Set(properties
      .filter(p => p.type === "Luxury Property")
      .map((p) => p.location)));
  }, [properties]);

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
            {/* Property Types Section Removed */}

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
                    className={`px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-sm transition-all ${activeLocation === loc
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
            {(activeLocation) && (
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
              {isLoading ? 'Loading properties...' : `Showing ${filteredProperties.length} properties`}
            </p>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              <p className="text-muted-foreground mt-4">Loading properties from server...</p>
            </div>
          )}

          {/* Error State */}
          {isError && (
            <div className="text-center py-20">
              <span className="material-symbols-outlined text-5xl text-red-500/50">
                error
              </span>
              <p className="text-muted-foreground mt-4">
                Failed to load properties. Please make sure the backend server is running.
              </p>
            </div>
          )}

          {!isLoading && !isError && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map((property, index) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    to={`/property/${property.id}`}
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

                      <div className="mt-4 w-full">
                        <button className="w-full bg-primary text-primary-foreground py-2 text-sm uppercase tracking-wider font-bold hover:bg-primary/90 transition-colors">
                          View Details
                        </button>
                      </div>

                    </div>
                  </Link>
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
                No properties match your filters. Try adjusting your selection.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />

      {/* Inquiry Form Dialog - Kept but not active via card click anymore */}
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
