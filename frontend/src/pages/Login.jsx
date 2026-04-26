import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { Link } from "react-router-dom";

const Login = () => {
  const [ showPassword, setShowPassword ] = useState( false );

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4 sm:px-6 lg:px-8 relative overflow-hidden">

      {/* 🔥 Background */ }
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.15),transparent_60%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,0.95))]" />

      {/* Glow Orbs */ }
      <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-48 sm:w-72 h-48 sm:h-72 bg-green-500/10 blur-3xl" />
      <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-48 sm:w-72 h-48 sm:h-72 bg-green-400/10 blur-3xl" />

      {/* 🔥 CARD */ }
      <motion.div
        initial={ { opacity: 0, y: 80 } }
        animate={ { opacity: 1, y: 0 } }
        transition={ { duration: 0.6 } }
        className="relative z-10 w-full max-w-sm sm:max-w-md md:max-w-lg"
      >

        {/* Glow Border */ }
        <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-green-500/40 via-transparent to-green-500/20 blur-sm opacity-80" />

        <div className="relative bg-black/70 backdrop-blur-2xl border border-green-500/20 rounded-2xl p-5 sm:p-6 md:p-8
          shadow-[0_0_40px_rgba(34,197,94,0.2)]"
        >

          {/* HEADER */ }
          <div className="text-center mb-6">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-green-400">
              Welcome Back 👋
            </h2>
            <p className="text-gray-400 text-xs sm:text-sm mt-2">
              Login to analyze your GitHub profile
            </p>
          </div>

          {/* FORM */ }
          <form className="space-y-4 sm:space-y-5">

            {/* EMAIL */ }
            <div className="relative">
              <FiMail className="absolute left-3 top-3.5 text-green-400 text-sm sm:text-base" />
              <input
                type="email"
                placeholder="Email"
                className="w-full pl-10 pr-3 py-2.5 sm:py-3 text-sm sm:text-base 
                bg-black/60 border border-green-500/20 rounded-lg 
                focus:border-green-400 focus:ring-1 focus:ring-green-500 
                outline-none"
              />
            </div>

            {/* PASSWORD */ }
            <div className="relative">
              <FiLock className="absolute left-3 top-3.5 text-green-400 text-sm sm:text-base" />

              <input
                type={ showPassword ? "text" : "password" }
                placeholder="Password"
                className="w-full pl-10 pr-10 py-2.5 sm:py-3 text-sm sm:text-base 
                bg-black/60 border border-green-500/20 rounded-lg 
                focus:border-green-400 focus:ring-1 focus:ring-green-500 
                outline-none"
              />

              {/* 👁 Toggle Icon */ }
              <button
                type="button"
                onClick={ () => setShowPassword( !showPassword ) }
                className="absolute right-3 top-3.5 text-green-400 hover:text-green-300 transition"
              >
                { showPassword ? <FiEyeOff /> : <FiEye /> }
              </button>
            </div>

            {/* LOGIN BUTTON */ }
            <motion.button
              whileHover={ { scale: 1.03 } }
              whileTap={ { scale: 0.95 } }
              className="w-full py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-medium 
              bg-gradient-to-r from-green-500 to-green-400 
              text-black shadow-[0_0_20px_rgba(34,197,94,0.4)]
              hover:shadow-[0_0_40px_rgba(34,197,94,0.7)] transition"
            >
              Login 🚀
            </motion.button>

          </form>

          {/* SIGNUP LINK */ }
          <p className="text-center text-gray-400 text-xs sm:text-sm mt-5 sm:mt-6">
            Don’t have an account?{ " " }
            <Link to="/signup" className="text-green-400 hover:underline">
              Sign up
            </Link>
          </p>

        </div>

      </motion.div>
    </div>
  );
};

export default Login;