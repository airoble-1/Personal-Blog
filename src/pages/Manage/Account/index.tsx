import Image from "next/legacy/image";
import useSWR from "swr";
import AccountLayout from "../../../layouts/account";
import { useSession } from "next-auth/react";
import type { GetServerSideProps } from "next";
import { prisma } from "../../../server/db/client";
import { getToken } from "next-auth/jwt";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const ProfilePage = function () {
  const { data: session } = useSession();
  const { data, error, isLoading } = useSWR(`/api/user`, fetcher);

  return (
    <>
      <h4 className="fw-bold">Profile</h4>
      <div className="row d-flex justify-content-between">
        <div className="col-md-6">
          <form id="profile-form">
            <div className="form-group mb-3">
              <label className="fw-bold">Username</label>
              <input
                className="form-control"
                disabled
                value={session?.user.email}
              />
            </div>
            <div className="form-group mb-3">
              <label className="control-label fw-bold">Select Image</label>
              <input
                type="file"
                className="form-control"
                accept=".jpg,.png,.gif,.jpeg,.svg"
              />
            </div>
            <button
              id="update-profile-button"
              type="submit"
              className="btn btn-primary w-100 text-uppercase fw-bolder bg-dark fs-6"
            >
              update profile
            </button>
          </form>
        </div>
        <div className="col-md-4">
          {error && <div>Error: Failed to load Profile Image</div>}

          {isLoading && (
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          )}

          {!isLoading && !error && (
            <Image
              src={`${data.user.profileImage}`}
              className="img-fluid rounded"
              alt="profile image"
              width={320}
              height={320}
            />
          )}
        </div>
      </div>
    </>
  );
};

ProfilePage.Layout = AccountLayout;

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

export default ProfilePage;
