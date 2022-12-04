import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";

type Formvalues = {
  email: string;
  password: string;
};

export default function LoginForm() {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Formvalues>();
  async function submitHandler(data) {
    const { email, password } = data;
    // e.preventDefault();
    setIsLoading(true);
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (!result.error) router.push("/");
    setIsLoading(false);
  }

  return (
    <div className="container">
      <h2 className="fw-bold">Login</h2>
      <div className="row gx-4 gx-lg-5 justify-content-center">
        <div className="col-md-6 col-lg-6 col-xl-6">
          <form onSubmit={handleSubmit((data) => submitHandler(data))}>
            <h3 className="fw-bolder">Use a local account to login.</h3>
            <hr />
            <div className="form-group mb-2">
              <label className="fw-bold">Email</label>
              <input
                type="email"
                className="form-control fw-bold"
                {...register("email", {
                  required: "Email is required",
                })}
                // onChange={(e) => setEmail(e.target.value)}
                // value={email}
              />
              {errors.email && (
                <span className="text-danger">{errors.email.message}</span>
              )}
            </div>
            <div className="form-group mb-2">
              <label className="fw-bold">Password</label>
              <input
                type="password"
                className="form-control"
                {...register("password", { required: "Password is required" })}
                // onChange={(e) => setPassword(e.target.value)}
                // value={password}
              />
              {errors.password && (
                <span className="text-danger">{errors.password.message}</span>
              )}
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label
                className="form-check-label fw-bold"
                htmlFor="flexCheckDefault"
              >
                Remember me?
              </label>
            </div>
            <p className="">
              <Link href="/">
                <a className="text-secondary fw-bold">Forgot your password?</a>
              </Link>
            </p>
            <p className="">
              <Link href="/">
                <a className="text-secondary fw-bold">Register as a new user</a>
              </Link>
            </p>
            <p className="">
              <Link href="/login">
                <a className="text-secondary fw-bold">
                  Resend email confirmation
                </a>
              </Link>
            </p>
            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-secondary w-100 fw-bold my-2"
            >
              Login
            </button>
            <p className="fw-bold">
              {`Already have an account? `}
              <Link href="/login">
                <a className="text-decoration-none">Login</a>
              </Link>
            </p>
          </form>
        </div>
        <div className="col-md-6 col-md-offset-2">
          <section>
            <h3 className="fw-bold">Use another service to login.</h3>
            <hr />
            <div>
              <p>
                There are no external authentication services configured. See
                this <a href="https://next-auth.js.org/"> article</a> for
                details on setting up this Next.JS application to support
                logging in via external services.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
