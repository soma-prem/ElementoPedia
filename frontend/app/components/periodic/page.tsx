// frontend/app/periodic/page.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import Navbar from "../navbar";
import { useRouter } from "next/navigation";

// Define the colors from periodtable.css
const COLORS = {
    nonmetal: "rgba(117, 243, 117, 0.9)",
    noble: "rgba(126, 227, 247, 0.9)",
    alkali: "rgba(243, 191, 131, 0.938)",
    alkaline: "rgba(161, 167, 172, 0.356)",
    semimetal: "rgba(240, 191, 85, 0.9)",
    poormetal: "rgba(175, 186, 214, 0.9)",
    transition: "rgba(85, 142, 196, 0.767)",
    lanthanides: "rgba(241, 142, 142, 0.9)",
    actinides: "rgb(239, 241, 95)",
    unknown: "rgba(126, 123, 123, 0.9)",
};

const FILTERS = {
    1: "nonmetal",
    2: "semimetal",
    3: "alkali",
    4: "noble",
    5: "alkaline",
    6: "poormetal",
    7: "transition",
    8: "lanthanides",
    9: "actinides",
    10: "unknown",
    11: "ALL",
};

const FILTER_BUTTONS: { id: keyof typeof FILTERS; label: string }[] = [
    { id: 11, label: "All Elements" },
    { id: 1, label: "Nonmetal" },
    { id: 2, label: "Metalloid" },
    { id: 3, label: "Alkali Metal" },
    { id: 5, label: "Alkaline Earth" },
    { id: 7, label: "Transition Metal" },
    { id: 6, label: "Post-Transition" },
    { id: 4, label: "Noble Gas" },
    { id: 8, label: "Lanthanide" },
    { id: 9, label: "Actinide" },
    { id: 10, label: "Unknown" },
];

const TABLE_BASE_WIDTH = 1400;

export default function PeriodicTablePage() {
    const router = useRouter();
    const [activeFilter, setActiveFilter] = useState(11);
    const [tableScale, setTableScale] = useState(1);
    const [tableHeight, setTableHeight] = useState<number | null>(null);
    const tableViewportRef = useRef<HTMLDivElement>(null);
    const tableContentRef = useRef<HTMLDivElement>(null);

    const getCellStyle = (category: keyof typeof COLORS) => {
        if (activeFilter === 11 || FILTERS[activeFilter as keyof typeof FILTERS] === category) {
            return { backgroundColor: COLORS[category], cursor: "pointer" };
        }
        return { backgroundColor: "transparent", cursor: "pointer" };
    };

 
    const emptyCell = <td className="border-none bg-transparent p-1"></td>;

    useEffect(() => {
        const updateScale = () => {
            if (!tableViewportRef.current || !tableContentRef.current) return;

            const availableWidth = tableViewportRef.current.clientWidth;
            const nextScale = Math.min(1, availableWidth / TABLE_BASE_WIDTH);
            const naturalHeight = tableContentRef.current.scrollHeight;

            setTableScale(nextScale);
            setTableHeight(naturalHeight * nextScale);
        };

        updateScale();

        const observer = new ResizeObserver(() => updateScale());
        if (tableViewportRef.current) observer.observe(tableViewportRef.current);
        if (tableContentRef.current) observer.observe(tableContentRef.current);
        window.addEventListener("resize", updateScale);

        return () => {
            observer.disconnect();
            window.removeEventListener("resize", updateScale);
        };
    }, []);

    return (
        <div className="min-h-screen bg-white font-sans">
            <Navbar />

            <div className="max-w-[1800px] mx-auto py-10 px-4 sm:px-6">
                <div className="flex flex-col lg:flex-row lg:items-start gap-5">
                    {/* Left Controls */}
                    <aside
                        id="color-key"
                        className="w-full lg:w-[320px] lg:shrink-0 lg:sticky lg:top-6 self-start"
                    >
                        <div className="p-5 border border-slate-200 rounded-2xl bg-slate-50 shadow-sm">
                            <h3 className="text-base font-extrabold text-slate-800 mb-1">Element Types</h3>
                            <p className="text-xs text-slate-500 mb-4">Filter the periodic table by category.</p>
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-2">
                                {FILTER_BUTTONS.map((item) => (
                                    <ControlButton
                                        key={item.id}
                                        label={item.label}
                                        active={activeFilter === item.id}
                                        onClick={() => setActiveFilter(item.id)}
                                    />
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* Table Container - auto fits available width */}
                    <div className="flex-1 min-w-0 w-full pb-6 rounded-3xl border border-slate-200 bg-white shadow-sm p-3 sm:p-5">
                        <div ref={tableViewportRef} className="w-full overflow-hidden">
                            <div
                                className="mx-auto relative"
                                style={{
                                    width: `${TABLE_BASE_WIDTH * tableScale}px`,
                                    height: tableHeight ? `${tableHeight}px` : "auto",
                                }}
                            >
                                <div
                                    ref={tableContentRef}
                                    style={{
                                        width: `${TABLE_BASE_WIDTH}px`,
                                        transform: `scale(${tableScale})`,
                                        transformOrigin: "top left",
                                    }}
                                >
                                    <table className="w-full border-separate border-spacing-[2px] table-fixed">
                                <tbody>
                                    {/* Row 1 */}
                                    <tr>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("nonmetal")} onClick={() => router.push("/elements/hydrogen")}>
                                            <h2 className="font-bold text-xl">H</h2><h3 className="text-sm">Hydrogen</h3>
                                        </td>
                                        {Array(16).fill(null).map((_, i) => <React.Fragment key={i}>{emptyCell}</React.Fragment>)}
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("noble")} onClick={() => router.push("/elements/helium")}>
                                            <h2 className="font-bold text-xl">He</h2><h3 className="text-sm">Helium</h3>
                                        </td>
                                    </tr>

                                    {/* Row 2 */}
                                    <tr>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("alkali")} onClick={() => router.push("/elements/lithium")}>
                                            <h2 className="font-bold text-xl">Li</h2><h3 className="text-sm">Lithium</h3>
                                        </td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("alkaline")} onClick={() => router.push("/elements/beryllium")}>
                                            <h2 className="font-bold text-xl">Be</h2><h3 className="text-sm">Beryllium</h3>
                                        </td>
                                        {Array(10).fill(null).map((_, i) => <React.Fragment key={i}>{emptyCell}</React.Fragment>)}
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("semimetal")} onClick={() => router.push("/elements/boron")}>
                                            <h2 className="font-bold text-xl">B</h2><h3 className="text-sm">Boron</h3>
                                        </td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("nonmetal")} onClick={() => router.push("/elements/carbon")}>
                                            <h2 className="font-bold text-xl">C</h2><h3 className="text-sm">Carbon</h3>
                                        </td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("nonmetal")} onClick={() => router.push("/elements/nitrogen")}>
                                            <h2 className="font-bold text-xl">N</h2><h3 className="text-sm">Nitrogen</h3>
                                        </td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("nonmetal")} onClick={() => router.push("/elements/oxygen")}>
                                            <h2 className="font-bold text-xl">O</h2><h3 className="text-sm">Oxygen</h3>
                                        </td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("nonmetal")} onClick={() => router.push("/elements/fluorine")}>
                                            <h2 className="font-bold text-xl">F</h2><h3 className="text-sm">Fluorine</h3>
                                        </td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("noble")} onClick={() => router.push("/elements/neon")}>
                                            <h2 className="font-bold text-xl">Ne</h2><h3 className="text-sm">Neon</h3>
                                        </td>
                                    </tr>

                                    {/* Row 3 */}
                                    <tr>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("alkali")} onClick={() => router.push("/elements/sodium")}>
                                            <h2 className="font-bold text-xl">Na</h2><h3 className="text-sm">Sodium</h3>
                                        </td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("alkaline")} onClick={() => router.push("/elements/magnesium")}>
                                            <h2 className="font-bold text-xl">Mg</h2><h3 className="text-sm">Magnesium</h3>
                                        </td>
                                        {Array(10).fill(null).map((_, i) => <React.Fragment key={i}>{emptyCell}</React.Fragment>)}
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("poormetal")} onClick={() => router.push("/elements/aluminium")}>
                                            <h2 className="font-bold text-xl">Al</h2><h3 className="text-sm">Aluminium</h3>
                                        </td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("semimetal")} onClick={() => router.push("/elements/silicon")}>
                                            <h2 className="font-bold text-xl">Si</h2><h3 className="text-sm">Silicon</h3>
                                        </td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("nonmetal")} onClick={() => router.push("/elements/phosphorus")}>
                                            <h2 className="font-bold text-xl">P</h2><h3 className="text-sm">Phosphorus</h3>
                                        </td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("nonmetal")} onClick={() => router.push("/elements/sulfur")}>
                                            <h2 className="font-bold text-xl">S</h2><h3 className="text-sm">Sulfur</h3>
                                        </td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("nonmetal")} onClick={() => router.push("/elements/chlorine")}>
                                            <h2 className="font-bold text-xl">Cl</h2><h3 className="text-sm">Chlorine</h3>
                                        </td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("noble")} onClick={() => router.push("/elements/argon")}>
                                            <h2 className="font-bold text-xl">Ar</h2><h3 className="text-sm">Argon</h3>
                                        </td>
                                    </tr>

                                    {/* Row 4 */}
                                    <tr>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("alkali")} onClick={() => router.push("/elements/potassium")}>
                                            <h2 className="font-bold text-xl">K</h2><h3 className="text-sm">Potassium</h3>
                                        </td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("alkaline")} onClick={() => router.push("/elements/calcium")}>
                                            <h2 className="font-bold text-xl">Ca</h2><h3 className="text-sm">Calcium</h3>
                                        </td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("transition")} onClick={() => router.push("/elements/scandium")}>
                                            <h2 className="font-bold text-xl">Sc</h2><h3 className="text-sm">Scandium</h3>
                                        </td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("transition")} onClick={() => router.push("/elements/titanium")}>
                                            <h2 className="font-bold text-xl">Ti</h2><h3 className="text-sm">Titanium</h3>
                                        </td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("transition")} onClick={() => router.push("/elements/vanadium")}>
                                            <h2 className="font-bold text-xl">V</h2><h3 className="text-sm">Vanadium</h3>
                                        </td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("transition")} onClick={() => router.push("/elements/chromium")}>
                                            <h2 className="font-bold text-xl">Cr</h2><h3 className="text-sm">Chromium</h3>
                                        </td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("transition")} onClick={() => router.push("/elements/manganese")}>
                                            <h2 className="font-bold text-xl">Mn</h2><h3 className="text-sm">Manganese</h3>
                                        </td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("transition")} onClick={() => router.push("/elements/iron")}>
                                            <h2 className="font-bold text-xl">Fe</h2><h3 className="text-sm">Iron</h3>
                                        </td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("transition")} onClick={() => router.push("/elements/cobalt")}>
                                            <h2 className="font-bold text-xl">Co</h2><h3 className="text-sm">Cobalt</h3>
                                        </td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("transition")} onClick={() => router.push("/elements/nickel")}>
                                            <h2 className="font-bold text-xl">Ni</h2><h3 className="text-sm">Nickel</h3>
                                        </td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("transition")} onClick={() => router.push("/elements/copper")}>
                                            <h2 className="font-bold text-xl">Cu</h2><h3 className="text-sm">Copper</h3>
                                        </td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("transition")} onClick={() => router.push("/elements/zinc")}>
                                            <h2 className="font-bold text-xl">Zn</h2><h3 className="text-sm">Zinc</h3>
                                        </td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("poormetal")} onClick={() => router.push("/elements/gallium")}>
                                            <h2 className="font-bold text-xl">Ga</h2><h3 className="text-sm">Gallium</h3>
                                        </td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("semimetal")} onClick={() => router.push("/elements/germanium")}>
                                            <h2 className="font-bold text-xl">Ge</h2><h3 className="text-sm">Germanium</h3>
                                        </td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("semimetal")} onClick={() => router.push("/elements/arsenic")}>
                                            <h2 className="font-bold text-xl">As</h2><h3 className="text-sm">Arsenic</h3>
                                        </td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("semimetal")} onClick={() => router.push("/elements/selenium")}>
                                            <h2 className="font-bold text-xl">Se</h2><h3 className="text-sm">Selenium</h3>
                                        </td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("nonmetal")} onClick={() => router.push("/elements/bromine")}>
                                            <h2 className="font-bold text-xl">Br</h2><h3 className="text-sm">Bromine</h3>
                                        </td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("noble")} onClick={() => router.push("/elements/krypton")}>
                                            <h2 className="font-bold text-xl">Kr</h2><h3 className="text-sm">Krypton</h3>
                                        </td>
                                    </tr>

                                    {/* Row 5 */}
                                    <tr>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("alkali")} onClick={() => router.push("/elements/rubidium")}>
                                            <h2 className="font-bold text-xl">Rb</h2><h3 className="text-sm">Rubidium</h3>
                                        </td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("alkaline")} onClick={() => router.push("/elements/strontium")}>
                                            <h2 className="font-bold text-xl">Sr</h2><h3 className="text-sm">Strontium</h3>
                                        </td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("transition")} onClick={() => router.push("/elements/yttrium")}>
                                            <h2 className="font-bold text-xl">Y</h2><h3 className="text-sm">Yttrium</h3>
                                        </td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("transition")} onClick={() => router.push("/elements/zirconium")}>
                                            <h2 className="font-bold text-xl">Zr</h2><h3 className="text-sm">Zirconium</h3>
                                        </td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("transition")} onClick={() => router.push("/elements/niobium")}>
                                            <h2 className="font-bold text-xl">Nb</h2><h3 className="text-sm">Niobium</h3>
                                        </td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("transition")} onClick={() => router.push("/elements/molybdenum")}>
                                            <h2 className="font-bold text-xl">Mo</h2><h3 className="text-sm">Molybdenum</h3>
                                        </td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("transition")} onClick={() => router.push("/elements/technetium")}>
                                            <h2 className="font-bold text-xl">Tc</h2><h3 className="text-sm">Technetium</h3>
                                        </td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("transition")} onClick={() => router.push("/elements/ruthenium")}>
                                            <h2 className="font-bold text-xl">Ru</h2><h3 className="text-sm">Ruthenium</h3>
                                        </td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("transition")} onClick={() => router.push("/elements/rhodium")}>
                                            <h2 className="font-bold text-xl">Rh</h2><h3 className="text-sm">Rhodium</h3>
                                        </td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("transition")} onClick={() => router.push("/elements/palladium")}>
                                            <h2 className="font-bold text-xl">Pd</h2><h3 className="text-sm">Palladium</h3>
                                        </td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("transition")} onClick={() => router.push("/elements/silver")}>
                                            <h2 className="font-bold text-xl">Ag</h2><h3 className="text-sm">Silver</h3>
                                        </td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("transition")} onClick={() => router.push("/elements/cadmium")}>
                                            <h2 className="font-bold text-xl">Cd</h2><h3 className="text-sm">Cadmium</h3>
                                        </td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("poormetal")} onClick={() => router.push("/elements/indium")}>
                                            <h2 className="font-bold text-xl">In</h2><h3 className="text-sm">Indium</h3>
                                        </td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("poormetal")} onClick={() => router.push("/elements/tin")}>
                                            <h2 className="font-bold text-xl">Sn</h2><h3 className="text-sm">Tin</h3>
                                        </td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("semimetal")} onClick={() => router.push("/elements/antimony")}>
                                            <h2 className="font-bold text-xl">Sb</h2><h3 className="text-sm">Antimony</h3>
                                        </td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("semimetal")} onClick={() => router.push("/elements/tellurium")}>
                                            <h2 className="font-bold text-xl">Te</h2><h3 className="text-sm">Tellurium</h3>
                                        </td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("nonmetal")} onClick={() => router.push("/elements/iodine")}>
                                            <h2 className="font-bold text-xl">I</h2><h3 className="text-sm">Iodine</h3>
                                        </td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("noble")} onClick={() => router.push("/elements/xenon")}>
                                            <h2 className="font-bold text-xl">Xe</h2><h3 className="text-sm">Xenon</h3>
                                        </td>
                                    </tr>

                                    {/* Row 6 */}
                                    <tr>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("alkali")} onClick={() => router.push("/elements/cesium")}>
                                            <h2 className="font-bold text-xl">Cs</h2><h3 className="text-sm">Cesium</h3>
                                        </td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("alkaline")} onClick={() => router.push("/elements/barium")}>
                                            <h2 className="font-bold text-xl">Ba</h2><h3 className="text-sm">Barium</h3>
                                        </td>
                                        <td className="border border-black p-[5px] text-center" style={{ backgroundColor: COLORS.lanthanides }}>
                                            <h2 className="font-bold text-xl">*</h2><h3 className="text-sm">Lanthanides</h3>
                                        </td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("transition")} onClick={() => router.push("/elements/hafnium")}>
                                            <h2 className="font-bold text-xl">Hf</h2><h3 className="text-sm">Hafnium</h3>
                                        </td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("transition")} onClick={() => router.push("/elements/tantalum")}>
                                            <h2 className="font-bold text-xl">Ta</h2><h3 className="text-sm">Tantalum</h3>
                                        </td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("transition")} onClick={() => router.push("/elements/tungsten")}>
                                            <h2 className="font-bold text-xl">W</h2><h3 className="text-sm">Tungsten</h3>
                                        </td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("transition")} onClick={() => router.push("/elements/rhenium")}>
                                            <h2 className="font-bold text-xl">Re</h2><h3 className="text-sm">Rhenium</h3>
                                        </td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("transition")} onClick={() => router.push("/elements/osmium")}>
                                            <h2 className="font-bold text-xl">Os</h2><h3 className="text-sm">Osmium</h3>
                                        </td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("transition")} onClick={() => router.push("/elements/iridium")}>
                                            <h2 className="font-bold text-xl">Ir</h2><h3 className="text-sm">Iridium</h3>
                                        </td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("transition")} onClick={() => router.push("/elements/platinum")}>
                                            <h2 className="font-bold text-xl">Pt</h2><h3 className="text-sm">Platinum</h3>
                                        </td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("transition")} onClick={() => router.push("/elements/gold")}>
                                            <h2 className="font-bold text-xl">Au</h2><h3 className="text-sm">Gold</h3>
                                        </td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("transition")} onClick={() => router.push("/elements/mercury")}>
                                            <h2 className="font-bold text-xl">Hg</h2><h3 className="text-sm">Mercury</h3>
                                        </td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("poormetal")} onClick={() => router.push("/elements/thallium")}>
                                            <h2 className="font-bold text-xl">Tl</h2><h3 className="text-sm">Thallium</h3>
                                        </td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("poormetal")} onClick={() => router.push("/elements/lead")}>
                                            <h2 className="font-bold text-xl">Pb</h2><h3 className="text-sm">Lead</h3>
                                        </td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("poormetal")} onClick={() => router.push("/elements/bismuth")}>
                                            <h2 className="font-bold text-xl">Bi</h2><h3 className="text-sm">Bismuth</h3>
                                        </td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("semimetal")} onClick={() => router.push("/elements/polonium")}>
                                            <h2 className="font-bold text-xl">Po</h2><h3 className="text-sm">Polonium</h3>
                                        </td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("nonmetal")} onClick={() => router.push("/elements/astatine")}>
                                            <h2 className="font-bold text-xl">At</h2><h3 className="text-sm">Astatine</h3>
                                        </td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("noble")} onClick={() => router.push("/elements/radon")}>
                                            <h2 className="font-bold text-xl">Rn</h2><h3 className="text-sm">Radon</h3>
                                        </td>
                                    </tr>

                                    {/* Row 7 */}
                                    <tr>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("alkali")} onClick={() => router.push("/elements/francium")}>
                                            <h2 className="font-bold text-xl">Fr</h2><h3 className="text-sm">Francium</h3>
                                        </td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("alkaline")} onClick={() => router.push("/elements/radium")}>
                                            <h2 className="font-bold text-xl">Ra</h2><h3 className="text-sm">Radium</h3>
                                        </td>
                                        <td className="border border-black p-[5px] text-center" style={{ backgroundColor: COLORS.actinides }}>
                                            <h2 className="font-bold text-xl">**</h2><h3 className="text-sm">Actinides</h3>
                                        </td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("transition")} onClick={() => router.push("/elements/rutherfordium")}>
                                            <h2 className="font-bold text-xl">Rf</h2><h3 className="text-sm">Rutherfordium</h3>
                                        </td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("transition")} onClick={() => router.push("/elements/dubnium")}>
                                            <h2 className="font-bold text-xl">Db</h2><h3 className="text-sm">Dubnium</h3>
                                        </td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("transition")} onClick={() => router.push("/elements/seaborgium")}>
                                            <h2 className="font-bold text-xl">Sg</h2><h3 className="text-sm">Seaborgium</h3>
                                        </td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("transition")} onClick={() => router.push("/elements/bohrium")}>
                                            <h2 className="font-bold text-xl">Bh</h2><h3 className="text-sm">Bohrium</h3>
                                        </td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("transition")} onClick={() => router.push("/elements/hassium")}>
                                            <h2 className="font-bold text-xl">Hs</h2><h3 className="text-sm">Hassium</h3>
                                        </td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("transition")} onClick={() => router.push("/elements/meitnerium")}>
                                            <h2 className="font-bold text-xl">Mt</h2><h3 className="text-sm">Meitnerium</h3>
                                        </td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("transition")} onClick={() => router.push("/elements/darmstadtium")}>
                                            <h2 className="font-bold text-xl">Ds</h2><h3 className="text-sm">Darmstadtium</h3>
                                        </td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("transition")} onClick={() => router.push("/elements/roentgenium")}>
                                            <h2 className="font-bold text-xl">Rg</h2><h3 className="text-sm">Roentgenium</h3>
                                        </td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("transition")} onClick={() => router.push("/elements/copernicium")}>
                                            <h2 className="font-bold text-xl">Cn</h2><h3 className="text-sm">Copernicium</h3>
                                        </td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("unknown")} onClick={() => router.push("/elements/nihonium")}>
                                            <h2 className="font-bold text-xl">Nh</h2><h3 className="text-sm">Nihonium</h3>
                                        </td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("unknown")} onClick={() => router.push("/elements/flerovium")}>
                                            <h2 className="font-bold text-xl">Fl</h2><h3 className="text-sm">Flerovium</h3>
                                        </td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("unknown")} onClick={() => router.push("/elements/moscovium")}>
                                            <h2 className="font-bold text-xl">Mc</h2><h3 className="text-sm">Moscovium</h3>
                                        </td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("unknown")} onClick={() => router.push("/elements/livermorium")}>
                                            <h2 className="font-bold text-xl">Lv</h2><h3 className="text-sm">Livermorium</h3>
                                        </td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("unknown")} onClick={() => router.push("/elements/tennessine")}>
                                            <h2 className="font-bold text-xl">Ts</h2><h3 className="text-sm">Tennessine</h3>
                                        </td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("unknown")} onClick={() => router.push("/elements/oganesson")}>
                                            <h2 className="font-bold text-xl">Og</h2><h3 className="text-sm">Oganesson</h3>
                                        </td>
                                    </tr>

                                    {/* Lanthanide Expansion Row */}
                                    <tr>
                                        {emptyCell}{emptyCell}
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("lanthanides")} onClick={() => router.push("/elements/lanthanum")}><h2 className="font-bold text-xl">La</h2><h3 className="text-sm">Lanthanum</h3></td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("lanthanides")} onClick={() => router.push("/elements/cerium")}><h2 className="font-bold text-xl">Ce</h2><h3 className="text-sm">Cerium</h3></td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("lanthanides")} onClick={() => router.push("/elements/praseodymium")}><h2 className="font-bold text-xl">Pr</h2><h3 className="text-sm">Praseodymium</h3></td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("lanthanides")} onClick={() => router.push("/elements/neodymium")}><h2 className="font-bold text-xl">Nd</h2><h3 className="text-sm">Neodymium</h3></td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("lanthanides")} onClick={() => router.push("/elements/promethium")}><h2 className="font-bold text-xl">Pm</h2><h3 className="text-sm">Promethium</h3></td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("lanthanides")} onClick={() => router.push("/elements/samarium")}><h2 className="font-bold text-xl">Sm</h2><h3 className="text-sm">Samarium</h3></td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("lanthanides")} onClick={() => router.push("/elements/europium")}><h2 className="font-bold text-xl">Eu</h2><h3 className="text-sm">Europium</h3></td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("lanthanides")} onClick={() => router.push("/elements/gadolinium")}><h2 className="font-bold text-xl">Gd</h2><h3 className="text-sm">Gadolinium</h3></td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("lanthanides")} onClick={() => router.push("/elements/terbium")}><h2 className="font-bold text-xl">Tb</h2><h3 className="text-sm">Terbium</h3></td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("lanthanides")} onClick={() => router.push("/elements/dysprosium")}><h2 className="font-bold text-xl">Dy</h2><h3 className="text-sm">Dysprosium</h3></td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("lanthanides")} onClick={() => router.push("/elements/holmium")}><h2 className="font-bold text-xl">Ho</h2><h3 className="text-sm">Holmium</h3></td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("lanthanides")} onClick={() => router.push("/elements/erbium")}><h2 className="font-bold text-xl">Er</h2><h3 className="text-sm">Erbium</h3></td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("lanthanides")} onClick={() => router.push("/elements/thulium")}><h2 className="font-bold text-xl">Tm</h2><h3 className="text-sm">Thulium</h3></td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("lanthanides")} onClick={() => router.push("/elements/ytterbium")}><h2 className="font-bold text-xl">Yb</h2><h3 className="text-sm">Ytterbium</h3></td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("lanthanides")} onClick={() => router.push("/elements/lutetium")}><h2 className="font-bold text-xl">Lu</h2><h3 className="text-sm">Lutetium</h3></td>
                                        {emptyCell}
                                    </tr>

                                    {/* Actinide Expansion Row */}
                                    <tr>
                                        {emptyCell}{emptyCell}
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("actinides")} onClick={() => router.push("/elements/actinium")}><h2 className="font-bold text-xl">Ac</h2><h3 className="text-sm">Actinium</h3></td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("actinides")} onClick={() => router.push("/elements/thorium")}><h2 className="font-bold text-xl">Th</h2><h3 className="text-sm">Thorium</h3></td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("actinides")} onClick={() => router.push("/elements/protactinium")}><h2 className="font-bold text-xl">Pa</h2><h3 className="text-sm">Protactinium</h3></td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("actinides")} onClick={() => router.push("/elements/uranium")}><h2 className="font-bold text-xl">U</h2><h3 className="text-sm">Uranium</h3></td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("actinides")} onClick={() => router.push("/elements/neptunium")}><h2 className="font-bold text-xl">Np</h2><h3 className="text-sm">Neptunium</h3></td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("actinides")} onClick={() => router.push("/elements/plutonium")}><h2 className="font-bold text-xl">Pu</h2><h3 className="text-sm">Plutonium</h3></td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("actinides")} onClick={() => router.push("/elements/americium")}><h2 className="font-bold text-xl">Am</h2><h3 className="text-sm">Americium</h3></td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("actinides")} onClick={() => router.push("/elements/curium")}><h2 className="font-bold text-xl">Cm</h2><h3 className="text-sm">Curium</h3></td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("actinides")} onClick={() => router.push("/elements/berkelium")}><h2 className="font-bold text-xl">Bk</h2><h3 className="text-sm">Berkelium</h3></td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("actinides")} onClick={() => router.push("/elements/californium")}><h2 className="font-bold text-xl">Cf</h2><h3 className="text-sm">Californium</h3></td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("actinides")} onClick={() => router.push("/elements/einsteinium")}><h2 className="font-bold text-xl">Es</h2><h3 className="text-sm">Einsteinium</h3></td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("actinides")} onClick={() => router.push("/elements/fermium")}><h2 className="font-bold text-xl">Fm</h2><h3 className="text-sm">Fermium</h3></td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("actinides")} onClick={() => router.push("/elements/mendelevium")}><h2 className="font-bold text-xl">Md</h2><h3 className="text-sm">Mendelevium</h3></td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("actinides")} onClick={() => router.push("/elements/nobelium")}><h2 className="font-bold text-xl">No</h2><h3 className="text-sm">Nobelium</h3></td>
                                        <td className="border border-black p-[5px] text-center" style={getCellStyle("actinides")} onClick={() => router.push("/elements/lawrencium")}><h2 className="font-bold text-xl">Lr</h2><h3 className="text-sm">Lawrencium</h3></td>
                                        {emptyCell}
                                    </tr>

                                </tbody>
                            </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

function ControlButton({ label, onClick, active }: { label: string; onClick: () => void; active: boolean }) {
    return (
        <button
            onClick={onClick}
            className={`w-full px-4 py-2.5 text-sm font-bold rounded-xl transition-all active:scale-95 shadow-sm border ${active
                    ? "bg-slate-900 text-white border-slate-900"
                    : "bg-white text-slate-700 border-slate-200 hover:border-black hover:text-black"
                }`}
        >
            {label}
        </button>
    );
}
