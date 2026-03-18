// frontend/app/about/page.tsx
"use client";

import React from 'react';
import Navbar from '../navbar';

export default function AboutPage() {
  return (
    <main className="relative w-full min-h-screen font-sans">
      {/* Background Video */}
      <video
        id="bg-video"
        autoPlay
        muted
        loop
        playsInline
        className="fixed top-0 left-0 w-full h-full object-cover -z-10"
      >
        <source src="/videos/peroidic.mp4" type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>

      {/* Dark Overlay */}
      <div className="fixed top-0 left-0 w-full h-full bg-black/50 -z-10"></div>

      <Navbar />

      {/* Container */}
      <div className="w-[1000px] max-w-[95%] h-auto min-h-[500px] bg-[#2f302f7e] mx-auto mt-[35px] rounded-[20px] pt-[60px] pb-10 text-white backdrop-blur-sm">
        
        {/* First Box - Title */}
        {/* CHANGED: mb-[80px] -> mb-8 (approx 32px) to reduce the gap */}
        <div className="w-full h-[60px] bg-[#6b6d6be5] mb-4 flex items-center justify-center">
          <h1 className="text-2xl font-bold tracking-wider">ELEMENTOPEDIA</h1>
        </div>

        {/* Second Box - Content */}
        <div className="min-h-[250px] flex justify-center items-center p-8 text-justify">
          <p className="leading-relaxed text-lg">
            Welcome to <strong>Elementopedia</strong>, your trusted source for everything related to the Periodic Table and the fascinating world of chemical elements.<br /><br />
            Our mission is to provide a complete, reliable, and engaging platform where users can explore the elements in detail — from their atomic structure and discovery history to their real-world uses and fun facts.<br /><br />
            Whether you're a student, teacher, or a curious learner, Elementopedia is designed to make learning chemistry more interactive, visual, and exciting. We aim to simplify science through modern design, rich visuals, and accurate data.<br /><br /><br />
            If you have suggestions or want to collaborate, feel free to reach out at: <br /><br />
            <b>Email : </b><em className="text-blue-200">somaprem103@gmail.com</em><br /><br />
            <b>Linkdin : </b>.
          </p>
        </div>
      </div>
    </main>
  );
}