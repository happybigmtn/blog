"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useConvexAuth } from "convex/react";
import Layout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon, MessageCircleIcon } from "lucide-react";

export default function Post({ params }) {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const post = useQuery(api.posts.get, { id: params.id });
  const comments = useQuery(api.posts.listComments, { postId: params.id });
  const [newComment, setNewComment] = useState("");
  const addComment = useMutation(api.posts.addComment);

  const handleCommentSubmit = async () => {
    if (newComment.trim() !== "" && isAuthenticated) {
      await addComment({
        postId: params.id,
        content: newComment,
      });
      setNewComment("");
    }
  };

  if (!post) return <div>Loading...</div>;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">{post.title}</CardTitle>
            <CardDescription>
              <span className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4" />
                {new Date(post._creationTime).toLocaleDateString()}
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">{post.category}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag, index) => (
                <Badge key={index} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </CardContent>
          <CardFooter className="flex flex-col items-start gap-4">
            <h3 className="text-xl font-semibold">Comments</h3>
            {comments?.map((comment, index) => (
              <Card key={index} className="w-full">
                <CardHeader>
                  <CardTitle className="text-sm font-medium">
                    {comment.authorId}
                  </CardTitle>
                  <CardDescription>
                    {new Date(comment._creationTime).toLocaleString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{comment.content}</p>
                </CardContent>
              </Card>
            ))}
            {isAuthenticated ? (
              <div className="w-full">
                <Textarea
                  placeholder="Add a comment"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="mb-2"
                />
                <Button onClick={handleCommentSubmit}>
                  <MessageCircleIcon className="w-4 h-4 mr-2" />
                  Comment
                </Button>
              </div>
            ) : (
              <p>Please sign in to comment.</p>
            )}
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
}
