import React, {
    useState,
    useEffect,
    useRef,
} from "react";

import {
    motion,
    AnimatePresence,
} from "framer-motion";

import {
    FaCode,
    FaHome,
    FaLayerGroup,
    FaTachometerAlt,
    FaUserCircle,
} from "react-icons/fa";

import {
    FiMenu,
    FiX,
    FiLogIn,
    FiUserPlus,
    FiLogOut,
} from "react-icons/fi";

import {
    Link,
    useNavigate,
    useLocation,
} from "react-router-dom";

import {
    useSelector,
    useDispatch,
} from "react-redux";

import { select } from "../../utils";

import { logout }
    from "../../store/slices/user.slice";

const iconClass =
    "text-[18px] shrink-0";

const Navbar = () => {

    const [ open, setOpen ] =
        useState( false );

    const [ show, setShow ] =
        useState( true );

    const user = useSelector(
        select( "user" )
    );

    const dispatch = useDispatch();

    const navigate =
        useNavigate();

    const location =
        useLocation();

    const lastScrollY =
        useRef( 0 );

    const links = [
        {
            name: "Home",
            icon: <FaHome />,
            path: "/",
        },

        {
            name: "Features",
            icon: <FaLayerGroup />,
            path: "/features",
        },

        ...( user?.name
            ? [
                {
                    name: "Dashboard",
                    icon:
                        <FaTachometerAlt />,
                    path: "/dashboard",
                },
            ]
            : [] ),
    ];

    // =====================================
    // 🔥 HIDE / SHOW NAVBAR
    // =====================================

    useEffect( () => {

        const handleScroll = () => {

            const currentScrollY =
                window.scrollY;

            if (
                currentScrollY < 50
            ) {

                setShow( true );

            }

            else if (
                currentScrollY >
                lastScrollY.current
            ) {

                setShow( false );

                // 🔥 CLOSE MOBILE MENU
                setOpen( false );

            }

            else {

                setShow( true );

            }

            lastScrollY.current =
                currentScrollY;

        };

        window.addEventListener(
            "scroll",
            handleScroll
        );

        return () =>
            window.removeEventListener(
                "scroll",
                handleScroll
            );

    }, [] );

    // =====================================
    // 🔥 LOGOUT
    // =====================================

    const handleLogout = () => {

        dispatch(
            logout( navigate )
        );

    };

    return (
        <>

            {/* =====================================
            🔥 NAVBAR
            ===================================== */}

            <motion.nav
                initial={ { y: 0 } }

                animate={ {
                    y: show
                        ? 0
                        : -100,
                } }

                transition={ {
                    duration: 0.3,
                } }

                className="fixed top-0 left-0 w-full z-50 backdrop-blur-3xl bg-black/40 border-b border-green-500/10 shadow-[0_0_40px_rgba(34,197,94,0.06)] overflow-hidden"
            >

                {/* 🔥 TOP GLOW */ }

                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-80 shadow-[0_0_12px_rgba(34,197,94,0.8)]" />

                {/* 🔥 GRID */ }

                <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#22c55e_1px,transparent_1px),linear-gradient(to_bottom,#22c55e_1px,transparent_1px)] bg-[size:40px_40px]" />

                {/* 🔥 GLOW */ }

                <div className="absolute top-0 right-0 w-72 h-72 bg-green-500/10 blur-3xl rounded-full" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between relative z-10">

                    {/* =====================================
                    🔥 LOGO
                    ===================================== */}

                    <Link
                        to="/"

                        className="group flex items-center gap-3 text-green-400 font-black text-2xl tracking-wide"
                    >

                        <div className="relative w-11 h-11 rounded-full bg-gradient-to-br from-black via-[#052e16] to-[#22c55e]/30 border border-green-500/20 flex items-center justify-center shadow-[0_0_25px_rgba(34,197,94,0.3)] overflow-hidden">

                            <div className="absolute inset-0 bg-green-500/10 blur-xl" />

                            <FaCode className="relative z-10 text-[20px] text-green-400 drop-shadow-[0_0_10px_rgba(34,197,94,0.8)]" />

                        </div>

                        <span className="bg-gradient-to-r from-green-300 via-green-400 to-green-500 bg-clip-text text-transparent tracking-tight">

                            DevStack

                        </span>

                    </Link>

                    {/* =====================================
                    🔥 DESKTOP LINKS
                    ===================================== */}

                    <div className="hidden md:flex items-center gap-3">

                        { links.map(
                            (
                                link,
                                i
                            ) => {

                                const isActive =
                                    location.pathname ===
                                    link.path;

                                return (

                                    <Link
                                        key={ i }
                                        to={
                                            link.path
                                        }
                                    >

                                        <motion.div
                                            whileHover={ {
                                                y: -2,
                                                scale: 1.02,
                                            } }

                                            className={ `
                                            relative overflow-hidden
                                            flex items-center gap-2
                                            px-5 py-3
                                            rounded-full
                                            transition-all duration-300
                                            border

                                            ${isActive
                                                    ? `
                                            text-green-400
                                            bg-gradient-to-r from-black via-[#052e16] to-[#22c55e]/10
                                            border-green-500/20
                                            shadow-[0_0_25px_rgba(34,197,94,0.18)]
                                            `
                                                    : `
                                            text-gray-300
                                            border-transparent
                                            hover:text-green-400
                                            hover:bg-green-500/5
                                            hover:border-green-500/10
                                            `
                                                }
                                            `}
                                        >

                                            { isActive && (

                                                <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-transparent to-transparent pointer-events-none" />

                                            ) }

                                            <span
                                                className={ `
                                                relative z-10
                                                ${iconClass}

                                                ${isActive
                                                        ? `
                                                text-green-400
                                                drop-shadow-[0_0_10px_rgba(34,197,94,0.8)]
                                                `
                                                        : `
                                                text-gray-400
                                                `
                                                    }
                                                `}
                                            >

                                                { link.icon }

                                            </span>

                                            <span className="relative z-10 font-medium text-sm tracking-wide">

                                                { link.name }

                                            </span>

                                        </motion.div>

                                    </Link>

                                );

                            }
                        ) }

                    </div>

                    {/* =====================================
                    🔥 AUTH
                    ===================================== */}

                    <div className="hidden md:flex items-center gap-4">

                        { user?.name ? (

                            <motion.div
                                whileHover={ {
                                    y: -2,
                                } }

                                className="relative overflow-hidden flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-black via-[#04130c] to-[#052e16]/60 border border-green-500/10 shadow-[0_0_30px_rgba(34,197,94,0.06)]"
                            >

                                <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-transparent to-transparent pointer-events-none" />

                                { user?.profile_image ? (

                                    <div className="relative">

                                        <div className="absolute inset-0 bg-green-500 blur-xl opacity-30 rounded-full" />

                                        <img
                                            src={
                                                user.profile_image
                                            }

                                            alt="profile"

                                            className="relative w-10 h-10 rounded-full object-cover border border-green-400 shadow-[0_0_20px_rgba(34,197,94,0.3)]"
                                        />

                                    </div>

                                ) : (

                                    <FaUserCircle className="text-[28px] text-green-400 drop-shadow-[0_0_10px_rgba(34,197,94,0.8)]" />

                                ) }

                                <span className="relative z-10 text-sm text-green-400 font-medium tracking-wide">

                                    { user?.name }

                                </span>

                                <button
                                    onClick={
                                        handleLogout
                                    }

                                    className="relative z-10 text-gray-400 hover:text-red-400 transition"
                                >

                                    <FiLogOut className="text-[18px]" />

                                </button>

                            </motion.div>

                        ) : (

                            <>

                                <motion.button
                                    whileHover={ {
                                        scale: 1.04,
                                        y: -2,
                                    } }

                                    onClick={ () =>
                                        navigate(
                                            "/login"
                                        )
                                    }

                                    className="flex items-center gap-2 px-5 py-3 rounded-full border border-green-500/20 bg-black/30 text-gray-300 hover:text-green-400 hover:border-green-400/40 hover:bg-green-500/5 transition shadow-[0_0_20px_rgba(34,197,94,0.08)]"
                                >

                                    <FiLogIn className="text-green-400" />

                                    Login

                                </motion.button>

                                <motion.button
                                    whileHover={ {
                                        scale: 1.05,
                                        y: -2,
                                    } }

                                    onClick={ () =>
                                        navigate(
                                            "/signup"
                                        )
                                    }

                                    className="relative overflow-hidden flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#14532d] via-[#22c55e] to-[#4ade80] text-black font-semibold shadow-[0_0_30px_rgba(34,197,94,0.35)]"
                                >

                                    <motion.div
                                        animate={ {
                                            x: [
                                                "-100%",
                                                "220%",
                                            ],
                                        } }

                                        transition={ {
                                            repeat: Infinity,
                                            duration: 3,
                                            ease: "linear",
                                        } }

                                        className="absolute top-0 left-0 h-full w-16 bg-white/20 blur-md rotate-12"
                                    />

                                    <FiUserPlus />

                                    <span className="relative z-10">

                                        Sign Up

                                    </span>

                                </motion.button>

                            </>

                        ) }

                    </div>

                    {/* =====================================
                    🔥 MOBILE MENU BUTTON
                    ===================================== */}

                    <div className="md:hidden">

                        <motion.button
                            whileTap={ {
                                scale: 0.92,
                            } }

                            onClick={ () =>
                                setOpen(
                                    !open
                                )
                            }

                            className="relative w-11 h-11 rounded-full bg-gradient-to-br from-black via-[#052e16] to-[#22c55e]/20 border border-green-500/20 flex items-center justify-center text-green-400 shadow-[0_0_20px_rgba(34,197,94,0.15)]"
                        >

                            { open
                                ? <FiX className="text-[24px]" />
                                : <FiMenu className="text-[24px]" />
                            }

                        </motion.button>

                    </div>

                </div>

            </motion.nav>

            {/* =====================================
            🔥 MOBILE DROPDOWN
            ===================================== */}
            <AnimatePresence>

                { open && (

                    <motion.div
                        initial={ {
                            opacity: 0,
                            y: -15,
                        } }

                        animate={ {
                            opacity: 1,
                            y: 0,
                        } }

                        exit={ {
                            opacity: 0,
                            y: -15,
                        } }

                        transition={ {
                            duration: 0.22,
                        } }

                        className="
            md:hidden
            fixed
            top-[78px]
            left-0
            w-full
            z-40
            px-5
            "
                    >

                        <div className="
            relative
            overflow-hidden
            rounded-b-[30px]
            border-b border-green-500/10
            bg-black/90
            backdrop-blur-3xl
            pb-5
            ">

                            {/* GRID */ }

                            <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#22c55e_1px,transparent_1px),linear-gradient(to_bottom,#22c55e_1px,transparent_1px)] bg-[size:40px_40px]" />

                            {/* GLOW */ }

                            <div className="absolute top-0 right-0 w-52 h-52 bg-green-500/10 blur-3xl rounded-full" />

                            <div className="relative z-10 pt-3">

                                {/* =====================================
                    🔥 SIMPLE CENTER LINKS
                    ===================================== */}

                                <div className="flex flex-col items-center pl-4">

                                    { links.map( ( link, i ) => {

                                        const isActive =
                                            location.pathname ===
                                            link.path;

                                        return (

                                            <Link
                                                key={ i }
                                                to={ link.path }

                                                onClick={ () =>
                                                    setOpen( false )
                                                }

                                                className="block"
                                            >

                                                <motion.div
                                                    whileTap={ {
                                                        scale: 0.98,
                                                    } }

                                                    className={ `
                                        relative
                                        flex items-center justify-center gap-3
                                        py-3
                                        transition-all duration-300

                                        ${isActive
                                                            ? `
                                        text-green-400
                                        `
                                                            : `
                                        text-gray-400
                                        hover:text-green-400
                                        `
                                                        }
                                        `}
                                                >

                                                    {/* ACTIVE LINE */ }

                                                    { isActive && (

                                                        <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-[3px] h-6 rounded-full bg-green-400 shadow-[0_0_12px_rgba(34,197,94,0.9)]" />

                                                    ) }

                                                    {/* ICON */ }

                                                    <div className={ `
                                        text-[18px]

                                        ${isActive
                                                            ? `
                                        text-green-400
                                        drop-shadow-[0_0_10px_rgba(34,197,94,0.8)]
                                        `
                                                            : `
                                        text-gray-500
                                        `
                                                        }
                                        `}>

                                                        { link.icon }

                                                    </div>

                                                    {/* TEXT */ }

                                                    <span className="text-sm tracking-wide font-medium">

                                                        { link.name }

                                                    </span>

                                                </motion.div>

                                            </Link>

                                        );

                                    } ) }

                                </div>

                                {/* =====================================
                    🔥 AUTH LINKS
                    ===================================== */}

                                { !user?.name && (

                                    <div className="mt-4 pt-4 border-t border-green-500/10 flex flex-col items-center gap-4">

                                        {/* LOGIN */ }

                                        <button
                                            onClick={ () => {

                                                navigate( "/login" );

                                                setOpen( false );

                                            } }

                                            className="
                                flex items-center gap-2
                                text-sm text-gray-400
                                hover:text-green-400
                                transition-all duration-300
                                "
                                        >

                                            <FiLogIn className="text-[16px]" />

                                            Login

                                        </button>

                                        {/* SIGNUP */ }

                                        <button
                                            onClick={ () => {

                                                navigate( "/signup" );

                                                setOpen( false );

                                            } }

                                            className="
                                flex items-center gap-2
                                text-sm text-green-400
                                hover:text-green-300
                                transition-all duration-300
                                "
                                        >

                                            <FiUserPlus className="text-[16px]" />

                                            Sign Up

                                        </button>

                                    </div>

                                ) }

                            </div>

                        </div>

                    </motion.div>

                ) }

            </AnimatePresence>

        </>
    );
};

export default Navbar;