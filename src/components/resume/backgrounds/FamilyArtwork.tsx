import type { BackgroundPatternId } from "@/types";
import {
  BOTANICAL,
  BOTANICAL_OPACITY,
  BRACKET_PATH,
  BRACKETS_MARKS,
  BRACKETS_OPACITY,
  BRACKETS_RINGS,
  CHEVRON_BANDS,
  CHEVRON_FIELD,
  CONCENTRIC_ARCS,
  DOT_GRID,
  RAINBOW_STRIPES,
  TOPO_LINES,
} from "@/lib/backgrounds/patternGeometry";

interface FamilyArtworkProps {
  pattern: BackgroundPatternId;
  /** Single theme hue every motif recolours with (the rainbow ignores it). */
  accent: string;
}

/**
 * The "Resume Pattern Family" motifs (design source of truth). Each is
 * corner-anchored and drawn in one theme hue via `currentColor` at the design's
 * opacities, so they recolour with the user's accent. The rainbow is the lone
 * fixed-palette exception. Pure SVG (no filters/defs) keeps the browser preview
 * and the Puppeteer PDF identical.
 */
export function FamilyArtwork({ pattern, accent }: FamilyArtworkProps) {
  switch (pattern) {
    case "botanical":
      return (
        <g style={{ color: accent }}>
          {BOTANICAL.blobs.map((b, i) => (
            <ellipse key={`b${i}`} cx={b.cx} cy={b.cy} rx={b.rx} ry={b.ry} fill="currentColor" fillOpacity={BOTANICAL_OPACITY.blob} />
          ))}
          {BOTANICAL.stems.map((d, i) => (
            <path key={`s${i}`} d={d} fill="none" stroke="currentColor" strokeOpacity={BOTANICAL_OPACITY.stem} strokeWidth={0.6} strokeLinecap="round" />
          ))}
          {BOTANICAL.leaves.map((lf, i) => (
            <g key={`l${i}`} fill="none" stroke="currentColor" strokeOpacity={BOTANICAL_OPACITY.leaf}>
              <path d={lf.outline} strokeWidth={0.6} strokeLinejoin="round" />
              <path d={lf.mid} strokeWidth={0.45} />
            </g>
          ))}
          {BOTANICAL.sdots.map((d, i) => (
            <circle key={`d${i}`} cx={d.x} cy={d.y} r={d.r} fill="currentColor" fillOpacity={BOTANICAL_OPACITY.dot} />
          ))}
        </g>
      );
    case "chevronBands":
      return (
        <g style={{ color: accent }} fill="none" stroke="currentColor" strokeWidth={0.7} strokeLinejoin="round" strokeLinecap="round">
          {CHEVRON_BANDS.map((z, i) => (
            <polyline key={i} points={z.pts} strokeOpacity={z.o} />
          ))}
        </g>
      );
    case "bracketsRings":
      return (
        <g style={{ color: accent }} fill="none" stroke="currentColor" strokeWidth={1} strokeOpacity={BRACKETS_OPACITY} strokeLinecap="round">
          {BRACKETS_MARKS.map((m, i) => (
            <path key={`m${i}`} d={BRACKET_PATH} transform={`translate(${m.x} ${m.y}) rotate(${m.rot})`} />
          ))}
          {BRACKETS_RINGS.map((r, i) => (
            <circle key={`r${i}`} cx={r.x} cy={r.y} r={r.r} />
          ))}
        </g>
      );
    case "chevronField":
      return (
        <g style={{ color: accent }} fill="none" stroke="currentColor" strokeWidth={0.7} strokeLinecap="round" strokeLinejoin="round">
          {CHEVRON_FIELD.map((c, i) => (
            <path key={i} d={c.d} strokeOpacity={c.o} />
          ))}
        </g>
      );
    case "rainbow":
      return (
        <g strokeWidth={5} strokeLinecap="round" fill="none">
          {RAINBOW_STRIPES.map((s, i) => (
            <line key={i} x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} stroke={s.stroke} />
          ))}
        </g>
      );
    case "concentricArcs":
      return (
        <g style={{ color: accent }} fill="none" stroke="currentColor" strokeWidth={0.7}>
          {CONCENTRIC_ARCS.map((a, i) => (
            <path key={i} d={a.d} strokeOpacity={a.o} />
          ))}
        </g>
      );
    case "dotGrid":
      return (
        <g style={{ color: accent }} fill="currentColor">
          {DOT_GRID.map((d, i) => (
            <circle key={i} cx={d.x} cy={d.y} r={d.r} fillOpacity={d.o} />
          ))}
        </g>
      );
    case "topoLines":
      return (
        <g style={{ color: accent }} fill="none" stroke="currentColor" strokeWidth={0.7}>
          {TOPO_LINES.map((t, i) => (
            <path key={i} d={t.d} strokeOpacity={t.o} />
          ))}
        </g>
      );
    default:
      return null;
  }
}
