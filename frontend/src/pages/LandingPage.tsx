import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import BorderGlow from "@/components/BorderGlow";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/lib/firebase";
import { useNavigate } from "react-router-dom";
import {
  Mic2,
  FileText,
  ListTodo,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  BarChart3,
} from "lucide-react";

function Typewriter({
  words,
  className,
}: {
  words: string[];
  className?: string;
}) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const word = words[currentWordIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          const next = word.slice(0, currentText.length + 1);
          setCurrentText(next);
          if (next === word) {
            setIsPaused(true);
          }
        } else {
          const next = word.slice(0, currentText.length - 1);
          setCurrentText(next);
          if (next === "") {
            setIsDeleting(false);
            setCurrentWordIndex((prev) => (prev + 1) % words.length);
          }
        }
      },
      isDeleting ? 60 : 120,
    );

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex, words, isPaused]);

  // Pause after typing finishes, then start deleting
  useEffect(() => {
    if (!isPaused) return;

    const timeout = setTimeout(() => {
      setIsPaused(false);
      setIsDeleting(true);
    }, 1500);

    return () => clearTimeout(timeout);
  }, [isPaused]);

  return (
    <span className={className}>
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  );
}

export default function LandingPage() {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const accessToken = credential?.accessToken;
      localStorage.setItem("googleAcessToken", accessToken ?? "");
      ~navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const features = [
    {
      icon: <Mic2 className="h-6 w-6" />,
      title: "Upload Transcripts",
      description:
        "Drop in any meeting transcript or recording text. Brievo AI handles the rest.",
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "AI Summaries",
      description:
        "Get concise, actionable meeting summaries in seconds, not hours.",
    },
    {
      icon: <ListTodo className="h-6 w-6" />,
      title: "Extracted Tasks",
      description:
        "Automatically surface action items, owners, and deadlines from every conversation.",
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Stay Organized",
      description: "Keep your meetings and follow-ups in one searchable place.",
    },
  ];

  const glowColors = [
    ["#8b5cf6", "#6366f1", "#06b6d4"],
    ["#ec4899", "#f43f5e", "#f59e0b"],
    ["#10b981", "#3b82f6", "#8b5cf6"],
    ["#f97316", "#eab308", "#84cc16"],
  ];

  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold tracking-tight">
              Brievo AI
            </span>
          </div>
          <Button
            variant="outline"
            className="gap-2"
            onClick={handleGoogleLogin}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-4 w-4"
            >
              <path
                d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                fill="currentColor"
              />
            </svg>
            Continue with Google
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden px-4 pb-20 pt-24 sm:px-6 sm:pt-32 lg:px-8 dot-grid">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            <Sparkles className="mr-2 h-3 w-3" />
            Meeting intelligence, powered by AI
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl whitespace-nowrap">
            Turn meetings into{" "}
            <Typewriter
              words={["action", "insights", "outcomes", "clarity"]}
              className="inline-block min-w-[10ch] text-left bg-gradient-to-r from-white to-muted-foreground bg-clip-text text-transparent"
            />
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Upload transcripts, get AI-generated summaries, and extract action
            items automatically. Brievo AI helps your team move from meetings to
            momentum.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="gap-2 px-8"
              onClick={handleGoogleLogin}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="h-5 w-5"
              >
                <path
                  d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                  fill="currentColor"
                />
              </svg>
              Get Started with Google
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="gap-2"
              onClick={() =>
                document
                  .getElementById("features")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              See how it works
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need after a meeting
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              No more rewatching recordings or chasing notes. Brievo AI captures
              what matters.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {features.map((feature, index) => (
              <BorderGlow
                key={feature.title}
                className="h-full p-6 sm:p-8"
                backgroundColor="rgba(12, 12, 12, 0.6)"
                colors={glowColors[index % glowColors.length]}
                borderRadius={24}
                glowRadius={60}
                glowIntensity={0.8}
              >
                <div className="flex flex-col gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </BorderGlow>
            ))}
          </div>
        </div>
      </section>

      {/* CTA
      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-3xl border border-border bg-card p-8 text-center sm:p-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to make your meetings useful?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Join with your Google account and start turning conversations into
            clear next steps.
          </p>
          <ul className="mx-auto mt-8 flex max-w-md flex-col gap-3 text-left text-sm text-muted-foreground">
            {[
              "Unlimited transcript analysis",
              "Automatic summaries & tasks",
              "Secure Google authentication",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                {item}
              </li>
            ))}
          </ul>
          <Button
            size="lg"
            className="mt-10 gap-2 px-8"
            onClick={handleGoogleLogin}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-5 w-5"
            >
              <path
                d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                fill="currentColor"
              />
            </svg>
            Continue with Google
          </Button>
        </div>
      </section> */}

      {/* Footer */}
      <footer className="border-t border-border px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Sparkles className="h-3.5 w-3.5" />
            </div>
            <span className="text-sm font-semibold">Brievo AI</span>
          </div>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Brievo AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
