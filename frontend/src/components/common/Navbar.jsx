import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FaCode,
    FaHome,
    FaLayerGroup,
    FaRocket,
} from "react-icons/fa";
import {
    FiMenu,
    FiX,
    FiLogIn,
    FiUserPlus,
} from "react-icons/fi";

import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const [ open, setOpen ] = useState( false );
    const [ show, setShow ] = useState( true );
    const lastScrollY = useRef( 0 );
    const navigate = useNavigate();

    const links = [
        { name: "Home", icon: <FaHome />, path: "/" },
        { name: "Features", icon: <FaLayerGroup />, path: "/features" },
        { name: "Analyze", icon: <FaRocket />, path: "/" },
    ];

    // 🔥 Scroll Logic
    useEffect( () => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if ( currentScrollY < 50 ) {
                setShow( true );
            } else if ( currentScrollY > lastScrollY.current ) {
                setShow( false );
            } else {
                setShow( true );
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener( "scroll", handleScroll );
        return () => window.removeEventListener( "scroll", handleScroll );
    }, [] );

    return (
        <>
            {/* 🔥 NAVBAR */ }
            <motion.nav
                initial={ { y: 0 } }
                animate={ { y: show ? 0 : -100 } }
                transition={ { duration: 0.3 } }
                className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-black/40 border-b border-green-500/10"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">

                    {/* LOGO */ }
                    <Link to="/" className="flex items-center gap-2 text-green-400 font-bold text-lg">
                        <FaCode />
                        DevStack
                    </Link>

                    {/* 🧠 DESKTOP LINKS */ }
                    <div className="hidden md:flex items-center gap-8">
                        { links.map( ( link, i ) => (
                            <Link key={ i } to={ link.path }>
                                <motion.div
                                    whileHover={ { scale: 1.05 } }
                                    className="group flex items-center gap-2 relative cursor-pointer text-gray-300 hover:text-green-400 transition"
                                >
                                    { link.icon }
                                    { link.name }

                                    <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-green-400 transition-all duration-300 group-hover:w-full"></span>
                                </motion.div>
                            </Link>
                        ) ) }
                    </div>

                    {/* 🔥 CTA BUTTONS */ }
                    <div className="hidden md:flex items-center gap-4">

                        {/* LOGIN */ }
                        <motion.button
                            whileHover={ { scale: 1.05 } }
                            onClick={ () => navigate( "/login" ) }
                            className="flex items-center gap-2 px-4 py-2 rounded-lg 
              text-gray-300 hover:text-green-400 transition 
              border border-green-500/20 hover:border-green-400/40"
                        >
                            <FiLogIn className="text-green-400" />
                            Login
                        </motion.button>

                        {/* SIGNUP */ }
                        <motion.button
                            whileHover={ { scale: 1.05 } }
                            onClick={ () => navigate( "/signup" ) }
                            className="flex items-center gap-2 px-5 py-2 rounded-lg 
              bg-gradient-to-r from-green-500 to-green-400 
              hover:from-green-400 hover:to-green-500 
              text-black font-medium 
              shadow-[0_0_20px_rgba(34,197,94,0.4)]"
                        >
                            <FiUserPlus />
                            Sign Up
                        </motion.button>

                    </div>

                    {/* 📱 MOBILE MENU BUTTON */ }
                    <div className="md:hidden text-2xl text-green-400">
                        <button onClick={ () => setOpen( !open ) }>
                            { open ? <FiX /> : <FiMenu /> }
                        </button>
                    </div>

                </div>
            </motion.nav>

            {/* 📱 MOBILE MENU */ }
            <AnimatePresence>
                { open && (
                    <motion.div
                        initial={ { opacity: 0, y: -20 } }
                        animate={ { opacity: 1, y: 0 } }
                        exit={ { opacity: 0, y: -20 } }
                        className="md:hidden fixed top-[70px] left-0 w-full 
            bg-black/90 backdrop-blur-xl border-t border-green-500/10 z-40"
                    >
                        <div className="flex flex-col items-center gap-6 py-6">

                            { links.map( ( link, i ) => (
                                <Link
                                    key={ i }
                                    to={ link.path }
                                    onClick={ () => setOpen( false ) }
                                    className="flex items-center gap-2 text-gray-300 hover:text-green-400 transition"
                                >
                                    { link.icon }
                                    { link.name }
                                </Link>
                            ) ) }

                            {/* LOGIN */ }
                            <button
                                onClick={ () => {
                                    navigate( "/login" );
                                    setOpen( false );
                                } }
                                className="flex items-center gap-2 text-gray-300 hover:text-green-400"
                            >
                                <FiLogIn className="text-green-400" />
                                Login
                            </button>

                            {/* SIGNUP */ }
                            <button
                                onClick={ () => {
                                    navigate( "/signup" );
                                    setOpen( false );
                                } }
                                className="flex items-center gap-2 px-6 py-2 
                bg-gradient-to-r from-green-500 to-green-400 
                rounded-lg text-black font-medium"
                            >
                                <FiUserPlus />
                                Sign Up
                            </button>

                        </div>
                    </motion.div>
                ) }
            </AnimatePresence>
        </>
    );
};

export default Navbar;