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
    FaRocket,
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

        {
            name: "Analyze",
            icon: <FaRocket />,
            path: "/analyze",
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

    // =====================================
    // 🔥 JSX
    // =====================================

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

                className="fixed top-0 left-0 w-full z-50 backdrop-blur-2xl bg-black/40 border-b border-green-500/10"
            >

                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">

                    {/* =====================================
                    🔥 LOGO
                    ===================================== */}

                    <Link
                        to="/"

                        className="flex items-center gap-2 text-green-400 font-black text-xl tracking-wide"
                    >

                        <FaCode className="text-[22px] drop-shadow-[0_0_10px_rgba(34,197,94,0.8)]" />

                        DevStack

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
                                        key={
                                            i
                                        }

                                        to={
                                            link.path
                                        }
                                    >

                                        <motion.div
                                            whileHover={ {
                                                y: -2,
                                            } }

                                            className={ `
                                            relative flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300

                                            ${isActive
                                                    ? `
                                            text-green-400
                                            bg-green-500/10
                                            border border-green-500/20
                                            shadow-[0_0_25px_rgba(34,197,94,0.18)]
                                            `
                                                    : `
                                            text-gray-300
                                            hover:text-green-400
                                            hover:bg-green-500/5
                                            `
                                                }
                                            `
                                            }
                                        >

                                            {/* ICON */ }
                                            <span className={ `
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
                                            `
                                            }
                                            >

                                                {
                                                    link.icon
                                                }

                                            </span>

                                            {/* TEXT */ }
                                            <span className="font-medium text-sm">

                                                {
                                                    link.name
                                                }

                                            </span>

                                            {/* ACTIVE DOT */ }
                                            { isActive && (

                                                <motion.div
                                                    layoutId="active-pill"

                                                    className="absolute -bottom-[2px] left-1/2 -translate-x-1/2 w-10 h-[2px] bg-green-400 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.9)]"
                                                />

                                            ) }

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

                            <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-black/40 border border-green-500/10 shadow-[0_0_30px_rgba(34,197,94,0.06)]">

                                { user?.profile_image ? (

                                    <img
                                        src={
                                            user.profile_image
                                        }

                                        alt="profile"

                                        className="w-9 h-9 rounded-full object-cover border border-green-400 shadow-[0_0_20px_rgba(34,197,94,0.3)]"
                                    />

                                ) : (

                                    <FaUserCircle className="text-[24px] text-green-400" />

                                ) }

                                <span className="text-sm text-green-400 font-medium">

                                    {
                                        user?.name
                                    }

                                </span>

                                <button
                                    onClick={
                                        handleLogout
                                    }

                                    className="text-gray-400 hover:text-red-400 transition"
                                >

                                    <FiLogOut className="text-[18px]" />

                                </button>

                            </div>

                        ) : (

                            <>

                                {/* LOGIN */ }
                                <motion.button
                                    whileHover={ {
                                        scale: 1.04,
                                    } }

                                    onClick={ () =>
                                        navigate(
                                            "/login"
                                        )
                                    }

                                    className="flex items-center gap-2 px-4 py-2 rounded-xl border border-green-500/20 text-gray-300 hover:text-green-400 hover:border-green-400/40 transition"
                                >

                                    <FiLogIn className="text-green-400" />

                                    Login

                                </motion.button>

                                {/* SIGNUP */ }
                                <motion.button
                                    whileHover={ {
                                        scale: 1.05,
                                    } }

                                    onClick={ () =>
                                        navigate(
                                            "/signup"
                                        )
                                    }

                                    className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-green-500 to-green-400 text-black font-semibold shadow-[0_0_25px_rgba(34,197,94,0.3)]"
                                >

                                    <FiUserPlus />

                                    Sign Up

                                </motion.button>

                            </>

                        ) }

                    </div>

                    {/* =====================================
                    🔥 MOBILE MENU BTN
                    ===================================== */}

                    <div className="md:hidden text-green-400">

                        <button
                            onClick={ () =>
                                setOpen(
                                    !open
                                )
                            }
                        >

                            { open
                                ? <FiX className="text-[24px]" />
                                : <FiMenu className="text-[24px]" />
                            }

                        </button>

                    </div>

                </div>

            </motion.nav>

        </>
    );
};

export default Navbar;