"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import PageLayout from "@/components/PageLayout";
import SearchBar from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  CalendarIcon,
  CodeIcon,
  BookOpenIcon,
  LanguagesIcon,
  DumbbellIcon,
  UtensilsIcon,
  BrainIcon,
} from "lucide-react";
import { Post } from "@/types";

export default function Home() {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2">My Learning Journey</h1>
          <p className="text-xl text-muted-foreground">
            Tracking progress in CS, Math, Korean, Training, Food, and Personal
            Growth
          </p>
        </header>

        <SearchBar />

        <Suspense fallback={<div>Loading posts...</div>}>
          <PostsList />
        </Suspense>

        {/* Remove or modify ResourcesList and GoalsList as needed */}
      </div>
    </PageLayout>
  );
}

function PostsList() {
  const posts = useQuery(api.posts.list);
  const categories = [
    { name: "CS", icon: <CodeIcon className="w-4 h-4" /> },
    { name: "Math", icon: <BookOpenIcon className="w-4 h-4" /> },
    { name: "Korean", icon: <LanguagesIcon className="w-4 h-4" /> },
    { name: "Training", icon: <DumbbellIcon className="w-4 h-4" /> },
    { name: "Food", icon: <UtensilsIcon className="w-4 h-4" /> },
    { name: "Reflections", icon: <BrainIcon className="w-4 h-4" /> },
  ];

  if (!posts || posts.length === 0) {
    return <p>No posts found.</p>;
  }

  return (
    <Tabs defaultValue="all" className="mb-8">
      <TabsList>
        <TabsTrigger value="all">All</TabsTrigger>
        {categories.map((category) => (
          <TabsTrigger key={category.name} value={category.name.toLowerCase()}>
            <span className="flex items-center gap-2">
              {category.icon}
              {category.name}
            </span>
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value="all">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post: Post) => (
            <Card key={post._id}>
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>
                  <span className="flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4" />
                    {new Date(post._creationTime).toLocaleDateString()}
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground flex items-center gap-2 mb-2">
                  {categories.find((cat) => cat.name === post.category)?.icon}
                  {post.category}
                </p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Link href={`/posts/${post._id}`} passHref>
                  <Button variant="outline">Read More</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </TabsContent>
      {categories.map((category) => (
        <TabsContent key={category.name} value={category.name.toLowerCase()}>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {posts
              ?.filter((post: Post) => post.category === category.name)
              .map((post: Post) => (
                <Card key={post._id}>
                  <CardHeader>
                    <CardTitle>{post.title}</CardTitle>
                    <CardDescription>
                      <span className="flex items-center gap-2">
                        <CalendarIcon className="w-4 h-4" />
                        {new Date(post._creationTime).toLocaleDateString()}
                      </span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground flex items-center gap-2 mb-2">
                      {category.icon}
                      {category.name}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link href={`/posts/${post._id}`} passHref>
                      <Button variant="outline">Read More</Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
