import Table from "react-bootstrap/Table";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
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
            <th>Created Date</th>
            <th>Author</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {comments.map((comment) => (
            <tr key={uuidv4()}>
              <td>{`${comment.body}`}</td>
              <td>{`${dateTimeFormater(comment.createdAt)}`}</td>
              <td>
                {`${comment.author.firstName} ${comment.author.lastName}`}
              </td>
              <td>
                <Link href="#">
                  <a>Edit </a>
                </Link>
                |{" "}
                <Link href="#">
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
    const userComments = await prisma.comment.findMany({
      where: {
        AND: [{ moderated: null, deleted: null }],
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        body: true,
        createdAt: true,
        author: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });
    let comments = JSON.parse(JSON.stringify(userComments));
    return { props: { comments } };
  } catch (error) {
    console.log(`Error: ${error.message}`);
  } finally {
  }
}
