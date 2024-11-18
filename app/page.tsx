"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { fetchVehicleMakes } from "@/src/lib/api";
import { VehicleMake } from "@/src/types";

const TEN_SECONDS = 10000;

export default function HomePage() {
  const [makes, setMakes] = useState<VehicleMake[]>([]);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [selectedMake, setSelectedMake] = useState<number | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  useEffect(() => {
    const loadMakes = async () => {
      try {
        const vehicleMakes = await fetchVehicleMakes();
        setMakes(vehicleMakes);
      } catch {
        setFetchError("Failed to fetch vehicle makes");

        setTimeout(() => {
          setFetchError(null);
        }, TEN_SECONDS);
      }
    };
    loadMakes();
  }, []);

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 2014 },
    (_, i) => currentYear - i
  );

  if (fetchError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-100 text-red-700 p-4 rounded-md mb-4 flex flex-col gap-2">
          {fetchError}

          <button
            onClick={() => window.location.reload()}
            className="btn-primary"
          >
            Reload
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col gap-8 items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Vehicle Finder</h1>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            Select Vehicle Make
          </label>
          <select
            value={selectedMake || ""}
            onChange={(e) => setSelectedMake(Number(e.target.value))}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select Make</option>
            {makes.map((make) => (
              <option key={make.MakeId} value={make.MakeId}>
                {make.MakeName}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Select Model Year</label>
          <select
            value={selectedYear || ""}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select Year</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <Link
          href={
            selectedMake && selectedYear
              ? `/result/${selectedMake}/${selectedYear}`
              : "#"
          }
          className={`w-full btn-primary text-center block ${
            selectedMake && selectedYear ? "" : "btn-disabled"
          }`}
        >
          Next
        </Link>
      </div>
    </div>
  );
}
