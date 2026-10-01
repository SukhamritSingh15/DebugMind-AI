import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import api from "../services/api"
import { useAuth } from "../context/AuthContext"

function parseAnalysis(analysis) {
  if (!analysis) {
    return {
      overview: "",
      architecture: "",
      bugs: [],
      security: [],
      quality: [],
      performance: [],
      improvements: [],
      priority: "",
    }
  }

  const getSection = (title, nextTitle) => {
    const start = analysis.indexOf(title)

    if (start === -1) {
      return ""
    }

    const end = nextTitle
      ? analysis.indexOf(nextTitle, start + title.length)
      : analysis.length

    return analysis
      .slice(
        start + title.length,
        end === -1 ? analysis.length : end
      )
      .trim()
  }

const parseFindings = (section) => {
  if (!section) {
    return []
  }

  const matches = section.split(
    /####\s*Finding\s+\d+\s*:\s*/i
  )

  return matches
    .slice(1)
    .map((finding) => {
      const lines = finding.trim().split("\n")

      const title = lines[0]?.trim() || "Finding"

      const classification =
        finding.match(
          /\*\*Classification\*\*\s*:\s*(.+)/i
        )?.[1]?.trim() || ""

      const severity =
        finding.match(
          /\*\*Severity\*\*\s*:\s*(.+)/i
        )?.[1]?.trim() || ""

      const file =
        finding.match(
          /\*\*File\*\*\s*:\s*`([^`]+)`/i
        )?.[1]?.trim() || ""

      const problem =
        finding.match(
          /\*\*Problem\*\*\s*:\s*([\s\S]*?)(?=\n\s*\*\*Evidence\*\*|\n\s*\*\*Explanation\*\*|\n\s*\*\*Recommended Action\*\*|$)/i
        )?.[1]?.trim() || ""

      const evidence =
        finding.match(
          /\*\*Evidence\*\*\s*:\s*([\s\S]*?)(?=\n?\s*(?:\*\*Explanation\*\*|Explanation:|\*\*Recommended Action\*\*|Recommended Action:)|$)/i
        )?.[1]?.trim() || ""

      const explanation =
        finding.match(
          /(?:\*\*Explanation\*\*:?|Explanation:?)\s*([\s\S]*?)(?=\n?\s*(?:\*\*Recommended Action\*\*:?|Recommended Action:)|$)/i
        )?.[1]?.trim().replace(/^:\s*/, "") || ""
        
      const recommendation =
        finding.match(
          /(?:\*\*Recommended Action\*\*:?|Recommended Action:?)\s*([\s\S]*)/i
        )?.[1]?.trim().replace(/^:\s*/, "") || ""

      return {
        title,
        classification,
        severity,
        file,
        problem,
        evidence,
        explanation,
        recommendation,
      }
    })
}


  return {
    overview: getSection(
      "### 1. Project Overview",
      "### 2. Architecture & Structure"
    ),

    architecture: getSection(
      "### 2. Architecture & Structure",
      "### 3. Bugs & Potential Issues"
    ),

    bugs: parseFindings(
      getSection(
        "### 3. Bugs & Potential Issues",
        "### 4. Security Concerns"
      )
    ),

    security: parseFindings(
      getSection(
        "### 4. Security Concerns",
        "### 5. Code Quality"
      )
    ),

    quality: parseFindings(
      getSection(
        "### 5. Code Quality",
        "### 6. Performance Concerns"
      )
    ),

    performance: parseFindings(
      getSection(
        "### 6. Performance Concerns",
        "### 7. Recommended Improvements"
      )
    ),

    improvements: getSection(
      "### 7. Recommended Improvements",
      "### 8. Priority Findings"
    ),

    priority: getSection(
      "### 8. Priority Findings"
    ),
  }
}
function GitHubAnalyzer() {
    const navigate = useNavigate()
    const { user, logout } = useAuth()

  const [repositoryUrl, setRepositoryUrl] = useState(() => {
  return localStorage.getItem("debugmind-github-url") || ""
})
useEffect(() => {
  if (repositoryUrl.trim()) {
    localStorage.setItem(
      "debugmind-github-url",
      repositoryUrl
    )
  }
}, [repositoryUrl])
  const [analysis, setAnalysis] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const parsedAnalysis = parseAnalysis(analysis)
  const allFindings = [
  ...parsedAnalysis.bugs,
  ...parsedAnalysis.security,
  ...parsedAnalysis.quality,
  ...parsedAnalysis.performance,
]
  function getSeverityStyle(severity) {
 
  const value = severity.toLowerCase()

  if (value.includes("critical")) {
    return {
      label: "CRITICAL",
      className:
        "border-red-400/20 bg-red-400/[0.06] text-red-300",
    }
  }

  if (value.includes("high")) {
    return {
      label: "HIGH",
      className:
        "border-orange-400/20 bg-orange-400/[0.06] text-orange-300",
    }
  }

  if (value.includes("medium")) {
    return {
      label: "MEDIUM",
      className:
        "border-yellow-400/20 bg-yellow-400/[0.06] text-yellow-300",
    }
  }

  if (value.includes("low")) {
    return {
      label: "LOW",
      className:
        "border-blue-400/20 bg-blue-400/[0.06] text-blue-300",
    }
  }

  return {
    label: "INFO",
    className:
      "border-slate-700 bg-slate-800/40 text-slate-400",
  }
}
function FindingCard({ finding }) {
  const severity = getSeverityStyle(finding.severity)

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-5 transition hover:border-slate-700">

      {/* HEADER */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">

        <div className="min-w-0">
          <h3 className="text-sm font-semibold leading-6 text-white">
            {finding.title}
          </h3>

          {finding.file && (
            <div className="mt-2">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-600">
                File
              </span>

              <p className="mt-1 break-all font-mono text-xs text-cyan-400/80">
                {finding.file}
              </p>
            </div>
          )}
        </div>

        {finding.severity && (
          <span
            className={`shrink-0 self-start rounded-md border px-2.5 py-1 text-[10px] font-bold tracking-wider ${severity.className}`}
          >
            {severity.label}
          </span>
        )}

      </div>

      {/* CLASSIFICATION */}
      {finding.classification && (
        <div className="mt-4">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-600">
            Classification
          </span>

          <p className="mt-1 text-xs text-slate-400">
            {finding.classification}
          </p>
        </div>
      )}

      {/* PROBLEM */}
      {finding.problem && (
        <div className="mt-5 border-t border-slate-800 pt-4">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-600">
            Problem
          </p>

          <div className="mt-2 text-xs leading-6 text-slate-400">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {finding.problem}
            </ReactMarkdown>
          </div>
        </div>
      )}

      {/* EVIDENCE */}
      {finding.evidence && (
        <div className="mt-4 rounded-lg border border-slate-800 bg-slate-900/50 p-4">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-600">
            Evidence
          </p>

          <div className="mt-2 text-xs leading-6 text-slate-400">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {finding.evidence}
            </ReactMarkdown>
          </div>
        </div>
      )}
      {finding.explanation && (
        <div className="mt-4">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-600">
            Explanation
          </p>

          <div className="mt-2 text-xs leading-6 text-slate-400">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {finding.explanation}
            </ReactMarkdown>
          </div>
        </div>
      )}
      {/* RECOMMENDED ACTION */}
      {finding.recommendation && (
        <div className="mt-4 rounded-lg border border-emerald-400/10 bg-emerald-400/[0.03] p-4">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-emerald-400">
            Recommended Action
          </p>

          <div className="mt-2 text-xs leading-6 text-slate-300">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {finding.recommendation}
            </ReactMarkdown>
          </div>
        </div>
      )}

    </div>
  )
}
  const handleAnalyze = async () => {
    if (!repositoryUrl.trim()) {
      setError("Please enter a GitHub repository URL.")
      return
    }

    setLoading(true)
    setError("")
    setAnalysis("")

    try {
      const response = await api.post("/api/github/analyze", {
        repositoryUrl: repositoryUrl.trim(),
      })

      setAnalysis(response.data.analysis)
    } catch (err) {
      console.error(err)

      setError(
        err.response?.data?.message ||
          "Unable to analyze repository. Please try again."
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">

      {/* TOP BAR */}
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/[0.06] bg-slate-950/85 backdrop-blur-xl">
  <div className="flex h-[72px] items-center justify-between px-5 sm:px-8">

    {/* Logo */}
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

    {/* User */}
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

            <button
              onClick={() => navigate("/dashboard")}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm text-slate-500 transition hover:bg-slate-900 hover:text-slate-200"
            >
              <span>⌂</span>
              Dashboard
            </button>

            <button
              onClick={() => navigate("/dashboard")}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm text-slate-500 transition hover:bg-slate-900 hover:text-slate-200"
            >
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

            <button
              className="flex w-full items-center gap-3 rounded-xl border border-cyan-400/10 bg-cyan-400/[0.06] px-4 py-3 text-left text-sm font-medium text-cyan-300"
            >
              <span>⌘</span>
              GitHub Analyzer
            </button>

          </nav>

          {/* WORKSPACE */}
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
                Analyze entire GitHub repositories using AI-powered code
                intelligence.
              </p>

            </div>

          </div>

        </aside>

        {/* CONTENT */}
        <section className="min-w-0 flex-1 px-5 py-10 sm:px-8 lg:px-12">

          {/* HEADING */}
          <div className="mb-10">

            <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-400">
              Repository intelligence
            </p>

            <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              GitHub Repository Analyzer
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
              Connect a GitHub repository and let DebugMind AI analyze its
              architecture, code quality, security, performance, and potential
              issues.
            </p>

          </div>

          {/* INPUT CARD */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 shadow-2xl shadow-black/10 sm:p-7">

            <div className="mb-3 flex items-center justify-between">

              <label className="text-sm font-medium text-slate-300">
                GitHub Repository URL
              </label>

              <span className="font-mono text-[10px] uppercase tracking-wider text-slate-700">
                INPUT.REPOSITORY
              </span>

            </div>

            <div className="flex flex-col gap-3 lg:flex-row">

              <input
                type="url"
                value={repositoryUrl}
                onChange={(e) => setRepositoryUrl(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !loading) {
                    handleAnalyze()
                  }
                }}
                placeholder="https://github.com/username/project"
                className="flex-1 rounded-xl border border-slate-800 bg-slate-950/80 px-4 py-3 text-sm text-slate-300 outline-none transition placeholder:text-slate-700 focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/10"
              />

              <button
                onClick={handleAnalyze}
                disabled={loading}
                className={`rounded-xl px-6 py-3 text-sm font-bold transition ${
                  loading
                    ? "cursor-not-allowed bg-cyan-400/50 text-slate-950/60"
                    : "bg-cyan-400 text-slate-950 hover:bg-cyan-300"
                }`}
              >
                {loading ? "Analyzing..." : "Analyze Repository →"}
              </button>

            </div>

            {error && (
              <div className="mt-4 rounded-xl border border-red-400/20 bg-red-400/[0.04] px-5 py-4 text-sm text-red-400">
                {error}
              </div>
            )}

          </div>

          {/* LOADING */}
          {loading && (
            <div className="mt-6 rounded-2xl border border-cyan-400/10 bg-slate-900/40 p-6">

              <div className="flex items-center gap-3">

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-400/10">
                  <span className="animate-spin text-cyan-300">
                    ⟳
                  </span>
                </div>

                <div>
                  <p className="text-sm font-semibold text-cyan-300">
                    DebugMind AI is analyzing the repository...
                  </p>

                  <p className="mt-1 text-xs text-slate-600">
                    Reading source files and generating an AI-powered
                    repository report. This may take 30–40 seconds.
                  </p>
                </div>

              </div>

              <div className="mt-6 h-1 overflow-hidden rounded-full bg-slate-800">
                <div className="h-full w-1/2 animate-pulse rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" />
              </div>

            </div>
          )}

          {/* ANALYSIS */}
          {analysis && !loading && (
              <div>
            <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-5">

  <div className="rounded-xl border border-red-400/10 bg-red-400/[0.03] p-4">
    <p className="text-[10px] font-semibold uppercase tracking-wider text-red-400">
      Critical
    </p>
    <p className="mt-2 text-2xl font-bold text-white">
      {
        allFindings
          .filter((item) =>
            item.severity?.toLowerCase().includes("critical")
          ).length
      }
    </p>
  </div>

  <div className="rounded-xl border border-orange-400/10 bg-orange-400/[0.03] p-4">
    <p className="text-[10px] font-semibold uppercase tracking-wider text-orange-400">
      High
    </p>
    <p className="mt-2 text-2xl font-bold text-white">
      {
        allFindings
          .filter((item) =>
            item.severity?.toLowerCase().includes("high")
          ).length
      }
    </p>
  </div>

  <div className="rounded-xl border border-yellow-400/10 bg-yellow-400/[0.03] p-4">
    <p className="text-[10px] font-semibold uppercase tracking-wider text-yellow-400">
      Medium
    </p>
    <p className="mt-2 text-2xl font-bold text-white">
      {
        allFindings
          .filter((item) =>
            item.severity?.toLowerCase().includes("medium")
          ).length
      }
    </p>
  </div>

  <div className="rounded-xl border border-blue-400/10 bg-blue-400/[0.03] p-4">
    <p className="text-[10px] font-semibold uppercase tracking-wider text-blue-400">
      Low
    </p>
    <p className="mt-2 text-2xl font-bold text-white">
      {
        allFindings
          .filter((item) =>
            item.severity?.toLowerCase().includes("low")
          ).length
      }
    </p>
  </div>

  <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
    <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
      Total Findings
    </p>
    <p className="mt-2 text-2xl font-bold text-white">
      {
        allFindings.length
      }
    </p>
  </div>

          </div>

          {/* REPORT */}
<div className="mt-6 space-y-6">

  {/* PRIORITY FINDINGS */}
  {parsedAnalysis.priority && (
    <div className="rounded-2xl border border-cyan-400/10 bg-slate-900/40 p-5 sm:p-7">

      <div className="mb-5 flex items-center gap-3">

        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-300">
          ⚡
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
            AI Prioritization
          </p>

          <h2 className="mt-1 text-lg font-semibold text-white">
            Priority Findings
          </h2>
        </div>

      </div>

<div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-950/40">
  <div className="overflow-x-auto">
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        table({ children }) {
          return (
            <table className="min-w-[1000px] w-full border-collapse text-left text-sm">
              {children}
            </table>
          )
        },

        thead({ children }) {
          return (
            <thead className="border-b border-slate-800 bg-slate-900/80">
              {children}
            </thead>
          )
        },

        tbody({ children }) {
          return (
            <tbody className="divide-y divide-slate-800">
              {children}
            </tbody>
          )
        },

        tr({ children }) {
          return (
            <tr className="transition hover:bg-slate-900/50">
              {children}
            </tr>
          )
        },

        th({ children }) {
          return (
            <th className="whitespace-nowrap px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
              {children}
            </th>
          )
        },

        td({ children }) {
          return (
            <td className="px-5 py-5 align-top text-sm leading-6 text-slate-300">
              {children}
            </td>
          )
        },

        code({ children }) {
          return (
            <code className="rounded bg-slate-800 px-1.5 py-1 font-mono text-xs text-cyan-300">
              {children}
            </code>
          )
        },
      }}
    >
      {parsedAnalysis.priority}
    </ReactMarkdown>
  </div>
</div>

    </div>
  )}

            {/* PROJECT OVERVIEW */}
{parsedAnalysis.overview && (
  <div className="rounded-2xl border border-cyan-400/10 bg-slate-900/40 p-5 sm:p-7">

    <div className="mb-5 flex items-center gap-3">

      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-300">
        ◈
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
          Overview
        </p>

        <h2 className="mt-1 text-lg font-semibold text-white">
          Project Overview
        </h2>
      </div>

    </div>

    <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-5">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {parsedAnalysis.overview}
      </ReactMarkdown>
    </div>

  </div>
)}{/* ARCHITECTURE */}
{parsedAnalysis.architecture && (
  <div className="rounded-2xl border border-violet-400/10 bg-slate-900/40 p-5 sm:p-7">

    <div className="mb-5 flex items-center gap-3">

      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-400/10 text-violet-300">
        ◇
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-violet-400">
          Structure
        </p>

        <h2 className="mt-1 text-lg font-semibold text-white">
          Architecture & Structure
        </h2>
      </div>

    </div>

    <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-5">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {parsedAnalysis.architecture}
      </ReactMarkdown>
    </div>

  </div>
)}
            {/* BUGS */}
            {parsedAnalysis.bugs.length > 0 && (
              <div className="rounded-2xl border border-red-400/10 bg-slate-900/40 p-5 sm:p-7">

                <div className="mb-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">

                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-400/10 text-red-300">
                      !
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-red-400">
                        Issues
                      </p>

                      <h2 className="mt-1 text-lg font-semibold text-white">
                        Bugs & Potential Issues
                      </h2>
                    </div>

                  </div>

                  <span className="rounded-md border border-red-400/20 bg-red-400/[0.05] px-2.5 py-1 text-[10px] font-bold text-red-300">
                    {parsedAnalysis.bugs.length}
                  </span>
                </div>

                <div className="space-y-4">
                  {parsedAnalysis.bugs.map((finding, index) => (
                    <FindingCard
                      key={`bug-${index}`}
                      finding={finding}
                    />
                  ))}
                </div>

              </div>
            )}

            {/* SECURITY */}
            {parsedAnalysis.security.length > 0 && (
              <div className="rounded-2xl border border-orange-400/10 bg-slate-900/40 p-5 sm:p-7">

                <div className="mb-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">

                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-400/10 text-orange-300">
                      ◉
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-orange-400">
                        Security
                      </p>

                      <h2 className="mt-1 text-lg font-semibold text-white">
                        Security Concerns
                      </h2>
                    </div>

                  </div>

                  <span className="rounded-md border border-orange-400/20 bg-orange-400/[0.05] px-2.5 py-1 text-[10px] font-bold text-orange-300">
                    {parsedAnalysis.security.length}
                  </span>
                </div>

                <div className="space-y-4">
                  {parsedAnalysis.security.map((finding, index) => (
                    <FindingCard
                      key={`security-${index}`}
                      finding={finding}
                    />
                  ))}
                </div>

              </div>
            )}

            {/* CODE QUALITY */}
            {parsedAnalysis.quality.length > 0 && (
              <div className="rounded-2xl border border-yellow-400/10 bg-slate-900/40 p-5 sm:p-7">

                <div className="mb-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">

                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-yellow-400/10 text-yellow-300">
                      ◆
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-yellow-400">
                        Maintainability
                      </p>

                      <h2 className="mt-1 text-lg font-semibold text-white">
                        Code Quality
                      </h2>
                    </div>

                  </div>

                  <span className="rounded-md border border-yellow-400/20 bg-yellow-400/[0.05] px-2.5 py-1 text-[10px] font-bold text-yellow-300">
                    {parsedAnalysis.quality.length}
                  </span>
                </div>

                <div className="space-y-4">
                  {parsedAnalysis.quality.map((finding, index) => (
                    <FindingCard
                      key={`quality-${index}`}
                      finding={finding}
                    />
                  ))}
                </div>

              </div>
            )}

            {/* PERFORMANCE */}
            {parsedAnalysis.performance.length > 0 && (
              <div className="rounded-2xl border border-blue-400/10 bg-slate-900/40 p-5 sm:p-7">

                <div className="mb-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">

                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-400/10 text-blue-300">
                      ↗
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-blue-400">
                        Optimization
                      </p>

                      <h2 className="mt-1 text-lg font-semibold text-white">
                        Performance Concerns
                      </h2>
                    </div>

                  </div>

                  <span className="rounded-md border border-blue-400/20 bg-blue-400/[0.05] px-2.5 py-1 text-[10px] font-bold text-blue-300">
                    {parsedAnalysis.performance.length}
                  </span>
                </div>

                <div className="space-y-4">
                  {parsedAnalysis.performance.map((finding, index) => (
                    <FindingCard
                      key={`performance-${index}`}
                      finding={finding}
                    />
                  ))}
                </div>

              </div>
            )}

            {/* RECOMMENDATIONS */}
            {parsedAnalysis.improvements && (
              <div className="rounded-2xl border border-emerald-400/10 bg-slate-900/40 p-5 sm:p-7">

                <div className="mb-5 flex items-center gap-3">

                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-400/10 text-emerald-300">
                    ✓
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                      Next Steps
                    </p>

                    <h2 className="mt-1 text-lg font-semibold text-white">
                      Recommended Improvements
                    </h2>
                  </div>

                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-5">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {parsedAnalysis.improvements}
                  </ReactMarkdown>
                </div>

              </div>
            )}
            </div>
          </div>
          )}
          

        </section>

      </div>

    </main>
  )
}

export default GitHubAnalyzer