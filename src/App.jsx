import { Routes, Route } from "react-router-dom";
import { NavigationBar, Footer } from "./components";
import { Dashboard, Contributions, Goals } from "./pages";
import { SavingsProvider } from "./contexts/SavingsContext.js";
import { useState, useEffect } from "react";

function App() {
  const [goals, setGoals] = useState([]);
  const [contributions, setContributions] = useState([]);

  // Fetch the goals and contributions on the first render.
  useEffect(() => {
    const storedGoals = JSON.parse(localStorage.getItem("goals"));
    const storedContributions = JSON.parse(
      localStorage.getItem("contributions")
    );

    if (storedGoals && storedGoals.length > 0) {
      setGoals(storedGoals);
    }

    if (storedContributions && storedContributions.length > 0) {
      setContributions(storedContributions);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("goals", JSON.stringify(goals));
  }, [goals]);

  useEffect(() => {
    localStorage.setItem("contributions", JSON.stringify(contributions));
  }, [contributions]);

  const getGoalStats = (goalId) => {
    const goalContributions = contributions.filter((c) => c.goalId === goalId);
    const currentBalance = goalContributions.reduce(
      (sum, contribution) => sum + contribution.contributionAmount,
      0
    );

    const goal = goals.find((g) => g.id === goalId);
    const progressPercent = goal
      ? Math.round((currentBalance / goal.targetAmount) * 100)
      : 0;

    return {
      currentBalance,
      progressPercent: Math.min(progressPercent, 100),
    };
  };

  // adding a savings (this will trigger the use effect hook and save the item to localStorage, since goals has changed)
  const addGoal = (newGoal) => {
    const goal = {
      id: Date.now(),
      goalName: newGoal.goalName,
      targetAmount: Number(newGoal.targetAmount),
      createdAt: new Date().toISOString(),
    };
    setGoals((prev) => [...prev, goal]);
  };

  const addContribution = (goalId, amount) => {
    if (amount <= 0) {
      throw new Error("Contribution must be positive");
    }

    const contribution = {
      id: Date.now(),
      goalId: goalId,
      contributionAmount: Number(amount),
      createdAt: new Date().toLocaleString(),
    };

    setContributions((prev) => [...prev, contribution]);
  };

  // Get goal by ID
  const getGoal = (goalId) => {
    return goals.find((g) => g.id === Number(goalId));
  };

  // Get goal name
  const getGoalName = (goalId) => {
    const goal = getGoal(goalId);
    return goal ? goal.goalName : "Unknown Goal";
  };

  // Get contributions for a specific goal
  const getContributionsByGoal = (goalId) => {
    return contributions.filter((c) => c.goalId === Number(goalId));
  };

  // Get goals with calculated stats
  const getGoalsWithStats = () => {
    return goals.map((goal) => {
      const stats = getGoalStats(goal.id);
      return {
        ...goal,
        currentBalance: stats.currentBalance,
        progressPercent: stats.progressPercent,
      };
    });
  };

  const value = {
    goals,
    contributions,
    addGoal,
    addContribution,
    getGoalName,
    getGoalStats,
    getGoalsWithStats,
  };

  return (
    <SavingsProvider value={value}>
      <div className="d-flex flex-column min-vh-100">
        <NavigationBar />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/contributions" element={<Contributions />} />
            <Route path="/goals" element={<Goals />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </SavingsProvider>
  );
}

export default App;
