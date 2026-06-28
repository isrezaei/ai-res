import { Box } from "@chakra-ui/react";
import type { CSSProperties, ReactNode } from "react";
import { A4_HEIGHT_MM, A4_WIDTH_MM } from "@/lib/pagination";

/** Base body font size in px at scale 1.0; em-based resume typography multiplies this. */
const BASE_FONT_PX = 15;

interface A4PageProps {
  pageIndex: number;
  backgroundColor: string;
  /** Fixed A4 height for paginated templates; auto-growing sheet for column templates. */
  autoHeight?: boolean;
  paddingMm?: number;
  fontStack: string;
  fontScale: number;
  lineHeight: number;
  decorations?: ReactNode;
  /** When true the page frame supplies no padding so children control full-bleed columns. */
  bleed?: boolean;
  /**
   * Extra inline style for the content wrapper — the templates pass the resume's
   * text-tier CSS variables (`--rz-secondary`, `--rz-body`) here so every nested
   * field can paint the right family tint without prop-drilling the colours.
   */
  contentVars?: CSSProperties;
  children: ReactNode;
}

export function A4Page({
  pageIndex,
  backgroundColor,
  autoHeight = false,
  paddingMm = 16,
  fontStack,
  fontScale,
  lineHeight,
  decorations,
  bleed = false,
  contentVars,
  children,
}: A4PageProps) {
  return (
    <Box
      data-page-index={pageIndex}
      className="a4-page"
      position="relative"
      width={`${A4_WIDTH_MM}mm`}
      height={autoHeight ? "auto" : `${A4_HEIGHT_MM}mm`}
      minHeight={`${A4_HEIGHT_MM}mm`}
      bg={backgroundColor}
      overflow="hidden"
      style={{
        fontFamily: fontStack,
        fontSize: `${BASE_FONT_PX * fontScale}px`,
        lineHeight,
      }}
    >
      {decorations ? (
        <Box
          data-rz-decorations
          position="absolute"
          inset="0"
          zIndex={0}
          pointerEvents="none"
        >
          {decorations}
        </Box>
      ) : null}
      <Box
        position="relative"
        zIndex={1}
        height={autoHeight ? "auto" : "100%"}
        minHeight={`${A4_HEIGHT_MM}mm`}
        padding={bleed ? "0" : `${paddingMm}mm`}
        style={contentVars}
      >
        {children}
      </Box>
    </Box>
  );
}
