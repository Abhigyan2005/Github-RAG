import { useNavigate } from "react-router-dom";
function Landing() {
  const navigate = useNavigate();
  return (
    <>
      <nav className="flex p-8 justify-between items-center">
        <div className="font-bold text-2xl md:text-4xl">RepoInsight</div>
        <div></div>
        <div className="flex gap-5">
          <button
            onClick={navigate("/login")}
            className="p-2 text-[#c0c1ff] hidden md:block"
          >
            Sign In
          </button>
          <button
            onClick={() => {
              navigate("/login");
            }}
            className="p-2 text-[#0F172A] bg-[#c0c1ff] rounded-2xl cursor-pointer hover:scale-110 transition-all"
          >
            Sign Up
          </button>
        </div>
      </nav>

      <main className="h-screen">
        <section className="hero min-h-[50%]  flex flex-col gap-5 justify-center items-center">
          <div className="max-w-2xl text-center">
            <div className="text-4xl md:text-6xl font-semibold">
              <div className="text-white">Your Codebase,</div>
              <div>Now Interactive.</div>
            </div>

            <p className="mt-4">
              Index your GitHub repos and chat with them in seconds. Perfect for
              onboarding, refactoring, and complex architectural questions.
            </p>

            <button
              onClick={() => {
                navigate("/dashboard");
              }}
              className="px-7 py-3 text-black mt-4 bg-linear-to-br from-white to-[#6366F1] cursor-pointer hover:scale-110 transition-all"
            >
              Get Started
            </button>
          </div>
        </section>
      </main>
    </>
  );
}

export default Landing;
