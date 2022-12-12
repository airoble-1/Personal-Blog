import CreatePostForm from "../../../components/createPostForm";

import { useRouter } from "next/router";

export default function CreatePostPage({ data }) {
  const router = useRouter();
  const { id } = router.query;
  return <CreatePostForm blogId={id} blogs={data} />;
}

export async function getServerSideProps({ params }) {
  const { id } = params;

  const response = await fetch(`http://localhost:3000/api/blog/${id}`);
  if (!response.ok) {
    throw new Error("Error: Could not retrieve blogs");
  }
  const blogData = await response.json();
  const data = blogData.blogs;

  return { props: { data } };
}
