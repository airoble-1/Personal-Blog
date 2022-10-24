import type { GetServerSideProps, NextPage } from "next";
import RegisterFrom from "../components/registerForm";
import { env } from "../env/server.mjs";
import { validateToken } from "../../lib/auth";
import { prisma } from "../../src/server/db/client";

const LoginPage: NextPage = ({}) => {
  return <RegisterFrom />;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  let id;
  try {
    const { id } = validateToken(ctx.req.cookies[env.COOKIE_NAME]);
  } catch (e) {
    return {
      props: {},
    };
  }

  const user = prisma.user.findUnique({
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
