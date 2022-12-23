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
    const posts = await prisma.post.findMany({
      where: {
        blogId: +id,
      },
    });

    data = JSON.parse(JSON.stringify(posts));
  } catch (error) {
    console.log(`Error: ${error.message}`);
  } finally {
    return { props: { data } };
  }
}
