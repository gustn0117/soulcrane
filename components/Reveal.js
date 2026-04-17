"use client";

import { useEffect, useRef, useState } from "react";

export default function Reveal({ as: Tag = "div", className = "", variant = "reveal", delay = 0, children, ...rest }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const delayClass = delay ? ` reveal-delay-${delay}` : "";

  return (
    <Tag
      ref={ref}
      className={`${variant}${delayClass}${visible ? " visible" : ""} ${className}`.trim()}
      {...rest}
    >
      {children}
    </Tag>
  );
}
