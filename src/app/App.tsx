import React from "react";
import { ApolloProvider } from "@apollo/client";
import { ConfigProvider } from "antd";
import { apolloClient } from "./providers/apollo-client";
import { useTheme } from "./providers/theme";
import { AppRouter } from "./routing";
import { ThemeProvider } from "@/shared/ui";

function App() {
  const theme = useTheme();

  return (
    <ApolloProvider client={apolloClient}>
      <ConfigProvider theme={theme}>
        <ThemeProvider>
          <AppRouter />
        </ThemeProvider>
      </ConfigProvider>
    </ApolloProvider>
  );
}

export default App; 