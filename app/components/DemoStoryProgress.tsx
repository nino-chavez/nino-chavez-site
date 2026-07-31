"use client";

import { useEffect, useRef, useState } from "react";

type StorySectionLink = {
  id: string;
  label: string;
};

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  return (
    target.matches("input, textarea, select, button, [contenteditable='true']") ||
    Boolean(target.closest("pre, code"))
  );
}

export function DemoStoryProgress({
  storyId,
  sections,
}: {
  storyId: string;
  sections: StorySectionLink[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const activeIndexRef = useRef(0);

  useEffect(() => {
    const story = document.getElementById(storyId);
    if (!story) return;

    const storySections = sections
      .map((section) => document.getElementById(section.id))
      .filter((section): section is HTMLElement => section !== null);
    let frame = 0;

    function storyIsActive() {
      const bounds = story.getBoundingClientRect();
      const marker = window.innerHeight * 0.46;
      return bounds.top <= marker && bounds.bottom > marker;
    }

    function measure() {
      frame = 0;
      const nextVisible = storyIsActive();
      setVisible(nextVisible);
      if (!nextVisible || storySections.length === 0) return;

      const marker = Math.max(112, window.innerHeight * 0.34);
      let nextIndex = 0;
      for (let index = 0; index < storySections.length; index += 1) {
        if (storySections[index].getBoundingClientRect().top <= marker) {
          nextIndex = index;
        }
      }
      activeIndexRef.current = nextIndex;
      setActiveIndex(nextIndex);
    }

    function scheduleMeasure() {
      if (frame) return;
      frame = window.requestAnimationFrame(measure);
    }

    function onKeyDown(event: KeyboardEvent) {
      if (
        event.defaultPrevented ||
        event.metaKey ||
        event.ctrlKey ||
        event.altKey ||
        isTypingTarget(event.target) ||
        !storyIsActive()
      ) {
        return;
      }

      const current = storySections.findIndex((section) => {
        const bounds = section.getBoundingClientRect();
        return bounds.top <= 140 && bounds.bottom > 140;
      });
      const index = current >= 0 ? current : activeIndexRef.current;
      let destination = index;

      if (event.key === "ArrowRight" || event.key === "PageDown") {
        destination = Math.min(storySections.length - 1, index + 1);
      } else if (event.key === "ArrowLeft" || event.key === "PageUp") {
        destination = Math.max(0, index - 1);
      } else if (event.key === "Home") {
        destination = 0;
      } else if (event.key === "End") {
        destination = storySections.length - 1;
      } else {
        return;
      }

      event.preventDefault();
      storySections[destination]?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
        block: "start",
      });
    }

    measure();
    window.addEventListener("scroll", scheduleMeasure, { passive: true });
    window.addEventListener("resize", scheduleMeasure);
    window.addEventListener("keydown", onKeyDown);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleMeasure);
      window.removeEventListener("resize", scheduleMeasure);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [sections, storyId]);

  const progress = sections.length
    ? ((activeIndex + 1) / sections.length) * 100
    : 0;

  return (
    <div
      className="native-story-navigation"
      data-visible={visible}
      style={{ "--story-progress": `${progress}%` } as React.CSSProperties}
    >
      <div className="native-story-progress" aria-hidden="true">
        <span />
      </div>
      <nav className="native-story-rail" aria-label="Demo chapters">
        {sections.map((section, index) => (
          <a
            href={`#${section.id}`}
            aria-current={index === activeIndex ? "step" : undefined}
            aria-label={`${String(index + 1).padStart(2, "0")}: ${
              section.label
            }`}
            title={section.label}
            key={section.id}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
          </a>
        ))}
      </nav>
    </div>
  );
}
