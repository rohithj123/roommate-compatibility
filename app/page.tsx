"use client";

import { useState } from "react";
import MatchCard from "../components/MatchCard";
import {
  calculateCompatibility,
  roommateProfiles,
  type CleanlinessLevel,
  type CompatibilityResult,
  type HousingBudget,
  type SleepSchedule,
} from "../lib/compatibility";

export default function Home() {
  const [sleep, setSleep] = useState<SleepSchedule>("night");
  const [cleanliness, setCleanliness] = useState<CleanlinessLevel>(3);
  const [budget, setBudget] = useState<HousingBudget>(800);
  const [results, setResults] = useState<CompatibilityResult[] | null>(null);

  function calculateMatches() {
    const rankedResults = roommateProfiles
      .map((profile) =>
        calculateCompatibility({ sleep, cleanliness, budget }, profile),
      )
      .sort((first, second) => second.score - first.score);

    setResults(rankedResults);
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10 text-slate-900 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 text-center">
          <p className="mb-2 text-sm font-semibold tracking-[0.2em] text-blue-600 uppercase">
            Roommate compatibility prototype
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            MoveIn Match
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            Choose your lifestyle preferences to find roommates with compatible
            routines, cleanliness habits, and housing budgets.
          </p>
        </header>

        <section className="mx-auto max-w-3xl rounded-2xl bg-white p-6 shadow-lg sm:p-8">
          <h2 className="text-xl font-bold">Your preferences</h2>
          <p className="mt-1 text-sm text-slate-600">
            We use these answers to compare you with four sample roommates.
          </p>

          <div className="mt-6 grid gap-5 md:grid-cols-3">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold">
                Sleep schedule
              </span>
              <select
                className="w-full rounded-lg border border-slate-300 bg-white p-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                value={sleep}
                onChange={(event) => {
                  setSleep(event.target.value as SleepSchedule);
                  setResults(null);
                }}
              >
                <option value="early">Early Bird</option>
                <option value="balanced">Flexible Schedule</option>
                <option value="night">Night Owl</option>
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold">
                Cleanliness
              </span>
              <select
                className="w-full rounded-lg border border-slate-300 bg-white p-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                value={cleanliness}
                onChange={(event) => {
                  setCleanliness(
                    Number(event.target.value) as CleanlinessLevel,
                  );
                  setResults(null);
                }}
              >
                <option value="1">Very Relaxed</option>
                <option value="2">Somewhat Relaxed</option>
                <option value="3">Moderately Clean</option>
                <option value="4">Very Clean</option>
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold">
                Monthly housing budget
              </span>
              <select
                className="w-full rounded-lg border border-slate-300 bg-white p-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                value={budget}
                onChange={(event) => {
                  setBudget(Number(event.target.value) as HousingBudget);
                  setResults(null);
                }}
              >
                <option value="600">$600</option>
                <option value="800">$800</option>
                <option value="1000">$1,000</option>
              </select>
            </label>
          </div>

          <button
            onClick={calculateMatches}
            className="mt-6 w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 focus:outline-none"
          >
            Find compatible roommates
          </button>
        </section>

        <section className="mx-auto mt-6 grid max-w-3xl gap-4 rounded-2xl border border-blue-100 bg-blue-50 p-5 sm:grid-cols-3">
          <div className="sm:col-span-3">
            <h2 className="font-bold text-blue-950">How scoring works</h2>
            <p className="mt-1 text-sm text-blue-900">
              Exact matches earn the most points. Similar preferences still earn
              partial credit, reflecting the compromises real roommates make.
            </p>
          </div>
          <div className="rounded-lg bg-white/70 p-3 text-sm text-blue-950">
            <p className="font-bold">35 points</p>
            <p>Sleep schedule</p>
          </div>
          <div className="rounded-lg bg-white/70 p-3 text-sm text-blue-950">
            <p className="font-bold">35 points</p>
            <p>Cleanliness level</p>
          </div>
          <div className="rounded-lg bg-white/70 p-3 text-sm text-blue-950">
            <p className="font-bold">30 points</p>
            <p>Housing budget</p>
          </div>
        </section>

        {results && (
          <section className="mt-10">
            <div className="mb-5 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-2xl font-bold">Your ranked matches</h2>
                <p className="text-slate-600">
                  Scores are based on sleep, cleanliness, and budget preferences.
                </p>
              </div>
              <p className="text-sm font-medium text-slate-500">
                Best match shown first
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {results.map((result, index) => (
                <MatchCard
                  key={result.profile.id}
                  result={result}
                  rank={index + 1}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
