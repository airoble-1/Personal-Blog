import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav>
      <h1 className="text-3xl font-bold text-gray-700  underline">
        Navigation
      </h1>
    </nav>
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
