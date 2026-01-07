import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import domesticHero from "@/assets/domestic-hero.jpg";
import heritageVilla from "@/assets/heritage-villa.jpg";
import spaWellness from "@/assets/spa-wellness.jpg";

const Domestic = () => {
  return (
    <div className="overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <header className="relative flex min-h-screen w-full flex-col justify-center items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 gradient-overlay z-10" />
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${domesticHero})` }}
          />
        </div>

        <div className="relative z-20 px-4 max-w-[1280px] flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex flex-col gap-6 items-center"
          >
            <h2 className="text-primary text-xs md:text-sm font-bold uppercase tracking-[0.3em] mb-2">
              Domestic Collection (India)
            </h2>

            <h1 className="text-foreground text-5xl md:text-7xl lg:text-8xl font-light leading-[1.1] tracking-[-0.02em] max-w-4xl font-luxia italic">
              Roots & Returns.
            </h1>

            <div className="h-px w-24 bg-primary/50 my-6" />

            <p className="text-foreground/80 text-lg md:text-xl font-light leading-relaxed max-w-xl">
              Curated assets for the discerning Indian investor.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce text-foreground/50"
        >
          <span className="material-symbols-outlined text-3xl">
            keyboard_arrow_down
          </span>
        </motion.div>
      </header>

      {/* Two Options Section */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-[1280px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-foreground leading-[1.1]">
              Choose Your{" "}
              <span className="font-serif italic text-primary">Investment Path</span>
            </h2>
            <p className="text-muted-foreground text-lg mt-4 max-w-2xl mx-auto">
              Two distinct avenues for building wealth and legacy in India
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Real Estate Card */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Link
                to="/domestic/real-estate"
                className="group block relative overflow-hidden rounded-sm border border-border bg-card hover:border-primary/50 transition-all duration-500"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <div
                    className="w-full h-full bg-cover bg-center transform group-hover:scale-105 transition-transform duration-700"
                    style={{ backgroundImage: `url(${heritageVilla})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                  
                  {/* Content overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <span className="text-primary text-xs font-bold uppercase tracking-[0.2em] mb-3 block">
                      Signature Real Estate
                    </span>
                    <h3 className="text-3xl md:text-4xl font-light text-foreground leading-[1.1] mb-3">
                      Heritage Homes &{" "}
                      <span className="font-serif italic text-primary">
                        Tier-1 Assets
                      </span>
                    </h3>
                    <p className="text-foreground/70 text-base leading-relaxed mb-4 max-w-md">
                      From ancestral villas to skyline apartments across India. Homes that serve as a legacy.
                    </p>
                    <div className="flex items-center gap-2 text-primary group-hover:gap-4 transition-all font-bold uppercase tracking-widest text-xs">
                      View Properties
                      <span className="material-symbols-outlined text-lg">
                        arrow_forward
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Franchise Card */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Link
                to="/domestic/franchise"
                className="group block relative overflow-hidden rounded-sm border border-border bg-card hover:border-gold/50 transition-all duration-500"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <div
                    className="w-full h-full bg-cover bg-center transform group-hover:scale-105 transition-transform duration-700"
                    style={{ backgroundImage: `url(${spaWellness})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                  
                  {/* Content overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <span className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-3 block">
                      Strategic Franchise Opportunities
                    </span>
                    <h3 className="text-3xl md:text-4xl font-light text-foreground leading-[1.1] mb-3">
                      Business Ownership &{" "}
                      <span className="font-serif italic text-gold">
                        Expansion
                      </span>
                    </h3>
                    <p className="text-foreground/70 text-base leading-relaxed mb-4 max-w-md">
                      Master Franchise rights for premier wellness, resort, and lifestyle brands.
                    </p>
                    <div className="flex items-center gap-2 text-gold group-hover:gap-4 transition-all font-bold uppercase tracking-widest text-xs">
                      View Opportunities
                      <span className="material-symbols-outlined text-lg">
                        arrow_forward
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Domestic;
