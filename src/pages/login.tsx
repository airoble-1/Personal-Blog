import type { GetServerSideProps, NextPage } from "next";
import LoginForm from "../components/loginForm";
import { validateToken } from "../../lib/auth";
import { prisma } from "../../src/server/db/client";
import { getToken } from "next-auth/jwt";

const LoginPage: NextPage = ({}) => {
  return <LoginForm></LoginForm>;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  let id;

  try {
    const { req } = ctx;
    const token = await getToken({ req });
    console.log("JSON Web Token", token);
    // const payload = validateToken(
    //   ctx.req.cookies["next-auth.session-token"] as string
    // );

    id = token.id;
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
