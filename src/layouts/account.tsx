import Link from "next/link";
import { useRouter } from "next/router";
import ActiveLink from "../components/activeLink";

export default function AccountLayout({ children }) {
  const router = useRouter();
  console.log(router.pathname);
  return (
    <>
      <div className="container">
        <div className="row gy-2 gx-4">
          <h2 className="fw-bold">Manage your account</h2>

          <div>
            <h4 className="fw-bolder">Change your account settings</h4>
            <hr />
            <div className="row">
              <div className="col-md-3">
                <ul className="nav nav-pills flex-column">
                  <li className="nav-item">
                    <ActiveLink href="/Manage/Account">Profile</ActiveLink>
                  </li>
                  <li className="nav-item">
                    <ActiveLink href="/Manage/Account/Password">
                      Password
                    </ActiveLink>
                  </li>
                </ul>
              </div>
              <div className="col-md-9">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
