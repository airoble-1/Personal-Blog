import BlogCardContainer from "../components/blogCardContainer";
import BlogCard from "../components/blogCard";
import { v4 as uuidv4 } from "uuid";
import { prisma } from "../../src/server/db/client";

function Home({ data }) {
  return (
    <BlogCardContainer>
      {data.map((blog) => (
        <BlogCard key={uuidv4()} blog={blog} />
      ))}
    </BlogCardContainer>
  );
}

export async function getServerSideProps() {
  try {
    let blogs = await prisma.blog.findMany();
    // const response = await fetch(`http://localhost:3000/api/blog`);
    // if (!response.ok) {
    //   throw new Error("Error: Could not retrieve blogs");
    // }
    // const blogData = await response.json();

    const data = JSON.parse(JSON.stringify(blogs));
    return { props: { data } };
  } catch (error) {
    console.log(error);
  }
}

export default Home;
