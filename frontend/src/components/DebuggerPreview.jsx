import { useEffect, useState } from "react"

const examples = [
  {
    language: "Java",
    error: "NullPointerException",
    message: "Cannot invoke method because object is null",
    code: [
      "User user = null;",
      "System.out.println(user.getName());",
    ],
    fix: "Initialize user before accessing its methods.",
  },
  {
    language: "Java",
    error: "ArrayIndexOutOfBoundsException",
    message: "Index 5 out of bounds for length 3",
    code: [
      "int[] numbers = {10, 20, 30};",
      "System.out.println(numbers[5]);",
    ],
    fix: "Access an index within the array length.",
  },
  {
    language: "Java",
    error: "NumberFormatException",
    message: 'For input string: "hello"',
    code: [
      'String value = "hello";',
      "int number = Integer.parseInt(value);",
    ],
    fix: "Validate the input before converting it.",
  },
]

function DebuggerPreview() {
  const [active, setActive] = useState(0)
  const [analyzing, setAnalyzing] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setAnalyzing(true)

      setTimeout(() => {
        setAnalyzing(false)
      }, 1800)

      setTimeout(() => {
        setActive((current) => (current + 1) % examples.length)
      }, 3200)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const example = examples[active]

  return (
    <div className="debugger-wrap">

      {/* Floating status */}
      <div className="status-card status-card-top">
        <span className="status-dot" />
        <span>AI Engine Online</span>
      </div>

      <div className="status-card status-card-bottom">
        <span className="text-cyan-300">✦</span>

        <span>
          {analyzing ? "Analyzing code..." : "Analysis complete"}
        </span>
      </div>

      {/* Main window */}
      <div className="debugger-window">

        {/* Window header */}
        <div className="debugger-header">

          <div className="flex gap-2">
            <span className="window-dot red" />
            <span className="window-dot yellow" />
            <span className="window-dot green" />
          </div>

          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />

            <span className="font-mono text-xs text-slate-500">
              debugmind.ai
            </span>
          </div>

        </div>

        {/* Body */}
        <div className="p-4 sm:p-6">

          {/* Toolbar */}
          <div className="mb-5 flex items-center justify-between">

            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-600">
                Debug session
              </p>

              <p className="mt-1 font-mono text-sm text-slate-300">
                {example.language}
              </p>
            </div>

            <div className="rounded-md border border-slate-700 bg-slate-950 px-3 py-1.5 font-mono text-xs text-slate-500">
              AI DEBUG
            </div>

          </div>

          {/* Error */}
          <div className="error-box">

            <div className="flex items-center gap-2">

              <span className="error-icon">
                !
              </span>

              <span className="font-mono text-sm font-semibold text-red-400">
                {example.error}
              </span>

            </div>

            <p className="mt-2 text-xs leading-5 text-slate-400 sm:text-sm">
              {example.message}
            </p>

          </div>

          {/* Code */}
          <div className="code-box">

            <div className="mb-3 flex items-center justify-between">

              <span className="text-xs text-slate-600">
                INPUT.CODE
              </span>

              <span className="font-mono text-xs text-slate-700">
                {example.language}
              </span>

            </div>

            {example.code.map((line, index) => (
              <div
                key={line}
                className="flex font-mono text-xs leading-7 sm:text-sm"
              >

                <span className="mr-5 w-5 select-none text-right text-slate-700">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span
                  className={
                    index === 1
                      ? "text-red-300"
                      : "text-slate-300"
                  }
                >
                  {line}
                </span>

              </div>
            ))}

          </div>

          {/* AI Analysis */}
          <div className="ai-box">

            {/* AI Analysis Header */}
            <div className="flex items-center justify-between">

              <div className="flex items-center gap-2">

                <span className="text-cyan-300">
                  ✦
                </span>

                <span className="text-sm font-semibold text-cyan-300">
                  AI Analysis
                </span>

              </div>

              <span className="font-mono text-[10px] text-cyan-400/60">
                {analyzing ? "ANALYZING..." : "COMPLETE"}
              </span>

            </div>

            {/* Progress */}
            <div className="mt-4 h-1 overflow-hidden rounded-full bg-slate-800">

              <div
                className={`h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-1000 ${
                  analyzing ? "w-1/3" : "w-full"
                }`}
              />

            </div>

            {/* Analysis Content */}
            <div className="mt-4">

              {analyzing ? (
                <div className="space-y-2">

                  <div className="typing-line w-3/4" />

                  <div className="typing-line w-1/2" />

                </div>
              ) : (
                <>
                  <p className="text-xs leading-6 text-slate-400 sm:text-sm">

                    <span className="text-white">
                      Root cause:
                    </span>{" "}

                    {example.fix}

                  </p>

                  <div className="mt-4 rounded-lg border border-emerald-400/10 bg-emerald-400/[0.04] px-4 py-3">

                    <p className="font-mono text-xs text-emerald-400">
                      ✓ Fix generated successfully
                    </p>

                  </div>
                </>
              )}

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default DebuggerPreview