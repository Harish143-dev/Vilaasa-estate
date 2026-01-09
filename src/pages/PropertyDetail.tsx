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

// Sample property data - in production this would come from an API/database
const properties: Record<
  string,
  {
    id: string;
    name: string;
    location: string;
    country: string;
    type: string;
    price: number;
    priceValue: string;
    status: string;
    heroImage: string;
    heroVideo?: string;
    description: string[];
    verdict: { quote: string; author: string; title: string };
    specs: { label: string; value: string }[];
    financials: {
      label: string;
      icon: string;
      value: string;
      trend: string;
      note: string;
    }[];
    configurations: {
      type: string;
      area: string;
      view: string;
      price: number;
    }[];
    galleryImages: { name: string; description: string; image: string }[];
    amenities: { icon: string; name: string; description: string }[];
    nearbyLocations: { name: string; distance: string }[];
  }
> = {
  "the-aurum": {
    id: "the-aurum",
    name: "The Aurum Residence",
    location: "London, UK",
    country: "UK",
    type: "Residential",
    price: 7000000,
    priceValue: "£4.2M",
    status: "Ready to Move",
    heroImage:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80",
    description: [
      "The Aurum Residence is not merely a home; it is an architectural statement. Drades inspiration from the Georgian grandeur of the surrounding estate, this development integrates classic proportions with state-of-the-art sustainable technology.",
      "Each residence offers panoramic views of the Royal Parks, featuring double-height ceilings, bespoke Italian joinery, and private elevator access. Designed for those who seek the privacy of a fortress with the openness of a gallery.",
    ],
    verdict: {
      quote:
        "An unmissable asset for the legacy portfolio. The Aurum combines rare freehold tenure in Zone 1 with a conservative 18% projected appreciation by 2026. A definitive 'Buy' rating for long-term hold.",
      author: "James Sterling",
      title: "Head of Acquisition",
    },
    specs: [
      { label: "Property Type", value: "Ultra-Luxury Condo" },
      { label: "Configuration", value: "3, 4 & 5 BHK" },
      { label: "Total Area", value: "2,800 - 6,500 Sq. Ft." },
      { label: "Possession", value: "Immediate" },
      { label: "Furnishing", value: "Fully Furnished" },
    ],
    financials: [
      {
        label: "Projected Rental Yield",
        icon: "trending_up",
        value: "4.2% p.a.",
        trend: "up",
        note: "20% above market average for Kensington.",
      },
      {
        label: "5-Year Appreciation",
        icon: "monitoring",
        value: "18-22%",
        trend: "up",
        note: "Driven by upcoming cross-rail connectivity.",
      },
      {
        label: "Breakeven Timeline",
        icon: "timelapse",
        value: "3.5 Years",
        trend: "neutral",
        note: "Calculated with 65% LTV mortgage leverage.",
      },
    ],
    configurations: [
      {
        type: "3 Bedroom Residence",
        area: "2,800 Sq. Ft.",
        view: "Garden View",
        price: 4000000,
      },
      {
        type: "4 Bedroom Duplex",
        area: "4,100 Sq. Ft.",
        view: "City Skyline",
        price: 4000000,
      },
      {
        type: "Royal Penthouse",
        area: "6,500 Sq. Ft.",
        view: "360° Panoramic",
        price: 4000000,
      },
    ],
    galleryImages: [
      {
        name: "Type A - 3 Bedroom",
        description: "East des • Garden Facing",
        image:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      },
      {
        name: "Type B - 4 Bedroom Duplex",
        description: "West des • Sunset View",
        image:
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
      },
    ],
    amenities: [
      {
        icon: "pool",
        name: "Infinity Pool",
        description: "Heated indoor lap pool with skyline views.",
      },
      {
        icon: "concierge",
        name: "24/7 White Glove",
        description: "Quintessentially concierge service.",
      },
      {
        icon: "spa",
        name: "Private Spa",
        description: "Hammam, sauna, and treatment rooms.",
      },
      {
        icon: "local_bar",
        name: "Residents' Club",
        description: "Cigar lounge and private wine cellar.",
      },
    ],
    nearbyLocations: [
      { name: "Hyde Park", distance: "2 mins walk" },
      { name: "Harrods", distance: "5 mins drive" },
      { name: "Heathrow Airport", distance: "35 mins drive" },
    ],
  },
  "palm-royale": {
    id: "palm-royale",
    name: "Palm Royale Villa",
    location: "Dubai, UAE",
    country: "UAE",
    type: "Residential",
    price: 4000000,
    priceValue: "AED 25M",
    status: "Under Construction",
    heroImage:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&q=80",
    description: [
      "Palm Royale Villa represents the pinnacle of waterfront living on the iconic Palm Jumeirah. This exclusive collection of signature villas combines Arabian heritage with contemporary luxury.",
      "Each villa features a private beach, infinity pool overlooking the Arabian Gulf, and direct yacht mooring. Smart home technology throughout ensures seamless living for the modern elite.",
    ],
    verdict: {
      quote: "A trophy asset in the world's most recognizable address.",
      author: "Aisha Rahman",
      title: "UAE Market Director",
    },
    specs: [
      { label: "Property Type", value: "Signature Villa" },
      { label: "Configuration", value: "5 & 6 BHK" },
      { label: "Total Area", value: "8,500 - 15,000 Sq. Ft." },
      { label: "Possession", value: "Q4 2025" },
      { label: "Furnishing", value: "Shell & Core" },
    ],
    financials: [
      {
        label: "Projected Rental Yield",
        icon: "trending_up",
        value: "5.8% p.a.",
        trend: "up",
        note: "Premium yields for Palm beachfront.",
      },
      {
        label: "5-Year Appreciation",
        icon: "monitoring",
        value: "25-30%",
        trend: "up",
        note: "Driven by Expo legacy infrastructure.",
      },
      {
        label: "Breakeven Timeline",
        icon: "timelapse",
        value: "2.8 Years",
        trend: "neutral",
        note: "With 50% LTV financing available.",
      },
    ],
    configurations: [
      {
        type: "5 Bedroom Villa",
        area: "8,500 Sq. Ft.",
        view: "Beach Front",
        price: 4000000,
      },
      {
        type: "6 Bedroom Villa",
        area: "12,000 Sq. Ft.",
        view: "Marina View",
        price: 4000000,
      },
    ],
    galleryImages: [
      {
        name: "Type A - 5 Bedroom",
        description: "Beach Plot • Sea Facing",
        image:
          "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
      },
    ],
    amenities: [
      {
        icon: "beach_access",
        name: "Private Beach",
        description: "100m exclusive beachfront access.",
      },
      {
        icon: "directions_boat",
        name: "Yacht Berth",
        description: "Direct marina access for 60ft vessels.",
      },
      {
        icon: "fitness_center",
        name: "Private Gym",
        description: "Technogym equipped fitness suite.",
      },
      {
        icon: "theater_comedy",
        name: "Home Cinema",
        description: "Dolby Atmos private screening room.",
      },
    ],
    nearbyLocations: [
      { name: "Atlantis", distance: "3 mins drive" },
      { name: "Dubai Marina", distance: "10 mins drive" },
      { name: "DXB Airport", distance: "25 mins drive" },
    ],
  },
  "manhattan-heights": {
    id: "manhattan-heights",
    name: "Manhattan Heights",
    location: "New York, USA",
    country: "USA",
    type: "Residential",
    price: 4000000,
    priceValue: "$8.5M",
    status: "Ready to Move",
    heroImage:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1920&q=80",
    description: [
      "Manhattan Heights offers an unparalleled living experience in the heart of Tribeca. Floor-to-ceiling windows frame iconic views of the Hudson River and downtown Manhattan skyline.",
      "Designed by award-winning architects, each residence features imported Italian marble, smart home automation, and private terraces overlooking the city that never sleeps.",
    ],
    verdict: {
      quote:
        "Prime Manhattan real estate with strong rental demand from global executives.",
      author: "Michael Chen",
      title: "Americas Director",
    },
    specs: [
      { label: "Property Type", value: "Luxury Penthouse" },
      { label: "Configuration", value: "3 & 4 BHK" },
      { label: "Total Area", value: "3,200 - 5,800 Sq. Ft." },
      { label: "Possession", value: "Immediate" },
      { label: "Furnishing", value: "Designer Furnished" },
    ],
    financials: [
      {
        label: "Projected Rental Yield",
        icon: "trending_up",
        value: "3.8% p.a.",
        trend: "up",
        note: "Premium Tribeca location demand.",
      },
      {
        label: "5-Year Appreciation",
        icon: "monitoring",
        value: "15-20%",
        trend: "up",
        note: "Limited inventory in prime Manhattan.",
      },
      {
        label: "Breakeven Timeline",
        icon: "timelapse",
        value: "4.2 Years",
        trend: "neutral",
        note: "With competitive financing rates.",
      },
    ],
    configurations: [
      {
        type: "3 Bedroom Penthouse",
        area: "3,200 Sq. Ft.",
        view: "River View",
        price: 4000000,
      },
      {
        type: "4 Bedroom Duplex",
        area: "5,800 Sq. Ft.",
        view: "Skyline View",
        price: 4000000,
      },
    ],
    galleryImages: [
      {
        name: "Type A - 3 Bedroom",
        description: "North Tower • River Facing",
        image:
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
      },
    ],
    amenities: [
      {
        icon: "pool",
        name: "Rooftop Pool",
        description: "Heated infinity pool with skyline views.",
      },
      {
        icon: "fitness_center",
        name: "Fitness Center",
        description: "24/7 Equinox-designed gym.",
      },
      {
        icon: "child_care",
        name: "Kids Club",
        description: "Supervised play area and learning center.",
      },
      {
        icon: "local_parking",
        name: "Valet Parking",
        description: "Private garage with EV charging.",
      },
    ],
    nearbyLocations: [
      { name: "Hudson River Park", distance: "2 mins walk" },
      { name: "Wall Street", distance: "10 mins drive" },
      { name: "JFK Airport", distance: "40 mins drive" },
    ],
  },
  "beverly-estate": {
    id: "beverly-estate",
    name: "Beverly Hills Estate",
    location: "Los Angeles, USA",
    country: "USA",
    type: "Residential",
    price: 4000000,
    priceValue: "$22M",
    status: "Ready to Move",
    heroImage:
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1920&q=80",
    description: [
      "This architectural masterpiece sits on 2 acres in the prestigious Trousdale Estates. Designed by a Pritzker Prize-winning architect, the estate seamlessly blends indoor and outdoor living.",
      "Features include a 75-foot infinity pool, professional-grade chef's kitchen, home theater, wine cellar, and a separate guest house. Privacy is paramount with gated entry and mature landscaping.",
    ],
    verdict: {
      quote:
        "Trophy property in one of the world's most exclusive zip codes. Strong appeal to entertainment industry executives.",
      author: "Sarah Martinez",
      title: "West Coast Director",
    },
    specs: [
      { label: "Property Type", value: "Estate Home" },
      { label: "Configuration", value: "7 BHK + Staff Quarters" },
      { label: "Total Area", value: "18,500 Sq. Ft." },
      { label: "Plot Size", value: "2 Acres" },
      { label: "Furnishing", value: "Move-in Ready" },
    ],
    financials: [
      {
        label: "Projected Rental Yield",
        icon: "trending_up",
        value: "2.5% p.a.",
        trend: "up",
        note: "Premium short-term rental potential.",
      },
      {
        label: "5-Year Appreciation",
        icon: "monitoring",
        value: "20-25%",
        trend: "up",
        note: "Limited Trousdale inventory.",
      },
      {
        label: "Breakeven Timeline",
        icon: "timelapse",
        value: "5 Years",
        trend: "neutral",
        note: "Long-term hold recommended.",
      },
    ],
    configurations: [
      {
        type: "Main Estate",
        area: "18,500 Sq. Ft.",
        view: "City & Ocean",
        price: 4000000,
      },
    ],
    galleryImages: [
      {
        name: "Main Residence",
        description: "Hilltop • Panoramic Views",
        image:
          "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      },
    ],
    amenities: [
      {
        icon: "pool",
        name: "Infinity Pool",
        description: "75-foot pool with city views.",
      },
      {
        icon: "theater_comedy",
        name: "Home Theater",
        description: "20-seat Dolby cinema experience.",
      },
      {
        icon: "local_bar",
        name: "Wine Cellar",
        description: "Temperature-controlled 500-bottle cellar.",
      },
      {
        icon: "sports_tennis",
        name: "Tennis Court",
        description: "Professional-grade court with lighting.",
      },
    ],
    nearbyLocations: [
      { name: "Rodeo Drive", distance: "5 mins drive" },
      { name: "Getty Center", distance: "15 mins drive" },
      { name: "LAX Airport", distance: "30 mins drive" },
    ],
  },
  "marina-bay-penthouse": {
    id: "marina-bay-penthouse",
    name: "Marina Bay Penthouse",
    location: "Singapore",
    country: "Singapore",
    type: "Residential",
    price: 4000000,
    priceValue: "SGD 15M",
    status: "Ready to Move",
    heroImage:
      "https://images.unsplash.com/photo-1565967511849-76a60a516170?w=1920&q=80",
    description: [
      "Perched atop one of Marina Bay's most prestigious towers, this penthouse offers 360-degree views of the Singapore skyline, Marina Bay Sands, and the South China Sea.",
      "The residence features a private rooftop terrace, butler service, and direct access to the building's exclusive sky lounge and infinity pool.",
    ],
    verdict: {
      quote:
        "Singapore's safe-haven status and limited land supply make this a compelling long-term hold.",
      author: "David Tan",
      title: "APAC Director",
    },
    specs: [
      { label: "Property Type", value: "Super Penthouse" },
      { label: "Configuration", value: "4 BHK + Study" },
      { label: "Total Area", value: "6,200 Sq. Ft." },
      { label: "Possession", value: "Immediate" },
      { label: "Furnishing", value: "Fully Furnished" },
    ],
    financials: [
      {
        label: "Projected Rental Yield",
        icon: "trending_up",
        value: "3.2% p.a.",
        trend: "up",
        note: "Strong expat executive demand.",
      },
      {
        label: "5-Year Appreciation",
        icon: "monitoring",
        value: "12-18%",
        trend: "up",
        note: "Limited ultra-luxury supply.",
      },
      {
        label: "Breakeven Timeline",
        icon: "timelapse",
        value: "4.5 Years",
        trend: "neutral",
        note: "Stable SGD currency advantage.",
      },
    ],
    configurations: [
      {
        type: "Super Penthouse",
        area: "6,200 Sq. Ft.",
        view: "Marina Bay",
        price: 4000000,
      },
    ],
    galleryImages: [
      {
        name: "Penthouse Level",
        description: "Tower Crown • 360° Views",
        image:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      },
    ],
    amenities: [
      {
        icon: "roofing",
        name: "Private Terrace",
        description: "1,200 sq.ft. rooftop entertaining space.",
      },
      {
        icon: "room_service",
        name: "Butler Service",
        description: "24/7 dedicated butler and concierge.",
      },
      {
        icon: "pool",
        name: "Sky Pool",
        description: "Residents-only infinity pool at 50th floor.",
      },
      {
        icon: "local_dining",
        name: "Private Dining",
        description: "Bookable chef's table for 12 guests.",
      },
    ],
    nearbyLocations: [
      { name: "Marina Bay Sands", distance: "3 mins walk" },
      { name: "Orchard Road", distance: "8 mins drive" },
      { name: "Changi Airport", distance: "20 mins drive" },
    ],
  },
  "monaco-harbour": {
    id: "monaco-harbour",
    name: "Monaco Harbour Residence",
    location: "Monte Carlo, Monaco",
    country: "Monaco",
    type: "Residential",
    price: 4000000,
    priceValue: "€18M",
    status: "Ready to Move",
    heroImage:
      "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=1920&q=80",
    description: [
      "An exceptional opportunity to own in the world's most exclusive principality. This residence overlooks Port Hercules with views of the superyacht marina and the Mediterranean.",
      "Monaco's tax-advantaged status, combined with limited real estate inventory, creates a unique value proposition for ultra-high-net-worth individuals seeking both lifestyle and wealth preservation.",
    ],
    verdict: {
      quote:
        "Monaco real estate has never depreciated. Zero income tax and wealth concentration make this a generational asset.",
      author: "François Dubois",
      title: "European Director",
    },
    specs: [
      { label: "Property Type", value: "Harbour Apartment" },
      { label: "Configuration", value: "3 BHK" },
      { label: "Total Area", value: "2,800 Sq. Ft." },
      { label: "Possession", value: "Immediate" },
      { label: "Furnishing", value: "Luxury Furnished" },
    ],
    financials: [
      {
        label: "Projected Rental Yield",
        icon: "trending_up",
        value: "2.8% p.a.",
        trend: "up",
        note: "High-season F1 and yacht show demand.",
      },
      {
        label: "5-Year Appreciation",
        icon: "monitoring",
        value: "15-20%",
        trend: "up",
        note: "Scarcity-driven appreciation.",
      },
      {
        label: "Breakeven Timeline",
        icon: "timelapse",
        value: "5.5 Years",
        trend: "neutral",
        note: "Wealth preservation focus.",
      },
    ],
    configurations: [
      {
        type: "Harbour View Suite",
        area: "2,800 Sq. Ft.",
        view: "Port Hercules",
        price: 4000000,
      },
    ],
    galleryImages: [
      {
        name: "Main Residence",
        description: "Harbour Front",
        image:
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
      },
    ],
    amenities: [
      {
        icon: "directions_boat",
        name: "Yacht Access",
        description: "Priority berth allocation in Port Hercules.",
      },
      {
        icon: "casino",
        name: "Casino Access",
        description: "VIP membership to Casino de Monte-Carlo.",
      },
      {
        icon: "sports_motorsports",
        name: "F1 Views",
        description: "Balcony overlooking the Grand Prix circuit.",
      },
      {
        icon: "security",
        name: "24/7 Security",
        description: "Discrete professional security services.",
      },
    ],
    nearbyLocations: [
      { name: "Casino Square", distance: "2 mins walk" },
      { name: "Nice Airport", distance: "30 mins drive" },
      { name: "Cannes", distance: "45 mins drive" },
    ],
  },
  "swiss-alps-chalet": {
    id: "swiss-alps-chalet",
    name: "Swiss Alps Chalet",
    location: "Verbier, Switzerland",
    country: "Switzerland",
    type: "Residential",
    price: 4000000,
    priceValue: "CHF 12M",
    status: "Ready to Move",
    heroImage:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1920&q=80",
    description: [
      "A stunning alpine retreat in Verbier's most coveted enclave. This chalet combines traditional Swiss craftsmanship with contemporary luxury across five levels.",
      "Features include ski-in/ski-out access, indoor pool, spa, and a wine cave. The property enjoys south-facing exposure with panoramic views of the Grand Combin.",
    ],
    verdict: {
      quote:
        "Swiss real estate offers unmatched stability. Verbier's international appeal ensures strong rental income during ski season.",
      author: "Hans Mueller",
      title: "Alpine Markets Director",
    },
    specs: [
      { label: "Property Type", value: "Alpine Chalet" },
      { label: "Configuration", value: "6 BHK" },
      { label: "Total Area", value: "8,500 Sq. Ft." },
      { label: "Possession", value: "Immediate" },
      { label: "Furnishing", value: "Fully Furnished" },
    ],
    financials: [
      {
        label: "Projected Rental Yield",
        icon: "trending_up",
        value: "4.5% p.a.",
        trend: "up",
        note: "Premium ski-season rates.",
      },
      {
        label: "5-Year Appreciation",
        icon: "monitoring",
        value: "10-15%",
        trend: "up",
        note: "Limited foreign ownership quota.",
      },
      {
        label: "Breakeven Timeline",
        icon: "timelapse",
        value: "3.8 Years",
        trend: "neutral",
        note: "Strong CHF currency.",
      },
    ],
    configurations: [
      {
        type: "Grand Chalet",
        area: "8,500 Sq. Ft.",
        view: "Mountain Panorama",
        price: 4000000,
      },
    ],
    galleryImages: [
      {
        name: "Main Chalet",
        description: "Ski-in/Ski-out Access",
        image:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      },
    ],
    amenities: [
      {
        icon: "downhill_skiing",
        name: "Ski Access",
        description: "Direct piste access to 4 Vallées.",
      },
      {
        icon: "pool",
        name: "Indoor Pool",
        description: "Heated pool with mountain views.",
      },
      {
        icon: "hot_tub",
        name: "Spa Suite",
        description: "Sauna, hammam, and treatment room.",
      },
      {
        icon: "local_fire_department",
        name: "Fireplace Lounge",
        description: "Triple-height living with log fire.",
      },
    ],
    nearbyLocations: [
      { name: "Verbier Village", distance: "3 mins drive" },
      { name: "Geneva Airport", distance: "2 hours drive" },
      { name: "Zermatt", distance: "1.5 hours drive" },
    ],
  },
  "mumbai-sea-link": {
    id: "mumbai-sea-link",
    name: "Sea Link Towers",
    location: "Mumbai, India",
    country: "India",
    type: "Residential",
    price: 4000000,
    priceValue: "₹18 Cr",
    status: "Under Construction",
    heroImage:
      "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=1920&q=80",
    description: [
      "Mumbai's newest ultra-luxury address overlooking the Bandra-Worli Sea Link. These residences offer unobstructed Arabian Sea views from every room.",
      "Developed by India's most trusted luxury developer, the project features 14-foot ceilings, private elevators, and a 100,000 sq.ft. clubhouse with world-class amenities.",
    ],
    verdict: {
      quote:
        "Sea-facing inventory in South Mumbai is increasingly rare. Strong capital appreciation expected post-completion.",
      author: "Rajesh Sharma",
      title: "India Markets Director",
    },
    specs: [
      { label: "Property Type", value: "Ultra-Luxury Apartment" },
      { label: "Configuration", value: "4 & 5 BHK" },
      { label: "Total Area", value: "4,500 - 8,000 Sq. Ft." },
      { label: "Possession", value: "Q2 2026" },
      { label: "Furnishing", value: "Semi-Furnished" },
    ],
    financials: [
      {
        label: "Projected Rental Yield",
        icon: "trending_up",
        value: "2.8% p.a.",
        trend: "up",
        note: "Premium corporate leasing demand.",
      },
      {
        label: "5-Year Appreciation",
        icon: "monitoring",
        value: "35-45%",
        trend: "up",
        note: "Pre-launch pricing advantage.",
      },
      {
        label: "Breakeven Timeline",
        icon: "timelapse",
        value: "4 Years",
        trend: "neutral",
        note: "Post-possession rental income.",
      },
    ],
    configurations: [
      {
        type: "4 BHK Sea View",
        area: "4,500 Sq. Ft.",
        view: "Sea Link",
        price: 4000000,
      },
      {
        type: "5 BHK Penthouse",
        area: "8,000 Sq. Ft.",
        view: "Panoramic Sea",
        price: 4000000,
      },
    ],
    galleryImages: [
      {
        name: "Type A - 4 BHK",
        description: "Tower A • Sea Facing",
        image:
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
      },
    ],
    amenities: [
      {
        icon: "pool",
        name: "Infinity Pool",
        description: "Temperature-controlled sea-facing pool.",
      },
      {
        icon: "spa",
        name: "Luxury Spa",
        description: "Full-service spa with international therapists.",
      },
      {
        icon: "golf_course",
        name: "Golf Simulator",
        description: "Professional golf simulation lounge.",
      },
      {
        icon: "restaurant",
        name: "Private Dining",
        description: "Residents-only gourmet restaurant.",
      },
    ],
    nearbyLocations: [
      { name: "Bandra Kurla Complex", distance: "10 mins drive" },
      { name: "Mumbai Airport", distance: "25 mins drive" },
      { name: "Worli Sea Face", distance: "5 mins drive" },
    ],
  },
  "goa-beach-villa": {
    id: "goa-beach-villa",
    name: "Goa Beachfront Villa",
    location: "North Goa, India",
    country: "India",
    type: "Residential",
    price: 4000000,
    priceValue: "₹8.5 Cr",
    status: "Ready to Move",
    heroImage:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920&q=80",
    description: [
      "An exclusive collection of beachfront villas in North Goa's most prestigious enclave. Each villa offers direct beach access and unobstructed Arabian Sea views.",
      "Portuguese-inspired architecture meets contemporary luxury with private pools, landscaped gardens, and staff quarters. Perfect as a vacation home or premium rental investment.",
    ],
    verdict: {
      quote:
        "Goa beachfront properties are extremely limited. Strong rental yields from luxury tourism make this a compelling investment.",
      author: "Vikram Desai",
      title: "Leisure Assets Director",
    },
    specs: [
      { label: "Property Type", value: "Beach Villa" },
      { label: "Configuration", value: "4 & 5 BHK" },
      { label: "Total Area", value: "5,500 - 7,500 Sq. Ft." },
      { label: "Plot Size", value: "1,200 Sq. Yards" },
      { label: "Furnishing", value: "Fully Furnished" },
    ],
    financials: [
      {
        label: "Projected Rental Yield",
        icon: "trending_up",
        value: "6.5% p.a.",
        trend: "up",
        note: "Premium holiday rental rates.",
      },
      {
        label: "5-Year Appreciation",
        icon: "monitoring",
        value: "25-30%",
        trend: "up",
        note: "Scarcity of beachfront land.",
      },
      {
        label: "Breakeven Timeline",
        icon: "timelapse",
        value: "2.5 Years",
        trend: "neutral",
        note: "High occupancy during peak season.",
      },
    ],
    configurations: [
      {
        type: "4 BHK Beach Villa",
        area: "5,500 Sq. Ft.",
        view: "Direct Beach",
        price: 4000000,
      },
      {
        type: "5 BHK Estate Villa",
        area: "7,500 Sq. Ft.",
        view: "Panoramic Sea",
        price: 4000000,
      },
    ],
    galleryImages: [
      {
        name: "Villa Type A",
        description: "Beachfront Row",
        image:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      },
    ],
    amenities: [
      {
        icon: "beach_access",
        name: "Private Beach",
        description: "50m exclusive beach frontage.",
      },
      {
        icon: "pool",
        name: "Infinity Pool",
        description: "Sea-facing private pool.",
      },
      {
        icon: "outdoor_grill",
        name: "Outdoor Kitchen",
        description: "BBQ deck and alfresco dining.",
      },
      {
        icon: "local_florist",
        name: "Tropical Garden",
        description: "Landscaped gardens with mature palms.",
      },
    ],
    nearbyLocations: [
      { name: "Candolim Beach", distance: "2 mins walk" },
      { name: "Panjim City", distance: "20 mins drive" },
      { name: "Goa Airport", distance: "45 mins drive" },
    ],
  },
  "heritage-villa-chennai": {
    id: "heritage-villa-chennai",
    name: "Heritage Villa",
    location: "Chennai, India",
    country: "India",
    type: "Villa",
    price: 4000000,
    priceValue: "₹4.5 Cr",
    status: "Ready to Move",
    heroImage:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80",
    description: [
      "A magnificent heritage villa in Chennai's most prestigious neighborhood, blending traditional South Indian architecture with modern luxury amenities.",
      "This property features intricate woodwork, handcrafted pillars, and a central courtyard that brings natural light and ventilation. The perfect blend of ancestral charm and contemporary comfort.",
    ],
    verdict: {
      quote:
        "Heritage properties in Chennai are increasingly rare. This villa offers both cultural significance and strong appreciation potential.",
      author: "Priya Sharma",
      title: "South India Director",
    },
    specs: [
      { label: "Property Type", value: "Heritage Villa" },
      { label: "Configuration", value: "4 BHK + Pooja Room" },
      { label: "Total Area", value: "4,200 Sq. Ft." },
      { label: "Plot Size", value: "6,000 Sq. Ft." },
      { label: "Furnishing", value: "Semi-Furnished" },
    ],
    financials: [
      {
        label: "Projected Rental Yield",
        icon: "trending_up",
        value: "3.5% p.a.",
        trend: "up",
        note: "Strong demand for heritage stays.",
      },
      {
        label: "5-Year Appreciation",
        icon: "monitoring",
        value: "20-25%",
        trend: "up",
        note: "Heritage properties appreciate faster.",
      },
      {
        label: "Breakeven Timeline",
        icon: "timelapse",
        value: "4 Years",
        trend: "neutral",
        note: "Stable Chennai market.",
      },
    ],
    configurations: [
      {
        type: "Heritage Villa",
        area: "4,200 Sq. Ft.",
        view: "Garden View",
        price: 4000000,
      },
    ],
    galleryImages: [
      {
        name: "Ground Floor",
        description: "Main des • Garden Facing",
        image:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      },
    ],
    amenities: [
      {
        icon: "yard",
        name: "Traditional Garden",
        description: "Landscaped garden with native plants.",
      },
      {
        icon: "temple_hindu",
        name: "Pooja Room",
        description: "Dedicated worship space with marble flooring.",
      },
      {
        icon: "garage",
        name: "Covered Parking",
        description: "Space for 3 vehicles.",
      },
      {
        icon: "water_drop",
        name: "Rainwater Harvest",
        description: "Sustainable water management system.",
      },
    ],
    nearbyLocations: [
      { name: "Marina Beach", distance: "15 mins drive" },
      { name: "Chennai Airport", distance: "25 mins drive" },
      { name: "IT Corridor", distance: "20 mins drive" },
    ],
  },
  "sea-view-apartment": {
    id: "sea-view-apartment",
    name: "Sea View Apartment",
    location: "Goa, India",
    country: "India",
    type: "Apartment",
    price: 4000000,
    priceValue: "₹2.8 Cr",
    status: "Ready to Move",
    heroImage:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1920&q=80",
    description: [
      "A stunning sea-facing apartment in North Goa's most exclusive high-rise development. Floor-to-ceiling windows offer panoramic views of the Arabian Sea.",
      "Modern interiors with premium finishes, smart home automation, and access to world-class amenities. Ideal for vacation living or premium rental income.",
    ],
    verdict: {
      quote:
        "Goa's apartment market is booming with remote work culture. Sea-view units command premium rentals.",
      author: "Rohan Mendes",
      title: "Goa Market Expert",
    },
    specs: [
      { label: "Property Type", value: "Luxury Apartment" },
      { label: "Configuration", value: "3 BHK" },
      { label: "Total Area", value: "1,800 Sq. Ft." },
      { label: "Possession", value: "Immediate" },
      { label: "Furnishing", value: "Fully Furnished" },
    ],
    financials: [
      {
        label: "Projected Rental Yield",
        icon: "trending_up",
        value: "7% p.a.",
        trend: "up",
        note: "High season rental demand.",
      },
      {
        label: "5-Year Appreciation",
        icon: "monitoring",
        value: "18-22%",
        trend: "up",
        note: "Grodes luxury segment.",
      },
      {
        label: "Breakeven Timeline",
        icon: "timelapse",
        value: "2.5 Years",
        trend: "neutral",
        note: "Strong Airbnb potential.",
      },
    ],
    configurations: [
      {
        type: "3 BHK Sea View",
        area: "1,800 Sq. Ft.",
        view: "Ocean Front",
        price: 4000000,
      },
    ],
    galleryImages: [
      {
        name: "Type A - 3 BHK",
        description: "Tower A • Sea Facing",
        image:
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
      },
    ],
    amenities: [
      {
        icon: "pool",
        name: "Infinity Pool",
        description: "Rooftop pool with sea views.",
      },
      {
        icon: "fitness_center",
        name: "Gym",
        description: "Fully equipped fitness center.",
      },
      {
        icon: "beach_access",
        name: "Beach Access",
        description: "Private beach just 5 mins walk.",
      },
      {
        icon: "local_cafe",
        name: "Café Lounge",
        description: "In-house café and co-working space.",
      },
    ],
    nearbyLocations: [
      { name: "Baga Beach", distance: "10 mins drive" },
      { name: "Panjim", distance: "25 mins drive" },
      { name: "Goa Airport", distance: "50 mins drive" },
    ],
  },
  "premium-plot-mumbai": {
    id: "premium-plot-mumbai",
    name: "Premium Plot",
    location: "Mumbai, India",
    country: "India",
    type: "Plot",
    price: 4000000,
    priceValue: "₹1.2 Cr",
    status: "Available",
    heroImage:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1920&q=80",
    description: [
      "A prime residential plot in Mumbai's rapidly developing suburban corridor. Clear titles, approved layout, and excellent connectivity to the city center.",
      "Perfect for building your dream home or as a long-term investment. The area is witnessing rapid infrastructure development with upcoming metro connectivity.",
    ],
    verdict: {
      quote:
        "Land in Mumbai suburbs is the safest bet for long-term appreciation. Limited supply ensures consistent value growth.",
      author: "Anil Kapoor",
      title: "Mumbai Land Expert",
    },
    specs: [
      { label: "Property Type", value: "Residential Plot" },
      { label: "Plot Size", value: "2,400 Sq. Ft." },
      { label: "FSI", value: "1.0" },
      { label: "Status", value: "NA Converted" },
      { label: "Boundary", value: "Compound Wall" },
    ],
    financials: [
      {
        label: "Projected Appreciation",
        icon: "trending_up",
        value: "12% p.a.",
        trend: "up",
        note: "Metro corridor growth.",
      },
      {
        label: "5-Year Appreciation",
        icon: "monitoring",
        value: "60-70%",
        trend: "up",
        note: "Infrastructure driven.",
      },
      {
        label: "Construction Potential",
        icon: "timelapse",
        value: "2,400 Sq. Ft.",
        trend: "neutral",
        note: "Based on current FSI.",
      },
    ],
    configurations: [
      {
        type: "Corner Plot",
        area: "2,400 Sq. Ft.",
        view: "East Facing",
        price: 4000000,
      },
    ],
    galleryImages: [
      {
        name: "Plot Layout",
        description: "Phase 2 • Corner Position",
        image:
          "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
      },
    ],
    amenities: [
      {
        icon: "water_drop",
        name: "Water Supply",
        description: "Municipal water connection available.",
      },
      {
        icon: "electrical_services",
        name: "Electricity",
        description: "MSEB connection ready.",
      },
      {
        icon: "road",
        name: "Road Access",
        description: "30-feet wide approach road.",
      },
      {
        icon: "park",
        name: "Green Zone",
        description: "Adjacent to reserved green belt.",
      },
    ],
    nearbyLocations: [
      { name: "Proposed Metro Station", distance: "800m" },
      { name: "Western Express Highway", distance: "5 mins drive" },
      { name: "Mumbai Airport", distance: "35 mins drive" },
    ],
  },
  "luxury-villa-goa": {
    id: "luxury-villa-goa",
    name: "Luxury Villa",
    location: "Goa, India",
    country: "India",
    type: "Villa",
    price: 4000000,
    priceValue: "₹6.5 Cr",
    status: "Under Construction",
    heroImage:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920&q=80",
    description: [
      "An ultra-luxury villa in South Goa's most serene enclave. Contemporary architecture with Portuguese influences, designed by award-winning architects.",
      "Features include a private pool, landscaped gardens, outdoor entertainment area, and staff quarters. Perfect for those seeking privacy and exclusivity.",
    ],
    verdict: {
      quote:
        "South Goa luxury villas are seeing unprecedented demand from HNIs seeking second homes. Limited inventory ensures premium appreciation.",
      author: "Vikram Desai",
      title: "Leisure Assets Director",
    },
    specs: [
      { label: "Property Type", value: "Luxury Villa" },
      { label: "Configuration", value: "5 BHK + Staff" },
      { label: "Total Area", value: "6,800 Sq. Ft." },
      { label: "Plot Size", value: "12,000 Sq. Ft." },
      { label: "Possession", value: "Q2 2026" },
    ],
    financials: [
      {
        label: "Projected Rental Yield",
        icon: "trending_up",
        value: "5.5% p.a.",
        trend: "up",
        note: "Luxury holiday rental market.",
      },
      {
        label: "5-Year Appreciation",
        icon: "monitoring",
        value: "30-35%",
        trend: "up",
        note: "Premium segment growth.",
      },
      {
        label: "Breakeven Timeline",
        icon: "timelapse",
        value: "3 Years",
        trend: "neutral",
        note: "High-end tourism demand.",
      },
    ],
    configurations: [
      {
        type: "5 BHK Luxury Villa",
        area: "6,800 Sq. Ft.",
        view: "Garden & Pool",
        price: 4000000,
      },
    ],
    galleryImages: [
      {
        name: "Villa Layout",
        description: "Exclusive Enclave",
        image:
          "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
      },
    ],
    amenities: [
      {
        icon: "pool",
        name: "Private Pool",
        description: "25m infinity pool with deck.",
      },
      {
        icon: "outdoor_grill",
        name: "Outdoor Kitchen",
        description: "Full BBQ and bar setup.",
      },
      {
        icon: "spa",
        name: "Home Spa",
        description: "Steam room and massage area.",
      },
      {
        icon: "home",
        name: "Staff Quarters",
        description: "Separate accommodation for help.",
      },
    ],
    nearbyLocations: [
      { name: "Palolem Beach", distance: "10 mins drive" },
      { name: "Margao", distance: "20 mins drive" },
      { name: "Goa Airport", distance: "55 mins drive" },
    ],
  },
  "krillam-marine-wellness": {
    id: "krillam-marine-wellness",
    name: "Krillam Marine Wellness Resorts",
    location: "Kerala, India",
    country: "India",
    type: "Resort",
    price: 4000000,
    priceValue: "₹15L",
    status: "Investment Open",
    heroImage:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1920&q=80",
    description: [
      "Invest in Kerala's premier marine wellness resort destinations. Experience luxury eco-resorts with high-yield returns in the booming $1.3 trillion wellness tourism industry.",
      "Three distinctive marine wellness resort locations offering exceptional investment opportunities in Kerala's most sought-after destinations: Kothamangalam, Kuttikanam, and Vagamon.",
      "The resorts leverage a unique marine wellness concept combining backwater access, eco-luxury villas, and world-class Ayurvedic treatments to attract wellness tourists from around the globe.",
    ],
    verdict: {
      quote:
        "Kerala wellness tourism is experiencing unprecedented growth. Krillam's unique marine wellness positioning offers exceptional IRR potential.",
      author: "Sanjay Pillai",
      title: "Kerala Market Director",
    },
    specs: [
      { label: "Property Type", value: "Marine Wellness Resort" },
      { label: "Locations", value: "3 Prime Kerala Sites" },
      { label: "Min. Investment", value: "₹15 Lakhs" },
      { label: "Projected IRR", value: "15-18%" },
      { label: "Industry Growth", value: "20% Annually" },
    ],
    financials: [
      {
        label: "Projected IRR Returns",
        icon: "trending_up",
        value: "15-18%",
        trend: "up",
        note: "Wellness tourism growth driver.",
      },
      {
        label: "Market Size by 2025",
        icon: "monitoring",
        value: "$1.3 Trillion",
        trend: "up",
        note: "Global wellness tourism market.",
      },
      {
        label: "Annual Industry Growth",
        icon: "timelapse",
        value: "20%",
        trend: "up",
        note: "Fastest grodes tourism segment.",
      },
    ],
    configurations: [
      {
        type: "Kothamangalam Resort",
        area: "Backwater Access",
        view: "Tropical Setting",
        price: 4000000,
      },
      {
        type: "Kuttikanam Resort",
        area: "Hill Station",
        view: "Mountain Views",
        price: 4000000,
      },
      {
        type: "Vagamon Resort",
        area: "Meadow Setting",
        view: "Panoramic Hills",
        price: 4000000,
      },
    ],
    galleryImages: [
      {
        name: "Eco-Luxury Villa",
        description: "Kothamangalam • Garden Facing",
        image:
          "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80",
      },
    ],
    amenities: [
      {
        icon: "spa",
        name: "Marine Wellness",
        description: "Seawater therapies and Ayurvedic treatments.",
      },
      {
        icon: "water",
        name: "Backwater Access",
        description: "Private access to Kerala backwaters.",
      },
      {
        icon: "eco",
        name: "Eco-Luxury",
        description: "Sustainable design with premium comfort.",
      },
      {
        icon: "restaurant",
        name: "Farm-to-Table",
        description: "Organic cuisine from local farms.",
      },
    ],
    nearbyLocations: [
      { name: "Kochi Airport", distance: "2 hrs drive" },
      { name: "Munnar", distance: "1.5 hrs drive" },
      { name: "Alleppey Backwaters", distance: "45 mins drive" },
    ],
  },
  "chaturvatika-villas": {
    id: "chaturvatika-villas",
    name: "Chaturvatika Luxury Villas",
    location: "Ongole, Andhra Pradesh",
    country: "India",
    type: "Villa",
    price: 4000000,
    priceValue: "₹1.2 Cr",
    status: "97 Villas Left",
    heroImage:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80",
    description: [
      "A Haven of Elegance and Tranquility. 3, 4 & 5 BHK Luxury Villas in Chadalavada, Ongole – Experience Exclusive Living in a 25-acre township with only 132 villas.",
      "Ongole is world-famous for its Black Galaxy Granite. As it becomes rarer, its value—and that of the land—increases. This historical trade hub is evolving into a destination worthy of its rich legacy.",
      "Live or Lease – Your Villa, Your Choice. Each villa comes with smart home integration, private gardens, and access to world-class amenities including wellness workshops by Sri Sri Ravi Shankar's Tattva.",
    ],
    verdict: {
      quote:
        "Chaturvatika represents rare value in a region with historical significance and grodes infrastructure. The limited inventory of 132 villas ensures exclusivity.",
      author: "Ramesh Naidu",
      title: "Andhra Market Expert",
    },
    specs: [
      { label: "Property Type", value: "Luxury Villa" },
      { label: "Configuration", value: "3, 4 & 5 BHK" },
      { label: "Total Land", value: "25 Acres" },
      { label: "Total Villas", value: "132 Units" },
      { label: "Completion", value: "2026" },
    ],
    financials: [
      {
        label: "Land Appreciation",
        icon: "trending_up",
        value: "12-15% p.a.",
        trend: "up",
        note: "Black Galaxy Granite region.",
      },
      {
        label: "Rental Yield",
        icon: "monitoring",
        value: "4-6% p.a.",
        trend: "up",
        note: "Lease-back option available.",
      },
      {
        label: "Villa Coverage",
        icon: "timelapse",
        value: "40%",
        trend: "neutral",
        note: "60% open spaces and amenities.",
      },
    ],
    configurations: [
      {
        type: "3 BHK Villa",
        area: "2,400 Sq. Ft.",
        view: "Garden View",
        price: 4000000,
      },
      {
        type: "4 BHK Villa",
        area: "3,200 Sq. Ft.",
        view: "Landscaped",
        price: 4000000,
      },
      {
        type: "5 BHK Villa",
        area: "4,000 Sq. Ft.",
        view: "Premium Plot",
        price: 4000000,
      },
    ],
    galleryImages: [
      {
        name: "Type A - 3 BHK",
        description: "Phase 1 • Garden Facing",
        image:
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
      },
    ],
    amenities: [
      {
        icon: "smart_home",
        name: "Smart Home",
        description: "Full home automation integration.",
      },
      {
        icon: "theater_comedy",
        name: "Mini-Theatre",
        description: "Private screening experience.",
      },
      {
        icon: "sports_cricket",
        name: "Cricket Nets",
        description: "Professional practice facilities.",
      },
      {
        icon: "spa",
        name: "Tattva Wellness",
        description: "Workshops by Art of Living.",
      },
    ],
    nearbyLocations: [
      { name: "Ongole City", distance: "15 mins drive" },
      { name: "Vijayawada", distance: "2 hrs drive" },
      { name: "Chennai", distance: "4 hrs drive" },
    ],
  },
  "flamingo-villas-pulicat": {
    id: "flamingo-villas-pulicat",
    name: "Flamingo Villas",
    location: "Pulicat, Tamil Nadu",
    country: "India",
    type: "Villa",
    price: 4000000,
    priceValue: "₹85L",
    status: "40 Premium Villas",
    heroImage:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920&q=80",
    description: [
      "Pulicat's signature villa destination for mindful living. EBG Flamingo Villas blends eco-conscious luxury with long-term rental income potential, creating a unique investment opportunity in coastal wellness living.",
      "Located in India's premier migratory bird destination with seasonal flamingo viedes. The 5.75-acre development features 40 premium villas with marine wellness facilities and guaranteed lease-back returns.",
      "Just 70 km from Chennai, Flamingo Villas offers seawater therapies, salt spas, and coastal healing experiences combined with 20-year assured rental income for owners.",
    ],
    verdict: {
      quote:
        "Flamingo Villas offers a rare combination of lifestyle asset and assured returns. The 20-year lease-back makes this a compelling proposition for passive income seekers.",
      author: "Karthik Rajan",
      title: "Chennai Coastal Expert",
    },
    specs: [
      { label: "Property Type", value: "Coastal Villa" },
      { label: "Configuration", value: "3, 4 & 5 BHK" },
      { label: "Total Land", value: "5.75 Acres" },
      { label: "Total Villas", value: "40 Units" },
      { label: "Lease-Back", value: "20 Years" },
    ],
    financials: [
      {
        label: "Assured Monthly Income",
        icon: "trending_up",
        value: "Lease-Back",
        trend: "up",
        note: "20-year assured returns.",
      },
      {
        label: "Capital Appreciation",
        icon: "monitoring",
        value: "15-20%",
        trend: "up",
        note: "Coastal premium location.",
      },
      {
        label: "Distance from Chennai",
        icon: "timelapse",
        value: "70 km",
        trend: "neutral",
        note: "Weekend getaway potential.",
      },
    ],
    configurations: [
      {
        type: "3 BHK Villa",
        area: "2,200 Sq. Ft.",
        view: "Garden View",
        price: 4000000,
      },
      {
        type: "4 BHK Villa",
        area: "2,800 Sq. Ft.",
        view: "Lake View",
        price: 4000000,
      },
      {
        type: "5 BHK Villa",
        area: "3,500 Sq. Ft.",
        view: "Premium Plot",
        price: 14500000,
      },
    ],
    galleryImages: [
      {
        name: "Villa Type A",
        description: "Lakefront Row",
        image:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      },
    ],
    amenities: [
      {
        icon: "flutter",
        name: "Flamingo Habitat",
        description: "Seasonal migratory bird viedes.",
      },
      {
        icon: "spa",
        name: "Marine Wellness",
        description: "Seawater and salt spa therapies.",
      },
      {
        icon: "sports_tennis",
        name: "Marine Clubhouse",
        description: "Full-service club facilities.",
      },
      {
        icon: "payments",
        name: "Guaranteed Returns",
        description: "20-year lease-back program.",
      },
    ],
    nearbyLocations: [
      { name: "Chennai City", distance: "70 km" },
      { name: "Pulicat Lake", distance: "5 mins drive" },
      { name: "Chennai Airport", distance: "1.5 hrs drive" },
    ],
  },
  "oxygen-forest-hyderabad": {
    id: "oxygen-forest-hyderabad",
    name: "Oxygen Forest (Pranavayu Vanam)",
    location: "Near Hyderabad, Telangana",
    country: "India",
    type: "Farm Land",
    price: 4000000,
    priceValue: "₹49L",
    status: "160-Acre Gated Community",
    heroImage:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1920&q=80",
    heroVideo: "/videos/oxygen-forest-1.mp4",
    description: [
      "Welcome to OXYGEN FOREST (PRANAVAYU VANAM) — Luxury Farm Living, Redefined. Bordering a 25,000-acre reserve forest, just 2 hours from Hyderabad.",
      "Pure air, clean water, organic food, sustainable living — plus fortnightly delivery of your farm produce to Hyderabad. Smart Green Investment to secure your family's future and live closer to nature.",
      "Each unit includes 450+ trees across 9 permaculture layers, 15+ organic fruits and vegetables grown year-round, premium fruit and timber trees including Mango, Avocado, Coconut, Sandalwood, and Teak.",
    ],
    verdict: {
      quote:
        "Oxygen Forest represents the future of sustainable luxury living. The combination of organic farming, reserve forest access, and Hyderabad proximity creates exceptional value.",
      author: "Srinivas Reddy",
      title: "Telangana Land Expert",
    },
    specs: [
      { label: "Property Type", value: "Luxury Farm Land" },
      { label: "Unit Sizes", value: "2057 & 3630 Sq Yards" },
      { label: "Total Community", value: "160 Acres" },
      { label: "Forest Border", value: "25,000 Acres" },
      { label: "Price per Sq Yd", value: "₹2,400" },
    ],
    financials: [
      {
        label: "Unit Starting Price",
        icon: "trending_up",
        value: "₹49 Lakhs",
        trend: "up",
        note: "2057 Sq Yards unit.",
      },
      {
        label: "Premium Unit",
        icon: "monitoring",
        value: "₹87 Lakhs",
        trend: "up",
        note: "3630 Sq Yards unit.",
      },
      {
        label: "Trees per Unit",
        icon: "timelapse",
        value: "450+",
        trend: "neutral",
        note: "9 permaculture layers.",
      },
    ],
    configurations: [
      {
        type: "Standard Unit",
        area: "2,057 Sq. Yards",
        view: "Forest Border",
        price: 4000000,
      },
      {
        type: "Premium Unit",
        area: "3,630 Sq. Yards",
        view: "Reserve Forest",
        price: 4000000,
      },
    ],
    galleryImages: [
      {
        name: "Farm Layout",
        description: "Phase 1 • Forest Facing",
        image:
          "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
      },
    ],
    amenities: [
      {
        icon: "forest",
        name: "Reserve Forest",
        description: "Bordering 25,000-acre reserve.",
      },
      {
        icon: "eco",
        name: "Organic Farming",
        description: "15+ fruits and veggies year-round.",
      },
      {
        icon: "water_drop",
        name: "Private Pond",
        description: "Each unit with water feature.",
      },
      {
        icon: "local_florist",
        name: "Permaculture",
        description: "450+ trees across 9 layers.",
      },
    ],
    nearbyLocations: [
      { name: "NH44 Access", distance: "Easy access via 6-lane highway" },
      { name: "Hyderabad", distance: "2 hrs drive" },
      { name: "Reserve Forest", distance: "Adjacent" },
    ],
  },
};

const PropertyDetail = () => {
  const [openCalendar, setOpenCalendar] = useState(false);
  const { id } = useParams<{ id: string }>();
  const property = properties[id || "the-aurum"];
  const { formatAmount } = useCurrency();

  if (!property) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-light text-foreground mb-4">
            Property Not Found
          </h1>
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
                {property.description[0].substring(0, 120)}...
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
          <Button variant="outline" className="mt-8 gap-2">
            <span className="material-symbols-outlined text-lg">download</span>
            Download Brochure
          </Button>
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
                {property.configurations.map((config, idx) => (
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
                      >
                        Request Cost Sheet
                      </Button>
                    </td>
                  </tr>
                ))}
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
              {property.nearbyLocations.map((loc, idx) => (
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
              <p className="text-muted-foreground text-sm">{formatAmount(property.price)}</p>
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
        onConfirm={({ date, time }) => {
          const payload = {
            propertyId: "123",
            propertyName: "Carlton Wellness Spa",
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
