import type { AppType } from "next/dist/shared/lib/utils";
import Layout from "../components/layout";
import "../styles/globals.css";
import { QueryClientProvider, QueryClient } from "react-query";
import { SessionProvider } from "next-auth/react";

const MyApp: AppType = ({ Component, pageProps }) => {
  const queryClient = new QueryClient();

  return (
    //<QueryClientProvider client={queryClient}>
    <SessionProvider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />;
      </Layout>
    </SessionProvider>
    // </QueryClientProvider>
  );
};

export default MyApp;
