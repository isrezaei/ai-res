"use client";

import type { ReactNode } from "react";
import { Box, HStack } from "@chakra-ui/react";
import { CONTENT_BORDER_HOVER, HoverFrame } from "./HoverFrame";

interface SectionFrameProps {
  /** The section title (rendered heading). When null — e.g. a section continued on
   *  the next page — only the bordered content is shown, with no title row. */
  title: ReactNode;
  /** The HoverFrame controls (add / remove / settings buttons). */
  controls: ReactNode;
  /** The section content, wrapped by the hover border. */
  children: ReactNode;
}

/**
 * Per-section shell. The title and the inline {@link HoverFrame} controls sit on
 * one space-between row OUTSIDE the border; the content sits below, wrapped by a
 * hover border. Both the HoverFrame and the border reveal together on hover of
 * the section (the shared `.group`).
 */
export function SectionFrame({ title, controls, children }: SectionFrameProps) {
  return (
    <Box className="group">
      {title ? (
        <HStack justify="space-between" align="center" gap="2">
          <Box flex="1" minW="0">
            {title}
          </Box>
          <HoverFrame>{controls}</HoverFrame>
        </HStack>
      ) : null}
      <Box mt={title ? "2" : "0"} borderRadius="md" _groupHover={CONTENT_BORDER_HOVER}>
        {children}
      </Box>
    </Box>
  );
}
