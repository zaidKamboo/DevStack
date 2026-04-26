import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
    FaGithub,
    FaChartBar,
    FaShareAlt,
    FaUserAstronaut,
    FaCodeBranch,
    FaFire,
} from "react-icons/fa";
import {
    HiSparkles,
    HiOutlineLightningBolt,
} from "react-icons/hi";
import { FiTrendingUp } from "react-icons/fi";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin( ScrollTrigger );

const features = [
    {
        title: "GitHub Analyzer",
        desc: "Deep analysis of repos, languages, commits & stars",
        icon: <FaGithub />,
    },
    {
        title: "Language Insights",
        desc: "Visual breakdown of your most used technologies",
        icon: <FaChartBar />,
    },
    {
        title: "Dev Personality",
        desc: "Know if you're a Bug Slayer 🐛 or Night Hacker 🌙",
        icon: <FaUserAstronaut />,
    },
    {
        title: "Repo Intelligence",
        desc: "Understand your project patterns & growth",
        icon: <FaCodeBranch />,
    },
    {
        title: "Activity Tracking",
        desc: "Track commits, pushes & contributions over time",
        icon: <FiTrendingUp />,
    },
    {
        title: "Viral Dev Cards",
        desc: "Generate beautiful shareable LinkedIn cards",
        icon: <FaShareAlt />,
    },
    {
        title: "Performance Score",
        desc: "Get a developer score based on activity & impact",
        icon: <FaFire />,
    },
    {
        title: "Smart Insights",
        desc: "AI-powered suggestions to improve your profile",
        icon: <HiSparkles />,
    },
    {
        title: "Real-time Analysis",
        desc: "Instant GitHub data processing & visualization",
        icon: <HiOutlineLightningBolt />,
    },
];

const Features = () => {
    const sectionRef = useRef( null );

    useEffect( () => {
        const ctx = gsap.context( () => {

            const tl = gsap.timeline( {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=800", // 👈 scroll distance (adjust)
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1,
                },
            } );

            tl.from( ".feature-card", {
                opacity: 0,
                y: 120,
                scale: 0.9,
                stagger: 0.2,
                ease: "power2.out",
            } );

        }, sectionRef );

        return () => ctx.revert();
    }, [] );

    return (
        <section
            ref={ sectionRef }
            className="features-section min-h-screen w-full flex flex-col justify-center px-4 sm:px-6 bg-black text-white relative overflow-hidden pt-10 pb-10"
        >

            {/* Background */ }
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.12),transparent_60%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,0.95))]" />

            {/* Glow Orbs */ }
            <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/10 blur-3xl" />
            <div className="absolute bottom-20 right-10 w-72 h-72 bg-green-400/10 blur-3xl" />

            {/* Heading */ }
            <motion.h2
                initial={ { opacity: 0, y: -40 } }
                whileInView={ { opacity: 1, y: 0 } }
                transition={ { duration: 0.8 } }
                className="text-3xl md:text-5xl font-bold text-center mb-14 z-10"
            >
                <span className="text-green-400 drop-shadow-[0_0_20px_rgba(34,197,94,0.8)]">
                    Powerful Features ⚡
                </span>
            </motion.h2>

            {/* Grid */ }
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto w-full z-10">

                { features.map( ( f, i ) => (
                    <motion.div
                        key={ i }
                        whileHover={ { scale: 1.05, rotate: 0.5 } }
                        transition={ { type: "spring", stiffness: 200 } }
                        className="feature-card group relative will-change-transform"
                    >

                        {/* Glow Border */ }
                        <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-green-500/30 via-transparent to-green-500/20 blur-sm opacity-70 group-hover:opacity-100 transition" />

                        {/* Card */ }
                        <div className="relative h-full bg-black/60 backdrop-blur-xl rounded-2xl p-6 border border-green-500/10
              shadow-[0_0_30px_rgba(34,197,94,0.15)]
              group-hover:shadow-[0_0_80px_rgba(34,197,94,0.35)]
              transition duration-500
              transform group-hover:-translate-y-2 group-hover:scale-[1.02]"
                        >

                            {/* Top Line */ }
                            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-40" />

                            {/* Icon */ }
                            <div className="text-2xl text-green-400 mb-4
                drop-shadow-[0_0_10px_rgba(34,197,94,0.7)]">
                                { f.icon }
                            </div>

                            {/* Title */ }
                            <h3 className="text-lg font-semibold mb-2 text-green-300">
                                { f.title }
                            </h3>

                            {/* Desc */ }
                            <p className="text-gray-500 text-sm leading-relaxed">
                                { f.desc }
                            </p>

                            {/* Glow Orb */ }
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-green-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition" />

                        </div>
                    </motion.div>
                ) ) }

            </div>
        </section>
    );
};

export default Features;