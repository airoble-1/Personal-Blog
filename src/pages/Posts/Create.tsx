import CreatePostForm from "../../components/createPostForm";
import { prisma } from "../../server/db/client";
export default function CreatePostPage({ data }) {
  return <CreatePostForm blogId={false} blogs={data} />;
}

export async function getServerSideProps() {
  const response = await fetch(`http://localhost:3000/api/blog`);
  if (!response.ok) {
    throw new Error("Error: Could not retrieve blogs");
  }
  const blogData = await response.json();
  const data = blogData.blogs;

  return { props: { data } };
}
