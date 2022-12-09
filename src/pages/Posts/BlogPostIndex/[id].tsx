import { useRouter } from "next/router";

export default function BlogPostIndexPage() {
  const router = useRouter();
  const { id } = router.query;
  return <div>{`BlogPostIndexPage/${id}`} </div>;
}
