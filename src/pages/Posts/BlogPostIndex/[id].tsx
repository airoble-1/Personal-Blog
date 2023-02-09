import BlogCardContainer from "../../../components/blogCardContainer";
import PostCard from "../../../components/postCard";
import { v4 as uuidv4 } from "uuid";
import { prisma } from "../../../server/db/client";
import { getToken } from "next-auth/jwt";

export default function BlogPostIndexPage({ data }) {
  return (
    <BlogCardContainer>
      {data.map((post) => (
        <PostCard key={uuidv4()} post={post} />
      ))}
    </BlogCardContainer>
  );
}

export async function getServerSideProps({ params, req }) {
  const token = await getToken({ req });
  const role = token.role;
  const { id } = params;
  let data = [];
  let posts;
  console.log(role);
  try {
    if (role === "Administrator") {
      posts = await prisma.post.findMany({
        where: {
          blogId: +id,
        },
      });
    } else if (role === "User" || role === "Moderator") {
      posts = await prisma.post.findMany({
        where: {
          blogId: +id,
          readyStatus: "ProductionReady",
        },
      });
    }

    data = JSON.parse(JSON.stringify(posts));
  } catch (error) {
    console.log(`Error: ${error.message}`);
  } finally {
    return { props: { data } };
  }
}
