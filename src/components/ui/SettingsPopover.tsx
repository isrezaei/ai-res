"use client";

import { HStack, IconButton, Popover, Portal, Text } from "@chakra-ui/react";
import { useState, type ReactNode } from "react";
import { t } from "@/lib/i18n";
import { CloseIcon, GearIcon } from "./icons";

interface SettingsPopoverProps {
  /** Heading shown at the top of the panel. */
  title: string;
  /** Accessible label for the gear trigger. */
  triggerLabel: string;
  children: ReactNode;
  triggerSize?: "2xs" | "xs" | "sm";
}

/**
 * A controlled gear → popover used for every settings surface. Being controlled
 * makes the close behaviour reliable: outside-click and Escape both flow through
 * `onOpenChange`, and the header carries an explicit close affordance. Styled as
 * a soft, rounded, low-contrast card to match the rest of the 2026 UI.
 */
export function SettingsPopover({
  title,
  triggerLabel,
  children,
  triggerSize = "xs",
}: SettingsPopoverProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover.Root
      open={open}
      onOpenChange={(details) => setOpen(details.open)}
      positioning={{ placement: "bottom-end" }}
      lazyMount
      unmountOnExit
    >
      <Popover.Trigger asChild>
        <IconButton
          aria-label={triggerLabel}
          size={triggerSize}
          // Matches the other HoverFrame controls: subtle normally, solid while
          // the popover is open (its "active" state).
          variant={open ? "solid" : "subtle"}
          colorPalette="gray"
          borderRadius="md"
          className="no-print"
          _focusVisible={{ bg: "gray.solid", color: "gray.contrast" }}
        >
          <GearIcon />
        </IconButton>
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content
            width="270px"
            borderRadius="xl"
            boxShadow="panel"
            bg="white"
            overflow="hidden"
            className="no-print"
          >
            <HStack
              justify="space-between"
              align="center"
              px="3.5"
              py="2.5"
              borderBottomWidth="1px"
              borderColor="blackAlpha.100"
              bg="bg.subtle"
            >
              <Text
                fontSize="2xs"
                fontWeight="bold"
                color="fg.muted"
                letterSpacing="wider"
                textTransform="uppercase"
                lineClamp={1}
              >
                {title}
              </Text>
              <Popover.CloseTrigger asChild>
                <IconButton
                  aria-label={t.ads.close}
                  size="2xs"
                  variant="ghost"
                  colorPalette="gray"
                  borderRadius="full"
                >
                  <CloseIcon />
                </IconButton>
              </Popover.CloseTrigger>
            </HStack>
            <Popover.Body px="3.5" py="3.5">
              {children}
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
}
