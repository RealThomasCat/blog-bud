import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

// We will get data for the post card from appwrite service
// $id is syntax of appwrite
function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full justify-center mb-4">
          <img
            className="rounded-xl"
            src={appwriteService.getFilePreview(featuredImage)} // Directly get the image from appwrite
            alt={title}
          />
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
