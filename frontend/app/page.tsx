"use client"; // Required for auth checks

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from "./components/navbar";
import { auth } from './firebase'; // Import auth to check status
import { onAuthStateChanged, User } from 'firebase/auth';

export default function Home() {
  const [user, setUser] = useState<User | null>(null);

  // Check login state separately here to control the Center Button
  useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
      });
      return () => unsubscribe();
  }, []);

  return (
      <main className="relative w-full h-screen overflow-hidden">
         
          <div className="absolute inset-0 w-full h-full -z-10">
              <video 
                  src="/videos/peroidic.mp4" 
                  className="w-full h-full object-cover"
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
              />
              <div className="absolute inset-0 bg-black/20"></div>
          </div>

          <Navbar />

          {user && (
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                <Link href="/components/periodic">
                    <button className="text-white font-bold bg-black/30 cursor-pointer border border-white px-6 py-3 rounded-2xl hover:bg-black/50 transition-all">
                        EXPLORE ELEMENTS
                    </button>
                </Link>
            </div>
          )}
      </main>
  );
}