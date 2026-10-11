import type {
  CleanlinessLevel,
  CompatibilityResult,
  SleepSchedule,
} from "../lib/compatibility";

type MatchCardProps = {
  result: CompatibilityResult;
  rank: number;
};

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

export default function MatchCard({ result, rank }: MatchCardProps) {
  const colors = getMatchColors(result.score);

  return (
    <article className="rounded-2xl bg-white p-6 shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-blue-600">#{rank} match</p>
          <h3 className="mt-1 text-xl font-bold">{result.profile.name}</h3>
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
          <dd className="mt-1 font-semibold">${result.profile.budget}</dd>
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
}
