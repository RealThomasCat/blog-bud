// In this file we define the AuthService class and create an object of it

import conf from "../conf.js";
import { Client, Account, ID } from "appwrite";

// AuthService class
export class AuthService {
  // Properties
  client = new Client();
  account; // here we are not using new Account() because:

  /*
    -> As per the Appwrite docs, the Account has to be made after the client is set up
    -> Docs:
        const client = new Client();
            .setEndpoint('[API]') // Your API Endpoint
            .setProject('[PROJECT_ID]') // Your project ID

        const account = new Account(client);
  */

  // Whenever a authService object is created, the constructor is called
  constructor() {
    // Set endpoint and project ID as mentioned in the Appwrite docs
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  // Methods to call appwrite services:

  // Create account
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        // create is a method of the Account class
        ID.unique,
        email,
        password,
        name
      ); // ID.unique is used to generate a unique ID for the account

      if (userAccount) {
        // If account is created, login
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  // Login
  async login({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password); // createEmailSession is a method of the Account class
    } catch (error) {
      throw error;
    }
  }

  // Get current user
  async getCurrentUser() {
    try {
      return await this.account.get(); // get is a method of the Account class
    } catch (error) {
      console.log("Appwrite service :: getCurrentUser :: error: ", error);
    }

    // If there is an error, return null (we can also use if-else)
    return null;
  }

  // Logout
  async logout() {
    try {
      await this.account.deleteSessions(); // deleteSessions is a method of the Account class
    } catch (error) {
      console.log("Appwrite service :: logout :: error: ", error);
    }
  }
}

// Object of AuthService class
// Whoever uses this class will have to create an object of it
const authService = new AuthService();

// Export the object
export default authService;
