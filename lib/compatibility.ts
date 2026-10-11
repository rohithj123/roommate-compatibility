export type SleepSchedule = "early" | "balanced" | "night";
export type CleanlinessLevel = 1 | 2 | 3 | 4;
export type HousingBudget = 600 | 800 | 1000;

export type RoommateProfile = {
  id: string;
  name: string;
  sleep: SleepSchedule;
  cleanliness: CleanlinessLevel;
  budget: HousingBudget;
  bio: string;
};

export type UserPreferences = Pick<
  RoommateProfile,
  "sleep" | "cleanliness" | "budget"
>;

export type CompatibilityFactor = {
  label: string;
  points: number;
  maxPoints: number;
  explanation: string;
};

export type CompatibilityResult = {
  profile: RoommateProfile;
  score: number;
  factors: CompatibilityFactor[];
};

export const roommateProfiles: RoommateProfile[] = [
  {
    id: "maya",
    name: "Maya Patel",
    sleep: "early",
    cleanliness: 4,
    budget: 800,
    bio: "An organized biology student who enjoys quiet mornings and meal prep.",
  },
  {
    id: "jordan",
    name: "Jordan Lee",
    sleep: "balanced",
    cleanliness: 3,
    budget: 1000,
    bio: "A friendly design student who likes a tidy shared space and movie nights.",
  },
  {
    id: "alex",
    name: "Alex Rivera",
    sleep: "night",
    cleanliness: 2,
    budget: 600,
    bio: "A relaxed computer science student who studies late and keeps a flexible routine.",
  },
  {
    id: "sam",
    name: "Sam Wilson",
    sleep: "night",
    cleanliness: 4,
    budget: 800,
    bio: "A clean and social business student who prefers evenings at home.",
  },
];

function calculateSleepFactor(
  userSleep: SleepSchedule,
  roommateSleep: SleepSchedule,
): CompatibilityFactor {
  if (userSleep === roommateSleep) {
    return {
      label: "Sleep schedule",
      points: 35,
      maxPoints: 35,
      explanation: "You have the same preferred sleep schedule.",
    };
  }

  const schedulesAreClose =
    (userSleep === "early" && roommateSleep === "balanced") ||
    (userSleep === "balanced" && roommateSleep === "early") ||
    (userSleep === "balanced" && roommateSleep === "night") ||
    (userSleep === "night" && roommateSleep === "balanced");

  return schedulesAreClose
    ? {
        label: "Sleep schedule",
        points: 20,
        maxPoints: 35,
        explanation: "Your schedules are close, but may need some compromise.",
      }
    : {
        label: "Sleep schedule",
        points: 5,
        maxPoints: 35,
        explanation: "Your sleep schedules are quite different.",
      };
}

function calculateCleanlinessFactor(
  userCleanliness: CleanlinessLevel,
  roommateCleanliness: CleanlinessLevel,
): CompatibilityFactor {
  const difference = Math.abs(userCleanliness - roommateCleanliness);
  const pointsByDifference = [35, 25, 12, 0];
  const points = pointsByDifference[difference];

  return {
    label: "Cleanliness",
    points,
    maxPoints: 35,
    explanation:
      difference === 0
        ? "You prefer the same level of cleanliness."
        : difference === 1
          ? "Your cleanliness preferences are similar."
          : difference === 2
            ? "Your cleanliness preferences may require discussion."
            : "Your cleanliness preferences are very different.",
  };
}

function calculateBudgetFactor(
  userBudget: HousingBudget,
  roommateBudget: HousingBudget,
): CompatibilityFactor {
  const difference = Math.abs(userBudget - roommateBudget);
  const pointsByDifference: Record<number, number> = {
    0: 30,
    200: 20,
    400: 10,
  };
  const points = pointsByDifference[difference] ?? 0;

  return {
    label: "Housing budget",
    points,
    maxPoints: 30,
    explanation:
      difference === 0
        ? "You have the same monthly housing budget."
        : difference === 200
          ? "Your budgets are close enough to explore shared options."
          : "Your budgets are far apart and may limit housing choices.",
  };
}

export function calculateCompatibility(
  preferences: UserPreferences,
  profile: RoommateProfile,
): CompatibilityResult {
  const factors = [
    calculateSleepFactor(preferences.sleep, profile.sleep),
    calculateCleanlinessFactor(preferences.cleanliness, profile.cleanliness),
    calculateBudgetFactor(preferences.budget, profile.budget),
  ];

  return {
    profile,
    score: factors.reduce((total, factor) => total + factor.points, 0),
    factors,
  };
}
