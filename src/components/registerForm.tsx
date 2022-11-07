import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { registerMutation } from "../../lib/mutations";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const [confirmpassword, setConfirmPassword] = useState("");
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

      if (response.Sucess) router.replace("/");
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="h-screen">
      <div className="h-full px-6 text-gray-800">
        <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between xl:justify-center">
          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:ml-20 xl:w-5/12">
            <form onSubmit={handleSubmit}>
              <h1 className="mb-4 text-center text-lg">Register</h1>

              {/* <!-- First Name input --> */}
              <div className="mb-6">
                <input
                  type="text"
                  className="form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-4 py-2 text-xl font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First Name"
                />
              </div>

              {/* <!-- First Name input --> */}
              <div className="mb-6">
                <input
                  type="text"
                  className="form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-4 py-2 text-xl font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last Name"
                />
              </div>

              {/* <!-- Email input --> */}
              <div className="mb-6">
                <input
                  type="email"
                  className="form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-4 py-2 text-xl font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                />
              </div>

              {/* <!-- Password input --> */}
              <div className="mb-6">
                <input
                  type="password"
                  className="form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-4 py-2 text-xl font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </div>

              <div className="mb-6">
                <input
                  name="file"
                  type="file"
                  className="form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-4 py-2 text-xl font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
                  onChange={(e) => handleImageChange(e)}
                />
              </div>

              <div className="text-center lg:text-left">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-block rounded bg-blue-600 px-7 py-3 text-sm font-medium uppercase leading-snug text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"
                >
                  Register
                </button>
                <p className="mt-2 mb-0 pt-1 text-sm font-semibold">
                  {`Already have an account? `}
                  <Link href="/login">
                    <a className="text-blue-600 transition duration-200 ease-in-out hover:text-blue-700 focus:text-blue-700">
                      Login
                    </a>
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
