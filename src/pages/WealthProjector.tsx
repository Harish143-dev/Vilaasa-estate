import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

// Exchange rates (fixed for demo - in production, fetch from API)
const exchangeRates = {
  INR: 1,
  USD: 0.012,
  AED: 0.044,
};

const currencySymbols = {
  INR: "₹",
  USD: "$",
  AED: "AED ",
};

// Default yields by region
const regionYields: Record<string, { label: string; defaultYield: number; fdRate: number }> = {
  india: { label: "India", defaultYield: 6, fdRate: 6 },
  uae: { label: "UAE", defaultYield: 8, fdRate: 3 },
  uk: { label: "UK", defaultYield: 4, fdRate: 4 },
  usa: { label: "USA", defaultYield: 5, fdRate: 4.5 },
  singapore: { label: "Singapore", defaultYield: 3, fdRate: 3 },
  australia: { label: "Australia", defaultYield: 4, fdRate: 4 },
  franchise: { label: "Franchise (India)", defaultYield: 21, fdRate: 6 },
};

// Duration options
const durationOptions = [
  { value: 3, label: "3 Years" },
  { value: 5, label: "5 Years" },
  { value: 10, label: "10 Years" },
];

// Performance options
const performanceOptions = [
  { value: 0.5, label: "Conservative", percentage: "50%" },
  { value: 0.75, label: "Moderate", percentage: "75%" },
  { value: 1.0, label: "Aggressive", percentage: "100%" },
];

// Animated number component
const AnimatedNumber = ({ value, prefix = "", suffix = "", decimals = 0 }: { 
  value: number; 
  prefix?: string; 
  suffix?: string;
  decimals?: number;
}) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 800;
    const steps = 30;
    const stepDuration = duration / steps;
    const increment = (value - displayValue) / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      if (currentStep >= steps) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(prev => prev + increment);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [value]);

  const formatNumber = (num: number) => {
    if (num >= 10000000) {
      return (num / 10000000).toFixed(decimals) + " Cr";
    } else if (num >= 100000) {
      return (num / 100000).toFixed(decimals) + " L";
    }
    return num.toLocaleString("en-IN", { maximumFractionDigits: decimals });
  };

  return (
    <span className="font-mono tabular-nums">
      {prefix}{formatNumber(displayValue)}{suffix}
    </span>
  );
};

const WealthProjector = () => {
  // Stage A: Global Context
  const [currency, setCurrency] = useState<"INR" | "USD" | "AED">("INR");
  const [region, setRegion] = useState("india");
  const [customYield, setCustomYield] = useState(regionYields.india.defaultYield);

  // Stage B: Investment Inputs
  const [investmentAmount, setInvestmentAmount] = useState(10000000); // 1 Crore default
  const [duration, setDuration] = useState(5);
  const [performance, setPerformance] = useState(0.75);

  // Capital appreciation rate (fixed conservative)
  const capitalAppreciation = 5;

  // Update yield when region changes
  useEffect(() => {
    setCustomYield(regionYields[region].defaultYield);
  }, [region]);

  // Calculate investment range based on currency
  const getInvestmentRange = () => {
    const minINR = 4500000; // 45 Lakhs
    const maxINR = 200000000; // 20 Crores
    const rate = exchangeRates[currency];
    return {
      min: Math.round(minINR * rate),
      max: Math.round(maxINR * rate),
    };
  };

  const range = getInvestmentRange();

  // Calculations
  const effectiveYield = customYield * performance;
  const annualReturn = investmentAmount * (effectiveYield / 100);
  const monthlyPayout = annualReturn / 12;
  const totalRentalIncome = annualReturn * duration;
  const futureAssetValue = investmentAmount * Math.pow(1 + capitalAppreciation / 100, duration);
  const capitalGain = futureAssetValue - investmentAmount;
  const totalROI = totalRentalIncome + capitalGain;

  // FD comparison
  const fdRate = regionYields[region].fdRate;
  const fdReturn = investmentAmount * Math.pow(1 + fdRate / 100, duration) - investmentAmount;
  const additionalGain = totalROI - fdReturn;

  // Chart data
  const comparisonData = [
    {
      name: "Vilaasa Estate",
      value: totalROI,
      fill: "hsl(var(--gold))",
    },
    {
      name: "Traditional FD",
      value: fdReturn,
      fill: "hsl(var(--muted-foreground))",
    },
  ];

  const formatCurrency = (value: number) => {
    const symbol = currencySymbols[currency];
    if (value >= 10000000) {
      return `${symbol}${(value / 10000000).toFixed(2)} Cr`;
    } else if (value >= 100000) {
      return `${symbol}${(value / 100000).toFixed(2)} L`;
    }
    return `${symbol}${value.toLocaleString("en-IN")}`;
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      
      {/* Hero */}
      <header className="pt-32 pb-16 px-4 md:px-10 bg-gradient-to-b from-[#0c1a14] to-background">
        <div className="max-w-[1280px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-gold/60 uppercase tracking-[0.2em] text-xs font-bold">Private Banking Tool</span>
            <h1 className="text-4xl md:text-6xl font-light text-foreground mt-4 mb-4 font-serif">
              The Vilaasa <span className="italic text-gold">Wealth Projector</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Project your returns across different currencies and geographies. 
              A sophisticated tool designed for discerning investors.
            </p>
          </motion.div>
        </div>
      </header>

      {/* Main Calculator */}
      <section className="py-16 px-4 md:px-10">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Left: Inputs */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-10"
            >
              {/* Stage A: Global Context */}
              <div className="p-8 bg-card rounded-lg border border-border">
                <div className="flex items-center gap-3 mb-6">
                  <span className="material-symbols-outlined text-gold text-2xl">public</span>
                  <h2 className="text-xl font-medium text-foreground">Global Context</h2>
                </div>

                {/* Currency Toggle */}
                <div className="mb-6">
                  <label className="text-muted-foreground text-sm mb-3 block">Select Currency</label>
                  <div className="flex bg-muted rounded-lg p-1">
                    {(["INR", "USD", "AED"] as const).map((curr) => (
                      <button
                        key={curr}
                        onClick={() => {
                          const rate = exchangeRates[curr] / exchangeRates[currency];
                          setInvestmentAmount(Math.round(investmentAmount * rate));
                          setCurrency(curr);
                        }}
                        className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-all ${
                          currency === curr
                            ? "bg-gold text-gold-foreground shadow-lg"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {currencySymbols[curr]} {curr}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Region Dropdown */}
                <div>
                  <label className="text-muted-foreground text-sm mb-3 block">Select Region</label>
                  <Select value={region} onValueChange={setRegion}>
                    <SelectTrigger className="w-full bg-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      {Object.entries(regionYields).map(([key, { label, defaultYield }]) => (
                        <SelectItem key={key} value={key}>
                          {label} (Typical Yield: {defaultYield}%)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Custom Yield */}
                <div className="mt-6">
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-muted-foreground text-sm">Expected Annual Yield</label>
                    <span className="text-gold font-bold text-lg font-mono">{customYield}%</span>
                  </div>
                  <Slider
                    value={[customYield]}
                    onValueChange={(val) => setCustomYield(val[0])}
                    min={1}
                    max={30}
                    step={0.5}
                    className="[&_[role=slider]]:bg-gold [&_[role=slider]]:border-gold [&_.bg-primary]:bg-gold"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Adjust based on your specific investment type
                  </p>
                </div>
              </div>

              {/* Stage B: Investment Inputs */}
              <div className="p-8 bg-card rounded-lg border border-border">
                <div className="flex items-center gap-3 mb-6">
                  <span className="material-symbols-outlined text-gold text-2xl">account_balance</span>
                  <h2 className="text-xl font-medium text-foreground">Investment Scenarios</h2>
                </div>

                {/* Investment Amount */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-muted-foreground text-sm">Investment Amount</label>
                    <span className="text-gold font-bold text-xl font-mono">
                      {currencySymbols[currency]}{" "}
                      {investmentAmount >= 10000000
                        ? (investmentAmount / 10000000).toFixed(2) + " Cr"
                        : investmentAmount >= 100000
                        ? (investmentAmount / 100000).toFixed(2) + " L"
                        : investmentAmount.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <Slider
                    value={[investmentAmount]}
                    onValueChange={(val) => setInvestmentAmount(val[0])}
                    min={range.min}
                    max={range.max}
                    step={range.min / 10}
                    className="[&_[role=slider]]:bg-gold [&_[role=slider]]:border-gold [&_.bg-primary]:bg-gold"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>{currencySymbols[currency]}{currency === "INR" ? "45L" : Math.round(range.min).toLocaleString()}</span>
                    <span>{currencySymbols[currency]}{currency === "INR" ? "20Cr" : Math.round(range.max).toLocaleString()}</span>
                  </div>
                </div>

                {/* Duration Pills */}
                <div className="mb-8">
                  <label className="text-muted-foreground text-sm mb-3 block">Investment Duration</label>
                  <div className="flex gap-3">
                    {durationOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setDuration(opt.value)}
                        className={`flex-1 py-3 px-4 rounded-lg border text-sm font-medium transition-all ${
                          duration === opt.value
                            ? "bg-gold/20 border-gold text-gold"
                            : "border-border text-muted-foreground hover:border-gold/50"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Performance Segmented Control */}
                <div>
                  <label className="text-muted-foreground text-sm mb-3 block">Expected Occupancy / Performance</label>
                  <div className="flex bg-muted rounded-lg p-1">
                    {performanceOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setPerformance(opt.value)}
                        className={`flex-1 py-3 px-2 rounded-md text-sm transition-all ${
                          performance === opt.value
                            ? "bg-background text-foreground shadow-md"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <span className="block font-medium">{opt.label}</span>
                        <span className="text-xs opacity-70">{opt.percentage}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: Output - Financial Statement */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {/* Financial Statement */}
              <div className="bg-[#FDF8F0] rounded-lg border border-gold/30 overflow-hidden">
                {/* Header */}
                <div className="bg-[#0c1a14] text-white p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm uppercase tracking-wider text-gold/80">Wealth Projection</h3>
                      <p className="text-2xl font-serif mt-1">Financial Statement</p>
                    </div>
                    <span className="material-symbols-outlined text-4xl text-gold/40">assessment</span>
                  </div>
                </div>

                {/* Results */}
                <div className="p-8 space-y-6">
                  {/* Est. Annual Yield */}
                  <div className="flex items-center justify-between pb-4 border-b border-gold/20">
                    <span className="text-[#0c1a14] font-serif">Est. Annual Yield</span>
                    <span className="text-2xl font-bold text-primary font-mono">{effectiveYield.toFixed(1)}%</span>
                  </div>

                  {/* Monthly Payout - Featured */}
                  <div className="bg-[#0c1a14] rounded-lg p-6 text-center">
                    <p className="text-gold/70 text-sm uppercase tracking-wider mb-2">Monthly Payout</p>
                    <p className="text-4xl md:text-5xl font-bold text-white font-mono">
                      <AnimatedNumber value={monthlyPayout} prefix={currencySymbols[currency]} decimals={2} />
                    </p>
                  </div>

                  {/* Total Payout */}
                  <div className="flex items-center justify-between py-3">
                    <span className="text-[#0c1a14]/70 font-serif">Total Payout over {duration} Years</span>
                    <span className="text-xl font-bold text-[#0c1a14] font-mono">
                      {formatCurrency(totalRentalIncome)}
                    </span>
                  </div>

                  {/* Capital Appreciation */}
                  <div className="flex items-center justify-between py-3 border-b border-gold/20">
                    <div>
                      <span className="text-[#0c1a14]/70 font-serif block">Projected Asset Value</span>
                      <span className="text-xs text-[#0c1a14]/50">({capitalAppreciation}% annual appreciation)</span>
                    </div>
                    <span className="text-xl font-bold text-[#0c1a14] font-mono">
                      {formatCurrency(futureAssetValue)}
                    </span>
                  </div>

                  {/* Total ROI - Big Number */}
                  <div className="bg-gold/10 rounded-lg p-6 mt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[#0c1a14]/70 text-sm uppercase tracking-wider">Total ROI</p>
                        <p className="text-xs text-[#0c1a14]/50">(Rental + Appreciation)</p>
                      </div>
                      <span className="text-3xl md:text-4xl font-bold text-primary font-mono">
                        <AnimatedNumber value={totalROI} prefix={currencySymbols[currency]} decimals={2} />
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-[#0c1a14]/50 text-center italic">
                    *Projections based on market averages. Past performance is not indicative of future results.
                  </p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="mt-6 flex gap-4">
                <Button variant="hero" className="flex-1 gap-2">
                  <span className="material-symbols-outlined">download</span>
                  Download Report
                </Button>
                <Button variant="heroOutline" className="flex-1 gap-2">
                  <span className="material-symbols-outlined">mail</span>
                  Get Consultation
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Smart Money Comparison */}
      <section className="py-16 px-4 md:px-10 bg-card border-y border-border">
        <div className="max-w-[1280px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-gold/60 uppercase tracking-[0.2em] text-xs font-bold">The Opportunity Cost</span>
            <h2 className="text-3xl md:text-4xl font-light text-foreground mt-4 mb-4 font-serif">
              Smart Money <span className="italic text-gold">Comparison</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              See how your investment in Vilaasa Estate compares to traditional banking options
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Chart */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="h-[400px] bg-background rounded-lg p-6 border border-border"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={comparisonData}
                  layout="vertical"
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    type="number"
                    tickFormatter={(value) => formatCurrency(value)}
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={14}
                    width={120}
                  />
                  <Tooltip
                    formatter={(value: number) => [formatCurrency(value), "Total Return"]}
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={60}>
                    {comparisonData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Insight Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="p-8 bg-[#0c1a14] rounded-lg border border-gold/20">
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-4xl text-gold">trending_up</span>
                  <div>
                    <h3 className="text-xl font-medium text-white mb-2">The Vilaasa Advantage</h3>
                    <p className="text-white/70 leading-relaxed mb-6">
                      By choosing Vilaasa Estate over a traditional Fixed Deposit, you potentially gain an additional:
                    </p>
                    <div className="bg-gold/20 rounded-lg p-4 inline-block">
                      <span className="text-3xl md:text-4xl font-bold text-gold font-mono">
                        <AnimatedNumber value={Math.max(0, additionalGain)} prefix={currencySymbols[currency]} decimals={2} />
                      </span>
                    </div>
                    <p className="text-white/50 text-sm mt-4">
                      over {duration} years compared to traditional banking at {fdRate}% p.a.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 bg-background rounded-lg border border-border">
                  <p className="text-muted-foreground text-xs uppercase tracking-wider mb-2">Vilaasa Return</p>
                  <p className="text-2xl font-bold text-primary font-mono">{formatCurrency(totalROI)}</p>
                  <p className="text-xs text-muted-foreground mt-1">@ {effectiveYield.toFixed(1)}% effective yield</p>
                </div>
                <div className="p-6 bg-background rounded-lg border border-border">
                  <p className="text-muted-foreground text-xs uppercase tracking-wider mb-2">Bank FD Return</p>
                  <p className="text-2xl font-bold text-muted-foreground font-mono">{formatCurrency(fdReturn)}</p>
                  <p className="text-xs text-muted-foreground mt-1">@ {fdRate}% p.a. (standard)</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-10">
        <div className="max-w-[900px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-light text-foreground mb-4 font-serif">
              Ready to Project Your <span className="italic text-gold">Wealth?</span>
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Connect with our investment advisors for a personalized wealth projection 
              tailored to your financial goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" className="gap-2">
                <span className="material-symbols-outlined">calendar_month</span>
                Schedule Consultation
              </Button>
              <Button variant="heroOutline" size="lg" className="gap-2">
                <span className="material-symbols-outlined">call</span>
                +91 98765 43210
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WealthProjector;
