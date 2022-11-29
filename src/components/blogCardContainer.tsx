export default function BlogCardContainer({ children }) {
  return (
    <div className="container">
      <div className="row gy-2 gx-4">{children}</div>
    </div>
  );
}
