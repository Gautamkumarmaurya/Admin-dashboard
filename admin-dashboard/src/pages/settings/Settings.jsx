import { useState } from "react";

import { useTheme } from "../../hooks/useTheme";

// Settings page
export default function Settings() {
  const { theme, setTheme } = useTheme();

  const [saved, setSaved] = useState(false);

  return (
    <>
      <h1 className="text-3xl font-bold">
        Settings
      </h1>

      <p className="mb-6 muted">
        Manage your profile, store and preferences.
      </p>

      <div className="grid gap-4 xl:grid-cols-[220px_1fr]">
        <div className="panel h-fit p-3">
          {[
            "Profile Settings",
            "Store Settings",
            "Notification Settings",
            "Security Settings",
            "Appearance Settings",
          ].map((x, i) => (
            <button
              key={x}
              className={`block w-full rounded-lg px-3 py-2.5 text-left text-sm ${
                i === 0
                  ? "bg-violet-600"
                  : "hover:bg-white/5"
              }`}
            >
              {x}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          <form
            className="panel p-6"
            onSubmit={(e) => {
              e.preventDefault();
              setSaved(true);
            }}
          >
            <h2 className="font-semibold">
              Profile Settings
            </h2>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <label>
                <span className="mb-1 block text-sm muted">
                  Name
                </span>

                <input
                  className="field"
                  defaultValue="Admin"
                />
              </label>

              <label>
                <span className="mb-1 block text-sm muted">
                  Email
                </span>

                <input
                  className="field"
                  defaultValue="admin@example.com"
                />
              </label>

              <label>
                <span className="mb-1 block text-sm muted">
                  Phone
                </span>

                <input
                  className="field"
                  defaultValue="+91 98765 43210"
                />
              </label>

              <label>
                <span className="mb-1 block text-sm muted">
                  Role
                </span>

                <input
                  className="field"
                  disabled
                  defaultValue="Super Admin"
                />
              </label>
            </div>

            <button className="btn btn-primary mt-5">
              Save Changes
            </button>

            {saved && (
              <span className="ml-3 text-sm text-emerald-400">
                Saved
              </span>
            )}
          </form>

          <div className="panel p-6">
            <h2 className="font-semibold">
              Appearance
            </h2>

            <p className="mt-1 text-sm muted">
              Theme preference persists after refresh.
            </p>

            <div className="mt-4 flex gap-2">
              {["dark", "light"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className={`btn ${
                    theme === t
                      ? "btn-primary"
                      : "btn-ghost"
                  } capitalize`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}