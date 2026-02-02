import { useQuery } from "@tanstack/react-query";
import {
  graphqlRequest,
  PRODUCTS_QUERY,
  PRODUCT_BY_SLUG_QUERY,
  ProductsResponse,
  ProductBySlugResponse,
  SaleorProduct,
  ProductAttribute,
} from "@/lib/graphql";
import {
  PropertyListItem,
  PropertyDetail,
  ConstructionAsset,
  DEFAULT_PROPERTY_IMAGES,
  DEFAULT_PROPERTY_IMAGE,
} from "@/types/property";
import { get } from "http";

/* -------------------- COMMON HELPERS -------------------- */

function getAttributeValue(
  attributes: ProductAttribute[],
  slug: string,
): string | null {
  const attr = attributes.find((a) => a.attribute.slug === slug);
  if (attr && attr.values.length > 0) {
    return attr.values[0].plainText || attr.values[0].name;
  }
  return null;
}

function getAttributeValues(
  attributes: ProductAttribute[],
  slug: string,
): string[] {
  const attr = attributes.find((a) => a.attribute.slug === slug);
  if (attr && attr.values.length > 0) {
    return attr.values.map((v) => v.plainText || v.name);
  }
  return [];
}

function parseDescription(description: string | null): string[] {
  if (!description) return [];
  try {
    const parsed = JSON.parse(description);
    if (Array.isArray(parsed.blocks)) {
      return parsed.blocks
        .filter((b: any) => b.type === "paragraph")
        .map((b: any) => b.data.text);
    }
  } catch {}
  return description ? [description] : [];
}

function getProductPrice(product: SaleorProduct): number {
  return product.pricing?.priceRange.start.gross.amount || 0;
}

function getFileAttributeUrl(
  attributes: ProductAttribute[],
  slug: string,
): string | null {
  const attr = attributes.find((a) => a.attribute.slug === slug);
  return attr?.values?.[0]?.file?.url || null;
}

/* -------------------- PROPERTY LIST -------------------- */

function transformToListItem(product: SaleorProduct): PropertyListItem {
  return {
    id: product.slug,
    name: product.name,
    location: getAttributeValue(product.attributes, "location") || "",
    price: getProductPrice(product),
    type: product.productType?.name || "Residential",
    roi: getAttributeValue(product.attributes, "rental-yield") || "3-5%",
    status: getAttributeValue(product.attributes, "status") || "Available",
    features: ["Premium Location", "Luxury Amenities"],
    image:
      product.media?.[0]?.url ||
      DEFAULT_PROPERTY_IMAGES[product.slug] ||
      DEFAULT_PROPERTY_IMAGE,
    franchiseCategory: product.category?.name,
  };
}

export function useProperties() {
  return useQuery({
    queryKey: ["properties"],
    queryFn: async () => {
      const data = await graphqlRequest<ProductsResponse>(PRODUCTS_QUERY, {
        first: 50,
      });
      return data.products.edges.map((e) => transformToListItem(e.node));
    },
  });
}

/* -------------------- PROPERTY DETAIL -------------------- */

function transformToDetail(product: SaleorProduct): PropertyDetail {
  const price = getProductPrice(product);
  const configuration =
    getAttributeValue(product.attributes, "configuration") || "";
  const totalArea = getAttributeValue(product.attributes, "total-area") || "";
  const amenities = getAttributeValues(product.attributes, "amenities");
  const amenityDescriptions = getAttributeValues(
    product.attributes,
    "amenities-description",
  );

  return {
    id: product.slug,
    name: product.name,
    location: getAttributeValue(product.attributes, "location") || "",
    country: getAttributeValue(product.attributes, "country") || "",
    type: product.productType?.name || "Residential",
    price,

    priceValue: `$${(price / 1_000_000).toFixed(1)}M+`,
    status: getAttributeValue(product.attributes, "status") || "Available",
    heroImage:
      product.media?.[0]?.url ||
      DEFAULT_PROPERTY_IMAGES[product.slug] ||
      DEFAULT_PROPERTY_IMAGE,
    brochure: getFileAttributeUrl(product.attributes, "catalogue") || "",
    description: parseDescription(product.description) || [
      "A premium luxury property offering exceptional living experience.",
      "Features world-class amenities and prime location advantages.",
    ],
    verdict: {
      quote:
        getAttributeValue(product.attributes, "verdict-message") ||
        "Strong long-term investment opportunity.",
      author:
        getAttributeValue(product.attributes, "verdict-person-name") ||
        "Vilaasa Acquisitions",
      title:
        getAttributeValue(product.attributes, "verdict-designation") ||
        "Investment Advisory",
    },
    specs: [
      {
        label: "Property Type",
        value:
          getAttributeValue(product.attributes, "property-type") ||
          "Residential",
      },
      {
        label: "Location",
        value: getAttributeValue(product.attributes, "location") || "Unknown",
      },
      {
        label: "Minimum Investment",
        value: getAttributeValue(product.attributes, "min-Investment") || "N/A",
      },
      {
        label: "Projected IRR",
        value: getAttributeValue(product.attributes, "project-irr") || "N/A",
      },
      {
        label: "Industry Growth",
        value:
          getAttributeValue(product.attributes, "industry-growth") || "N/A",
      },
    ],
    financials: [
      {
        label: "Projected IRR Returns",
        icon: "trending_up",
        value: getAttributeValue(product.attributes, "project-irr") || "N/A",
        trend: "up",
        note: "Based on current market analysis.",
      },
      {
        label: "Market Size by Year",
        icon: "monitoring",
        value: getAttributeValue(product.attributes, "min-Investment") || "N/A",
        trend: "up",
        note: "Historical growth trajectory.",
      },
      {
        label: "Anual Industry Growth",
        icon: "timelapse",
        value:
          getAttributeValue(product.attributes, "industry-growth") || "N/A",
        trend: "neutral",
        note: "With standard financing terms.",
      },
    ],
    configurations: product.variants.map((variant) => ({
      type: variant.name, // "3 BHK Wellness Villa"
      area: variant.sku || "3,000 Sq. Ft.",
      price: variant.pricing?.price?.gross?.amount ?? price, // fallback
    })),

    galleryImages: product.media?.map((m, index) => ({
      name: `${product.name} Image ${index + 1}`,
      description: m.alt || "Property View",
      image: m.url,
    })) || [
      {
        name: "Main Residence",
        description: "Exterior View",
        image: DEFAULT_PROPERTY_IMAGES[product.slug] || DEFAULT_PROPERTY_IMAGE,
      },
    ],
    amenities: amenities.map((name, index) => {
      const lower = name.toLowerCase();
      let icon = "star";

      if (lower.includes("pool")) {
        icon = "pool";
      } else if (lower.includes("fitness") || lower.includes("gym")) {
        icon = "fitness_center";
      } else if (lower.includes("spa") || lower.includes("wellness")) {
        icon = "spa";
      } else if (lower.includes("security")) {
        icon = "security";
      } else if (lower.includes("concierge")) {
        icon = "room_service";
      } else if (lower.includes("parking")) {
        icon = "local_parking";
      } else if (lower.includes("smart")) {
        icon = "settings_remote";
      } else if (lower.includes("garden") || lower.includes("green")) {
        icon = "yard";
      } else if (lower.includes("house") || lower.includes("home")) {
        icon = "home";
      } else if (lower.includes("public") || lower.includes("helipad")) {
        icon = "Helicopter";
      } else if (lower.includes("party") || lower.includes("club")) {
        icon = "club";
      }

      return {
        name,
        icon,
        description: amenityDescriptions[index] || "Premium lifestyle amenity.",
      };
    }),
    nearbyLocations: [],
  };
}

export function useProperty(slug: string) {
  return useQuery({
    queryKey: ["property", slug],
    queryFn: async () => {
      const data = await graphqlRequest<ProductBySlugResponse>(
        PRODUCT_BY_SLUG_QUERY,
        { slug },
      );
      if (!data.product) throw new Error("Not found");
      return transformToDetail(data.product);
    },
    enabled: !!slug,
  });
}

/* -------------------- CONSTRUCTION -------------------- */

function transformToConstructionAsset(
  product: SaleorProduct,
): ConstructionAsset | null {
  const meta = product.metadata?.find(
    (m: any) => m.key === "construction_asset",
  );
  if (!meta) return null;

  try {
    const data = JSON.parse(meta.value);
    return {
      id: product.slug,
      name: product.name,
      location: getAttributeValue(product.attributes, "location") || "",
      image: product.media?.[0]?.url || DEFAULT_PROPERTY_IMAGE,
      structureProgress: data.structureProgress || 0,
      interiorProgress: data.interiorProgress || 0,
      overallProgress: data.overallProgress || 0,
      lastUpdate: data.lastUpdate,
      milestones: data.milestones || [],
      gallery: data.gallery || [],
    };
  } catch {
    return null;
  }
}

export function useConstructionAssets() {
  return useQuery({
    queryKey: ["construction-assets"],
    queryFn: async () => {
      const data = await graphqlRequest<ProductsResponse>(PRODUCTS_QUERY, {
        first: 50,
      });
      return data.products.edges
        .map((e) => transformToConstructionAsset(e.node))
        .filter(Boolean);
    },
  });
}
