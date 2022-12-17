import BlogCardContainer from "../../../components/blogCardContainer";
import PostCard from "../../../components/postCard";
import { v4 as uuidv4 } from "uuid";

export default function BlogPostIndexPage({ data }) {
  return (
    <BlogCardContainer>
      {data.map((post) => (
        <PostCard key={uuidv4()} post={post} />
      ))}
    </BlogCardContainer>
  );
}

export async function getServerSideProps({ params }) {
  const { id } = params;
  let data = [];
  try {
    const response = await fetch(
      `http://localhost:3000/api/post/byBlogId/${id}`
    );
    if (!response.ok) {
      throw new Error("Error: Could not retrieve posts");
    }
    const postData = await response.json();
    data = postData.posts;
  } catch (error) {
    console.log(`Error: ${error.message}`);
  } finally {
    return { props: { data } };
  }
}
