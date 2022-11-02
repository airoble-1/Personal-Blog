import type { AppType } from "next/dist/shared/lib/utils";
import Layout from "../components/layout";
import "../styles/globals.css";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
const MyApp: AppType = ({ Component, pageProps }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Component {...pageProps} />;
      </Layout>
    </QueryClientProvider>
  );
};

export default MyApp;
