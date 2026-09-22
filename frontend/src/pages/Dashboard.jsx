import { useEffect, useState } from "react"

import { useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import api from "../services/api"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

function Dashboard() {
  const navigate = useNavigate()
const { user, logout } = useAuth()

const location = useLocation()
const selectedSession = location.state?.session

const savedDraft = localStorage.getItem("debugmind-draft")

let draft = null

if (savedDraft) {
  try {
    draft = JSON.parse(savedDraft)
  } catch {
    localStorage.removeItem("debugmind-draft")
  }
}

const [language, setLanguage] = useState(
  selectedSession?.language || draft?.language || "Java"
)

const [errorMessage, setErrorMessage] = useState(
  selectedSession?.errorMessage || draft?.errorMessage || ""
)

const [code, setCode] = useState(
  selectedSession?.code || draft?.code || ""
)

const [analysis, setAnalysis] = useState(
  selectedSession || null
)

const [loading, setLoading] = useState(false)
const [error, setError] = useState("")
useEffect(() => {
  if (selectedSession) return

  localStorage.setItem(
    "debugmind-draft",
    JSON.stringify({
      language,
      errorMessage,
      code,
    })
  )
}, [language, errorMessage, code, selectedSession])


const handleNewDebug = () => {
  setLanguage("Java")
  setErrorMessage("")
  setCode("")
  setAnalysis(null)
  setError("")

  localStorage.removeItem("debugmind-draft")

  navigate("/dashboard", { replace: true, state: null })
}

const handleAnalyze = async () => {


if (!code.trim()) {
  setError("Please enter the code you want to debug.")
  return
}

if (!language.trim()) {
  setError("Please select a programming language.")
  return
}

  setLoading(true)
  setError("")
  setAnalysis(null)

  try {
    const response = await api.post("/api/debug", {
      errorMessage,
      code,
      language,
    })

    setAnalysis(response.data)
  } catch (err) {
  console.error(err)

  const responseData = err.response?.data

  if (responseData?.errors) {
    const validationMessages = Object.values(responseData.errors)
      .join(", ")

    setError(validationMessages)
  } else {
    setError(
      responseData?.message ||
      "Unable to analyze the error. Please try again."
    )
  }
} finally {
    setLoading(false)
  }
}

  return (
    <main className="min-h-screen bg-slate-950 text-white">

      {/* TOP BAR */}
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/[0.06] bg-slate-950/85 backdrop-blur-xl">

        <div className="flex h-[72px] items-center justify-between px-5 sm:px-8">

          <div className="flex items-center gap-3">

            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-400/30 bg-cyan-400/10">
              <span className="font-mono text-sm font-bold text-cyan-300">
                {"</>"}
              </span>
            </div>

            <span className="text-lg font-bold">
              DebugMind<span className="text-cyan-400"> AI</span>
            </span>

          </div>

          <div className="flex items-center gap-4">

            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium text-slate-200">
                {user?.name || "User"}
              </p>

              <p className="text-xs text-slate-600">
                {user?.email}
              </p>
            </div>

            <button
              onClick={logout}
              className="rounded-lg border border-slate-800 px-4 py-2 text-xs font-medium text-slate-400 transition hover:border-slate-600 hover:text-white"
            >
              Logout
            </button>

          </div>

        </div>

      </header>

      {/* MAIN */}
      <div className="mx-auto flex max-w-7xl pt-[72px]">

        {/* SIDEBAR */}
        <aside className="hidden min-h-[calc(100vh-72px)] w-60 border-r border-white/[0.05] px-4 py-8 lg:block">

          <nav className="space-y-2">

            <button className="flex w-full items-center gap-3 rounded-xl border border-cyan-400/10 bg-cyan-400/[0.06] px-4 py-3 text-left text-sm font-medium text-cyan-300">
              <span>⌂</span>
              Dashboard
            </button>

            <button onClick={handleNewDebug} className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm text-slate-500 transition hover:bg-slate-900 hover:text-slate-200">
              <span>+</span>
              New Debug
            </button>

            <button
            onClick={() => navigate("/history")}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm text-slate-500 transition hover:bg-slate-900 hover:text-slate-200"
          >
            <span>◷</span>
            History
          </button> 

          </nav>

          <div className="mt-10 border-t border-slate-800 pt-6">

            <p className="px-4 text-[10px] font-mono uppercase tracking-[0.18em] text-slate-700">
              Workspace
            </p>

            <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900/40 p-4">

              <div className="flex items-center gap-2">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                <span className="text-xs text-slate-400">
                  AI Engine Online
                </span>
              </div>

              <p className="mt-3 text-[11px] leading-5 text-slate-600">
                Ready to analyze your code and explain the root cause.
              </p>

            </div>

          </div>

        </aside>

        {/* CONTENT */}
        <section className="min-w-0 flex-1 px-5 py-10 sm:px-8 lg:px-12">

          {/* Heading */}
          <div className="mb-10">

            <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-400">
              Debug workspace
            </p>

            <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              What are you debugging today?
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
              Paste your error message and code below. Error messages are optional —
              DebugMind AI can also analyze your code for potential issues.
            </p>

          </div>

          {/* DEBUGGER */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 shadow-2xl shadow-black/10 sm:p-7">

            {/* Error */}
            <div>

              <div className="mb-3 flex items-center justify-between">

                <label className="text-sm font-medium text-slate-300">
                  Error message <span className="text-slate-500">(Optional)</span>
                </label>

                <span className="font-mono text-[10px] uppercase tracking-wider text-slate-700">
                  INPUT.ERROR
                </span>

              </div>

              <textarea
                value={errorMessage}
                onChange={(event) =>
                  setErrorMessage(event.target.value)
                }
                placeholder="Paste your error message or stack trace..."
                rows={4}
                className="w-full resize-none rounded-xl border border-slate-800 bg-slate-950/80 p-4 font-mono text-sm leading-6 text-slate-300 outline-none transition placeholder:text-slate-700 focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/10"
              />

            </div>

            {/* Language */}
            <div className="mt-6">

              <label
                htmlFor="language"
                className="mb-3 block text-sm font-medium text-slate-300"
              >
                Programming language
              </label>

              <select
                id="language"
                value={language}
                onChange={(event) =>
                  setLanguage(event.target.value)
                }
                className="w-full rounded-xl border border-slate-800 bg-slate-950/80 px-4 py-3 text-sm text-slate-300 outline-none transition focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/10 sm:w-64"
              >
                <option>Java</option>
                <option>Python</option>
                <option>JavaScript</option>
                <option>C++</option>
                <option>C</option>
                <option>SQL</option>
              </select>

            </div>

            {/* Code */}
            <div className="mt-6">

              <div className="mb-3 flex items-center justify-between">

                <label className="text-sm font-medium text-slate-300">
                  Your code
                </label>

                <span className="font-mono text-[10px] uppercase tracking-wider text-slate-700">
                  INPUT.CODE
                </span>

              </div>

              <textarea
                value={code}
                onChange={(event) =>
                  setCode(event.target.value)
                }
                placeholder={`Paste your ${language} code here...`}
                rows={12}
                className="w-full resize-y rounded-xl border border-slate-800 bg-slate-950/80 p-4 font-mono text-sm leading-7 text-slate-300 outline-none transition placeholder:text-slate-700 focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/10"
              />

            </div>

            {/* Action */}
            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              <p className="text-xs text-slate-600">
                AI analysis will identify the root cause and generate a fix.
              </p>

              <button
                onClick={handleAnalyze}
                disabled={loading}
                className={`group inline-flex items-center justify-center rounded-xl px-6 py-3.5 text-sm font-bold shadow-lg transition duration-300 ${
                  loading
                    ? "cursor-not-allowed bg-cyan-400/50 text-slate-950/60"
                    : "bg-cyan-400 text-slate-950 shadow-cyan-500/10 hover:-translate-y-0.5 hover:bg-cyan-300"
                }`}
              >
                {loading ? (
                  <>
                    <span className="mr-2 animate-spin">⟳</span>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <span className="mr-2 text-base">✦</span>
                    Analyze error
                    <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </>
                )}
              </button>

            </div>

          </div>

          {/* Empty AI state */}
          {error && (
  <div className="mt-6 rounded-xl border border-red-400/20 bg-red-400/[0.04] px-5 py-4 text-sm text-red-400">
    {error}
  </div>
)}

{loading && (
  <div className="mt-6 overflow-hidden rounded-2xl border border-cyan-400/10 bg-slate-900/40 p-6">

    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-400/10">
        <span className="animate-pulse text-cyan-300">
          ✦
        </span>
      </div>

      <div>
        <p className="text-sm font-semibold text-cyan-300">
          DebugMind AI is analyzing...
        </p>

        <p className="mt-1 text-xs text-slate-600">
          Finding the root cause and generating a solution.
        </p>
      </div>
    </div>

    <div className="mt-6 h-1 overflow-hidden rounded-full bg-slate-800">
      <div className="h-full w-1/2 animate-pulse rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" />
    </div>

  </div>
)}

{analysis && !loading && (
  <div className="mt-6 overflow-hidden rounded-2xl border border-cyan-400/10 bg-slate-900/40">

    {/* Header */}
    <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4 sm:px-6">

      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-400/10">
          <span className="text-cyan-300">
            ✦
          </span>
        </div>

        <div>
          <p className="text-sm font-semibold text-white">
            AI Analysis
          </p>

          <p className="text-xs text-slate-600">
            Debug session #{analysis.id}
          </p>
        </div>
      </div>

      <span className="rounded-md border border-emerald-400/10 bg-emerald-400/[0.04] px-3 py-1.5 font-mono text-[10px] text-emerald-400">
        COMPLETE
      </span>

    </div>

    {/* Input summary */}
    <div className="grid gap-4 border-b border-slate-800 p-5 sm:grid-cols-3 sm:p-6">

      <div>
        <p className="text-[10px] uppercase tracking-[0.15em] text-slate-700">
          Language
        </p>

        <p className="mt-2 font-mono text-xs text-slate-300">
          {analysis.language}
        </p>
      </div>

      <div className="sm:col-span-2">
        <p className="text-[10px] uppercase tracking-[0.15em] text-slate-700">
          Error
        </p>

        <p className="mt-2 font-mono text-xs leading-5 text-red-400">
          {analysis.errorMessage}
        </p>
      </div>

    </div>

    {/* AI Response */}
    <div className="p-5 sm:p-6">

      <div className="mb-4 flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-cyan-400">
          DebugMind Response
        </p>

        <span className="font-mono text-[10px] text-slate-700">
          GEMINI AI
        </span>
      </div>

      <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-5">

        <div className="prose prose-invert max-w-none text-sm leading-7 text-slate-300">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {analysis.aiResponse}
          </ReactMarkdown>
        </div>

      </div>

    </div>

  </div>
)}
        </section>

      </div>

    </main>
  )
}

export default Dashboard