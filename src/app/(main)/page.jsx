"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { productAPI } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import {
    HiOutlineCodeBracket,
    HiOutlineBolt,
    HiOutlineShieldCheck,
    HiOutlineArrowDownTray,
    HiOutlineRocketLaunch,
    HiOutlineStar,
    HiOutlineCurrencyRupee,
    HiOutlineUsers,
    HiOutlineArrowRight,
    HiOutlineCheckCircle,
    HiOutlinePlay,
    HiOutlineSparkles,
    HiOutlineGlobeAlt,
    HiOutlineCommandLine,
    HiOutlineCpuChip,
    HiOutlineBeaker,
} from "react-icons/hi2";
import {
    FiPackage,
    FiZap,
    FiLock,
    FiDownload,
    FiGithub,
    FiCode,
    FiLayers,
    FiTerminal,
    FiDatabase,
    FiSmartphone,
    FiMonitor,
    FiServer,
} from "react-icons/fi";

/* ───── Animated Counter Hook ───── */
function useCounter(target, duration = 2000) {
    const [count, setCount] = useState(0);
    const [started, setStarted] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !started) {
                    setStarted(true);
                }
            },
            { threshold: 0.5 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [started]);

    useEffect(() => {
        if (!started) return;
        const num = parseInt(target.replace(/[^0-9]/g, "")) || 0;
        const step = num / (duration / 16);
        let current = 0;
        const timer = setInterval(() => {
            current += step;
            if (current >= num) {
                setCount(num);
                clearInterval(timer);
            } else {
                setCount(Math.floor(current));
            }
        }, 16);
        return () => clearInterval(timer);
    }, [started, target, duration]);

    const suffix = target.includes("+") ? "+" : "";
    const prefix = target.includes("₹") ? "₹" : "";
    const hasDecimal = target.includes(".");

    return {
        ref,
        value: hasDecimal
            ? (count / 10).toFixed(1)
            : `${prefix}${count.toLocaleString()}${suffix}`,
    };
}

/* ───── Floating Particles Component ───── */
// FloatingParticles should only render on client to avoid hydration mismatches
function FloatingParticles() {
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        // generate once on mount
        const arr = [...Array(20)].map((_, i) => {
            const size = Math.random() * 4 + 2;
            return {
                key: i,
                width: `${size}px`,
                height: `${size}px`,
                color: i % 3 === 0 ? "239,68,68" : i % 3 === 1 ? "139,92,246" : "249,115,22",
                alpha: Math.random() * 0.3 + 0.1,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                duration: Math.random() * 10 + 10,
                delay: Math.random() * 5,
            };
        });
        setParticles(arr);
    }, []);

    if (particles.length === 0) return null; // don't render on server

    return (
        <div
            style={{
                position: "absolute",
                inset: 0,
                overflow: "hidden",
                pointerEvents: "none",
            }}
        >
            {particles.map((p) => (
                <div
                    key={p.key}
                    style={{
                        position: "absolute",
                        width: p.width,
                        height: p.height,
                        borderRadius: "50%",
                        background: `rgba(${p.color}, ${p.alpha})`,
                        left: p.left,
                        top: p.top,
                        animation: `floatParticle ${p.duration}s ease-in-out infinite`,
                        animationDelay: `${p.delay}s`,
                    }}
                />
            ))}
        </div>
    );
}

/* ───── Hero SVG Illustration ───── */
function HeroSVG() {
    return (
        <svg
            viewBox="0 0 500 400"
            fill="none"
            style={{
                width: "100%",
                maxWidth: "480px",
                height: "auto",
                filter: "drop-shadow(0 0 40px rgba(239,68,68,0.15))",
            }}
        >
            {/* Background Glow */}
            <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ef4444" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.1" />
                </linearGradient>
                <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ef4444" />
                    <stop offset="100%" stopColor="#f97316" />
                </linearGradient>
                <linearGradient id="grad3" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#22c55e" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#22c55e" stopOpacity="0.2" />
                </linearGradient>
                <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
            </defs>

            {/* Monitor */}
            <rect
                x="80"
                y="40"
                width="340"
                height="220"
                rx="16"
                fill="rgba(15,15,25,0.9)"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="2"
            >
                <animate
                    attributeName="y"
                    values="40;35;40"
                    dur="4s"
                    repeatCount="indefinite"
                />
            </rect>

            {/* Screen */}
            <rect
                x="95"
                y="55"
                width="310"
                height="185"
                rx="8"
                fill="rgba(10,10,20,0.95)"
            >
                <animate
                    attributeName="y"
                    values="55;50;55"
                    dur="4s"
                    repeatCount="indefinite"
                />
            </rect>

            {/* Code Lines */}
            <g filter="url(#glow)">
                <rect x="115" y="80" width="80" height="8" rx="4" fill="#ef4444" opacity="0.8">
                    <animate attributeName="width" values="0;80" dur="1.5s" fill="freeze" />
                    <animate attributeName="y" values="75;80;75" dur="4s" repeatCount="indefinite" />
                </rect>
                <rect x="205" y="80" width="120" height="8" rx="4" fill="#8b5cf6" opacity="0.5">
                    <animate attributeName="width" values="0;120" dur="1.8s" fill="freeze" />
                    <animate attributeName="y" values="75;80;75" dur="4s" repeatCount="indefinite" />
                </rect>

                <rect x="115" y="100" width="40" height="8" rx="4" fill="#f59e0b" opacity="0.6">
                    <animate attributeName="width" values="0;40" dur="2s" fill="freeze" />
                    <animate attributeName="y" values="95;100;95" dur="4s" repeatCount="indefinite" />
                </rect>
                <rect x="165" y="100" width="160" height="8" rx="4" fill="#22c55e" opacity="0.4">
                    <animate attributeName="width" values="0;160" dur="2.2s" fill="freeze" />
                    <animate attributeName="y" values="95;100;95" dur="4s" repeatCount="indefinite" />
                </rect>

                <rect x="135" y="120" width="180" height="8" rx="4" fill="#ef4444" opacity="0.3">
                    <animate attributeName="width" values="0;180" dur="2.5s" fill="freeze" />
                    <animate attributeName="y" values="115;120;115" dur="4s" repeatCount="indefinite" />
                </rect>

                <rect x="135" y="140" width="100" height="8" rx="4" fill="#8b5cf6" opacity="0.5">
                    <animate attributeName="width" values="0;100" dur="2.8s" fill="freeze" />
                    <animate attributeName="y" values="135;140;135" dur="4s" repeatCount="indefinite" />
                </rect>
                <rect x="245" y="140" width="60" height="8" rx="4" fill="#f97316" opacity="0.4">
                    <animate attributeName="width" values="0;60" dur="3s" fill="freeze" />
                    <animate attributeName="y" values="135;140;135" dur="4s" repeatCount="indefinite" />
                </rect>

                <rect x="115" y="160" width="70" height="8" rx="4" fill="#22c55e" opacity="0.6">
                    <animate attributeName="width" values="0;70" dur="3.2s" fill="freeze" />
                    <animate attributeName="y" values="155;160;155" dur="4s" repeatCount="indefinite" />
                </rect>
                <rect x="195" y="160" width="140" height="8" rx="4" fill="#ef4444" opacity="0.3">
                    <animate attributeName="width" values="0;140" dur="3.5s" fill="freeze" />
                    <animate attributeName="y" values="155;160;155" dur="4s" repeatCount="indefinite" />
                </rect>

                <rect x="135" y="180" width="200" height="8" rx="4" fill="#f59e0b" opacity="0.3">
                    <animate attributeName="width" values="0;200" dur="3.8s" fill="freeze" />
                    <animate attributeName="y" values="175;180;175" dur="4s" repeatCount="indefinite" />
                </rect>

                <rect x="115" y="200" width="50" height="8" rx="4" fill="#8b5cf6" opacity="0.5">
                    <animate attributeName="width" values="0;50" dur="4s" fill="freeze" />
                    <animate attributeName="y" values="195;200;195" dur="4s" repeatCount="indefinite" />
                </rect>
            </g>

            {/* Cursor Blink */}
            <rect x="175" y="200" width="2" height="12" fill="#ef4444">
                <animate
                    attributeName="opacity"
                    values="1;0;1"
                    dur="1s"
                    repeatCount="indefinite"
                />
                <animate
                    attributeName="y"
                    values="195;200;195"
                    dur="4s"
                    repeatCount="indefinite"
                />
            </rect>

            {/* Line Numbers */}
            {[80, 100, 120, 140, 160, 180, 200].map((y, i) => (
                <text
                    key={i}
                    x="105"
                    y={y + 7}
                    fill="rgba(255,255,255,0.15)"
                    fontSize="8"
                    fontFamily="monospace"
                >
                    <animate
                        attributeName="y"
                        values={`${y + 2};${y + 7};${y + 2}`}
                        dur="4s"
                        repeatCount="indefinite"
                    />
                    {i + 1}
                </text>
            ))}

            {/* Monitor Stand */}
            <rect x="210" y="265" width="80" height="15" rx="4" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.08)" strokeWidth="1">
                <animate attributeName="y" values="260;265;260" dur="4s" repeatCount="indefinite" />
            </rect>
            <rect x="190" y="280" width="120" height="8" rx="4" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" strokeWidth="1">
                <animate attributeName="y" values="275;280;275" dur="4s" repeatCount="indefinite" />
            </rect>

            {/* Floating Elements */}
            <g>
                <circle cx="60" cy="120" r="20" fill="url(#grad1)" stroke="rgba(239,68,68,0.2)" strokeWidth="1">
                    <animate attributeName="cy" values="120;100;120" dur="3s" repeatCount="indefinite" />
                </circle>
                <text x="54" y="124" fill="#ef4444" fontSize="16" fontFamily="monospace">
                    <animate attributeName="y" values="124;104;124" dur="3s" repeatCount="indefinite" />
                    {"</>"}
                </text>
            </g>

            <g>
                <circle cx="440" cy="100" r="18" fill="rgba(139,92,246,0.15)" stroke="rgba(139,92,246,0.2)" strokeWidth="1">
                    <animate attributeName="cy" values="100;115;100" dur="3.5s" repeatCount="indefinite" />
                </circle>
                <text x="431" y="105" fill="#8b5cf6" fontSize="14" fontFamily="monospace">
                    <animate attributeName="y" values="105;120;105" dur="3.5s" repeatCount="indefinite" />
                    {"{ }"}
                </text>
            </g>

            <g>
                <circle cx="440" cy="220" r="15" fill="rgba(34,197,94,0.15)" stroke="rgba(34,197,94,0.2)" strokeWidth="1">
                    <animate attributeName="cy" values="220;205;220" dur="4s" repeatCount="indefinite" />
                </circle>
                <text x="433" y="224" fill="#22c55e" fontSize="12" fontFamily="monospace">
                    <animate attributeName="y" values="224;209;224" dur="4s" repeatCount="indefinite" />
                    {"✓"}
                </text>
            </g>

            {/* Floating Download Icon */}
            <g>
                <rect x="40" y="220" width="36" height="36" rx="10" fill="rgba(249,115,22,0.12)" stroke="rgba(249,115,22,0.2)" strokeWidth="1">
                    <animate attributeName="y" values="220;210;220" dur="5s" repeatCount="indefinite" />
                </rect>
                <text x="50" y="243" fill="#f97316" fontSize="16" textAnchor="middle">
                    <animate attributeName="y" values="243;233;243" dur="5s" repeatCount="indefinite" />
                    ↓
                </text>
            </g>

            {/* Connection Lines */}
            <line x1="60" y1="140" x2="80" y2="150" stroke="rgba(239,68,68,0.15)" strokeWidth="1" strokeDasharray="4,4">
                <animate attributeName="stroke-dashoffset" values="0;8" dur="1s" repeatCount="indefinite" />
            </line>
            <line x1="420" y1="115" x2="400" y2="130" stroke="rgba(139,92,246,0.15)" strokeWidth="1" strokeDasharray="4,4">
                <animate attributeName="stroke-dashoffset" values="0;8" dur="1s" repeatCount="indefinite" />
            </line>
        </svg>
    );
}

/* ───── Tech Marquee ───── */
function TechMarquee() {
    const techs = [
        { name: "React", icon: FiCode, color: "#61dafb" },
        { name: "Next.js", icon: FiLayers, color: "#fff" },
        { name: "Node.js", icon: FiServer, color: "#68a063" },
        { name: "MongoDB", icon: FiDatabase, color: "#4db33d" },
        { name: "React Native", icon: FiSmartphone, color: "#61dafb" },
        { name: "TypeScript", icon: FiTerminal, color: "#3178c6" },
        { name: "Python", icon: HiOutlineCommandLine, color: "#ffd43b" },
        { name: "Flutter", icon: FiSmartphone, color: "#02569b" },
        { name: "AWS", icon: HiOutlineCpuChip, color: "#ff9900" },
        { name: "Docker", icon: FiMonitor, color: "#2496ed" },
        { name: "GraphQL", icon: HiOutlineBeaker, color: "#e535ab" },
        { name: "Firebase", icon: HiOutlineGlobeAlt, color: "#ffca28" },
    ];

    const doubled = [...techs, ...techs];

    return (
        <div
            style={{
                overflow: "hidden",
                padding: "40px 0",
                position: "relative",
            }}
        >
            <div
                style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: "100px",
                    background:
                        "linear-gradient(90deg, #050508, transparent)",
                    zIndex: 2,
                    pointerEvents: "none",
                }}
            />
            <div
                style={{
                    position: "absolute",
                    right: 0,
                    top: 0,
                    bottom: 0,
                    width: "100px",
                    background:
                        "linear-gradient(270deg, #050508, transparent)",
                    zIndex: 2,
                    pointerEvents: "none",
                }}
            />
            <div
                style={{
                    display: "flex",
                    gap: "16px",
                    animation: "marquee 30s linear infinite",
                    width: "max-content",
                }}
            >
                {doubled.map((t, i) => {
                    const TIcon = t.icon;
                    return (
                        <div
                            key={i}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                padding: "10px 20px",
                                borderRadius: "12px",
                                background: "rgba(255,255,255,0.02)",
                                border: "1px solid rgba(255,255,255,0.05)",
                                backdropFilter: "blur(10px)",
                                whiteSpace: "nowrap",
                                flexShrink: 0,
                                transition: "all 0.3s",
                            }}
                        >
                            <TIcon style={{ color: t.color, fontSize: "16px" }} />
                            <span
                                style={{
                                    color: "#94a3b8",
                                    fontSize: "13px",
                                    fontWeight: 500,
                                }}
                            >
                                {t.name}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

/* ═══════════════════════ MAIN PAGE ═══════════════════════ */

export default function HomePage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        productAPI.getAll().then((res) => {
            if (res.success)
                setProducts((res.products || res.data || []).slice(0, 6));
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        const handleMouse = (e) => {
            setMousePos({
                x: (e.clientX / window.innerWidth - 0.5) * 20,
                y: (e.clientY / window.innerHeight - 0.5) * 20,
            });
        };
        window.addEventListener("mousemove", handleMouse);
        return () => window.removeEventListener("mousemove", handleMouse);
    }, []);

    const features = [
        {
            icon: FiPackage,
            title: "Premium Code",
            desc: "Hand-crafted, production-ready source code packages built by experts",
            color: "#ef4444",
            svg: (
                <svg viewBox="0 0 60 60" fill="none" style={{ width: 40, height: 40 }}>
                    <rect x="10" y="15" width="40" height="30" rx="4" stroke="#ef4444" strokeWidth="1.5" opacity="0.6">
                        <animate attributeName="stroke-dasharray" values="0,200;200,0" dur="3s" fill="freeze" />
                    </rect>
                    <path d="M20 30L27 37L40 24" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <animate attributeName="stroke-dasharray" values="0,50;50,0" dur="2s" fill="freeze" />
                    </path>
                </svg>
            ),
        },
        {
            icon: FiZap,
            title: "Instant Access",
            desc: "Download immediately after purchase with zero waiting time",
            color: "#f59e0b",
            svg: (
                <svg viewBox="0 0 60 60" fill="none" style={{ width: 40, height: 40 }}>
                    <path d="M30 10L15 32H28L25 50L45 28H32L35 10Z" stroke="#f59e0b" strokeWidth="1.5" strokeLinejoin="round">
                        <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
                    </path>
                </svg>
            ),
        },
        {
            icon: FiLock,
            title: "Secure Payment",
            desc: "Bank-grade encryption with Cashfree secure payment gateway",
            color: "#22c55e",
            svg: (
                <svg viewBox="0 0 60 60" fill="none" style={{ width: 40, height: 40 }}>
                    <rect x="15" y="25" width="30" height="22" rx="4" stroke="#22c55e" strokeWidth="1.5" opacity="0.6" />
                    <path d="M22 25V20C22 15.58 25.58 12 30 12C34.42 12 38 15.58 38 20V25" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round">
                        <animate attributeName="stroke-dasharray" values="0,80;80,0" dur="2s" fill="freeze" />
                    </path>
                    <circle cx="30" cy="36" r="3" fill="#22c55e" opacity="0.8">
                        <animate attributeName="r" values="2;3;2" dur="1.5s" repeatCount="indefinite" />
                    </circle>
                </svg>
            ),
        },
        {
            icon: FiDownload,
            title: "Lifetime Access",
            desc: "Buy once, download forever with free updates and support",
            color: "#8b5cf6",
            svg: (
                <svg viewBox="0 0 60 60" fill="none" style={{ width: 40, height: 40 }}>
                    <path d="M30 10V38" stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round">
                        <animate attributeName="stroke-dasharray" values="0,30;30,0" dur="1.5s" repeatCount="indefinite" />
                    </path>
                    <path d="M22 30L30 38L38 30" stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <animate attributeName="opacity" values="0.4;1;0.4" dur="1.5s" repeatCount="indefinite" />
                    </path>
                    <path d="M15 45H45" stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
                </svg>
            ),
        },
    ];

    const stats = [
        {
            value: "10+",
            label: "Source Codes",
            color: "#ef4444",
            icon: HiOutlineCodeBracket,
        },
        {
            value: "50+",
            label: "Happy Customers",
            color: "#22c55e",
            icon: HiOutlineUsers,
        },
        {
            value: "4.8",
            label: "Avg Rating",
            color: "#f59e0b",
            icon: HiOutlineStar,
        },
        {
            value: "₹99",
            label: "Starting From",
            color: "#8b5cf6",
            icon: HiOutlineCurrencyRupee,
        },
    ];

    /* ---- Counter Hooks ---- */
    const counter0 = useCounter(stats[0].value);
    const counter1 = useCounter(stats[1].value);
    const counter2 = useCounter(stats[2].value);
    const counter3 = useCounter(stats[3].value);
    const counters = [counter0, counter1, counter2, counter3];

    return (
        <>
            {/* ═══════ HERO ═══════ */}
            <section
                style={{
                    position: "relative",
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "80px 16px 40px",
                    overflow: "hidden",
                }}
            >
                <FloatingParticles />

                {/* Grid Background */}
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        backgroundImage:
                            "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
                        backgroundSize: "60px 60px",
                        maskImage:
                            "radial-gradient(ellipse 80% 60% at 50% 50%, black 40%, transparent 100%)",
                        WebkitMaskImage:
                            "radial-gradient(ellipse 80% 60% at 50% 50%, black 40%, transparent 100%)",
                        pointerEvents: "none",
                    }}
                />

                {/* Animated Glow Orbs */}
                <div
                    style={{
                        position: "absolute",
                        top: "10%",
                        left: "15%",
                        width: "400px",
                        height: "400px",
                        borderRadius: "50%",
                        opacity: 0.12,
                        filter: "blur(80px)",
                        background: "radial-gradient(circle, #ef4444, transparent)",
                        pointerEvents: "none",
                        animation: "pulseGlow 6s ease-in-out infinite",
                        transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)`,
                        transition: "transform 0.3s ease-out",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        bottom: "10%",
                        right: "10%",
                        width: "500px",
                        height: "500px",
                        borderRadius: "50%",
                        opacity: 0.08,
                        filter: "blur(80px)",
                        background: "radial-gradient(circle, #8b5cf6, transparent)",
                        pointerEvents: "none",
                        animation: "pulseGlow 8s ease-in-out infinite 2s",
                        transform: `translate(${mousePos.x * -0.3}px, ${mousePos.y * -0.3}px)`,
                        transition: "transform 0.3s ease-out",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: `translate(-50%, -50%) translate(${mousePos.x * 0.2}px, ${mousePos.y * 0.2}px)`,
                        width: "600px",
                        height: "600px",
                        borderRadius: "50%",
                        opacity: 0.05,
                        filter: "blur(100px)",
                        background: "radial-gradient(circle, #f97316, transparent)",
                        pointerEvents: "none",
                        transition: "transform 0.3s ease-out",
                    }}
                />

                {/* Hero Content */}
                <div
                    style={{
                        position: "relative",
                        zIndex: 10,
                        maxWidth: "1200px",
                        margin: "0 auto",
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "40px",
                        flexWrap: "wrap",
                    }}
                >
                    {/* Left Side - Text */}
                    <div
                        className="animate-fadeIn"
                        style={{
                            flex: "1 1 500px",
                            minWidth: 0,
                            textAlign: "left",
                        }}
                    >
                        {/* Badge */}
                        <div
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "8px",
                                padding: "8px 18px",
                                borderRadius: "100px",
                                marginBottom: "28px",
                                fontSize: "12px",
                                fontWeight: 500,
                                color: "#f87171",
                                background: "rgba(239, 68, 68, 0.06)",
                                border: "1px solid rgba(239, 68, 68, 0.12)",
                                backdropFilter: "blur(20px)",
                                animation: "slideDown 0.5s ease forwards",
                            }}
                        >
                            <HiOutlineSparkles
                                style={{ fontSize: "14px", animation: "spin 3s linear infinite" }}
                            />
                            Premium Source Code Marketplace
                        </div>

                        {/* Heading */}
                        <h1
                            style={{
                                fontSize: "clamp(36px, 6vw, 72px)",
                                fontWeight: 900,
                                color: "white",
                                marginBottom: "24px",
                                lineHeight: 1.05,
                                letterSpacing: "-0.04em",
                            }}
                        >
                            Build Faster
                            <br />
                            With{" "}
                            <span
                                style={{
                                    background:
                                        "linear-gradient(135deg, #ef4444 0%, #f97316 50%, #ef4444 100%)",
                                    backgroundSize: "200% auto",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    animation: "gradientShift 3s ease infinite",
                                }}
                            >
                                Premium
                            </span>
                            <br />
                            <span
                                style={{
                                    background:
                                        "linear-gradient(135deg, #8b5cf6, #ec4899, #8b5cf6)",
                                    backgroundSize: "200% auto",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    animation: "gradientShift 4s ease infinite 1s",
                                }}
                            >
                                Source Code
                            </span>
                        </h1>

                        {/* Subtitle */}
                        <p
                            style={{
                                fontSize: "clamp(15px, 2vw, 18px)",
                                color: "#94a3b8",
                                marginBottom: "36px",
                                lineHeight: 1.8,
                                maxWidth: "520px",
                            }}
                        >
                            Get production-ready source code for web apps, mobile apps,
                            APIs, and more. Ship faster, build smarter, save hundreds of
                            development hours.
                        </p>

                        {/* CTA */}
                        <div
                            style={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: "14px",
                                marginBottom: "40px",
                            }}
                        >
                            <Link
                                href="/products"
                                className="btn-primary"
                                style={{
                                    padding: "16px 36px",
                                    borderRadius: "16px",
                                    fontSize: "15px",
                                    fontWeight: 600,
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "10px",
                                }}
                            >
                                <span
                                    style={{
                                        position: "relative",
                                        zIndex: 1,
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "10px",
                                    }}
                                >
                                    Explore Products <HiOutlineArrowRight />
                                </span>
                            </Link>
                            <Link
                                href="/about"
                                className="btn-secondary"
                                style={{
                                    padding: "16px 36px",
                                    borderRadius: "16px",
                                    fontSize: "15px",
                                    fontWeight: 500,
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "10px",
                                }}
                            >
                                <HiOutlinePlay /> Learn More
                            </Link>
                        </div>

                        {/* Social Proof */}
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "16px",
                                flexWrap: "wrap",
                            }}
                        >
                            <div style={{ display: "flex" }}>
                                {[...Array(5)].map((_, i) => (
                                    <div
                                        key={i}
                                        style={{
                                            width: "36px",
                                            height: "36px",
                                            borderRadius: "50%",
                                            border: "2px solid #0a0a0f",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontSize: "11px",
                                            fontWeight: 700,
                                            color: "white",
                                            background: `linear-gradient(135deg, hsl(${i * 65}, 70%, 45%), hsl(${i * 65 + 30}, 70%, 55%))`,
                                            marginLeft: i > 0 ? "-10px" : 0,
                                            position: "relative",
                                            zIndex: 5 - i,
                                            animation: `popIn 0.4s ease forwards`,
                                            animationDelay: `${0.8 + i * 0.1}s`,
                                            opacity: 0,
                                        }}
                                    >
                                        {String.fromCharCode(65 + i)}
                                    </div>
                                ))}
                            </div>
                            <div>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "3px",
                                    }}
                                >
                                    {[...Array(5)].map((_, i) => (
                                        <HiOutlineStar
                                            key={i}
                                            style={{
                                                color: "#facc15",
                                                fontSize: "14px",
                                                fill: "#facc15",
                                            }}
                                        />
                                    ))}
                                    <span
                                        style={{
                                            color: "#94a3b8",
                                            fontSize: "13px",
                                            marginLeft: "6px",
                                            fontWeight: 600,
                                        }}
                                    >
                                        4.8/5
                                    </span>
                                </div>
                                <p
                                    style={{
                                        fontSize: "12px",
                                        color: "#64748b",
                                        marginTop: "2px",
                                    }}
                                >
                                    Trusted by developers worldwide
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - SVG Illustration */}
                    <div
                        className="hidden md:block animate-fadeIn"
                        style={{
                            flex: "0 1 480px",
                            animationDelay: "0.3s",
                            transform: `translate(${mousePos.x * 0.1}px, ${mousePos.y * 0.1}px)`,
                            transition: "transform 0.3s ease-out",
                        }}
                    >
                        <HeroSVG />
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div
                    style={{
                        position: "absolute",
                        bottom: "30px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "8px",
                        animation: "bounce 2s ease infinite",
                    }}
                >
                    <span style={{ fontSize: "11px", color: "#475569", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                        Scroll
                    </span>
                    <div
                        style={{
                            width: "20px",
                            height: "32px",
                            borderRadius: "10px",
                            border: "1.5px solid rgba(255,255,255,0.15)",
                            display: "flex",
                            justifyContent: "center",
                            paddingTop: "6px",
                        }}
                    >
                        <div
                            style={{
                                width: "3px",
                                height: "8px",
                                borderRadius: "2px",
                                background: "#ef4444",
                                animation: "scrollDot 1.5s ease infinite",
                            }}
                        />
                    </div>
                </div>
            </section>

            {/* ═══════ TECH MARQUEE ═══════ */}
            <section
                style={{
                    padding: "0 0 20px",
                    position: "relative",
                }}
            >
                <p
                    style={{
                        textAlign: "center",
                        fontSize: "12px",
                        color: "#475569",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        marginBottom: "16px",
                        fontWeight: 500,
                    }}
                >
                    Technologies We Cover
                </p>
                <TechMarquee />
            </section>

            {/* ═══════ STATS ═══════ */}
            <section style={{ padding: "40px 16px 60px" }}>
                <div
                    style={{
                        maxWidth: "1000px",
                        margin: "0 auto",
                        display: "grid",
                        gridTemplateColumns: "repeat(2, 1fr)",
                        gap: "12px",
                    }}
                    className="md:!grid-cols-4"
                >
                    {stats.map((s, i) => {
                        const SIcon = s.icon;
                        const c = counters[i];
                        return (
                            <div
                                key={i}
                                ref={c.ref}
                                className="glass-card"
                                style={{
                                    borderRadius: "24px",
                                    padding: "28px 16px",
                                    textAlign: "center",
                                    position: "relative",
                                    overflow: "hidden",
                                    animation: `fadeIn 0.6s ease forwards`,
                                    animationDelay: `${i * 100}ms`,
                                    opacity: 0,
                                }}
                            >
                                {/* Corner Glow */}
                                <div
                                    style={{
                                        position: "absolute",
                                        top: "-30px",
                                        right: "-30px",
                                        width: "100px",
                                        height: "100px",
                                        borderRadius: "50%",
                                        background: `${s.color}06`,
                                        filter: "blur(25px)",
                                        pointerEvents: "none",
                                    }}
                                />
                                <div
                                    style={{
                                        position: "absolute",
                                        top: 0,
                                        left: "50%",
                                        transform: "translateX(-50%)",
                                        width: "50px",
                                        height: "2px",
                                        background: `linear-gradient(90deg, transparent, ${s.color}40, transparent)`,
                                    }}
                                />

                                <SIcon
                                    style={{
                                        fontSize: "28px",
                                        color: s.color,
                                        margin: "0 auto 10px",
                                        filter: `drop-shadow(0 0 10px ${s.color}30)`,
                                    }}
                                />
                                <p
                                    style={{
                                        fontSize: "32px",
                                        fontWeight: 900,
                                        color: "white",
                                        letterSpacing: "-0.03em",
                                        lineHeight: 1.1,
                                    }}
                                >
                                    {c.value}
                                </p>
                                <p
                                    style={{
                                        fontSize: "12px",
                                        color: "#64748b",
                                        marginTop: "6px",
                                        fontWeight: 500,
                                    }}
                                >
                                    {s.label}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* ═══════ FEATURES ═══════ */}
            <section style={{ padding: "80px 16px" }}>
                <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
                    <div style={{ textAlign: "center", marginBottom: "64px" }}>
                        <div
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "8px",
                                padding: "6px 16px",
                                borderRadius: "100px",
                                fontSize: "11px",
                                fontWeight: 600,
                                color: "#94a3b8",
                                background: "rgba(255,255,255,0.03)",
                                border: "1px solid rgba(255,255,255,0.06)",
                                marginBottom: "20px",
                                letterSpacing: "0.1em",
                                textTransform: "uppercase",
                            }}
                        >
                            <HiOutlineSparkles style={{ color: "#ef4444" }} />
                            Why Choose Us
                        </div>
                        <h2
                            style={{
                                fontSize: "clamp(28px, 4vw, 44px)",
                                fontWeight: 900,
                                color: "white",
                                marginBottom: "16px",
                                letterSpacing: "-0.03em",
                            }}
                        >
                            Everything You Need To
                            <br />
                            <span
                                style={{
                                    background: "linear-gradient(135deg, #ef4444, #f97316)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                }}
                            >
                                Ship Faster
                            </span>
                        </h2>
                        <p
                            style={{
                                color: "#64748b",
                                maxWidth: "500px",
                                margin: "0 auto",
                                fontSize: "15px",
                                lineHeight: 1.7,
                            }}
                        >
                            Premium tools and resources to accelerate your development
                            workflow
                        </p>
                    </div>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                            gap: "16px",
                        }}
                    >
                        {features.map((f, i) => (
                            <div
                                key={i}
                                className="glass-card"
                                style={{
                                    borderRadius: "28px",
                                    padding: "36px 28px",
                                    textAlign: "center",
                                    position: "relative",
                                    overflow: "hidden",
                                    animation: `fadeIn 0.6s ease forwards`,
                                    animationDelay: `${i * 120}ms`,
                                    opacity: 0,
                                    cursor: "default",
                                }}
                            >
                                {/* Top gradient line */}
                                <div
                                    style={{
                                        position: "absolute",
                                        top: 0,
                                        left: "50%",
                                        transform: "translateX(-50%)",
                                        width: "80px",
                                        height: "2px",
                                        background: `linear-gradient(90deg, transparent, ${f.color}50, transparent)`,
                                    }}
                                />

                                {/* SVG Icon */}
                                <div
                                    style={{
                                        width: "72px",
                                        height: "72px",
                                        borderRadius: "20px",
                                        margin: "0 auto 24px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        background: `${f.color}08`,
                                        border: `1px solid ${f.color}15`,
                                        position: "relative",
                                    }}
                                >
                                    {f.svg}
                                    {/* Pulse ring */}
                                    <div
                                        style={{
                                            position: "absolute",
                                            inset: "-4px",
                                            borderRadius: "24px",
                                            border: `1px solid ${f.color}10`,
                                            animation: "pulseRing 3s ease-in-out infinite",
                                            animationDelay: `${i * 0.5}s`,
                                        }}
                                    />
                                </div>

                                <h3
                                    style={{
                                        color: "white",
                                        fontWeight: 700,
                                        marginBottom: "10px",
                                        fontSize: "17px",
                                    }}
                                >
                                    {f.title}
                                </h3>
                                <p
                                    style={{
                                        fontSize: "13px",
                                        color: "#64748b",
                                        lineHeight: 1.8,
                                    }}
                                >
                                    {f.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════ PRODUCTS ═══════ */}
            <section style={{ padding: "80px 16px" }}>
                <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "flex-end",
                            justifyContent: "space-between",
                            marginBottom: "48px",
                            flexWrap: "wrap",
                            gap: "16px",
                        }}
                    >
                        <div>
                            <div
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    padding: "6px 16px",
                                    borderRadius: "100px",
                                    fontSize: "11px",
                                    fontWeight: 600,
                                    color: "#94a3b8",
                                    background: "rgba(255,255,255,0.03)",
                                    border: "1px solid rgba(255,255,255,0.06)",
                                    marginBottom: "16px",
                                    letterSpacing: "0.1em",
                                    textTransform: "uppercase",
                                }}
                            >
                                <FiPackage style={{ color: "#ef4444" }} />
                                Our Products
                            </div>
                            <h2
                                style={{
                                    fontSize: "clamp(24px, 4vw, 40px)",
                                    fontWeight: 900,
                                    color: "white",
                                    marginBottom: "8px",
                                    letterSpacing: "-0.03em",
                                }}
                            >
                                Featured Products
                            </h2>
                            <p style={{ color: "#64748b", fontSize: "14px" }}>
                                {/* replace this text with a summary of your actual product offerings */}
                                Explore our real-world source code products and templates.
                            </p>
                        </div>
                        <Link
                            href="/products"
                            className="hidden sm:inline-flex"
                            style={{
                                alignItems: "center",
                                gap: "8px",
                                fontSize: "14px",
                                color: "#f87171",
                                fontWeight: 600,
                                textDecoration: "none",
                                padding: "10px 20px",
                                borderRadius: "12px",
                                background: "rgba(239, 68, 68, 0.06)",
                                border: "1px solid rgba(239, 68, 68, 0.12)",
                                transition: "all 0.3s",
                            }}
                        >
                            View All <HiOutlineArrowRight />
                        </Link>
                    </div>

                    {loading ? (
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns:
                                    "repeat(auto-fill, minmax(300px, 1fr))",
                                gap: "16px",
                            }}
                        >
                            {[...Array(6)].map((_, i) => (
                                <div
                                    key={i}
                                    className="glass-card"
                                    style={{ borderRadius: "24px", overflow: "hidden" }}
                                >
                                    <div className="skeleton" style={{ height: "200px" }} />
                                    <div style={{ padding: "24px" }}>
                                        <div
                                            className="skeleton"
                                            style={{
                                                height: "18px",
                                                borderRadius: "8px",
                                                width: "70%",
                                                marginBottom: "14px",
                                            }}
                                        />
                                        <div
                                            className="skeleton"
                                            style={{
                                                height: "14px",
                                                borderRadius: "6px",
                                                width: "90%",
                                                marginBottom: "10px",
                                            }}
                                        />
                                        <div
                                            className="skeleton"
                                            style={{
                                                height: "14px",
                                                borderRadius: "6px",
                                                width: "50%",
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : products.length > 0 ? (
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns:
                                    "repeat(auto-fill, minmax(300px, 1fr))",
                                gap: "16px",
                            }}
                        >
                            {products.map((p, i) => (
                                <ProductCard key={p.id} product={p} index={i} />
                            ))}
                        </div>
                    ) : (
                        <div
                            className="glass-card"
                            style={{
                                borderRadius: "28px",
                                padding: "80px 24px",
                                textAlign: "center",
                            }}
                        >
                            <FiPackage
                                style={{
                                    fontSize: "56px",
                                    color: "#1e293b",
                                    margin: "0 auto 20px",
                                }}
                            />
                            <p style={{ color: "#64748b", fontSize: "16px" }}>
                                No products available yet
                            </p>
                        </div>
                    )}

                    <div
                        className="sm:hidden"
                        style={{ textAlign: "center", marginTop: "32px" }}
                    >
                        <Link
                            href="/products"
                            className="btn-secondary"
                            style={{
                                padding: "14px 32px",
                                borderRadius: "14px",
                                fontSize: "14px",
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "8px",
                            }}
                        >
                            View All Products <HiOutlineArrowRight />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ═══════ HOW IT WORKS ═══════ */}
            <section style={{ padding: "80px 16px" }}>
                <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
                    <div style={{ textAlign: "center", marginBottom: "64px" }}>
                        <div
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "8px",
                                padding: "6px 16px",
                                borderRadius: "100px",
                                fontSize: "11px",
                                fontWeight: 600,
                                color: "#94a3b8",
                                background: "rgba(255,255,255,0.03)",
                                border: "1px solid rgba(255,255,255,0.06)",
                                marginBottom: "20px",
                                letterSpacing: "0.1em",
                                textTransform: "uppercase",
                            }}
                        >
                            <HiOutlineRocketLaunch style={{ color: "#ef4444" }} />
                            Get Started
                        </div>
                        <h2
                            style={{
                                fontSize: "clamp(28px, 4vw, 44px)",
                                fontWeight: 900,
                                color: "white",
                                marginBottom: "16px",
                                letterSpacing: "-0.03em",
                            }}
                        >
                            Three Simple Steps
                        </h2>
                        <p style={{ color: "#64748b", fontSize: "15px" }}>
                            From browsing to building in minutes
                        </p>
                    </div>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                            gap: "16px",
                            position: "relative",
                        }}
                    >
                        {/* Connection Line (Desktop) */}
                        <div
                            className="hidden md:block"
                            style={{
                                position: "absolute",
                                top: "60px",
                                left: "20%",
                                right: "20%",
                                height: "2px",
                                background:
                                    "linear-gradient(90deg, transparent, rgba(239,68,68,0.2), rgba(139,92,246,0.2), transparent)",
                                zIndex: 0,
                            }}
                        />

                        {[
                            {
                                step: "01",
                                title: "Browse & Choose",
                                desc: "Browse our collection of production‑ready code templates and full projects",
                                icon: HiOutlineCodeBracket,
                                color: "#ef4444",
                                svg: (
                                    <svg viewBox="0 0 50 50" fill="none" style={{ width: 28, height: 28 }}>
                                        <circle cx="20" cy="20" r="12" stroke="#ef4444" strokeWidth="1.5" opacity="0.6">
                                            <animate attributeName="r" values="10;12;10" dur="2s" repeatCount="indefinite" />
                                        </circle>
                                        <line x1="29" y1="29" x2="40" y2="40" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" />
                                    </svg>
                                ),
                            },
                            {
                                step: "02",
                                title: "Secure Payment",
                                desc: "Pay securely via Cashfree with multiple payment options available",
                                icon: HiOutlineShieldCheck,
                                color: "#f59e0b",
                                svg: (
                                    <svg viewBox="0 0 50 50" fill="none" style={{ width: 28, height: 28 }}>
                                        <path d="M25 5L40 12V25C40 35 25 45 25 45C25 45 10 35 10 25V12L25 5Z" stroke="#f59e0b" strokeWidth="1.5" opacity="0.6">
                                            <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2s" repeatCount="indefinite" />
                                        </path>
                                        <path d="M18 25L23 30L32 21" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                ),
                            },
                            {
                                step: "03",
                                title: "Download & Build",
                                desc: "Get instant access to download and start building right away",
                                icon: HiOutlineArrowDownTray,
                                color: "#22c55e",
                                svg: (
                                    <svg viewBox="0 0 50 50" fill="none" style={{ width: 28, height: 28 }}>
                                        <path d="M25 8V32" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round">
                                            <animate attributeName="stroke-dasharray" values="0,30;30,0" dur="1.5s" repeatCount="indefinite" />
                                        </path>
                                        <path d="M17 24L25 32L33 24" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M10 40H40" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
                                    </svg>
                                ),
                            },
                        ].map((s, i) => (
                            <div
                                key={i}
                                className="glass-card"
                                style={{
                                    borderRadius: "28px",
                                    padding: "36px 28px",
                                    position: "relative",
                                    overflow: "hidden",
                                    zIndex: 1,
                                    animation: `fadeIn 0.6s ease forwards`,
                                    animationDelay: `${i * 150}ms`,
                                    opacity: 0,
                                }}
                            >
                                {/* Step Number Watermark */}
                                <span
                                    style={{
                                        position: "absolute",
                                        top: "10px",
                                        right: "16px",
                                        fontSize: "72px",
                                        fontWeight: 900,
                                        color: "transparent",
                                        WebkitTextStroke: `1px ${s.color}10`,
                                        lineHeight: 1,
                                        pointerEvents: "none",
                                    }}
                                >
                                    {s.step}
                                </span>

                                <div
                                    style={{
                                        position: "absolute",
                                        top: 0,
                                        left: "28px",
                                        width: "50px",
                                        height: "2px",
                                        background: `linear-gradient(90deg, ${s.color}60, transparent)`,
                                    }}
                                />

                                <div
                                    style={{
                                        width: "60px",
                                        height: "60px",
                                        borderRadius: "18px",
                                        marginBottom: "24px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        background: `${s.color}08`,
                                        border: `1px solid ${s.color}15`,
                                        position: "relative",
                                    }}
                                >
                                    {s.svg}
                                </div>

                                <h3
                                    style={{
                                        color: "white",
                                        fontWeight: 700,
                                        marginBottom: "10px",
                                        fontSize: "18px",
                                    }}
                                >
                                    {s.title}
                                </h3>
                                <p
                                    style={{
                                        fontSize: "13px",
                                        color: "#64748b",
                                        lineHeight: 1.8,
                                    }}
                                >
                                    {s.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════ CTA ═══════ */}
            <section style={{ padding: "80px 16px" }}>
                <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
                    <div
                        style={{
                            borderRadius: "36px",
                            padding: "clamp(40px, 6vw, 72px) clamp(24px, 4vw, 56px)",
                            textAlign: "center",
                            position: "relative",
                            overflow: "hidden",
                            background:
                                "linear-gradient(135deg, rgba(239, 68, 68, 0.06), rgba(139, 92, 246, 0.04), rgba(249, 115, 22, 0.03))",
                            border: "1px solid rgba(239, 68, 68, 0.1)",
                            backdropFilter: "blur(40px)",
                            WebkitBackdropFilter: "blur(40px)",
                        }}
                    >
                        <FloatingParticles />

                        {/* Glow Orbs */}
                        <div
                            style={{
                                position: "absolute",
                                top: "-60px",
                                right: "-40px",
                                width: "250px",
                                height: "250px",
                                borderRadius: "50%",
                                background: "rgba(239, 68, 68, 0.06)",
                                filter: "blur(60px)",
                                pointerEvents: "none",
                                animation: "pulseGlow 4s ease-in-out infinite",
                            }}
                        />
                        <div
                            style={{
                                position: "absolute",
                                bottom: "-60px",
                                left: "-40px",
                                width: "250px",
                                height: "250px",
                                borderRadius: "50%",
                                background: "rgba(139, 92, 246, 0.04)",
                                filter: "blur(60px)",
                                pointerEvents: "none",
                                animation: "pulseGlow 5s ease-in-out infinite 1s",
                            }}
                        />

                        {/* Grid Pattern */}
                        <div
                            style={{
                                position: "absolute",
                                inset: 0,
                                backgroundImage:
                                    "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
                                backgroundSize: "40px 40px",
                                opacity: 0.5,
                                pointerEvents: "none",
                            }}
                        />

                        <div style={{ position: "relative", zIndex: 10 }}>
                            <div
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "6px",
                                    padding: "6px 14px",
                                    borderRadius: "100px",
                                    fontSize: "11px",
                                    color: "#f87171",
                                    background: "rgba(239,68,68,0.08)",
                                    border: "1px solid rgba(239,68,68,0.15)",
                                    marginBottom: "24px",
                                    fontWeight: 600,
                                    letterSpacing: "0.05em",
                                }}
                            >
                                <HiOutlineSparkles /> Start Building Today
                            </div>

                            <h2
                                style={{
                                    fontSize: "clamp(26px, 4.5vw, 48px)",
                                    fontWeight: 900,
                                    color: "white",
                                    marginBottom: "16px",
                                    letterSpacing: "-0.03em",
                                    lineHeight: 1.15,
                                }}
                            >
                                Ready to Build
                                <br />
                                Something{" "}
                                <span
                                    style={{
                                        background:
                                            "linear-gradient(135deg, #ef4444, #f97316, #ef4444)",
                                        backgroundSize: "200% auto",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        animation: "gradientShift 3s ease infinite",
                                    }}
                                >
                                    Amazing
                                </span>
                                ?
                            </h2>
                            <p
                                style={{
                                    color: "#94a3b8",
                                    marginBottom: "36px",
                                    maxWidth: "520px",
                                    margin: "0 auto 36px",
                                    fontSize: "15px",
                                    lineHeight: 1.8,
                                }}
                            >
                                Join developers who trust SourceCode for premium,
                                production-ready source code packages.
                            </p>

                            <div
                                style={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "14px",
                                    marginBottom: "32px",
                                }}
                            >
                                <Link
                                    href="/signup"
                                    className="btn-primary"
                                    style={{
                                        padding: "16px 40px",
                                        borderRadius: "16px",
                                        fontSize: "15px",
                                        fontWeight: 600,
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: "10px",
                                    }}
                                >
                                    <span
                                        style={{
                                            position: "relative",
                                            zIndex: 1,
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "10px",
                                        }}
                                    >
                                        Get Started Free <HiOutlineArrowRight />
                                    </span>
                                </Link>
                                <Link
                                    href="/products"
                                    className="btn-secondary"
                                    style={{
                                        padding: "16px 40px",
                                        borderRadius: "16px",
                                        fontSize: "15px",
                                    }}
                                >
                                    Browse Products
                                </Link>
                            </div>

                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "20px",
                                    flexWrap: "wrap",
                                }}
                            >
                                {[
                                    "No hidden fees",
                                    "Instant downloads",
                                    "Lifetime access",
                                ].map((t, i) => (
                                    <span
                                        key={i}
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "6px",
                                            fontSize: "13px",
                                            color: "#94a3b8",
                                        }}
                                    >
                                        <HiOutlineCheckCircle
                                            style={{ color: "#22c55e", fontSize: "16px" }}
                                        />
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}