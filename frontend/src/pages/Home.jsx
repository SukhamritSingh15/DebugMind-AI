import AnimatedBackground from "../components/AnimatedBackground"
import DebuggerPreview from "../components/DebuggerPreview"

function Home() {
  return (
    <main className="relative overflow-hidden">

      <AnimatedBackground />

      {/* HERO */}
      <section className="relative z-10 px-5 pb-16 pt-20 sm:px-8 sm:pt-24 lg:pb-24 lg:pt-28">
        
        <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[0.9fr_1.1fr]">

          {/* LEFT */}
          <div className="animate-fade-up">

            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/[0.05] px-4 py-2 font-mono text-xs text-cyan-300 backdrop-blur">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" />
              AI DEBUGGING COPILOT
            </div>

            <h1 className="max-w-3xl text-5xl font-bold leading-[0.98] tracking-[-0.04em] sm:text-6xl lg:text-[76px]">

              Turn errors

              <br />

              into{" "}

              <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
                solutions.
              </span>

            </h1>

            <p className="mt-7 max-w-xl text-base leading-7 text-slate-400 sm:text-lg sm:leading-8">
              DebugMind AI analyzes errors, explains the root cause,
              and generates practical fixes so you can spend less time
              debugging and more time building.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">

              <a
                href="/dashboard"
                className="group rounded-xl bg-cyan-400 px-6 py-3.5 text-sm font-bold text-slate-950 shadow-xl shadow-cyan-500/10 transition duration-300 hover:-translate-y-1 hover:bg-cyan-300 hover:shadow-cyan-400/20"
              >
                Start debugging

                <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>

              <a
                href="#how-it-works"
                className="rounded-xl border border-slate-700 bg-slate-900/40 px-6 py-3.5 text-sm font-semibold text-slate-200 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-slate-500 hover:bg-slate-800/70"
              >
                See how it works
              </a>

            </div>

            {/* Technologies */}
            <div className="mt-10">

              <p className="mb-3 text-xs uppercase tracking-[0.18em] text-slate-600">
                Built for developers
              </p>

              <div className="flex flex-wrap gap-2">

                {["Java", "Python", "JavaScript", "C++", "SQL"].map(
                  (language) => (
                    <span
                      key={language}
                      className="rounded-md border border-slate-800 bg-slate-900/50 px-3 py-1.5 font-mono text-xs text-slate-500 transition hover:border-slate-600 hover:text-slate-300"
                    >
                      {language}
                    </span>
                  ),
                )}

              </div>

            </div>

          </div>


          {/* RIGHT */}
        <div className="animate-fade-right lg:translate-x-4">
        <DebuggerPreview />
        </div>

        </div>

      </section>


      {/* FEATURES */}
      <section
        id="features"
        className="relative z-10 border-t border-white/[0.05] px-5 py-24 sm:px-8 lg:py-32"
      >

        <div className="mx-auto max-w-7xl">

          <div className="max-w-2xl">

            <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-400">
              Why DebugMind
            </p>

            <h2 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Everything you need to
            <span className="text-slate-500"> understand the bug.</span>
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
            DebugMind doesn't just tell you that something went wrong.
            It breaks down the failure, explains the root cause, and helps
            you build the right fix.
            </p>
          </div>
        <div className="mt-14 grid gap-5 md:grid-cols-3">

  <FeatureCard
    number="01"
    icon="⌕"
    title="Find the root cause"
    description="Trace the failure back to the actual source of the problem."
    visual="root"
  />

  <FeatureCard
    number="02"
    icon="✦"
    title="Understand the problem"
    description="Get a clear explanation of what happened and why your code failed."
    visual="analysis"
  />

  <FeatureCard
    number="03"
    icon="↗"
    title="Generate a solution"
    description="Receive corrected code and practical recommendations."
    visual="solution"
  />

</div>
        </div>

      </section>


      {/* HOW IT WORKS */}
      <section
        id="how-it-works"
        className="relative z-10 border-t border-white/[0.05] px-5 py-24 sm:px-8 lg:py-32"
      >

        <div className="mx-auto max-w-7xl">

          <div className="text-center">

            <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-400">
              Simple workflow
            </p>

            <h2 className="mt-4 text-3xl font-bold sm:text-5xl">
              From bug to fix in three steps.
            </h2>

          </div>


          <div className="mt-16 grid gap-5 md:grid-cols-3">

            <Step
            number="01"
            title="Paste"
            text="Drop in your error, stack trace, code, and programming language."
            visual="paste"
            />

            <Step
            number="02"
            title="Analyze"
            text="DebugMind AI identifies the root cause and explains what went wrong."
            visual="analyze"
            />

            <Step
            number="03"
            title="Fix"
            text="Get corrected code and best practices you can apply immediately."
            visual="fix"
            />
          </div>

        </div>

      </section>


      {/* CTA */}
      {/* FINAL CTA */}
<section id="technology" className="relative z-10 px-5 py-24 sm:px-8 lg:py-32">
  <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/50">

    {/* Background glow */}
    <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-cyan-400/10 blur-[100px]" />
    <div className="pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-violet-500/10 blur-[100px]" />

    <div className="relative grid items-center gap-12 px-7 py-12 sm:px-12 sm:py-16 lg:grid-cols-[1fr_0.9fr] lg:px-16 lg:py-20">

      {/* LEFT */}
      <div>

        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/[0.05] px-4 py-2 font-mono text-xs text-cyan-300">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" />
          READY TO DEBUG?
        </div>

        <h2 className="mt-6 max-w-2xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
          Stop fighting
          <br />
          your{" "}
          <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
            errors.
          </span>
        </h2>

        <p className="mt-6 max-w-xl text-base leading-7 text-slate-400 sm:text-lg">
          DebugMind AI finds the root cause, explains what went wrong,
          and generates practical fixes — all in one place.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="/dashboard"
            className="group inline-flex items-center rounded-xl bg-cyan-400 px-6 py-3.5 text-sm font-bold text-slate-950 shadow-xl shadow-cyan-500/10 transition duration-300 hover:-translate-y-1 hover:bg-cyan-300"
          >
            Start debugging
            <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>

          <a
            href="#features"
            className="inline-flex items-center rounded-xl border border-slate-700 bg-slate-950/40 px-6 py-3.5 text-sm font-semibold text-slate-300 transition duration-300 hover:-translate-y-1 hover:border-slate-500 hover:text-white"
          >
            Explore features
          </a>
        </div>

        {/* Trust / feature indicators */}
        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
          <span className="flex items-center gap-2 text-xs text-slate-500">
            <span className="text-emerald-400">✓</span>
            Root cause analysis
          </span>

          <span className="flex items-center gap-2 text-xs text-slate-500">
            <span className="text-emerald-400">✓</span>
            Corrected code
          </span>

          <span className="flex items-center gap-2 text-xs text-slate-500">
            <span className="text-emerald-400">✓</span>
            Best practices
          </span>
        </div>

      </div>

      {/* RIGHT — PRODUCT PREVIEW */}
      <div className="relative">

        {/* Glow behind card */}
        <div className="absolute inset-0 rounded-3xl bg-cyan-400/10 blur-3xl" />

        <div className="relative overflow-hidden rounded-2xl border border-slate-700 bg-slate-950 shadow-2xl shadow-black/40">

          {/* Window header */}
          <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
            <div className="flex gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
            </div>

            <span className="font-mono text-[10px] text-slate-600">
              DEBUGMIND AI
            </span>
          </div>

          <div className="p-5 sm:p-6">

            {/* Error */}
            <div className="rounded-xl border border-red-400/10 bg-red-400/[0.03] p-4">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-red-400/10 font-mono text-xs text-red-400">
                  !
                </span>

                <span className="font-mono text-xs font-semibold text-red-400">
                  NullPointerException
                </span>
              </div>

              <p className="mt-2 font-mono text-[11px] leading-5 text-slate-500">
                Cannot invoke method because object is null
              </p>
            </div>

            {/* AI analysis */}
            <div className="mt-4 rounded-xl border border-cyan-400/10 bg-cyan-400/[0.03] p-4">

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-cyan-300">✦</span>
                  <span className="text-xs font-semibold text-cyan-300">
                    AI Analysis
                  </span>
                </div>

                <span className="font-mono text-[9px] text-emerald-400">
                  COMPLETE
                </span>
              </div>

              <div className="mt-4 space-y-3">

                <div className="flex items-center gap-3">
                  <span className="text-emerald-400">✓</span>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-slate-600">
                      Root cause
                    </p>
                    <p className="mt-1 font-mono text-xs text-slate-300">
                      Object is null
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-emerald-400">✓</span>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-slate-600">
                      Solution
                    </p>
                    <p className="mt-1 font-mono text-xs text-slate-300">
                      Initialize object before access
                    </p>
                  </div>
                </div>

              </div>

              {/* Progress */}
              <div className="mt-5">
                <div className="h-1 overflow-hidden rounded-full bg-slate-800">
                  <div className="h-full w-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" />
                </div>
              </div>

            </div>

            {/* Generated fix */}
            <div className="mt-4 rounded-xl border border-emerald-400/10 bg-emerald-400/[0.03] p-4">

              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-slate-600">
                  GENERATED FIX
                </span>

                <span className="font-mono text-[10px] text-emerald-400">
                  ✓ READY
                </span>
              </div>

              <div className="mt-3 font-mono text-xs leading-6">
                <div className="text-red-400/70">
                  − user.getName();
                </div>

                <div className="text-emerald-400">
                  + if (user != null) &#123;
                </div>

                <div className="pl-5 text-emerald-400">
                  user.getName();
                </div>

                <div className="text-emerald-400">
                  &#125;
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>

    </div>
  </div>
</section>
    </main>
  )
}


function FeatureCard({ number, icon, title, description, visual }) {
  return (
    <div className="group relative min-h-[380px] overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40 p-6 transition duration-500 hover:-translate-y-2 hover:border-cyan-400/30 hover:bg-slate-900/70 sm:p-7">

      {/* Subtle glow */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-cyan-400/5 blur-3xl transition duration-500 group-hover:bg-cyan-400/10" />

      {/* Header */}
      <div className="relative flex items-center justify-between">

        <span className="font-mono text-xs text-slate-600">
          {number}
        </span>

        <span className="text-xl text-cyan-400 transition duration-300 group-hover:scale-125">
          {icon}
        </span>

      </div>


      {/* VISUAL AREA */}
      <div className="relative mt-7 h-[150px] overflow-hidden rounded-xl border border-slate-800/80 bg-slate-950/80 p-4">

        {/* ROOT CAUSE */}
        {visual === "root" && (
          <div className="font-mono text-xs">

            <div className="mb-3 flex items-center gap-2 text-red-400">
              <span className="h-2 w-2 rounded-full bg-red-400 animate-pulse" />
              ERROR DETECTED
            </div>

            <div className="text-slate-500">
              NullPointerException
            </div>

            <div className="mt-3 flex items-center gap-2">
              <span className="text-yellow-300">
                user
              </span>

              <span className="text-slate-600">
                →
              </span>

              <span className="text-red-400">
                null
              </span>
            </div>

            <div className="ml-10 mt-1 text-slate-700">
              ↓
            </div>

            <div className="text-slate-500">
              getName()
            </div>

            <div className="mt-2 text-emerald-400">
              ✓ ROOT CAUSE FOUND
            </div>

          </div>
        )}


        {/* AI ANALYSIS */}
        {visual === "analysis" && (
          <div>

            <div className="flex items-center gap-2 font-mono text-xs text-cyan-300">
              <span className="animate-pulse">
                ✦
              </span>

              AI ANALYSIS
            </div>

            <div className="mt-4 space-y-3">

              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-slate-500">
                  Root cause
                </span>

                <span className="text-slate-300">
                  Object is null
                </span>
              </div>

              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-slate-500">
                  Code context
                </span>

                <span className="text-cyan-400">
                  Analyzed
                </span>
              </div>

              <div className="pt-1">

                <div className="mb-1 flex justify-between font-mono text-[10px] text-slate-600">
                  <span>CONFIDENCE</span>
                  <span>98%</span>
                </div>

                <div className="h-1 overflow-hidden rounded-full bg-slate-800">

                  <div className="h-full w-[98%] rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" />

                </div>

              </div>

            </div>

          </div>
        )}


        {/* SOLUTION */}
        {visual === "solution" && (
          <div className="font-mono text-xs">

            <div className="mb-3 text-slate-600">
              GENERATED FIX
            </div>

            <div className="text-red-400">
              − user.getName()
            </div>

            <div className="my-2 border-t border-slate-800" />

            <div className="text-emerald-400">
              + if (user != null) &#123;
            </div>

            <div className="pl-4 text-emerald-400">
              user.getName();
            </div>

            <div className="text-emerald-400">
              &#125;
            </div>

          </div>
        )}

      </div>


      {/* TEXT */}
      <div className="relative">

        <h3 className="mt-6 text-lg font-semibold text-white">
          {title}
        </h3>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          {description}
        </p>

      </div>

    </div>
  )
}

function Step({ number, title, text, visual }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40 p-6 transition duration-500 hover:-translate-y-2 hover:border-cyan-400/30 hover:bg-slate-900/70 sm:p-7">

      {/* Glow */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-cyan-400/5 blur-3xl transition duration-500 group-hover:bg-cyan-400/10" />

      {/* Header */}
      <div className="relative flex items-center justify-between">
        <span className="font-mono text-xs text-cyan-400">
          {number}
        </span>

        <span className="text-xs font-mono text-slate-700">
          DEBUGMIND
        </span>
      </div>

      {/* Visual */}
      <div className="relative mt-6 h-[170px] overflow-hidden rounded-xl border border-slate-800 bg-slate-950/90 p-4">

        {/* PASTE */}
        {visual === "paste" && (
          <div className="font-mono text-xs">

            <div className="mb-4 flex items-center gap-2 border-b border-slate-800 pb-3">
              <span className="h-2 w-2 rounded-full bg-red-400" />
              <span className="h-2 w-2 rounded-full bg-yellow-400" />
              <span className="h-2 w-2 rounded-full bg-emerald-400" />

              <span className="ml-auto text-[10px] text-slate-600">
                ERROR.LOG
              </span>
            </div>

            <div className="text-red-400">
              NullPointerException
            </div>

            <div className="mt-2 text-slate-500">
              Cannot invoke method because object is null
            </div>

            <div className="mt-4 rounded-md border border-cyan-400/10 bg-cyan-400/[0.03] px-3 py-2">
              <span className="text-cyan-400">+</span>{" "}
              <span className="text-slate-400">
                Java code attached
              </span>
            </div>

          </div>
        )}

        {/* ANALYZE */}
        {visual === "analyze" && (
          <div className="font-mono text-xs">

            <div className="flex items-center gap-2 text-cyan-300">
              <span className="animate-pulse">✦</span>
              AI ANALYSIS
            </div>

            <div className="mt-5 space-y-3">

              <div className="flex items-center gap-3">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-800">
                  <div className="h-full w-[85%] rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" />
                </div>
                <span className="text-slate-500">
                  scanning
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-emerald-400">✓</span>
                <span className="text-slate-400">
                  Error identified
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-emerald-400">✓</span>
                <span className="text-slate-400">
                  Root cause detected
                </span>
              </div>

              <div className="mt-3 rounded-md border border-cyan-400/10 bg-cyan-400/[0.03] px-3 py-2">
                <span className="text-cyan-300">
                  ROOT CAUSE:
                </span>{" "}
                <span className="text-slate-500">
                  object is null
                </span>
              </div>

            </div>
          </div>
        )}

        {/* FIX */}
        {visual === "fix" && (
          <div className="font-mono text-xs">

            <div className="mb-3 flex items-center justify-between">
              <span className="text-slate-600">
                GENERATED FIX
              </span>

              <span className="text-emerald-400">
                ✓ READY
              </span>
            </div>

            <div className="text-red-400/80">
              − user.getName();
            </div>

            <div className="my-2 border-t border-slate-800" />

            <div className="text-emerald-400">
              + if (user != null) &#123;
            </div>

            <div className="pl-5 text-emerald-400">
              user.getName();
            </div>

            <div className="text-emerald-400">
              + &#125;
            </div>

          </div>
        )}
      </div>

      {/* Text */}
      <div className="relative">
        <h3 className="mt-6 text-xl font-semibold text-white">
          {title}
        </h3>

        <p className="mt-3 text-sm leading-6 text-slate-500">
          {text}
        </p>
      </div>

      {/* Bottom indicator */}
      <div className="mt-6 flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.15em] text-slate-700">
        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400/60" />
        Debug workflow
      </div>

    </div>
  )
}

export default Home