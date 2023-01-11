import Image from "next/legacy/image";
import useSWR from "swr";
import AccountLayout from "../../../layouts/account";

import { useSession } from "next-auth/react";
import type { GetServerSideProps } from "next";
import { prisma } from "../../../server/db/client";
import { getToken } from "next-auth/jwt";
const fetcher = (url: string) => fetch(url).then((res) => res.json());

const PasswordPage = function () {
  const { data, error, isLoading } = useSWR(`/api/user`, fetcher);

  return (
    <>
      <h4>Pasword</h4>
      <div className="row">
        <div className="col-md-6">
          <form id="change-password-form" method="post">
            <div className="text-danger"></div>
            <div className="form-group">
              <label></label>
              <input className="form-control" />
              <span className="text-danger"></span>
            </div>
            <div className="form-group">
              <label></label>
              <input className="form-control" />
              <span className="text-danger"></span>
            </div>
            <div className="form-group">
              <label></label>
              <input className="form-control" />
              <span className="text-danger"></span>
            </div>
            <button type="submit" className="btn btn-primary">
              Update password
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

PasswordPage.Layout = AccountLayout;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  let id;

  try {
    const { req } = ctx;
    const token = await getToken({ req });
    if (!token) {
      return {
        redirect: {
          permanent: false,
          destination: "/",
        },
      };
    }

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

  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
  return {
    props: {},
  };
};

export default PasswordPage;
