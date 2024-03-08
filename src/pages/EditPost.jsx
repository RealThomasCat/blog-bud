import React, { useState, useEffect } from "react";
import { Container, PostForm } from "../components";
import appwriteService from "../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {
  // Create a state to store the post
  const [post, setpost] = useState(null);
  // Slug is the unique identifier for the post
  const { slug } = useParams();
  // Create a navigate function to redirect the user
  const navigate = useNavigate();

  // Create a function to fetch the post whenever slug or navigate changes
  useEffect(() => {
    // If there is a slug, fetch the post else navigate to the home page
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setpost(post);
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  // Conditional rendering of the post form
  return post ? (
    <div className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
}

export default EditPost;
