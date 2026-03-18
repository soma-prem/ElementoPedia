// frontend/app/components/table/page.tsx
"use client";

import React, { useEffect, useState } from 'react';
import Navbar from '../navbar'; 

interface ElementData {
  _id: string;
  AtomicNumber: number;
  Symbol: string;
  Element: string;
  AtomicMass: number;
  Density: number;
  MeltingPoint:number;
  Color:number;
  Conductivity:string;
  Hardness:string;
  Reactivity:string;
  Valency:number;
  MetallicCharacter:string;
}

export default function TablePage() {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";
  const [elements, setElements] = useState<ElementData[]>([]);
  const [loading, setLoading] = useState(true);

 // frontend/app/components/table/page.tsx

// frontend/app/components/table/page.tsx

useEffect(() => {
  fetch(`${API_BASE_URL}/elements`)
    .then((res) => res.json())
    .then((data) => {
      console.log("Backend response:", data);

      if (Array.isArray(data)) {
        // --- ADDED SORTING LOGIC HERE ---
        // Sorts by AtomicNumber in ascending order (1, 2, 3...)
        const sortedData = data.sort((a: ElementData, b: ElementData) => a.AtomicNumber - b.AtomicNumber);
        
        setElements(sortedData);
      } else {
        console.error("API returned an error instead of a list:", data);
        setElements([]); 
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      setElements([]); 
    })
    .finally(() => {
      setLoading(false);
    });
}, []);

  return (
    <>
    <Navbar/>
    <div className="p-8 bg-gray-60 min-h-screen">
      
      <div className="max-w-8xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Periodic Table Data</h1>
        
        {loading ? (
           <p>Loading data...</p>
        ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full leading-normal">
            <thead>
            <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Atomic 
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Symbol
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Weight
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Density
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  MeltingPoint
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                   Color
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                   Hardness
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Reactivity
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                   Valency
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                   MetallicCharacter
                </th>
                
              </tr>
            </thead>
            <tbody>
              {elements.map((element) => (
                <tr key={element._id} className="hover:bg-gray-50">
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    <p className="text-gray-900 whitespace-no-wrap font-bold">
                      {element.AtomicNumber}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    <span className="relative inline-block px-3 py-1 font-semibold text-blue-900 leading-tight">
                      <span aria-hidden className="absolute inset-0 bg-blue-200 opacity-50 rounded-full"></span>
                      <span className="relative">{element.Symbol}</span>
                    </span>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {element.Element}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {element.AtomicMass}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {element.Density || 'N/A'}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {element.MeltingPoint || 'N/A'}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {element.Color || 'N/A'}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {element.Hardness || 'N/A'}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {element.Reactivity || 'N/A'}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {element.Valency || 'N/A'}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {element.MetallicCharacter || 'N/A'}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        )}
      </div>
    </div>
    </>
  );
}
