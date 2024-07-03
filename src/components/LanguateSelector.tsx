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

const LanguateSelector: React.FC<LanguateSelectorProps> = ({
  language,
  onSelect,
}) => {
  return (
    <Box>
      <Text mb={2} fontSize="lg">
        Language:
      </Text>
      <Menu>
        {/* 현재 기본 언어를 javascript로 설정해두었기에 그대로 씀 */}
        <MenuButton as={Button}>{language}</MenuButton>
        <MenuList zIndex={1}>
          {languages.map(([language, version]) => (
            <MenuItem
              key={language}
              onClick={() => {
                onSelect(language);
              }}
            >
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
