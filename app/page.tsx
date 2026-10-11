"use client";

import { useState } from "react";
import {
  calculateCompatibility,
  roommateProfiles,
  type CleanlinessLevel,
  type CompatibilityResult,
  type HousingBudget,
  type SleepSchedule,
} from "../lib/compatibility";

const sleepLabels: Record<SleepSchedule, string> = {
  early: "Early Bird",
  balanced: "Flexible Schedule",
  night: "Night Owl",
};

const cleanlinessLabels: Record<CleanlinessLevel, string> = {
  1: "Very Relaxed",
  2: "Somewhat Relaxed",
  3: "Moderately Clean",
  4: "Very Clean",
};

function getMatchLabel(score: number) {
  if (score >= 80) return "Great match";
  if (score >= 60) return "Promising match";
  return "Worth discussing";
}

function getMatchColors(score: number) {
  if (score >= 80) return { bar: "bg-emerald-500", text: "text-emerald-700" };
  if (score >= 60) return { bar: "bg-amber-500", text: "text-amber-700" };
  return { bar: "bg-slate-500", text: "text-slate-700" };
}

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
              {results.map((result, index) => {
                const colors = getMatchColors(result.score);

                return (
                  <article
                    key={result.profile.id}
                    className="rounded-2xl bg-white p-6 shadow-md"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-blue-600">
                          #{index + 1} match
                        </p>
                        <h3 className="mt-1 text-xl font-bold">
                          {result.profile.name}
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-slate-600">
                          {result.profile.bio}
                        </p>
                      </div>
                      <div className="shrink-0 text-right">
                        <p className={`text-3xl font-bold ${colors.text}`}>
                          {result.score}%
                        </p>
                        <p className="text-xs font-medium text-slate-500">
                          {getMatchLabel(result.score)}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-slate-200">
                      <div
                        className={`h-full rounded-full ${colors.bar}`}
                        style={{ width: `${result.score}%` }}
                      />
                    </div>

                    <dl className="mt-5 grid grid-cols-3 gap-3 rounded-lg bg-slate-50 p-3 text-center text-xs">
                      <div>
                        <dt className="text-slate-500">Sleep</dt>
                        <dd className="mt-1 font-semibold">
                          {sleepLabels[result.profile.sleep]}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-slate-500">Cleanliness</dt>
                        <dd className="mt-1 font-semibold">
                          {cleanlinessLabels[result.profile.cleanliness]}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-slate-500">Budget</dt>
                        <dd className="mt-1 font-semibold">
                          ${result.profile.budget}
                        </dd>
                      </div>
                    </dl>

                    <div className="mt-5 border-t border-slate-100 pt-4">
                      <h4 className="text-sm font-bold">Why this score?</h4>
                      <ul className="mt-3 space-y-2">
                        {result.factors.map((factor) => (
                          <li
                            key={factor.label}
                            className="flex items-start justify-between gap-3 text-sm"
                          >
                            <span className="text-slate-600">
                              <span className="font-semibold text-slate-800">
                                {factor.label}:
                              </span>{" "}
                              {factor.explanation}
                            </span>
                            <span className="shrink-0 font-semibold text-slate-700">
                              {factor.points}/{factor.maxPoints}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
