import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
    HiOutlineLightningBolt,
    HiOutlineChartBar,
    HiOutlineSparkles,
} from "react-icons/hi";

import {
    FaCodeBranch,
    FaTrophy,
    FaUsers,
} from "react-icons/fa";
import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";

gsap.registerPlugin( ScrollTrigger );

const slides = [
    {
        text: "Your GitHub. Reimagined.",
        icon: <HiOutlineChartBar />,
    },
    {
        text: "Turn Data Into Identity.",
        icon: <HiOutlineSparkles />,
    },
    {
        text: "Analyze Faster. Shine Smarter.",
        icon: <HiOutlineLightningBolt />,
    },
];

const features = [
    {
        icon: <HiOutlineChartBar />,
        title: "Deep Analytics",
        desc: "Understand commits, languages & repo insights visually.",
    },
    {
        icon: <HiOutlineSparkles />,
        title: "AI Personality",
        desc: "Get your developer identity powered by smart analysis.",
    },
    {
        icon: <HiOutlineLightningBolt />,
        title: "Instant Reports",
        desc: "Generate shareable dev cards instantly.",
    },
    {
        icon: <FaCodeBranch />,
        title: "Project Insights",
        desc: "Analyze code structure & contribution patterns.",
    },
    {
        icon: <FaTrophy />,
        title: "Leaderboard",
        desc: "Compete with developers globally.",
    },
    {
        icon: <FaUsers />,
        title: "Compare Devs",
        desc: "Side-by-side GitHub comparison.",
    },
];

const FeaturesPage = () => {
    const containerRef = useRef( null );

    useEffect( () => {
        const ctx = gsap.context( () => {

            // 🔥 Horizontal Scroll
            gsap.to( ".horizontal-track", {
                xPercent: -200,
                ease: "none",
                scrollTrigger: {
                    trigger: ".horizontal-section",
                    start: "top top",
                    end: "+=3000",
                    scrub: 1,
                    pin: true,
                },
            } );

            // 🔥 Card Animation
            gsap.utils.toArray( ".feature-card" ).forEach( ( card ) => {
                gsap.from( card, {
                    opacity: 0,
                    y: 80,
                    duration: 0.6,
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                    },
                } );
            } );

        }, containerRef );

        return () => ctx.revert();
    }, [] );

    return (
        <div ref={ containerRef } className="bg-black text-white overflow-hidden">
            <Navbar />
            {/* 🔥 HERO */ }
            <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 relative overflow-hidden">

                {/* 🔥 Animated Background */ }
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.2),transparent_60%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,0.95))]" />

                {/* 🔥 Floating Glow Orbs */ }
                <div className="orb1 absolute top-20 left-10 w-72 h-72 bg-green-500/10 blur-3xl" />
                <div className="orb2 absolute bottom-20 right-10 w-72 h-72 bg-green-400/10 blur-3xl" />

                {/* 🔥 CONTENT */ }
                <div className="relative z-10">

                    {/* ICON */ }
                    <motion.div
                        initial={ { opacity: 0, scale: 0.5 } }
                        animate={ { opacity: 1, scale: 1 } }
                        transition={ { duration: 0.6 } }
                        className="text-green-400 text-5xl mb-6 drop-shadow-[0_0_20px_rgba(34,197,94,0.8)]"
                    >
                        <HiOutlineLightningBolt />
                    </motion.div>

                    {/* HEADING */ }
                    <motion.h1
                        initial={ { opacity: 0, y: 80 } }
                        animate={ { opacity: 1, y: 0 } }
                        transition={ { duration: 0.8 } }
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold leading-tight"
                    >
                        <span className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(34,197,94,0.6)]">
                            DevStack
                        </span>
                        <br />
                        <span className="text-white">
                            Features ⚡
                        </span>
                    </motion.h1>

                    {/* SUBTEXT */ }
                    <motion.p
                        initial={ { opacity: 0, y: 40 } }
                        animate={ { opacity: 1, y: 0 } }
                        transition={ { delay: 0.3 } }
                        className="mt-6 text-gray-400 max-w-xl text-sm sm:text-base"
                    >
                        Analyze. Visualize. Showcase your developer identity like never before.
                    </motion.p>

                    {/* CTA BUTTON */ }
                    <motion.div
                        initial={ { opacity: 0, scale: 0.8 } }
                        animate={ { opacity: 1, scale: 1 } }
                        transition={ { delay: 0.5 } }
                        className="mt-10 relative group inline-block"
                    >
                        <div className="absolute -inset-[2px] rounded-xl bg-gradient-to-r from-green-500 via-green-400 to-green-500 blur-md opacity-70 group-hover:opacity-100 transition" />

                        <button className="relative px-8 py-3 bg-black border border-green-500/30 rounded-xl text-green-400 font-semibold
        shadow-[0_0_30px_rgba(34,197,94,0.3)]
        group-hover:shadow-[0_0_80px_rgba(34,197,94,0.8)]
        transition flex items-center gap-2"
                        >
                            Explore Features ⚡
                        </button>
                    </motion.div>

                </div>
            </section>

            {/* 🔥 HORIZONTAL SCROLL */ }
            <section className="horizontal-section h-screen overflow-hidden">

                <div className="horizontal-track flex h-full w-[300%]">

                    { slides.map( ( slide, idx ) => (
                        <div key={ idx } className="w-full flex flex-col items-center justify-center text-center px-6 relative">

                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.15),transparent_70%)]" />

                            <div className="text-green-400 text-5xl sm:text-6xl md:text-7xl mb-6 
                drop-shadow-[0_0_20px_rgba(34,197,94,0.8)]">
                                { slide.icon }
                            </div>

                            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 
                font-extrabold leading-tight
                bg-gradient-to-r from-green-400 via-green-500 to-green-600
                bg-clip-text text-transparent
                drop-shadow-[0_0_30px_rgba(34,197,94,0.6)]
                max-w-5xl">
                                { slide.text }
                            </h2>

                            <p className="mt-6 text-gray-400 max-w-xl text-sm sm:text-base">
                                Experience next-level GitHub insights with DevStack 🚀
                            </p>

                        </div>
                    ) ) }
                </div>
            </section>

            {/* 🔥 FEATURES GRID */ }
            <section className="py-20 px-6 max-w-7xl mx-auto">

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

                    { features.map( ( f, i ) => (
                        <motion.div
                            key={ i }
                            whileHover={ { scale: 1.05 } }
                            className="feature-card group relative rounded-2xl p-[1px] 
              bg-gradient-to-br from-green-500/40 via-transparent to-green-500/10"
                        >

                            <div className="absolute -inset-[1px] rounded-2xl bg-green-500/10 blur-md opacity-0 group-hover:opacity-100 transition" />

                            <div className="relative bg-black/70 backdrop-blur-2xl rounded-2xl p-6 
                border border-green-500/20
                shadow-[0_0_25px_rgba(34,197,94,0.1)]
                group-hover:shadow-[0_0_80px_rgba(34,197,94,0.35)]
                transform group-hover:-translate-y-2 transition"
                            >

                                <div className="text-green-400 text-3xl mb-4 
                  drop-shadow-[0_0_10px_rgba(34,197,94,0.8)]">
                                    { f.icon }
                                </div>

                                <h3 className="text-xl font-semibold mb-2 text-green-400">
                                    { f.title }
                                </h3>

                                <p className="text-gray-400 text-sm">
                                    { f.desc }
                                </p>

                                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-green-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition" />

                            </div>
                        </motion.div>
                    ) ) }

                </div>
            </section>

            {/* 🔥 CTA SECTION */ }
            <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 relative overflow-hidden">

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.15),transparent_70%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,0.95))]" />

                <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/10 blur-3xl" />
                <div className="absolute bottom-20 right-10 w-72 h-72 bg-green-400/10 blur-3xl" />

                <motion.h2
                    initial={ { opacity: 0, y: 60 } }
                    whileInView={ { opacity: 1, y: 0 } }
                    className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
                >
                    <span className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 bg-clip-text text-transparent">
                        Ready to Explore?
                    </span>
                </motion.h2>

                <p className="text-gray-400 max-w-xl mb-10">
                    Analyze your GitHub, discover your identity and showcase your dev journey 🚀
                </p>

                <motion.div whileHover={ { scale: 1.05 } } whileTap={ { scale: 0.95 } } className="relative group">

                    <div className="absolute -inset-[2px] rounded-xl bg-gradient-to-r from-green-500 via-green-400 to-green-500 blur-md opacity-70 group-hover:opacity-100 transition" />

                    <button className="relative px-10 py-4 bg-black border border-green-500/30 rounded-xl text-green-400 font-semibold
            shadow-[0_0_30px_rgba(34,197,94,0.3)]
            group-hover:shadow-[0_0_80px_rgba(34,197,94,0.8)]
            transition flex items-center gap-3"
                    >
                        Analyze Now ⚡
                    </button>

                </motion.div>

            </section>
            <Footer />
        </div>
    );
};

export default FeaturesPage;