import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello(): string {
    return `
    <center style="margin-top: 10%;">
      <h1>NEXTUPFIT Platform 🏋️‍♀️ - API </h1> 
      <h3>Social fitness platform</h3>
      <p>Nextupfit is a social fitness platform that allows users to connect, follow coaches and nutritionists, participate in training courses and track their progress.</p>
      <h3>Use case</h3>
      <ul>
        <li>Use <a href="https://api.npf.moneydey.ltd/doc">the RESTful API</a> to interact with the various functionalities of the platform.</li>
        <li>Use Swagger documentation tools to explore the API and get detailed information about endpoints.</li>
      </ul>
    </center>
    `;
  }
}
