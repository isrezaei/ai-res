import { t } from "@/lib/i18n";
import type { BackgroundPatternId } from "@/types";

export interface BackgroundOption {
  id: BackgroundPatternId;
  label: string;
  /**
   * Thumbnail viewport framing this pattern's busiest corner, so each swatch
   * shows a real preview of its own motif. The family anchors different corners,
   * so a single shared window would leave some thumbnails blank.
   */
  thumbViewBox: string;
}

export const backgroundOptions: BackgroundOption[] = [
  { id: "none", label: t.backgrounds.none, thumbViewBox: "114 -6 96 96" },
  { id: "blobs", label: t.backgrounds.blobs, thumbViewBox: "114 -6 96 96" },
  { id: "botanical", label: t.backgrounds.botanical, thumbViewBox: "118 -8 92 92" },
  { id: "chevronBands", label: t.backgrounds.chevronBands, thumbViewBox: "118 0 92 92" },
  { id: "bracketsRings", label: t.backgrounds.bracketsRings, thumbViewBox: "118 2 92 92" },
  { id: "chevronField", label: t.backgrounds.chevronField, thumbViewBox: "78 18 92 92" },
  { id: "rainbow", label: t.backgrounds.rainbow, thumbViewBox: "106 -12 92 92" },
  { id: "concentricArcs", label: t.backgrounds.concentricArcs, thumbViewBox: "0 205 92 92" },
  { id: "dotGrid", label: t.backgrounds.dotGrid, thumbViewBox: "0 0 92 92" },
  { id: "topoLines", label: t.backgrounds.topoLines, thumbViewBox: "40 150 108 108" },
];
