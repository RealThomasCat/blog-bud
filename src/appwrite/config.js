import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

// Service class
export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  // Methods of the Service class

  // Create post
  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        // createDocument is a method of the Databases class
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug, // document ID (we can also use ID.unique to generate a unique ID)
        // The following data will be stored in the document
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: createPost :: error: ", error);
    }
  }

  // Update post
  async updatePost(slug, { title, content, featuredImage, status }) {
    // slug is used to identify the document
    try {
      return await this.databases.updateDocument(
        // updateDocument is a method of the Databases class
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        // Following data will be updated in the document
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: updatePost :: error: ", error);
    }
  }

  // Delete post
  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        // No need to return here
        // deleteDocument is a method of the Databases class
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      // return true if the document is deleted
      return true;
    } catch (error) {
      console.log("Appwrite service :: deletePost :: error: ", error);
      return false;
    }
  }

  // Get post
  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        // getDocument is a method of the Databases class
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("Appwrite service :: getPost :: error: ", error);
      return false;
    }
  }

  // Get posts : We need all the posts whose status is active
  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        // listDocuments is a method of the Databases class
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries // same as [Query.equal("status", "active")]
      );
    } catch (error) {
      console.log("Appwrite service :: getPosts :: error: ", error);
      return false;
    }
  } // Syntax says queries to be passed as an array

  // File upload services

  // Upload file
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        // createFile is a method of the Storage class
        conf.appwriteBucketId,
        ID.unique(), // file ID
        file
      );
    } catch (error) {
      console.log("Appwrite service :: uploadFile :: error: ", error);
      return false;
    }
  }

  // Delete file
  async deleteFile(fileId) {
    try {
      // We will pass the file ID to delete the file
      await this.deleteFile(conf.appwriteBucketId, fileId); // No need to return here, deleteFile is a method of the Storage class
      return true;
    } catch (error) {
      console.log("Appwrite service :: deleteFile :: error: ", error);
      return false;
    }
  }

  // Get file preview : Returns a url
  // No need for async await here (Documentation also didn't used promise/async-await)
  getFilePreview(fileId) {
    return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
  }
}

// Service object
const service = new Service();

export default service;
