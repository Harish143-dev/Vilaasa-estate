import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useToast } from "@/hooks/use-toast";
import { CountryCodeSelect } from "./CountryCodeSelect";

interface InquiryFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectType?: "real-estate" | "franchise";
  projectId?: string;
  projectName?: string;
}
interface Country {
  name: string;
  code: string;
  dial_code: string;
  flag?: string;
}
const investmentRanges = [
  "₹1 - 2 Crores",
  "₹2 - 4 Crores",
  "₹4 - 6 Crores",
  "₹6 - 8 Crores",
  "₹8 - 10 Crores",
  "₹10 - 15 Crores",
  "₹15 - 20 Crores",
  "₹20+ Crores",
];

// const countryCodes = [
//   { code: "+91", country: "India", flag: "🇮🇳" },
//   { code: "+1", country: "USA", flag: "🇺🇸" },
//   { code: "+971", country: "UAE", flag: "🇦🇪" },
//   { code: "+44", country: "UK", flag: "🇬🇧" },
//   { code: "+61", country: "Australia", flag: "🇦🇺" },
//   { code: "+65", country: "Singapore", flag: "🇸🇬" },
// ];

export const InquiryFormDialog = ({
  open,
  onOpenChange,
  projectType,
  projectId,
  projectName,
}: InquiryFormDialogProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState<"form" | "otp" | "success">("form");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phoneCountryCode: "+91",
    phone: "",
    email: "",
    investmentType: projectType || "",
    investmentRange: "",
  });
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.phone ||
      !formData.email ||
      !formData.investmentType ||
      !formData.investmentRange
    ) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to continue.",
        variant: "destructive",
      });
      return;
    }

    // validate Phone Number
    const numberOnlyRegex = /^[0-9]+$/;

    if (!numberOnlyRegex.test(formData.phone)) {
      toast({
        title: "Invalid Phone Number",
        description: "Phone number should contain numbers only.",
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

    // Simulate OTP generation (4-6 digits)
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(newOtp);

    // Simulate sending OTP
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setStep("otp");

    toast({
      title: "OTP Sent",
      description: `A verification code has been sent to ${formData.phone}. (Demo OTP: ${newOtp})`,
    });
  };

  const handleOtpVerify = async () => {
    if (otp.length < 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter the complete 6-digit OTP.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simulated OTP verification - accept any 6-digit code for demo
    if (otp === generatedOtp || otp.length === 6) {
      setIsSubmitting(false);
      setStep("success");

      toast({
        title: "Verified Successfully",
        description: "Redirecting to project details...",
      });

      // Redirect after a short delay
      setTimeout(() => {
        onOpenChange(false);
        if (projectId) {
          if (formData.investmentType === "real-estate") {
            navigate(`/property/${projectId}`);
          } else {
            navigate(`/franchise/${projectId}`);
          }
        }
        // Reset form
        setStep("form");
        setFormData({
          name: "",
          phone: "",
          phoneCountryCode: "+91",
          email: "",
          investmentType: projectType || "",
          investmentRange: "",
        });
        setOtp("");
      }, 1500);
    } else {
      setIsSubmitting(false);
      toast({
        title: "Invalid OTP",
        description: "The OTP you entered is incorrect. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleResendOtp = async () => {
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(newOtp);

    toast({
      title: "OTP Resent",
      description: `A new verification code has been sent. (Demo OTP: ${newOtp})`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-background border-border">
        <DialogHeader>
          <DialogTitle className="text-xl font-light">
            {step === "form" && "Express Your Interest"}
            {step === "otp" && "Verify Your email"}
            {step === "success" && "Verification Complete"}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {step === "form" &&
              (projectName
                ? `Inquiring about: ${projectName}`
                : "Fill in your details to learn more")}
            {step === "otp" && "Enter the OTP sent to your Email"}
            {step === "success" &&
              "You now have access to detailed project information"}
          </DialogDescription>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {step === "form" && (
            <motion.form
              key="form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onSubmit={handleFormSubmit}
              className="space-y-4 mt-4"
            >
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="bg-background border-border"
                />
              </div>

              <div className="space-y-2">
                <Label>Phone Number</Label>

                <div className="flex gap-2">
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
                    type="tel"
                    placeholder="Mobile number"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        phone: e.target.value,
                      })
                    }
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
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
                <Label>Type of Investment</Label>
                <Select
                  value={formData.investmentType}
                  onValueChange={(value) =>
                    setFormData({ ...formData, investmentType: value })
                  }
                >
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue placeholder="Select investment type" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-border">
                    <SelectItem value="real-estate">Real Estate</SelectItem>
                    <SelectItem value="franchise">Franchise</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Investment Range</Label>
                <Select
                  value={formData.investmentRange}
                  onValueChange={(value) =>
                    setFormData({ ...formData, investmentRange: value })
                  }
                >
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue placeholder="Select investment range" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-border">
                    {investmentRanges.map((range) => (
                      <SelectItem key={range} value={range}>
                        {range}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <span className="material-symbols-outlined animate-spin mr-2">
                      progress_activity
                    </span>
                    Sending OTP...
                  </>
                ) : (
                  "Get OTP & Continue"
                )}
              </Button>
            </motion.form>
          )}

          {step === "otp" && (
            <motion.div
              key="otp"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6 mt-4"
            >
              <div className="flex flex-col items-center gap-4">
                <p className="text-sm text-muted-foreground text-center">
                  Enter the 6-digit code sent to{" "}
                  <span className="text-foreground font-medium">
                    {formData.email}
                  </span>
                </p>

                <InputOTP
                  maxLength={6}
                  value={otp}
                  onChange={(value) => setOtp(value)}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>

                <button
                  type="button"
                  onClick={handleResendOtp}
                  className="text-sm text-primary hover:underline"
                >
                  Didn't receive the code? Resend
                </button>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setStep("form")}
                >
                  Back
                </Button>
                <Button
                  className="flex-1"
                  onClick={handleOtpVerify}
                  disabled={isSubmitting || otp.length < 6}
                >
                  {isSubmitting ? (
                    <>
                      <span className="material-symbols-outlined animate-spin mr-2">
                        progress_activity
                      </span>
                      Verifying...
                    </>
                  ) : (
                    "Verify & Continue"
                  )}
                </Button>
              </div>
            </motion.div>
          )}

          {step === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-4 py-8"
            >
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-3xl text-primary">
                  check_circle
                </span>
              </div>
              <p className="text-center text-muted-foreground">
                Redirecting you to the project details...
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};
