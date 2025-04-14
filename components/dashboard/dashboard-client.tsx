"use client";

import { useState } from "react";
import CardCaloriesDay from "./card-calories-day";
import CardCaloriesWeek from "./card-calories-week";
import TableListMeal from "./table-list-meal";

export default function DashboardClient() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleMealChange = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CardCaloriesDay refreshTrigger={refreshTrigger} />
        <CardCaloriesWeek refreshTrigger={refreshTrigger} />
      </div>
      <div className="bg-card rounded-lg border border-border shadow-sm">
        <TableListMeal onMealChange={handleMealChange} />
      </div>
    </>
  );
}