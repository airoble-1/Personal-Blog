import Table from "react-bootstrap/Table";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import { prisma } from "../../server/db/client";

const reasonsForModeration = {
  Political: "Political",
  Language: "Language",
  Drugs: "Drugs",
  Threatening: "Threatening",
  HateSpeech: "Hate Speech",
  Shaming: "Shaming",
  Fraud: "Fraud",
};

function dateTimeFormater(dateTime) {
  const dateposted = new Date(dateTime);
  const shortMonth = dateposted.toLocaleString("en-us", { month: "short" });
  const year = dateposted.getFullYear();
  const day = dateposted.getDate();
  return `${shortMonth} ${day}, ${year}`;
}
export default function DeletedIndex({ comments }) {
  return (
    <div className="container">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Comment</th>
            <th>Moderated Comment</th>
            <th>Moderated Date</th>
            <th>Reason for the Moderation</th>
            <th>Moderator</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {comments.map((comment) => (
            <tr key={uuidv4()}>
              <td>{`${comment.body}`}</td>
              <td>{`${comment.moderatedBody}`}</td>
              <td>{`${dateTimeFormater(comment.moderated)}`}</td>
              <td>{`${reasonsForModeration[comment.moderationType]}`}</td>
              <td>
                {`${comment.moderator.firstName} ${comment.moderator.lastName}`}
              </td>
              <td>
                <Link href="#">
                  <a>Edit </a>
                </Link>
                |{" "}
                <Link href={`/comment/delete/${comment.id}`}>
                  <a> Delete</a>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const moderatedComments = await prisma.comment.findMany({
      where: {
        moderated: {
          not: null,
        },
        deleted: null,
      },
      orderBy: {
        moderated: "desc",
      },
      select: {
        id: true,
        body: true,
        moderated: true,
        moderatedBody: true,
        moderationType: true,
        moderator: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });
    let comments = JSON.parse(JSON.stringify(moderatedComments));
    return { props: { comments } };
  } catch (error) {
    console.log(`Error: ${error.message}`);
  } finally {
  }
}
