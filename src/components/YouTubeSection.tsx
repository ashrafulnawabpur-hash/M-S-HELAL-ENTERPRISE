import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Play, X, Youtube } from "lucide-react";

// ─── Your two videos ────────────────────────────────────────────────
const VIDEOS = [
  {
    id: "PC2VbRZvC38",
    title: "M/S Helal Enterprise — Who We Are",
    desc: "Meet the team behind Bangladesh's trusted SKF authorised distributor. Our story, our values, our commitment.",
    embed: "https://www.youtube.com/embed/PC2VbRZvC38?rel=0&modestbranding=1&playsinline=1",
    featured: true,
  },
  {
    id: "Ju_m1BRgmvI",
    title: "Products & Services at Helal Enterprise",
    desc: "A closer look at our bearing catalogue, warehouse stock, and the customer service that keeps Bangladesh's industries running.",
    embed: "https://www.youtube.com/embed/Ju_m1BRgmvI?rel=0&modestbranding=1&playsinline=1",
    featured: false,
  },
];

// ─── Lightbox player ─────────────────────────────────────────────────
function VideoLightbox({
  video,
  onClose,
}: {
  video: (typeof VIDEOS)[number];
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[90] flex items-center justify-center bg-night/95 backdrop-blur-md p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.94, opacity: 0, y: 10 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-5xl"
      >
        {/* header bar */}
        <div className="flex items-center justify-between bg-navy px-6 py-3 rounded-t-xl">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand">
              Now Playing
            </p>
            <h3 className="text-sm font-extrabold text-white truncate max-w-lg">
              {video.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-white/60 hover:bg-white/10 hover:text-white transition-colors shrink-0"
            aria-label="Close video"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* iframe */}
        <div className="aspect-video w-full bg-black rounded-b-xl overflow-hidden shadow-2xl shadow-black/50">
          <iframe
            title={video.title}
            src={video.embed + "&autoplay=1"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        </div>

        {/* description below */}
        <div className="mt-4 bg-navy/80 backdrop-blur rounded-lg p-5 flex items-start gap-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-600 text-white">
            <Youtube className="h-5 w-5" />
          </span>
          <div>
            <p className="text-[15px] font-semibold text-white">{video.title}</p>
            <p className="mt-1 text-sm leading-relaxed text-white/60">{video.desc}</p>
            <a
              href={`https://youtu.be/${video.id}`}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-brand hover:text-white transition-colors"
            >
              Open on YouTube →
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Main section ────────────────────────────────────────────────────
export function YouTubeSection() {
  const [active, setActive] = useState<string | null>(null);
  const featured = VIDEOS.find((v) => v.featured)!;
  const secondary = VIDEOS.find((v) => !v.featured)!;

  return (
    <section className="border-t border-line bg-mist py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* section header */}
        <div className="flex items-center gap-4 mb-10">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-600 shadow-lg shadow-red-600/30">
            <Youtube className="h-6 w-6 text-white" fill="currentColor" />
          </span>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-brand">
              Video Library
            </p>
            <h2 className="text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">
              Watch Our Videos
            </h2>
          </div>
        </div>

        {/* Featured video — large card */}
        <button
          onClick={() => setActive(featured.id)}
          className="group relative block w-full overflow-hidden rounded-xl bg-night text-left shadow-lg hover:shadow-xl transition-shadow"
        >
          <div className="aspect-video max-h-[520px] w-full relative overflow-hidden">
            <img
              src={`https://img.youtube.com/vi/${featured.id}/maxresdefault.jpg`}
              alt={featured.title}
              className="h-full w-full object-cover opacity-75 group-hover:opacity-55 group-hover:scale-105 transition-all duration-700"
              loading="lazy"
            />
            {/* play button */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
              <span className="flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full bg-red-600 text-white shadow-2xl shadow-red-600/40 transition-transform duration-300 group-hover:scale-110">
                <Play className="h-9 w-9 sm:h-11 sm:w-11 ml-1" fill="currentColor" />
              </span>
              <h3 className="mt-6 text-xl sm:text-2xl lg:text-3xl font-extrabold text-white text-center max-w-2xl leading-tight">
                {featured.title}
              </h3>
              <p className="mt-3 hidden sm:block text-sm text-white/70 text-center max-w-xl">
                {featured.desc}
              </p>
            </div>
            {/* bottom gradient */}
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent" />
          </div>
        </button>

        {/* Secondary video card */}
        {secondary && (
          <button
            onClick={() => setActive(secondary.id)}
            className="group mt-5 relative flex gap-5 overflow-hidden rounded-xl bg-night text-left shadow-md hover:shadow-lg transition-shadow sm:gap-7"
          >
            {/* thumbnail */}
            <div className="relative w-48 sm:w-64 shrink-0 aspect-video overflow-hidden">
              <img
                src={`https://img.youtube.com/vi/${secondary.id}/mqdefault.jpg`}
                alt={secondary.title}
                className="h-full w-full object-cover opacity-80 group-hover:opacity-60 group-hover:scale-105 transition-all duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-white shadow-lg shadow-red-600/30 transition-transform group-hover:scale-110">
                  <Play className="h-5 w-5 ml-0.5" fill="currentColor" />
                </span>
              </div>
            </div>
            {/* info */}
            <div className="flex-1 py-5 pr-5 min-w-0">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/60">
                <Youtube className="h-3 w-3" /> Video
              </span>
              <h3 className="mt-2 text-base sm:text-lg font-extrabold text-white leading-snug line-clamp-2">
                {secondary.title}
              </h3>
              <p className="mt-1.5 text-sm text-white/55 line-clamp-2">{secondary.desc}</p>
              <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-brand transition-colors group-hover:text-white">
                Watch now <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </button>
        )}

        {/* YouTube channel CTA */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-line bg-white p-5 sm:p-6">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
              <Youtube className="h-6 w-6" fill="currentColor" />
            </span>
            <div>
              <p className="text-sm font-extrabold text-navy">M/S Helal Enterprise</p>
              <p className="text-xs text-steel">Subscribe for product updates &amp; guides</p>
            </div>
          </div>
          <a
            href="https://youtube.com/@helalenterprise"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border-2 border-red-500 px-5 py-2.5 text-sm font-bold text-red-600 transition-colors hover:bg-red-600 hover:border-red-600 hover:text-white"
          >
            <Youtube className="h-4 w-4" /> Visit Channel
          </a>
        </div>
      </div>

      {/* lightbox */}
      <AnimatePresence>
        {active && (
          <VideoLightbox
            video={VIDEOS.find((v) => v.id === active)!}
            onClose={() => setActive(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

export default YouTubeSection;
