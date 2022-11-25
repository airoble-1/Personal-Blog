import type { AppType } from "next/dist/shared/lib/utils";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "../components/layout";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";

const MyApp: AppType = ({ Component, pageProps }) => {
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
