import styles from "./aboutMe.module.css";
import { FaChevronRight } from "react-icons/fa";
import Image from "next/image";

export default function AboutPage() {
  return (
    <section className={`${styles.about}`}>
      <div className="container">
        <div className={`${styles["section-title"]}`}>
          <h2>About</h2>
          <p>
            Hello! My Name is Ahmed. I&apos;m a toronto-based software developer
            specializing in the React, Next.JS stack. My long term goal is to
            become a full stack developer able to transform great ideas into
            beautiful and functional products.
          </p>
        </div>

        <div className="row">
          <div className={`${styles["img-container"]} col-lg-4`}>
            <Image
              src="https://res.cloudinary.com/dlwqjptsg/image/upload/v1667410187/My%20Uploads/ixucpehbbkggk7bi1xiq.jpg"
              className="img-fluid"
              alt="profile image"
              width={60}
              height={60}
              placeholder="blur"
              blurDataURL="https://res.cloudinary.com/dlwqjptsg/image/upload/v1644730077/small_3551739_123584281c.jpg"
            />
          </div>
          <div className={`${styles.content} col-lg-8 pt-lg-0 pt-4`}>
            <h3>Full Stack React Developer</h3>
            <p className="fst-italic">
              Currently, I am working an intership at CIBC. In my spare time
              I&apos;m working on improving my craft as a Full Stack Developer
              within the React/Next.JS ecosystem building out full featured
              interprise-level applications.
            </p>
            <div className="row">
              <div className="col-lg-6">
                <ul>
                  <li>
                    <i>
                      <FaChevronRight />
                    </i>{" "}
                    <strong>Website:</strong> <span>www.ahmedroble.com/</span>
                  </li>
                  <li>
                    <i>
                      <FaChevronRight />
                    </i>{" "}
                    <strong>Phone:</strong> <span>+1 647 701 9582</span>
                  </li>
                  <li>
                    <i>
                      <FaChevronRight />
                    </i>{" "}
                    <strong>City:</strong> <span>Toronto, Canada</span>
                  </li>
                </ul>
              </div>
              <div className="col-lg-6">
                <ul>
                  <li>
                    <i>
                      <FaChevronRight />
                    </i>{" "}
                    <strong>Email:</strong>
                    <span>ahmed.roble@outlook.com</span>
                  </li>
                  <li>
                    <i>
                      <FaChevronRight />
                    </i>{" "}
                    <strong>Freelance:</strong> <span>Available</span>
                  </li>
                </ul>
              </div>
            </div>
            <p>
              React, Javascript, Next.JS are my forte when building out new
              ideas. But I am always open to learning and discovering new
              things. During my free time on the weekednd, I work with others in
              an online community sharing ideas and building projects we are
              passionate about.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
