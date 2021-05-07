import { CSSReset, ThemeProvider } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { Provider } from "urql";
import theme from "../theme";
import { createUrqlClient } from "../utils/createUrqlClient";

function MyApp({ Component, pageProps }: any) {
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default withUrqlClient(createUrqlClient)(MyApp);
