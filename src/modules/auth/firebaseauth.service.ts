import { Injectable } from "@nestjs/common";
import * as admin from "firebase-admin";
import * as serviceAccount from "./nextupfit-8f1e6-firebase-adminsdk-fwdqs-6df8e79369.json";

@Injectable()
export class FirebaseAuthService {
  constructor() {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: process.env.FB_DATABASE_URL,
    });
  }

  async verifyToken(idToken: string): Promise<admin.auth.DecodedIdToken> {
    return await admin.auth().verifyIdToken(idToken);
  }
}
