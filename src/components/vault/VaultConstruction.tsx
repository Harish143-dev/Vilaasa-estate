import { useState } from "react";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";

interface ConstructionAsset {
  id: string;
  name: string;
  location: string;
  image: string;
  structureProgress: number;
  interiorProgress: number;
  overallProgress: number;
  lastUpdate: string;
  milestones: Array<{
    id: string;
    name: string;
    status: "completed" | "in-progress" | "upcoming";
    date: string;
  }>;
  gallery: Array<{
    id: string;
    url: string;
    date: string;
    caption: string;
  }>;
}

const mockConstructionAssets: ConstructionAsset[] = [
  {
    id: "3",
    name: "Palm Royale Villa",
    location: "Dubai Marina, UAE",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
    structureProgress: 80,
    interiorProgress: 20,
    overallProgress: 55,
    lastUpdate: "2025-01-02",
    milestones: [
      { id: "1", name: "Foundation Complete", status: "completed", date: "2024-06-15" },
      { id: "2", name: "Structure Complete", status: "in-progress", date: "2025-02-28" },
      { id: "3", name: "Interior Works", status: "upcoming", date: "2025-06-30" },
      { id: "4", name: "Handover", status: "upcoming", date: "2025-12-15" },
    ],
    gallery: [
      { id: "1", url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80", date: "2025-01-02", caption: "Structure Level 18 - Facade Installation" },
      { id: "2", url: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&q=80", date: "2024-12-15", caption: "MEP Works in Progress" },
      { id: "3", url: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=400&q=80", date: "2024-11-30", caption: "Lobby Area Framing" },
    ],
  },
];

export function VaultConstruction() {
  const [selectedAsset, setSelectedAsset] = useState<ConstructionAsset>(mockConstructionAssets[0]);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-light text-foreground font-serif">Live Construction Feed</h2>
          <p className="text-muted-foreground text-sm">Real-time updates on your under-construction properties</p>
        </div>
      </div>

      {mockConstructionAssets.length === 0 ? (
        <div className="bg-card rounded-xl border border-border p-12 text-center">
          <span className="material-symbols-outlined text-4xl text-muted-foreground mb-4">construction</span>
          <h3 className="text-lg font-medium text-foreground mb-2">No Active Construction</h3>
          <p className="text-muted-foreground">All your properties are currently complete.</p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Progress Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 bg-card rounded-xl border border-border overflow-hidden"
          >
            {/* Header */}
            <div className="relative h-48">
              <img 
                src={selectedAsset.image} 
                alt={selectedAsset.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-xl font-semibold text-white">{selectedAsset.name}</h3>
                <p className="text-white/70 text-sm">{selectedAsset.location}</p>
              </div>
              <div className="absolute top-4 right-4 px-3 py-1 bg-gold/90 rounded-full">
                <span className="text-xs font-semibold text-gold-foreground">{selectedAsset.overallProgress}% Complete</span>
              </div>
            </div>

            {/* Progress Bars */}
            <div className="p-6 space-y-5">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-foreground font-medium">Structure</span>
                  <span className="text-sm text-gold font-mono">{selectedAsset.structureProgress}%</span>
                </div>
                <Progress value={selectedAsset.structureProgress} className="h-3" />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-foreground font-medium">Interior Works</span>
                  <span className="text-sm text-gold font-mono">{selectedAsset.interiorProgress}%</span>
                </div>
                <Progress value={selectedAsset.interiorProgress} className="h-3" />
              </div>

              {/* Milestones Timeline */}
              <div className="pt-4 border-t border-border">
                <h4 className="text-sm font-semibold text-foreground mb-4">Construction Milestones</h4>
                <div className="space-y-4">
                  {selectedAsset.milestones.map((milestone, index) => (
                    <div key={milestone.id} className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        milestone.status === "completed" 
                          ? "bg-primary text-primary-foreground" 
                          : milestone.status === "in-progress"
                            ? "bg-gold text-gold-foreground"
                            : "bg-muted text-muted-foreground"
                      }`}>
                        {milestone.status === "completed" ? (
                          <span className="material-symbols-outlined text-sm">check</span>
                        ) : (
                          <span className="text-xs font-bold">{index + 1}</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm font-medium ${
                          milestone.status === "completed" ? "text-foreground" : "text-muted-foreground"
                        }`}>
                          {milestone.name}
                        </p>
                        <p className="text-xs text-muted-foreground">{milestone.date}</p>
                      </div>
                      {milestone.status === "in-progress" && (
                        <span className="text-xs px-2 py-1 bg-gold/20 text-gold rounded-full">In Progress</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Site Updates Gallery */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card rounded-xl border border-border overflow-hidden"
          >
            <div className="p-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">photo_library</span>
                <h3 className="font-semibold text-foreground">Site Updates</h3>
              </div>
              <span className="text-xs text-muted-foreground">
                Updated: {new Date(selectedAsset.lastUpdate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
              </span>
            </div>

            {/* Main Gallery Image */}
            <div className="relative aspect-video">
              <img 
                src={selectedAsset.gallery[activeGalleryIndex].url}
                alt={selectedAsset.gallery[activeGalleryIndex].caption}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-white text-xs">{selectedAsset.gallery[activeGalleryIndex].caption}</p>
                <p className="text-white/60 text-xs">{selectedAsset.gallery[activeGalleryIndex].date}</p>
              </div>
            </div>

            {/* Gallery Thumbnails */}
            <div className="p-3 flex gap-2 overflow-x-auto">
              {selectedAsset.gallery.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => setActiveGalleryIndex(index)}
                  className={`w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-colors ${
                    index === activeGalleryIndex ? "border-gold" : "border-transparent"
                  }`}
                >
                  <img src={item.url} alt={item.caption} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            <div className="p-4 border-t border-border">
              <button className="w-full flex items-center justify-center gap-2 text-primary text-sm font-medium hover:underline">
                <span className="material-symbols-outlined text-lg">download</span>
                Download All Photos
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
