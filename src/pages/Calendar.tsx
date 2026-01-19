import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { CountryCodeSelect } from "@/components/CountryCodeSelect";

const timeSlots = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
];

const visitTypes = [
  { value: "real-estate-india", label: "India Real Estate" },
  { value: "real-estate-international", label: "International Real Estate" },
  { value: "franchise", label: "Franchise Opportunities" },
  { value: "general", label: "General Consultation" },
];

const Calendar_Page = () => {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [visitType, setVisitType] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    phoneCountryCode: "+91",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !selectedDate ||
      !selectedTime ||
      !visitType ||
      !formData.name ||
      !formData.phone
    ) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Validate phone
    // const phoneRegex = /^[0-9]{10}$/;
    // if (!phoneRegex.test(formData.phone.replace(/\s/g, ""))) {
    //   toast({
    //     title: "Invalid Phone Number",
    //     description: "Please enter a valid 10-digit phone number.",
    //     variant: "destructive",
    //   });
    //   return;
    // }

    setIsSubmitting(true);

    // Simulate booking submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);

    toast({
      title: "Booking Confirmed!",
      description: `Your site visit is scheduled for ${selectedDate.toLocaleDateString()} at ${selectedTime}. You'll receive a calendar invite shortly.`,
    });

    // Reset form
    setSelectedDate(undefined);
    setSelectedTime("");
    setVisitType("");
    setFormData({
      name: "",
      email: "",
      phone: "",
      notes: "",
      phoneCountryCode: "+91",
    });
  };

  // Disable past dates and weekends
  const disabledDays = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today || date.getDay() === 0; // Disable Sundays and past dates
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-32 pb-20 px-4 md:px-10">
        <div className="max-w-[1280px] mx-auto">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-primary uppercase tracking-[0.2em] text-xs font-bold">
              Schedule a Visit
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mt-4 mb-6">
              Book Your <span className="font-serif italic">Site Visit</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Select your preferred date and time for a personalized walkthrough
              of our exclusive properties and franchise opportunities.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Calendar Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-card border border-border rounded-lg p-6 md:p-8"
            >
              <h2 className="text-xl font-bold text-foreground mb-6">
                Select Date & Time
              </h2>

              <div className="flex flex-col items-center">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={disabledDays}
                  className="rounded-md border border-border pointer-events-auto"
                />

                {selectedDate && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full mt-8"
                  >
                    <h3 className="text-sm font-medium text-foreground mb-4">
                      Available Time Slots for{" "}
                      {selectedDate.toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                      })}
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`p-3 text-sm rounded-md border transition-colors ${
                            selectedTime === time
                              ? "bg-primary text-primary-foreground border-primary"
                              : "border-border hover:border-primary/50 text-foreground"
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Form Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-card border border-border rounded-lg p-6 md:p-8"
            >
              <h2 className="text-xl font-bold text-foreground mb-6">
                Your Details
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="visitType">Type of Visit *</Label>
                  <Select value={visitType} onValueChange={setVisitType}>
                    <SelectTrigger className="bg-background border-border">
                      <SelectValue placeholder="Select visit type" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border-border">
                      {visitTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="calName">Full Name *</Label>
                  <Input
                    id="calName"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="bg-background border-border"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="calEmail">Email Address</Label>
                  <Input
                    id="calEmail"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="bg-background border-border"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="calPhone">Phone Number *</Label>
                  <div className="flex gap-2 items-center">
                    <CountryCodeSelect
                      value={formData.phoneCountryCode}
                      onChange={(code) =>
                        setFormData({
                          ...formData,
                          phoneCountryCode: code,
                        })
                      }
                    />
                    <Input
                      id="calPhone"
                      type="tel"
                      placeholder="0000-0000"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="bg-background border-border"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="calNotes">Additional Notes</Label>
                  <Input
                    id="calNotes"
                    placeholder="Any specific requirements or questions"
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData({ ...formData, notes: e.target.value })
                    }
                    className="bg-background border-border"
                  />
                </div>

                {/* Summary */}
                {selectedDate && selectedTime && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-4 bg-primary/10 rounded-lg"
                  >
                    <p className="text-sm font-medium text-foreground">
                      Booking Summary
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {selectedDate.toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}{" "}
                      at {selectedTime}
                    </p>
                  </motion.div>
                )}

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting || !selectedDate || !selectedTime}
                >
                  {isSubmitting ? (
                    <>
                      <span className="material-symbols-outlined animate-spin mr-2">
                        progress_activity
                      </span>
                      Booking...
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined mr-2">
                        event_available
                      </span>
                      Confirm Booking
                    </>
                  )}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Calendar_Page;
