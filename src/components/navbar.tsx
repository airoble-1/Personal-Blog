import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export default function MainMenu() {
  const router = useRouter();
  const { data: session, status } = useSession();

  console.log("session: ", session);
  console.log("status: ", status);
  function logoutHandler() {
    signOut({ redirect: true, callbackUrl: "/" });
  }

  return (
    <Nav
      className="navbar navbar-expand-lg navbar-light bg-secondary fs-5"
      id="mainNav"
    >
      <Container className="px-lg-5 container px-4">
        <Link href="/">
          <a>
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
          </a>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse className="" id="responsive-navbar-nav">
          <Nav className="d-flex w-100 justify-content-between">
            {!session && (
              <ul className="d-flex justify-content-between list-unstyled">
                <li className="nav-item px-3">
                  <Link href="/">
                    <a className="text-decoration-none fw-bolder text-uppercase  text-white">
                      Home
                    </a>
                  </Link>
                </li>
                <li className="px-3">
                  <Link href="/about">
                    <a className="text-decoration-none fw-bolder text-uppercase text-white">
                      About Me
                    </a>
                  </Link>
                </li>
                <li className="px-3">
                  <Link href="/contact">
                    <a className="text-decoration-none fw-bolder text-uppercase text-white">
                      Contact Me
                    </a>
                  </Link>
                </li>
              </ul>
            )}
            {session && session.user.role === "User" && (
              <ul className="d-flex justify-content-between list-unstyled">
                <li className="px-3">
                  <Link href="/">
                    <a className="text-decoration-none fw-bolder text-uppercase text-white">
                      Home
                    </a>
                  </Link>
                </li>
                <li className="nav-item px-3">
                  <Link href="/about">
                    <a className="text-decoration-none fw-bolder text-uppercase text-white">
                      About Me
                    </a>
                  </Link>
                </li>
                <li className="nav-item px-3">
                  <Link href="/contact">
                    <a className="text-decoration-none fw-bolder text-uppercase text-white">
                      Contact Me
                    </a>
                  </Link>
                </li>
              </ul>
            )}
            {session && session.user.role === "Administrator" && (
              <ul className="d-flex justify-content-between list-unstyled mx-5">
                <li className="nav-item px-3">
                  <Link href="/blog/create">
                    <a className="text-decoration-none fw-bolder text-uppercase text-white">
                      create blog
                    </a>
                  </Link>
                </li>
                <li className="nav-item px-3">
                  <Link href="/about">
                    <a className="text-decoration-none fw-bolder text-uppercase text-white">
                      create post
                    </a>
                  </Link>
                </li>
              </ul>
            )}
            {session && session.user.role === "Moderator" && (
              <ul className="d-flex justify-content-between list-unstyled mx-5">
                <li className="nav-item px-3">
                  <Link href="/">
                    <a className="text-decoration-none fw-bolder text-uppercase text-white">
                      user comments
                    </a>
                  </Link>
                </li>
                <li className="nav-item px-3">
                  <Link href="/about">
                    <a className="text-decoration-none fw-bolder text-uppercase text-white">
                      moderated comments
                    </a>
                  </Link>
                </li>
                <li className="nav-item px-3">
                  <Link href="/contact">
                    <a className="text-decoration-none fw-bolder text-uppercase text-white">
                      deleted comments
                    </a>
                  </Link>
                </li>
              </ul>
            )}
            <ul className="d-flex justify-content-between list-unstyled mx-3">
              <li className="nav-item px-3"></li>
              <Link href="/swagger">
                <a className="text-decoration-none fw-bolder text-uppercase text-white">
                  Swagger API
                </a>
              </Link>
            </ul>
            {!session && (
              <ul className="d-flex list-unstyled justify-content-between">
                <li className="nav-item px-3"></li>
                <Link href="/register">
                  <a className="text-decoration-none fw-bolder text-uppercase text-white">
                    register
                  </a>
                </Link>
                <li className="nav-item px-3"></li>
                <Link href="/login">
                  <a className="text-decoration-none fw-bolder text-uppercase text-white">
                    login
                  </a>
                </Link>
              </ul>
            )}
            {session && (
              <ul className="d-flex list-unstyled justify-content-between">
                <li className="nav-item px-3"></li>
                <Link href="/register">
                  <a className="text-decoration-none fw-bolder  text-white">
                    {`Hi ${session.user.firstName}!`}
                  </a>
                </Link>
                <li className="nav-item px-3"></li>
                <Link href="/">
                  <a
                    onClick={logoutHandler}
                    className="text-decoration-none fw-bolder text-uppercase text-white"
                  >
                    logout
                  </a>
                </Link>
              </ul>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Nav>
  );
}
