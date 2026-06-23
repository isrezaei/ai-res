import { Box, VStack } from "@chakra-ui/react";
import type { ReactNode } from "react";
import { ContextualSidebar } from "./ContextualSidebar";
import { TopBar } from "./TopBar";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <VStack align="stretch" gap="0" height="100vh" bg="#f4f4f5">
      <TopBar />
      {/* Workspace: the canvas fills the full width and the A4 page stays centred
          in it. The side panel is an absolutely-positioned overlay, so opening or
          closing it never resizes the workspace or shifts the page. */}
      <Box position="relative" flex="1" overflow="hidden">
        {children}
        <ContextualSidebar />
      </Box>
    </VStack>
  );
}
