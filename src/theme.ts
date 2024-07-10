import { extendBaseTheme } from "@chakra-ui/react";

const theme = extendBaseTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  styles: {
    global: {
      body: {
        bg: "#0f0a19",
        color: "gray.200",
      },
    },
  },
});
export default theme;
