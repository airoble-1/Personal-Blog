import { useSession } from "next-auth/react";
import Image from "next/image";

export default function CommentCard({
  comment,
  moderated,
  deleted,
  author,
  moderator,
  setModalShow,
  setCommentId,
}) {
  function dateTimeFormater(dateTime) {
    const dateposted = new Date(dateTime);
    const shortMonth = dateposted.toLocaleString("en-us", { month: "short" });
    const year = dateposted.getFullYear();
    const day = dateposted.getDate();
    return `${shortMonth} ${day}, ${year}`;
  }
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
              This comment was deleted by Ahmed Roble on Dec 16, 2022
            </p>
          )}

          {moderated && (
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
            {session && session?.user.role === "Moderator" && (
              <>
                <hr />
                <button className="btn btn-dark btn-sm text-uppercase fw-bold rounded px-4">
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
