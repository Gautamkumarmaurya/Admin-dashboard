import { Link } from "react-router-dom";

// Forgot password page
export default () => (
  <div className="min-h-screen grid place-items-center p-4">
    <div className="panel max-w-md p-7">
      <h1 className="text-2xl font-bold">
        Forgot password
      </h1>

      <p className="mt-2 muted">
        Demo only. No email will be sent.
      </p>

      <input
        className="field mt-5"
        placeholder="admin@example.com"
      />

      <button className="btn btn-primary mt-4 w-full">
        Send reset link
      </button>

      <Link
        className="mt-4 block text-center text-sm text-violet-400"
        to="/login"
      >
        Back to login
      </Link>
    </div>
  </div>
);