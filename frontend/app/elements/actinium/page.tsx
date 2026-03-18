"use client";

import React, { useState } from "react";
import Navbar from "../../components/navbar";
import Link from "next/link";

export default function ActiniumPage() {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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
    } catch (error) {
      setResponse("Error connecting to EleMind.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* PAGE CONTAINER */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 text-slate-900 font-sans">

        {/* ================= HERO CARD ================= */}
        <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-200 p-12 mb-20">

          {/* TITLE */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-black tracking-tight">ACTINIUM</h1>
            <hr className="mt-4 w-24 mx-auto border-2 border-yellow-400 rounded-full" />
          </div>

          {/* HERO CONTENT */}
          <div className="flex flex-col lg:flex-row gap-12 items-center justify-center overflow-hidden">
             
            {/* ANIMATION SECTION */}
            <div className="relative flex-1 flex items-center justify-center min-h-[700px] bg-slate-50 rounded-[2rem] border border-slate-100 overflow-hidden p-8 w-full">
              <style>{`
                @keyframes spin {
                  from { transform: rotate(0deg); }
                  to { transform: rotate(360deg); }
                }
                @keyframes progress {
                  0% { width: 0%; }
                  100% { width: 100%; }
                }
                .electron { width: 8px; height: 8px; background-color: #ef4444; border-radius: 50%; position: absolute; top: 50%; left: 50%; box-shadow: 0 0 5px rgba(239, 68, 68, 0.8); }
                .orbit-ring { border: 1px solid #cbd5e1; border-radius: 50%; position: absolute; }
              `}</style>

              {/* Element Tile (Floating) */}
              <div className="absolute top-8 left-8 z-10 w-40 h-40 bg-[#eff15f] rounded-3xl flex flex-col justify-between items-center p-6 shadow-2xl border-2 border-white/30 transform hover:scale-105 transition-transform duration-300">
                <p className="self-start text-sm font-black opacity-50 text-yellow-950">89</p>
                <h2 className="text-6xl font-black tracking-tighter text-yellow-900 drop-shadow-md">Ac</h2>
                <div className="text-center">
                  <h3 className="text-lg font-bold text-yellow-900">Actinium</h3>
                  <p className="text-xs font-mono font-bold text-yellow-800">[227]</p>
                </div>
              </div>

              {/* Orbit Animation (7 Shells) */}
              <div className="relative flex items-center justify-center scale-75 lg:scale-90">
                {/* Nucleus */}
                <div className="w-12 h-12 bg-yellow-400 rounded-full shadow-[0_0_25px_rgba(251,191,36,0.8)] z-20 flex items-center justify-center text-[10px] font-bold text-yellow-900 text-center leading-tight">
                  89P<br/>138N
                </div>

                {/* Orbit Rings */}
                <div className="orbit-ring w-[120px] h-[120px]"></div>
                <div className="orbit-ring w-[200px] h-[200px]"></div>
                <div className="orbit-ring w-[280px] h-[280px]"></div>
                <div className="orbit-ring w-[360px] h-[360px]"></div>
                <div className="orbit-ring w-[440px] h-[440px]"></div>
                <div className="orbit-ring w-[520px] h-[520px]"></div>
                <div className="orbit-ring w-[600px] h-[600px]"></div>

                {/* Electrons by Shell */}
                {/* Orbit 1 - 2e */}
                <div className="absolute inset-0" style={{ animation: 'spin 4s linear infinite' }}>
                  <div className="electron" style={{ transform: 'translate(-50%, -50%)' }}></div>
                  <div className="electron" style={{ transform: 'translate(-50%, 550%)' }}></div>
                </div>

                {/* Shells */}
                {[
                  { name: 'K', color: 'border-green-300' },
                  { name: 'L', color: 'border-blue-300' },
                  { name: 'M', color: 'border-indigo-300' },
                  { name: 'N', color: 'border-purple-300' },
                  { name: 'O', color: 'border-pink-300' },
                  { name: 'P', color: 'border-rose-300' },
                  { name: 'Q', color: 'border-orange-300' },
                ].map((shell, i) => (
                  <div
                    key={shell.name}
                    className={`absolute border-2 border-dashed ${shell.color} rounded-full`}
                    style={{
                      width: `${100 + i * 60}px`,
                      height: `${100 + i * 60}px`,
                      animation: `spin ${5 + i * 2}s linear ${i % 2 === 0 ? 'infinite' : 'reverse infinite'}`
                    }}
                  >
                    <div className="w-3 h-3 bg-red-500 rounded-full absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-md border border-white"></div>
                    <div className="w-3 h-3 bg-red-500 rounded-full absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 shadow-md border border-white"></div>
                  </div>
                ))}
                {/* Orbit 2 - 8e */}
                <div className="absolute inset-0" style={{ animation: 'spin 4s linear reverse infinite' }}>
                  <div className="electron" style={{ transform: 'translate(-550%, 550%)' }}></div>
                  <div className="electron" style={{ transform: 'translate(450%, 550%)' }}></div>
                  <div className="electron" style={{ transform: 'translate(-50%, 1050%)' }}></div>
                  <div className="electron" style={{ transform: 'translate(-50%, 50%)' }}></div>
                  <div className="electron" style={{ transform: 'translate(-400%, 200%)' }}></div>
                  <div className="electron" style={{ transform: 'translate(350%, 200%)' }}></div>
                  <div className="electron" style={{ transform: 'translate(350%, 900%)' }}></div>
                  <div className="electron" style={{ transform: 'translate(-400%, 900%)' }}></div>
                </div>

                {/* Orbit 3 - 18e */}
                <div className="absolute inset-0" style={{ animation: 'spin 4s linear infinite' }}>
                  {[ [-750, 750], [-750, 950], [650, 750], [650, 950], [-50, 150], [-50, 1550], [-550, 1350], [-550, 350], [450, 350], [450, 1350], [600, 580], [600, 1130], [-700, 580], [200, 1500], [-300, 1500], [-350, 200], [250, 200], [-700, 1150] ].map((t, idx) => (
                    <div key={idx} className="electron" style={{ transform: `translate(${t[0]}%, ${t[1]}%)` }}></div>
                  ))}
                </div>

                {/* Orbit 4 - 32e */}
                <div className="absolute inset-0" style={{ animation: 'spin 4s linear reverse infinite' }}>
                  {[ [-700, 500], [-700, 1800], [600, 1800], [600, 500], [850, 1150], [-950, 1150], [-50, 230], [-50, 2050], [-420, 1990], [300, 1990], [300, 300], [-400, 300], [-900, 800], [800, 800], [800, 1500], [-900, 1500], [-800, 630], [-800, 1660], [-800, 1660], [720, 1660], [720, 630], [450, 380], [450, 1910], [-570, 1910], [-570, 390], [-240, 250], [-240, 2030], [130, 2030], [130, 250], [840, 980], [-950, 980], [-950, 1330], [850, 1330] ].map((t, idx) => (
                    <div key={idx} className="electron" style={{ transform: `translate(${t[0]}%, ${t[1]}%)` }}></div>
                  ))}
                </div>

                {/* Orbit 5 - 18e */}
                <div className="absolute inset-0" style={{ animation: 'spin 4s linear infinite' }}>
                  {[ [-50, 350], [-50, 2550], [-850, 2200], [750, 2200], [750, 700], [-850, 700], [-1150, 1500], [1050, 1500], [-1100, 1050], [950, 1900], [400, 450], [-500, 2450], [-1050, 1900], [400, 2450], [1000, 1050], [-520, 450], [-300, 370], [180, 370] ].map((t, idx) => (
                    <div key={idx} className="electron" style={{ transform: `translate(${t[0]}%, ${t[1]}%)` }}></div>
                  ))}
                </div>

                {/* Orbit 6 - 9e */}
                <div className="absolute inset-0" style={{ animation: 'spin 4s linear reverse infinite' }}>
                  {[ [0, 450], [0, 3050], [1250, 1750], [-1350, 1750], [-1050, 900], [950, 900], [950, 2600], [-1050, 2600], [-550, 550] ].map((t, idx) => (
                    <div key={idx} className="electron" style={{ transform: `translate(${t[0]}%, ${t[1]}%)` }}></div>
                  ))}
                </div>

                {/* Orbit 7 - 2e */}
                <div className="absolute inset-0" style={{ animation: 'spin 4s linear infinite' }}>
                  <div className="electron" style={{ transform: 'translate(-50%, 550%)' }}></div>
                  <div className="electron" style={{ transform: 'translate(-50%, 3550%)' }}></div>
                </div>
              </div>

              {/* Legend */}
              <div className="absolute bottom-8 right-8 bg-white/95 backdrop-blur-md p-5 rounded-[1.5rem] shadow-xl border border-slate-200 text-xs font-bold space-y-2 hidden sm:block">
                <div className="text-slate-500 mb-2">Electron Shells:</div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                  <span>K: 2</span><span>L: 8</span>
                  <span>M: 18</span><span>N: 32</span>
                  <span>O: 18</span><span>P: 9</span>
                  <span>Q: 2</span>
                  <span className="text-green-600">K: 2</span><span className="text-violet-600">L: 8</span>
                  <span className="text-blue-600">M: 18</span><span className="text-lime-600">N: 32</span>
                  <span className="text-orange-600">O: 18</span><span className="text-red-600">P: 9</span>
                  <span className="text-amber-900">Q: 2</span>
                </div>
              </div>
            </div>

            {/* IMAGE SECTION */}
            <div className="flex-1 w-full">
                <img
                  src="/images/elements/actinium.jpg"
                  alt="Actinium Image"
                  className="w-full h-[500px] object-cover rounded-[2rem] shadow-xl border-4 border-white"
                />
              </div>
            </div>
        </div>

        {/* ================= DETAILS ================= */}
        {/* DETAILS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <Card title="Element Details" accent="border-yellow-500">
            <Detail label="Symbol" value="Ac" />
            <Detail label="Atomic Number" value="89" />
            <Detail label="Atomic Mass" value="[227] u" />
            <Detail label="Electron Configuration" value="[Rn] 6d¹ 7s²" />
            <Detail label="Category" value="Actinide" />
            <Detail label="Group" value="3" />
            <Detail label="Period" value="7" />
            <Detail label="Block" value="d-block" />
            <Detail label="State (RT)" value="Solid" />
            <Detail label="Color" value="Silvery-white" />
            <Detail label="Category" value="Actinide" />
            <Detail label="State at Room Temperature" value="Solid" />
            <Detail label="Color" value="Silvery-white metal" />
            <Detail label="Density" value="~10.07 g/cm³" />
            <Detail label="Melting Point" value="~1050 °C" />
            <Detail label="Boiling Point" value="~3200 °C" />
          </Card>

          <Card title="Discovery & Sources" accent="border-blue-500">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold mb-2">Discovery</h3>
                <p className="leading-relaxed text-slate-700 text-justify">
                  Actinium was discovered in 1899 by French chemist <strong>André-Louis Debierne</strong> while working with the Curies on pitchblende residue. He named it from the Greek word <em>aktinos</em>, meaning "ray" or "beam," due to its intense radioactivity.
                  Actinium was discovered in 1899 by French chemist <strong>André-Louis Debierne</strong> while he was working with the Curies on a residue from pitchblende, the same ore from which they discovered polonium and radium. He named it "actinium" from the Greek word <em>aktinos</em>, meaning "<strong>ray</strong>" or "<strong>beam</strong>," because of its intense radioactivity. It was also independently discovered in 1902 by Friedrich Oskar Giesel, who named it "emanium," but Debierne's name was officially adopted.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">Abundance & Sources</h3>
                <p className="leading-relaxed text-slate-700 text-justify">
                  Extremely rare in nature, it occurs as a decay product of uranium-235. One ton of uranium ore contains only about 0.2 grams of actinium. It is mostly produced synthetically in nuclear reactors.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* ================= VIDEO + FACTS ================= */}
        {/* INDUSTRIAL & USES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-20">
          <Card title="Industrial Preparation" accent="border-green-500">
            <p className="leading-relaxed text-slate-700 text-justify">
              Due to its rarity and radioactivity, actinium is not produced commercially on a large scale. It is typically synthesized in a nuclear reactor by bombarding the isotope <strong>radium-226</strong> with neutrons. This process is used to produce small amounts of actinium for scientific and medical research.
            </p>
          </Card>
          <Card title="Uses" accent="border-orange-500">
            <ul className="list-disc list-inside space-y-2 text-slate-700">
              <li>Actinium has no significant commercial applications. Its primary use is in <strong>scientific research</strong>, where it is used as a powerful source of alpha particles.</li>
              <li>The radioisotope <strong>Actinium-225</strong> is currently being researched for use in <strong>targeted alpha therapy</strong>, a new form of cancer treatment that uses the potent alpha radiation to destroy cancer cells with minimal damage to surrounding healthy tissue.</li>
              <li>It can also be used as a neutron source in certain specialized laboratory settings.</li>
            </ul>
          </Card>
        </div>

        {/* VIDEO + FACTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-20">
           <Card title="Watch & Learn" accent="border-red-500">
            <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-xl border-4 border-white">
              <iframe
                src="https://www.youtube.com/embed/rKm0ShaJNFM"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>
          </Card>

          <Card title="Facts & More Info" accent="border-indigo-500">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold mb-2">Interesting Facts</h3>
                <ul className="list-disc list-inside space-y-2 text-slate-700">
                  <li>It is about 150 times more radioactive than radium.</li>
                  <li>It glows faintly in the dark with a pale blue light.</li>
                  <li>It is the namesake of the actinide series (elements 89-103).</li>
                </ul>
              </div>
              <div className="bg-yellow-50 p-4 rounded-xl border-l-4 border-yellow-500">
                <h3 className="text-lg font-bold text-yellow-900 mb-1">Did You Know?</h3>
                <p className="text-yellow-800 italic">
                  Actinium-225 is being researched for targeted alpha therapy, a promising new form of cancer treatment that destroys cancer cells with minimal damage to healthy tissue.
                  The intense radioactivity of actinium makes it a powerful source of alpha particles, which can be used to produce neutrons. In equilibrium with its decay products, a sample of actinium can be a more powerful source of radiation than a similar amount of radium.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">More Information</h3>
                <a href="https://en.wikipedia.org/wiki/Actinium" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  Wikipedia - Actinium
                </a>
              </div>
            </div>
          </Card>
        </div>

        {/* ================= AI SECTION ================= */}
        {/* AI SECTION */}
        <Card title="Ask EleMind AI" accent="border-purple-500" className="mt-20">
          <div className="flex items-center gap-4 mb-6">
            <img src="/images/mini.png" className="w-16 h-16 rounded-full shadow-md bg-white p-1" alt="AI Model" />
            <h3 className="text-2xl font-bold text-purple-900">Ask EleMind</h3>
          </div>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask something about Actinium..."
            className="w-full h-32 p-5 rounded-2xl border border-slate-300 bg-slate-50 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <div className="flex flex-col gap-4 mt-4">
            <button
              onClick={handleSendPrompt}
              disabled={isLoading}
              className="px-8 py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition disabled:opacity-60 w-fit"
            >
              {isLoading ? "Thinking..." : "Ask EleMind"}
            </button>
            {isLoading && (
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                <div className="bg-purple-600 h-full animate-[progress_6s_linear_forwards]" />
              </div>
            )}
          </div>
          {response && (
            <div className="mt-6 p-5 bg-purple-50 text-purple-900 rounded-2xl border border-purple-200 whitespace-pre-wrap leading-relaxed">
              {response}
            </div>
          )}
        </Card>

        {/* ================= BACK ================= */}
        {/* BACK */}
        <div className="mt-20 flex justify-center">
          <Link
            href="/components/periodic"
            className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition"
          >
            ← Back to Periodic Table
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */
function Card({ title, children, accent, className = "" }: any) {
  return (
    <div className={`bg-white p-10 rounded-[2.5rem] shadow-lg border-t-4 ${accent} ${className}`}>
      <h2 className="text-2xl font-extrabold mb-6">{title}</h2>
      {children}
    </div>
  );
}

function Detail({ label, value }: any) {
  return (
    <div className="flex justify-between border-b border-slate-100 py-2">
      <span className="text-slate-500">{label}</span>
      <span className="font-bold">{value}</span>
    </div>
  );
}
