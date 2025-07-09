<p align="center">
  <strong>
  A comprehensive fitness platform API built with NestJS and TypeScript, providing backend services for gym management, fitness programs, social features, and user management.
  </strong>
</p>

## Business context
Problem:

gyms and fitness centers having issues with neuro ...
Solution: propose a mobile and application that will ...

## 🚀 Features

### Core Modules
- **Authentication & Authorization** - JWT-based auth with role management
- **User Management** - User profiles, preferences, and account management
- **Gym Management** - Gym profiles, manager tools, and facility management
- **Program Management** - Fitness programs, steps, and training plans
- **Social Features** - Ratings, reviews, and social interactions
- **Payment Processing** - Stripe integration for subscriptions and payments
- **Content Management** - Dynamic content and media handling
- **Maps & Location** - Geolocation services for gym discovery
- **Base Entities** - Core data models and shared functionality

### Technical Features
- **RESTful API** with comprehensive Swagger documentation
- **TypeORM** for database management with PostgreSQL
- **HTTPS Support** with SSL certificates
- **Email Services** with Mailer integration
- **Firebase Admin** for additional services
- **Docker Support** for containerized deployment
- **Comprehensive Testing** with Jest


## Tooling

- Platform: NodeJS 16+
- Framework: [NestJS](https://docs.nestjs.com/)
- Testing: Jest
- Database: PostGre
- Containeurization: Docker/Compose
- API: Swagger 3


## Design

### Modules
The Nextupfit API code is organized around [feature modules](https://docs.nestjs.com/modules).
All the application's modules are found in the folder `./src/modules`.
To create a modules type the command: `nest g module modules/module-name`
Then manually create the module's folders hierarchy as follow:

<pre>
src/
|- modules/
|  |- {module-name}
|  |  |
|  |  |- entity
|  |  |  |
|  |  |  |- {module-name}.{model1-name}.entity.ts
|  |  |  |
|  |  |  |- {module-name}.{model2-name}.entity.ts
|  |  |  |- ...
|  |  |     index.ts (export all entities)
|  |  |  
|  |  |- dto
|  |  |  |
|  |  |  |- create
|  |  |  |  |
|  |  |  |  |- create.{module-name}.{model1-name}.dto.ts
|  |  |  |  |- create.{module-name}.{model2-name}.dto.ts
|  |  |  |  |- ...
|  |  |  |     index.ts (export all dtos)
|  |  |  |  
|  |  |  |- update
|  |  |  |  |
|  |  |  |  |- update.{module-name}.{model1-name}.dto.ts
|  |  |  |  |- update.{module-name}.{model2-name}.dto.ts
|  |  |  |  |- ...
|  |  |  |     index.ts (export all dtos)
|  |  |  |  
|  |  |  |- details
|  |  |  |  |
|  |  |  |  |- details.{module-name}.{model1-name}.dto.ts
|  |  |  |  |- details.{module-name}.{model2-name}.dto.ts
|  |  |  |  |- ...
|  |  |  |     index.ts (export all dtos)
|  |  |  |  
|  |  |  |- paginated
|  |  |  |  |
|  |  |  |  |- paginated.details.{module-name}.{model1-name}.dto.ts
|  |  |  |  |- paginated.details.{module-name}.{model2-name}.dto.ts
|  |  |  |  |- ...
|  |  |  |     index.ts (export all dtos)
|  |  |  |  
|  |  |  |- find
|  |  |  |  |
|  |  |  |  |- order (enums classes for ordering paginated find queries data)
|  |  |  |  |  |
|  |  |  |  |  |- find.order.{module-name}.{model1-name}.enum.ts
|  |  |  |  |  |- find.order.{module-name}.{model2-name}.enum.ts
|  |  |  |  |  |- ...
|  |  |  |  |     index.ts (export all enums)
|  |  |  |  |- criteria
|  |  |  |  |  |
|  |  |  |  |  |- find.criteria.{module-name}.{model1-name}.dto.ts
|  |  |  |  |  |- find.criteria.{module-name}.{model2-name}.dto.ts
|  |  |  |  |  |- ...
|  |  |  |  |  |-   index.ts (export all dtos)
|  |  |  |  |  
|  |  |  |  |- index.ts (export all order enums and find dtos)
|  |  |  |  
|  |  |  |- index.ts (export all module artifacts)
|  |  |  
|  |  |- service
|  |  |
|  |  |  |- {module-name}.{model1-name}.service.ts
|  |  |  |- {module-name}.{model2-name}.service.ts
|  |  |  |- ...
|  |  |  |- index.ts (export all services)
|  |  |  
|  |  |- controller
|  |  |  |
|  |  |  |- {module-name}.{model1-name}.controller.ts
|  |  |  |- {module-name}.{model2-name}.controller.ts
|  |  |  |- ...
|  |  |  |- index.ts (export all controllers)
|  |  |  
|  |  |- types
|  |  |  |
|  |  |  |- {type1-name}.type.ts
|  |  |  |- {type2-name}.type.ts
|  |  |  |- ...
|  |  |  |- index.ts (export all types)
|  |  |  
|  |  |  
|  |  |- {module-name}.module.ts (export all module artifacts)
|  |  
|  |  
|  |
</pre>



### Important design patterns used
Here we are going to describe all the design patterns and how they implemented in the project

#### Architecture design
- [Modular structure](https://docs.nestjs.com/modules)
- microservices

#### App level design
- [12 factor app](https://12factor)

## Coding practices
- [Clean Coding standars](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882) well implemented by NestJS;
which is a very opinionated framework, offering code inspection tools out-of-box: `prettier`, `eslint`.

- [Sonar](https://www.sonarqube.org/)


