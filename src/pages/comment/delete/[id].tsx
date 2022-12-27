import { prisma } from "../../../../src/server/db/client";
import { useRouter } from "next/router";

function dateTimeFormater(dateTime) {
  const dateposted = new Date(dateTime);
  const shortMonth = dateposted.toLocaleString("en-us", { month: "short" });
  const year = dateposted.getFullYear();
  const day = dateposted.getDate();
  return `${shortMonth} ${day}, ${year}`;
}

const reasonsForModeration = {
  Political: "Political",
  Language: "Language",
  Drugs: "Drugs",
  Threatening: "Threatening",
  HateSpeech: "Hate Speech",
  Shaming: "Shaming",
  Fraud: "Fraud",
  Sexual: "Sexual",
};

export default function DeleteCommentPage({ comment }) {
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${window.location.origin}/api/comment/${comment.id}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            id: comment.id,
          }),
        }
      );

      const data = await response.json();
      console.log(data);
      if (data.success) router.back();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h3 className="text-danger">Are you sure you want to delete this?</h3>
      <div>
        <h4>Comment</h4>
        <hr />
        <dl className="row">
          <dt className="col-sm-2">Comment</dt>
          <dd className="col-sm-10">{comment.body}</dd>
          <dt className="col-sm-2">Created On</dt>
          <dd className="col-sm-10">{`${dateTimeFormater(
            comment.createdAt
          )}`}</dd>
          <dt className="col-sm-2">Moderated On</dt>
          <dd className="col-sm-10">{`${
            comment.moderated ? dateTimeFormater(comment.moderated) : "N/A"
          }`}</dd>
          <dt className="col-sm-2">Moderated Body</dt>
          <dd className="col-sm-10">{`${
            comment.moderated ? comment.moderatedBody : "N/A"
          }`}</dd>
          <dt className="col-sm-2">Moderation Type</dt>
          <dd className="col-sm-10">{`${
            comment.moderated
              ? reasonsForModeration[comment.moderationType]
              : "N/A"
          }`}</dd>
          <dt className="col-sm-2">Marked Deleted On</dt>
          <dd className="col-sm-10">{`${
            comment.deleted ? dateTimeFormater(comment.deleted) : "N/A"
          }`}</dd>
        </dl>

        <form onSubmit={(e) => handleSubmit(e)}>
          <input type="submit" className="btn btn-danger" />
        </form>
      </div>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  let comment = {};
  const { id } = params;
  try {
    comment = await prisma.comment.findUnique({
      where: {
        id: +id,
      },
    });
    comment = JSON.parse(JSON.stringify(comment));
    return { props: { comment } };
  } catch (error) {
    console.log(`Error: ${error.message}`);
  } finally {
  }
}
