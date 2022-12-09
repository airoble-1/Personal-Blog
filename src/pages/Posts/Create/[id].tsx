import { useRouter } from "next/router";

export default function CreatePostPage() {
  const router = useRouter();
  const { id } = router.query;
  return <div>{`Create Post Page with ${id}`} </div>;
}
