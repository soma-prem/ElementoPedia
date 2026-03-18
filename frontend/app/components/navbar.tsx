// frontend/app/components/navbar.tsx
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link'; // Import Link for client-side navigation
import { auth, provider } from '../firebase'; 
import { signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth';

const Navbar = () => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    const handleSignIn = async () => {
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error("Error signing in:", error);
        }
    };

    const handleSignOut = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    return (
        <div className="w-full h-16 bg-black flex items-center justify-between px-4 z-50 relative">
            <div>
                <img src="/images/title.png" className="w-70 h-10 object-contain" alt="Title" />
            </div>

            <div className="flex items-center gap-12">
                {!user ? (
                    <button onClick={handleSignIn} className="text-white cursor-pointer hover:text-gray-300">
                        Sign-in
                    </button>
                ) : (
                    <>
                        <span className="text-white">Hello, {user.displayName}</span>
                        {/* Updated Links */}
                        <Link href="/" className="text-white hover:text-gray-300">Home</Link>
                        <Link href="/components/table" className="text-white hover:text-gray-300">Table</Link>
                        <Link href="/components/about" className="text-white hover:text-gray-300">About</Link>

                        <button onClick={handleSignOut} className="text-red-400 cursor-pointer border-1 border-gray px-3 py-1 rounded hover:text-red-300 hover:border-gray-200">
                            Logout
                        </button>                            
                    </>
                )}
            </div>
        </div >
    );
}

export default Navbar;
