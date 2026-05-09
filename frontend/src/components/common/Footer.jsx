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
        <footer className="relative bg-black text-white px-4 sm:px-6 py-12 overflow-hidden">

            <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(34,197,94,0.08)_1px,transparent_1px),linear-gradient(to_right,rgba(34,197,94,0.08)_1px,transparent_1px)] bg-[size:40px_40px]" />

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(34,197,94,0.15),transparent_70%)]" />

            <motion.div
                animate={ { y: [ 0, -15, 0 ] } }
                transition={ { duration: 6, repeat: Infinity } }
                className="absolute top-10 left-10 w-60 h-60 bg-green-500/10 blur-3xl"
            />
            <motion.div
                animate={ { y: [ 0, 15, 0 ] } }
                transition={ { duration: 8, repeat: Infinity } }
                className="absolute bottom-10 right-10 w-60 h-60 bg-green-400/10 blur-3xl"
            />

            <div className="h-px w-full bg-gradient-to-r from-transparent via-green-500/30 to-transparent mb-10" />

            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-center sm:text-left relative z-10">

                <motion.div
                    initial={ { opacity: 0, y: 30 } }
                    whileInView={ { opacity: 1, y: 0 } }
                >
                    <h2 className="text-xl font-bold text-green-400 flex items-center gap-2 justify-center sm:justify-start">
                        <FaCode className="text-[20px]" />
                        DevStack
                    </h2>

                    <p className="text-gray-400 text-sm mt-2 max-w-xs mx-auto sm:mx-0">
                        Analyze your GitHub profile, discover insights, and showcase your developer identity.
                    </p>

                    <p className="text-green-400 text-xs mt-4">
                        { time }
                    </p>
                </motion.div>

                <motion.div
                    initial={ { opacity: 0, y: 30 } }
                    whileInView={ { opacity: 1, y: 0 } }
                    transition={ { delay: 0.1 } }
                >
                    <h3 className="text-green-400 font-semibold mb-3 flex items-center gap-2 justify-center sm:justify-start">
                        <HiSparkles className={ iconClass } />
                        Quick Links
                    </h3>

                    <ul className="text-gray-400 text-sm space-y-2">
                        { [ "Home", "Features", "Analyze" ].map( ( item, i ) => (
                            <li
                                key={ i }
                                className="hover:text-green-400 transition cursor-pointer hover:translate-x-1"
                            >
                                { item }
                            </li>
                        ) ) }
                    </ul>
                </motion.div>

                <motion.div
                    initial={ { opacity: 0, y: 30 } }
                    whileInView={ { opacity: 1, y: 0 } }
                    transition={ { delay: 0.2 } }
                >
                    <h3 className="text-green-400 font-semibold mb-3 text-center sm:text-left">
                        Connect
                    </h3>

                    <div className="flex justify-center sm:justify-start gap-5">

                        { [ FaGithub, FaLinkedin, FaTwitter ].map( ( Icon, i ) => (
                            <motion.div
                                key={ i }
                                whileHover={ { scale: 1.15 } }
                                whileTap={ { scale: 0.9 } }
                                className="cursor-pointer text-gray-400 hover:text-green-400 transition"
                            >
                                <Icon className={ socialIconClass } />
                            </motion.div>
                        ) ) }

                    </div>
                </motion.div>

            </div>

            <div className="overflow-hidden mt-12 relative z-10">
                <motion.div
                    animate={ { x: [ "100%", "-100%" ] } }
                    transition={ { duration: 12, repeat: Infinity, ease: "linear" } }
                    className="whitespace-nowrap text-green-400 text-sm"
                >
                    DevStack • Analyze • Share • Grow • Build • Code • Repeat
                </motion.div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-gray-500 text-xs sm:text-sm gap-4 relative z-10">

                <p>© 2026 DevStack. All rights reserved.</p>

                <motion.p
                    animate={ { opacity: [ 0.5, 1, 0.5 ] } }
                    transition={ { duration: 2, repeat: Infinity } }
                    className="text-green-400 text-center"
                >
                    Building developer identity platforms
                </motion.p>

            </div>

        </footer>
    );
};

export default Footer;