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

const iconClass = "text-[22px] text-green-400 drop-shadow-[0_0_10px_rgba(34,197,94,0.7)]";

const features = [
    {
        title: "GitHub Analyzer",
        desc: "Deep analysis of repos, languages, commits & stars",
        icon: <FaGithub className={ iconClass } />,
    },
    {
        title: "Language Insights",
        desc: "Visual breakdown of your most used technologies",
        icon: <FaChartBar className={ iconClass } />,
    },
    {
        title: "Dev Personality",
        desc: "Know your coding behavior and patterns",
        icon: <FaUserAstronaut className={ iconClass } />,
    },
    {
        title: "Repo Intelligence",
        desc: "Understand your project patterns & growth",
        icon: <FaCodeBranch className={ iconClass } />,
    },
    {
        title: "Activity Tracking",
        desc: "Track commits, pushes & contributions over time",
        icon: <FiTrendingUp className={ iconClass } />,
    },
    {
        title: "Viral Dev Cards",
        desc: "Generate beautiful shareable LinkedIn cards",
        icon: <FaShareAlt className={ iconClass } />,
    },
    {
        title: "Performance Score",
        desc: "Get a developer score based on activity & impact",
        icon: <FaFire className={ iconClass } />,
    },
    {
        title: "Smart Insights",
        desc: "AI-powered suggestions to improve your profile",
        icon: <HiSparkles className={ iconClass } />,
    },
    {
        title: "Real-time Analysis",
        desc: "Instant GitHub data processing & visualization",
        icon: <HiOutlineLightningBolt className={ iconClass } />,
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
                    end: "+=800",
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
            className="features-section min-h-screen w-full flex flex-col justify-center px-4 sm:px-6 bg-black text-white relative overflow-hidden py-2"
        >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.12),transparent_60%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,0.95))]" />

            <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/10 blur-3xl" />
            <div className="absolute bottom-20 right-10 w-72 h-72 bg-green-400/10 blur-3xl" />

            <motion.h2
                initial={ { opacity: 0, y: -40 } }
                whileInView={ { opacity: 1, y: 0 } }
                transition={ { duration: 0.8 } }
                className="text-3xl md:text-5xl font-bold text-center mb-14 z-10 flex items-center justify-center gap-2"
            >
                <span className="text-green-400 drop-shadow-[0_0_20px_rgba(34,197,94,0.8)]">
                    Powerful Features
                </span>
                <HiSparkles className="text-green-400 text-[28px]" />
            </motion.h2>

            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto w-full z-10">

                { features.map( ( f, i ) => (
                    <motion.div
                        key={ i }
                        whileHover={ { scale: 1.05 } }
                        transition={ { type: "spring", stiffness: 200 } }
                        className="feature-card group relative"
                    >
                        <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-green-500/30 via-transparent to-green-500/20 blur-sm opacity-70 group-hover:opacity-100 transition" />

                        <div className="relative h-full bg-black/60 backdrop-blur-xl rounded-2xl p-6 border border-green-500/10
              shadow-[0_0_30px_rgba(34,197,94,0.15)]
              group-hover:shadow-[0_0_80px_rgba(34,197,94,0.35)]
              transition duration-500"
                        >
                            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-40" />

                            <div className="mb-4">
                                { f.icon }
                            </div>

                            <h3 className="text-lg font-semibold mb-2 text-green-300">
                                { f.title }
                            </h3>

                            <p className="text-gray-500 text-sm leading-relaxed">
                                { f.desc }
                            </p>

                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-green-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition" />
                        </div>
                    </motion.div>
                ) ) }

            </div>
        </section>
    );
};

export default Features;