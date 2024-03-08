import React from "react";
import { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/config"; // import the appwrite service

function AllPosts() {
  // Create a state to store the posts
  const [posts, setPosts] = useState([]);

  // Create a function to fetch the posts
  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
      // If there are posts, set the state
      if (posts) {
        setPosts(posts.documents); // Set the posts state
      }
    });
  }, []);

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1">
              <PostCard post={post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
