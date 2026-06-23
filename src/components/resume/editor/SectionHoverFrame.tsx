"use client";

import type { ReactNode } from "react";
import { IconButton } from "@chakra-ui/react";
import { PlusIcon, TrashIcon } from "@/components/ui/icons";
import { Tooltip } from "@/components/ui/Tooltip";
import { useSectionActions } from "@/hooks/store/useSectionActions";
import { useSectionEmptyState } from "@/hooks/store/useSectionEmptyState";
import { t } from "@/lib/i18n";
import type { SectionMeta } from "@/types";
import { frameButtonProps } from "./HoverFrame";
import { SectionFrame } from "./SectionFrame";
import { SectionSettingsPopover } from "./SectionSettingsPopover";

interface SectionHoverFrameProps {
  section: SectionMeta;
  /** The section's rendered title; sits on the title row beside the HoverFrame. */
  title: ReactNode;
  /** The section content, wrapped by the hover border. */
  children: ReactNode;
}

/**
 * Builds a section's controls (add / delete / settings) and renders them inline
 * with the title via {@link SectionFrame}. The title block stays pure
 * presentation; every hover handler lives here.
 */
export function SectionHoverFrame({ section, title, children }: SectionHoverFrameProps) {
  const { addEntry } = useSectionEmptyState(section.type);
  const { toggleSectionVisibility } = useSectionActions();

  return (
    <SectionFrame
      title={title}
      controls={
        <>
          {addEntry ? (
            <Tooltip label={t.sectionToolbar.addEntry}>
              <IconButton aria-label={t.sectionToolbar.addEntry} {...frameButtonProps} onClick={addEntry}>
                <PlusIcon />
              </IconButton>
            </Tooltip>
          ) : null}
          <Tooltip label={t.sectionToolbar.delete}>
            <IconButton
              aria-label={t.sectionToolbar.delete}
              {...frameButtonProps}
              onClick={() => toggleSectionVisibility(section.id)}
            >
              <TrashIcon />
            </IconButton>
          </Tooltip>
          <SectionSettingsPopover section={section} />
        </>
      }
    >
      {children}
    </SectionFrame>
  );
}
