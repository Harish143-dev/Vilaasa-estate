import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { DiamondIcon } from "@/components/icons/DiamondIcon";
import { ShareButtons } from "@/components/ShareButtons";
import { CalanderDialog } from "@/components/CalanderDialog";
import { useState } from "react";
import Gallery from "@/components/Gallery";
import { useCurrency } from "@/contexts/CurrencyContext";
import { useProperty } from "@/hooks/useProperties";

const PropertyDetail = () => {
  const [openCalendar, setOpenCalendar] = useState(false);
  const [requested, setRequested] = useState<number[]>([]);
  const { id } = useParams<{ id: string }>();
  const { data: property, isLoading, isError } = useProperty(id || "the-aurum");
  const { formatAmount } = useCurrency();

  console.log(property);
  const handleRequest = (idx: number) => {
    if (requested.includes(idx)) return;

    setRequested((prev) => [...prev, idx]);

    // your API / modal / logic here
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="text-muted-foreground">Loading property details...</p>
        </div>
      </div>
    );
  }

  // Error/Not found state
  if (isError || !property) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <span className="material-symbols-outlined text-5xl text-red-500/50">
            error
          </span>
          <h1 className="text-4xl font-light text-foreground mb-4">
            Property Not Found
          </h1>
          <p className="text-muted-foreground mb-4">
            Could not load property data. Please ensure the backend server is
            running.
          </p>
          <Link to="/" className="text-primary hover:underline">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-hidden bg-background">
      <Navbar />

      {/* Hero Section */}
      <header className="relative min-h-[70vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent z-10" />
          {property.heroVideo ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            >
              <source src={property.heroVideo} type="video/mp4" />
              <img
                src={property.heroImage}
                alt={property.name}
                className="w-full h-full object-cover"
              />
            </video>
          ) : (
            <img
              src={property.heroImage}
              alt={property.name}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        <div className="relative z-20 w-full px-4 md:px-10 pb-16 pt-32">
          <div className="max-w-[1280px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col gap-4"
            >
              <div className="flex items-center gap-3 text-muted-foreground text-sm">
                <span>{property.location}</span>
                <span className="text-primary">•</span>
                <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">
                  {property.type}
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-light text-foreground">
                {property.name}
              </h1>

              <p className="text-muted-foreground text-lg max-w-2xl">
                {property.description[0]?.substring(0, 120)}...
              </p>

              <div className="flex flex-wrap items-center gap-6 mt-4">
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-xs uppercase tracking-wider">
                    Starting From
                  </span>
                  <span className="text-2xl font-medium text-foreground">
                    {formatAmount(property.price)}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-xs uppercase tracking-wider">
                    Status
                  </span>
                  <span className="text-foreground">{property.status}</span>
                </div>
                <div className="ml-auto">
                  <ShareButtons
                    title={`${property.name} - ${property.location}`}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Concept Section */}
      <section className="py-20 px-4 md:px-10 bg-card border-y border-border">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            <span className="text-primary/60 uppercase tracking-[0.2em] text-xs font-bold">
              Concept & Vision
            </span>
            <h2 className="text-3xl md:text-4xl font-light text-foreground">
              Timeless elegance reimagined for the discerning few.
            </h2>
            {property.description.map((para, idx) => (
              <p key={idx} className="text-muted-foreground leading-relaxed">
                {para}
              </p>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-background p-8 rounded-lg border border-primary/20"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-primary">
                verified
              </span>
              <span className="text-primary font-medium">
                The Vilaasa Verdict
              </span>
            </div>
            <p className="text-foreground/90 text-lg italic leading-relaxed mb-6">
              "{property.verdict.quote}"
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-primary font-bold">
                  {property.verdict.author.charAt(0)}
                </span>
              </div>
              <div>
                <p className="text-foreground font-medium">
                  {property.verdict.author}
                </p>
                <p className="text-muted-foreground text-sm">
                  {property.verdict.title}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* At a Glance */}
      <section className="py-20 px-4 md:px-10">
        <div className="max-w-[1280px] mx-auto">
          <h2 className="text-2xl font-light text-foreground mb-8">
            At a Glance
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {property.specs.map((spec, idx) => (
              <motion.div
                key={spec.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col gap-2 p-4 bg-card rounded border border-border"
              >
                <span className="text-muted-foreground text-xs uppercase tracking-wider">
                  {spec.label}
                </span>
                <span className="text-foreground font-medium">
                  {spec.value}
                </span>
              </motion.div>
            ))}
          </div>
          {property.brochure && (
            <a
              href={property.brochure}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" className="mt-8 gap-2">
                <span className="material-symbols-outlined text-lg">
                  download
                </span>
                Download Brochure
              </Button>
            </a>
          )}
        </div>
      </section>

      {/* Financial Intelligence */}
      <section className="py-20 px-4 md:px-10 bg-[#0c1a14]">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-12">
            <div>
              <span className="text-gold-accent/60 uppercase tracking-[0.2em] text-xs font-bold">
                Financial Intelligence
              </span>
              <h2 className="text-3xl font-light text-foreground mt-2">
                Investment Analysis
              </h2>
              <p className="text-muted-foreground mt-2">
                Based on Q3 2024 market data for prime luxury real estate.
              </p>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <span className="material-symbols-outlined text-lg">info</span>
              Data verified by Vilaasa
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {property.financials.map((item, idx) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 bg-background/50 rounded-lg border border-border"
              >
                <div className="flex items-center gap-2 text-gold-accent mb-4">
                  <span className="text-sm">{item.label}</span>
                  <span className="material-symbols-outlined text-lg">
                    {item.icon}
                  </span>
                </div>
                <p className="text-3xl font-light text-foreground mb-2">
                  {item.value}
                </p>
                <p className="text-muted-foreground text-sm">{item.note}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Table */}
      <section className="py-20 px-4 md:px-10">
        <div className="max-w-[1280px] mx-auto">
          <h2 className="text-2xl font-light text-foreground mb-8">
            Pricing & Configurations
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="py-4 px-4 text-muted-foreground text-sm font-medium">
                    Unit Type
                  </th>
                  <th className="py-4 px-4 text-muted-foreground text-sm font-medium">
                    Carpet Area
                  </th>

                  <th className="py-4 px-4 text-muted-foreground text-sm font-medium">
                    Price
                  </th>
                  <th className="py-4 px-4 text-muted-foreground text-sm font-medium">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {property.configurations.map((config, idx: number) => {
                  const isRequested = requested.includes(idx);

                  return (
                    <tr
                      key={idx}
                      className="border-b border-border/50 hover:bg-card/50 transition-colors"
                    >
                      <td className="py-4 px-4 text-foreground font-medium">
                        {config.type}
                      </td>

                      <td className="py-4 px-4 text-muted-foreground">
                        {config.area}
                      </td>

                      <td className="py-4 px-4 text-foreground">
                        {formatAmount(config.price)}
                      </td>

                      <td className="py-4 px-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-primary"
                          onClick={() => handleRequest(idx)}
                          disabled={isRequested}
                        >
                          {isRequested
                            ? "Cost Sheet Requested"
                            : "Request Cost Sheet"}
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Floor Plans */}
      <Gallery property={property} />

      {/* Amenities */}
      <section className="py-20 px-4 md:px-10">
        <div className="max-w-[1280px] mx-auto">
          <h2 className="text-2xl font-light text-foreground mb-8">
            Amenities
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {property.amenities.map((amenity, idx) => (
              <motion.div
                key={amenity.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 bg-card rounded-lg border border-border hover:border-primary/50 transition-colors"
              >
                <span className="material-symbols-outlined text-3xl text-primary mb-4 block">
                  {amenity.icon}
                </span>
                <h3 className="text-foreground font-medium mb-2">
                  {amenity.name}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {amenity.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-20 px-4 md:px-10 bg-card border-y border-border">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex items-center gap-2 mb-8">
            <span className="material-symbols-outlined text-primary">map</span>
            <h2 className="text-2xl font-light text-foreground">
              Location & Connectivity
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 aspect-video bg-background rounded-lg border border-border flex items-center justify-center">
              <p className="text-muted-foreground">
                Interactive Map Loading...
              </p>
            </div>
            <div className="flex flex-col gap-4">
              {property.nearbyLocations.map((loc) => (
                <div
                  key={loc.name}
                  className="flex items-center justify-between p-4 bg-background rounded border border-border"
                >
                  <span className="text-foreground">{loc.name}</span>
                  <span className="text-muted-foreground text-sm">
                    {loc.distance}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Footer CTA */}
      <div className="sticky bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-t border-border py-4 px-4 md:px-10">
        <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <DiamondIcon className="w-8 h-10 text-gold-accent hidden sm:block" />
            <div>
              <p className="text-foreground font-medium">{property.name}</p>
              <p className="text-muted-foreground text-sm">
                {formatAmount(property.price)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button onClick={() => setOpenCalendar(true)} variant="hero">
              Book a site Visit
            </Button>
          </div>
        </div>
      </div>
      <CalanderDialog
        open={openCalendar}
        onOpenChange={setOpenCalendar}
        propertyName={property.name}
        onConfirm={({ date, time }) => {
          const payload = {
            propertyId: property.id,
            propertyName: property.name,
            date: date.toISOString().split("T")[0],
            time,
            timezone: "Asia/Kolkata",
          };

          fetch("/api/book-visit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
        }}
      />
      <Footer />
    </div>
  );
};

export default PropertyDetail;
