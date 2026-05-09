import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { login } from "../store/slices/user.slice";


const Login = () => {
  const [ showPassword, setShowPassword ] = useState( false );

  const [ formData, setFormData ] = useState( {
    email: "",
    password: "",
  } );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData( {
      ...formData,
      [ e.target.name ]: e.target.value,
    } );
  };

  const handleSubmit = async ( e ) => {
    e.preventDefault();

    try {
      toast.loading( "Logging in..." );
      dispatch( login( formData, navigate ) )
    } catch ( err ) {
      toast.dismiss();
      toast.error( err.message );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4 relative overflow-hidden">

      {/* Background */ }
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.15),transparent_60%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,0.95))]" />

      {/* Glow Orbs */ }
      <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/10 blur-3xl" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-green-400/10 blur-3xl" />

      <motion.div
        initial={ { opacity: 0, y: 80 } }
        animate={ { opacity: 1, y: 0 } }
        transition={ { duration: 0.6 } }
        className="relative z-10 w-full max-w-md"
      >

        {/* Glow Border */ }
        <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-green-500/40 via-transparent to-green-500/20 blur-sm opacity-80" />

        <div className="relative bg-black/70 backdrop-blur-2xl border border-green-500/20 rounded-2xl p-6 shadow-[0_0_40px_rgba(34,197,94,0.2)]">

          {/* Header */ }
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-green-400">
              Welcome Back 👋
            </h2>
            <p className="text-gray-400 text-sm mt-2">
              Login to analyze your GitHub profile
            </p>
          </div>

          {/* FORM */ }
          <form onSubmit={ handleSubmit } className="space-y-5">

            {/* EMAIL */ }
            <div className="relative">
              <FiMail className="absolute left-3 top-3.5 text-green-400" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={ handleChange }
                value={ formData.email }
                required
                className="w-full pl-10 pr-3 py-3 bg-black/60 border border-green-500/20 rounded-lg focus:border-green-400 outline-none"
              />
            </div>

            {/* PASSWORD */ }
            <div className="relative">
              <FiLock className="absolute left-3 top-3.5 text-green-400" />

              <input
                type={ showPassword ? "text" : "password" }
                name="password"
                placeholder="Password"
                onChange={ handleChange }
                value={ formData.password }
                required
                className="w-full pl-10 pr-10 py-3 bg-black/60 border border-green-500/20 rounded-lg focus:border-green-400 outline-none"
              />

              <button
                type="button"
                onClick={ () => setShowPassword( !showPassword ) }
                className="absolute right-3 top-3.5 text-green-400"
              >
                { showPassword ? <FiEyeOff /> : <FiEye /> }
              </button>
            </div>

            {/* BUTTON */ }
            <motion.button
              type="submit"
              whileHover={ { scale: 1.03 } }
              whileTap={ { scale: 0.95 } }
              className="w-full py-3 rounded-lg font-medium bg-gradient-to-r from-green-500 to-green-400 text-black shadow-[0_0_20px_rgba(34,197,94,0.4)]"
            >
              Login 🚀
            </motion.button>

          </form>

          {/* SIGNUP LINK */ }
          <p className="text-center text-gray-400 text-sm mt-6">
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