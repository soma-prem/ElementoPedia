"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/app/components/navbar";
import Link from "next/link";

/* ================= TYPES ================= */

type ElementData = {
    elementName: string;
    symbol: string;
    atomicNumber: string;
    atomicMass: string;
    electronConfiguration: string;
    group: string;
    period: string;
    block: string;
    category: string;
    state: string;
    color: string;
    meltingPoint: string;
    boilingPoint: string;
    discovery: string;
    uses: string[];
    interestingFacts: string[];
    didYouKnow: string;
    youtubeVideo: string;
    referenceLink: string;
};

/* ================= PAGE ================= */

export default function ElementPage() {
    const params = useParams();
    const elementNameFromRoute = params.name as string;
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

    const [element, setElement] = useState<ElementData | null>(null);
    const [loading, setLoading] = useState(true);
    const [prompt, setPrompt] = useState("");
    const [response, setResponse] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [imageCandidateIndex, setImageCandidateIndex] = useState(0);

    const handleSendPrompt = async () => {
        if (!prompt.trim()) return;
        setIsLoading(true);
        setResponse(null);

        try {
            const res = await fetch(`${API_BASE_URL}/ask-elemind`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt }),
            });
            const data = await res.json();
            if (data.response) {
                setResponse(data.response);
            } else {
                setResponse("No response from EleMind. Please try again.");
            }
        } catch {
            setResponse("Error connecting to EleMind.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const loadElement = async () => {
            try {
                const res = await fetch("/data/elements.json");
                const allElements: ElementData[] = await res.json();
                const routeName = elementNameFromRoute.toLowerCase();
                const routeAliases: Record<string, string> = {
                    sulphur: "sulfur",
                };
                const normalizedRouteName = routeAliases[routeName] || routeName;

                const found = allElements.find(
                    (el) =>
                        el.elementName.toLowerCase() ===
                        normalizedRouteName
                );

                setElement(found || null);
            } catch (err) {
                console.error("Failed to load element data", err);
            } finally {
                setLoading(false);
            }
        };

        loadElement();
    }, [elementNameFromRoute]);

    useEffect(() => {
        setImageCandidateIndex(0);
    }, [element?.elementName]);

    if (loading) {
        return <div className="p-20 text-center">Loading...</div>;
    }

    if (!element) {
        return <div className="p-20 text-center">Element not found</div>;
    }

    const atomicNumberValue = Number.parseInt(element.atomicNumber, 10);
    const showAnimatedAtom = Number.isFinite(atomicNumberValue) && atomicNumberValue >= 1;
    const imageCandidates = getElementImageCandidates(element.elementName);
    const imageSrc = `/images/elements/${imageCandidates[Math.min(imageCandidateIndex, imageCandidates.length - 1)]}`;

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            <style>{`
                @keyframes progress {
                    0% { width: 0%; }
                    100% { width: 100%; }
                }
                @keyframes atom-orbit-cw {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                @keyframes atom-orbit-ccw {
                    from { transform: rotate(360deg); }
                    to { transform: rotate(0deg); }
                }
            `}</style>

            <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 text-slate-900">

                {/* ================= HERO ================= */}
                <div className="bg-white rounded-[2.5rem] shadow-2xl border p-12 mb-20">

                    <div className="text-center mb-12">
                        <h1 className="text-5xl font-black uppercase">
                            {element.elementName}
                        </h1>
                        <hr className="mt-4 w-24 mx-auto border-2 border-amber-500 rounded-full" />
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8 xl:gap-10 items-center">

                        {/* ELEMENT TILE */}
                        <div className="relative flex-1 min-h-[300px] bg-slate-50 rounded-[2rem] p-8 flex items-center justify-center">
                            <div className="w-44 h-44 bg-gradient-to-br from-amber-400 to-amber-600 rounded-3xl flex flex-col justify-between items-center p-6 shadow-xl">
                                <p className="self-start text-sm font-black opacity-60">
                                    {element.atomicNumber}
                                </p>
                                <h2 className="text-6xl font-black text-white">
                                    {element.symbol}
                                </h2>
                                <div className="text-center">
                                    <h3 className="text-lg font-bold text-white">
                                        {element.elementName}
                                    </h3>
                                    <p className="text-xs font-mono text-amber-100">
                                        {element.atomicMass}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {showAnimatedAtom && (
                            <div className="w-full lg:w-auto lg:flex-none flex justify-center">
                            <AtomModel
                                atomicNumber={atomicNumberValue}
                                atomicMass={element.atomicMass}
                            />
                            </div>
                        )}

                        {/* IMAGE */}
                        <div className="flex-1 w-full">
                            <img
                                src={imageSrc}
                                alt={element.elementName}
                                className="w-full h-[350px] object-cover rounded-[2rem] shadow-xl"
                                onError={() => {
                                    setImageCandidateIndex((current) =>
                                        current < imageCandidates.length - 1 ? current + 1 : current
                                    );
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* ================= DETAILS ================= */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                    <Card title="Element Details" accent="border-amber-500">
                        <Detail label="Symbol" value={element.symbol} />
                        <Detail label="Atomic Number" value={element.atomicNumber} />
                        <Detail label="Atomic Mass" value={`${element.atomicMass} u`} />
                        <Detail label="Electron Configuration" value={element.electronConfiguration} />
                        <Detail label="Category" value={element.category} />
                        <Detail label="Group" value={element.group} />
                        <Detail label="Period" value={element.period} />
                        <Detail label="Block" value={element.block} />
                        <Detail label="State (RT)" value={element.state} />
                        <Detail label="Color" value={element.color} />
                        <Detail label="Melting Point" value={element.meltingPoint} />
                        <Detail label="Boiling Point" value={element.boilingPoint} />
                    </Card>

                    <Card title="Discovery & Uses" accent="border-blue-500">
                        <p className="text-slate-700 mb-4">{element.discovery}</p>
                        <ul className="list-disc list-inside space-y-2">
                            {element.uses.map((use, i) => (
                                <li key={i}>{use}</li>
                            ))}
                        </ul>
                    </Card>
                </div>

                {/* ================= VIDEO + FACTS ================= */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-20">

                    <Card title="Watch & Learn" accent="border-red-500">
                        <iframe
                            src={element.youtubeVideo}
                            className="w-full aspect-video rounded-xl"
                            allowFullScreen
                        />
                    </Card>

                    <Card title="Facts & More" accent="border-indigo-500">
                        <ul className="list-disc list-inside space-y-2">
                            {element.interestingFacts.map((fact, i) => (
                                <li key={i}>{fact}</li>
                            ))}
                        </ul>

                        <div className="mt-6 bg-amber-50 p-4 rounded-xl border-l-4 border-amber-500">
                            {element.didYouKnow}
                        </div>

                        <a
                            href={element.referenceLink}
                            target="_blank"
                            className="block mt-4 text-blue-600 hover:underline"
                        >
                            Wikipedia - {element.elementName}
                        </a>
                    </Card>
                </div>


                {/* ================= AI SECTION ================= */}
                <Card
                    title="Ask EleMind AI"
                    accent="border-purple-500"
                    className="mt-20"
                >
                    <div className="grid grid-cols-1 gap-6">

                        {/* Prompt Input */}
                        <textarea
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder={`Ask something about ${element.elementName}...`}
                            className="w-full h-36 p-6 rounded-2xl border border-slate-300 bg-slate-50 resize-none
                 focus:outline-none focus:ring-2 focus:ring-purple-500 text-lg"
                        />

                        {/* Action Row */}
                        <div className="space-y-3">
                            <button
                                onClick={handleSendPrompt}
                                disabled={isLoading}
                                className="min-w-[170px] px-8 py-3 bg-purple-600 text-white rounded-xl font-bold
                   hover:bg-purple-700 transition disabled:opacity-60"
                            >
                                {isLoading ? "Thinking..." : "Ask EleMind"}
                            </button>

                            <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                                {isLoading ? (
                                    <div className="bg-purple-600 h-full animate-[progress_6s_linear_forwards]" />
                                ) : (
                                    <div className="h-full w-0" />
                                )}
                            </div>
                        </div>

                        {/* AI Response */}
                        {response && (
                            <div className="mt-4 p-6 bg-gradient-to-br from-purple-50 to-purple-100
                      text-purple-900 rounded-2xl border border-purple-200
                      whitespace-pre-wrap leading-relaxed text-base">
                                {response}
                            </div>
                        )}

                    </div>
                </Card>


                {/* BACK */}
                <div className="mt-20 flex justify-center">
                    <Link
                        href="/components/periodic"
                        className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-bold"
                    >
                        &larr; Back to Periodic Table
                    </Link>
                </div>


            </div>
        </div>
    );
}

/* ================= COMPONENTS ================= */

const IMAGE_NAME_ALIASES: Record<string, string[]> = {
    sulfur: ["sulphur"],
    sulfurium: ["sulphur"],
    cesium: ["caesium"],
    lead: ["leas"],
    californium: ["califormium"],
    protactinium: ["protactium"],
    phosphorus: ["phosphorus.JPG"],
    rubidium: ["rubidium.JPG"],
    titanium: ["titanium.JPG"],
};

function getElementImageCandidates(elementName: string): string[] {
    const normalized = elementName.toLowerCase();
    const aliases = IMAGE_NAME_ALIASES[normalized] || [];
    const candidates = [
        `${normalized}.jpg`,
        `${normalized}.JPG`,
        ...aliases.map((alias) => (alias.includes(".") ? alias : `${alias}.jpg`)),
    ];

    return Array.from(new Set(candidates));
}

type CardProps = {
    title: string;
    children: ReactNode;
    accent: string;
    className?: string;
};

const Card = ({ title, children, accent, className }: CardProps) => (
    <div className={`bg-white p-10 rounded-[2.5rem] shadow-lg border-t-4 ${accent} ${className || ""}`}>
        <h2 className="text-2xl font-extrabold mb-6">{title}</h2>
        {children}
    </div>
);

type DetailProps = {
    label: string;
    value: string;
};

const Detail = ({ label, value }: DetailProps) => (
    <div className="flex justify-between border-b py-2">
        <span className="text-slate-500">{label}</span>
        <span className="font-bold">{value}</span>
    </div>
);

function getShellDistribution(atomicNumber: number): number[] {
    const capacities = [2, 8, 18, 32, 32, 18, 8];
    let remaining = atomicNumber;
    const shells: number[] = [];

    for (const capacity of capacities) {
        if (remaining <= 0) break;
        const electronsInShell = Math.min(remaining, capacity);
        shells.push(electronsInShell);
        remaining -= electronsInShell;
    }

    return shells;
}

function getApproxNeutrons(atomicNumber: number, atomicMass: string): number {
    const numericMass = Number.parseFloat(atomicMass);
    if (Number.isNaN(numericMass)) return 0;
    return Math.max(0, Math.round(numericMass) - atomicNumber);
}

const SHELL_ORBIT_COLORS = ["#fca5a5", "#fdba74", "#fde68a", "#86efac", "#7dd3fc", "#c4b5fd", "#f9a8d4"];
const ELECTRON_COLOR = "#ff6347";

function AtomModel({
    atomicNumber,
    atomicMass,
}: {
    atomicNumber: number;
    atomicMass: string;
}) {
    const shells = getShellDistribution(atomicNumber);
    const neutrons = getApproxNeutrons(atomicNumber, atomicMass);
    const electrons = atomicNumber;

    const maxOrbit = 88 + Math.max(shells.length - 1, 0) * 42;
    const canvasSize = Math.max(230, maxOrbit + 34);

    return (
        <div className="rounded-2xl border border-sky-200 bg-gradient-to-br from-sky-50 to-white p-5 shadow-sm">
            <div className="relative mx-auto" style={{ width: `${canvasSize}px`, height: `${canvasSize}px` }}>
                {shells.map((shellElectrons, shellIndex) => {
                    const orbitSize = 88 + shellIndex * 42;
                    const spinAnimation = shellIndex % 2 === 0 ? "atom-orbit-cw" : "atom-orbit-ccw";
                    const spinDuration = 5 + shellIndex * 2;
                    const electronRadius = orbitSize / 2;
                    const orbitColor = SHELL_ORBIT_COLORS[shellIndex % SHELL_ORBIT_COLORS.length];

                    return (
                        <div
                            key={`shell-${shellIndex}`}
                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                            style={{ width: `${orbitSize}px`, height: `${orbitSize}px` }}
                        >
                            <div className="absolute inset-0 rounded-full border-2" style={{ borderColor: orbitColor }} />
                            <div className="absolute inset-0" style={{ animation: `${spinAnimation} ${spinDuration}s linear infinite` }}>
                                {Array.from({ length: shellElectrons }).map((_, electronIndex) => {
                                    const angle = (2 * Math.PI * electronIndex) / shellElectrons;
                                    const x = Math.cos(angle) * electronRadius;
                                    const y = Math.sin(angle) * electronRadius;

                                    const electronSize = 10;
                                    const electronOffset = electronSize / 2;

                                    return (
                                        <div
                                            key={`e-${shellIndex}-${electronIndex}`}
                                            className="absolute rounded-full shadow-md"
                                            style={{
                                                backgroundColor: ELECTRON_COLOR,
                                                width: `${electronSize}px`,
                                                height: `${electronSize}px`,
                                                left: `calc(50% + ${x}px - ${electronOffset}px)`,
                                                top: `calc(50% + ${y}px - ${electronOffset}px)`,
                                            }}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}

                <div className="absolute left-1/2 top-1/2 w-16 h-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-900 text-white text-[10px] font-bold flex flex-col items-center justify-center leading-tight shadow-lg">
                    <span>{atomicNumber}p</span>
                    <span>{neutrons}n</span>
                </div>
            </div>

            <div className="mt-4 text-center">
                <div className="mt-2 flex flex-wrap justify-center gap-2 text-[11px] font-semibold text-slate-700">
                    {shells.map((_, shellIndex) => {
                        const shellName = ["K", "L", "M", "N", "O", "P", "Q"][shellIndex] || `S${shellIndex + 1}`;
                        const orbitColor = SHELL_ORBIT_COLORS[shellIndex % SHELL_ORBIT_COLORS.length];
                        return (
                            <span
                                key={`shell-legend-${shellIndex}`}
                                className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2 py-1"
                            >
                                <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ backgroundColor: orbitColor }} />
                                {shellName} shell
                            </span>
                        );
                    })}
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
                    <div className="rounded-lg border border-amber-200 bg-amber-50 px-2 py-2">
                        <p className="font-semibold text-amber-700">Protons</p>
                        <p className="text-sm font-extrabold text-amber-800">{atomicNumber}</p>
                    </div>
                    <div className="rounded-lg border border-slate-200 bg-slate-100 px-2 py-2">
                        <p className="font-semibold text-slate-600">Neutrons</p>
                        <p className="text-sm font-extrabold text-slate-700">{neutrons}</p>
                    </div>
                    <div className="rounded-lg border border-cyan-200 bg-cyan-50 px-2 py-2">
                        <p className="font-semibold text-cyan-700">Electrons</p>
                        <p className="text-sm font-extrabold text-cyan-800">{electrons}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

