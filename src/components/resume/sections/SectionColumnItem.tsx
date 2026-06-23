"use client";

import { SectionHoverFrame } from "@/components/resume/editor/SectionHoverFrame";
import { SectionTitleBlock } from "@/components/resume/editor/SectionTitleBlock";
import type { ResumeData, SectionMeta } from "@/types";
import { SectionContent } from "./SectionContent";

interface SectionColumnItemProps {
  section: SectionMeta;
  resume: ResumeData;
  accent: string;
  soft: string;
  titleColor?: string;
  showRule?: boolean;
}

/** A titled section block (title + content) for the column-based templates. */
export function SectionColumnItem({
  section,
  resume,
  accent,
  soft,
  titleColor,
  showRule = false,
}: SectionColumnItemProps) {
  return (
    <SectionHoverFrame
      section={section}
      title={
        <SectionTitleBlock section={section} accentColor={titleColor ?? accent} showRule={showRule} />
      }
    >
      <SectionContent section={section} resume={resume} accent={accent} soft={soft} />
    </SectionHoverFrame>
  );
}
