import React, { useState } from "react";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import {
    AreaChart, Area,
    BarChart, Bar,
    LineChart, Line,
    PieChart, Pie, Cell,
    XAxis, YAxis, Tooltip,
    ResponsiveContainer
} from "recharts";

import {
    FaCode,
    FaStar,
    FaProjectDiagram,
    FaBug,
    FaChartPie,
    FaGitAlt
} from "react-icons/fa";
import { FiTrendingUp } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi";

const green = "#22c55e";

// 🔥 Sample Data
const commitsData = [
    { name: "Jan", value: 20 },
    { name: "Feb", value: 40 },
    { name: "Mar", value: 30 },
    { name: "Apr", value: 60 },
];

const barData = [
    { name: "A", value: 10 },
    { name: "B", value: 30 },
    { name: "C", value: 20 },
];

const pieData = [
    { name: "JS", value: 60 },
    { name: "Python", value: 25 },
    { name: "Other", value: 15 },
];

// 🔥 Chart Config with Icons
const charts = [
    { title: "Commits", type: "area", data: commitsData, icon: <FaGitAlt /> },
    { title: "Stars", type: "line", data: commitsData, icon: <FaStar /> },
    { title: "Repos", type: "bar", data: barData, icon: <FaProjectDiagram /> },
    { title: "PRs", type: "area", data: commitsData, icon: <FiTrendingUp /> },
    { title: "Issues", type: "bar", data: barData, icon: <FaBug /> },
    { title: "Languages", type: "pie", data: pieData, icon: <FaChartPie /> },
];

const Demo = () => {
    const [ activeChart, setActiveChart ] = useState( null );

    const renderChart = ( type, data, full = false ) => {
        switch ( type ) {
            case "area":
                return (
                    <AreaChart data={ data }>
                        { full && <XAxis dataKey="name" stroke="#888" /> }
                        { full && <YAxis /> }
                        <Tooltip />
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke={ green }
                            fill="rgba(34,197,94,0.2)"
                        />
                    </AreaChart>
                );

            case "bar":
                return (
                    <BarChart data={ data }>
                        { full && <XAxis dataKey="name" stroke="#888" /> }
                        { full && <YAxis /> }
                        <Tooltip />
                        <Bar dataKey="value" fill={ green } />
                    </BarChart>
                );

            case "line":
                return (
                    <LineChart data={ data }>
                        { full && <XAxis dataKey="name" stroke="#888" /> }
                        { full && <YAxis /> }
                        <Tooltip />
                        <Line dataKey="value" stroke={ green } />
                    </LineChart>
                );

            case "pie":
                return (
                    <PieChart>
                        <Tooltip />
                        <Pie
                            data={ data }
                            dataKey="value"
                            cx="50%"
                            cy="50%"
                            outerRadius={ full ? 100 : 55 }
                            label
                        >
                            { data.map( ( _, i ) => (
                                <Cell key={ i } fill={ green } />
                            ) ) }
                        </Pie>
                    </PieChart>
                );

            default:
                return null;
        }
    };

    return (
        <section className="min-h-screen flex flex-col items-center justify-center px-4 bg-black text-white py-10">

            {/* 🔥 Heading */ }
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-green-400 text-center flex items-center gap-2">
                <HiSparkles className="text-green-400 text-xl" />
                Dev Analytics Dashboard
            </h2>

            {/* 🔥 CARD */ }
            <Tilt className="w-full max-w-5xl">
                <div className="bg-black/60 backdrop-blur-xl border border-green-500/20 rounded-xl p-5 shadow-[0_0_40px_rgba(34,197,94,0.2)]">

                    {/* GRID */ }
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

                        { charts.map( ( chart, i ) => (
                            <motion.div
                                key={ i }
                                whileHover={ { scale: 1.06 } }
                                onClick={ () => setActiveChart( chart ) }
                                className="cursor-pointer bg-black/40 p-4 rounded-lg border border-green-500/10
                hover:shadow-[0_0_30px_rgba(34,197,94,0.4)] transition"
                            >
                                {/* 🔥 ICON + TITLE */ }
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2 text-green-400 text-sm">
                                        { chart.icon }
                                        <span>{ chart.title }</span>
                                    </div>
                                </div>

                                <div className="h-24 md:h-28">
                                    <ResponsiveContainer width="100%" height="100%">
                                        { renderChart( chart.type, chart.data ) }
                                    </ResponsiveContainer>
                                </div>
                            </motion.div>
                        ) ) }

                    </div>

                </div>
            </Tilt>

            {/* 🔥 MODAL */ }
            { activeChart && (
                <div
                    className="fixed inset-0 bg-black/80 backdrop-blur flex items-center justify-center z-50 px-4"
                    onClick={ () => setActiveChart( null ) }
                >
                    <div
                        className="bg-black border border-green-500/30 rounded-xl p-6 w-full max-w-2xl"
                        onClick={ ( e ) => e.stopPropagation() }
                    >

                        <h3 className="text-green-400 text-lg mb-4 flex items-center gap-2">
                            { activeChart.icon }
                            { activeChart.title } Details
                        </h3>

                        <p className="text-xs text-gray-400 mb-4">
                            X-Axis: Time / Categories <br />
                            Y-Axis: Activity / Count
                        </p>

                        <div className="h-64 md:h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                { renderChart( activeChart.type, activeChart.data, true ) }
                            </ResponsiveContainer>
                        </div>

                    </div>
                </div>
            ) }

            {/* Footer */ }
            <p className="mt-6 text-gray-500 text-xs text-center">
                Share your DevStack report 🚀
            </p>

        </section>
    );
};

export default Demo;    