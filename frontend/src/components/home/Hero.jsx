import React, {
    useEffect,
    useState,
} from "react";

import { motion } from "framer-motion";

import { FaGithub } from "react-icons/fa";

import { FiArrowRight } from "react-icons/fi";

import { HiSparkles } from "react-icons/hi";

import { gsap } from "gsap";

import { useNavigate } from "react-router-dom";

const Hero = () => {

    const navigate = useNavigate();

    // =====================================
    // 🔥 USERNAME STATE
    // =====================================

    const [ githubUsername,
        setGithubUsername ] =
        useState( "" );

    // =====================================
    // 🔥 GSAP
    // =====================================

    useEffect( () => {

        gsap.to( ".orb1", {
            y: 40,
            duration: 6,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
        } );

        gsap.to( ".orb2", {
            y: -40,
            duration: 7,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
        } );

    }, [] );

    // =====================================
    // 🔥 HANDLE ANALYZE
    // =====================================

    const handleAnalyze = () => {

        if ( !githubUsername.trim() )
            return;

        navigate(
            `/dashboard?github_username=${githubUsername.toLowerCase().trim()}`
        );
    };

    // =====================================
    // 🔥 JSX
    // =====================================

    return (
        <section className="min-h-screen flex flex-col justify-center items-center text-center px-4 sm:px-6 bg-black text-white relative overflow-hidden">

            {/* BACKGROUND */ }
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.15),transparent_60%)]" />

            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,0.95))]" />

            {/* ORBS */ }
            <div className="orb1 absolute top-20 left-10 w-72 h-72 bg-green-500/10 blur-3xl" />

            <div className="orb2 absolute bottom-20 right-10 w-72 h-72 bg-green-400/10 blur-3xl" />

            {/* CONTENT */ }
            <div className="relative z-10 max-w-4xl w-full">

                {/* TITLE */ }
                <motion.h1
                    initial={ {
                        opacity: 0,
                        y: 80,
                    } }
                    animate={ {
                        opacity: 1,
                        y: 0,
                    } }
                    transition={ {
                        duration: 0.8,
                    } }
                    className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight"
                >

                    <span className="text-green-400 drop-shadow-[0_0_20px_rgba(34,197,94,0.8)]">

                        DevStack

                    </span>

                    { " " }

                    <motion.span
                        initial={ {
                            opacity: 0,
                        } }
                        animate={ {
                            opacity: 1,
                        } }
                        transition={ {
                            delay: 0.5,
                        } }
                        className="text-white flex items-center justify-center gap-2"
                    >

                        Analyzer

                        <HiSparkles className="text-green-400 text-[28px]" />

                    </motion.span>

                </motion.h1>

                {/* SUBTEXT */ }
                <motion.p
                    initial={ {
                        opacity: 0,
                        y: 40,
                    } }
                    animate={ {
                        opacity: 1,
                        y: 0,
                    } }
                    transition={ {
                        delay: 0.3,
                    } }
                    className="mt-5 sm:mt-6 text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto flex items-center justify-center gap-2 flex-wrap"
                >

                    <HiSparkles className="text-green-400 text-[18px]" />

                    Analyze GitHub. Discover your dev personality. Share your identity.

                </motion.p>

                {/* INPUT */ }
                <motion.div
                    initial={ {
                        opacity: 0,
                        scale: 0.9,
                        y: 50,
                    } }
                    animate={ {
                        opacity: 1,
                        scale: 1,
                        y: 0,
                    } }
                    transition={ {
                        delay: 0.5,
                    } }
                    className="mt-8 sm:mt-10 w-full"
                >

                    <div className="relative group max-w-2xl mx-auto">

                        {/* GLOW */ }
                        <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-green-500/40 via-transparent to-green-500/20 blur-sm opacity-70 group-hover:opacity-100 transition" />

                        {/* INPUT CONTAINER */ }
                        <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-black/70 backdrop-blur-xl border border-green-500/20 rounded-xl p-3 shadow-[0_0_40px_rgba(34,197,94,0.15)] group-hover:shadow-[0_0_80px_rgba(34,197,94,0.35)] transition duration-500 transform group-hover:-translate-y-1 group-hover:scale-[1.01]">

                            {/* ICON */ }
                            <div className="text-green-400 text-[20px] px-2 flex items-center justify-center">

                                <FaGithub />

                            </div>

                            {/* INPUT */ }
                            <input
                                type="text"

                                value={
                                    githubUsername
                                }

                                onChange={ ( e ) =>
                                    setGithubUsername(
                                        e.target.value
                                    )
                                }

                                onKeyDown={ ( e ) => {

                                    if (
                                        e.key ===
                                        "Enter"
                                    ) {
                                        handleAnalyze();
                                    }

                                } }

                                placeholder="Enter GitHub username..."

                                className="flex-1 bg-transparent px-2 py-2 text-sm sm:text-base outline-none placeholder:text-gray-600 focus:placeholder:text-gray-400"
                            />

                            {/* BUTTON */ }
                            <motion.button
                                whileHover={ {
                                    scale: 1.05,
                                } }

                                whileTap={ {
                                    scale: 0.95,
                                } }

                                onClick={
                                    handleAnalyze
                                }

                                className="flex items-center justify-center gap-2 px-5 py-2.5 bg-green-500 hover:bg-green-600 rounded-lg font-medium transition w-full sm:w-auto shadow-[0_0_20px_rgba(34,197,94,0.35)]"
                            >

                                Analyze

                                <FiArrowRight className="text-[18px]" />

                            </motion.button>

                        </div>

                    </div>

                </motion.div>

                {/* STATS */ }
                <motion.div
                    initial={ {
                        opacity: 0,
                    } }
                    animate={ {
                        opacity: 1,
                    } }
                    transition={ {
                        delay: 0.8,
                    } }
                    className="mt-6 flex items-center justify-center gap-2 text-green-400 text-xs sm:text-sm flex-wrap"
                >

                    <HiSparkles className="text-[16px]" />

                    <span>
                        12,842 developers analyzed today
                    </span>

                </motion.div>

            </div>

        </section>
    );
};

export default Hero;