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

export default function Resource({ params }) {
  const resource = useQuery(api.resources.get, { id: params.id });

  if (!resource) return <div>Loading...</div>;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">{resource.title}</CardTitle>
            <CardDescription>{resource.category}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">{resource.description}</p>
            <a
              href={resource.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Visit Resource
            </a>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
