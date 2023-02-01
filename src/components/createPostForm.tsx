import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import Select from "react-select";
import RichTextEditor from "../components/richText";

type Formvalues = {
  name: number;
  title: string;
  abstract: string;
  content: string;
  image: File;
  tags: string[];
  readyStatus: string;
};

const statuses = [
  { value: "Incomplete", name: "Incomplete" },
  { value: "PreviewReady", name: "Preview Ready" },
  { value: "ProductionReady", name: "Production Ready" },
];

export default function CreatePostForm({ blogs, blogId }) {
  const [isLoading, setIsLoading] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [tagsArray, setTagsArray] = useState([]);
  const router = useRouter();
  // const selectRef = useRef<>();
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
  function addTag() {
    const index = tagsArray.findIndex(
      (option) => option.value === tagInput.toLowerCase()
    );
    if (index == -1) {
      setTagsArray((prev) => [
        ...prev,
        { value: tagInput.toLowerCase(), label: tagInput.toLowerCase() },
      ]);
    }
    // if (!tagsArray.includes(tagInput.toUpperCase()))
    //   setTagsArray((prev) => [...prev, tagInput.toUpperCase()]);
    setTagInput("");
  }

  //function removeTag() {
  // setTagInput([]);
  // let selectedOptions = selectRef.current.selectedOptions;
  // const optionsArr = Array.from(selectedOptions);
  // let optionsValueArr = optionsArr.map((option) => option.value);
  // console.log("optionsValueArr", optionsValueArr);
  // setTagsArray((prev) => {
  //   let filteredItems = prev.filter((item) => {
  //     optionsValueArr.includes(item);
  //   });
  //   return filteredItems;
  // });
  // }

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Formvalues>({
    shouldUnregister: true,
  });

  const uploadFile = async function (data) {
    if (data.image[0]) {
      const formData = new FormData();
      formData.append("file", data.image[0]);
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
    const { name, title, abstract, content, tags, readyStatus } = userData;
    setIsLoading(true);
    try {
      const fileData = await uploadFile(userData);
      if (!fileData) return;
      const postData = {
        blogId: blogId ? +blogId : +name,
        title,
        abstract,
        content,
        featureImage: fileData.secure_url,
        tags: tags.map((tag) => tag.value),
        readyStatus: readyStatus,
      };
      const response = await fetch(`${window.location.origin}/api/post`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });
      setIsLoading(false);
      const data = await response.json();
      if (data.success) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="container">
      <div className="row gx-4 gx-lg-5 justify-content-center">
        <div className="col-md-12 col-lg-8 col-xl-7">
          <h1 className="fw-bold">Create</h1>

          <h3 className="fw-bolder">Post</h3>
          <hr />
          <form onSubmit={handleSubmit((data) => submitHandler(data))}>
            <div className="text-danger"></div>
            <div className="form-group mb-3">
              <label className="control-label fw-bold fs-5 mb-2">
                Blog Name
              </label>
              {!blogId && (
                <select
                  {...register("name", {
                    required: "Blog name is required",
                  })}
                  className="form-control form-select"
                >
                  <option value="">Choose a blog...</option>
                  {!blogId &&
                    blogs.map((blog) => (
                      <option key={uuidv4()} value={blog.id}>
                        {blog.name}
                      </option>
                    ))}
                </select>
              )}
              {blogId && (
                <select
                  className="form-control form-select"
                  disabled={blogId}
                  value={blogs.id}
                >
                  <option value={blogs.id}>{blogs.name}</option>
                </select>
              )}
              {errors.name && (
                <div className="text-danger">{errors.name.message}</div>
              )}
            </div>
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
                })}
                className="form-control"
                //onChange={(e) => setName(e.target.value)}
                //name={name}
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
                })}
                //   onChange={(e) => setDescription(e.target.value)}
                // value={description}
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
              {/* <textarea
                {...register("content", {
                  required: "Post content is required",
                  minLength: {
                    value: 2,
                    message:
                      "Post content must be at least 2 to 500 characters long.",
                  },
                  maxLength: {
                    value: 500,
                    message:
                      "Post content must be at least 2 to 500 characters long.",
                  },
                })}
                //   onChange={(e) => setDescription(e.target.value)}
                // value={description}
                className="form-control"
              ></textarea>
              {errors.content && (
                <div className="text-danger">{errors.content.message}</div>
              )} */}
            </div>
            <div className="form-group  mb-3">
              <label className="control-label fw-bold fs-5 mb-2">
                Select Image
              </label>
              <input
                {...register("image", {
                  required: "Post feature image is required",
                })}
                type="file"
                className="form-control"
                accept=".jpg,.png,.gif,.jpeg,.svg"
                // onChange={(e) => handleImageChange(e)}
              />
              {errors.image && (
                <div className="text-danger">{errors.image.message}</div>
              )}
            </div>

            <div className="form-group mb-2">
              <div className="row">
                <div className="col">
                  <label className="control-label fw-bold fs-5 mb-2">
                    Manage Tags
                  </label>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="row mb-2">
                    <div className="col">
                      <input
                        type="text"
                        className="form-control"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col mb-1">
                      <button
                        name="Add"
                        type="button"
                        className="btn btn-dark btn-sm w-100 text-uppercase w-100 fw-bold rounded"
                        onClick={() => addTag()}
                        disabled={tagInput == ""}
                      >
                        Add
                      </button>
                    </div>
                    {/* <div className="col mb-2">
                      <button
                        name="Delete"
                        type="button"
                        className="btn btn-dark btn-sm text-uppercase w-100 fw-bold rounded"
                        onClick={() => removeTag()}
                        disabled={tagsArray.length == 0}
                      >
                        Delete
                      </button>
                    </div> */}
                  </div>
                </div>
                <div className="col">
                  <Controller
                    name="tags"
                    control={control}
                    rules={{ required: "Tag(s) for post is required" }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        instanceId="long-value-select"
                        id="long-value-select"
                        isMulti
                        options={tagsArray}
                      />
                    )}
                  />
                  {errors.tags && (
                    <div className="text-danger">{errors.tags.message}</div>
                  )}
                  {/* <select
                    className="btn-block form-select"
                    name="tags"
                    id="TagList"
                    multiple
                    {...register("tags", {
                      required: "Tag(s) for post is required",
                    })}
                    ref={selectRef}
                  >
                    {tagsArray?.map((tag) => (
                      <option key={uuidv4()} value={tag}>
                        {tag}
                      </option>
                    ))}
                  </select> */}
                  {/* {errors.tags && (
                    <div className="text-danger">{errors.tags.message}</div>
                  )} */}
                </div>
              </div>
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
                <option value="">Choose a publish status...</option>
                {statuses.map((status) => (
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
                create
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
}
