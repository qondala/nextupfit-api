import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDatabase1719196503771 implements MigrationInterface {
  name = "CreateDatabase1719196503771";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "content_nutrition" ("id" SERIAL NOT NULL, "contentId" integer, "nutritionProgramId" integer, CONSTRAINT "PK_50ef592c700d331569c5683af9e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "nutrition_detail" ("id" SERIAL NOT NULL, "mealType" character varying NOT NULL, "ingredients" character varying, "preparation" character varying, "calories" integer, "proteins" numeric(5,2), "carbs" numeric(5,2), "fats" numeric(5,2), "nutritionProgramId" integer, CONSTRAINT "PK_93b990b0d38da1a35b160f104a4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "nutrition_program_review" ("id" SERIAL NOT NULL, "rating" integer NOT NULL, "reviewText" character varying, "reviewDate" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, "nutritionProgramId" integer, CONSTRAINT "PK_998e5e954396f42119e172bdbb9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_nutrition" ("id" SERIAL NOT NULL, "startDate" date, "adherencePercentage" numeric(5,2) NOT NULL DEFAULT '100', "userId" integer, "nutritionProgramId" integer, CONSTRAINT "PK_03ee075542b09eb1a35a90a940b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_nutrition_progress" ("id" SERIAL NOT NULL, "dateLogged" date NOT NULL, "mealsConsumed" json, "caloriesIntake" integer, "proteinIntake" numeric(5,2), "carbsIntake" numeric(5,2), "fatsIntake" numeric(5,2), "adherenceScore" numeric(5,2), "userId" integer, "nutritionProgramId" integer, CONSTRAINT "PK_d8e1ae68bcbfa8c2b4351ce1283" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "nutrition_program" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "coachId" integer, CONSTRAINT "PK_d150f537be3b72c71699f06ba95" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "exercise_nutrition" ("id" SERIAL NOT NULL, "exerciseId" integer, "nutritionProgramId" integer, CONSTRAINT "PK_7250e0138a5c510ebc96a08b848" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "progress" ("id" SERIAL NOT NULL, "isCompleted" boolean NOT NULL DEFAULT false, "completedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, "exerciseId" integer, CONSTRAINT "PK_79abdfd87a688f9de756a162b6f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "exercise" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying, "videoUrl" character varying, "duration" integer, "goalSpecifics" character varying, "contentId" integer, CONSTRAINT "PK_a0f107e3a2ef2742c1e91d97c14" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "exercise_goal" ("id" SERIAL NOT NULL, "exerciseId" integer, "goalId" integer, CONSTRAINT "PK_bf7c806576f73011f2cff6b113c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "fitness_goal" ("id" SERIAL NOT NULL, "goalDescription" character varying NOT NULL, "targetDate" TIMESTAMP, "status" character varying NOT NULL, "userId" integer, CONSTRAINT "PK_bef8300c7b1982111249fe28f1d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "content_goal" ("id" SERIAL NOT NULL, "contentId" integer, "goalId" integer, CONSTRAINT "PK_664fed029adb4f5492676cb937f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "category" ("id" SERIAL NOT NULL, "categoryName" character varying NOT NULL, "categoryDescription" character varying, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "content_rating" ("id" SERIAL NOT NULL, "rating" integer NOT NULL, "comment" character varying, "ratingDate" TIMESTAMP NOT NULL DEFAULT now(), "easeOfUse" integer, "effectiveness" integer, "userId" integer, "contentId" integer, CONSTRAINT "PK_8a23e5d7e4e156a6607a41adf29" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "content_review" ("id" SERIAL NOT NULL, "rating" integer NOT NULL, "reviewText" character varying, "reviewDate" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, "contentId" integer, CONSTRAINT "PK_76988fae19e2a3d89ba01bde674" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "training_session" ("id" SERIAL NOT NULL, "attended" boolean NOT NULL DEFAULT false, "attendanceDate" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, "sessionId" integer, CONSTRAINT "PK_a17a9657ff5a6e048bfd82c4651" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "session_review" ("id" SERIAL NOT NULL, "rating" integer NOT NULL, "reviewText" character varying, "reviewDate" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, "sessionId" integer, CONSTRAINT "PK_1fe01f7f3ade8654e4f4d93b4cf" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "training_content_link" ("id" SERIAL NOT NULL, "sessionId" integer, "contentId" integer, CONSTRAINT "PK_34412aa91c7e771cb630d400fca" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "session" ("id" SERIAL NOT NULL, "sessionTime" TIMESTAMP NOT NULL DEFAULT now(), "location" character varying, "maxParticipants" integer, "contentId" integer, CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "affiliate_sale" ("id" SERIAL NOT NULL, "saleAmount" numeric(10,2) NOT NULL, "commissionEarned" numeric(10,2) NOT NULL, "saleDate" TIMESTAMP NOT NULL DEFAULT now(), "affiliateLinkId" integer, CONSTRAINT "PK_aeabdc0bca10ac3d30339a83f0c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "affiliate_link" ("id" SERIAL NOT NULL, "generatedLink" character varying NOT NULL, "creationDate" TIMESTAMP NOT NULL DEFAULT now(), "affiliateProgramId" integer, "userId" integer, CONSTRAINT "PK_4d8e59b42a53f7718de5c0a8002" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "affiliate_program" ("id" SERIAL NOT NULL, "commissionRate" numeric(5,2) NOT NULL, "programDescription" character varying, "contentId" integer, CONSTRAINT "PK_fd589da04adc9a3f0dfa7bee3a2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "payment" ("id" SERIAL NOT NULL, "amountPaid" numeric(10,2) NOT NULL, "paymentDate" TIMESTAMP NOT NULL DEFAULT now(), "paymentMethod" character varying, "currency" character varying NOT NULL, "secret" character varying NOT NULL, "intentId" character varying NOT NULL, "userId" integer, "contentId" integer, CONSTRAINT "PK_fcaec7df5adf9cac408c686b2ab" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "stage" ("id" SERIAL NOT NULL, "title" character varying, "description" character varying, "orderIndex" integer, "contentId" integer, CONSTRAINT "PK_c54d11b3c24a188262844af1612" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "content" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "price" integer NOT NULL DEFAULT '0', "isPaid" boolean NOT NULL, "goalSpecifics" character varying, "averageRating" integer NOT NULL DEFAULT '0', "numberOfRatings" integer NOT NULL DEFAULT '0', "contentType" character varying, "coachId" integer, "categoryId" integer, CONSTRAINT "PK_6a2083913f3647b44f205204e36" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "coach_qualification" ("id" SERIAL NOT NULL, "qualificationName" character varying NOT NULL, "institutionName" character varying, "yearObtained" integer, "coachId" integer, CONSTRAINT "PK_6795cae7a9c61c7640c6f21b360" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "coach_specialization" ("id" SERIAL NOT NULL, "specialization" character varying NOT NULL, "description" character varying, "coachId" integer, CONSTRAINT "PK_bc23f2d0189c13e86b197dac817" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "coach_rating" ("id" SERIAL NOT NULL, "rating" integer NOT NULL, "comment" character varying, "ratingDate" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, "coachId" integer, CONSTRAINT "PK_753978e8a783ffd2c275c5fdff0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "private_discussion" ("id" SERIAL NOT NULL, "message" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, "coachId" integer, CONSTRAINT "PK_a8c71732a00fd7808de0b8256a5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "news" ("id" SERIAL NOT NULL, "title" character varying, "content" text, "publishedDate" TIMESTAMP NOT NULL DEFAULT now(), "coachId" integer, CONSTRAINT "PK_39a43dfcb6007180f04aff2357e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "recommendation" ("id" SERIAL NOT NULL, "recommendationDate" TIMESTAMP NOT NULL DEFAULT now(), "recommenderId" integer, "recommendedCoachId" integer, "recommendedToUserId" integer, CONSTRAINT "PK_17cb51984a6627ef2ce7370e23c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "coach_follow" ("id" SERIAL NOT NULL, "followDate" date NOT NULL, "userId" integer, "coachId" integer, CONSTRAINT "PK_e3936c04c7c31a3f475c7516f32" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "coach" ("id" SERIAL NOT NULL, "bio" character varying, "ratingAvg" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_c2ca0875fe0755b197d0147713d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "body_measurement" ("id" SERIAL NOT NULL, "dateRecorded" date NOT NULL, "weight" numeric(5,2), "height" numeric(5,2), "bodyFatPercentage" numeric(4,2), "muscleMass" numeric(5,2), "userId" integer, CONSTRAINT "PK_094e197b44a824f270b716fd89d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "notification" ("id" SERIAL NOT NULL, "message" character varying NOT NULL, "isRead" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_705b6c7cdf9b2c2ff7ac7872cb7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "subscription_plan" ("id" SERIAL NOT NULL, "planName" character varying NOT NULL, "price" numeric(10,2) NOT NULL, "durationDays" integer NOT NULL, "durationType" character varying, CONSTRAINT "PK_5fde988e5d9b9a522d70ebec27c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_subscription" ("id" SERIAL NOT NULL, "startDate" TIMESTAMP NOT NULL DEFAULT now(), "endDate" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, "subscriptionPlanId" integer, CONSTRAINT "PK_ec4e57f4138e339fb111948a16f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "passwordHash" character varying NOT NULL, "profileImageUrl" character varying, "isEmailVerified" boolean NOT NULL DEFAULT false, "verificationToken" boolean, "resetPasswordToken" boolean, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "lastLogin" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "performance_record" ("id" SERIAL NOT NULL, "performanceDescription" character varying, "dateRecorded" date NOT NULL, "userProgramId" integer, CONSTRAINT "PK_e8e6d579150116ffd018ba858dd" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_program" ("id" SERIAL NOT NULL, "startDate" date, "endDate" date, "programStatus" character varying NOT NULL, "userId" integer, "contentId" integer, CONSTRAINT "PK_ab02fb05fe2e9b1e6ebaead78ed" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "challenge" ("id" SERIAL NOT NULL, "challengeDescription" character varying, "startDate" date, "endDate" date, "contentId" integer, CONSTRAINT "PK_5f31455ad09ea6a836a06871b7a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "content_nutrition" ADD CONSTRAINT "FK_d65cce7d0c383bcab7978493272" FOREIGN KEY ("contentId") REFERENCES "content"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "content_nutrition" ADD CONSTRAINT "FK_22d51bd446fa05dae0f48876ed6" FOREIGN KEY ("nutritionProgramId") REFERENCES "nutrition_program"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "nutrition_detail" ADD CONSTRAINT "FK_49c2ea3a1e2fc886f6932f8ca94" FOREIGN KEY ("nutritionProgramId") REFERENCES "nutrition_program"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "nutrition_program_review" ADD CONSTRAINT "FK_79c3c5a3b3be7ca27fc0c8485a7" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "nutrition_program_review" ADD CONSTRAINT "FK_a19b2ca7c1b84dc1d43e4e63e59" FOREIGN KEY ("nutritionProgramId") REFERENCES "nutrition_program"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_nutrition" ADD CONSTRAINT "FK_24bbf41492088c8dc70a687f178" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_nutrition" ADD CONSTRAINT "FK_aa5d071f227452f0bd44af64eea" FOREIGN KEY ("nutritionProgramId") REFERENCES "nutrition_program"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_nutrition_progress" ADD CONSTRAINT "FK_5082ae9bf807a05bbcc6ccda382" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_nutrition_progress" ADD CONSTRAINT "FK_a7383999ba3414160be1602c7a3" FOREIGN KEY ("nutritionProgramId") REFERENCES "nutrition_program"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "nutrition_program" ADD CONSTRAINT "FK_14919756abdb12d4d6a5146ab3d" FOREIGN KEY ("coachId") REFERENCES "coach"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "exercise_nutrition" ADD CONSTRAINT "FK_30a068c2e405c73fd139118f056" FOREIGN KEY ("exerciseId") REFERENCES "exercise"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "exercise_nutrition" ADD CONSTRAINT "FK_a327fb3719f6d07b5fb65cb9ee7" FOREIGN KEY ("nutritionProgramId") REFERENCES "nutrition_program"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "progress" ADD CONSTRAINT "FK_0366c96237f98ea1c8ba6e1ec35" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "progress" ADD CONSTRAINT "FK_36b66733d026a365fb6e6dd63ae" FOREIGN KEY ("exerciseId") REFERENCES "exercise"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "exercise" ADD CONSTRAINT "FK_6735351d76c9ff1bcd2eedbe5d7" FOREIGN KEY ("contentId") REFERENCES "content"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "exercise_goal" ADD CONSTRAINT "FK_693c82728441dbd01969f820b66" FOREIGN KEY ("exerciseId") REFERENCES "exercise"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "exercise_goal" ADD CONSTRAINT "FK_d863224c95f3382ee79d85f7abb" FOREIGN KEY ("goalId") REFERENCES "fitness_goal"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "fitness_goal" ADD CONSTRAINT "FK_2fa98e8fd23ee90993b930f26c3" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "content_goal" ADD CONSTRAINT "FK_c506f4d9c99825efe3d98eade25" FOREIGN KEY ("contentId") REFERENCES "content"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "content_goal" ADD CONSTRAINT "FK_3bf9eefb8342f860593c116cf99" FOREIGN KEY ("goalId") REFERENCES "fitness_goal"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "content_rating" ADD CONSTRAINT "FK_7f00a7437c631af7085cd264c70" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "content_rating" ADD CONSTRAINT "FK_1112c1255709428a8adc577e5f7" FOREIGN KEY ("contentId") REFERENCES "content"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "content_review" ADD CONSTRAINT "FK_aa985e8d17e1e3c0fb858396381" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "content_review" ADD CONSTRAINT "FK_ca51b9c43155219455ca8873178" FOREIGN KEY ("contentId") REFERENCES "content"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "training_session" ADD CONSTRAINT "FK_487b6d452df5807077415b6d080" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "training_session" ADD CONSTRAINT "FK_8da38493837784f8122eddb7fa3" FOREIGN KEY ("sessionId") REFERENCES "session"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "session_review" ADD CONSTRAINT "FK_cfcf6c986332dcb001a14f2a50d" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "session_review" ADD CONSTRAINT "FK_96244c7c5b5913d25bcc52bb920" FOREIGN KEY ("sessionId") REFERENCES "session"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "training_content_link" ADD CONSTRAINT "FK_da01899b33e124bd10e7a6aa2db" FOREIGN KEY ("sessionId") REFERENCES "session"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "training_content_link" ADD CONSTRAINT "FK_87471eea0c5d44f0bd7efc8c6f5" FOREIGN KEY ("contentId") REFERENCES "content"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "session" ADD CONSTRAINT "FK_5042a686da5522dfa12274f479e" FOREIGN KEY ("contentId") REFERENCES "content"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "affiliate_sale" ADD CONSTRAINT "FK_2635808ffc2e4013e9aacbfa7fb" FOREIGN KEY ("affiliateLinkId") REFERENCES "affiliate_link"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "affiliate_link" ADD CONSTRAINT "FK_45364026df51176d495c9796d19" FOREIGN KEY ("affiliateProgramId") REFERENCES "affiliate_program"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "affiliate_link" ADD CONSTRAINT "FK_0d839ead583baaed712336a33db" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "affiliate_program" ADD CONSTRAINT "FK_1c04ba722cd2706fa5ed92194a3" FOREIGN KEY ("contentId") REFERENCES "content"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "payment" ADD CONSTRAINT "FK_b046318e0b341a7f72110b75857" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "payment" ADD CONSTRAINT "FK_25b39b519f464e77728f929c30a" FOREIGN KEY ("contentId") REFERENCES "content"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "stage" ADD CONSTRAINT "FK_df40e5c70d2adc45a4edd8d697f" FOREIGN KEY ("contentId") REFERENCES "content"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "content" ADD CONSTRAINT "FK_6f2dcfd2fc4beedc6fc0eef3410" FOREIGN KEY ("coachId") REFERENCES "coach"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "content" ADD CONSTRAINT "FK_dedf4676dc7654f0320fcdc5d53" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "coach_qualification" ADD CONSTRAINT "FK_d5445ca98d8a71c863b2e12f4ab" FOREIGN KEY ("coachId") REFERENCES "coach"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "coach_specialization" ADD CONSTRAINT "FK_d0237b1c36a6b072587caccd719" FOREIGN KEY ("coachId") REFERENCES "coach"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "coach_rating" ADD CONSTRAINT "FK_2fab914d2d5bdf7102c643d077c" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "coach_rating" ADD CONSTRAINT "FK_689af48d5054be9d3196e343bf1" FOREIGN KEY ("coachId") REFERENCES "coach"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "private_discussion" ADD CONSTRAINT "FK_94c242a398d431190c335c71d6e" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "private_discussion" ADD CONSTRAINT "FK_fad6386e0570d9187114917f78d" FOREIGN KEY ("coachId") REFERENCES "coach"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "news" ADD CONSTRAINT "FK_74a98d082b2273a388e84ed8421" FOREIGN KEY ("coachId") REFERENCES "coach"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "recommendation" ADD CONSTRAINT "FK_b26c58cd335e7911fa7935a6f1b" FOREIGN KEY ("recommenderId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "recommendation" ADD CONSTRAINT "FK_2ea751c4af425e523d4638d55b5" FOREIGN KEY ("recommendedCoachId") REFERENCES "coach"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "recommendation" ADD CONSTRAINT "FK_db1446d9cbd34d2230a019d6ebc" FOREIGN KEY ("recommendedToUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "coach_follow" ADD CONSTRAINT "FK_b610b53d025bed951f1e05651c5" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "coach_follow" ADD CONSTRAINT "FK_e1c27b5f88521247e82f54342f9" FOREIGN KEY ("coachId") REFERENCES "coach"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "body_measurement" ADD CONSTRAINT "FK_c0dedd6d251be590e531d83d9fd" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "notification" ADD CONSTRAINT "FK_1ced25315eb974b73391fb1c81b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_subscription" ADD CONSTRAINT "FK_403d98d1638533c09f9b185929b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_subscription" ADD CONSTRAINT "FK_3010dd7813f5c8f6359dc5ecab8" FOREIGN KEY ("subscriptionPlanId") REFERENCES "subscription_plan"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "performance_record" ADD CONSTRAINT "FK_10256273253f5f0b79b5121b5c6" FOREIGN KEY ("userProgramId") REFERENCES "user_program"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_program" ADD CONSTRAINT "FK_1b1ba12685cf3cd9c46cdbb99df" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_program" ADD CONSTRAINT "FK_9fc3823253c6f88880ed5099e3d" FOREIGN KEY ("contentId") REFERENCES "content"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "challenge" ADD CONSTRAINT "FK_c3ebec440a532b69677e03106f5" FOREIGN KEY ("contentId") REFERENCES "content"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "challenge" DROP CONSTRAINT "FK_c3ebec440a532b69677e03106f5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_program" DROP CONSTRAINT "FK_9fc3823253c6f88880ed5099e3d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_program" DROP CONSTRAINT "FK_1b1ba12685cf3cd9c46cdbb99df"`,
    );
    await queryRunner.query(
      `ALTER TABLE "performance_record" DROP CONSTRAINT "FK_10256273253f5f0b79b5121b5c6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_subscription" DROP CONSTRAINT "FK_3010dd7813f5c8f6359dc5ecab8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_subscription" DROP CONSTRAINT "FK_403d98d1638533c09f9b185929b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "notification" DROP CONSTRAINT "FK_1ced25315eb974b73391fb1c81b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "body_measurement" DROP CONSTRAINT "FK_c0dedd6d251be590e531d83d9fd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "coach_follow" DROP CONSTRAINT "FK_e1c27b5f88521247e82f54342f9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "coach_follow" DROP CONSTRAINT "FK_b610b53d025bed951f1e05651c5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "recommendation" DROP CONSTRAINT "FK_db1446d9cbd34d2230a019d6ebc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "recommendation" DROP CONSTRAINT "FK_2ea751c4af425e523d4638d55b5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "recommendation" DROP CONSTRAINT "FK_b26c58cd335e7911fa7935a6f1b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "news" DROP CONSTRAINT "FK_74a98d082b2273a388e84ed8421"`,
    );
    await queryRunner.query(
      `ALTER TABLE "private_discussion" DROP CONSTRAINT "FK_fad6386e0570d9187114917f78d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "private_discussion" DROP CONSTRAINT "FK_94c242a398d431190c335c71d6e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "coach_rating" DROP CONSTRAINT "FK_689af48d5054be9d3196e343bf1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "coach_rating" DROP CONSTRAINT "FK_2fab914d2d5bdf7102c643d077c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "coach_specialization" DROP CONSTRAINT "FK_d0237b1c36a6b072587caccd719"`,
    );
    await queryRunner.query(
      `ALTER TABLE "coach_qualification" DROP CONSTRAINT "FK_d5445ca98d8a71c863b2e12f4ab"`,
    );
    await queryRunner.query(
      `ALTER TABLE "content" DROP CONSTRAINT "FK_dedf4676dc7654f0320fcdc5d53"`,
    );
    await queryRunner.query(
      `ALTER TABLE "content" DROP CONSTRAINT "FK_6f2dcfd2fc4beedc6fc0eef3410"`,
    );
    await queryRunner.query(
      `ALTER TABLE "stage" DROP CONSTRAINT "FK_df40e5c70d2adc45a4edd8d697f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "payment" DROP CONSTRAINT "FK_25b39b519f464e77728f929c30a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "payment" DROP CONSTRAINT "FK_b046318e0b341a7f72110b75857"`,
    );
    await queryRunner.query(
      `ALTER TABLE "affiliate_program" DROP CONSTRAINT "FK_1c04ba722cd2706fa5ed92194a3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "affiliate_link" DROP CONSTRAINT "FK_0d839ead583baaed712336a33db"`,
    );
    await queryRunner.query(
      `ALTER TABLE "affiliate_link" DROP CONSTRAINT "FK_45364026df51176d495c9796d19"`,
    );
    await queryRunner.query(
      `ALTER TABLE "affiliate_sale" DROP CONSTRAINT "FK_2635808ffc2e4013e9aacbfa7fb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "session" DROP CONSTRAINT "FK_5042a686da5522dfa12274f479e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "training_content_link" DROP CONSTRAINT "FK_87471eea0c5d44f0bd7efc8c6f5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "training_content_link" DROP CONSTRAINT "FK_da01899b33e124bd10e7a6aa2db"`,
    );
    await queryRunner.query(
      `ALTER TABLE "session_review" DROP CONSTRAINT "FK_96244c7c5b5913d25bcc52bb920"`,
    );
    await queryRunner.query(
      `ALTER TABLE "session_review" DROP CONSTRAINT "FK_cfcf6c986332dcb001a14f2a50d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "training_session" DROP CONSTRAINT "FK_8da38493837784f8122eddb7fa3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "training_session" DROP CONSTRAINT "FK_487b6d452df5807077415b6d080"`,
    );
    await queryRunner.query(
      `ALTER TABLE "content_review" DROP CONSTRAINT "FK_ca51b9c43155219455ca8873178"`,
    );
    await queryRunner.query(
      `ALTER TABLE "content_review" DROP CONSTRAINT "FK_aa985e8d17e1e3c0fb858396381"`,
    );
    await queryRunner.query(
      `ALTER TABLE "content_rating" DROP CONSTRAINT "FK_1112c1255709428a8adc577e5f7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "content_rating" DROP CONSTRAINT "FK_7f00a7437c631af7085cd264c70"`,
    );
    await queryRunner.query(
      `ALTER TABLE "content_goal" DROP CONSTRAINT "FK_3bf9eefb8342f860593c116cf99"`,
    );
    await queryRunner.query(
      `ALTER TABLE "content_goal" DROP CONSTRAINT "FK_c506f4d9c99825efe3d98eade25"`,
    );
    await queryRunner.query(
      `ALTER TABLE "fitness_goal" DROP CONSTRAINT "FK_2fa98e8fd23ee90993b930f26c3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "exercise_goal" DROP CONSTRAINT "FK_d863224c95f3382ee79d85f7abb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "exercise_goal" DROP CONSTRAINT "FK_693c82728441dbd01969f820b66"`,
    );
    await queryRunner.query(
      `ALTER TABLE "exercise" DROP CONSTRAINT "FK_6735351d76c9ff1bcd2eedbe5d7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "progress" DROP CONSTRAINT "FK_36b66733d026a365fb6e6dd63ae"`,
    );
    await queryRunner.query(
      `ALTER TABLE "progress" DROP CONSTRAINT "FK_0366c96237f98ea1c8ba6e1ec35"`,
    );
    await queryRunner.query(
      `ALTER TABLE "exercise_nutrition" DROP CONSTRAINT "FK_a327fb3719f6d07b5fb65cb9ee7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "exercise_nutrition" DROP CONSTRAINT "FK_30a068c2e405c73fd139118f056"`,
    );
    await queryRunner.query(
      `ALTER TABLE "nutrition_program" DROP CONSTRAINT "FK_14919756abdb12d4d6a5146ab3d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_nutrition_progress" DROP CONSTRAINT "FK_a7383999ba3414160be1602c7a3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_nutrition_progress" DROP CONSTRAINT "FK_5082ae9bf807a05bbcc6ccda382"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_nutrition" DROP CONSTRAINT "FK_aa5d071f227452f0bd44af64eea"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_nutrition" DROP CONSTRAINT "FK_24bbf41492088c8dc70a687f178"`,
    );
    await queryRunner.query(
      `ALTER TABLE "nutrition_program_review" DROP CONSTRAINT "FK_a19b2ca7c1b84dc1d43e4e63e59"`,
    );
    await queryRunner.query(
      `ALTER TABLE "nutrition_program_review" DROP CONSTRAINT "FK_79c3c5a3b3be7ca27fc0c8485a7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "nutrition_detail" DROP CONSTRAINT "FK_49c2ea3a1e2fc886f6932f8ca94"`,
    );
    await queryRunner.query(
      `ALTER TABLE "content_nutrition" DROP CONSTRAINT "FK_22d51bd446fa05dae0f48876ed6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "content_nutrition" DROP CONSTRAINT "FK_d65cce7d0c383bcab7978493272"`,
    );
    await queryRunner.query(`DROP TABLE "challenge"`);
    await queryRunner.query(`DROP TABLE "user_program"`);
    await queryRunner.query(`DROP TABLE "performance_record"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "user_subscription"`);
    await queryRunner.query(`DROP TABLE "subscription_plan"`);
    await queryRunner.query(`DROP TABLE "notification"`);
    await queryRunner.query(`DROP TABLE "body_measurement"`);
    await queryRunner.query(`DROP TABLE "coach"`);
    await queryRunner.query(`DROP TABLE "coach_follow"`);
    await queryRunner.query(`DROP TABLE "recommendation"`);
    await queryRunner.query(`DROP TABLE "news"`);
    await queryRunner.query(`DROP TABLE "private_discussion"`);
    await queryRunner.query(`DROP TABLE "coach_rating"`);
    await queryRunner.query(`DROP TABLE "coach_specialization"`);
    await queryRunner.query(`DROP TABLE "coach_qualification"`);
    await queryRunner.query(`DROP TABLE "content"`);
    await queryRunner.query(`DROP TABLE "stage"`);
    await queryRunner.query(`DROP TABLE "payment"`);
    await queryRunner.query(`DROP TABLE "affiliate_program"`);
    await queryRunner.query(`DROP TABLE "affiliate_link"`);
    await queryRunner.query(`DROP TABLE "affiliate_sale"`);
    await queryRunner.query(`DROP TABLE "session"`);
    await queryRunner.query(`DROP TABLE "training_content_link"`);
    await queryRunner.query(`DROP TABLE "session_review"`);
    await queryRunner.query(`DROP TABLE "training_session"`);
    await queryRunner.query(`DROP TABLE "content_review"`);
    await queryRunner.query(`DROP TABLE "content_rating"`);
    await queryRunner.query(`DROP TABLE "category"`);
    await queryRunner.query(`DROP TABLE "content_goal"`);
    await queryRunner.query(`DROP TABLE "fitness_goal"`);
    await queryRunner.query(`DROP TABLE "exercise_goal"`);
    await queryRunner.query(`DROP TABLE "exercise"`);
    await queryRunner.query(`DROP TABLE "progress"`);
    await queryRunner.query(`DROP TABLE "exercise_nutrition"`);
    await queryRunner.query(`DROP TABLE "nutrition_program"`);
    await queryRunner.query(`DROP TABLE "user_nutrition_progress"`);
    await queryRunner.query(`DROP TABLE "user_nutrition"`);
    await queryRunner.query(`DROP TABLE "nutrition_program_review"`);
    await queryRunner.query(`DROP TABLE "nutrition_detail"`);
    await queryRunner.query(`DROP TABLE "content_nutrition"`);
  }
}
