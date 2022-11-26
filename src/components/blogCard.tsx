import styles from "./blogCard.module.css";

export default function BlogCard() {
  const lead = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit officiis libero similique quia? Iure atque quam, deserunt eum debitis, delectus nesciunt pariatur quidem, earum eveniet nihil ratione fugiat ipsam! Aliquam molestiae a natus dignissimos cumque eum numquam magnam, alias consequatur fugiat autem animi quas assumenda, perferendis labore dolor aperiam voluptatibus?`;

  return (
    <div className="container">
      <div className="row gy-2 gx-4">
        <div className="col-lg-4 col-md-6 col-sm-12">
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
              <p className="card-text">
                {lead.length > 150 ? lead.substring(0, 150) + "..." : lead}
              </p>
              <a
                href="#"
                className="btn btn-secondary text-uppercase fw-bold py-2 px-5 text-white"
              >
                read post
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
