import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello(): string {
    return `
    <center style="margin-top: 10%;">
      <h1> NEXTUPFIT Platform 🏋️‍♀️ - API </h1> 
      <h3> Plateforme Sociale de Fitness </h3>
      <p>Ce projet est une plateforme sociale de fitness qui permet aux utilisateurs de se connecter, de suivre des coachs et des nutritionnistes, de participer à des formations et de suivre leur progression.</p>
      <h3>Utilisation </h3>
      <ul>
        <li>Utilisez <a href="https://api.npf.moneydey.ltd/api">l'API RESTful</a> pour interagir avec les différentes fonctionnalités de la plateforme.</li>
        <li>Utilisez les outils de documentation Swagger pour explorer l'API et obtenir des informations détaillées sur les endpoints.</li>
      </ul>
    </center>
    `;
  }
}
