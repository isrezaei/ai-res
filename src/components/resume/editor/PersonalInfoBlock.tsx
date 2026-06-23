"use client";

import { memo } from "react";
import { Box, HStack, VStack } from "@chakra-ui/react";
import { usePersonalInfo } from "@/hooks/store/usePersonalInfo";
import { CONTENT_BORDER_HOVER, HoverFrame } from "./HoverFrame";
import { PersonalInfoContacts } from "./PersonalInfoContacts";
import { PersonalInfoIdentity } from "./PersonalInfoIdentity";
import { PersonalInfoSettings } from "./PersonalInfoSettings";
import { ProfileImageEditor } from "./ProfileImageEditor";

interface PersonalInfoBlockProps {
  accentColor: string;
}

export const PersonalInfoBlock = memo(function PersonalInfoBlock({
  accentColor,
}: PersonalInfoBlockProps) {
  const { personalInfo } = usePersonalInfo();

  // Same hover pattern as every section: the name and the inline HoverFrame share
  // a space-between row OUTSIDE the border, and the contacts beneath are wrapped
  // by the hover content border.
  return (
    <Box className="group">
      <HStack align="flex-start" gap="22px" pb="22px" dir="rtl">
        {personalInfo.fieldVisibility.photo ? <ProfileImageEditor /> : null}
        <VStack align="stretch" flex="1" minW="0" gap="16px">
          <PersonalInfoIdentity
            accentColor={accentColor}
            rightSlot={
              <HoverFrame>
                <PersonalInfoSettings triggerSize="2xs" />
              </HoverFrame>
            }
          />
          <Box borderRadius="md" _groupHover={CONTENT_BORDER_HOVER}>
            <PersonalInfoContacts accentColor={accentColor} />
          </Box>
        </VStack>
      </HStack>
    </Box>
  );
});
