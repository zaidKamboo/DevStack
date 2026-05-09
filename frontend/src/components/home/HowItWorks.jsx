import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
    FaGithub,
    FaChartLine,
    FaShareAlt,
    FaUserCheck,
    FaRocket,
    FaBrain,
} from "react-icons/fa";

gsap.registerPlugin( ScrollTrigger );

const iconClass =
    "text-[22px] text-green-400 drop-shadow-[0_0_12px_rgba(34,197,94,0.7)]";

const steps = [
    {
        title: "Enter GitHub Username",
        desc: "Paste your GitHub username and let DevStack fetch your public data instantly.",
        icon: <FaGithub className={ iconClass } />,
    },
    {
        title: "Fetch Repositories",
        desc: "We securely collect your repositories, commits, stars, and contribution data.",
        icon: <FaUserCheck className={ iconClass } />,
    },
    {
        title: "AI-Powered Analysis",
        desc: "Advanced algorithms analyze your coding patterns, languages, and activity.",
        icon: <FaBrain className={ iconClass } />,
    },
    {
        title: "Generate Insights",
        desc: "We calculate performance score, trends, and developer strengths.",
        icon: <FaChartLine className={ iconClass } />,
    },
    {
        title: "Create Dev Card",
        desc: "A beautiful, shareable developer report is generated instantly.",
        icon: <FaRocket className={ iconClass } />,
    },
    {
        title: "Share Results",
        desc: "Publish your developer report and showcase your profile.",
        icon: <FaShareAlt className={ iconClass } />,
    },
];

const HowItWorks = () => {
    const sectionRef = useRef( null );

    useEffect( () => {
        const ctx = gsap.context( () => {
            const tl = gsap.timeline( {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=1000",
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1,
                },
            } );

            tl.from( ".step-card", {
                opacity: 0,
                y: 100,
                scale: 0.95,
                stagger: 0.18,
                ease: "power2.out",
            } );
        }, sectionRef );

        return () => ctx.revert();
    }, [] );

    return (
        <section
            ref={ sectionRef }
            className="min-h-screen flex flex-col justify-center px-4 sm:px-6 bg-black text-white relative overflow-hidden"
        >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.12),transparent_60%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,0.95))]" />

            <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/10 blur-3xl" />
            <div className="absolute bottom-20 right-10 w-72 h-72 bg-green-400/10 blur-3xl" />

            <motion.h2
                initial={ { opacity: 0, y: -40 } }
                whileInView={ { opacity: 1, y: 0 } }
                transition={ { duration: 0.8 } }
                className="text-3xl md:text-5xl font-bold text-center mb-16 z-10 flex items-center justify-center gap-2"
            >
                <span className="text-green-400 drop-shadow-[0_0_20px_rgba(34,197,94,0.8)]">
                    How It Works
                </span>
                <FaChartLine className="text-green-400 text-[26px]" />
            </motion.h2>

            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto w-full z-10">

                { steps.map( ( step, i ) => (
                    <motion.div
                        key={ i }
                        whileHover={ { scale: 1.04 } }
                        transition={ { type: "spring", stiffness: 200 } }
                        className="step-card group relative"
                    >
                        <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-green-500/25 via-transparent to-green-500/20 blur-sm opacity-70 group-hover:opacity-100 transition" />

                        <div className="relative h-full bg-black/60 backdrop-blur-xl rounded-2xl p-6 border border-green-500/10
              shadow-[0_0_25px_rgba(34,197,94,0.15)]
              group-hover:shadow-[0_0_70px_rgba(34,197,94,0.3)]
              transition duration-500"
                        >
                            <div className="text-[10px] text-gray-600 mb-3 tracking-[0.2em]">
                                STEP { i + 1 }
                            </div>

                            <div className="mb-4">
                                { step.icon }
                            </div>

                            <h3 className="text-base font-semibold mb-2 text-green-300">
                                { step.title }
                            </h3>

                            <p className="text-gray-500 text-sm leading-relaxed">
                                { step.desc }
                            </p>

                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-green-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition" />
                        </div>
                    </motion.div>
                ) ) }

            </div>
        </section>
    );
};

export default HowItWorks;