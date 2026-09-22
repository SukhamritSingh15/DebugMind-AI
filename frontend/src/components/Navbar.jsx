import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login", { replace: true })
  }

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/[0.06] bg-slate-950/75 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8">

        {/* Logo */}
        <Link
          to="/"
          className="group flex items-center gap-2"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-400/30 bg-cyan-400/10 text-cyan-300 transition duration-300 group-hover:border-cyan-300/60 group-hover:bg-cyan-400/15">
            <span className="font-mono text-sm font-bold">
              {"</>"}
            </span>
          </div>

          <span className="text-xl font-bold tracking-tight">
            DebugMind
            <span className="text-cyan-400"> AI</span>
          </span>
        </Link>

        {/* Desktop links */}
        {!user && (
          <div className="hidden items-center gap-8 md:flex">
            <a
              href="/#features"
              className="text-sm text-slate-400 transition hover:text-white"
            >
              Features
            </a>

            <a
              href="/#how-it-works"
              className="text-sm text-slate-400 transition hover:text-white"
            >
              How it works
            </a>

            <a
              href="/#technology"
              className="text-sm text-slate-400 transition hover:text-white"
            >
              Technology
            </a>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          {user ? (
            <>
              <div className="hidden text-right sm:block">
                <p className="text-sm font-semibold text-white">
                  {user.name}
                </p>

                <p className="text-xs text-slate-500">
                  {user.email}
                </p>
              </div>

              <button
                onClick={handleLogout}
                className="rounded-lg border border-slate-700 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:border-red-400/40 hover:bg-red-400/10 hover:text-red-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-lg px-3 py-2 text-sm text-slate-300 transition hover:text-white sm:px-4"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-lg bg-cyan-400 px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/10 transition duration-300 hover:-translate-y-0.5 hover:bg-cyan-300 hover:shadow-cyan-400/20 sm:px-5"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

      </div>
    </nav>
  )
}

export default Navbar