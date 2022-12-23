import CreatePostForm from "../../../components/createPostForm";

import { useRouter } from "next/router";

export default function CreatePostPage({ data }) {
  const router = useRouter();
  const { id } = router.query;
  return <CreatePostForm blogId={id} blogs={data} />;
}

export async function getServerSideProps({ params }) {
  const { id } = params;
  try {
    const blogId = +id;
    const blog = await prisma.blog.findFirst({
      where: {
        id: blogId,
      },
    });
    const data = JSON.parse(JSON.stringify(blog));
    return { props: { data } };
  } catch (error) {
    console.log(error);
  }
}
