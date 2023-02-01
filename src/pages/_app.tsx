import "bootstrap/dist/css/bootstrap.min.css";
import MainLayout from "../layouts/main";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { MantineProvider } from "@mantine/core";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const Layout = Component.Layout || EmptyLayout;
  return (
    <SessionProvider session={session}>
      <MantineProvider
        theme={{
          // Override any other properties from default theme
          fontFamily: "Arial, sans serif",
        }}
      >
        <MainLayout>
          <Layout>
            <Component {...pageProps} />;
          </Layout>
        </MainLayout>
      </MantineProvider>
    </SessionProvider>
  );
}

export default MyApp;

const EmptyLayout = ({ children }) => <>{children}</>;
