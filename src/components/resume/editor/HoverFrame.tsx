"use client";

import type { ReactNode } from "react";
import { HStack } from "@chakra-ui/react";

/**
 * The light, DOTTED content border revealed on hover. It is an `outline` offset
 * out from the content (so the border never touches the text and gains breathing
 * room on every side). Outline is hover-only, so layout, pagination and the PDF
 * render are never affected. Applied via `_groupHover` on a section's content box.
 */
export const CONTENT_BORDER_HOVER = {
  outlineWidth: "1.5px",
  outlineStyle: "dotted",
  outlineColor: "#d4d4d8", // gray.300 — light, subtle
  outlineOffset: "10px",
} as const;

/**
 * Shared styling for the controls inside the HoverFrame pill: `subtle` in the
 * normal state, lifting to a `solid` look on focus/active so the pressed or
 * focused control stands out against the translucent fill.
 */
export const frameButtonProps = {
  size: "2xs",
  variant: "subtle",
  colorPalette: "gray",
  borderRadius: "md",
  _focusVisible: { bg: "colorPalette.solid", color: "colorPalette.contrast" },
  _active: { bg: "colorPalette.solid", color: "colorPalette.contrast" },
} as const;

interface HoverFrameProps {
  children: ReactNode;
}

/**
 * The inline settings element ("HoverFrame") that sits in a section's title row,
 * space-between with the title. A soft translucent gray fill holding the section
 * controls (add / remove / settings); revealed on hover of the surrounding
 * `.group` section, together with the content border.
 */
export function HoverFrame({ children }: HoverFrameProps) {
  return (
    <HStack
      className="no-print"
      flexShrink={0}
      gap="1"
      p={1}
      borderRadius="xl"
      bg={"bg.muted"}
      opacity="0"
      transition="opacity 0.12s"
      _groupHover={{ opacity: 1 }}
      _focusWithin={{ opacity: 1 }}
    >
      {children}
    </HStack>
  );
}
