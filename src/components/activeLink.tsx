import { useRouter } from "next/router";
import Link from "next/link";

function ActiveLink({ children, href }) {
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={
        router.pathname == href
          ? "nav-link bg-dark text-light fw-bold border-warning border-3 border"
          : "nav-link text-dark fw-bold ps-0"
      }
    >
      {children}
    </Link>
  );
}

export default ActiveLink;
