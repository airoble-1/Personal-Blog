import type { GetServerSideProps, NextPage } from "next";
import LoginForm from "../components/loginForm";
import { env } from "../env/server.mjs";
import { validateToken } from "../../lib/auth";
import { prisma } from "../../src/server/db/client";

const LoginPage: NextPage = ({}) => {
  return <LoginForm></LoginForm>;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  let id;
  try {
    const payload = validateToken(ctx.req.cookies[env.COOKIE_NAME] as string);

    id = payload.id;
  } catch (e) {
    return {
      props: {},
    };
  }

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (user) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
};
export default LoginPage;
