import styles from "./header.module.css";

export default function Header() {
  return (
    <header className={styles.hero}>
      <div className={styles.content}>
        <div className={styles.wrapper}>
          <h1 className="fs-1 text-capitalize fw-bold mt-0 text-white">
            Ready to Advance Your Skills?
          </h1>
          <p className="fs-4 text-capitalize fw-bolder text-white">
            Read my blog for insightful posts about my coding journey
          </p>
          <form className={styles.searchForm}>
            <input
              placeholder="search for a blog or post"
              className={styles.search}
              type="text"
            />
            <button type="submit">Search</button>
          </form>
        </div>
      </div>
    </header>
  );
}

{
  /* <div className="">
  <div className="site-heading">
    <h1>MY BLOG</h1>
    <span className="subheading">COOL BLOG</span>
    <form
      asp-action="SearchIndex"
      asp-controller="Posts"
      method="get"
      className="mt-5"
    >
      <div className="input-group">
        <input
          className="form-control"
          type="text"
          name="SearchString"
          placeholder="Enter search term"
        />
        <div className="input-group-append">
          <button
            type="submit"
            className="btn-sm btn-primary bg-warning border-primary border"
          >
            Search
          </button>
        </div>
      </div>
    </form>
  </div>
</div>; */
}
