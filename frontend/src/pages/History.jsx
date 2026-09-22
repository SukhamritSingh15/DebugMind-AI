import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../services/api"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

function History() {
  const navigate = useNavigate()

  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [search, setSearch] = useState("")
  const [languageFilter, setLanguageFilter] = useState("All")

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await api.get("/api/debug/history")
        setHistory(response.data)
      } catch (err) {
        console.error(err)
        setError("Unable to load debugging history.")
      } finally {
        setLoading(false)
      }
    }

    fetchHistory()
  }, [])
  const handleDelete = async (sessionId) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this debug session?"
  )

  if (!confirmed) {
    return
  }

  try {
    await api.delete(`/api/debug/${sessionId}`)

    setHistory((currentHistory) =>
      currentHistory.filter((session) => session.id !== sessionId)
    )
  } catch (err) {
    console.error(err)
    setError("Failed to delete this session. Please try again.")
  }
}

  const filteredHistory = history.filter((session) => {
    const matchesSearch =
      session.errorMessage
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      session.aiResponse
        ?.toLowerCase()
        .includes(search.toLowerCase())

    const matchesLanguage =
      languageFilter === "All" ||
      session.language === languageFilter

    return matchesSearch && matchesLanguage
  })

  return (
    <main className="min-h-screen bg-slate-950 text-white">
  <div className="mx-auto flex max-w-7xl pt-16">
    
    {/* SIDEBAR */}
    <aside className="hidden min-h-[calc(100vh-72px)] w-60 border-r border-white/[0.05] px-4 py-8 lg:block">
      <nav className="space-y-2">

        <button
          onClick={() => navigate("/dashboard")}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm text-slate-500 transition hover:bg-slate-900 hover:text-slate-200"
        >
          <span>⌂</span>
          Dashboard
        </button>

        <button
          onClick={() =>
            navigate("/dashboard", {
              replace: true,
              state: null
            })
          }
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm text-slate-500 transition hover:bg-slate-900 hover:text-slate-200"
        >
          <span>+</span>
          New Debug
        </button>

        <button
          className="flex w-full items-center gap-3 rounded-xl border border-cyan-400/10 bg-cyan-400/[0.06] px-4 py-3 text-left text-sm font-medium text-cyan-300"
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

    {/* HISTORY CONTENT */}
    <section className="min-w-0 flex-1 px-5 pb-16 pt-10 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-5xl">

        <div className="mb-10">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-400">
            Debug history
          </p>

          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
            Your debugging sessions
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base">
            Review your previous errors and AI-generated debugging solutions.
          </p>
        </div>

        {/* Search and filter */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            placeholder="Search errors or AI solutions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-cyan-400/40"
          />

          <select
            value={languageFilter}
            onChange={(e) => setLanguageFilter(e.target.value)}
            className="rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3 text-sm text-slate-300 outline-none focus:border-cyan-400/40"
          >
            <option value="All">All languages</option>
            <option value="Java">Java</option>
            <option value="Python">Python</option>
            <option value="JavaScript">JavaScript</option>
            <option value="C++">C++</option>
            <option value="C">C</option>
          </select>
        </div>

        {/* Loading */}
        {loading && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-8 text-center">
            <p className="text-sm text-slate-500">
              Loading your history...
            </p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="rounded-xl border border-red-400/20 bg-red-400/[0.04] px-5 py-4 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* No history */}
        {!loading && !error && history.length === 0 && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-10 text-center">
            <p className="text-lg font-semibold text-slate-300">
              No debugging sessions yet
            </p>

            <p className="mt-2 text-sm text-slate-600">
              Analyze your first error to see it appear here.
            </p>

            <button
              onClick={() => navigate("/dashboard")}
              className="mt-6 rounded-xl bg-cyan-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-300"
            >
              Start debugging →
            </button>
          </div>
        )}

        {/* History */}
        {!loading && !error && history.length > 0 && (
          <>
            {filteredHistory.length === 0 ? (
              <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-10 text-center">
                <p className="text-lg font-semibold text-slate-300">
                  No matching sessions
                </p>

                <p className="mt-2 text-sm text-slate-600">
                  Try a different search term or language filter.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredHistory.map((session) => (
                  <div
                    key={session.id}
                    className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 transition hover:border-cyan-400/20 hover:bg-slate-900/60 sm:p-6"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

  {/* Session information */}
  <div className="min-w-0 flex-1">
    <div className="flex flex-wrap items-center gap-3">

      <span className="rounded-md border border-cyan-400/10 bg-cyan-400/[0.05] px-2.5 py-1 font-mono text-[10px] text-cyan-400">
        {session.language}
      </span>

      <span className="text-xs text-slate-600">
        Session #{session.id}
      </span>

      <span className="text-xs text-slate-600">
        {new Date(session.createdAt).toLocaleString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </span>

    </div>

    <p className="mt-4 break-words font-mono text-sm text-red-400">
      {session.errorMessage}
    </p>
  </div>

  {/* Actions */}
  <div className="flex shrink-0 items-center justify-end gap-3 sm:w-[220px]">
    
    <button
      onClick={() =>
        navigate("/dashboard", {
          state: { session },
        })
      }
      className="whitespace-nowrap rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:border-cyan-400/30 hover:text-cyan-300"
    >
      View session →
    </button>

    <button
      onClick={() => handleDelete(session.id)}
      className="whitespace-nowrap rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-2 text-sm text-red-400 transition hover:border-red-500/40 hover:bg-red-500/10"
    >
      Delete
    </button>

  </div>

</div>

                    <div className="mt-5 border-t border-slate-800 pt-4">
                      <div className="line-clamp-3 text-sm leading-6 text-slate-500 prose prose-invert max-w-none">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {session.aiResponse}
                        </ReactMarkdown>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </>
        )}

        </div>
      </section>
    </div>
  </main>
  )
}

export default History