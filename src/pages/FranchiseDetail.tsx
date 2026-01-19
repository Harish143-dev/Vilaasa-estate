import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ShareButtons } from "@/components/ShareButtons";
import { useToast } from "@/hooks/use-toast";
import Gallery from "@/components/Gallery";

const franchises: Record<
  string,
  {
    id: string;
    name: string;
    tagline: string;
    category: string;
    projectId: string;
    heroImage: string;
    description: string[];
    stats: { label: string; value: string }[];
    financials: { label: string; value: string }[];
    galleryImages: { image: string; name: string; description?: string }[];
    advantages: { icon: string; title: string; desc: string }[];
    locations: string[];
    investmentTiers: string[];
    supportFeatures?: { icon: string; title: string; desc: string }[];
    testimonial?: { quote: string; author: string; title: string };
  }
> = {
  "aurum-reserve": {
    id: "aurum-reserve",
    name: "The Aurum Reserve",
    tagline:
      "A defining moment in luxury patisserie and lounge culture. High-yield fractional ownership in Tier-1 metropolitan locations.",
    category: "Premium F&B",
    projectId: "#VE-2049",
    heroImage:
      "https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=1920&q=80",
    description: [
      "The Aurum Reserve represents the pinnacle of the 'Modern Heritage' café movement. Unlike traditional F&B models, Aurum leverages a centralized kitchen model to minimize on-site operational overhead while maximizing consistency and quality.",
      "Investors are invited to participate in the flagship expansion across Mumbai (Bandra West), Delhi (GK-II), and Bangalore (Indiranagar). This is a pure-play investment opportunity secured by prime real estate leases and operated by the award-winning Vilaasa Hospitality Group.",
      "With a curated menu designed by Michelin-starred consultants and interiors reminiscent of 1920s Art Deco fused with modern minimalism, The Aurum Reserve is poised to capture the high-spending millennial and Gen-Z demographic.",
    ],
    stats: [
      { label: "Min. Investment", value: "₹45 Lakhs" },
      { label: "Annual ROI", value: "18% - 24%" },
      { label: "Payback Period", value: "2.5 Years" },
      { label: "Model", value: "FOCO" },
    ],
    financials: [
      { label: "Total Project Cost", value: "₹ 2.5 Cr" },
      { label: "Min. Ticket Size", value: "₹ 45 Lakhs" },
      { label: "Lock-in Period", value: "36 Months" },
      { label: "Yield Payout", value: "Quarterly" },
    ],
    galleryImages: [
      {
        image:
          "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80",
        name: "Interiors",
        description: "Minimalist interior design with contemporary touches.",
      },
      {
        image:
          "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
        name: "Architecture",
        description: "A cozy coffee bar with a view of the coffee beans.",
      },
      {
        image:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
        name: "Materiality",
        description: "A cozy coffee bar with a view of the coffee beans.",
      },
    ],
    advantages: [
      {
        icon: "settings_suggest",
        title: "Zero Operations",
        desc: "Vilaasa Hospitality handles 100% of the daily operations, hiring, supply chain, and quality control. You simply own the asset.",
      },
      {
        icon: "monitor_heart",
        title: "Real-time Dashboard",
        desc: "Track your sales, expenses, and projected returns in real-time through our proprietary 'Vilaasa Pulse' investor app.",
      },
      {
        icon: "assured_workload",
        title: "Buy-Back Guarantee",
        desc: "We offer a guaranteed buy-back of your stake after the 5th year at fair market valuation, ensuring a secure exit strategy.",
      },
    ],
    locations: [
      "Mumbai (Bandra West)",
      "Delhi (GK-II)",
      "Bangalore (Indiranagar)",
    ],
    investmentTiers: ["₹ 50L - 1 Cr", "₹ 1 Cr - 3 Cr", "₹ 3 Cr+"],
  },
  "colton-coffee": {
    id: "colton-coffee",
    name: "Colton Coffee Co.",
    tagline:
      "Specialty coffee culture meets scalable franchise model. Premium third-wave coffee experience with proven unit economics.",
    category: "Specialty Coffee",
    projectId: "#VE-2051",
    heroImage:
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1920&q=80",
    description: [
      "Colton Coffee Co. brings the third-wave coffee revolution to India's rapidly growing café culture. With proprietary roasting techniques and single-origin beans sourced directly from estates in Coorg and Ethiopia, Colton offers a differentiated product in a crowded market.",
      "The franchise model is designed for rapid scalability with compact 800-1200 sq.ft. formats suitable for high-street locations, malls, and corporate parks. Each unit is engineered for maximum efficiency with a standardized equipment package.",
      "Backed by strategic partnerships with leading dairy and bakery suppliers, Colton maintains exceptional margins while delivering a premium customer experience.",
    ],
    stats: [
      { label: "Min. Investment", value: "₹25 Lakhs" },
      { label: "Annual ROI", value: "22% - 28%" },
      { label: "Payback Period", value: "18 Months" },
      { label: "Model", value: "FOFO" },
    ],
    financials: [
      { label: "Total Project Cost", value: "₹ 85 Lakhs" },
      { label: "Min. Ticket Size", value: "₹ 25 Lakhs" },
      { label: "Lock-in Period", value: "24 Months" },
      { label: "Yield Payout", value: "Monthly" },
    ],
    galleryImages: [
      {
        image:
          "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80",
        name: "Coffee Bar",
        description: "A cozy coffee bar with a view of the coffee beans.",
      },
      {
        image:
          "https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=800&q=80",
        name: "Ambience",
        description: "A cozy coffee bar with a view of the coffee beans.",
      },
      {
        image:
          "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80",
        name: "Product",
        description: "A cozy coffee bar with a view of the coffee beans.",
      },
    ],
    advantages: [
      {
        icon: "inventory_2",
        title: "Turnkey Setup",
        desc: "Complete store setup including equipment, interiors, and initial inventory provided. Open within 45 days of signing.",
      },
      {
        icon: "school",
        title: "Barista Academy",
        desc: "Comprehensive 2-week training program for your team at our Mumbai training center. Ongoing skill development included.",
      },
      {
        icon: "campaign",
        title: "Marketing Support",
        desc: "Centralized digital marketing, influencer partnerships, and seasonal campaigns handled by our in-house team.",
      },
    ],
    locations: [
      "Chennai (T. Nagar)",
      "Hyderabad (Jubilee Hills)",
      "Pune (Koregaon Park)",
      "Ahmedabad (SG Highway)",
    ],
    investmentTiers: ["₹ 25L - 50L", "₹ 50L - 1 Cr", "₹ 1 Cr+"],
  },
  "luxe-wellness": {
    id: "luxe-wellness",
    name: "Luxe Wellness Studios",
    tagline:
      "Premium wellness and spa franchise targeting the $15B Indian wellness market. Medical-grade treatments with luxury hospitality.",
    category: "Wellness & Spa",
    projectId: "#VE-2053",
    heroImage:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1920&q=80",
    description: [
      "Luxe Wellness Studios bridges the gap between medical-grade treatments and luxury spa experiences. Our proprietary treatment protocols, developed in partnership with leading dermatologists and wellness experts, deliver measurable results.",
      "The 3,000-5,000 sq.ft. format features treatment rooms, relaxation lounges, and retail areas. Each studio is designed to maximize revenue per square foot through efficient scheduling and premium service bundling.",
      "With the Indian wellness industry growing at 12% CAGR, Luxe is positioned to capture the premium segment seeking authentic, results-driven wellness experiences.",
    ],
    stats: [
      { label: "Min. Investment", value: "₹1.2 Cr" },
      { label: "Annual ROI", value: "20% - 26%" },
      { label: "Payback Period", value: "3 Years" },
      { label: "Model", value: "FOCO" },
    ],
    financials: [
      { label: "Total Project Cost", value: "₹ 4.5 Cr" },
      { label: "Min. Ticket Size", value: "₹ 1.2 Cr" },
      { label: "Lock-in Period", value: "48 Months" },
      { label: "Yield Payout", value: "Quarterly" },
    ],
    galleryImages: [
      {
        image:
          "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80",
        name: "Treatment Room",
        description: "A cozy coffee bar with a view of the coffee beans.",
      },
      {
        image:
          "https://images.unsplash.com/photo-1596178060810-72f53ce9a65c?w=800&q=80",
        name: "Lounge",
        description: "A cozy coffee bar with a view of the coffee beans.",
      },
      {
        image:
          "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=800&q=80",
        name: "Ambience",
        description: "A cozy coffee bar with a view of the coffee beans.",
      },
    ],
    advantages: [
      {
        icon: "medical_services",
        title: "Medical Advisory",
        desc: "Access to our panel of dermatologists and wellness experts for treatment protocols and staff training.",
      },
      {
        icon: "loyalty",
        title: "Membership Model",
        desc: "Recurring revenue through tiered membership programs. 65% of revenue from repeat customers.",
      },
      {
        icon: "handshake",
        title: "Corporate Tie-ups",
        desc: "Existing partnerships with 50+ corporates for employee wellness programs, providing steady B2B revenue.",
      },
    ],
    locations: [
      "Mumbai (Worli)",
      "Delhi (Vasant Vihar)",
      "Bangalore (Whitefield)",
      "Gurgaon (Golf Course Road)",
    ],
    investmentTiers: ["₹ 1 Cr - 2 Cr", "₹ 2 Cr - 5 Cr", "₹ 5 Cr+"],
  },
  "verde-organics": {
    id: "verde-organics",
    name: "Verde Organics",
    tagline:
      "Farm-to-table organic restaurant chain with vertical integration. Sustainable dining for the conscious consumer.",
    category: "Organic Dining",
    projectId: "#VE-2055",
    heroImage:
      "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=1920&q=80",
    description: [
      "Verde Organics is India's first fully integrated organic restaurant chain with its own farms, processing facilities, and retail outlets. Every ingredient is traceable to source, appealing to the rapidly growing health-conscious demographic.",
      "The restaurant format features an open kitchen concept, living walls, and a retail section for organic products. The 2,500 sq.ft. design is optimized for both dine-in and delivery operations.",
      "With organic food market in India growing at 25% annually and premium consumers willing to pay 30-40% more for certified organic, Verde presents a compelling investment thesis.",
    ],
    stats: [
      { label: "Min. Investment", value: "₹65 Lakhs" },
      { label: "Annual ROI", value: "16% - 22%" },
      { label: "Payback Period", value: "2.8 Years" },
      { label: "Model", value: "FOFO" },
    ],
    financials: [
      { label: "Total Project Cost", value: "₹ 1.8 Cr" },
      { label: "Min. Ticket Size", value: "₹ 65 Lakhs" },
      { label: "Lock-in Period", value: "36 Months" },
      { label: "Yield Payout", value: "Quarterly" },
    ],
    galleryImages: [
      {
        image:
          "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
        name: "Dining",
        description: "A cozy coffee bar with a view of the coffee beans.",
      },
      {
        image:
          "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
        name: "Kitchen",
        description: "A cozy coffee bar with a view of the coffee beans.",
      },
      {
        image:
          "https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=800&q=80",
        name: "Produce",
        description: "A cozy coffee bar with a view of the coffee beans.",
      },
    ],
    advantages: [
      {
        icon: "eco",
        title: "Integrated Supply",
        desc: "Direct sourcing from our network of 200+ certified organic farms ensures quality control and cost efficiency.",
      },
      {
        icon: "storefront",
        title: "Retail Revenue",
        desc: "Additional revenue stream through in-store retail of packaged organic products and meal kits.",
      },
      {
        icon: "delivery_dining",
        title: "Cloud Kitchen Ready",
        desc: "Format includes dedicated cloud kitchen infrastructure for delivery platforms, capturing the growing online ordering market.",
      },
    ],
    locations: [
      "Mumbai (Powai)",
      "Bangalore (HSR Layout)",
      "Chennai (Nungambakkam)",
      "Kolkata (Salt Lake)",
    ],
    investmentTiers: ["₹ 65L - 1 Cr", "₹ 1 Cr - 2 Cr", "₹ 2 Cr+"],
  },
  "elite-fitness": {
    id: "elite-fitness",
    name: "Elite Fitness Club",
    tagline:
      "Boutique fitness studios with premium equipment and personalized training. Targeting the urban professional demographic.",
    category: "Fitness & Gym",
    projectId: "#VE-2057",
    heroImage:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&q=80",
    description: [
      "Elite Fitness Club redefines the gym experience with boutique-sized studios featuring Technogym equipment, certified trainers, and small-group classes. The 4,000-6,000 sq.ft. format prioritizes quality over quantity.",
      "Unlike large-format gyms with 2,000+ members, Elite caps membership at 400 per location to ensure equipment availability and personalized attention. This premium positioning commands 3x the membership fee of traditional gyms.",
      "With the Indian fitness industry projected to reach $32B by 2030 and boutique fitness growing at 35% CAGR, Elite is positioned at the fastest-growing segment of the market.",
    ],
    stats: [
      { label: "Min. Investment", value: "₹85 Lakhs" },
      { label: "Annual ROI", value: "24% - 30%" },
      { label: "Payback Period", value: "2 Years" },
      { label: "Model", value: "FOCO" },
    ],
    financials: [
      { label: "Total Project Cost", value: "₹ 2.8 Cr" },
      { label: "Min. Ticket Size", value: "₹ 85 Lakhs" },
      { label: "Lock-in Period", value: "36 Months" },
      { label: "Yield Payout", value: "Monthly" },
    ],
    galleryImages: [
      {
        image:
          "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800&q=80",
        name: "Training Floor",
        description: "A cozy coffee bar with a view of the coffee beans.",
      },
      {
        image:
          "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&q=80",
        name: "Equipment",
        description: "A cozy coffee bar with a view of the coffee beans.",
      },
      {
        image:
          "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80",
        name: "Studio",
        description: "A cozy coffee bar with a view of the coffee beans.",
      },
    ],
    advantages: [
      {
        icon: "fitness_center",
        title: "Premium Equipment",
        desc: "Full Technogym setup included in investment. Equipment replacement and maintenance covered by central operations.",
      },
      {
        icon: "groups",
        title: "Trainer Network",
        desc: "Access to our certified trainer pool. All hiring, training, and HR management handled centrally.",
      },
      {
        icon: "trending_up",
        title: "High Retention",
        desc: "85% annual member retention rate due to personalized experience, ensuring stable recurring revenue.",
      },
    ],
    locations: [
      "Mumbai (Lower Parel)",
      "Delhi (Saket)",
      "Bangalore (Koramangala)",
      "Hyderabad (Banjara Hills)",
    ],
    investmentTiers: ["₹ 85L - 1.5 Cr", "₹ 1.5 Cr - 3 Cr", "₹ 3 Cr+"],
  },
  "artisan-bakehouse": {
    id: "artisan-bakehouse",
    name: "The Artisan Bakehouse",
    tagline:
      "European-style artisan bakery with in-house production. Fresh bread, pastries, and café culture combined.",
    category: "Bakery & Café",
    projectId: "#VE-2059",
    heroImage:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1920&q=80",
    description: [
      "The Artisan Bakehouse brings authentic European baking traditions to India with a modern twist. Each location features a visible bakery where customers can watch artisans at work, creating an experiential retail environment.",
      "The product range includes 40+ varieties of fresh bread, pastries, and specialty items. The café section serves coffee, breakfast, and light meals, maximizing revenue throughout the day.",
      "With the premium bakery segment growing at 18% annually and consumers increasingly seeking authentic artisan products, The Artisan Bakehouse offers a differentiated investment opportunity.",
    ],
    stats: [
      { label: "Min. Investment", value: "₹55 Lakhs" },
      { label: "Annual ROI", value: "20% - 26%" },
      { label: "Payback Period", value: "2.2 Years" },
      { label: "Model", value: "FOFO" },
    ],
    financials: [
      { label: "Total Project Cost", value: "₹ 1.5 Cr" },
      { label: "Min. Ticket Size", value: "₹ 55 Lakhs" },
      { label: "Lock-in Period", value: "30 Months" },
      { label: "Yield Payout", value: "Monthly" },
    ],
    galleryImages: [
      {
        image:
          "https://images.unsplash.com/photo-1517433670267-30f41c098b8f?w=800&q=80",
        name: "Bakery",
        description: "A cozy coffee bar with a view of the coffee beans.",
      },
      {
        image:
          "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80",
        name: "Products",
        description: "A cozy coffee bar with a view of the coffee beans.",
      },
      {
        image:
          "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=800&q=80",
        name: "Café",
        description: "A cozy coffee bar with a view of the coffee beans.",
      },
    ],
    advantages: [
      {
        icon: "bakery_dining",
        title: "Recipe Library",
        desc: "Access to 200+ proprietary recipes developed by our European master bakers. Regular seasonal additions.",
      },
      {
        icon: "local_shipping",
        title: "Central Commissary",
        desc: "Base doughs and specialty ingredients supplied from central facility, ensuring consistency and reducing on-site complexity.",
      },
      {
        icon: "shopping_bag",
        title: "B2B Channel",
        desc: "Additional revenue through catering and B2B supply to hotels and restaurants in your territory.",
      },
    ],
    locations: [
      "Mumbai (Juhu)",
      "Delhi (Khan Market)",
      "Bangalore (Church Street)",
      "Goa (Panjim)",
    ],
    investmentTiers: ["₹ 55L - 1 Cr", "₹ 1 Cr - 2 Cr", "₹ 2 Cr+"],
  },
  "colton-resort-chennai": {
    id: "colton-resort-chennai",
    name: "Colton Beach Resort",
    tagline:
      "Luxury beachfront resort with world-class amenities. Master franchise opportunity in premium coastal destinations.",
    category: "Resort",
    projectId: "#VE-3001",
    heroImage:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1920&q=80",
    description: [
      "Colton Beach Resort represents the pinnacle of hospitality investment in India's booming tourism sector. With strategic locations across Goa, Kerala, and Tamil Nadu coastlines, this is your gateway to the luxury resort business.",
      "Each resort features 50-100 keys with premium villas and suites, multiple F&B outlets, spa facilities, and curated experiences. The FOCO model ensures professional management while you enjoy quarterly returns.",
      "With India's domestic tourism growing at 15% CAGR and luxury segment outpacing at 22%, Colton Beach Resort offers exceptional risk-adjusted returns for the discerning investor.",
    ],
    stats: [
      { label: "Min. Investment", value: "₹2.5 Cr" },
      { label: "Annual ROI", value: "22% - 28%" },
      { label: "Payback Period", value: "3.5 Years" },
      { label: "Model", value: "FOCO" },
    ],
    financials: [
      { label: "Total Project Cost", value: "₹ 15 Cr" },
      { label: "Min. Ticket Size", value: "₹ 2.5 Cr" },
      { label: "Lock-in Period", value: "60 Months" },
      { label: "Yield Payout", value: "Quarterly" },
    ],
    galleryImages: [
      {
        image:
          "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
        name: "Beach View",
        description: "A cozy coffee bar with a view of the coffee beans.",
      },
      {
        image:
          "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80",
        name: "Pool Villa",
        description: "A cozy coffee bar with a view of the coffee beans.",
      },
      {
        image:
          "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
        name: "Restaurant",
        description: "A cozy coffee bar with a view of the coffee beans.",
      },
    ],
    advantages: [
      {
        icon: "settings_suggest",
        title: "Zero Operations",
        desc: "Vilaasa Hospitality handles all operations from staffing to guest services. Your role is purely as an investor.",
      },
      {
        icon: "monitor_heart",
        title: "Real-time Dashboard",
        desc: "Track occupancy, RevPAR, and returns through our proprietary investor portal with daily updates.",
      },
      {
        icon: "assured_workload",
        title: "Buy-Back Guarantee",
        desc: "Guaranteed buy-back at fair market valuation after year 7, ensuring a clear exit strategy.",
      },
    ],
    locations: [
      "Chennai (ECR)",
      "Goa (South)",
      "Kerala (Kovalam)",
      "Pondicherry",
    ],
    investmentTiers: ["₹ 2.5 Cr - 5 Cr", "₹ 5 Cr - 10 Cr", "₹ 10 Cr+"],
    supportFeatures: [
      {
        icon: "storefront",
        title: "Site Selection",
        desc: "AI-driven location analysis to identify high-potential coastal zones with premium tourist demographics.",
      },
      {
        icon: "design_services",
        title: "Turnkey Fitout",
        desc: "Complete architectural and interior design execution by our empanelled luxury hospitality contractors.",
      },
      {
        icon: "school",
        title: "Staff Training",
        desc: "Rigorous 8-week hospitality training program for all staff members at our Center of Excellence.",
      },
      {
        icon: "campaign",
        title: "Marketing HQ",
        desc: "Centralized digital marketing, OTA management, and PR campaigns managed by the corporate team.",
      },
    ],
    testimonial: {
      quote:
        "The Colton investment has been transformative for my portfolio. The quarterly dividends consistently outperform my traditional investments, and I love seeing the resort thrive.",
      author: "Arun Krishnamurthy",
      title: "Early Investor, Colton Beach Resort (Goa)",
    },
  },
  "luxe-saloon-mumbai": {
    id: "luxe-saloon-mumbai",
    name: "Luxe Premium Saloon",
    tagline:
      "Ultra-premium salon franchise targeting HNI clientele. European techniques with Indian hospitality.",
    category: "Saloon",
    projectId: "#VE-3002",
    heroImage:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1920&q=80",
    description: [
      "Luxe Premium Saloon redefines the grooming experience for India's elite. With interiors designed by leading hospitality architects and products sourced from premium European brands, Luxe commands the highest ticket sizes in the market.",
      "The 2,500-4,000 sq.ft. format features private suites, a relaxation lounge, and dedicated spaces for hair, skin, and nail services. Each salon is designed to maximize revenue per square foot through premium pricing.",
      "With the Indian beauty and personal care market growing at 12% CAGR and the premium segment at 18%, Luxe is positioned to capture the fastest-growing demographic.",
    ],
    stats: [
      { label: "Min. Investment", value: "₹85 Lakhs" },
      { label: "Annual ROI", value: "28% - 35%" },
      { label: "Payback Period", value: "2 Years" },
      { label: "Model", value: "FOCO" },
    ],
    financials: [
      { label: "Total Project Cost", value: "₹ 2.8 Cr" },
      { label: "Min. Ticket Size", value: "₹ 85 Lakhs" },
      { label: "Lock-in Period", value: "36 Months" },
      { label: "Yield Payout", value: "Monthly" },
    ],
    galleryImages: [
      {
        image:
          "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80",
        name: "Styling Suite",
        description: "A cozy coffee bar with a view of the coffee beans.",
      },
      {
        image:
          "https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?w=800&q=80",
        name: "Lounge",
        description: "A cozy coffee bar with a view of the coffee beans.",
      },
      {
        image:
          "https://images.unsplash.com/photo-1559599101-f09722fb4948?w=800&q=80",
        name: "Treatment",
        description: "A cozy coffee bar with a view of the coffee beans.",
      },
    ],
    advantages: [
      {
        icon: "inventory_2",
        title: "Turnkey Setup",
        desc: "Complete salon setup including imported equipment, premium products, and initial inventory. Open within 60 days.",
      },
      {
        icon: "school",
        title: "Stylist Academy",
        desc: "3-week intensive training in European techniques at our Mumbai training center. Quarterly upskilling included.",
      },
      {
        icon: "loyalty",
        title: "Membership Revenue",
        desc: "70% of revenue from membership clients ensuring predictable, recurring cash flows.",
      },
    ],
    locations: [
      "Mumbai (Bandra)",
      "Delhi (Defence Colony)",
      "Bangalore (Indiranagar)",
      "Hyderabad (Jubilee Hills)",
    ],
    investmentTiers: ["₹ 85L - 1.5 Cr", "₹ 1.5 Cr - 3 Cr", "₹ 3 Cr+"],
    supportFeatures: [
      {
        icon: "storefront",
        title: "Site Selection",
        desc: "Prime high-street and mall locations identified through our proprietary footfall analysis.",
      },
      {
        icon: "design_services",
        title: "Luxury Interiors",
        desc: "Award-winning interior designers create bespoke salon environments that command premium pricing.",
      },
      {
        icon: "school",
        title: "Team Training",
        desc: "Continuous training programs ensure your stylists deliver consistent, world-class service.",
      },
      {
        icon: "campaign",
        title: "Celebrity Marketing",
        desc: "Influencer partnerships and celebrity endorsements drive brand awareness and footfall.",
      },
    ],
    testimonial: {
      quote:
        "The monthly returns from my Luxe investment have been exceptional. The FOCO model means I dont need to worry about operations while enjoying steady income.",
      author: "Dr. Priya Reddy",
      title: "Investor, Luxe Premium Saloon (Bangalore)",
    },
  },
  "zen-wellness-goa": {
    id: "zen-wellness-goa",
    name: "Zen Wellness Spa",
    tagline:
      "Holistic wellness destination combining Ayurveda with modern spa science. Premium retreat experience.",
    category: "Wellness",
    projectId: "#VE-3003",
    heroImage:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1920&q=80",
    description: [
      "Zen Wellness Spa brings together ancient Ayurvedic wisdom and contemporary wellness science to create transformative experiences. Each spa is designed as a sanctuary for urban professionals seeking authentic wellness journeys.",
      "The 5,000-8,000 sq.ft. format includes treatment suites, meditation spaces, yoga studios, and wellness cafés. Our proprietary treatment protocols deliver measurable results that drive exceptional client retention.",
      "With the Indian wellness tourism market growing at 20% CAGR and wellness spending among HNIs increasing exponentially, Zen Wellness offers a compelling investment thesis.",
    ],
    stats: [
      { label: "Min. Investment", value: "₹1.2 Cr" },
      { label: "Annual ROI", value: "25% - 32%" },
      { label: "Payback Period", value: "2.5 Years" },
      { label: "Model", value: "FOCO" },
    ],
    financials: [
      { label: "Total Project Cost", value: "₹ 4.5 Cr" },
      { label: "Min. Ticket Size", value: "₹ 1.2 Cr" },
      { label: "Lock-in Period", value: "48 Months" },
      { label: "Yield Payout", value: "Quarterly" },
    ],
    galleryImages: [
      {
        image:
          "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80",
        name: "Treatment Suite",
        description: "A cozy coffee bar with a view of the coffee beans.",
      },
      {
        image:
          "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=800&q=80",
        name: "Meditation Hall",
        description: "A cozy coffee bar with a view of the coffee beans.",
      },
      {
        image:
          "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&q=80",
        name: "Yoga Studio",
        description: "A cozy coffee bar with a view of the coffee beans.",
      },
    ],
    advantages: [
      {
        icon: "medical_services",
        title: "Ayurveda Advisory",
        desc: "Access to our panel of Ayurvedic doctors and wellness experts for treatment protocols and guest consultations.",
      },
      {
        icon: "loyalty",
        title: "Retreat Packages",
        desc: "High-value retreat packages of 3-14 days drive significant revenue per guest.",
      },
      {
        icon: "handshake",
        title: "Corporate Wellness",
        desc: "B2B partnerships with 75+ corporates for executive wellness programs provide steady revenue streams.",
      },
    ],
    locations: ["Goa (Anjuna)", "Kerala (Alleppey)", "Rishikesh", "Coorg"],
    investmentTiers: ["₹ 1.2 Cr - 3 Cr", "₹ 3 Cr - 5 Cr", "₹ 5 Cr+"],
    supportFeatures: [
      {
        icon: "storefront",
        title: "Location Scouting",
        desc: "Serene locations identified for their natural beauty and accessibility to wellness tourism corridors.",
      },
      {
        icon: "design_services",
        title: "Zen Architecture",
        desc: "Biophilic design principles create healing environments that enhance the wellness experience.",
      },
      {
        icon: "school",
        title: "Therapist Training",
        desc: "6-week immersive training in Ayurveda, yoga, and modern spa techniques.",
      },
      {
        icon: "campaign",
        title: "Wellness Influencers",
        desc: "Partnerships with wellness influencers and retreat aggregators drive high-value bookings.",
      },
    ],
    testimonial: {
      quote:
        "Zen Wellness has been the perfect addition to my investment portfolio. The wellness tourism boom in India means consistent occupancy and strong returns.",
      author: "Sunita Iyer",
      title: "Investor, Zen Wellness Spa (Kerala)",
    },
  },
  "ayur-wellness-bangalore": {
    id: "ayur-wellness-bangalore",
    name: "Ayur Wellness Center",
    tagline:
      "Modern Ayurveda clinic with traditional treatments. Medical wellness for the health-conscious urban professional.",
    category: "Wellness",
    projectId: "#VE-3004",
    heroImage:
      "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=1920&q=80",
    description: [
      "Ayur Wellness Center bridges the gap between traditional Ayurveda and modern medical wellness. Our clinics offer doctor-supervised treatments, personalized wellness plans, and measurable health outcomes.",
      "The 3,000-5,000 sq.ft. format includes consultation rooms, treatment areas, pharmacy, and a wellness café. Each center is staffed with qualified Ayurvedic doctors and trained therapists.",
      "With growing distrust of synthetic medicines and increasing demand for preventive healthcare, Ayur Wellness is positioned to capture the rapidly expanding medical wellness segment.",
    ],
    stats: [
      { label: "Min. Investment", value: "₹95 Lakhs" },
      { label: "Annual ROI", value: "30% - 38%" },
      { label: "Payback Period", value: "2 Years" },
      { label: "Model", value: "FOCO" },
    ],
    financials: [
      { label: "Total Project Cost", value: "₹ 3.2 Cr" },
      { label: "Min. Ticket Size", value: "₹ 95 Lakhs" },
      { label: "Lock-in Period", value: "36 Months" },
      { label: "Yield Payout", value: "Monthly" },
    ],
    galleryImages: [
      {
        image:
          "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=800&q=80",
        name: "Consultation",
        description: "A cozy coffee bar with a view of the coffee beans.",
      },
      {
        image:
          "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80",
        name: "Treatment",
        description: "A cozy coffee bar with a view of the coffee beans.",
      },
      {
        image:
          "https://images.unsplash.com/photo-1598901847919-b95dd0fabbb5?w=800&q=80",
        name: "Pharmacy",
        description: "A cozy coffee bar with a view of the coffee beans.",
      },
    ],
    advantages: [
      {
        icon: "medical_services",
        title: "Doctor Network",
        desc: "Access to our empanelled network of 50+ BAMS doctors for staffing and protocol development.",
      },
      {
        icon: "science",
        title: "Proprietary Formulas",
        desc: "Exclusive access to 100+ proprietary Ayurvedic formulations manufactured in our GMP facility.",
      },
      {
        icon: "repeat",
        title: "Subscription Model",
        desc: "80% of revenue from subscription wellness plans ensuring predictable, recurring income.",
      },
    ],
    locations: [
      "Bangalore (Koramangala)",
      "Chennai (Adyar)",
      "Pune (Aundh)",
      "Hyderabad (HITEC City)",
    ],
    investmentTiers: ["₹ 95L - 2 Cr", "₹ 2 Cr - 4 Cr", "₹ 4 Cr+"],
    supportFeatures: [
      {
        icon: "storefront",
        title: "Clinic Design",
        desc: "Healthcare-compliant interiors that blend clinical efficiency with calming aesthetics.",
      },
      {
        icon: "design_services",
        title: "Equipment Package",
        desc: "Complete Panchakarma and therapy equipment from trusted medical suppliers.",
      },
      {
        icon: "school",
        title: "Medical Training",
        desc: "Continuous medical education for doctors and therapists at our academy.",
      },
      {
        icon: "campaign",
        title: "Health Marketing",
        desc: "Educational content marketing and health awareness campaigns drive qualified leads.",
      },
    ],
    testimonial: {
      quote:
        "The subscription model at Ayur Wellness creates incredible predictability. Monthly payouts are consistent, and the growing health consciousness is driving rapid expansion.",
      author: "Rajiv Menon",
      title: "Investor, Ayur Wellness (Chennai)",
    },
  },
  "wellness-resorts-kerala": {
    id: "wellness-resorts-kerala",
    name: "Wellness Resorts",
    tagline:
      "Experience authentic Ayurvedic treatments, yoga, and meditation. Transformative journeys rooted in 5,000 years of Indian healing wisdom.",
    category: "Wellness Resort",
    projectId: "#VE-4001",
    heroImage:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1920&q=80",
    description: [
      "Our Wellness Resorts in Kerala and Pondicherry offer immersive healing experiences combining ancient Ayurvedic practices with world-class hospitality. Each resort is designed as a sanctuary for transformation.",
      "Guests embark on personalized wellness journeys ranging from 7 to 21 days, including authentic Panchakarma treatments, daily yoga and meditation, organic Sattvic cuisine, and consultations with experienced Ayurvedic physicians.",
      "With wellness tourism in India growing at 20% annually and international travelers increasingly seeking authentic experiences, our resorts are positioned to capture premium rates and high occupancy.",
    ],
    stats: [
      { label: "Min. Investment", value: "₹3.5 Cr" },
      { label: "Annual ROI", value: "24% - 30%" },
      { label: "Payback Period", value: "3 Years" },
      { label: "Model", value: "FOCO" },
    ],
    financials: [
      { label: "Total Project Cost", value: "₹ 12 Cr" },
      { label: "Min. Ticket Size", value: "₹ 3.5 Cr" },
      { label: "Lock-in Period", value: "60 Months" },
      { label: "Yield Payout", value: "Quarterly" },
    ],
    galleryImages: [
      {
        image:
          "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80",
        name: "Treatment Suite",
        description: "A cozy coffee bar with a view of the coffee beans.",
      },
      {
        image:
          "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&q=80",
        name: "Yoga Pavilion",
        description: "A cozy coffee bar with a view of the coffee beans.",
      },
      {
        image:
          "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80",
        name: "Resort View",
        description: "A cozy coffee bar with a view of the coffee beans.",
      },
    ],
    advantages: [
      {
        icon: "spa",
        title: "Authentic Ayurveda",
        desc: "Treatments designed by Kerala Ayurveda University-trained physicians with 5,000 years of healing wisdom.",
      },
      {
        icon: "self_improvement",
        title: "Yoga & Meditation",
        desc: "Daily programs led by certified instructors in serene natural settings.",
      },
      {
        icon: "psychiatry",
        title: "Transformative Journeys",
        desc: "Curated wellness programs from 7 to 21 days for complete mind-body-spirit renewal.",
      },
    ],
    locations: [
      "Kerala (Alleppey)",
      "Kerala (Kovalam)",
      "Pondicherry (Auroville)",
      "Tamil Nadu (Mahabalipuram)",
    ],
    investmentTiers: ["₹ 3.5 Cr - 6 Cr", "₹ 6 Cr - 10 Cr", "₹ 10 Cr+"],
    supportFeatures: [
      {
        icon: "storefront",
        title: "Location Scouting",
        desc: "Premium locations selected for natural beauty, accessibility, and wellness tourism potential.",
      },
      {
        icon: "design_services",
        title: "Biophilic Design",
        desc: "Architecture that integrates nature, traditional Kerala elements, and sustainable materials.",
      },
      {
        icon: "school",
        title: "Ayurveda Training",
        desc: "Comprehensive training for therapists at our Kerala academy with ongoing certification.",
      },
      {
        icon: "campaign",
        title: "Global Marketing",
        desc: "International wellness tourism marketing targeting Europe, Middle East, and Americas.",
      },
    ],
    testimonial: {
      quote:
        "The wellness resort model has exceeded all expectations. International guests book months in advance, and the average stay of 14 days means exceptional revenue per guest.",
      author: "Dr. Lakshmi Nair",
      title: "Early Investor, Wellness Resorts (Kerala)",
    },
  },
  "carlton-wellness-spa": {
    id: "carlton-wellness-spa",
    name: "Carlton Wellness Spa",
    tagline:
      "Our signature spa brand offering bespoke wellness treatments, combining ancient Ayurvedic practices with contemporary spa therapies.",
    category: "Signature Spa",
    projectId: "#VE-4002",
    heroImage:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1920&q=80",
    description: [
      "Carlton Wellness Spa is our flagship spa brand integrated across all Carlton Hospitality properties. This franchise opportunity gives you ownership in a proven spa concept with guaranteed footfall from existing hotel guests.",
      "Each spa features signature treatment suites, relaxation lounges, hydrotherapy circuits, and retail boutiques. Our proprietary treatment menu combines Ayurvedic therapies with international spa techniques for a uniquely Indian luxury experience.",
      "With spa services commanding premium margins and strong repeat guest demand, Carlton Wellness Spa offers exceptional unit economics within the hospitality ecosystem.",
    ],
    stats: [
      { label: "Min. Investment", value: "₹1.8 Cr" },
      { label: "Annual ROI", value: "26% - 32%" },
      { label: "Payback Period", value: "2.5 Years" },
      { label: "Model", value: "FOCO" },
    ],
    financials: [
      { label: "Total Project Cost", value: "₹ 5.5 Cr" },
      { label: "Min. Ticket Size", value: "₹ 1.8 Cr" },
      { label: "Lock-in Period", value: "48 Months" },
      { label: "Yield Payout", value: "Monthly" },
    ],
    galleryImages: [
      {
        image:
          "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80",
        name: "Treatment Room",
        description:
          "Signature Ayurvedic therapies with contemporary spa techniques.",
      },
      {
        image:
          "https://images.unsplash.com/photo-1596178060810-72f53ce9a65c?w=800&q=80",
        name: "Relaxation Lounge",
        description: "A serene oasis for relaxation and rejuvenation.",
      },
      {
        image:
          "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=800&q=80",
        name: "Hydrotherapy",
        description: "Hydrotherapy circuits for rejuvenation and relaxation.",
      },
    ],
    advantages: [
      {
        icon: "verified",
        title: "Bespoke Treatments",
        desc: "Signature Carlton protocols combining global spa techniques with authentic Ayurveda.",
      },
      {
        icon: "hotel",
        title: "Integrated Model",
        desc: "Built into Carlton properties with guaranteed guest footfall and cross-promotion.",
      },
      {
        icon: "stars",
        title: "Signature Experiences",
        desc: "Exclusive product lines and rituals available only at Carlton Wellness Spas.",
      },
    ],
    locations: [
      "All Carlton Resort Properties",
      "Carlton Urban Hotels",
      "Carlton Heritage Properties",
      "New Developments",
    ],
    investmentTiers: ["₹ 1.8 Cr - 3 Cr", "₹ 3 Cr - 5 Cr", "₹ 5 Cr+"],
    supportFeatures: [
      {
        icon: "storefront",
        title: "Turnkey Setup",
        desc: "Complete spa buildout within existing Carlton properties with minimal construction complexity.",
      },
      {
        icon: "design_services",
        title: "Brand Standards",
        desc: "Signature Carlton design language ensuring consistency across all properties.",
      },
      {
        icon: "school",
        title: "Therapist Academy",
        desc: "4-week intensive training in Carlton signature treatments and service standards.",
      },
      {
        icon: "campaign",
        title: "Guest Marketing",
        desc: "Integrated marketing to hotel guests, membership programs, and local clientele.",
      },
    ],
    testimonial: {
      quote:
        "Investing in Carlton Spa was a no-brainer. Built-in hotel guests mean consistent bookings, and the monthly payouts have been remarkably steady.",
      author: "Vikram Malhotra",
      title: "Investor, Carlton Wellness Spa (Goa)",
    },
  },
};

const FranchiseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const franchise = franchises[id || "aurum-reserve"];
  const [selectedTier, setSelectedTier] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!franchise) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-light text-foreground mb-4">
            Franchise Not Found
          </h1>
          <Link to="/" className="text-primary hover:underline">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  const handleRequestAccess = async () => {
    if (!selectedTier) {
      toast({
        title: "Please select investment capacity",
        variant: "destructive",
      });
      return;
    }
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    toast({
      title: "Access Requested",
      description:
        "Our team will send the Investment Memorandum within 24 hours.",
    });
    setIsSubmitting(false);
  };

  return (
    <div className="overflow-x-hidden bg-background">
      <Navbar />

      {/* Hero Section */}
      <header className="relative min-h-[80vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent z-10" />
          <img
            src={franchise.heroImage}
            alt={franchise.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-20 w-full px-4 md:px-10 pb-16 pt-32">
          <div className="max-w-[1280px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col gap-4"
            >
              <div className="flex items-center gap-3 text-sm">
                <span className="px-3 py-1 bg-gold/20 text-gold-accent text-xs rounded font-bold uppercase tracking-wider">
                  {franchise.category}
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-foreground font-luxia">
                {franchise.name.split(" ").slice(0, -1).join(" ")} <br />
                <span className="italic text-gold-accent">
                  {franchise.name.split(" ").slice(-1)}
                </span>
              </h1>

              <div className="flex flex-col space-y-4 md:flex-row w-full justify-between ">
                <p className="text-muted-foreground text-lg max-w-2xl">
                  {franchise.tagline}
                </p>
                <ShareButtons
                  title={`${franchise.name} - ${franchise.category}`}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Stats Bar */}
      <section className="py-8 px-4 md:px-10 bg-card border-y border-border">
        <div className="max-w-[1280px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {franchise.stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">
                {stat.label}
              </p>
              <p className="text-foreground text-xl md:text-2xl font-medium">
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 px-4 md:px-10">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-gold-accent/60 uppercase tracking-[0.2em] text-xs font-bold">
              The Vision
            </span>
            <h2 className="text-3xl md:text-4xl font-light text-foreground mt-4 mb-8">
              Where culinary artistry meets{" "}
              <span className="italic text-gold-accent">
                intelligent capital.
              </span>
            </h2>
            {franchise.description.map((para, idx) => (
              <p
                key={idx}
                className="text-muted-foreground leading-relaxed mb-4"
              >
                {para}
              </p>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-3 gap-4"
          >
            <div className="text-center p-6 bg-card rounded-lg border border-border">
              <p className="text-3xl font-light text-gold-accent">
                {franchise.locations.length}
              </p>
              <p className="text-muted-foreground text-xs uppercase tracking-wider mt-2">
                Live Locations
              </p>
            </div>
            <div className="text-center p-6 bg-card rounded-lg border border-border">
              <p className="text-3xl font-light text-gold-accent">12k+</p>
              <p className="text-muted-foreground text-xs uppercase tracking-wider mt-2">
                Monthly Footfall
              </p>
            </div>
            <div className="text-center p-6 bg-card rounded-lg border border-border">
              <p className="text-3xl font-light text-gold-accent">4.8</p>
              <p className="text-muted-foreground text-xs uppercase tracking-wider mt-2">
                Avg Rating
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Financial Blueprint */}
      <section className="py-20 px-4 md:px-10 bg-[#0c1a14]">
        <div>
          <div className="flex items-center gap-2 mb-6">
            <span className="material-symbols-outlined text-gold-accent text-3xl">
              pie_chart
            </span>
            <h2 className="text-2xl font-light text-foreground">
              Financial Blueprint
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {franchise.financials.map((item) => (
              <div
                key={item.label}
                className="p-4 bg-background/50 rounded border border-border"
              >
                <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">
                  {item.label}
                </p>
                <p className="text-foreground text-lg font-medium">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wealth Projector CTA */}
      <section className="py-20 px-4 md:px-10 bg-background border-y border-border">
        <div className="max-w-[900px] mx-auto text-center">
          <span className="text-primary/60 uppercase tracking-[0.2em] text-xs font-bold">
            Financial Planning
          </span>
          <h2 className="text-3xl md:text-4xl font-light text-foreground mt-4 mb-4">
            Project Your <span className="italic text-primary">Returns</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Use our sophisticated Wealth Projector to estimate your potential
            returns across different currencies and geographies. Compare with
            traditional investments and make informed decisions.
          </p>
          <Link to="/wealth-projector">
            <Button variant="hero" size="lg" className="gap-2">
              <span className="material-symbols-outlined">calculate</span>
              Open Wealth Projector
            </Button>
          </Link>
        </div>
      </section>

      {/* Support & Training Section (for franchises with supportFeatures) */}
      {franchise.supportFeatures && (
        <section className="py-20 px-4 md:px-10 bg-card">
          <div className="max-w-[1280px] mx-auto">
            <div className="text-center mb-12">
              <span className="text-gold-accent/60 uppercase tracking-[0.2em] text-xs font-bold">
                Comprehensive Ecosystem
              </span>
              <h2 className="text-3xl font-light text-foreground mt-4 mb-4">
                Support & Training
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We provide end-to-end support to ensure your franchise asset
                performs at the highest level from day one.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {franchise.supportFeatures.map((feature, idx) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-6 bg-background rounded-lg border border-border"
                >
                  <span className="material-symbols-outlined text-3xl text-gold-accent mb-4 block">
                    {feature.icon}
                  </span>
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FOCO Advantage */}
      <section className="py-20 px-4 md:px-10">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-12">
            <span className="text-gold-accent/60 uppercase tracking-[0.2em] text-xs font-bold">
              Key Benefits
            </span>
            <h2 className="text-3xl font-light text-foreground mt-4 mb-4">
              The FOCO Advantage
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Franchise Owned, Company Operated. A completely hands-off
              investment model designed for busy professionals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {franchise.advantages.map((adv, idx) => (
              <motion.div
                key={adv.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 bg-card rounded-lg border border-border hover:border-gold-accent/50 transition-colors"
              >
                <span className="material-symbols-outlined text-4xl text-gold-accent mb-4 block">
                  {adv.icon}
                </span>
                <h3 className="text-xl font-medium text-foreground mb-3">
                  {adv.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {adv.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="py-20 px-4 md:px-10 bg-card border-t border-border">
        <div className="max-w-[800px] mx-auto">
          <div className="text-center mb-12">
            <span className="text-gold-accent/60 uppercase tracking-[0.2em] text-xs font-bold">
              Next Steps
            </span>
            <h2 className="text-3xl font-light text-foreground mt-4">
              Secure Your Legacy
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We provide end-to-end support to ensure your franchise asset
              performs at the highest level from day one.
            </p>
            <Link to="/calendar">
              <Button className="mt-10">Book a call today</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery  */}
      <Gallery property={franchise} />

      <Footer />
    </div>
  );
};

export default FranchiseDetail;
