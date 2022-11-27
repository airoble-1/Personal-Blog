import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { SyntheticEvent, useState } from "react";

const Home: NextPage = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFIle, setSelectedFile] = useState<File>();
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
  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const fileData = await uploadFile();
      console.log("upload data: ", fileData);
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
      const data = await response.json();
      if (data.message) router.push("/");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="container">
      <div className="row gx-4 gx-lg-5 justify-content-center">
        <div className="col-md-12 col-lg-8 col-xl-7">
          <h1 className="fw-bold">Create</h1>

          <h3 className="fw-bolder">Blog</h3>
          <hr />
          <form onSubmit={handleSubmit}>
            <div className="text-danger"></div>
            <div className="form-group mb-3">
              <label className="control-label fw-bold fs-5 mb-2">Name</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
              <span className="text-danger"></span>
            </div>
            <div className="form-group mb-3">
              <label className="control-label fw-bold fs-5 mb-2">
                Description
              </label>
              <textarea
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                className="form-control"
              ></textarea>
              <span
                asp-validation-for="Description"
                className="text-danger"
              ></span>
            </div>

            <div className="form-group">
              <label
                asp-for="Image"
                className="control-label fw-bold fs-5 mb-2"
              >
                Select Image
              </label>
              <input
                name="file"
                type="file"
                className="form-control"
                accept=".jpg,.png,.gif,.jpeg,.svg"
                onChange={(e) => handleImageChange(e)}
              />
              <span className="text-danger"></span>
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
