import Image from "next/legacy/image";
import useSWR, { useSWRConfig } from "swr";
import AccountLayout from "../../../layouts/account";
import { useSession } from "next-auth/react";
import type { GetServerSideProps } from "next";
import { prisma } from "../../../server/db/client";
import { getToken } from "next-auth/jwt";
import { useState, useRef } from "react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const ProfilePage = function () {
  const [mounted, setMounted] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const { data: session } = useSession();
  const { data, error, isLoading } = useSWR(`/api/user`, fetcher);
  const { mutate } = useSWRConfig();
  const profilePicture = useRef();

  const uploadFile = async function (image) {
    if (image) {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "my-uploads");
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dlwqjptsg/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      return response.json();
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsUploading(true);
    console.log({
      firstName,
      lastName,
      image: profilePicture.current.files[0],
    });
    let fileData;
    try {
      if (profilePicture.current.files[0]) {
        fileData = await uploadFile(profilePicture.current.files[0]);
        if (!fileData) return;
      }
      let data = {
        firstName,
        lastName,
        profileImage: fileData?.secure_url,
      };
      let dataObject = Object.fromEntries(
        Object.entries(data).filter(([_, v]) => v != null && v != "")
      );
      if (Object.keys(dataObject).length === 0) return;
      console.log("fileterd object", dataObject);
      const response = await fetch(
        `${window.location.origin}/api/user/${session.user.id}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataObject),
        }
      );
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      mutate(`/api/user`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsUploading(false);
      setFirstName("");
      setLastName("");
      profilePicture.current.value = null;
    }
  };
  return (
    <>
      <h4 className="fw-bold">Profile</h4>
      <div className="row d-flex justify-content-between">
        <div className="col-md-6">
          <form id="profile-form" onSubmit={(e) => handleSubmit(e)}>
            <div className="form-group mb-3">
              <label className="fw-bold">Username</label>
              <input
                className="form-control"
                disabled
                value={session?.user.email}
              />
            </div>
            <div className="form-group mb-3">
              <label className="control-label fw-bold">First Name</label>
              <input
                type="text"
                name="firstName"
                className="form-control"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div className="form-group mb-3">
              <label className="control-label fw-bold">Last Name</label>
              <input
                type="text"
                name="lastName"
                className="form-control"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div className="form-group mb-3">
              <label className="control-label fw-bold">Select Image</label>
              <input
                type="file"
                name="profileImage"
                className="form-control"
                accept=".jpg,.png,.gif,.jpeg,.svg"
                ref={profilePicture}
              />
            </div>
            <button
              id="update-profile-button"
              type="submit"
              className="btn btn-primary w-100 text-uppercase fw-bolder bg-dark fs-6"
              disabled={isUploading}
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
              className="img-fluid rounded-circle"
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
