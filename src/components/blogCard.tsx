import { useSession } from "next-auth/react";
import styles from "./blogCard.module.css";
import Link from "next/dist/client/link";
import Image from "next/image";

export default function BlogCard({ blog }) {
  const { data: session } = useSession();

  return (
    <div className="col-lg-4 col-md-6 col-sm-12">
      <div className="card">
        <div className={`${styles.imgContainer}`}>
          <Image
            className={`${styles.cardImg} card-img-top`}
            src={blog.featureimage}
            alt={blog.name}
            layout="fill"
            placeholder="blur"
            blurDataURL="https://res.cloudinary.com/dlwqjptsg/image/upload/v1644730077/small_3551739_123584281c.jpg"
          />
        </div>

        <div className="card-body text-center">
          <h5 className={`${styles.cardTitle} card-title text-center`}>
            {blog.name}
          </h5>
          <p className="card-text">
            {blog.description.length > 50
              ? blog.description.substring(0, 100) + "..."
              : blog.description}
          </p>
          {!session && (
            <Link href={`Posts/BlogPostIndex/${blog.id}`}>
              <a className="btn w-75 btn-secondary text-uppercase fw-bold d-inline-block mb-2 text-white">
                read posts
              </a>
            </Link>
          )}
          {session &&
            (session.user.role === "User" ||
              session.user.role === "Moderator") && (
              <Link href={`Posts/BlogPostIndex/${blog.id}`}>
                <a className="btn w-75 btn-secondary text-uppercase fw-bold d-inline-block mb-2 text-white">
                  read posts
                </a>
              </Link>
            )}
          {session && session.user.role === "Administrator" && (
            <>
              <Link href={`Posts/BlogPostIndex/${blog.id}`}>
                <a className="btn w-75 btn-secondary text-uppercase fw-bold d-inline-block mb-2 text-white">
                  read posts
                </a>
              </Link>
              <Link href={`Posts/Create/${blog.id}`}>
                <a className="btn w-75 btn-secondary text-uppercase fw-bold d-inline-block mb-2 text-white">
                  create post
                </a>
              </Link>
              <Link href="#">
                <a className="btn w-75 btn-danger text-uppercase fw-bold d-inline-block mb-2 text-white">
                  edit blog
                </a>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
