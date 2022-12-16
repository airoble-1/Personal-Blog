import { useRouter } from "next/router";
import BlogCardContainer from "../../../components/blogCardContainer";
import PostCard from "../../../components/postCard";
import { v4 as uuidv4 } from "uuid";

export default function BlogPostIndexPage({ data }) {
  const router = useRouter();
  const { id } = router.query;

  return (
    <BlogCardContainer>
      {data.map((post) => (
        <PostCard key={uuidv4()} post={post} />
      ))}
    </BlogCardContainer>
  );
}

export async function getServerSideProps({ params }) {
  const response = await fetch(`http://localhost:3000/api/post`);
  if (!response.ok) {
    throw new Error("Error: Could not retrieve posts");
  }
  const postData = await response.json();
  const data = postData.posts;

  return { props: { data } };
}
