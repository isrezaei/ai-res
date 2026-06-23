"use client";

import { Box, chakra, Grid } from "@chakra-ui/react";
import { BackgroundLayer } from "@/components/resume/backgrounds/BackgroundLayer";
import { CheckIcon } from "@/components/ui/icons";
import { Tooltip } from "@/components/ui/Tooltip";
import { useTheme } from "@/hooks/store/useTheme";
import { backgroundOptions } from "@/lib/backgrounds/options";
import { COLORS, RADII, SHADOWS } from "@/lib/design/tokens";
import { resolveTheme } from "@/lib/themes";

export function BackgroundGrid() {
  const { theme, setBackgroundPattern } = useTheme();
  const colors = resolveTheme(theme);

  return (
    <Grid templateColumns="repeat(4, 1fr)" gap="10px">
      {backgroundOptions.map((option) => {
        const isActive = theme.backgroundPattern === option.id;
        return (
          // The pattern name shows only as a hover popover (English) — there is no
          // caption under the thumbnail, so the tooltip is the accessible name too.
          <Tooltip key={option.id} label={option.name}>
            <chakra.button
              type="button"
              aria-label={option.name}
              aria-pressed={isActive}
              position="relative"
              width="100%"
              aspectRatio="1"
              overflow="hidden"
              bg={colors.soft}
              // Shadow-as-border: a calm hairline ring on every thumbnail, an
              // accent halo ring (+ badge) on the selected one.
              transition="transform 0.1s, box-shadow 0.12s"
              _hover={{ transform: "scale(1.04)" }}
              style={{ borderRadius: RADII.card, boxShadow: isActive ? SHADOWS.ring : SHADOWS.hairlineRing }}
              onClick={() => setBackgroundPattern(option.id)}
            >
              <Box position="absolute" inset="0">
                <BackgroundLayer
                  pattern={option.id}
                  accent={colors.accent}
                  base={colors.base}
                  soft={colors.soft}
                  idSuffix={`thumb-${option.id}`}
                  preserveAspectRatio="xMidYMid slice"
                  viewBox={option.thumbViewBox}
                />
              </Box>
              {isActive ? (
                <Box
                  position="absolute"
                  top="5px"
                  insetInlineStart="5px"
                  width="16px"
                  height="16px"
                  borderRadius="full"
                  color="white"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  fontSize="10px"
                  style={{ background: COLORS.accent, boxShadow: SHADOWS.badge }}
                >
                  <CheckIcon />
                </Box>
              ) : null}
            </chakra.button>
          </Tooltip>
        );
      })}
    </Grid>
  );
}
