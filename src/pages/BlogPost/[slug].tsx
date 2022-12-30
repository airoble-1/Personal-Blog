import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import { useSession } from "next-auth/react";
import CommentCard from "../../components/commentCard";
import { useForm } from "react-hook-form";
import ModerateCommentModal from "../../components/moderateCommentModal";
import useSWR, { useSWRConfig } from "swr";
import { prisma } from "../../server/db/client";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function PostDetailsPage({ post }) {
  const [modalShow, setModalShow] = useState(false);
  const [commentId, setCommentId] = useState();
  const { mutate } = useSWRConfig();
  const { data, error, isLoading } = useSWR(
    `/api/comment/byPostId/${post.id}`,
    fetcher
  );

  const onSubmit = async (data) => {
    try {
      const response = await fetch(
        `${window.location.origin}/api/comment/byPostId/${post.id}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            body: data.comment,
          }),
        }
      );
      const apiData = await response.json();
      console.log(apiData);
      reset();
      mutate(`/api/comment/byPostId/${post.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { data: session } = useSession();
  return (
    <div className="px-lg-5 container px-4">
      <article className="mb-4">
        <div className="row justify-content-center">
          <div className="col-md-12 col-lg-10 col-xl-9 fs-5 ">
            {post.content}
          </div>
        </div>
      </article>
      <hr />
      <article>
        <div className="row">
          <div className="col font-weight-bold h3 fs-2 text-center">Tags</div>
        </div>
        <div className="row">
          <div className="col d-flex justify-content-center">
            {post.tags.map((tag) => (
              <a className="btn btn-warning btn-sm btn-block fw-bold text-uppercase fs-5 mr-2 px-3">
                {tag.text}
              </a>
            ))}
          </div>
        </div>
      </article>
      <hr />
      {!session && (
        <Link
          href="/login"
          className="btn btn-primary btn-sm btn-block text-uppercase w-100 fs-6 fw-bold rounded"
          asp-page="/Account/Login"
        >
          Login To Add Comments
        </Link>
      )}
      {session && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label className="h2 custom-control-label fw-bolder">
              Add Comment
            </label>
            <textarea
              {...register("comment", {
                required: "This field is required",
                minLength: {
                  value: 2,
                  message: "Comment must be at least 2 to 280 characters long.",
                },
                maxLength: {
                  value: 280,
                  message: "Comment must be at least 2 to 280 characters long.",
                },
              })}
              className="form-control"
              placeholder="Write a comment..."
              rows={10}
            ></textarea>
            {errors.comment && (
              <p className="text-danger">{errors.comment?.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="btn btn-primary btn-sm btn-block text-uppercase w-100 fs-6 fw-bold mt-3 rounded"
          >
            Submit
          </button>
        </form>
      )}
      <hr className="border-dark border-2 border" />
      <span className="btn btn-sm btn-primary btn-block w-100 fs-6 fw-bold rounded">
        {`${data?.comments.length}`} COMMENT(S)
      </span>
      {error && <div>failed to load</div>}

      {isLoading && <div>loading...</div>}

      {!isLoading &&
        !error &&
        data?.comments?.map((comment) => (
          <CommentCard
            key={uuidv4()}
            comment={comment}
            moderated={comment.moderated}
            deleted={comment.deleted}
            author={comment.author}
            moderator={comment.moderator}
            setModalShow={setModalShow}
            setCommentId={setCommentId}
            mutate={mutate}
            postId={`${post.id}`}
          />
        ))}
      <ModerateCommentModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        commentId={commentId}
        mutate={mutate}
        postId={`${post.id}`}
      />
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const { slug } = params;
  let post = {};
  try {
    post = await prisma.post.findFirst({
      where: {
        slug: slug as string,
      },
      include: {
        tags: true,
      },
    });
    post = JSON.parse(JSON.stringify(post));
    return { props: { post } };
  } catch (error) {
    console.log(`Error: ${error.message}`);
  } finally {
  }
}
