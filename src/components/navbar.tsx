import Link from "next/link";
import Image from "next/image";
import { useQuery } from "react-query";
import { fetchUser } from "../../lib/queries";

export default function Navbar() {
  const fetchUser = async () => {
    const res = await fetch(`${window.location.origin}/api/user`);
    if (!res.ok) {
      throw new Error("failed to fetch user data  ");
    }
    return await res.json();
  };
  const { isLoading, isError, data } = useQuery(["user"], fetchUser, {
    retry: 0,
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
  }

  return (
    <header className="sticky top-0 z-10 bg-teal-700 text-white">
      <section className="mx-auto flex max-w-screen-xl items-center justify-between p-4">
        <Image
          className="rounded-full"
          src={
            data
              ? data.profileImage
              : "https://res.cloudinary.com/dlwqjptsg/image/upload/v1644730077/small_3551739_123584281c.jpg"
          }
          alt="Picture of the blogger"
          width={70}
          height={70}
          placeholder="blur"
          blurDataURL="https://res.cloudinary.com/dlwqjptsg/image/upload/v1644730077/small_3551739_123584281c.jpg"
        />
        <h1 className="text-3xl font-medium">
          <Link href="/">
            <a>{`Ahmed's Blog`}</a>
          </Link>
        </h1>
        <div>
          <button
            id="mobile-open-button"
            className="text-3xl focus:outline-none sm:hidden"
          >
            &#9776;
          </button>
          <nav className="hidden space-x-8 text-xl sm:block" aria-label="main">
            <Link href="">
              <a className="hover:opacity-90">HOME</a>
            </Link>
            <Link href="">
              <a className="hover:opacity-90">ABOUT ME</a>
            </Link>
            <Link href="">
              <a className="hover:opacity-90">CONTACT ME</a>
            </Link>
            <Link href="">
              <a className="hover:opacity-90">SWAGGER API</a>
            </Link>

            {data ? (
              <Link href="/">
                <a className="hover:opacity-90">{`Hi, ${data.firstName}!`}</a>
              </Link>
            ) : (
              <Link href="/register">
                <a className="hover:opacity-90">REGISTER</a>
              </Link>
            )}
            {data ? (
              <Link href="/">
                <a className="hover:opacity-90">LOGOUT</a>
              </Link>
            ) : (
              <Link href="/login">
                <a className="hover:opacity-90">LOGIN</a>
              </Link>
            )}
          </nav>
        </div>
      </section>
    </header>
  );
}

{
  /* <nav className="navbar navbar-expand-lg navbar-light px-2" id="mainNav">
  <Image
    className="rounded-5"
    src="https://res.cloudinary.com/dlwqjptsg/image/upload/v1644730077/small_3551739_123584281c.jpg"
    alt="Picture of the blogger"
    width={70}
    height={70}
    placeholder="blur"
    blurDataURL="https://res.cloudinary.com/dlwqjptsg/image/upload/v1642828025/cocktail_db_screenshot_l6mfpj.jpg"
  />
  <div className="px-lg-5 container px-4">
    <Link href="/">
      <a className="navbar-brand" href="#">
        Ahmed&#39;s IT Blog
      </a>
    </Link>
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarResponsive"
      aria-controls="navbarResponsive"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      Menu
      <i className="fas fa-bars"></i>
    </button>
    <div
      className="collapse navbar-collapse d-flex justify-content-center"
      id="navbarResponsive"
    >
      <div className="mx-5">
        <ul className="navbar-nav ms-auto py-lg-0 py-5">
          <li className="nav-item">
            <Link href="/">
              <a className="nav-link px-lg-3 py-lg-4 py-3">HOME</a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/About-me">
              <a className="nav-link px-lg-3 py-lg-4 py-3">ABOUT ME</a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/Contact-me">
              <a className="nav-link px-lg-3 py-lg-4 py-3">CONTACT ME</a>
            </Link>
          </li>
        </ul>
      </div>
      <div className="mx-5">
        <ul className="navbar-nav ms-auto py-lg-0 py-5">
          <li className="nav-item">
            <Link href="/Swagger-api">
              <a className="nav-link px-lg-3 py-lg-4 py-3">SWAGGER API</a>
            </Link>
          </li>
        </ul>
      </div>
      <div className="mx-5">
        <ul className="navbar-nav ms-auto py-lg-0 py-5">
          <li className="nav-item">
            <Link href="/register">
              <a className="nav-link px-lg-3 py-lg-4 py-3">REGISTER</a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/login">
              <a className="nav-link px-lg-3 py-lg-4 py-3">LOGIN</a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</nav>; */
}
