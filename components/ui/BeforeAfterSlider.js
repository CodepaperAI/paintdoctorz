import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function BeforeAfterSlider({
  before,
  after,
  beforeLabel = "Before",
  afterLabel = "After",
  caption,
  initial = 50,
}) {
  const containerRef = useRef(null);
  const [position, setPosition] = useState(initial);
  const [dragging, setDragging] = useState(false);

  const setFromClientX = useCallback((clientX) => {
    const node = containerRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const ratio = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, ratio)));
  }, []);

  const handlePointerDown = (event) => {
    setDragging(true);
    setFromClientX(event.clientX);
  };

  useEffect(() => {
    if (!dragging) return undefined;

    const handleMove = (event) => {
      const clientX =
        event.touches && event.touches.length
          ? event.touches[0].clientX
          : event.clientX;
      setFromClientX(clientX);
    };
    const stop = () => setDragging(false);

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("touchmove", handleMove, { passive: false });
    window.addEventListener("mouseup", stop);
    window.addEventListener("touchend", stop);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("mouseup", stop);
      window.removeEventListener("touchend", stop);
    };
  }, [dragging, setFromClientX]);

  const handleKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      setPosition((prev) => Math.max(0, prev - 4));
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      setPosition((prev) => Math.min(100, prev + 4));
    } else if (event.key === "Home") {
      event.preventDefault();
      setPosition(0);
    } else if (event.key === "End") {
      event.preventDefault();
      setPosition(100);
    }
  };

  return (
    <figure className="w-full">
      <div
        ref={containerRef}
        className="relative aspect-[4/3] w-full select-none overflow-hidden rounded-4xl border border-light-border shadow-soft dark:border-dark-border dark:shadow-soft-dark sm:aspect-[16/10]"
        onMouseDown={handlePointerDown}
        onTouchStart={(e) => {
          setDragging(true);
          setFromClientX(e.touches[0].clientX);
        }}
      >
        {/* After image (base layer) */}
        <Image
          src={after}
          alt={afterLabel}
          fill
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-cover"
          draggable={false}
        />
        <span className="absolute right-4 top-4 rounded-full bg-black/55 px-3 py-1 text-xs font-medium uppercase tracking-widest text-white backdrop-blur">
          {afterLabel}
        </span>

        {/* Before image (clipped overlay) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <Image
            src={before}
            alt={beforeLabel}
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover"
            draggable={false}
          />
          <span className="absolute left-4 top-4 rounded-full bg-black/55 px-3 py-1 text-xs font-medium uppercase tracking-widest text-white backdrop-blur">
            {beforeLabel}
          </span>
        </div>

        {/* Handle */}
        <div
          className="absolute inset-y-0 z-10 w-0.5 bg-white/90 shadow-[0_0_0_1px_rgba(0,0,0,0.1)]"
          style={{ left: `${position}%`, transform: "translateX(-50%)" }}
        >
          <button
            type="button"
            role="slider"
            aria-label="Drag to compare before and after"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(position)}
            onKeyDown={handleKeyDown}
            className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full border border-light-border bg-light-surface text-light-accent shadow-soft transition-colors duration-300 hover:bg-light-muted dark:border-dark-border dark:bg-dark-surface dark:text-dark-accent dark:hover:bg-dark-card-hover"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
              <path d="M9 6l-4 6 4 6M15 6l4 6-4 6" />
            </svg>
          </button>
        </div>
      </div>
      {caption && (
        <figcaption className="mt-4 text-center text-sm text-light-subtext dark:text-dark-subtext">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
