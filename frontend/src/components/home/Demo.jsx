import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
    FaCode,
    FaStar,
    FaProjectDiagram,
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { FiTrendingUp } from "react-icons/fi";

gsap.registerPlugin( ScrollTrigger );

const stats = [
    { icon: <FaCode />, label: "Primary", value: "JavaScript" },
    { icon: <FaProjectDiagram />, label: "Repos", value: "42" },
    { icon: <FaStar />, label: "Stars", value: "128" },
    { icon: <FiTrendingUp />, label: "Activity", value: "High" },
    { icon: <HiSparkles />, label: "Score", value: "8.5/10" },
];

const Demo = () => {
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

            // 🔥 Card enters
            tl.from( ".demo-card", {
                opacity: 0,
                y: 120,
                scale: 0.9,
                duration: 1,
                ease: "power2.out",
            } );

            // 🔥 Stats stagger
            tl.from( ".stat-item", {
                opacity: 0,
                y: 50,
                stagger: 0.15,
                duration: 0.6,
            } );

            // 🔥 Personality reveal
            tl.from( ".personality", {
                opacity: 0,
                scale: 0.8,
                duration: 0.6,
            } );

        }, sectionRef );

        return () => ctx.revert();
    }, [] );

    return (
        <section
            ref={ sectionRef }
            className="min-h-screen flex flex-col justify-center items-center px-4 bg-black text-white relative overflow-hidden py-10"
        >

            {/* Background */ }
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.15),transparent_60%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,0.95))]" />

            {/* Glow Orbs */ }
            <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/10 blur-3xl" />
            <div className="absolute bottom-20 right-10 w-72 h-72 bg-green-400/10 blur-3xl" />

            {/* Heading */ }
            <motion.h2
                initial={ { opacity: 0, y: -40 } }
                whileInView={ { opacity: 1, y: 0 } }
                transition={ { duration: 0.8 } }
                className="text-4xl md:text-5xl font-bold mb-12 text-center z-10"
            >
                <span className="text-green-400 drop-shadow-[0_0_20px_rgba(34,197,94,0.8)]">
                    Your Dev Report 📊
                </span>
            </motion.h2>

            {/* CARD */ }
            <div className="demo-card relative z-10 group w-full max-w-3xl">

                {/* Glow Border */ }
                <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-green-500/40 via-transparent to-green-500/20 blur-sm opacity-70 group-hover:opacity-100 transition" />

                <div className="relative bg-black/70 backdrop-blur-2xl border border-green-500/20 rounded-2xl p-6 md:p-8
          shadow-[0_0_40px_rgba(34,197,94,0.2)]
          group-hover:shadow-[0_0_100px_rgba(34,197,94,0.4)]
          transition duration-500
          transform group-hover:-translate-y-2 group-hover:scale-[1.01]"
                >

                    {/* HEADER */ }
                    <div className="flex items-center gap-4 border-b border-green-500/20 pb-5 mb-6">

                        <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 font-bold text-lg shadow-[0_0_20px_rgba(34,197,94,0.5)]">
                            R
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold">Rahul</h3>
                            <p className="text-gray-500 text-sm">@rahul-dev</p>
                        </div>

                    </div>

                    {/* STATS */ }
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-5">

                        { stats.map( ( item, i ) => (
                            <div
                                key={ i }
                                className="stat-item p-4 rounded-xl bg-black/40 border border-green-500/10
                shadow-[inset_0_0_20px_rgba(34,197,94,0.05)]"
                            >
                                <div className="text-green-400 text-lg mb-2">
                                    { item.icon }
                                </div>

                                <p className="text-xs text-gray-500">{ item.label }</p>
                                <p className="font-semibold text-sm">{ item.value }</p>
                            </div>
                        ) ) }

                    </div>

                    {/* Divider */ }
                    <div className="my-6 h-px bg-gradient-to-r from-transparent via-green-500/30 to-transparent" />

                    {/* Personality */ }
                    <div className="text-center personality">
                        <p className="text-gray-500 text-sm">Developer Personality</p>
                        <p className="text-green-400 text-lg font-semibold mt-2">
                            Night Owl Debugger 🌙
                        </p>
                    </div>

                    {/* CTA */ }
                    <div className="mt-6 flex justify-center">
                        <button className="px-6 py-2 bg-green-500 hover:bg-green-600 rounded-lg text-sm font-medium shadow-[0_0_20px_rgba(34,197,94,0.4)] transition">
                            Download Dev Card 🚀
                        </button>
                    </div>

                </div>
            </div>

            {/* Footer Text */ }
            <p className="mt-8 text-gray-500 text-sm text-center z-10">
                Generate your own developer report and share it 🚀
            </p>

        </section>
    );
};

export default Demo;