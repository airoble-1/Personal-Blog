import "bootstrap/dist/css/bootstrap.min.css";
import MainLayout from "../layouts/main";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const Layout = Component.Layout || EmptyLayout;
  return (
    <SessionProvider session={session}>
      <MainLayout>
        <Layout>
          <Component {...pageProps} />;
        </Layout>
      </MainLayout>
    </SessionProvider>
  );
}

export default MyApp;

const EmptyLayout = ({ children }) => <>{children}</>;
