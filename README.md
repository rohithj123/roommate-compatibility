# Roommate Compatibility Calculator

## Project Overview

This project was developed for the CSCE 490 Research Milestone at the University of South Carolina. It serves as an individual prototype for our team's capstone project, **MoveIn Match**, a platform designed to help college students find compatible roommates based on their lifestyles and personal preferences.

The goal of this application is to explore the technologies we plan to use for our capstone project while developing a functional roommate matching system.

## Features

- **Lifestyle Questionnaire:** Users can select their sleep schedule, cleanliness preferences, and monthly housing budget.
- **Sample Roommate Profiles:** The application contains fictional roommate profiles with different lifestyle preferences.
- **Compatibility Scoring:** A matching algorithm compares user preferences against each roommate profile and calculates a compatibility percentage.
- **Ranked Matches:** Potential roommates are ranked based on their compatibility scores.
- **Match Breakdown:** Users can view how their preferences compare with each roommate across different categories.
- **Interactive Interface:** Users can change their preferences and recalculate results.

## Technologies Used

- **Next.js:** Framework used to structure and run the application.
- **React:** Handles interactive components and user input.
- **TypeScript:** Provides type safety and supports the compatibility scoring logic.
- **Tailwind CSS:** Used for styling and responsive layouts.
- **Node.js and npm:** Used to manage dependencies and run the development environment.

## Getting Started

### Prerequisites

Make sure Node.js and npm are installed.

### Installation

1. Clone the repository:

   `git clone https://github.com/rohithj123/roommate-compatibility.git`

2. Navigate into the project directory:

   `cd roommate-compatibility`

3. Install dependencies:

   `npm install`

4. Start the development server:

   `npm run dev`

5. Open your browser and navigate to:

   `http://localhost:3000`

## How the Compatibility System Works

The application compares a user's lifestyle preferences against a set of predefined roommate profiles.

Each category, including sleep schedule, cleanliness, and housing budget, contributes to an overall compatibility score. The matching logic considers how closely the preferences align and calculates a percentage representing the compatibility between two roommates.

The application then ranks potential roommates based on their scores, allowing users to identify which profiles best match their preferences.

## Research Milestone

This application was created to gain hands-on experience with Next.js, React, TypeScript, and Tailwind CSS before beginning full development of our team's capstone project.

Through this project, I practiced building interactive components, managing application state, processing user input, organizing TypeScript code, and implementing a basic matching algorithm.

The prototype demonstrates some of the core functionality that could eventually be incorporated into the full MoveIn Match platform.

## Author

Rohith Joseph  
University of South Carolina  
CSCE 490 — Capstone Computing Project  
Fall 2026
