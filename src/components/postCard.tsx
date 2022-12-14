import { useSession } from "next-auth/react";
import styles from "./postCard.module.css";
import Link from "next/dist/client/link";
import Image from "next/legacy/image";

export default function BlogCard({ post }) {
  const { data: session } = useSession();

  return (
    <div className="col-lg-4 col-md-6 col-sm-12">
      <div className="card">
        <div className="card-body text-center">
          <h5 className={`${styles.cardTitle} card-title text-center`}>
            {post.title.length > 15
              ? post.title.substring(0, 15) + "..."
              : post.title}
          </h5>
          <p className="card-text">
            {post.abstract.length > 50
              ? post.abstract.substring(0, 100) + "..."
              : post.abstract}
          </p>
          {!session && (
            <Link href={`/BlogPost/${post.slug}`} legacyBehavior>
              <a className="btn w-75 btn-secondary text-uppercase fw-bold d-inline-block mb-2 text-white">
                read more
              </a>
            </Link>
          )}
          {session &&
            (session.user.role === "User" ||
              session.user.role === "Moderator") && (
              <Link href={`/BlogPost/${post.slug}`} legacyBehavior>
                <a className="btn w-75 btn-secondary text-uppercase fw-bold d-inline-block mb-2 text-white">
                  read more
                </a>
              </Link>
            )}
          {session && session.user.role === "Administrator" && (
            <>
              <Link href={`/BlogPost/${post.slug}`} legacyBehavior>
                <a className="btn w-75 btn-secondary text-uppercase fw-bold d-inline-block mb-2 text-white">
                  read more
                </a>
              </Link>
              <Link href={`/Posts/Edit/${post.id}`} legacyBehavior>
                <a className="btn w-75 btn-danger text-uppercase fw-bold d-inline-block mb-2 text-white">
                  edit post
                </a>
              </Link>
            </>
          )}
        </div>
        <div className={`${styles.imgContainer}`}>
          <Image
            className={`${styles.cardImg} card-img-bottom`}
            src={post.featureImage}
            alt={post.title}
            layout="fill"
            placeholder="blur"
            blurDataURL="https://dummyimage.com/847x320/d9d9d9/545454.jpg"
          />
        </div>
      </div>
    </div>
  );
}
