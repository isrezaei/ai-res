"use client";

import { HStack, VStack } from "@chakra-ui/react";
import { A4Page } from "@/components/resume/canvas/A4Page";
import { ColumnBody, type ColumnSectionRun } from "@/components/resume/canvas/ColumnBody";
import { ResumeBackground } from "@/components/resume/canvas/ResumeBackground";
import { TemplateSection } from "@/components/resume/sections/TemplateSection";
import { type ColumnTemplateLayout, useColumnLayout } from "@/hooks/resume/useColumnLayout";
import { getFontStack } from "@/lib/fonts/registry";
import { darken, resolveTheme, resumeTextVars } from "@/lib/themes";
import type { RemovableSectionType, TemplateProps } from "@/types";
import { HeaderBand } from "../_shared/HeaderBand";

/** The narrower column carries the summary + supporting sections (قالب ۴). */
const LAYOUT: ColumnTemplateLayout = {
  sideTypes: new Set<RemovableSectionType>(["summary", "languages", "certifications"]),
  flex: { main: 1.5, side: 1, gapMm: 8 },
  // The band is full-bleed and padded by the page margin (top + bottom), plus the
  // padded HStack below it — reserve that margin-scaled chrome on page 1.
  header: {
    kind: "full",
    estimate: { identity: true, contacts: true, photo: true, photoSizePx: 92 },
    chromeMm: (margin) => margin * 3,
  },
};

export function HeaderBandTemplate({ resume, theme }: TemplateProps) {
  const colors = resolveTheme(theme);
  const backgroundColor = theme.pageBackground === "white" ? "#FFFFFF" : colors.soft;
  const fontStack = getFontStack(theme.fontFamily);
  const pad = `${theme.pageMargin}mm`;
  const bandColor = darken(colors.accent, 0.28);
  const pages = useColumnLayout(resume, LAYOUT);

  const renderSection = ({ section, itemIds, showTitle }: ColumnSectionRun) => (
    <TemplateSection
      section={section}
      resume={resume}
      accent={colors.accent}
      soft={colors.soft}
      variant="solidUnderline"
      compact
      itemIds={itemIds}
      showTitle={showTitle}
    />
  );

  return (
    <VStack gap="6" align="center" className="resume-pages">
      {Array.from({ length: pages.pageCount }).map((_, page) => (
        <A4Page
          key={page}
          pageIndex={page}
          bleed
          backgroundColor={backgroundColor}
          fontStack={fontStack}
          fontScale={theme.fontScale}
          lineHeight={theme.lineHeight}
          decorations={<ResumeBackground theme={theme} colors={colors} idSuffix={`header-band-p${page}`} />}
          contentVars={resumeTextVars(colors.secondary, colors.bodyText, colors.subtitle)}
        >
          <VStack align="stretch" gap="0" minH="inherit">
            {page === 0 ? (
              <HeaderBand bandColor={bandColor} contrastText={colors.contrastText} padMm={theme.pageMargin} />
            ) : null}
            <HStack align="flex-start" gap="8mm" padding={pad} dir="rtl">
              <VStack align="stretch" flex="1.5" minW="0" gap="0">
                <ColumnBody blocks={pages.main[page] ?? []} sections={resume.sections} renderSection={renderSection} />
              </VStack>
              <VStack align="stretch" flex="1" minW="0" gap="0">
                <ColumnBody blocks={pages.side[page] ?? []} sections={resume.sections} renderSection={renderSection} />
              </VStack>
            </HStack>
          </VStack>
        </A4Page>
      ))}
    </VStack>
  );
}
