import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export const ChannelPartnerSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to register.",
        variant: "destructive",
      });
      return;
    }

    // Validate phone number
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phone.replace(/\s/g, ""))) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid 10-digit phone number.",
        variant: "destructive",
      });
      return;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    
    toast({
      title: "Registration Successful!",
      description: "Thank you for your interest. Our team will contact you within 24 hours.",
    });
    
    setFormData({ name: "", email: "", phone: "" });
  };

  return (
    <section className="py-16 md:py-24 px-4 md:px-10 bg-primary/5" id="channel-partner">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            <span className="text-primary uppercase tracking-[0.2em] text-xs font-bold">
              Partnership
            </span>
            <h2 className="text-4xl md:text-5xl font-light text-foreground leading-[1.1]">
              Become a <br />
              <span className="font-serif italic">Channel Partner</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Join our exclusive network of real estate and franchise partners. 
              Earn premium commissions while offering your clients access to 
              curated investment opportunities across India and the globe.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mt-4">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-2xl">payments</span>
                <div>
                  <h4 className="font-bold text-foreground">High Commissions</h4>
                  <p className="text-sm text-muted-foreground">Industry-leading payouts</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-2xl">support_agent</span>
                <div>
                  <h4 className="font-bold text-foreground">Dedicated Support</h4>
                  <p className="text-sm text-muted-foreground">Personal relationship manager</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-2xl">workspace_premium</span>
                <div>
                  <h4 className="font-bold text-foreground">Exclusive Access</h4>
                  <p className="text-sm text-muted-foreground">Pre-launch inventory rights</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-2xl">school</span>
                <div>
                  <h4 className="font-bold text-foreground">Training Programs</h4>
                  <p className="text-sm text-muted-foreground">Continuous skill development</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-background border border-border rounded-lg p-8 shadow-lg"
          >
            <h3 className="text-xl font-bold text-foreground mb-6">Register as a Partner</h3>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="partnerName">Full Name</Label>
                <Input
                  id="partnerName"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-background border-border"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="partnerEmail">Email Address</Label>
                <Input
                  id="partnerEmail"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-background border-border"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="partnerPhone">Phone Number</Label>
                <Input
                  id="partnerPhone"
                  type="tel"
                  placeholder="10-digit mobile number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="bg-background border-border"
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="material-symbols-outlined animate-spin mr-2">progress_activity</span>
                    Submitting...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined mr-2">handshake</span>
                    Register Now
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
