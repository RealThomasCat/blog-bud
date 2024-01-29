// Production grade way to load/import environment variables
// Instead of using import.meta.env.VAR_NAME everywhere, we will use ...
// This prevents errors like env variables not loading
// This will also make sure that we always get string values from env variables

const conf = {
  appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
  appwriteProjectId: String(import.meta.env.VITE_PROJECT_ID),
  appwriteDatabaseId: String(import.meta.env.VITE_DATABASE_ID),
  appwriteCollectionId: String(import.meta.env.VITE_COLLECTION_ID),
  appwriteBucketId: String(import.meta.env.VITE_BUCKET_ID),
};

export default conf;
