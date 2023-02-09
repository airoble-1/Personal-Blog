import Link from "next/link";
import Image from "next/legacy/image";
import { useSession, signOut } from "next-auth/react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export default function MainMenu() {
  const { data: session } = useSession();

  function logoutHandler() {
    signOut({ redirect: true, callbackUrl: "/" });
  }

  return (
    <Navbar className="bg-secondary fs-5" expand="lg">
      <Container>
        <Navbar.Brand href="#home">
          <Link className="cursor-pointer" href="/" legacyBehavior>
            <Navbar.Brand>
              <Image
                className="rounded-circle"
                src="https://res.cloudinary.com/dlwqjptsg/image/upload/v1675899435/My Uploads/wmhirb0vbnu80eaveeor.jpg"
                alt="Picture of the blogger"
                width={70}
                height={70}
                placeholder="blur"
                blurDataURL="https://res.cloudinary.com/dlwqjptsg/image/upload/v1644730077/small_3551739_123584281c.jpg"
              />
            </Navbar.Brand>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto w-100 d-flex flex-lg-row flex-column justify-content-between flex-row ">
            {!session && (
              <ul className="d-flex flex-lg-row flex-column justify-content-between list-unstyled fs-6">
                <li className="nav-item px-3">
                  <Link
                    href="/"
                    className="text-decoration-none fw-bolder text-uppercase text-white"
                  >
                    Home
                  </Link>
                </li>
                <li className="px-3">
                  <Link
                    href="/about"
                    className="text-decoration-none fw-bolder text-uppercase text-white"
                  >
                    About Me
                  </Link>
                </li>
                <li className="px-3">
                  <Link
                    href="/contact"
                    className="text-decoration-none fw-bolder text-uppercase text-white"
                  >
                    Contact Me
                  </Link>
                </li>
              </ul>
            )}
            {session && session.user.role === "User" && (
              <ul className="d-flex flex-lg-row flex-column justify-content-between list-unstyled fs-6">
                <li className="px-3">
                  <Link
                    href="/"
                    className="text-decoration-none fw-bolder text-uppercase text-white"
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item px-3">
                  <Link
                    href="/about"
                    className="text-decoration-none fw-bolder text-uppercase text-white"
                  >
                    About Me
                  </Link>
                </li>
                <li className="nav-item px-3">
                  <Link
                    href="/contact"
                    className="text-decoration-none fw-bolder text-uppercase text-white"
                  >
                    Contact Me
                  </Link>
                </li>
              </ul>
            )}
            {session && session.user.role === "Administrator" && (
              <ul className="d-flex flex-lg-row flex-column justify-content-between list-unstyled fs-6">
                <li className="nav-item px-3">
                  <Link
                    href="/blog/create"
                    className="text-decoration-none fw-bolder text-uppercase text-white"
                  >
                    create blog
                  </Link>
                </li>
                <li className="nav-item px-3">
                  <Link
                    href="/Posts/Create"
                    className="text-decoration-none fw-bolder text-uppercase text-white"
                  >
                    create post
                  </Link>
                </li>
              </ul>
            )}
            {session && session.user.role === "Moderator" && (
              <ul className="d-flex flex-lg-row flex-column justify-content-between list-unstyled fs-6">
                <li className="nav-item px-3">
                  <Link
                    href="/comments"
                    className="text-decoration-none fw-bolder text-uppercase text-white"
                  >
                    user comments
                  </Link>
                </li>
                <li className="nav-item px-3">
                  <Link
                    href="/comments/moderatedIndex"
                    className="text-decoration-none fw-bolder text-uppercase text-white"
                  >
                    moderated comments
                  </Link>
                </li>
                <li className="nav-item px-3">
                  <Link
                    href="/comments/deletedIndex"
                    className="text-decoration-none fw-bolder text-uppercase text-white"
                  >
                    deleted comments
                  </Link>
                </li>
              </ul>
            )}
            <ul className="d-flex flex-lg-row flex-column justify-content-between list-unstyled fs-6 mx-lg-3">
              <li className="nav-item px-3">
                <Link
                  href="/swagger"
                  className="text-decoration-none fw-bolder text-uppercase text-white"
                >
                  Swagger API
                </Link>
              </li>
            </ul>
            {!session && (
              <ul className="d-flex flex-lg-row flex-column list-unstyled justify-content-between fs-6">
                <li className="nav-item px-3">
                  <Link
                    href="/register"
                    className="text-decoration-none fw-bolder text-uppercase text-white"
                  >
                    register
                  </Link>
                </li>
                <li className="nav-item px-3">
                  <Link
                    href="/login"
                    className="text-decoration-none fw-bolder text-uppercase text-white"
                  >
                    login
                  </Link>
                </li>
              </ul>
            )}
            {session && (
              <ul className="d-flex flex-lg-row flex-column list-unstyled justify-content-between fs-6">
                <li className="nav-item px-3">
                  <Link
                    href="/Manage/Account"
                    className="text-decoration-none fw-bolder  text-white"
                  >
                    {`Hi ${session?.user?.firstName}!`}
                  </Link>
                </li>
                <li className="nav-item px-3">
                  <Link
                    href="/"
                    onClick={logoutHandler}
                    className="text-decoration-none fw-bolder text-uppercase text-white"
                  >
                    logout
                  </Link>
                </li>
              </ul>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
