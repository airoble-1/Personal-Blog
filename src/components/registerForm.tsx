import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { registerMutation } from "../../lib/mutations";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [selectedFIle, setSelectedFile] = useState<File>();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleImageChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    const fileList = e.target.files;
    if (!fileList) return;
    setSelectedFile(fileList[0]);
  };

  const uploadFile = async function () {
    if (selectedFIle) {
      const formData = new FormData();
      formData.append("file", selectedFIle);
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

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = await uploadFile();
      console.log(data);
      if (!data) return;
      const response = await registerMutation("register", {
        firstName,
        lastName,
        email,
        password,
        profileImage: data.secure_url,
      });
      console.log(response);
      setIsLoading(false);
      if (response.success) router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h2 className="fw-bold">Register</h2>
      <div className="row gx-4 gx-lg-5 justify-content-center">
        <div className="col-md-6 col-lg-6 col-xl-6">
          <form onSubmit={handleSubmit}>
            <h3 className="fw-bolder">Create a new account.</h3>
            <hr />
            <div className="row">
              <div className="col-12 col-lg-6">
                <div className="form-group mb-2">
                  <label className="fw-bold">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                  />
                  <span className="text-danger"></span>
                </div>
              </div>
              <div className="col-12 col-lg-6 mb-2">
                <div className="form-group">
                  <label className="fw-bold">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                  />
                  <span className="text-danger"></span>
                </div>
              </div>
            </div>
            <div className="form-group mb-2">
              <label className="fw-bold">Email</label>
              <input
                type="email"
                className="form-control"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <span className="text-danger"></span>
            </div>
            <div className="form-group mb-2">
              <label className="fw-bold">Profile Image</label>
              <input
                name="file"
                type="file"
                className="form-control"
                onChange={(e) => handleImageChange(e)}
                accept=".png,.jpg,.bmp,.tif,.gif"
              />
              <span className="text-danger"></span>
            </div>
            <div className="row">
              <div className="col-12 col-lg-6">
                <div className="form-group mb-2">
                  <label className="fw-bold">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                  <span className="text-danger"></span>
                </div>
              </div>
              <div className="col-12 col-lg-6">
                <div className="form-group">
                  <label className="fw-bold">Confirm password</label>
                  <input
                    type="password"
                    className="form-control"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                  />
                  <span className="text-danger"></span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary w-100 fw-bold my-3"
            >
              Register
            </button>
            <p className="fw-bold">
              {`Already have an account? `}
              <Link href="/login">
                <a className="text-primary fw-bold">Login</a>
              </Link>
            </p>
          </form>
        </div>
        <div className="col-md-6 col-md-offset-2">
          <section>
            <h3 className="fw-bold">Use another service to register.</h3>
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
