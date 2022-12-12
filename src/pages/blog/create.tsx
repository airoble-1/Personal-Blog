import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";

type Formvalues = {
  name: string;
  description: string;
  file: File;
};

const Home: NextPage = () => {
  // const [nameValue, setName] = useState("");
  // const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const [selectedFIle, setSelectedFile] = useState();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Formvalues>();

  // const handleImageChange = function (data) {
  //   const fileList = e.target.files;
  //   if (!fileList) return;
  //   setSelectedFile(fileList[0]);
  // };

  const uploadFile = async function (data) {
    if (data.file[0]) {
      const formData = new FormData();
      formData.append("file", data.file[0]);
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
  async function submitHandler(userData) {
    // e.preventDefault();
    const { name, description } = userData;
    setIsLoading(true);
    try {
      const fileData = await uploadFile(userData);

      if (!fileData) return;
      const response = await fetch(`${window.location.origin}/api/blog`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          featureimage: fileData.secure_url,
        }),
      });
      setIsLoading(false);
      if (!response.ok) throw Error("Failed to create post");
      const data = await response.json();
      if (data.message) router.push("/");
    } catch (error) {
      setIsLoading(false);
      console.log("sadsadsa:");
    }
  }
  return (
    <div className="container">
      <div className="row gx-4 gx-lg-5 justify-content-center">
        <div className="col-md-12 col-lg-8 col-xl-7">
          <h1 className="fw-bold">Create</h1>

          <h3 className="fw-bolder">Blog</h3>
          <hr />
          <form onSubmit={handleSubmit((data) => submitHandler(data))}>
            <div className="text-danger"></div>
            <div className="form-group mb-3">
              <label className="control-label fw-bold fs-5 mb-2">Name</label>
              <input
                type="text"
                {...register("name", {
                  required: "Blog name is required",
                  minLength: {
                    value: 2,
                    message:
                      "The name must be at least 2 to 100 characters long.",
                  },
                  maxLength: {
                    value: 100,
                    message:
                      "The name must be at least 2 to 100 characters long.",
                  },
                })}
                className="form-control"
                //onChange={(e) => setName(e.target.value)}
                //name={name}
              />
              {errors.name && (
                <div className="text-danger">{errors.name.message}</div>
              )}
              <span className="text-danger"></span>
            </div>
            <div className="form-group mb-3">
              <label className="control-label fw-bold fs-5 mb-2">
                Description
              </label>
              <textarea
                {...register("description", {
                  required: "Blog description is required",
                  minLength: {
                    value: 2,
                    message:
                      "The description must be at least 2 to 500 characters long.",
                  },
                  maxLength: {
                    value: 500,
                    message:
                      "The description must be at least 2 to 500 characters long.",
                  },
                })}
                //   onChange={(e) => setDescription(e.target.value)}
                // value={description}
                className="form-control"
              ></textarea>
              {errors.description && (
                <div className="text-danger">{errors.description.message}</div>
              )}
            </div>

            <div className="form-group">
              <label
                asp-for="Image"
                className="control-label fw-bold fs-5 mb-2"
              >
                Select Image
              </label>
              <input
                {...register("file", {
                  required: "Blog feature image is required",
                })}
                type="file"
                className="form-control"
                accept=".jpg,.png,.gif,.jpeg,.svg"
                // onChange={(e) => handleImageChange(e)}
              />
              {errors.file && (
                <div className="text-danger">{errors.file.message}</div>
              )}
            </div>

            <div className="form-group mt-3 mb-3">
              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-secondary fs-5 text-uppercase w-100 fw-bold my-2"
              >
                create
              </button>
            </div>
          </form>
          <div>
            <Link href="/">
              <a className="text-decoration-none">Back to List</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
