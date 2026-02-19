import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { CountryCodeSelect } from "@/components/CountryCodeSelect";
import { useCurrency } from "@/contexts/CurrencyContext";

const interestOptions = [
  { id: "india", icon: "temple_hindu", label: "India Estate" },
  { id: "dubai", icon: "mosque", label: "Dubai Estate" },
  { id: "franchise", icon: "storefront", label: "Franchise" },
];

const budgetOptions = [
  { value: "", start: null, end: null },

  { value: "range-1", start: 10000000, end: 50000000 },
  { value: "range-2", start: 50000000, end: 100000000 },
  { value: "range-3", start: 100000000, end: 500000000 },
  { value: "range-4", start: 500000000, end: null },
];

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    phoneCountryCode: "+91",
    interests: [] as string[],
    budget: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { formatAmount } = useCurrency();

  const toggleInterest = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(id)
        ? prev.interests.filter((i) => i !== id)
        : [...prev.interests, id],
    }));
  };

  const selectedBudget = budgetOptions.find((b) => b.value === formData.budget);

  let budgetDisplay = "";

  if (selectedBudget?.start !== null) {
    budgetDisplay = selectedBudget.end
      ? `${formatAmount(selectedBudget.start)} – ${formatAmount(selectedBudget.end)}`
      : `${formatAmount(selectedBudget.start)}+`;
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.phone.trim()) {
      toast({
        title: "Please fill in required fields",
        description: "Name and phone number are required.",
        variant: "destructive",
      });
      return;
    }
    const numberOnlyRegex = /^[0-9]+$/;

    if (!numberOnlyRegex.test(formData.phone)) {
      toast({
        title: "Invalid Phone Number",
        description: "Phone number should contain numbers only.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        "https://automate.eyelevelstudio.in/webhook/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            phone: `${formData.phoneCountryCode} ${formData.phone}`,
            interests: formData.interests,
            budget: budgetDisplay,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to submit");
      }

      toast({
        title: "Inquiry Submitted!",
        description:
          "Thank you for your interest. Our team will contact you within 24 hours.",
      });
      setFormData({
        name: "",
        phone: "",
        interests: [],
        budget: "",
        phoneCountryCode: "+91",
      });
    } catch (error) {
      toast({
        title: "Error submitting form",
        description: "Please try again later.",
        variant: "destructive",
      });

      return;
    } finally {
      setIsSubmitting(false);
    }

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: "Inquiry Submitted",
      description: "A relationship manager will contact you within 24 hours.",
    });

    setIsSubmitting(false);
  };

  return (
    <div className="overflow-x-hidden bg-background">
      <Navbar />

      {/* Hero Section */}
      <header className="pt-32 pb-16 px-4 md:px-10">
        <div className="max-w-[1280px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-foreground leading-[1.1] font-luxia mb-6">
              Let's Discuss Your <br />
              <span className="italic text-primary">Portfolio.</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Whether you are looking to acquire a home or expand a business,
              our team is ready.
            </p>
          </motion.div>
        </div>
      </header>

      {/* Contact Info & Form */}
      <section className="py-16 px-4 md:px-10">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-16">
          {/* Left - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-10"
          >
            {/* Direct Line */}
            {/* <div className="flex flex-col gap-3">
              <span className="text-muted-foreground text-xs uppercase tracking-widest">
                Direct Line
              </span>
              <a
                href="tel:+917550001123"
                className="text-3xl md:text-4xl font-light text-foreground hover:text-primary transition-colors"
              >
                +91 7550001123
              </a>
              <p className="text-muted-foreground text-sm">
                Available Mon-Sat, 9:00 AM — 7:00 PM IST
              </p>
            </div> */}

            {/* Office Locations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Chennai */}
              <div className="p-6 bg-card rounded-lg border border-border">
                <span className="text-primary text-xs uppercase tracking-widest font-bold">
                  Chennai, India
                </span>
                <h3 className="text-foreground font-medium mt-3 mb-2">
                  Vilaasa Headquarters
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  43, 2nd Cross Street, 2nd Main Road
                  <br />
                  Navarathna Garden, Defence Colony
                  <br />
                  Ekkatuthangal, Chennai 600032
                </p>
                <a
                  href="https://maps.google.com/?q=43+2nd+Cross+Street+Ekkatuthangal+Chennai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-primary text-sm mt-4 hover:underline"
                >
                  Get Directions
                  <span className="material-symbols-outlined text-sm">
                    north_east
                  </span>
                </a>
              </div>

              {/* Dubai */}
              <div className="p-6 bg-card rounded-lg border border-border">
                <span className="text-accent text-xs uppercase tracking-widest font-bold">
                  Dubai, UAE
                </span>
                <h3 className="text-foreground font-medium mt-3 mb-2">
                  HJ Group
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  1104, SILVER TOWER, BUSINESS BAY
                  <br />
                  Dubai, United Arab Emirates
                </p>
                <a
                  href="https://maps.app.goo.gl/yfZJ7Y8nPWoMdNuw9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-accent text-sm mt-4 hover:underline"
                >
                  Get Directions
                  <span className="material-symbols-outlined text-sm">
                    north_east
                  </span>
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <span className="text-muted-foreground text-xs uppercase tracking-widest">
                General Inquiries
              </span>
              <a
                href="mailto:concierge@vilaasaestate.com"
                className="text-primary text-lg hover:underline"
              >
                vilaasaestates@gmail.com
              </a>
            </div>
          </motion.div>

          {/* Right - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card p-8 md:p-10 rounded-lg border border-border"
          >
            <h2 className="text-2xl font-light text-foreground mb-2">
              Request a Callback
            </h2>
            <p className="text-muted-foreground text-sm mb-8">
              Please provide your details below. A dedicated relationship
              manager will contact you within 24 hours.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* Name */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="name"
                  className="text-foreground text-sm font-medium"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="bg-background border border-border rounded px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                  placeholder="Your full name"
                  maxLength={100}
                />
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="phone"
                  className="text-foreground text-sm font-medium"
                >
                  Phone Number
                </label>
                <div className="flex gap-2 w-full items-center">
                  <CountryCodeSelect
                    value={formData.phoneCountryCode}
                    onChange={(code) =>
                      setFormData({
                        ...formData,
                        phoneCountryCode: code,
                      })
                    }
                  />
                  <input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                    className="bg-background border border-border w-full rounded px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                    placeholder="000-0000"
                    maxLength={20}
                  />
                </div>
              </div>

              {/* Interest Selection */}
              <div className="flex flex-col gap-3">
                <label className="text-foreground text-sm font-medium">
                  I am interested in
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {interestOptions.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => toggleInterest(option.id)}
                      className={`flex flex-col items-center gap-2 p-4 rounded border transition-all ${
                        formData.interests.includes(option.id)
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                      }`}
                    >
                      <span className="material-symbols-outlined text-2xl">
                        {option.icon}
                      </span>
                      <span className="text-xs font-medium">
                        {option.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="budget"
                  className="text-foreground text-sm font-medium"
                >
                  Estimated Budget
                </label>
                <div className="relative">
                  <select
                    id="budget"
                    value={formData.budget}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        budget: e.target.value,
                      }))
                    }
                    className="w-full bg-background border border-border rounded px-4 py-3 text-foreground appearance-none focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors cursor-pointer"
                  >
                    {budgetOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.start === null
                          ? "Select Range"
                          : option.end
                            ? `${formatAmount(option.start)} – ${formatAmount(option.end)}`
                            : `${formatAmount(option.start)}+`}
                      </option>
                    ))}
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
                    expand_more
                  </span>
                </div>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                variant="hero"
                size="lg"
                className="w-full mt-4"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Inquiry"}
              </Button>
            </form>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
