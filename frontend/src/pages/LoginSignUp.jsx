import { useState } from "react";

function LoginSignUp() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex justify-center text-center w-screen h-screen">
      <div className="w-[50%]"></div>

      <div className="bg-[#131d35] w-[50%] p-10 flex flex-col">

        <h2 className="text-white text-2xl mb-4">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        <button className="px-10 py-3 text-black mt-2 bg-linear-to-br from-white to-[#5255f4] hover:scale-105 transition">
          {isLogin ? "Login with Github" : "Sign Up with Github"}
        </button>

        <button className="px-10 py-3 text-black mt-4 bg-linear-to-br from-white to-[#1d2e56] hover:scale-105 transition">
          {isLogin ? "Login with Google" : "Sign Up with Google"}
        </button>

        <div className="text-white text-center my-4">OR</div>

        <div className="flex flex-col text-left mb-4">
          <label className="text-white mb-1">Email</label>
          <input
            type="email"
            placeholder="johndoe@gmail.com"
            className="px-3 py-2 rounded-md outline-none border bg-[#0F172A]"
          />
        </div>

        <div className="flex flex-col text-left mb-4">
          <label className="text-white mb-1">Password</label>
          <input
            type="password"
            placeholder="Enter password"
            className="px-3 py-2 rounded-md outline-none border bg-[#0F172A]"
          />
        </div>

        {!isLogin && (
          <div className="flex flex-col text-left mb-4">
            <label className="text-white mb-1">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm password"
              className="px-3 py-2 rounded-md outline-none border bg-[#0F172A]"
            />
          </div>
        )}

        <button className="mt-4 bg-[#334155] text-white py-2 rounded-md hover:bg-[#212a38] transition">
          {isLogin ? "Login" : "Sign Up"}
        </button>

        <p className="text-white mt-4 text-sm">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-400 cursor-pointer ml-2"
          >
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>

      </div>
    </div>
  );
}

export default LoginSignUp;