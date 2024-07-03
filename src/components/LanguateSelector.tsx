import {
  Box,
  Text,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { LANGUAGE_VERSION } from "../constants";

const languages = Object.entries(LANGUAGE_VERSION) as [string, string][];
console.log(languages);

const LanguateSelector = () => {
  return (
    <Box>
      <Text mb={2} fontSize="lg">
        Language:
      </Text>
      <Menu>
        {/* 현재 기본 언어를 javascript로 설정해두었기에 그대로 씀 */}
        <MenuButton as={Button}>javascript</MenuButton>
        <MenuList zIndex={1}>
          {languages.map(([language, version]) => (
            <MenuItem key={language}>
              {language}
              &nbsp;
              <Text as="span" fontSize="sm" color="gray.600">
                {version}
              </Text>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Box>
  );
};

export default LanguateSelector;
