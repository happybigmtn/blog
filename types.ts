import { Id } from "@/convex/_generated/dataModel";

export interface Post {
  _id: Id<"posts">;
  _creationTime: number;
  title: string;
  content: string;
  category: string;
  tags: string[];
  authorId: string;
}

export interface Resource {
  _id: Id<"resources">;
  title: string;
  description: string;
  category: string;
  link: string;
}

export interface Goal {
  _id: Id<"goals">;
  goal: string;
  description: string;
  category: string;
  progress: number;
  userId: string;
}
