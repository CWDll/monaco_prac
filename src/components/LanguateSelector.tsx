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

const Language = Object.entries(LANGUAGE_VERSION) as [string, string][];

const LanguateSelector = () => {
  return (
    <Box>
      <Text mb={2} fontSize="lg">
        Language:
      </Text>
      <Menu>
        <MenuButton as={Button}>Actions</MenuButton>
        <MenuList>
          <MenuItem>Download</MenuItem>
          <MenuItem>Create a Copy</MenuItem>
          <MenuItem>Mark as Draft</MenuItem>
          <MenuItem>Delete</MenuItem>
          <MenuItem>Attend a Workshop</MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};

export default LanguateSelector;
