import { Injectable } from "@nestjs/common";
import * as admin from "firebase-admin";
import * as serviceAccount from "./nextupfit-qondala-firebase-adminsdk-fbsvc-3424da1144.json";

@Injectable()
export class FirebaseAuthService {
  constructor() {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      // databaseURL: process.env.FB_DATABASE_URL,
    });
  }

  async verifyToken(idToken: string): Promise<admin.auth.DecodedIdToken> {
    return await admin.auth().verifyIdToken(idToken);
  }
}
