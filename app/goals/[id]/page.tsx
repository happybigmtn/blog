"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Layout from "@/components/Layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Id } from "@/convex/_generated/dataModel";

interface GoalParams {
  params: {
    id: Id<"goals">;
  };
}

export default function Goal({ params }: GoalParams) {
  const goal = useQuery(api.goals.get, { id: params.id });

  if (!goal) return <div>Loading...</div>;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">{goal.goal}</CardTitle>
            <CardDescription>{goal.category}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">{goal.description}</p>
            <div className="mb-2">Progress: {goal.progress}%</div>
            <progress value={goal.progress} max="100" className="w-full" />
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
