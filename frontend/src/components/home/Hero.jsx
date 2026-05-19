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

            {/* ===================================== */ }
            {/* 🔥 BACKGROUND */ }
            {/* ===================================== */ }

            {/* RADIAL */ }

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.14),transparent_60%)]" />

            {/* DARK OVERLAY */ }

            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,0.96))]" />

            {/* GRID */ }

            <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#22c55e_1px,transparent_1px),linear-gradient(to_bottom,#22c55e_1px,transparent_1px)] bg-[size:60px_60px]" />

            {/* ===================================== */ }
            {/* 🔥 ORBS */ }
            {/* ===================================== */ }

            <div className="orb1 absolute top-20 left-10 w-80 h-80 bg-green-500/10 blur-3xl rounded-full" />

            <div className="orb2 absolute bottom-20 right-10 w-80 h-80 bg-green-400/10 blur-3xl rounded-full" />

            {/* ===================================== */ }
            {/* 🔥 CONTENT */ }
            {/* ===================================== */ }

            <div className="relative z-10 max-w-5xl w-full">

                {/* ===================================== */ }
                {/* 🔥 BADGE */ }
                {/* ===================================== */ }

                <motion.div
                    initial={ {
                        opacity: 0,
                        y: 20,
                    } }

                    animate={ {
                        opacity: 1,
                        y: 0,
                    } }

                    transition={ {
                        duration: 0.6,
                    } }

                    className="inline-flex items-center gap-2 px-5 py-2 rounded-2xl border border-green-500/20 bg-gradient-to-r from-black via-[#04130c] to-[#052e16]/70 text-green-400 text-sm shadow-[0_0_25px_rgba(34,197,94,0.12)] mb-8"
                >

                    <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_10px_rgba(34,197,94,1)] animate-pulse" />

                    AI Powered Developer Identity Platform

                </motion.div>

                {/* ===================================== */ }
                {/* 🔥 TITLE */ }
                {/* ===================================== */ }

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

                    className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[1.05] tracking-tight"
                >

                    {/* DEVSTACK */ }

                    <span className="bg-gradient-to-r from-green-300 via-green-400 to-green-500 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(34,197,94,0.45)]">

                        DevStack

                    </span>

                    {/* ANALYZER */ }

                    <motion.div
                        initial={ {
                            opacity: 0,
                        } }

                        animate={ {
                            opacity: 1,
                        } }

                        transition={ {
                            delay: 0.5,
                        } }

                        className="text-white flex items-center justify-center gap-3 mt-2"
                    >

                        Analyzer

                        <div className="relative">

                            <div className="absolute inset-0 bg-green-400 blur-xl opacity-50" />

                            <HiSparkles className="relative z-10 text-green-400 text-[32px] drop-shadow-[0_0_15px_rgba(34,197,94,0.9)]" />

                        </div>

                    </motion.div>

                </motion.h1>

                {/* ===================================== */ }
                {/* 🔥 SUBTEXT */ }
                {/* ===================================== */ }

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

                    className="mt-6 text-gray-400 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed flex items-center justify-center gap-2 flex-wrap"
                >

                    <HiSparkles className="text-green-400 text-[18px] drop-shadow-[0_0_10px_rgba(34,197,94,0.8)]" />

                    Analyze GitHub activity, discover your developer personality,
                    visualize engineering strengths, and share your coding identity
                    with futuristic AI-powered insights.

                </motion.p>

                {/* ===================================== */ }
                {/* 🔥 INPUT */ }
                {/* ===================================== */ }

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

                    className="mt-10 w-full"
                >

                    <div className="relative group max-w-3xl mx-auto">

                        {/* OUTER GLOW */ }

                        <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-green-500/40 via-transparent to-green-500/20 blur-sm opacity-70 group-hover:opacity-100 transition duration-500" />

                        {/* CONTAINER */ }

                        <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-gradient-to-r from-black via-[#04130c] to-[#052e16]/60 backdrop-blur-2xl border border-green-500/20 rounded-2xl p-3 shadow-[0_0_40px_rgba(34,197,94,0.12)] group-hover:shadow-[0_0_80px_rgba(34,197,94,0.28)] transition duration-500 transform group-hover:-translate-y-1 group-hover:scale-[1.01] overflow-hidden">

                            {/* INNER GLOW */ }

                            <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-transparent to-transparent pointer-events-none" />

                            {/* ICON */ }

                            <div className="relative flex items-center justify-center">

                                <div className="absolute inset-0 bg-green-500 blur-xl opacity-20 rounded-full" />

                                <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-black via-[#052e16] to-[#22c55e]/30 border border-green-500/20 flex items-center justify-center shadow-[0_0_25px_rgba(34,197,94,0.2)]">

                                    <FaGithub className="text-green-400 text-[22px] drop-shadow-[0_0_10px_rgba(34,197,94,0.8)]" />

                                </div>

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

                                className="flex-1 bg-transparent px-2 py-3 text-sm sm:text-base text-white outline-none placeholder:text-gray-600 focus:placeholder:text-gray-500"
                            />

                            {/* BUTTON */ }

                            <motion.button
                                whileHover={ {
                                    scale: 1.05,
                                    y: -2,
                                } }

                                whileTap={ {
                                    scale: 0.95,
                                } }

                                onClick={
                                    handleAnalyze
                                }

                                className="relative overflow-hidden flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#14532d] via-[#22c55e] to-[#4ade80] text-black font-semibold transition w-full sm:w-auto shadow-[0_0_30px_rgba(34,197,94,0.35)]"
                            >

                                {/* SHINE */ }

                                <motion.div
                                    animate={ {
                                        x: [
                                            "-100%",
                                            "220%",
                                        ],
                                    } }

                                    transition={ {
                                        repeat: Infinity,
                                        duration: 3,
                                        ease: "linear",
                                    } }

                                    className="absolute top-0 left-0 h-full w-16 bg-white/20 blur-md rotate-12"
                                />

                                <span className="relative z-10">

                                    Analyze

                                </span>

                                <FiArrowRight className="relative z-10 text-[18px]" />

                            </motion.button>

                        </div>

                    </div>

                </motion.div>

                {/* ===================================== */ }
                {/* 🔥 STATS */ }
                {/* ===================================== */ }

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

                    className="mt-8 flex items-center justify-center gap-3 flex-wrap"
                >

                    <div className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-black via-[#04130c] to-[#052e16]/60 border border-green-500/10 shadow-[0_0_25px_rgba(34,197,94,0.08)]">

                        <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_10px_rgba(34,197,94,1)] animate-pulse" />

                        <HiSparkles className="text-[16px] text-green-400" />

                        <span className="text-green-400 text-xs sm:text-sm tracking-wide">

                            12,842 developers analyzed today

                        </span>

                    </div>

                </motion.div>

            </div>

        </section>
    );
};

export default Hero;