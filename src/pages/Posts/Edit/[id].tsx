import Image from "next/legacy/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { prisma } from "../../../server/db/client";
import Select from "react-select";
import RichTextEditor from "../../../components/richText";
import { v4 as uuidv4 } from "uuid";

type Formvalues = {
  title: string;
  abstract: string;
  content: string;
  file: File;
  tags: string[];
  readyStatus: string;
};

const statuses = [
  { value: "Incomplete", name: "Incomplete" },
  { value: "PreviewReady", name: "Preview Ready" },
  { value: "ProductionReady", name: "Production Ready" },
];

const EditPostPage = ({ postData }) => {
  const postStatusArr = statuses.filter(
    (o) => o.value !== postData.readyStatus
  );
  const postCurrentStatusArr = statuses.filter(
    (o) => o.value === postData.readyStatus
  );

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Formvalues>({ defaultValues: { content: postData.content } });

  const handleImageUpload = useCallback(
    (file: File): Promise<string> =>
      new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "my-uploads");
        fetch("https://api.cloudinary.com/v1_1/dlwqjptsg/image/upload", {
          method: "POST",
          body: formData,
        })
          .then((response) => response.json())
          .then((result) => resolve(result.secure_url))
          .catch(() => reject(new Error("Upload failed")));
      }),
    []
  );

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
    const { title, abstract, content, readyStatus } = userData;
    setIsLoading(true);
    try {
      const fileData = await uploadFile(userData);

      const response = await fetch(
        `${window.location.origin}/api/post/${postData.id}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            abstract,
            content,
            readyStatus,
            featureImage: fileData
              ? fileData.secure_url
              : postData.featureImage,
          }),
        }
      );
      setIsLoading(false);
      if (!response.ok) throw Error("Failed to create post");
      const data = await response.json();
      if (data.message) router.push("/");
    } catch (error) {
      setIsLoading(false);
      console.log("Error: Unable to create post");
    }
  }
  return (
    <div className="container">
      <div className="row gx-4 gx-lg-5 justify-content-center">
        <div className="col-md-12 col-lg-8 col-xl-7">
          <h1 className="fw-bold">Edit</h1>

          <h3 className="fw-bolder">Post</h3>
          <hr />
          <form onSubmit={handleSubmit((data) => submitHandler(data))}>
            <Image
              src={postData.featureImage}
              className="img-fluid"
              alt="Post featured image"
              width={250}
              height={200}
            />
            <div className="form-group mb-3">
              <label className="control-label fw-bold fs-5 mb-2">Title</label>
              <input
                type="text"
                {...register("title", {
                  required: "Post title is required",
                  minLength: {
                    value: 2,
                    message:
                      "The post title must be at least 2 to 100 characters long.",
                  },
                  maxLength: {
                    value: 100,
                    message:
                      "The post title must be at least 2 to 100 characters long.",
                  },
                  value: postData.title,
                })}
                className="form-control"
              />
              {errors.title && (
                <div className="text-danger">{errors.title.message}</div>
              )}
            </div>
            <div className="form-group mb-3">
              <label className="control-label fw-bold fs-5 mb-2">
                Abstract
              </label>
              <textarea
                {...register("abstract", {
                  required: "Post abstract is required",
                  minLength: {
                    value: 2,
                    message:
                      "Post abstract must be at least 2 to 500 characters long.",
                  },
                  maxLength: {
                    value: 500,
                    message:
                      "Post abstract must be at least 2 to 500 characters long.",
                  },
                  value: postData.abstract,
                })}
                className="form-control"
              ></textarea>
              {errors.abstract && (
                <div className="text-danger">{errors.abstract.message}</div>
              )}
            </div>
            <div className="form-group mb-3">
              <label className="control-label fw-bold fs-5 mb-2">Content</label>
              <Controller
                name="content"
                control={control}
                rules={{ required: "Post content is required" }}
                render={({ field }) => (
                  <RichTextEditor
                    id="rte"
                    {...field}
                    onImageUpload={handleImageUpload}
                  />
                )}
              />
              {errors.content && (
                <div className="text-danger">{errors.content.message}</div>
              )}
            </div>
            <div className="form-group">
              <label className="control-label fw-bold fs-5 mb-2">
                Select Image
              </label>
              <input
                {...register("file")}
                type="file"
                className="form-control"
                accept=".jpg,.png,.gif,.jpeg,.svg"
              />
              {errors.file && (
                <div className="text-danger">{errors.file.message}</div>
              )}
            </div>

            <div className="form-group mb-3">
              <label className="control-label fw-bold fs-5 mb-2">
                Publish Status
              </label>
              <select
                {...register("readyStatus", {
                  required: "Publish status  is required",
                })}
                className="form-control form-select"
              >
                <option value={postData.readyStatus}>
                  {postCurrentStatusArr[0].name}
                </option>
                {postStatusArr.map((status) => (
                  <option key={uuidv4()} value={status.value}>
                    {status.name}
                  </option>
                ))}
              </select>
              {errors.readyStatus && (
                <div className="text-danger">{errors.readyStatus.message}</div>
              )}
            </div>

            <div className="form-group mt-3 mb-3">
              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-secondary fs-5 text-uppercase w-100 fw-bold my-2"
              >
                Save
              </button>
            </div>
          </form>
          <div>
            <Link href="/" className="text-decoration-none">
              Back to List
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps({ params }) {
  const { id } = params;
  try {
    let post = await prisma.post.findUnique({
      where: {
        id: +id,
      },
    });
    const postData = JSON.parse(JSON.stringify(post));
    return { props: { postData } };
  } catch (error) {
    console.log(error);
    return { props: {} };
  }
}

export default EditPostPage;
