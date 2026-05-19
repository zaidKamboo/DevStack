import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    FaGithub,
    FaLinkedin,
    FaTwitter,
    FaCode,
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";

const iconClass = "text-[18px] text-green-400";
const socialIconClass = "text-[20px]";

const Footer = () => {
    const [ time, setTime ] = useState( "" );

    useEffect( () => {
        const updateTime = () => {
            const now = new Date();
            setTime(
                now.toLocaleTimeString( [], {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                } )
            );
        };

        updateTime();
        const interval = setInterval( updateTime, 1000 );

        return () => clearInterval( interval );
    }, [] );

    return (
        <footer className="relative bg-black text-white px-4 sm:px-6 py-14 overflow-hidden border-t border-green-500/10">

            {/* ===================================== */ }
            {/* 🔥 BACKGROUND */ }
            {/* ===================================== */ }

            {/* GRID */ }

            <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(rgba(34,197,94,0.08)_1px,transparent_1px),linear-gradient(to_right,rgba(34,197,94,0.08)_1px,transparent_1px)] bg-[size:50px_50px]" />

            {/* RADIAL GLOW */ }

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(34,197,94,0.14),transparent_70%)]" />

            {/* GLOW ORBS */ }

            <motion.div
                animate={ { y: [ 0, -20, 0 ] } }

                transition={ {
                    duration: 6,
                    repeat: Infinity,
                } }

                className="absolute top-10 left-10 w-72 h-72 bg-green-500/10 blur-3xl rounded-full"
            />

            <motion.div
                animate={ { y: [ 0, 20, 0 ] } }

                transition={ {
                    duration: 8,
                    repeat: Infinity,
                } }

                className="absolute bottom-10 right-10 w-72 h-72 bg-green-400/10 blur-3xl rounded-full"
            />

            {/* TOP NEON LINE */ }

            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-green-400 to-transparent shadow-[0_0_15px_rgba(34,197,94,0.8)] mb-12" />

            {/* ===================================== */ }
            {/* CONTENT */ }
            {/* ===================================== */ }

            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 text-center sm:text-left relative z-10">

                {/* ===================================== */ }
                {/* BRAND */ }
                {/* ===================================== */ }

                <motion.div
                    initial={ {
                        opacity: 0,
                        y: 30,
                    } }

                    whileInView={ {
                        opacity: 1,
                        y: 0,
                    } }
                >

                    {/* LOGO */ }

                    <div className="flex items-center gap-3 justify-center sm:justify-start">

                        <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-black via-[#052e16] to-[#22c55e]/30 border border-green-500/20 flex items-center justify-center shadow-[0_0_25px_rgba(34,197,94,0.25)] overflow-hidden">

                            {/* GLOW */ }

                            <div className="absolute inset-0 bg-green-500/10 blur-xl" />

                            <FaCode className="relative z-10 text-[22px] text-green-400 drop-shadow-[0_0_10px_rgba(34,197,94,0.8)]" />

                        </div>

                        <h2 className="text-2xl font-black bg-gradient-to-r from-green-300 via-green-400 to-green-500 bg-clip-text text-transparent tracking-tight">

                            DevStack

                        </h2>

                    </div>

                    {/* DESCRIPTION */ }

                    <p className="text-gray-400 text-sm mt-4 max-w-xs mx-auto sm:mx-0 leading-relaxed">

                        Analyze your GitHub profile, discover developer insights,
                        visualize engineering patterns, and showcase your coding identity
                        with futuristic AI-powered analytics.

                    </p>

                    {/* TIME */ }

                    <div className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-black via-[#04130c] to-[#052e16]/60 border border-green-500/10 shadow-[0_0_20px_rgba(34,197,94,0.08)]">

                        <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_10px_rgba(34,197,94,1)] animate-pulse" />

                        <p className="text-green-400 text-xs tracking-wide">

                            { time }

                        </p>

                    </div>

                </motion.div>

                {/* ===================================== */ }
                {/* QUICK LINKS */ }
                {/* ===================================== */ }

                <motion.div
                    initial={ {
                        opacity: 0,
                        y: 30,
                    } }

                    whileInView={ {
                        opacity: 1,
                        y: 0,
                    } }

                    transition={ {
                        delay: 0.1,
                    } }
                >

                    <h3 className="text-green-400 font-semibold mb-5 flex items-center gap-3 justify-center sm:justify-start text-lg">

                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-black via-[#052e16] to-[#22c55e]/20 border border-green-500/20 flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.2)]">

                            <HiSparkles className={ iconClass } />

                        </div>

                        Quick Links

                    </h3>

                    <ul className="space-y-3">

                        { [ "Home", "Features"].map(
                            ( item, i ) => (

                                <motion.li
                                    key={ i }

                                    whileHover={ {
                                        x: 6,
                                    } }

                                    className="group relative overflow-hidden inline-flex items-center gap-3 px-4 py-3 rounded-2xl bg-black/30 border border-green-500/10 text-gray-400 hover:text-green-400 transition cursor-pointer"
                                >

                                    {/* GLOW */ }

                                    <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />

                                    {/* DOT */ }

                                    <div className="relative w-2 h-2 rounded-full bg-green-400 shadow-[0_0_10px_rgba(34,197,94,1)]" />

                                    <span className="relative z-10 text-sm tracking-wide">

                                        { item }

                                    </span>

                                </motion.li>

                            )
                        ) }

                    </ul>

                </motion.div>

                {/* ===================================== */ }
                {/* SOCIAL */ }
                {/* ===================================== */ }

                <motion.div
                    initial={ {
                        opacity: 0,
                        y: 30,
                    } }

                    whileInView={ {
                        opacity: 1,
                        y: 0,
                    } }

                    transition={ {
                        delay: 0.2,
                    } }
                >
                    Analyze
                    <h3 className="text-green-400 font-semibold mb-5 flex items-center gap-3 justify-center sm:justify-start text-lg">

                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-black via-[#052e16] to-[#22c55e]/20 border border-green-500/20 flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.2)]">

                            <FaGithub className="text-green-400" />

                        </div>

                        Connect

                    </h3>

                    <div className="flex justify-center sm:justify-start gap-5">

                        { [ FaGithub, FaLinkedin, FaTwitter ].map(
                            ( Icon, i ) => (

                                <motion.div
                                    key={ i }

                                    whileHover={ {
                                        scale: 1.15,
                                        y: -4,
                                    } }

                                    whileTap={ {
                                        scale: 0.92,
                                    } }

                                    className="group relative w-14 h-14 rounded-2xl bg-gradient-to-br from-black via-[#04130c] to-[#052e16]/70 border border-green-500/10 flex items-center justify-center cursor-pointer overflow-hidden shadow-[0_0_25px_rgba(34,197,94,0.08)]"
                                >

                                    {/* GLOW */ }

                                    <div className="absolute inset-0 bg-green-500/10 opacity-0 group-hover:opacity-100 transition duration-300 blur-xl" />

                                    <Icon className={ `${socialIconClass} relative z-10 text-gray-400 group-hover:text-green-400 transition duration-300` } />

                                </motion.div>

                            )
                        ) }

                    </div>

                </motion.div>

            </div>

            {/* ===================================== */ }
            {/* MARQUEE */ }
            {/* ===================================== */ }

            <div className="overflow-hidden mt-14 relative z-10">

                <motion.div
                    animate={ {
                        x: [ "100%", "-100%" ],
                    } }

                    transition={ {
                        duration: 14,
                        repeat: Infinity,
                        ease: "linear",
                    } }

                    className="whitespace-nowrap text-green-400/90 text-sm tracking-[0.3em] uppercase"
                >

                    DevStack • Analyze • Share • Grow • Build • Code • Repeat •
                    Developer Intelligence • Open Source • AI Powered •

                </motion.div>

            </div>

            {/* ===================================== */ }
            {/* BOTTOM */ }
            {/* ===================================== */ }

            <div className="mt-10 pt-6 border-t border-green-500/10 flex flex-col sm:flex-row items-center justify-between text-gray-500 text-xs sm:text-sm gap-4 relative z-10">

                <p className="tracking-wide">

                    © 2026 DevStack. All rights reserved.

                </p>

                <motion.p
                    animate={ {
                        opacity: [ 0.5, 1, 0.5 ],
                    } }

                    transition={ {
                        duration: 2,
                        repeat: Infinity,
                    } }

                    className="text-green-400 text-center tracking-wide"
                >

                    Building futuristic developer identity platforms

                </motion.p>

            </div>

        </footer>
    );
};

export default Footer;