import AccountLayout from "../../../layouts/account";
import { useForm } from "react-hook-form";
import type { GetServerSideProps } from "next";
import { prisma } from "../../../server/db/client";
import { getToken } from "next-auth/jwt";
import { useState, useRef } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

const PasswordPage = function () {
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSucess] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    shouldUnregister: true,
  });
  const password = useRef();
  password.current = watch("newPassword", "");

  const submitHandler = async (userData) => {
    setShowError(false);
    setShowSucess(false);
    setIsLoading(true);
    try {
      const response = await fetch(
        `${window.location.origin}/api/user/updatePassword`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(userData),
        }
      );
      reset();
      const resObj = await response.json();
      if (resObj.error === true) setShowError(true);
      if (resObj.error === false) setShowSucess(true);
      setMessage(resObj.message);
      console.log(resObj);
      setIsLoading(false);
    } catch (error) {}
  };

  return (
    <>
      <h4 className="fw-bold">Pasword</h4>
      <div className="row">
        <div className="col-md-6">
          {showSuccess && (
            <Alert
              variant="success"
              onClose={() => setShowSucess(false)}
              dismissible
            >
              <p>Success: {message}</p>
            </Alert>
          )}
          {showError && (
            <Alert
              variant="danger"
              onClose={() => setShowError(false)}
              dismissible
            >
              <p>Error: {message}</p>
            </Alert>
          )}

          <form onSubmit={handleSubmit((data) => submitHandler(data))}>
            <div className="text-danger"></div>
            <div className="form-group">
              <label className="fw-bold">Current Password</label>
              <input
                className="form-control"
                type="password"
                {...register("currentPassword", {
                  required: "You must specify old password",
                })}
              />
              {errors.currentPassword && (
                <div className="text-danger">
                  {errors.currentPassword.message}
                </div>
              )}
            </div>
            <div className="form-group mt-2">
              <label className="fw-bold">New Password</label>
              <input
                className="form-control"
                type="password"
                {...register("newPassword", {
                  required: "You must specify a new password",
                  minLength: {
                    value: 8,
                    message: "Password must have at least 8 characters",
                  },
                })}
              />
              {errors.newPassword && (
                <div className="text-danger">{errors.newPassword.message}</div>
              )}
            </div>
            <div className="form-group mt-2">
              <label className="fw-bold">Confirm Password</label>
              <input
                className="form-control"
                type="password"
                {...register("confirmPassword", {
                  validate: (value) =>
                    value === password.current || "The passwords do not match",
                })}
              />
              {errors.confirmPassword && (
                <p className="text-danger">{errors.confirmPassword.message}</p>
              )}
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100 text-uppercase fw-bolder bg-dark fs-6 mt-3"
              disabled={isLoading}
            >
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
