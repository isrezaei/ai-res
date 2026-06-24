"use client";

import type { ReactNode } from "react";
import { HStack } from "@chakra-ui/react";
import type { SystemStyleObject } from "@chakra-ui/react";

/**
 * Light, DOTTED hover outline. Rendered as an `outline` offset out from the
 * content, so it never touches the text and — crucially — never affects layout,
 * pagination or the PDF (outlines are not part of box flow and `:hover` never
 * fires in print). Two offsets: a roomier one for the single header block, and a
 * tighter one for the per-entry item outline.
 */
export const CONTENT_BORDER_HOVER = {
  outlineWidth: "1.5px",
  outlineStyle: "dotted",
  outlineColor: "#d4d4d8", // zinc.300 — light, subtle
  outlineOffset: "10px",
} as const;

/** Per-item hover outline — a tighter offset so each entry frames individually. */
export const ITEM_HOVER_OUTLINE = {
  outlineWidth: "1.5px",
  outlineStyle: "dotted",
  outlineColor: "#d4d4d8",
  outlineOffset: "6px",
} as const;

/**
 * Shared styling for the controls inside the section HoverFrame pill: transparent
 * `ghost` in the normal state (the pill itself carries the fill), lifting to a
 * `solid` look on focus/active. App chrome (`gray`) — never the resume colours.
 */
export const frameButtonProps = {
  size: "2xs",
  variant: "ghost",
  colorPalette: "gray",
  borderRadius: "6px",
  color: "fg.muted",
  _hover: { bg: "bg.muted", color: "fg" },
  _focusVisible: { bg: "colorPalette.solid", color: "colorPalette.contrast" },
  _active: { bg: "colorPalette.solid", color: "colorPalette.contrast" },
} as const;

/**
 * Shared styling for the per-item remove control. It uses the APP chrome colour
 * (gray) — never red — and is revealed only when its own item is hovered (each
 * item is the nearest `.group`). `no-print` keeps it out of the PDF.
 */
export const itemRemoveButtonProps = {
  size: "2xs",
  variant: "ghost",
  colorPalette: "gray",
  borderRadius: "md",
  color: "fg.muted",
  className: "no-print",
  opacity: 0,
  _groupHover: { opacity: 1 },
  _focusVisible: { opacity: 1, bg: "bg.muted", color: "fg" },
  _hover: { bg: "bg.muted", color: "fg" },
} as const;

/**
 * Reveal contract for the section control pill. The pill ({@link HoverFrame})
 * rests at low opacity and lifts to full when its OWNING SECTION is hovered (or
 * holds focus). The reveal is driven from the section wrapper — so the entire
 * section is the hover target — via this scoped selector targeting the pill's
 * `data-hover-frame` marker. It deliberately does NOT use a `.group`, which
 * would collide with the per-item hover groups nested inside each section.
 */
export const SECTION_HOVER_FRAME_REVEAL: SystemStyleObject = {
  "&:hover [data-hover-frame], &:focus-within [data-hover-frame]": { opacity: 1 },
};

interface HoverFrameProps {
  children: ReactNode;
}

/**
 * The section settings element ("HoverFrame") that sits at the end of a section's
 * title row, holding the section controls (add / remove / settings). Ported from
 * the imported design's control pill: a small rounded, hairline-bordered chip
 * with a subtle fill. It rests at LOW opacity (understated but always present and
 * clickable) and lifts to full opacity when its section is hovered — see
 * {@link SECTION_HOVER_FRAME_REVEAL} — with a short, opacity-only transition.
 * App-neutral colours only; `no-print` keeps it out of the PDF.
 */
export function HoverFrame({ children }: HoverFrameProps) {
  return (
    <HStack
      className="no-print"
      data-hover-frame="true"
      flexShrink={0}
      gap="1"
      p="3px"
      borderRadius="9px"
      bg="bg.subtle"
      borderWidth="1px"
      borderColor="border"
      opacity={0.4}
      transition="opacity 0.15s ease"
    >
      {children}
    </HStack>
  );
}
