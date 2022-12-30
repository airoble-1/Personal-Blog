export function accountLayout({ children }) {
  return (
    <>
      <div className="container">
        <div className="row gy-2 gx-4">
          <h2>Manage your account</h2>

          <div>
            <h4>Change your account settings</h4>
            <hr />
            <div className="row">
              <div className="col-md-3">
                <ul className="nav nav-pills flex-column">
                  <li className="nav-item">
                    <a className="nav-link ">Profile</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link">Password</a>
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
