import { useSession } from "next-auth/react";
import styles from "./blogCard.module.css";
import Link from "next/dist/client/link";

export default function BlogCardContainer() {
  return (
    <div className="container">
      <div className="row gy-2 gx-4">
        <div className="col-lg-4 col-md-6 col-sm-12">
          <BlogCard />
        </div>
      </div>
    </div>
  );
}

function BlogCard({ blog }) {
  const { data: session, status } = useSession();

  const lead = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit officiis libero similique quia? Iure atque quam, deserunt eum debitis, delectus nesciunt pariatur quidem, earum eveniet nihil ratione fugiat ipsam! Aliquam molestiae a natus dignissimos cumque eum numquam magnam, alias consequatur fugiat autem animi quas assumenda, perferendis labore dolor aperiam voluptatibus?`;

  return (
    <div className="card">
      <img
        className="card-img-top"
        src="https://dummyimage.com/847x320/d9d9d9/545454.jpg"
        alt="Card image cap"
      />
      <div className="card-body text-center">
        <h5 className={`${styles.cardTitle} card-title text-center`}>
          Card title
        </h5>
        <p className="card-text fs-5">
          {lead.length > 150 ? lead.substring(0, 123) + "..." : lead}
        </p>
        {!session && (
          <Link href="#">
            <a className="btn w-75 btn-secondary text-uppercase fw-bold d-inline-block mb-2 text-white">
              read posts
            </a>
          </Link>
        )}
        {session &&
          (session.user.role === "User" ||
            session.user.role === "Moderator") && (
            <Link href="#">
              <a className="btn w-75 btn-secondary text-uppercase fw-bold d-inline-block mb-2 text-white">
                read posts
              </a>
            </Link>
          )}
        {session && session.user.role === "Administrator" && (
          <>
            <Link href="#">
              <a className="btn w-75 btn-secondary text-uppercase fw-bold d-inline-block mb-2 text-white">
                read posts
              </a>
            </Link>
            <Link href="#">
              <a className="btn w-75 btn-secondary text-uppercase fw-bold d-inline-block mb-2 text-white">
                create posts
              </a>
            </Link>
            <Link href="#">
              <a className="btn w-75 btn-danger text-uppercase fw-bold d-inline-block mb-2 text-white">
                edit posts
              </a>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
