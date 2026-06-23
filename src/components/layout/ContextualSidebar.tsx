"use client";

import { Box, VStack } from "@chakra-ui/react";
import AdvertisingUi from "@/components/ads/advertising.ui";
import { DesignPanel } from "@/components/panels/design/DesignPanel";
import { RearrangePanel } from "@/components/panels/rearrange/RearrangePanel";
import { TemplatesPanel } from "@/components/panels/templates/TemplatesPanel";
import { useActivePanel } from "@/hooks/store/useActivePanel";
import { useSidebar } from "@/hooks/store/useSidebar";
import { RADII, SHADOWS } from "@/lib/design/tokens";

/**
 * The contextual side panel, docked to the RTL start (physical right) as an
 * overlay. It is always mounted and slides on `transform` + `opacity` only —
 * GPU-friendly, no width/layout reflow — so toggling it never resizes the
 * workspace or shifts the centred A4 page. Open/close is driven entirely from
 * the topbar's toggle (`useSidebar`); the panel carries no close control of its
 * own.
 */
export function ContextualSidebar() {
  const { activePanel } = useActivePanel();
  const { collapsed } = useSidebar();

  return (
    <Box
      className="no-print"
      position="absolute"
      top="0"
      bottom="0"
      insetInlineStart="0"
      width="344px"
      p="4"
      zIndex={30}
      pointerEvents={collapsed ? "none" : "auto"}
      aria-hidden={collapsed}
      style={{
        transform: collapsed ? "translateX(calc(100% + 24px))" : "translateX(0)",
        opacity: collapsed ? 0 : 1,
        transition: "transform 0.28s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s ease",
        willChange: "transform",
      }}
    >
      <VStack
        as="aside"
        align="stretch"
        gap="0"
        height="100%"
        width="312px"
        bg="white"
        overflow="hidden"
        style={{ borderRadius: RADII.panel, boxShadow: SHADOWS.panel }}
      >
        <Box flex="1" overflowY="auto" className="om-scroll">
          <Box style={{ padding: "22px 22px 28px" }}>
            {activePanel === "design" ? <DesignPanel /> : null}
            {activePanel === "templates" ? <TemplatesPanel /> : null}
            {activePanel === "rearrange" ? <RearrangePanel /> : null}
            <Box mt="26px">
              <AdvertisingUi isShow={true} AdvertisingId={"pos-article-display-112303"} />
            </Box>
          </Box>
        </Box>
      </VStack>
    </Box>
  );
}
