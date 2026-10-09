import { Link } from "react-router-dom";

// 404 page
export default () => (
  <div className="grid min-h-[60vh] place-items-center text-center">
    <div>
      <h1 className="text-7xl font-bold text-violet-500">
        404
      </h1>

      <p className="mt-3 muted">
        Page not found.
      </p>

      <Link
        to="/dashboard"
        className="btn btn-primary mt-5"
      >
        Dashboard
      </Link>
    </div>
  </div>
);