
import React, { useEffect, useLayoutEffect, useMemo, useRef, useState, useId } from "react";
import { motion, useAnimation } from "framer-motion";

const SVG_URL =
  "https://ttqxhrxrkewmyyiqaafn.supabase.co/storage/v1/object/public/logo/NewestSD%2001%20Artboard%201.svg";

const SignatureAnimation = ({
  onComplete,
  color = "#FFFFFF",
  className = "w-full h-full",
  strokeWidth = 3.5,
  showGlow = true,
  isNavbar = false,
  skipAnimation = false,
  layoutId,
}) => {
  const [paths, setPaths] = useState([]);
  const [viewBox, setViewBox] = useState("0 0 100 100");
  const [viewBoxWidth, setViewBoxWidth] = useState(100);
  const [lengths, setLengths] = useState([]);
  const [isReady, setIsReady] = useState(false);

  const controls = useAnimation();
  const measureRefs = useRef([]);
  const completeRef = useRef(false);
  const prefersReducedMotion = useRef(false);
  const reactId = useId();

  const handleComplete = () => {
    if (!completeRef.current) {
      completeRef.current = true;
      onComplete?.();
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia) {
      prefersReducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
  }, []);

  useEffect(() => {
    const fallbackTimer = setTimeout(handleComplete, 12000);
    return () => clearTimeout(fallbackTimer);
  }, []);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchSVG = async () => {
      try {
        const response = await fetch(SVG_URL, {
          cache: "no-store",
          signal: controller.signal,
        });

        if (!response.ok) throw new Error(`Network response was not ok (${response.status})`);

        const svgText = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(svgText, "image/svg+xml");
        const svgElement = doc.querySelector("svg");

        if (svgElement?.getAttribute("viewBox") && isMounted) {
          const vb = svgElement.getAttribute("viewBox");
          setViewBox(vb);
          const parts = vb.split(/[\s,]+/);
          if (parts.length >= 3) {
            setViewBoxWidth(parseFloat(parts[2]) || 100);
          }
        }

        const extracted = Array.from(doc.querySelectorAll("path"))
          .map((p) => p.getAttribute("d"))
          .filter(Boolean);

        if (!isMounted) return;

        if (extracted.length > 0) {
          measureRefs.current = new Array(extracted.length).fill(null);
          setPaths(extracted);
        } else {
          handleComplete();
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Failed to load or parse SVG:", error);
          if (isMounted) handleComplete();
        }
      }
    };

    fetchSVG();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  useLayoutEffect(() => {
    if (!paths.length || paths.length !== measureRefs.current.length) return;

    const raf = requestAnimationFrame(() => {
      const measured = measureRefs.current.map((node) => {
        try {
          const len = node?.getTotalLength?.();
          return Number.isFinite(len) && len > 0 ? len : 100;
        } catch {
          return 100;
        }
      });

      setLengths(measured);
      setIsReady(true);
    });

    return () => cancelAnimationFrame(raf);
  }, [paths]);

  const timing = useMemo(() => {
    if (lengths.length === 0) return { durs: [], delays: [], totalDuration: 0 };

    const totalLength = lengths.reduce((acc, l) => acc + l, 0);
    const targetTotalDuration = 3.5;
    const gap = 0.08;

    const durs = lengths.map((length) => {
      const duration = (length / totalLength) * targetTotalDuration;
      return Math.max(0.14, duration);
    });

    const delays = [];
    let t = 0.22;
    for (let i = 0; i < durs.length; i += 1) {
      delays.push(t);
      t += durs[i] + gap;
    }

    return { durs, delays, totalDuration: t };
  }, [lengths]);

  useEffect(() => {
    if (!isReady || paths.length === 0 || lengths.length === 0) return;

    let isMounted = true;

    const animate = async () => {
      try {
        if (skipAnimation) {
          await controls.start(() => ({
            pathLength: 1,
            opacity: 1,
            transition: { duration: 0 },
          }));
          handleComplete();
          return;
        }

        if (prefersReducedMotion.current) {
          await controls.start(() => ({
            pathLength: 1,
            opacity: 1,
            transition: { duration: 0.01 },
          }));
          handleComplete();
          return;
        }

        await controls.start((i) => ({
          pathLength: [0, 1],
          opacity: [0, 1],
          transition: {
            pathLength: {
              duration: timing.durs[i] ?? 0.8,
              delay: timing.delays[i] ?? i * 0.1,
              ease: [0.4, 0, 0.2, 1],
            },
            opacity: {
              duration: 0.2,
              delay: timing.delays[i] ?? i * 0.1,
              ease: "linear",
            },
          },
        }));

        if (!isMounted) return;

        await new Promise((resolve) => setTimeout(resolve, 400));
        handleComplete();
      } catch {
        if (isMounted) handleComplete();
      }
    };

    animate();

    return () => {
      isMounted = false;
    };
  }, [controls, isReady, lengths.length, paths.length, timing, skipAnimation]);

  const maskId = useMemo(() => `signature-mask-${reactId}`, [reactId]);
  const noiseFilterId = useMemo(() => `ink-roughness-${reactId}`, [reactId]);

  const dynamicMaskStrokeWidth = Math.max(viewBoxWidth * 0.12, 10.0);
  
  // Keep stroke width relatively thick for navbar to increase prominence
  const adjustedStrokeWidth = isNavbar ? strokeWidth * 0.95 : strokeWidth;

  return (
    <motion.div
      layoutId={layoutId}
      layout
      className={`flex items-center justify-center ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
      style={{
        willChange: "transform, opacity",
        filter: showGlow ? (isNavbar ? "drop-shadow(0 0 4px rgba(26, 26, 26, 0.15))" : "drop-shadow(0 0 12px rgba(255, 255, 255, 0.6))") : "none",
      }}
    >
      {paths.length > 0 && (
        <svg
          viewBox={viewBox}
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          style={{ overflow: "visible" }}
        >
          <defs>
            <filter id={noiseFilterId} x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.8 1.2"
                numOctaves="2"
                stitchTiles="stitch"
                result="noise"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale="1.5"
                xChannelSelector="R"
                yChannelSelector="G"
                result="displaced"
              />
              <feGaussianBlur in="displaced" stdDeviation="0.2" result="blurred" />
              <feMerge>
                <feMergeNode in="blurred" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <mask id={maskId} maskUnits="userSpaceOnUse">
              <rect width="100%" height="100%" fill="black" />
              {paths.map((d, i) => (
                <motion.path
                  key={`mask-${i}`}
                  ref={(el) => {
                    measureRefs.current[i] = el;
                  }}
                  custom={i}
                  d={d}
                  initial={{ pathLength: skipAnimation ? 1 : 0, opacity: skipAnimation ? 1 : 0 }}
                  animate={controls}
                  fill="none"
                  stroke="white"
                  strokeWidth={dynamicMaskStrokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ filter: `url(#${noiseFilterId})` }}
                />
              ))}
            </mask>
          </defs>

          <g mask={`url(#${maskId})`}>
            {paths.map((d, i) => (
              <motion.path
                key={`fill-${i}`}
                d={d}
                animate={{ fill: color, stroke: color }}
                transition={{ duration: 0.8 }}
                strokeWidth={adjustedStrokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ))}
          </g>
        </svg>
      )}
    </motion.div>
  );
};

export default SignatureAnimation;
