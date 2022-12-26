import Table from "react-bootstrap/Table";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";

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
            <th>Author</th>
            <th>Comment</th>
            <th>Delete Date</th>
            <th>Moderator</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {comments.map((comment) => (
            <tr key={uuidv4()}>
              <td>
                {`${comment.author.firstName} ${comment.author.lastName}`}
              </td>
              <td>{`${comment.body}`}</td>
              <td>{`${dateTimeFormater(comment.deleted)}`}</td>
              <td>{`${comment.moderator.firstName} ${comment.moderator.lastName}`}</td>
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
    const deletedComments = await prisma.comment.findMany({
      where: {
        deleted: {
          not: null,
        },
      },
      orderBy: {
        deleted: "desc",
      },
      select: {
        body: true,
        deleted: true,
        author: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
        moderator: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });
    let comments = JSON.parse(JSON.stringify(deletedComments));
    return { props: { comments } };
  } catch (error) {
    console.log(`Error: ${error.message}`);
  } finally {
  }
}
