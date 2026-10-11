
"use client";

import { useState } from "react";
import type {
  CleanlinessLevel,
  HousingBudget,
  SleepSchedule,
} from "../lib/compatibility";

export default function Home() {
  const [sleep, setSleep] = useState<SleepSchedule>("night");
  const [cleanliness, setCleanliness] = useState<CleanlinessLevel>(3);
  const [budget, setBudget] = useState<HousingBudget>(800);
  const [score, setScore] = useState<number | null>(null);

  function calculateMatch() {
    let points = 0;

    // Compare answers against a sample roommate
    if (sleep === "night") points += 30;
    if (cleanliness === 3) points += 35;
    if (budget === 800) points += 35;

    setScore(points);
  }

  return (
    <main className="min-h-screen bg-slate-100 p-8 text-slate-900">
      <div className="mx-auto max-w-xl rounded-xl bg-white p-8 shadow-lg">
        <h1 className="mb-2 text-3xl font-bold">
          MoveIn Match
        </h1>

        <p className="mb-8 text-gray-600">
          Find out how compatible you are with a potential roommate!
        </p>

        <div className="mb-5">
          <label className="mb-2 block font-semibold">
            Sleep Schedule
          </label>
          <select
            className="w-full rounded border p-3"
            value={sleep}
            onChange={(e) => {
              setSleep(e.target.value as SleepSchedule);
              setScore(null);
            }}
          >
            <option value="early">Early Bird</option>
            <option value="night">Night Owl</option>
          </select>
        </div>

        <div className="mb-5">
          <label className="mb-2 block font-semibold">
            Cleanliness Preference
          </label>
          <select
            className="w-full rounded border p-3"
            value={cleanliness}
            onChange={(e) => {
              setCleanliness(Number(e.target.value) as CleanlinessLevel);
              setScore(null);
            }}
          >
            <option value="1">Very Relaxed</option>
            <option value="2">Somewhat Relaxed</option>
            <option value="3">Moderately Clean</option>
            <option value="4">Very Clean</option>
          </select>
        </div>

        <div className="mb-5">
          <label className="mb-2 block font-semibold">
            Monthly Housing Budget
          </label>
          <select
            className="w-full rounded border p-3"
            value={budget}
            onChange={(e) => {
              setBudget(Number(e.target.value) as HousingBudget);
              setScore(null);
            }}
          >
            <option value="600">$600</option>
            <option value="800">$800</option>
            <option value="1000">$1000</option>
          </select>
        </div>

        <button
          onClick={calculateMatch}
          className="w-full rounded-lg bg-blue-600 p-3 font-semibold text-white hover:bg-blue-700"
        >
          Calculate Compatibility
        </button>

        {score !== null && (
          <div className="mt-6 rounded-lg bg-blue-50 p-5 text-center">
            <h2 className="text-xl font-bold">
              Compatibility Score
            </h2>
            <p className="mt-2 text-4xl font-bold text-blue-600">
              {score}%
            </p>
            <p className="mt-2 text-sm text-gray-600">
              Based on your preferences compared to a sample roommate.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
