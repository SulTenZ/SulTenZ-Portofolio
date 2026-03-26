// src/components-ui/Timeline.jsx
"use client";
import { useScroll, useTransform, motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";

export const Timeline = ({ data }) => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      if (ref.current) {
        const dots = ref.current.querySelectorAll('.timeline-dot');
        if (dots.length > 0) {
          const lastDot = dots[dots.length - 1];
          const containerRect = ref.current.getBoundingClientRect();
          const dotRect = lastDot.getBoundingClientRect();
          // CUSTOMIZE DI SINI: Ubah angka 60 di bawah ini sesuai selera 
          // untuk mengatur seberapa panjang garis turun melewati titik terakhir
          const extraLength = 60;
          const distance = dotRect.top - containerRect.top + (dotRect.height / 2) + extraLength;
          setHeight(distance);
        } else {
          const rect = ref.current.getBoundingClientRect();
          setHeight(rect.height);
        }
      }
    };

    // Inisialisasi awal dan saat window didownside
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, [ref, data]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    // Diatur agar garis bereaksi lebih responsif hingga akhir meski di bottom of page
    offset: ["start 10%", "end 100%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="w-full bg-transparent font-sans" ref={containerRef}>
      <div ref={ref} className="relative w-full pb-20">

        {data.map((item, index) => (
          <div key={index} className="relative flex flex-col md:flex-row items-start md:items-center pt-16 md:pt-28 w-full z-10">
            {/* Left side: Centerized Absolute Node + Title */}
            <div className="w-full md:w-1/3 flex items-center shrink-0 mb-6 md:mb-0">
              <div className="w-20 flex justify-center shrink-0 relative z-40">
                <div className="timeline-dot w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.2)] border border-neutral-300">
                  <div className="h-4 w-4 rounded-full bg-neutral-200 border border-neutral-300" />
                </div>
              </div>
              <h3 className="text-3xl md:text-5xl font-jakarta font-bold text-white m-0">
                {item.title}
              </h3>
            </div>

            {/* Right side: Content (Skill Icons Wrapper) */}
            <div className="w-full md:w-2/3 pl-20 md:pl-8 pr-4">
              {item.content}
            </div>
          </div>
        ))}

        {/* Animated Custom Gradient Line */}
        <div
          style={{ height: height + "px" }}
          className="absolute left-10 top-0 overflow-hidden w-[2px] -translate-x-1/2 bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-800 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] z-0"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-full bg-main rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
