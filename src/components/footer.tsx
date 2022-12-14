import {
  AiFillTwitterCircle,
  AiFillLinkedin,
  AiFillGithub,
} from "react-icons/ai";

export default function Footer() {
  return (
    <div className=" w-100 container mt-3">
      <footer className=" mx-auto py-4">
        <div className="px-lg-5 container px-4">
          <div className="row justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-7">
              <ul className="d-flex justify-content-between py-4 px-0 text-center">
                <li className="list-inline-item">
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <AiFillTwitterCircle color="black" size="55" />
                  </a>
                </li>
                <li className="list-inline-item">
                  <a
                    href="https://www.linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <AiFillLinkedin radius="" color="black" size="55" />
                  </a>
                </li>
                <li className="list-inline-item">
                  <a
                    href="https://github.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <AiFillGithub color="black" size="55" />
                  </a>
                </li>
              </ul>
              <div className="py-4 text-center">
                Copyright &copy; Ahmed Roble 2022
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
