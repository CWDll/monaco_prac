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

// props 타입 정의
interface LanguateSelectorProps {
  language: string;
  onSelect: (language: string) => void;
}

// 색깔 명 지정
const ACTIVE_COLOR = "blue.400";

const LanguateSelector: React.FC<LanguateSelectorProps> = ({
  language,
  onSelect,
}) => {
  return (
    <Box ml={2} mb={4}>
      <Text mb={2} fontSize="lg">
        Language:
      </Text>
      <Menu>
        {/* 현재 기본 언어를 javascript로 설정해두었기에 그대로 씀 */}
        <MenuButton as={Button}>{language}</MenuButton>
        <MenuList zIndex={1} bg="#110c1b">
          {languages.map(([lang, version]) => (
            <MenuItem
              key={lang}
              color={lang === language ? ACTIVE_COLOR : ""}
              bg={lang === language ? "#gray.900" : "transparent"}
              _hover={{
                color: ACTIVE_COLOR,
                bg: "#gray.900",
              }}
              onClick={() => {
                onSelect(lang);
              }}
            >
              {lang}
              &nbsp;
              <Text as="span" fontSize="sm" color="gray.600">
                ({version})
              </Text>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Box>
  );
};

export default LanguateSelector;
