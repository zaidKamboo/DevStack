

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useDispatch, useSelector } from "react-redux";

import {
    FaGithub,
    FaStar,
    FaTrophy,
    FaShareAlt,
    FaFire,
    FaCodeBranch,
    FaCrown,
    FaTerminal,
    FaBrain,
    FaChartLine,
} from "react-icons/fa";

import {
    HiOutlineChartBar,
    HiOutlineCode,
    HiOutlineSparkles,
    HiOutlineLightningBolt,
} from "react-icons/hi";

import { BiGitCommit } from "react-icons/bi";

import {
    AreaChart,
    Area,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
} from "recharts";

import { getProfile } from "../store/slices/profile.slice";
import { select } from "../utils";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const Dashboard = () => {

    const ref = useRef( null ); const [ searchParams ] =
        useSearchParams();
    const github_username =
        searchParams.get(
            "github_username"
        );

    const dispatch = useDispatch();

    const [ activeIndex, setActiveIndex ] =
        useState( 0 );

    // =====================================
    // 🔥 REDUX
    // =====================================

    const profile = useSelector(
        select( "profile" )
    );
    const user = useSelector( select( 'user' ) )

    console.log( profile );

    // =====================================
    // 🔥 FETCH PROFILE
    // =====================================
    console.log( user )
    useEffect( () => {
        let username = github_username;
        if ( !github_username ) {
            username = user?.github_username;
        }
        dispatch( getProfile( username ) );

    }, [ dispatch ] );

    // =====================================
    // 🔥 GSAP
    // =====================================

    useEffect( () => {

        const ctx = gsap.context( () => {

            gsap.from( ".fade-up", {
                y: 40,
                opacity: 0,
                stagger: 0.08,
                duration: 1,
                ease: "power3.out",
            } );

            gsap.to( ".orb1", {
                y: 40,
                repeat: -1,
                yoyo: true,
                duration: 6,
                ease: "sine.inOut",
            } );

            gsap.to( ".orb2", {
                y: -40,
                repeat: -1,
                yoyo: true,
                duration: 7,
                ease: "sine.inOut",
            } );

        }, ref );

        return () => ctx.revert();

    }, [] );

    // =====================================
    // 🔥 COLORS
    // =====================================

    const COLORS = [
        "#22c55e",
        "#4ade80",
        "#86efac",
        "#bbf7d0",
        "#14532d",
    ];

    // =====================================
    // 🔥 DYNAMIC STATS
    // =====================================

    const stats = [
        {
            title: "Repositories",
            value:
                profile?.stats?.repositories || 0,
            icon: <FaGithub />,
        },

        {
            title: "Stars",
            value:
                profile?.stats?.stars || 0,
            icon: <FaStar />,
        },

        {
            title: "Commits",
            value:
                profile?.stats?.commits || 0,
            icon: <BiGitCommit />,
        },

        {
            title: "Top Language",
            value:
                profile?.stats?.top_language || "N/A",
            icon: <HiOutlineCode />,
        },
    ];

    // =====================================
    // 🔥 DEV SCORE
    // =====================================

    const devScore =
        (
            ( profile?.stats?.repositories || 0 ) * 5 +
            ( profile?.stats?.stars || 0 ) * 10 +
            ( profile?.socialStats?.followers || 0 ) * 20
        );

    // =====================================
    // 🔥 FALLBACK GRAPH
    // =====================================

    const activityGraph =
        profile?.activityGraph || [
            {
                month: "Jan",
                commits: 20,
            },

            {
                month: "Feb",
                commits: 45,
            },

            {
                month: "Mar",
                commits: 35,
            },

            {
                month: "Apr",
                commits: 70,
            },

            {
                month: "May",
                commits: 55,
            },

            {
                month: "Jun",
                commits: 90,
            },
        ];

    return (
        <div
            id="print-area"
            ref={ ref }
            className="relative bg-black text-white min-h-screen overflow-hidden px-4 sm:px-6 lg:px-8 py-6"
        >
            <div className="no-print">
                <Navbar />
            </div>
            {/* ===================================== */ }
            {/* BACKGROUND */ }
            {/* ===================================== */ }

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.12),transparent_60%)]" />

            <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#22c55e_1px,transparent_1px),linear-gradient(to_bottom,#22c55e_1px,transparent_1px)] bg-[size:80px_80px]" />

            <div className="orb1 absolute top-20 left-10 w-72 h-72 bg-green-500/10 blur-3xl" />

            <div className="orb2 absolute bottom-20 right-10 w-72 h-72 bg-green-400/10 blur-3xl" />

            {/* ===================================== */ }
            {/* HERO */ }
            {/* ===================================== */ }

            <div className="fade-up relative z-10 mb-8 rounded-[36px] border border-green-500/10 bg-gradient-to-br from-[#04130c] via-[#020617] to-black p-6 md:p-8 overflow-hidden shadow-[0_0_80px_rgba(34,197,94,0.08)] before:absolute before:inset-0 before:bg-gradient-to-br before:from-green-500/5 before:to-transparent before:pointer-events-none">

                {/* 🔥 UPDATED THEME GLOWS */ }

                <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/10 blur-3xl rounded-full" />

                <div className="absolute bottom-0 left-0 w-72 h-72 bg-green-400/5 blur-3xl rounded-full" />

                {/* 🔥 GRID OVERLAY */ }

                <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#22c55e_1px,transparent_1px),linear-gradient(to_bottom,#22c55e_1px,transparent_1px)] bg-[size:60px_60px]" />

                <div className="relative z-10 flex flex-col xl:flex-row justify-between gap-8">

                    {/* LEFT */ }

                    <div className="flex flex-col sm:flex-row sm:items-center gap-5">

                        {/* AVATAR */ }

                        <div className="relative group">

                            {/* OUTER GLOW */ }

                            <div className="absolute inset-0 bg-green-500 blur-3xl opacity-30 rounded-full group-hover:opacity-50 transition duration-500" />

                            {/* GLOW RING */ }

                            <div className="absolute -inset-2 rounded-full border border-green-400/20 shadow-[0_0_40px_rgba(34,197,94,0.3)]" />

                            <img
                                src={ profile?.profile?.profile_image }
                                alt="profile"
                                className="relative w-24 h-24 rounded-full border-2 border-green-400 object-cover shadow-[0_0_40px_rgba(34,197,94,0.5)]"
                            />

                            {/* ONLINE DOT */ }

                            <div className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-green-400 border-2 border-black shadow-[0_0_15px_rgba(34,197,94,1)] animate-pulse" />

                        </div>

                        {/* INFO */ }

                        <div>

                            <div className="flex items-center gap-3 flex-wrap">

                                <h1 className="text-3xl md:text-5xl font-black bg-gradient-to-r from-green-300 via-green-400 to-green-500 bg-clip-text text-transparent tracking-tight">

                                    { profile?.profile?.name }

                                </h1>

                                <div className="px-4 py-1 rounded-full bg-gradient-to-r from-black via-[#052e16] to-[#22c55e]/10 border border-green-500/20 text-xs text-green-400 flex items-center gap-2 shadow-[0_0_20px_rgba(34,197,94,0.2)]">

                                    <FaCrown className="text-green-300" />

                                    { profile?.profile?.badge }

                                </div>

                            </div>

                            <p className="text-green-300/90 mt-3 text-lg tracking-wide">

                                { profile?.profile?.personality }

                            </p>

                            <p className="text-sm text-gray-400 mt-3 max-w-2xl leading-relaxed">

                                { profile?.profile?.description }

                            </p>

                            {/* TAGS */ }

                            <div className="flex items-center gap-3 mt-5 flex-wrap">

                                <motion.div
                                    whileHover={ {
                                        y: -2,
                                        scale: 1.03,
                                    } }

                                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-black via-[#052e16] to-[#22c55e]/10 border border-green-500/20 text-green-400 text-sm shadow-[0_0_20px_rgba(34,197,94,0.15)]"
                                >

                                    <FaGithub />

                                    Open Source

                                </motion.div>

                                <motion.div
                                    whileHover={ {
                                        y: -2,
                                        scale: 1.03,
                                    } }

                                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-black via-[#052e16] to-[#22c55e]/10 border border-green-500/20 text-green-400 text-sm shadow-[0_0_20px_rgba(34,197,94,0.15)]"
                                >

                                    <FaCodeBranch />

                                    { profile?.stats?.top_language }

                                </motion.div>

                                <motion.div
                                    whileHover={ {
                                        y: -2,
                                        scale: 1.03,
                                    } }

                                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-black via-[#052e16] to-[#22c55e]/10 border border-green-500/20 text-green-400 text-sm shadow-[0_0_20px_rgba(34,197,94,0.15)]"
                                >

                                    <FaTrophy />

                                    Elite Developer

                                </motion.div>

                            </div>

                        </div>

                    </div>

                    {/* RIGHT */ }

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 min-w-[300px]">

                        {/* SCORE CARD */ }

                        <motion.div
                            whileHover={ {
                                y: -5,
                                scale: 1.02,
                            } }

                            className="relative overflow-hidden rounded-3xl border border-green-500/20 bg-gradient-to-br from-black via-[#04130c] to-[#052e16]/70 backdrop-blur-2xl p-5 shadow-[0_0_30px_rgba(34,197,94,0.08)]"
                        >

                            {/* GLOW */ }

                            <div className="absolute top-0 right-0 w-40 h-40 bg-green-500/10 blur-3xl" />

                            {/* SHINE */ }

                            <motion.div
                                animate={ {
                                    x: [ "-100%", "220%" ],
                                } }

                                transition={ {
                                    repeat: Infinity,
                                    duration: 4,
                                    ease: "linear",
                                } }

                                className="absolute top-0 left-0 h-full w-20 bg-white/5 blur-xl rotate-12"
                            />

                            <div className="relative z-10">

                                <div className="flex items-center gap-2 text-green-400 text-sm mb-3">

                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-black via-[#052e16] to-[#22c55e]/30 border border-green-500/20 flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.25)]">

                                        <FaChartLine />

                                    </div>

                                    Developer Score

                                </div>

                                <h2 className="text-5xl font-black bg-gradient-to-r from-green-300 via-green-400 to-green-500 bg-clip-text text-transparent">

                                    { devScore }

                                </h2>

                                <p className="text-xs text-gray-500 mt-3">
                                    Calculated from stars, repos & followers
                                </p>

                            </div>

                        </motion.div>

                        {/* STREAK CARD */ }

                        <motion.div
                            whileHover={ {
                                y: -5,
                                scale: 1.02,
                            } }

                            className="relative overflow-hidden rounded-3xl border border-green-500/20 bg-gradient-to-br from-black via-[#04130c] to-[#052e16]/70 backdrop-blur-2xl p-5 shadow-[0_0_30px_rgba(34,197,94,0.08)]"
                        >

                            {/* GLOW */ }

                            <div className="absolute bottom-0 left-0 w-40 h-40 bg-green-400/10 blur-3xl" />

                            {/* SHINE */ }

                            <motion.div
                                animate={ {
                                    x: [ "-100%", "220%" ],
                                } }

                                transition={ {
                                    repeat: Infinity,
                                    duration: 4,
                                    ease: "linear",
                                } }

                                className="absolute top-0 left-0 h-full w-20 bg-white/5 blur-xl rotate-12"
                            />

                            <div className="relative z-10">

                                <div className="flex items-center gap-2 text-green-400 text-sm mb-3">

                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-black via-[#052e16] to-[#22c55e]/30 border border-green-500/20 flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.25)]">

                                        <FaFire />

                                    </div>

                                    Streak

                                </div>

                                <h2 className="text-5xl font-black bg-gradient-to-r from-green-300 via-green-400 to-green-500 bg-clip-text text-transparent">

                                    { profile?.profile?.streak }

                                </h2>

                                <p className="text-xs text-gray-500 mt-3">
                                    Consecutive coding sessions
                                </p>

                            </div>

                        </motion.div>

                    </div>

                </div>

            </div>

            {/* ===================================== */ }
            {/* STATS */ }
            {/* ===================================== */ }

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

                { stats.map( ( s, i ) => (

                    <motion.div
                        key={ i }

                        whileHover={ {
                            scale: 1.04,
                            y: -8,
                        } }

                        transition={ {
                            duration: 0.25,
                        } }

                        className="fade-up relative overflow-hidden rounded-[32px] border border-green-500/10 bg-gradient-to-br from-[#020617] via-black to-[#04130c]/90 backdrop-blur-3xl p-6 before:absolute before:inset-0 before:bg-gradient-to-br before:from-green-500/5 before:to-transparent before:pointer-events-none shadow-[0_0_40px_rgba(34,197,94,0.08)]"
                    >

                        {/* 🔥 GLOW ORB */ }

                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-green-500/10 blur-3xl rounded-full" />

                        {/* 🔥 GRID OVERLAY */ }

                        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#22c55e_1px,transparent_1px),linear-gradient(to_bottom,#22c55e_1px,transparent_1px)] bg-[size:40px_40px]" />

                        {/* 🔥 SHINE EFFECT */ }

                        <motion.div
                            animate={ {
                                x: [ "-120%", "220%" ],
                            } }

                            transition={ {
                                repeat: Infinity,
                                duration: 4,
                                ease: "linear",
                            } }

                            className="absolute top-0 left-0 h-full w-24 bg-white/5 blur-xl rotate-12"
                        />

                        <div className="relative z-10">

                            {/* ICON */ }

                            <div className="relative w-16 h-16 rounded-3xl bg-gradient-to-br from-black via-[#052e16] to-[#22c55e]/30 flex items-center justify-center text-green-400 text-3xl border border-green-500/20 shadow-[0_0_30px_rgba(34,197,94,0.35)]">

                                {/* ICON GLOW */ }

                                <div className="absolute inset-0 rounded-3xl bg-green-500/10 blur-xl" />

                                <div className="relative z-10">

                                    { s.icon }

                                </div>

                            </div>

                            {/* TITLE */ }

                            <p className="mt-6 text-gray-400 text-sm tracking-wide uppercase">

                                { s.title }

                            </p>

                            {/* VALUE */ }

                            <h2 className="text-5xl font-black mt-3 bg-gradient-to-r from-green-300 via-green-400 to-green-500 bg-clip-text text-transparent tracking-tight">

                                { s.value }

                            </h2>

                            {/* BOTTOM LINE */ }

                            <div className="mt-5 h-[2px] w-full rounded-full bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-70 shadow-[0_0_20px_rgba(34,197,94,0.8)]" />

                        </div>

                    </motion.div>

                ) ) }

            </div>

            {/* ===================================== */ }
            {/* CHARTS */ }
            {/* ===================================== */ }

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mb-8">

                {/* AREA */ }

                <div className="fade-up xl:col-span-2 rounded-[36px] border border-green-500/10 bg-gradient-to-br from-[#020617] via-black to-[#04130c]/90 backdrop-blur-3xl p-6 relative overflow-hidden shadow-[0_0_50px_rgba(34,197,94,0.08)]">

                    {/* 🔥 GLOW */ }

                    <div className="absolute top-0 right-0 w-72 h-72 bg-green-500/10 blur-3xl rounded-full" />

                    {/* 🔥 GRID */ }

                    <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#22c55e_1px,transparent_1px),linear-gradient(to_bottom,#22c55e_1px,transparent_1px)] bg-[size:50px_50px]" />

                    <div className="relative z-10">

                        <div className="flex items-center gap-3 text-green-400 mb-6 text-xl font-semibold">

                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-black via-[#052e16] to-[#22c55e]/30 border border-green-500/20 flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.35)]">

                                <HiOutlineChartBar />

                            </div>

                            Contribution Activity

                        </div>

                        <ResponsiveContainer width="100%" height={ 340 }>

                            <AreaChart data={ activityGraph }>

                                <defs>

                                    {/* 🔥 BLACK → NEON GRADIENT */ }

                                    <linearGradient
                                        id="greenGlow"
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                    >

                                        <stop
                                            offset="0%"
                                            stopColor="#22c55e"
                                            stopOpacity={ 1 }
                                        />

                                        <stop
                                            offset="45%"
                                            stopColor="#14532d"
                                            stopOpacity={ 0.45 }
                                        />

                                        <stop
                                            offset="100%"
                                            stopColor="#000000"
                                            stopOpacity={ 0.05 }
                                        />

                                    </linearGradient>

                                    {/* 🔥 GLOW */ }

                                    <filter id="glow">

                                        <feGaussianBlur
                                            stdDeviation="4"
                                            result="coloredBlur"
                                        />

                                        <feMerge>

                                            <feMergeNode in="coloredBlur" />

                                            <feMergeNode in="SourceGraphic" />

                                        </feMerge>

                                    </filter>

                                </defs>

                                <XAxis
                                    dataKey="month"
                                    stroke="#4ade80"
                                    tick={ {
                                        fill: "#4ade80",
                                    } }
                                />

                                <YAxis
                                    stroke="#4ade80"
                                    tick={ {
                                        fill: "#4ade80",
                                    } }
                                />

                                <Tooltip
                                    contentStyle={ {
                                        background: "#000",
                                        border: "1px solid #22c55e",
                                        borderRadius: "18px",
                                        boxShadow:
                                            "0 0 35px rgba(34,197,94,0.5)",
                                        color: "#22c55e",
                                    } }
                                />

                                {/* 🔥 BACK GLOW */ }

                                <Area
                                    type="monotone"
                                    dataKey="commits"
                                    stroke="#14532d"
                                    fill="url(#greenGlow)"
                                    strokeWidth={ 10 }
                                    opacity={ 0.15 }
                                />

                                {/* 🔥 MAIN AREA */ }

                                <Area
                                    type="monotone"
                                    dataKey="commits"
                                    stroke="#22c55e"
                                    fill="url(#greenGlow)"
                                    strokeWidth={ 4 }
                                    filter="url(#glow)"
                                />

                            </AreaChart>

                        </ResponsiveContainer>

                    </div>

                </div>

                {/* PIE */ }

                <div className="fade-up rounded-[36px] border border-green-500/10 bg-gradient-to-br from-[#020617] via-black to-[#04130c]/90 backdrop-blur-3xl p-6 relative overflow-hidden shadow-[0_0_50px_rgba(34,197,94,0.08)]">

                    {/* 🔥 GLOW */ }

                    <div className="absolute bottom-0 left-0 w-72 h-72 bg-green-500/10 blur-3xl rounded-full" />

                    {/* 🔥 GRID */ }

                    <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#22c55e_1px,transparent_1px),linear-gradient(to_bottom,#22c55e_1px,transparent_1px)] bg-[size:50px_50px]" />

                    <div className="relative z-10">

                        <h2 className="text-green-400 mb-6 flex items-center gap-3 text-xl font-semibold">

                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-black via-[#052e16] to-[#22c55e]/30 border border-green-500/20 flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.35)]">

                                <HiOutlineCode />

                            </div>

                            Tech Radar

                        </h2>

                        <ResponsiveContainer width="100%" height={ 300 }>

                            <PieChart>

                                <defs>

                                    { ( profile?.techStack || [] ).map(
                                        ( _, index ) => (

                                            <linearGradient
                                                key={ index }
                                                id={ `pieGlow${index}` }
                                                x1="0"
                                                y1="0"
                                                x2="1"
                                                y2="1"
                                            >

                                                <stop
                                                    offset="0%"
                                                    stopColor="#22c55e"
                                                />

                                                <stop
                                                    offset="100%"
                                                    stopColor="#000000"
                                                />

                                            </linearGradient>

                                        )
                                    ) }

                                </defs>

                                <Pie
                                    data={ profile?.techStack || [] }
                                    dataKey="value"
                                    innerRadius={ 65 }
                                    outerRadius={ 100 }
                                    activeIndex={ activeIndex }
                                    onMouseEnter={ ( _, index ) =>
                                        setActiveIndex( index )
                                    }
                                >

                                    { ( profile?.techStack || [] ).map(
                                        ( entry, index ) => (

                                            <Cell
                                                key={ index }
                                                fill={ `url(#pieGlow${index})` }
                                                style={ {
                                                    filter:
                                                        "drop-shadow(0px 0px 14px rgba(34,197,94,0.8))",
                                                } }
                                            />

                                        )
                                    ) }

                                </Pie>

                                <Tooltip
                                    contentStyle={ {
                                        background: "#000",
                                        border: "1px solid #22c55e",
                                        borderRadius: "18px",
                                        boxShadow:
                                            "0 0 35px rgba(34,197,94,0.5)",
                                        color: "#22c55e",
                                    } }
                                />

                            </PieChart>

                        </ResponsiveContainer>

                    </div>

                </div>

            </div>

            {/* ===================================== */ }
            {/* TECH STACK BARS */ }
            {/* ===================================== */ }

            <div className="fade-up rounded-[36px] border border-green-500/10 bg-[#04130c]/70 backdrop-blur-3xl p-6 mb-8 relative overflow-hidden">

                {/* 🔥 BACKGROUND GLOW */ }

                <div className="absolute top-0 right-0 w-72 h-72 bg-green-500/10 blur-3xl" />

                <div className="relative z-10">

                    <div className="flex items-center gap-3 text-green-400 text-xl mb-8">

                        <FaCodeBranch />

                        Technology Dominance

                    </div>

                    <div className="space-y-6">

                        { ( profile?.techStack || [] ).map(
                            ( tech, i ) => (

                                <div key={ i }>

                                    {/* 🔥 LABELS */ }

                                    <div className="flex justify-between mb-3">

                                        <span className="text-gray-300 font-medium tracking-wide">

                                            { tech.name }

                                        </span>

                                        <span className="text-green-400 font-semibold">

                                            { tech.value }

                                        </span>

                                    </div>

                                    {/* 🔥 BAR BACKGROUND */ }

                                    <div className="h-4 rounded-full bg-black/80 overflow-hidden border border-green-500/10 shadow-inner shadow-black">

                                        <motion.div
                                            initial={ {
                                                width: 0,
                                            } }

                                            animate={ {
                                                width: `${tech.value * 5}%`,
                                            } }

                                            transition={ {
                                                duration: 1.2,
                                                ease: "easeOut",
                                            } }

                                            className="relative h-full rounded-full overflow-hidden"
                                        >

                                            {/* 🔥 MAIN GRADIENT */ }

                                            <div className="absolute inset-0 bg-gradient-to-r from-black via-[#14532d] to-[#22c55e]" />

                                            {/* 🔥 EXTRA NEON LAYER */ }

                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-400/30 to-green-300/60" />

                                            {/* 🔥 GLOW */ }

                                            <div className="absolute inset-0 shadow-[0_0_25px_rgba(34,197,94,0.9)]" />

                                            {/* 🔥 SHINE EFFECT */ }

                                            <motion.div
                                                animate={ {
                                                    x: [ "-100%", "250%" ],
                                                } }

                                                transition={ {
                                                    repeat: Infinity,
                                                    duration: 2.5,
                                                    ease: "linear",
                                                } }

                                                className="absolute top-0 left-0 h-full w-20 bg-white/10 blur-md rotate-12"
                                            />

                                        </motion.div>

                                    </div>

                                </div>

                            )
                        ) }

                    </div>

                </div>

            </div>

            {/* ===================================== */ }
            {/* AI TERMINAL */ }
            {/* ===================================== */ }

            <div className="fade-up rounded-[36px] border border-green-500/10 bg-black p-6 mb-8 overflow-hidden">

                <div className="flex items-center gap-2 mb-6">

                    <div className="w-3 h-3 rounded-full bg-red-500" />

                    <div className="w-3 h-3 rounded-full bg-yellow-500" />

                    <div className="w-3 h-3 rounded-full bg-green-500" />

                </div>

                <div className="space-y-5 font-mono text-sm">

                    {/* 🔥 INITIALIZING */ }

                    <motion.div
                        initial={ {
                            opacity: 0,
                            x: -20,
                        } }

                        animate={ {
                            opacity: 1,
                            x: 0,
                        } }

                        transition={ {
                            duration: 0.5,
                        } }

                        className="relative overflow-hidden flex items-center gap-3 rounded-full border border-green-500/10 bg-gradient-to-r from-black via-[#04130c] to-[#052e16]/60 px-5 py-4 shadow-[0_0_25px_rgba(34,197,94,0.08)]"
                    >

                        {/* GLOW */ }

                        <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-transparent to-transparent pointer-events-none" />

                        {/* PULSE DOT */ }

                        <div className="relative flex items-center justify-center">

                            <div className="absolute w-3 h-3 rounded-full bg-green-400 animate-ping opacity-70" />

                            <div className="relative w-3 h-3 rounded-full bg-green-400 shadow-[0_0_15px_rgba(34,197,94,1)]" />

                        </div>

                        <p className="relative z-10 text-green-400 tracking-wide">

                            { ">" } Initializing DevStack AI Engine...

                        </p>

                    </motion.div>

                    {/* 🔥 PERSONALITY */ }

                    <motion.div
                        whileHover={ {
                            x: 4,
                            scale: 1.01,
                        } }

                        className="relative overflow-hidden rounded-full border border-green-500/10 bg-black/40 backdrop-blur-xl px-5 py-4 shadow-[0_0_20px_rgba(34,197,94,0.06)]"
                    >

                        <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-transparent to-transparent pointer-events-none" />

                        <p className="relative z-10 text-gray-300 leading-relaxed">

                            <span className="text-green-400 font-semibold">
                                ✔ Personality Detected:
                            </span>

                            { " " }

                            <span className="text-green-300">

                                { profile?.profile?.personality }

                            </span>

                        </p>

                    </motion.div>

                    {/* 🔥 STACK */ }

                    <motion.div
                        whileHover={ {
                            x: 4,
                            scale: 1.01,
                        } }

                        className="relative overflow-hidden rounded-full border border-green-500/10 bg-black/40 backdrop-blur-xl px-5 py-4 shadow-[0_0_20px_rgba(34,197,94,0.06)]"
                    >

                        <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-transparent to-transparent pointer-events-none" />

                        <p className="relative z-10 text-gray-300 leading-relaxed">

                            <span className="text-green-400 font-semibold">
                                ✔ Preferred Stack:
                            </span>

                            { " " }

                            <span className="text-green-300">

                                { profile?.stats?.top_language }

                            </span>

                        </p>

                    </motion.div>

                    {/* 🔥 OSS IMPACT */ }

                    <motion.div
                        whileHover={ {
                            x: 4,
                            scale: 1.01,
                        } }

                        className="relative overflow-hidden rounded-full border border-green-500/10 bg-black/40 backdrop-blur-xl px-5 py-4 shadow-[0_0_20px_rgba(34,197,94,0.06)]"
                    >

                        <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-transparent to-transparent pointer-events-none" />

                        <p className="relative z-10 text-gray-300 leading-relaxed">

                            <span className="text-green-400 font-semibold">
                                ✔ OSS Impact:
                            </span>

                            { " " }

                            <span className="text-green-300">

                                { profile?.stats?.stars }

                            </span>

                            { " " }

                            stars earned

                        </p>

                    </motion.div>

                    {/* 🔥 STRENGTH */ }

                    <motion.div
                        whileHover={ {
                            x: 4,
                            scale: 1.01,
                        } }

                        className="relative overflow-hidden rounded-full border border-green-500/10 bg-black/40 backdrop-blur-xl px-5 py-4 shadow-[0_0_20px_rgba(34,197,94,0.06)]"
                    >

                        <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-transparent to-transparent pointer-events-none" />

                        <p className="relative z-10 text-gray-300 leading-relaxed">

                            <span className="text-green-400 font-semibold">
                                ✔ Strength:
                            </span>

                            { " " }

                            <span className="text-green-300">

                                { profile?.profile?.strength }

                            </span>

                        </p>

                    </motion.div>

                </div>

            </div>

            {/* ===================================== */ }
            {/* BOTTOM */ }
            {/* ===================================== */ }

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

                {/* ===================================== */ }
                {/* RECENT ACTIVITY */ }
                {/* ===================================== */ }

                <div className="fade-up rounded-[36px] border border-green-500/10 bg-[#04130c]/70 backdrop-blur-3xl p-6 relative overflow-hidden">

                    {/* 🔥 BACKGROUND GLOW */ }

                    <div className="absolute top-0 right-0 w-72 h-72 bg-green-500/10 blur-3xl" />

                    <div className="relative z-10">

                        <h2 className="text-green-400 mb-6 flex items-center gap-3 text-xl font-semibold">

                            <div className="w-10 h-10 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.3)]">

                                <FaFire />

                            </div>

                            Recent Activity

                        </h2>

                        <div className="space-y-4">

                            { ( profile?.recentActivity || [] ).map(
                                ( item, i ) => (

                                    <motion.div
                                        whileHover={ {
                                            x: 8,
                                            scale: 1.01,
                                        } }

                                        transition={ {
                                            duration: 0.25,
                                        } }

                                        key={ i }

                                        className="relative overflow-hidden flex items-center gap-4 p-5 rounded-3xl bg-black/40 border border-green-500/10 backdrop-blur-xl"
                                    >

                                        {/* 🔥 CARD GLOW */ }

                                        <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-transparent to-transparent pointer-events-none" />

                                        {/* 🔥 ICON */ }

                                        <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-black via-[#052e16] to-[#22c55e]/30 border border-green-500/20 flex items-center justify-center text-green-400 shadow-[0_0_25px_rgba(34,197,94,0.4)]">

                                            <FaGithub className="text-lg" />

                                        </div>

                                        {/* 🔥 TEXT */ }

                                        <div className="flex-1">

                                            <p className="text-gray-300 text-sm leading-relaxed">

                                                { item }

                                            </p>

                                        </div>

                                        {/* 🔥 STATUS DOT */ }

                                        <div className="w-3 h-3 rounded-full bg-green-400 shadow-[0_0_15px_rgba(34,197,94,1)] animate-pulse" />

                                    </motion.div>

                                )
                            ) }

                        </div>

                    </div>

                </div>

                {/* ===================================== */ }
                {/* AI INSIGHTS */ }
                {/* ===================================== */ }

                <div className="fade-up rounded-[36px] border border-green-500/10 bg-[#04130c]/70 backdrop-blur-3xl p-6 relative overflow-hidden">

                    {/* 🔥 BACKGROUND GLOW */ }

                    <div className="absolute bottom-0 left-0 w-72 h-72 bg-green-500/10 blur-3xl" />

                    <div className="relative z-10">

                        <h2 className="text-green-400 flex items-center gap-3 mb-6 text-xl font-semibold">

                            <div className="w-10 h-10 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.3)]">

                                <FaBrain />

                            </div>

                            AI Insights

                        </h2>

                        <div className="space-y-5">

                            { ( profile?.insights || [] ).map(
                                ( insight, i ) => (

                                    <motion.div
                                        whileHover={ {
                                            scale: 1.02,
                                            y: -3,
                                        } }

                                        transition={ {
                                            duration: 0.25,
                                        } }

                                        key={ i }

                                        className="relative overflow-hidden p-5 rounded-3xl bg-black/40 border border-green-500/10 backdrop-blur-xl"
                                    >

                                        {/* 🔥 CARD GRADIENT */ }

                                        <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-transparent pointer-events-none" />

                                        {/* 🔥 HEADER */ }

                                        <div className="relative z-10 flex items-center gap-3 text-green-400 mb-4">

                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-black via-[#052e16] to-[#22c55e]/30 border border-green-500/20 flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.35)]">

                                                <HiOutlineLightningBolt />

                                            </div>

                                            <span className="font-semibold tracking-wide">

                                                { insight.title }

                                            </span>

                                        </div>

                                        {/* 🔥 DESCRIPTION */ }

                                        <p className="relative z-10 text-sm text-gray-300 leading-relaxed">

                                            { insight.description }

                                        </p>

                                        {/* 🔥 NEON LINE */ }

                                        <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-70" />

                                    </motion.div>

                                )
                            ) }

                        </div>

                    </div>

                </div>

            </div>
            {/* ===================================== */ }
            {/* 🔥 SHARE / PRINT BUTTON */ }
            {/* ===================================== */ }

            <div className="fade-up flex justify-center mt-10 mb-6">

                <motion.button
                    whileHover={ {
                        scale: 1.04,
                        y: -3,
                    } }

                    whileTap={ {
                        scale: 0.96,
                    } }

                    onClick={ () => window.print() }

                    className="
        relative overflow-hidden
        flex items-center gap-3
        px-8 py-4
        rounded-full
        bg-gradient-to-r
        from-[#14532d]
        via-[#22c55e]
        to-[#4ade80]
        text-black
        font-semibold
        shadow-[0_0_40px_rgba(34,197,94,0.35)]
        transition-all duration-300
        "
                >

                    {/* 🔥 SHINE EFFECT */ }

                    <motion.div
                        animate={ {
                            x: [ "-120%", "220%" ],
                        } }

                        transition={ {
                            repeat: Infinity,
                            duration: 3,
                            ease: "linear",
                        } }

                        className="absolute top-0 left-0 h-full w-20 bg-white/20 blur-md rotate-12"
                    />

                    {/* 🔥 ICON */ }

                    <div className="relative z-10">

                        <FaShareAlt className="text-[18px]" />

                    </div>

                    {/* 🔥 TEXT */ }

                    <span className="relative z-10 tracking-wide">

                        Share Developer Report

                    </span>

                </motion.button>

            </div>
            <div className="no-print">
                <Footer />
            </div>
        </div>
    );
};

export default Dashboard;