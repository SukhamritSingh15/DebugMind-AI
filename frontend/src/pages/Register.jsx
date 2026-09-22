import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function Register() {
  const navigate = useNavigate()
  const { register } = useAuth()

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  })

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    setError("")
    setLoading(true)

    try {
      await register(
        form.name,
        form.email,
        form.password
      )

      navigate("/login")
    } catch (err) {
      setError(
        err.response?.data ||
        "Registration failed. Please try again."
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 px-5 pt-28 sm:px-8">

      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/4 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-400/10 blur-[120px]" />

      <div className="relative mx-auto flex min-h-[calc(100vh-112px)] max-w-md items-center justify-center">

        <div className="w-full">

          {/* Heading */}
          <div className="mb-8 text-center">

            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10">
              <span className="font-mono text-sm font-bold text-cyan-300">
                {"</>"}
              </span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Create your account
            </h1>

            <p className="mt-3 text-sm text-slate-500">
              Start debugging smarter with DebugMind AI.
            </p>

          </div>

          {/* Form card */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-8">

            {error && (
              <div className="mb-5 rounded-lg border border-red-400/20 bg-red-400/[0.05] px-4 py-3 text-sm text-red-400">
                {error}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Full name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                  className="w-full rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-700 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/10"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Email address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className="w-full rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-700 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/10"
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Password
                </label>

                <input
                  id="password"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  required
                  minLength={6}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-700 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/10"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="group w-full rounded-xl bg-cyan-400 px-5 py-3.5 text-sm font-bold text-slate-950 shadow-lg shadow-cyan-500/10 transition duration-300 hover:-translate-y-0.5 hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  "Creating account..."
                ) : (
                  <>
                    Create account
                    <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </>
                )}
              </button>

            </form>

            {/* Login */}
            <p className="mt-6 text-center text-sm text-slate-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-cyan-400 transition hover:text-cyan-300"
              >
                Sign in
              </Link>
            </p>

          </div>

          {/* Back */}
          <div className="mt-6 text-center">
            <Link
              to="/"
              className="text-xs text-slate-600 transition hover:text-slate-400"
            >
              ← Back to DebugMind AI
            </Link>
          </div>

        </div>

      </div>
    </main>
  )
}

export default Register