"use client";

import type { ReactNode } from "react";
import { Box, HStack } from "@chakra-ui/react";
import { HoverFrame, SECTION_HOVER_FRAME_REVEAL } from "./HoverFrame";

interface SectionFrameProps {
  /** The section title (rendered heading). When null — e.g. a section continued on
   *  the next page — only the content is shown, with no title row. */
  title: ReactNode;
  /** The HoverFrame controls (add / remove / settings buttons). */
  controls: ReactNode;
  /** The section content (its items each carry their own per-item hover frame). */
  children: ReactNode;
}

/**
 * Per-section shell. The title and the inline {@link HoverFrame} controls sit on
 * one space-between row; the HoverFrame is now persistent (always visible) at the
 * row end, matching the imported design. The section itself is no longer a hover
 * group — the hover outline lives on each individual item instead — and the
 * heading row is deliberately kept outside any item outline. Hovering anywhere
 * in the section lifts the resting low-opacity HoverFrame to full opacity via
 * {@link SECTION_HOVER_FRAME_REVEAL}.
 */
export function SectionFrame({ title, controls, children }: SectionFrameProps) {
  return (
    <Box css={SECTION_HOVER_FRAME_REVEAL}>
      {title ? (
        <HStack justify="space-between" align="center" gap="2">
          <Box flex="1" minW="0">
            {title}
          </Box>
          <HoverFrame>{controls}</HoverFrame>
        </HStack>
      ) : null}
      <Box mt={title ? "2" : "0"}>{children}</Box>
    </Box>
  );
}
