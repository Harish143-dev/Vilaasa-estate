import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { DiamondIcon } from "./icons/DiamondIcon";
import splashBg from "@/assets/splash-bg.jpg";

interface SplashGatewayProps {
  isVisible: boolean;
  onDismiss: () => void;
}

export const SplashGateway = () => {
  const navigate = useNavigate();

  const handleDomestic = () => {
    // onDismiss();
    navigate("/domestic");
  };

  const handleInternational = () => {
    // onDismiss();
    navigate("/international");
  };

  const handleExploreBoth = () => {
    navigate("/home");
    // onDismiss();
  };
  return (
    <AnimatePresence>
      
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
        >
          {/* Background */}
          <div className="absolute inset-0">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${splashBg})`,
                filter: "blur(2px) brightness(0.4)",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
          </div>

          {/* Content */}
          <div className="relative z-10 w-full max-w-5xl px-6 flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mb-10"
            >
              <DiamondIcon className="text-6xl text-primary animate-pulse" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-4xl md:text-6xl lg:text-7xl font-light text-foreground leading-[1.1] mb-6 font-luxia drop-shadow-2xl"
            >
              Where do you wish to <br />
              <span className="italic text-primary">build your legacy?</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-lg md:text-xl text-muted-foreground font-light tracking-widest uppercase mb-14 text-shadow-sm"
            >
              The luxury of certainty awaits.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl"
            >
              {/* International */}
              <button
                onClick={handleInternational}
                className="group cursor-pointer relative overflow-hidden rounded-sm border border-border/30 glass hover:bg-foreground/10 transition-all duration-500 p-8 flex flex-col items-center justify-center gap-3 hover:border-gold/50"
              >
                <span className="material-symbols-outlined text-3xl text-muted-foreground group-hover:text-gold transition-colors">
                  public
                </span>
                <div className="flex flex-col gap-1 text-center">
                  <span className="text-sm font-bold text-foreground uppercase tracking-[0.2em] group-hover:text-gold transition-colors">
                    International
                  </span>
                  <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider group-hover:text-foreground/80">
                    Dubai & Global Assets
                  </span>
                </div>
              </button>

              {/* Explore - Featured */}
              <button
                onClick={handleExploreBoth}
                className="group cursor-pointer relative overflow-hidden rounded-sm border border-[#12d363] bg-[#12d363] hover:bg-foreground transition-all duration-500 p-8 flex flex-col items-center justify-center gap-3 shadow-[0_0_30px_rgba(18,211,99,0.3)] hover:shadow-[0_0_50px_rgba(255,255,255,0.3)] z-20 transform md:-translate-y-4 md:scale-105"
              >
                <span className="material-symbols-outlined text-3xl text-background group-hover:text-background transition-colors">
                  travel_explore
                </span>
                <div className="flex flex-col gap-1 text-center">
                  <span className="text-sm font-bold text-background uppercase tracking-[0.2em] group-hover:text-background transition-colors">
                    Explore
                  </span>
                  <span className="text-[10px] text-background/80 font-bold uppercase tracking-wider group-hover:text-background/70">
                    Enter Main Site
                  </span>
                </div>
              </button>

              {/* Domestic */}
              <button
                onClick={handleDomestic}
                className="group cursor-pointer relative overflow-hidden rounded-sm border border-border/30 glass hover:bg-foreground/10 transition-all duration-500 p-8 flex flex-col items-center justify-center gap-3 hover:border-primary/50"
              >
                <span className="material-symbols-outlined text-3xl text-muted-foreground group-hover:text-primary transition-colors">
                  temple_hindu
                </span>
                <div className="flex flex-col gap-1 text-center">
                  <span className="text-sm font-bold text-foreground uppercase tracking-[0.2em] group-hover:text-primary transition-colors">
                    Domestic
                  </span>
                  <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider group-hover:text-foreground/80">
                    India Real Estate & Franchises
                  </span>
                </div>
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.8 }}
              className="mt-12 text-foreground/30 text-xs tracking-widest uppercase"
            >
              Select a region to tailor your experience
            </motion.div>
          </div>
        </motion.div>
   
    </AnimatePresence>
  );
};
