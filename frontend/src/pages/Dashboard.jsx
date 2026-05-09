

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useDispatch, useSelector } from "react-redux";

import {
    FaGithub,
    FaStar,
    FaTrophy,
    FaUsers,
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
            ref={ ref }
            className="relative bg-black text-white min-h-screen overflow-hidden px-4 sm:px-6 lg:px-8 py-6"
        >

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

                <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/10 blur-3xl rounded-full" />

                <div className="relative z-10 flex flex-col xl:flex-row justify-between gap-8">

                    {/* LEFT */ }
                    <div className="flex flex-col sm:flex-row sm:items-center gap-5">

                        {/* AVATAR */ }
                        <div className="relative">

                            <div className="absolute inset-0 bg-green-500 blur-2xl opacity-20 rounded-full" />

                            <img
                                src={ profile?.profile?.profile_image }
                                alt="profile"
                                className="relative w-24 h-24 rounded-full border-2 border-green-400 object-cover shadow-[0_0_40px_rgba(34,197,94,0.5)]"
                            />

                        </div>

                        {/* INFO */ }
                        <div>

                            <div className="flex items-center gap-3 flex-wrap">

                                <h1 className="text-3xl md:text-5xl font-black text-green-400">

                                    { profile?.profile?.name }

                                </h1>

                                <div className="px-4 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-xs text-green-400 flex items-center gap-2">

                                    <FaCrown />

                                    { profile?.profile?.badge }

                                </div>

                            </div>

                            <p className="text-gray-300 mt-3 text-lg">

                                { profile?.profile?.personality }

                            </p>

                            <p className="text-sm text-gray-500 mt-2 max-w-2xl leading-relaxed">

                                { profile?.profile?.description }

                            </p>

                            {/* TAGS */ }
                            <div className="flex items-center gap-3 mt-5 flex-wrap">

                                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
                                    <FaGithub />
                                    Open Source
                                </div>

                                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
                                    <FaCodeBranch />
                                    { profile?.stats?.top_language }
                                </div>

                                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
                                    <FaTrophy />
                                    Elite Developer
                                </div>

                            </div>

                        </div>

                    </div>

                    {/* RIGHT */ }
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 min-w-[300px]">

                        <div className="rounded-3xl border border-green-500/20 bg-black/40 backdrop-blur-2xl p-5">

                            <div className="flex items-center gap-2 text-green-400 text-sm mb-2">

                                <FaChartLine />

                                Developer Score

                            </div>

                            <h2 className="text-4xl font-black text-green-400">

                                { devScore }

                            </h2>

                            <p className="text-xs text-gray-500 mt-2">
                                Calculated from stars, repos & followers
                            </p>

                        </div>

                        <div className="rounded-3xl border border-green-500/20 bg-black/40 backdrop-blur-2xl p-5">

                            <div className="flex items-center gap-2 text-green-400 text-sm mb-2">

                                <FaFire />

                                Streak

                            </div>

                            <h2 className="text-4xl font-black text-green-400">

                                { profile?.profile?.streak }

                            </h2>

                            <p className="text-xs text-gray-500 mt-2">
                                Consecutive coding sessions
                            </p>

                        </div>

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
                            scale: 1.03,
                            y: -6,
                        } }
                        className="fade-up relative overflow-hidden rounded-3xl border border-green-500/10 bg-[#04130c]/70 backdrop-blur-3xl p-5 before:absolute before:inset-0 before:bg-gradient-to-br before:from-green-500/5 before:to-transparent before:pointer-events-none"
                    >

                        <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 blur-3xl" />

                        <div className="relative z-10">

                            <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-400 text-2xl border border-green-500/10">

                                { s.icon }

                            </div>

                            <p className="mt-5 text-gray-400 text-sm">
                                { s.title }
                            </p>

                            <h2 className="text-4xl font-black text-green-400 mt-2">

                                { s.value }

                            </h2>

                        </div>

                    </motion.div>

                ) ) }

            </div>

            {/* ===================================== */ }
            {/* CHARTS */ }
            {/* ===================================== */ }

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mb-8">

                {/* AREA */ }
                <div className="fade-up xl:col-span-2 rounded-[36px] border border-green-500/10 bg-[#04130c]/70 backdrop-blur-3xl p-6 relative overflow-hidden">

                    <div className="absolute top-0 right-0 w-72 h-72 bg-green-500/10 blur-3xl" />

                    <div className="relative z-10">

                        <div className="flex items-center gap-2 text-green-400 mb-6 text-xl">

                            <HiOutlineChartBar />

                            Contribution Activity

                        </div>

                        <ResponsiveContainer width="100%" height={ 340 }>

                            <AreaChart data={ activityGraph }>

                                <defs>

                                    <linearGradient id="green" x1="0" y1="0" x2="0" y2="1">

                                        <stop
                                            offset="0%"
                                            stopColor="#22c55e"
                                            stopOpacity={ 0.7 }
                                        />

                                        <stop
                                            offset="100%"
                                            stopColor="#22c55e"
                                            stopOpacity={ 0 }
                                        />

                                    </linearGradient>

                                </defs>

                                <XAxis dataKey="month" />

                                <YAxis />

                                <Tooltip />

                                <Area
                                    type="monotone"
                                    dataKey="commits"
                                    stroke="#22c55e"
                                    fill="url(#green)"
                                    strokeWidth={ 3 }
                                />

                            </AreaChart>

                        </ResponsiveContainer>

                    </div>

                </div>

                {/* PIE */ }
                <div className="fade-up rounded-[36px] border border-green-500/10 bg-[#04130c]/70 backdrop-blur-3xl p-6 relative overflow-hidden">

                    <div className="absolute bottom-0 left-0 w-72 h-72 bg-green-500/10 blur-3xl" />

                    <div className="relative z-10">

                        <h2 className="text-green-400 mb-6 flex items-center gap-2 text-xl">

                            <HiOutlineCode />

                            Tech Radar

                        </h2>

                        <ResponsiveContainer width="100%" height={ 300 }>

                            <PieChart>

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
                                                fill={
                                                    COLORS[
                                                    index % COLORS.length
                                                    ]
                                                }
                                            />

                                        )
                                    ) }

                                </Pie>

                                <Tooltip />

                            </PieChart>

                        </ResponsiveContainer>

                    </div>

                </div>

            </div>

            {/* ===================================== */ }
            {/* TECH STACK BARS */ }
            {/* ===================================== */ }

            <div className="fade-up rounded-[36px] border border-green-500/10 bg-[#04130c]/70 backdrop-blur-3xl p-6 mb-8">

                <div className="flex items-center gap-3 text-green-400 text-xl mb-8">

                    <FaCodeBranch />

                    Technology Dominance

                </div>

                <div className="space-y-6">

                    { ( profile?.techStack || [] ).map(
                        ( tech, i ) => (

                            <div key={ i }>

                                <div className="flex justify-between mb-2">

                                    <span className="text-gray-300">
                                        { tech.name }
                                    </span>

                                    <span className="text-green-400 font-semibold">
                                        { tech.value }
                                    </span>

                                </div>

                                <div className="h-3 rounded-full bg-black overflow-hidden">

                                    <motion.div
                                        initial={ {
                                            width: 0,
                                        } }
                                        animate={ {
                                            width: `${tech.value * 5}%`,
                                        } }
                                        transition={ {
                                            duration: 1,
                                        } }
                                        className="h-full rounded-full bg-gradient-to-r from-green-500 via-green-400 to-green-300 shadow-[0_0_20px_rgba(34,197,94,0.5)]"
                                    />

                                </div>

                            </div>

                        )
                    ) }

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

                <div className="space-y-4 font-mono text-sm">

                    <p className="text-green-400">
                        { ">" }
                        Initializing DevStack AI Engine...
                    </p>

                    <p className="text-gray-400">
                        ✔ Personality Detected:
                        { " " }
                        { profile?.profile?.personality }
                    </p>

                    <p className="text-gray-400">
                        ✔ Preferred Stack:
                        { " " }
                        { profile?.stats?.top_language }
                    </p>

                    <p className="text-gray-400">
                        ✔ OSS Impact:
                        { " " }
                        { profile?.stats?.stars }
                        { " " }
                        stars earned
                    </p>

                    <p className="text-gray-400">
                        ✔ Strength:
                        { " " }
                        { profile?.profile?.strength }
                    </p>

                </div>

            </div>

            {/* ===================================== */ }
            {/* BOTTOM */ }
            {/* ===================================== */ }

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

                {/* RECENT ACTIVITY */ }
                <div className="fade-up rounded-[36px] border border-green-500/10 bg-[#04130c]/70 backdrop-blur-3xl p-6">

                    <h2 className="text-green-400 mb-6 flex items-center gap-2 text-xl">

                        <FaFire />

                        Recent Activity

                    </h2>

                    <div className="space-y-4">

                        { ( profile?.recentActivity || [] ).map(
                            ( item, i ) => (

                                <motion.div
                                    whileHover={ {
                                        x: 5,
                                    } }
                                    key={ i }
                                    className="flex items-center gap-4 p-4 rounded-2xl bg-black/30 border border-green-500/10"
                                >

                                    <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-400">

                                        <FaGithub />

                                    </div>

                                    <span className="text-gray-400 text-sm">
                                        { item }
                                    </span>

                                </motion.div>

                            )
                        ) }

                    </div>

                </div>

                {/* AI INSIGHTS */ }
                <div className="fade-up rounded-[36px] border border-green-500/10 bg-[#04130c]/70 backdrop-blur-3xl p-6">

                    <h2 className="text-green-400 flex items-center gap-2 mb-6 text-xl">

                        <FaBrain />

                        AI Insights

                    </h2>

                    <div className="space-y-4">

                        { ( profile?.insights || [] ).map(
                            ( insight, i ) => (

                                <motion.div
                                    whileHover={ {
                                        scale: 1.02,
                                    } }
                                    key={ i }
                                    className="p-5 rounded-2xl bg-black/40 border border-green-500/10"
                                >

                                    <div className="flex items-center gap-2 text-green-400 mb-3">

                                        <HiOutlineLightningBolt />

                                        { insight.title }

                                    </div>

                                    <p className="text-sm text-gray-400 leading-relaxed">

                                        { insight.description }

                                    </p>

                                </motion.div>

                            )
                        ) }

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Dashboard;