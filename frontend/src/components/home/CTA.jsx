import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { FiArrowRight } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi";

gsap.registerPlugin( ScrollTrigger );

const iconClass = "text-[18px] text-green-400";

const CTA = () => {
    const sectionRef = useRef( null );

    useEffect( () => {
        const ctx = gsap.context( () => {

            gsap.from( [ ".cta-heading", ".cta-subtext" ], {
                opacity: 0,
                y: 40,
                stagger: 0.2,
                duration: 0.6,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 90%",
                    end: "top 60%",
                    scrub: 1,
                },
            } );

            gsap.from( ".cta-btn", {
                opacity: 0,
                scale: 0.85,
                duration: 0.5,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".cta-btn",
                    start: "top 95%",
                    toggleActions: "play none none none",
                },
            } );

            gsap.to( ".cta-btn", {
                boxShadow: "0 0 50px rgba(34,197,94,0.7)",
                repeat: 1,
                yoyo: true,
                duration: 0.4,
                scrollTrigger: {
                    trigger: ".cta-btn",
                    start: "top 90%",
                },
            } );

        }, sectionRef );

        return () => ctx.revert();
    }, [] );

    return (
        <section
            ref={ sectionRef }
            className="min-h-screen flex flex-col justify-center items-center text-center px-4 sm:px-6 bg-black text-white relative overflow-hidden"
        >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.15),transparent_60%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,0.95))]" />

            <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/10 blur-3xl" />
            <div className="absolute bottom-20 right-10 w-72 h-72 bg-green-400/10 blur-3xl" />

            <div className="relative z-10 max-w-3xl">

                <motion.h2
                    initial={ { opacity: 0 } }
                    whileInView={ { opacity: 1 } }
                    className="cta-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-6"
                >
                    <span className="text-green-400 drop-shadow-[0_0_20px_rgba(34,197,94,0.8)]">
                        Ready to Analyze Your Developer Profile
                    </span>
                </motion.h2>

                <p className="cta-subtext text-gray-400 text-sm sm:text-base md:text-lg mb-8 flex items-center justify-center gap-2 flex-wrap">
                    <HiSparkles className={ iconClass } />
                    Discover insights from your GitHub profile and showcase your developer identity
                </p>

                <div className="relative group inline-block">

                    <div className="absolute -inset-[2px] rounded-xl bg-gradient-to-r from-green-500 via-green-400 to-green-500 blur-md opacity-70 group-hover:opacity-100 transition" />

                    <button
                        className="cta-btn relative flex items-center gap-3 px-8 py-4 bg-green-500 hover:bg-green-600 rounded-xl text-lg font-semibold transition
            shadow-[0_0_30px_rgba(34,197,94,0.4)]
            group-hover:shadow-[0_0_70px_rgba(34,197,94,0.7)]
            transform group-hover:scale-105"
                    >
                        Analyze Now
                        <FiArrowRight className="text-[18px]" />
                    </button>

                </div>

                <p className="mt-6 text-gray-500 text-xs sm:text-sm">
                    Instant analysis • No signup required • Free access
                </p>

            </div>
        </section>
    );
};

export default CTA;