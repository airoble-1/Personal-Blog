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
    <Nav
      className="navbar navbar-expand-lg navbar-light bg-secondary fs-5"
      id="mainNav"
    >
      <Container className="px-lg-4 container px-3">
        <Link className="cursor-pointer" href="/" legacyBehavior>
          <Navbar.Brand>
            <Image
              className="rounded-circle"
              src="https://res.cloudinary.com/dlwqjptsg/image/upload/v1644730077/small_3551739_123584281c.jpg"
              alt="Picture of the blogger"
              width={70}
              height={70}
              placeholder="blur"
              blurDataURL="https://res.cloudinary.com/dlwqjptsg/image/upload/v1644730077/small_3551739_123584281c.jpg"
            />
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse className="" id="responsive-navbar-nav">
          <Nav className="d-flex w-100 justify-content-between">
            {!session && (
              <ul className="d-flex justify-content-between list-unstyled fs-6">
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
              <ul className="d-flex justify-content-between list-unstyled fs-6">
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
              <ul className="d-flex justify-content-between list-unstyled fs-6">
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
              <ul className="d-flex justify-content-between list-unstyled fs-6">
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
            <ul className="d-flex justify-content-between list-unstyled fs-6 mx-3">
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
              <ul className="d-flex list-unstyled justify-content-between fs-6">
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
              <ul className="d-flex list-unstyled justify-content-between fs-6">
                <li className="nav-item px-3">
                  <Link
                    href="/Account/Manage"
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
    </Nav>
  );
}
