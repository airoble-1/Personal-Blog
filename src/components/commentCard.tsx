import { useSession } from "next-auth/react";
import Image from "next/legacy/image";

export default function CommentCard({
  comment,
  moderated,
  deleted,
  author,
  moderator,
  setModalShow,
  setCommentId,
  mutate,
  postId,
}) {
  function dateTimeFormater(dateTime) {
    const dateposted = new Date(dateTime);
    const shortMonth = dateposted.toLocaleString("en-us", { month: "short" });
    const year = dateposted.getFullYear();
    const day = dateposted.getDate();
    return `${shortMonth} ${day}, ${year}`;
  }
  const deleteComment = async function () {
    try {
      const response = await fetch(
        `${window.location.origin}/api/comment/delete/${comment.id}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            deleted: new Date(),
          }),
        }
      );
      const apiData = await response.json();
      console.log(apiData);
      mutate(`/api/comment/byPostId/${postId}`);
    } catch (error) {
      console.log(error);
    }
  };
  const { data: session } = useSession();

  return (
    <div className="bg-light border-dark mt-2 border-2 border px-2 py-3">
      <div className="d-flex align-items-start gap-3">
        <Image
          className="rounded-circle"
          src="https://res.cloudinary.com/dlwqjptsg/image/upload/v1644730077/small_3551739_123584281c.jpg"
          alt="Picture of the blogger"
          width={60}
          height={60}
          placeholder="blur"
          blurDataURL="https://res.cloudinary.com/dlwqjptsg/image/upload/v1644730077/small_3551739_123584281c.jpg"
        />
        <div className="media-body flex-grow-1">
          <h4 className="fw-bold fs-4">{`${author.firstName} ${author.lastName}`}</h4>
          <span className="small">
            Posted on{" "}
            <span className="">{dateTimeFormater(comment.createdAt)}</span>
          </span>
          <hr />
          {!moderated && !deleted && <p>{`${comment.body}`}</p>}

          {deleted && (
            <p className="fw-bolder fs-5 text-danger fst-italic">
              {`This comment was deleted by ${moderator?.firstName} ${
                moderator?.lastName
              } on ${dateTimeFormater(comment.deleted)}`}
            </p>
          )}

          {!deleted && moderated && (
            <>
              <p className="fw-bold fs-6 fst-italic">
                {`This comment was moderated by ${moderator.firstName} ${
                  moderator.lastName
                } on ${dateTimeFormater(comment.moderated)}`}
              </p>
              <p className="fw-bold fs-6 fst-italic">
                Reason:{" "}
                <span className="text-danger">{`${comment.moderationType}`}</span>
              </p>
              <p>
                This was moderated... &#40;{`${comment.moderatedBody}`}&#41;
              </p>
            </>
          )}

          <div className="d-flex flex-column flex-sm-row gap-3">
            {session && session?.user.role === "Moderator" && !deleted && (
              <>
                <hr />
                <button
                  className="btn btn-dark btn-sm text-uppercase fw-bold rounded px-4"
                  onClick={deleteComment}
                >
                  delete
                </button>
                <button
                  className="btn btn-dark btn-sm text-uppercase fw-bold rounded px-4"
                  onClick={() => {
                    setCommentId(comment.id);
                    setModalShow(true);
                  }}
                >
                  moderate
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
