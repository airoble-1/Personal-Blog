import CreatePostForm from "../../components/createPostForm";

export default function CreatePostPage({ data }) {
  return <CreatePostForm blogId={false} blogs={data} />;
}

export async function getServerSideProps() {
  try {
    let blogs = await prisma.blog.findMany();
    const data = JSON.parse(JSON.stringify(blogs));
    return { props: { data } };
  } catch (error) {
    console.log(error);
  }
}
