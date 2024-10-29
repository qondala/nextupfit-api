--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3
-- Dumped by pg_dump version 16.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: admin; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.admin (id, "coachId") FROM stdin;
1	1
2	2
3	3
\.


--
-- Data for Name: admin_transfer; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.admin_transfer (id, amount, currency, "paymentMethod", "stripeTransferId", "createdAt", "adminId") FROM stdin;
\.


--
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.category (id, "categoryName", "categoryDescription") FROM stdin;
1	Cardio	Cardio workouts and challenges.
2	Gym	Gym-based training and workouts.
3	Strength	Strength training exercises and challenges.
4	Yoga	Yoga routines and classes.
5	Diet	Diet plans and tips.
6	HIIT	High-intensity interval training.
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" (id, email, "firstName", "lastName", "phoneNumber", "birthDate", "passwordHash", "profileImageUrl", "isEmailVerified", "verificationToken", "resetPasswordToken", "createdAt", "lastLogin") FROM stdin;
1	test1@example.com	Test	User1	\N	2024-10-18 22:12:32.285428	$argon2id$v=19$m=65536,t=3,p=4$hFXmms7N7+Dz46TFytDawQ$uUqXAKAr7m62tYAlu1+ZF/aOCCkElIvZSAtbbUveEiQ	https://res.cloudinary.com/ds9ufzny1/image/upload/v1697110658/fitness_user_images/fpdl.in__portrait-bald-handsome-bearded-man-black-t-shirt-street-who-looks-away_152904-6792_normal_tvejdj.jpg	t	\N	\N	2024-10-18 22:12:32.285428	2024-10-18 22:12:32.285428
2	test2@example.com	Test	User2	\N	2024-10-18 22:12:32.511713	$argon2id$v=19$m=65536,t=3,p=4$KAv+ZjUJuMlMEeOmbHPFSw$ridl+K7ZwZ/jwlS11gk9CCKOtf3nLhLJZHleAf1+NTU	https://res.cloudinary.com/ds9ufzny1/image/upload/v1697110656/fitness_user_images/young-man-white-shirt-looking-camera-looking-happy_176474-83327_pmuqbp.jpg	t	\N	\N	2024-10-18 22:12:32.511713	2024-10-18 22:12:32.511713
3	test3@example.com	Test	User3	\N	2024-10-18 22:12:32.628739	$argon2id$v=19$m=65536,t=3,p=4$IawNGthvm5QGelf17CtVTQ$c4XvCPYcxd85W3QgYDRjCw16Mfg7XS5CPnv4vwDQQS4	https://res.cloudinary.com/ds9ufzny1/image/upload/v1697110655/fitness_user_images/young-man-wearing-blue-outfit-looking-confident_1298-291_trhntu.jpg	t	\N	\N	2024-10-18 22:12:32.628739	2024-10-18 22:12:32.628739
4	test4@example.com	Test	User4	\N	2024-10-18 22:12:32.74275	$argon2id$v=19$m=65536,t=3,p=4$EY414ABN6PA1UNu5c8O1QA$OfWpKKwJMh6hO4uecglucDlCdJmPlXZF5w6FB7OQxIU	https://res.cloudinary.com/ds9ufzny1/image/upload/v1697110653/fitness_user_images/worried-fatso-male-makes-size-sign-with-fingers-speaks-about-something-very-little-tiny-asks-wait-few-minutes-keeps-hand-thick-belly-isolated-yellow-wall-much-few_273609-39957_cvt8ou.jpg	t	\N	\N	2024-10-18 22:12:32.74275	2024-10-18 22:12:32.74275
5	test5@example.com	Test	User5	\N	2024-10-18 22:12:32.852469	$argon2id$v=19$m=65536,t=3,p=4$kMJa/TrgF9vgrAFsKcUmgA$yIXdKQWGJy7lvvurHsLL8tcSTez+fNjTLLTWQL01N3o	https://res.cloudinary.com/ds9ufzny1/image/upload/v1697110651/fitness_user_images/tender-woman-having-brow-color-added-her-eyebrows_231208-3536_uhw96q.jpg	t	\N	\N	2024-10-18 22:12:32.852469	2024-10-18 22:12:32.852469
6	test6@example.com	Test	User6	\N	2024-10-18 22:12:32.965786	$argon2id$v=19$m=65536,t=3,p=4$7ZTpCrAsdcW6bNobtqKcEQ$9yNVVRUvYFmTsBcIayDU05a/HJPeBH/fwsJ4PXEH/I0	https://res.cloudinary.com/ds9ufzny1/image/upload/v1697110650/fitness_user_images/smiling-man_1098-15443_pxfwre.jpg	t	\N	\N	2024-10-18 22:12:32.965786	2024-10-18 22:12:32.965786
7	test7@example.com	Test	User7	\N	2024-10-18 22:12:33.089454	$argon2id$v=19$m=65536,t=3,p=4$3AgrhOIwGAoY9Gm5aIEIYw$M7b5b6lIJ3PcjlHw3xqN7bshhXdZXeh9afTNn2q1Doo	https://res.cloudinary.com/ds9ufzny1/image/upload/v1697110648/fitness_user_images/smiling-man-sitting-street-cafe-table-with-his-arms-crossed_1262-19055_v0h04p.jpg	t	\N	\N	2024-10-18 22:12:33.089454	2024-10-18 22:12:33.089454
8	test8@example.com	Test	User8	\N	2024-10-18 22:12:33.221242	$argon2id$v=19$m=65536,t=3,p=4$1ipwSMrOxCW4ZeRsGIJTzw$uRcIR7XQUzLtMWNflO9JsaQxVBLxzskuQEB4tB+Dwlk	https://res.cloudinary.com/ds9ufzny1/image/upload/v1697110646/fitness_user_images/smiling-happy-businessman-looking-camera_23-2148113005_xokzjx.jpg	t	\N	\N	2024-10-18 22:12:33.221242	2024-10-18 22:12:33.221242
9	test9@example.com	Test	User9	\N	2024-10-18 22:12:33.348852	$argon2id$v=19$m=65536,t=3,p=4$9ga4DbCcFS88GSXCpiNiyA$ewbJ6Ss/s4nFf0csp7jtXYYnMrlZH8zNOI21v4jwKD8	https://res.cloudinary.com/ds9ufzny1/image/upload/v1697110645/fitness_user_images/smiling-caucasian-young-guy-wearing-pink-shirt-isolated-white-background_141793-38614_xd7hya.jpg	t	\N	\N	2024-10-18 22:12:33.348852	2024-10-18 22:12:33.348852
10	test10@example.com	Test	User10	\N	2024-10-18 22:12:33.457874	$argon2id$v=19$m=65536,t=3,p=4$E/4eWmFKxTaY2hiDWYXBQg$gsa9SA0hqoT0U3Drqj2wTvTnewwlVbZdXg2knbg+p3A	https://res.cloudinary.com/ds9ufzny1/image/upload/v1697110643/fitness_user_images/smart-looking-teacher_53876-23045_qvjszp.jpg	t	\N	\N	2024-10-18 22:12:33.457874	2024-10-18 22:12:33.457874
11	test11@example.com	Test	User11	\N	2024-10-18 22:12:33.57628	$argon2id$v=19$m=65536,t=3,p=4$A7iJb1B4rkl+E9MTP7UWrw$KmIMzKS3UW5D1E7qPTuDPf8Mt683vc8mZctsUzQDkB8	https://res.cloudinary.com/ds9ufzny1/image/upload/v1697110641/fitness_user_images/pretty-fat-man-smiles-checking-his-smartphone-while-he-sits-sofa-eats_8353-5517_ammcle.jpg	t	\N	\N	2024-10-18 22:12:33.57628	2024-10-18 22:12:33.57628
12	test12@example.com	Test	User12	\N	2024-10-18 22:12:33.68141	$argon2id$v=19$m=65536,t=3,p=4$cnBtIlZNlF6+lwbZoWmMLA$8mO+Hcw0KQo4tt1WM1eKkigp1iYhT7glkQV5hf2VbjA	https://res.cloudinary.com/ds9ufzny1/image/upload/v1697110640/fitness_user_images/overweight-man-glasses-wearing-black-t-shirt-with-frowning-face-displeased-light_141793-58882_bx9cpp.jpg	t	\N	\N	2024-10-18 22:12:33.68141	2024-10-18 22:12:33.68141
13	test13@example.com	Test	User13	\N	2024-10-18 22:12:33.800006	$argon2id$v=19$m=65536,t=3,p=4$uNMwfX0gg1PnXrFUFDjPAQ$R0x5usEXlq/PesyQP2QMR2XpP10jThr5hFkpVlIRND0	https://res.cloudinary.com/ds9ufzny1/image/upload/v1697110638/fitness_user_images/handsome-man-with-glasses_144627-18665_jr8pbs.jpg	t	\N	\N	2024-10-18 22:12:33.800006	2024-10-18 22:12:33.800006
14	test14@example.com	Test	User14	\N	2024-10-18 22:12:33.914079	$argon2id$v=19$m=65536,t=3,p=4$hiSfzf1irRtifk3iWHOCXA$oHGtihpZrG5x+wvranZU7YmfCDHp5fUTi9dgbTScjYw	https://res.cloudinary.com/ds9ufzny1/image/upload/v1697110633/fitness_user_images/handsome-man-looking-camera_23-2148323719_vyxqfk.jpg	t	\N	\N	2024-10-18 22:12:33.914079	2024-10-18 22:12:33.914079
15	test15@example.com	Test	User15	\N	2024-10-18 22:12:34.042897	$argon2id$v=19$m=65536,t=3,p=4$8P3vMLiErtwOsvsw30U+9A$ly2W0zTI5XEUjkIvPM4eQlIKsK9RU9Psxsd/trhRnD0	https://res.cloudinary.com/ds9ufzny1/image/upload/v1697110631/fitness_user_images/front-view-smiley-woman-seaside_23-2149455861_l2o9qm.jpg	t	\N	\N	2024-10-18 22:12:34.042897	2024-10-18 22:12:34.042897
16	test16@example.com	Test	User16	\N	2024-10-18 22:12:34.166907	$argon2id$v=19$m=65536,t=3,p=4$Aez+/Mhcimz6qkZdD2CJUg$pLjA/6Z+42NR0olBrYAGY/ZJm0y82yShUvpufV/MFD4	https://res.cloudinary.com/ds9ufzny1/image/upload/v1697110630/fitness_user_images/cute-boy-with-down-syndrome-homeschooling-using-digital-tablet-during-coronavirus-pandemic_53876-153945_slt2wl.jpg	t	\N	\N	2024-10-18 22:12:34.166907	2024-10-18 22:12:34.166907
17	test17@example.com	Test	User17	\N	2024-10-18 22:12:34.305148	$argon2id$v=19$m=65536,t=3,p=4$ill/gt0S47piVkNiNUlu7g$rS7HIAP60NKf6aJE8AKJFYU28sXIj3+WOHqMI/9T8Rk	https://res.cloudinary.com/ds9ufzny1/image/upload/v1697110650/fitness_user_images/smiling-man_1098-15443_pxfwre.jpg	t	\N	\N	2024-10-18 22:12:34.305148	2024-10-18 22:12:34.305148
18	test18@example.com	Test	User18	\N	2024-10-18 22:12:34.411959	$argon2id$v=19$m=65536,t=3,p=4$ovwOo6Lr7YS6XYaCMIWeJQ$brkmnVMXiDHBKr+TevX9tGKcS0V4EoljYcZbG7slX+8	https://res.cloudinary.com/ds9ufzny1/image/upload/v1697110638/fitness_user_images/handsome-man-with-glasses_144627-18665_jr8pbs.jpg	t	\N	\N	2024-10-18 22:12:34.411959	2024-10-18 22:12:34.411959
19	cabrelniamekon@gmail.com	\N		\N	2024-10-20 13:36:47.2893	$argon2id$v=19$m=65536,t=3,p=4$fOnKENsmgsNwjBLTkbHkvw$puIS6rLNfr2qVTvjYPbySGmmnZbLJ8/BXznjGMqxPz8	https://lh3.googleusercontent.com/a/ACg8ocIyab-RX0HEDIXnOgzGMhkbSS7Grsma-aOiIVheef2HiEmdFw=s96-c	f	\N	\N	2024-10-20 13:36:47.2893	2024-10-20 13:36:47.2893
\.


--
-- Data for Name: coach; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.coach (id, bio, "ratingAvg", "stripeAccountId", type, "coverImageUrl", "userId", "managerId") FROM stdin;
1	Certified nutritionist with a passion for healthy eating and weight management.	4.6	\N	Nutritionist	\N	2	\N
2	Yoga instructor with a focus on flexibility, mindfulness, and stress relief.	4.9	\N	Fitness Trainer	\N	3	\N
4	Fitness expert with a deep understanding of anatomy and biomechanics.	5	\N	Fitness Trainer	\N	5	1
3	Motivational fitness coach specializing in HIIT workouts and endurance training.	4.7	\N	Fitness Trainer	\N	4	1
5	Nutritionist specializing in personalized diet plans and meal preparation.	4.5	\N	Nutritionist	\N	6	2
6	Nutritionist specializing in personalized diet plans and meal preparation.	4.5	\N	Nutritionist	\N	7	3
\.


--
-- Data for Name: content; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.content (id, title, description, "createdAt", price, "isPaid", "isBookmarked", tags, "imageUrl", "videoUrl", "goalSpecifics", "averageRating", "numberOfRatings", "contentType", status, "statusReason", "coachId", "categoryId") FROM stdin;
1	Healthy Eating Habits for Weight Loss	Learn practical strategies for building healthy eating habits that can help you lose weight and improve your well-being.	2024-10-18 22:12:34.511464	12.99	t	\N	[{"id":5,"name":"nutrition"},{"id":6,"name":"weight loss"},{"id":7,"name":"healthy eating"},{"id":8,"name":"meal planning"}]	https://res.cloudinary.com/ds9ufzny1/image/upload/v1697110627/fitness_food_thumbnail/Artboard_90_ajxxz1.jpg	https://res.cloudinary.com/ds9ufzny1/video/upload/v1697106297/fitness_session_videos/tuppers-of-chicken-and-rice-ready-to-eat-in-a-kitc-2023-04-05-14-34-17-utc_nktd5s.mp4	Reduce calorie intake, increase nutrient intake, and create sustainable eating habits.	4.8	75	nutrition	pending	\N	2	1
2	Yoga for Flexibility and Stress Relief	Discover the benefits of yoga for flexibility, stress management, and overall well-being.	2024-10-18 22:12:34.525727	7.99	t	\N	[{"id":9,"name":"yoga"},{"id":10,"name":"flexibility"},{"id":11,"name":"stress relief"},{"id":12,"name":"mindfulness"}]	https://res.cloudinary.com/ds9ufzny1/image/upload/v1697460567/yoga_challenge/Artboard_78_gijf1e.jpg	https://res.cloudinary.com/ds9ufzny1/video/upload/v1697513645/fitness_session_videos/side-view-of-asian-woman-doing-yoga-exercise-yoga-2022-01-07-05-05-29-utc_qc91wo.mp4	Increase flexibility, reduce stress, improve sleep, and enhance mindfulness.	4.9	60	yoga	pending	\N	3	4
3	HIIT for Fat Loss and Cardio	Get a high-intensity workout that burns calories, improves cardiovascular health, and helps you lose fat.	2024-10-18 22:12:34.529676	10.99	t	\N	[{"id":13,"name":"hiit"},{"id":14,"name":"fat loss"},{"id":15,"name":"cardio"},{"id":16,"name":"high intensity"}]	https://res.cloudinary.com/ds9ufzny1/image/upload/v1697104829/fitness_training_session/Artboard_6_rr1jzo.jpg	https://res.cloudinary.com/ds9ufzny1/video/upload/v1697513639/fitness_session_videos/group-of-fit-people-exercising-and-jumping-on-wood-2022-11-17-04-57-09-utc_x5jz3i.mp4	Boost metabolism, improve cardiovascular health, and burn calories.	4.7	45	hiit	pending	\N	4	6
4	Bodyweight Training for Strength and Conditioning	Build strength and improve your overall fitness using only your bodyweight. No equipment required.	2024-10-18 22:12:34.534331	8.99	t	\N	[{"id":17,"name":"bodyweight"},{"id":18,"name":"strength"},{"id":19,"name":"conditioning"},{"id":20,"name":"no equipment"}]	https://res.cloudinary.com/ds9ufzny1/image/upload/v1697104780/fitness_training_session/Artboard_1_sdqxe2.jpg	https://res.cloudinary.com/ds9ufzny1/video/upload/v1697513648/fitness_session_videos/strong-active-athletic-trainer-using-upper-body-2022-11-17-04-56-51-utc_ogfrjz.mp4	Increase strength, improve body composition, and enhance functional fitness.	5	80	training	pending	\N	5	3
5	The Ultimate Guide to Meal Planning	Learn how to plan your meals for optimal health and fitness.	2024-10-18 22:12:34.538355	11.99	t	\N	[{"id":21,"name":"meal planning"},{"id":22,"name":"nutrition"},{"id":23,"name":"healthy eating"},{"id":24,"name":"fitness goals"}]	https://res.cloudinary.com/ds9ufzny1/image/upload/v1697110627/fitness_food_thumbnail/Artboard_90_ajxxz1.jpg	https://res.cloudinary.com/ds9ufzny1/video/upload/v1697106297/fitness_session_videos/tuppers-of-chicken-and-rice-ready-to-eat-in-a-kitc-2023-04-05-14-34-17-utc_nktd5s.mp4	Eat healthier, save time, and reach your fitness goals.	4.5	55	nutrition	pending	\N	6	1
6	HIIT Workout Routine	A 30-minute high-intensity interval training workout to burn fat and improve cardio.	2024-10-18 22:12:34.541806	8.99	t	\N	[{"id":25,"name":"hiit"},{"id":26,"name":"cardio"},{"id":27,"name":"fat burning"},{"id":28,"name":"workout routine"}]	https://res.cloudinary.com/ds9ufzny1/image/upload/v1697104829/fitness_training_session/Artboard_6_rr1jzo.jpg	https://res.cloudinary.com/ds9ufzny1/video/upload/v1697513639/fitness_session_videos/group-of-fit-people-exercising-and-jumping-on-wood-2022-11-17-04-57-09-utc_x5jz3i.mp4	Boost metabolism and improve cardiovascular fitness.	4.8	65	hiit	pending	\N	1	6
7	Yoga for Beginners	A beginner-friendly yoga routine to improve flexibility and reduce stress.	2024-10-18 22:12:34.545382	6.99	t	\N	[{"id":29,"name":"yoga"},{"id":30,"name":"beginner"},{"id":31,"name":"flexibility"},{"id":32,"name":"stress relief"}]	https://res.cloudinary.com/ds9ufzny1/image/upload/v1697460567/yoga_challenge/Artboard_78_gijf1e.jpg	https://res.cloudinary.com/ds9ufzny1/video/upload/v1697513645/fitness_session_videos/side-view-of-asian-woman-doing-yoga-exercise-yoga-2022-01-07-05-05-29-utc_qc91wo.mp4	Increase flexibility and reduce stress levels.	4.6	45	yoga	pending	\N	2	4
8	Strength Training for Weight Loss	A strength training program designed to help you lose weight and build muscle.	2024-10-18 22:12:34.549225	9.99	t	\N	[{"id":33,"name":"strength"},{"id":34,"name":"weight loss"},{"id":35,"name":"muscle building"},{"id":36,"name":"metabolism"}]	https://res.cloudinary.com/ds9ufzny1/image/upload/v1697104780/fitness_training_session/Artboard_1_sdqxe2.jpg	https://res.cloudinary.com/ds9ufzny1/video/upload/v1697513648/fitness_session_videos/strong-active-athletic-trainer-using-upper-body-2022-11-17-04-56-51-utc_ogfrjz.mp4	Build muscle and increase your metabolism for weight loss.	4.7	55	training	pending	\N	3	3
9	Nutrition for Runners	Learn about the best nutrition strategies for runners to improve performance and recovery.	2024-10-18 22:12:34.553356	10.99	t	\N	[{"id":37,"name":"nutrition"},{"id":38,"name":"running"},{"id":39,"name":"performance"},{"id":40,"name":"recovery"},{"id":41,"name":"fuel"}]	https://res.cloudinary.com/ds9ufzny1/image/upload/v1697110627/fitness_food_thumbnail/Artboard_90_ajxxz1.jpg	https://res.cloudinary.com/ds9ufzny1/video/upload/v1697106297/fitness_session_videos/tuppers-of-chicken-and-rice-ready-to-eat-in-a-kitc-2023-04-05-14-34-17-utc_nktd5s.mp4	Fuel your runs and optimize recovery with the right foods.	4.9	70	nutrition	pending	\N	4	1
10	Yoga for Weight Loss	A yoga routine designed to help you lose weight and improve your overall health.	2024-10-18 22:12:34.557353	7.99	t	\N	[{"id":42,"name":"yoga"},{"id":43,"name":"weight loss"},{"id":44,"name":"metabolism"},{"id":45,"name":"flexibility"}]	https://res.cloudinary.com/ds9ufzny1/image/upload/v1697460567/yoga_challenge/Artboard_78_gijf1e.jpg	https://res.cloudinary.com/ds9ufzny1/video/upload/v1697513645/fitness_session_videos/side-view-of-asian-woman-doing-yoga-exercise-yoga-2022-01-07-05-05-29-utc_qc91wo.mp4	Increase your metabolism, improve flexibility, and promote weight loss.	4.8	55	yoga	pending	\N	5	4
11	Strength Training for Beginners	A beginner-friendly strength training program to build muscle and improve fitness.	2024-10-18 22:12:34.562	9.99	t	\N	[{"id":46,"name":"strength"},{"id":47,"name":"beginner"},{"id":48,"name":"muscle building"},{"id":49,"name":"fitness"}]	https://res.cloudinary.com/ds9ufzny1/image/upload/v1697104780/fitness_training_session/Artboard_1_sdqxe2.jpg	https://res.cloudinary.com/ds9ufzny1/video/upload/v1697513648/fitness_session_videos/strong-active-athletic-trainer-using-upper-body-2022-11-17-04-56-51-utc_ogfrjz.mp4	Build muscle and increase your strength.	4.6	60	training	pending	\N	6	3
\.


--
-- Data for Name: affiliate_program; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.affiliate_program (id, "commissionRate", "programDescription", "contentId") FROM stdin;
1	0.15	Earn 15% commission on every sale of this strength training program.	1
2	0.10	Earn 10% commission on every sale of this nutrition guide.	2
3	0.20	Earn 20% commission on every sale of this yoga program.	3
4	0.18	Earn 18% commission on every sale of this HIIT program.	4
5	0.25	Earn 25% commission on every sale of this bodyweight training program.	5
6	0.12	Earn 12% commission on every sale of this meal planning guide.	6
7	0.17	Earn 17% commission on every sale of this HIIT program.	7
8	0.19	Earn 19% commission on every sale of this yoga program.	8
9	0.22	Earn 22% commission on every sale of this strength training program.	9
10	0.14	Earn 14% commission on every sale of this nutrition guide.	10
11	0.21	Earn 21% commission on every sale of this yoga program.	11
\.


--
-- Data for Name: affiliate_link; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.affiliate_link (id, "generatedLink", "creationDate", "affiliateProgramId", "userId") FROM stdin;
1	https://yourdomain.com/affiliate/link1	2024-05-05 00:00:00	\N	1
2	https://yourdomain.com/affiliate/link2	2024-05-07 00:00:00	\N	2
3	https://yourdomain.com/affiliate/link3	2024-05-09 00:00:00	\N	3
4	https://yourdomain.com/affiliate/link4	2024-05-11 00:00:00	\N	4
5	https://yourdomain.com/affiliate/link5	2024-05-13 00:00:00	\N	5
6	https://yourdomain.com/affiliate/link6	2024-05-15 00:00:00	\N	1
7	https://yourdomain.com/affiliate/link7	2024-05-17 00:00:00	\N	2
8	https://yourdomain.com/affiliate/link8	2024-05-19 00:00:00	\N	3
9	https://yourdomain.com/affiliate/link9	2024-05-21 00:00:00	\N	4
10	https://yourdomain.com/affiliate/link10	2024-05-23 00:00:00	\N	5
11	https://yourdomain.com/affiliate/link11	2024-05-25 00:00:00	\N	1
12	https://yourdomain.com/affiliate/link12	2024-05-27 00:00:00	\N	2
\.


--
-- Data for Name: affiliate_sale; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.affiliate_sale (id, "saleAmount", "commissionEarned", "saleDate", "affiliateLinkId") FROM stdin;
1	12.99	1.95	2024-05-06 00:00:00	\N
2	10.99	1.10	2024-05-08 00:00:00	\N
3	15.99	3.20	2024-05-10 00:00:00	\N
4	9.99	1.80	2024-05-12 00:00:00	\N
5	11.99	3.00	2024-05-12 00:00:00	\N
\.


--
-- Data for Name: body_measurement; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.body_measurement (id, "dateRecorded", weight, height, "bodyFatPercentage", "muscleMass", macros, "userId") FROM stdin;
1	2024-05-01	180.00	70.00	15.00	150.00	[{"id":0,"name":"BPM","iconPath":"assets/icons/bmp_macro_icon.svg","macroValue":"345","macroUnit":""},{"id":1,"name":"Steps","iconPath":"assets/icons/steps_macro_icon.svg","macroValue":"4,585","macroUnit":""},{"id":2,"name":"Sleep","iconPath":"assets/icons/sleep_macro_icon.svg","macroValue":"6.2","macroUnit":"hr"},{"id":3,"name":"Blood Oxygen","iconPath":"assets/icons/blood_oxygen_macro_icon.svg","macroValue":"97","macroUnit":"%"},{"id":4,"name":"Water","iconPath":"assets/icons/water_macro_icon.svg","macroValue":"4","macroUnit":"L"},{"id":5,"name":"Weight","iconPath":"assets/icons/weight_macro_icon.svg","macroValue":"82","macroUnit":"kg"},{"id":6,"name":"Calories","iconPath":"assets/icons/water_macro_icon.svg","macroValue":"512","macroUnit":""},{"id":7,"name":"Workout","iconPath":"assets/icons/workout_macro_icon.svg","macroValue":"3","macroUnit":"hr"}]	\N
2	2024-05-01	150.00	65.00	20.00	120.00	[{"id":0,"name":"BPM","iconPath":"assets/icons/bmp_macro_icon.svg","macroValue":"320","macroUnit":""},{"id":1,"name":"Steps","iconPath":"assets/icons/steps_macro_icon.svg","macroValue":"3,800","macroUnit":""},{"id":2,"name":"Sleep","iconPath":"assets/icons/sleep_macro_icon.svg","macroValue":"7.5","macroUnit":"hr"},{"id":3,"name":"Blood Oxygen","iconPath":"assets/icons/blood_oxygen_macro_icon.svg","macroValue":"98","macroUnit":"%"},{"id":4,"name":"Water","iconPath":"assets/icons/water_macro_icon.svg","macroValue":"3.5","macroUnit":"L"},{"id":5,"name":"Weight","iconPath":"assets/icons/weight_macro_icon.svg","macroValue":"75","macroUnit":"kg"},{"id":6,"name":"Calories","iconPath":"assets/icons/water_macro_icon.svg","macroValue":"450","macroUnit":""},{"id":7,"name":"Workout","iconPath":"assets/icons/workout_macro_icon.svg","macroValue":"2.5","macroUnit":"hr"}]	\N
3	2024-05-01	165.00	68.00	18.00	135.00	[{"id":0,"name":"BPM","iconPath":"assets/icons/bmp_macro_icon.svg","macroValue":"330","macroUnit":""},{"id":1,"name":"Steps","iconPath":"assets/icons/steps_macro_icon.svg","macroValue":"4,000","macroUnit":""},{"id":2,"name":"Sleep","iconPath":"assets/icons/sleep_macro_icon.svg","macroValue":"7.0","macroUnit":"hr"},{"id":3,"name":"Blood Oxygen","iconPath":"assets/icons/blood_oxygen_macro_icon.svg","macroValue":"96","macroUnit":"%"},{"id":4,"name":"Water","iconPath":"assets/icons/water_macro_icon.svg","macroValue":"3.8","macroUnit":"L"},{"id":5,"name":"Weight","iconPath":"assets/icons/weight_macro_icon.svg","macroValue":"78","macroUnit":"kg"},{"id":6,"name":"Calories","iconPath":"assets/icons/water_macro_icon.svg","macroValue":"480","macroUnit":""},{"id":7,"name":"Workout","iconPath":"assets/icons/workout_macro_icon.svg","macroValue":"2.8","macroUnit":"hr"}]	\N
4	2024-05-01	175.00	72.00	16.00	145.00	[{"id":0,"name":"BPM","iconPath":"assets/icons/bmp_macro_icon.svg","macroValue":"315","macroUnit":""},{"id":1,"name":"Steps","iconPath":"assets/icons/steps_macro_icon.svg","macroValue":"4,300","macroUnit":""},{"id":2,"name":"Sleep","iconPath":"assets/icons/sleep_macro_icon.svg","macroValue":"6.8","macroUnit":"hr"},{"id":3,"name":"Blood Oxygen","iconPath":"assets/icons/blood_oxygen_macro_icon.svg","macroValue":"97","macroUnit":"%"},{"id":4,"name":"Water","iconPath":"assets/icons/water_macro_icon.svg","macroValue":"3.5","macroUnit":"L"},{"id":5,"name":"Weight","iconPath":"assets/icons/weight_macro_icon.svg","macroValue":"80","macroUnit":"kg"},{"id":6,"name":"Calories","iconPath":"assets/icons/water_macro_icon.svg","macroValue":"490","macroUnit":""},{"id":7,"name":"Workout","iconPath":"assets/icons/workout_macro_icon.svg","macroValue":"3.0","macroUnit":"hr"}]	\N
5	2024-05-01	140.00	66.00	22.00	110.00	[{"id":0,"name":"BPM","iconPath":"assets/icons/bmp_macro_icon.svg","macroValue":"340","macroUnit":""},{"id":1,"name":"Steps","iconPath":"assets/icons/steps_macro_icon.svg","macroValue":"3,900","macroUnit":""},{"id":2,"name":"Sleep","iconPath":"assets/icons/sleep_macro_icon.svg","macroValue":"6.5","macroUnit":"hr"},{"id":3,"name":"Blood Oxygen","iconPath":"assets/icons/blood_oxygen_macro_icon.svg","macroValue":"95","macroUnit":"%"},{"id":4,"name":"Water","iconPath":"assets/icons/water_macro_icon.svg","macroValue":"3.2","macroUnit":"L"},{"id":5,"name":"Weight","iconPath":"assets/icons/weight_macro_icon.svg","macroValue":"72","macroUnit":"kg"},{"id":6,"name":"Calories","iconPath":"assets/icons/water_macro_icon.svg","macroValue":"470","macroUnit":""},{"id":7,"name":"Workout","iconPath":"assets/icons/workout_macro_icon.svg","macroValue":"2.6","macroUnit":"hr"}]	\N
\.


--
-- Data for Name: challenge; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.challenge (id, "challengeDescription", "startDate", "endDate", type, "imageUrl", tags, "contentId", "coachId") FROM stdin;
1	A 21-day challenge to create healthy eating habits for weight loss.	2024-05-20	2024-06-10	\N	\N	\N	2	2
2	A 4-week challenge to improve flexibility and reduce stress through yoga.	2024-05-25	2024-06-22	\N	\N	\N	3	3
3	A 30-day HIIT challenge to burn calories and improve cardio.	2024-05-30	2024-06-29	\N	\N	\N	4	4
4	A 6-week challenge to build strength and improve fitness using only bodyweight.	2024-06-05	2024-07-16	\N	\N	\N	5	5
5	A 30-day challenge to learn how to plan your meals for optimal health and fitness.	2024-06-10	2024-07-09	\N	\N	\N	6	6
6	A 28-day challenge to burn calories and improve cardio through HIIT workouts.	2024-06-15	2024-07-13	\N	\N	\N	7	1
7	A 30-day challenge to improve flexibility and reduce stress through yoga.	2024-06-20	2024-07-19	\N	\N	\N	8	2
8	A 30-day challenge to build muscle and improve fitness through strength training.	2024-06-25	2024-07-24	\N	\N	\N	9	3
9	A 4-week challenge to learn about the best nutrition strategies for runners.	2024-07-01	2024-07-29	\N	\N	\N	10	4
10	A 4-week challenge to improve flexibility, increase your metabolism, and promote weight loss through yoga.	2024-07-06	2024-08-03	\N	\N	\N	11	5
11	A 4-week challenge to build muscle and improve fitness through strength training.	2024-07-11	2024-08-08	\N	\N	\N	11	6
\.


--
-- Data for Name: coach_follow; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.coach_follow (id, "followDate", "userId", "coachId") FROM stdin;
1	2024-05-02	1	1
2	2024-05-04	2	2
3	2024-05-06	3	3
4	2024-05-08	4	4
5	2024-05-10	5	5
6	2024-10-20	19	4
\.


--
-- Data for Name: coach_qualification; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.coach_qualification (id, "qualificationName", "institutionName", "yearObtained", "imageUrl", "coachId") FROM stdin;
1	Certified Personal Trainer	National Academy of Sports Medicine	2022	\N	1
2	Registered Dietitian	Academy of Nutrition and Dietetics	2021	\N	2
3	Yoga Alliance Certified Instructor	Yoga Alliance	2020	\N	3
4	Certified Strength and Conditioning Specialist	National Strength and Conditioning Association	2023	\N	4
5	Certified Exercise Physiologist	American College of Sports Medicine	2022	\N	5
6	Certified Nutrition Coach	International Coaching Federation	2021	\N	6
\.


--
-- Data for Name: coach_rating; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.coach_rating (id, rating, comment, "ratingDate", "userId", "coachId") FROM stdin;
1	5	Great coach! Highly recommend him.	2024-05-03 00:00:00	1	1
2	4	Very helpful and knowledgeable.	2024-05-05 00:00:00	2	2
3	5	Amazing yoga instructor! Very patient and encouraging.	2024-05-07 00:00:00	3	3
4	4	Great HIIT workouts that really challenge me.	2024-05-09 00:00:00	4	4
5	5	Excellent coach! Always goes above and beyond to help me reach my goals.	2024-05-11 00:00:00	5	5
6	4	The meal plans are very helpful and easy to follow.	2024-05-13 00:00:00	1	6
\.


--
-- Data for Name: coach_specialization; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.coach_specialization (id, specialization, description, "coachId") FROM stdin;
1	Strength Training	Specialized in designing strength training programs for all levels.	1
2	Weight Management	Experienced in helping clients achieve sustainable weight loss goals.	2
3	Yoga for Beginners	Provides beginner-friendly yoga classes for all ages and fitness levels.	3
4	HIIT & Cardio	Dedicated to creating challenging and effective HIIT workouts.	4
5	Functional Fitness	Specialized in designing training programs that improve everyday movements.	5
6	Meal Planning	Provides personalized meal plans to help clients reach their nutrition goals.	6
\.


--
-- Data for Name: coach_transfer; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.coach_transfer (id, amount, currency, "paymentMethod", "stripeTransferId", "createdAt", "coachId") FROM stdin;
\.


--
-- Data for Name: fitness_goal; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.fitness_goal (id, "goalDescription", "targetDate", status, "userId") FROM stdin;
1	Lose 10 pounds of fat	2024-06-01 00:00:00	active	1
2	Gain 5 pounds of muscle	2024-07-15 00:00:00	active	2
3	Improve flexibility	2024-08-30 00:00:00	active	3
4	Run a 5K race	2024-09-15 00:00:00	active	4
5	Eat a balanced diet	2024-10-01 00:00:00	active	5
\.


--
-- Data for Name: content_goals_fitness_goal; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.content_goals_fitness_goal ("contentId", "fitnessGoalId") FROM stdin;
\.


--
-- Data for Name: content_rating; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.content_rating (id, rating, comment, "ratingDate", "easeOfUse", effectiveness, "userId", "contentId") FROM stdin;
1	5	Excellent guide for beginners!	2024-05-05 00:00:00	5	5	1	1
2	4	Helpful tips, but could be more detailed.	2024-05-07 00:00:00	4	4	2	2
3	5	Great for stress relief and flexibility.	2024-05-09 00:00:00	5	5	3	3
4	4	Intense workouts, but effective for fat loss.	2024-05-11 00:00:00	4	4	4	4
5	5	Love the bodyweight training routines.	2024-05-13 00:00:00	5	5	5	5
6	4	Practical and easy to follow.	2024-05-15 00:00:00	4	4	1	6
\.


--
-- Data for Name: content_review; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.content_review (id, rating, "reviewText", "reviewDate", "userId", "contentId") FROM stdin;
1	5	Highly recommend this content for anyone starting their strength training journey.	2024-10-18 22:12:34.599643	1	1
2	4	The tips are useful, but I wish there were more recipes included.	2024-10-18 22:12:34.638951	2	2
3	5	This yoga content is perfect for beginners and provides great stress relief.	2024-10-18 22:12:34.643375	3	3
4	4	The HIIT workouts are challenging but effective for burning calories and improving cardiovascular fitness.	2024-10-18 22:12:34.646352	4	4
5	5	I love the fact that this content requires no equipment. It's convenient and effective.	2024-10-18 22:12:34.651764	5	5
6	4	This meal planning guide has helped me eat healthier and more consistently.	2024-10-18 22:12:34.654717	1	6
\.


--
-- Data for Name: employee; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.employee (id, "userId", "createById") FROM stdin;
\.


--
-- Data for Name: exercise; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.exercise (id, title, description, "videoUrl", duration, "goalSpecifics", "contentId") FROM stdin;
\.


--
-- Data for Name: exercise_goals_fitness_goal; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.exercise_goals_fitness_goal ("exerciseId", "fitnessGoalId") FROM stdin;
\.


--
-- Data for Name: food; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.food (id, name, description, calories, protein, carbs, fat) FROM stdin;
\.


--
-- Data for Name: meal; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.meal (id, "mealType", date) FROM stdin;
\.


--
-- Data for Name: meal_foods_food; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.meal_foods_food ("mealId", "foodId") FROM stdin;
\.


--
-- Data for Name: recipe; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.recipe (id, name, description, instructions, "imageUrl", calories, protein, carbs, fat) FROM stdin;
\.


--
-- Data for Name: meal_recipes_recipe; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.meal_recipes_recipe ("mealId", "recipeId") FROM stdin;
\.


--
-- Data for Name: news; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.news (id, title, "publishedDate", "coachId", "contentId") FROM stdin;
1	The Importance of Hydration	2024-05-17 00:00:00	2	2
2	Yoga for Beginners	2024-05-19 00:00:00	3	3
3	HIIT for Weight Loss	2024-05-21 00:00:00	4	4
4	The Benefits of Bodyweight Training	2024-05-23 00:00:00	5	5
5	Meal Planning Tips for Busy People	2024-05-25 00:00:00	6	6
6	Meal Planning Tips for Busy People	2024-05-25 00:00:00	6	7
\.


--
-- Data for Name: notification; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.notification (id, message, "isRead", "createdAt", "userId") FROM stdin;
1	New workout plan available!	f	2024-10-18 22:12:34.657055	1
2	You have a new follower!	t	2024-10-18 22:12:34.662201	2
3	Don't miss our latest nutrition webinar!	f	2024-10-18 22:12:34.666056	3
4	Your HIIT challenge starts tomorrow!	t	2024-10-18 22:12:34.668899	4
5	New recipe added to your meal plan.	f	2024-10-18 22:12:34.671378	5
\.


--
-- Data for Name: nutrition_program; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.nutrition_program (id, title, description, "createdAt", "coachId") FROM stdin;
1	Programme nutritionnel pour la prise de masse	Un programme complet pour vous aider à prendre du muscle de manière saine.	2024-11-20 13:00:00	1
2	Programme nutritionnel pour la perte de poids	Un programme adapté pour une perte de poids efficace et durable.	2024-11-20 13:00:00	2
3	Programme nutritionnel pour les végétariens	Un programme équilibré pour les végétariens, riche en nutriments essentiels.	2024-11-20 13:00:00	3
4	Programme nutritionnel pour les sportifs	Optimisez vos performances sportives avec ce programme nutritionnel sur mesure.	2024-11-20 13:00:00	4
5	Programme nutritionnel pour le maintien du poids	Maintenez votre poids de forme grâce à ce programme nutritionnel.	2024-11-20 13:00:00	5
\.


--
-- Data for Name: nutrition_detail; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.nutrition_detail (id, "mealType", ingredients, preparation, calories, proteins, carbs, fats, "nutritionProgramId") FROM stdin;
1	breakfast	Oatmeal, protein powder, berries, nuts	Combine oatmeal and protein powder with water or milk. Top with berries and nuts.	400	30	50	10	1
2	lunch	Chicken breast, brown rice, vegetables	Bake or grill chicken breast. Serve with brown rice and steamed vegetables.	500	40	50	15	1
3	dinner	Salmon, sweet potato, green beans	Bake salmon with spices. Serve with baked sweet potato and steamed green beans.	600	45	60	20	1
4	breakfast	Greek yogurt, granola, fruit	Combine Greek yogurt with granola and top with your favorite fruits.	300	20	35	8	2
5	lunch	Tuna salad, whole wheat bread, vegetables	Combine tuna with mayonnaise, celery, and onion. Serve on whole wheat bread with a side of vegetables.	400	30	40	12	2
6	dinner	Chicken stir-fry, brown rice, vegetables	Stir-fry chicken with vegetables in a wok. Serve with brown rice.	500	35	50	15	2
7	breakfast	Tofu scramble, whole wheat toast, avocado	Scramble tofu with vegetables and spices. Serve on whole wheat toast with mashed avocado.	350	25	40	10	3
8	lunch	Lentil soup, whole wheat bread, salad	Make lentil soup with vegetables. Serve with whole wheat bread and a salad.	450	20	60	12	3
9	dinner	Black bean burgers, quinoa, salad	Make black bean burgers with vegetables. Serve with quinoa and a salad.	550	30	65	15	3
10	breakfast	Eggs, bacon, avocado	Fry or scramble eggs with bacon. Serve with mashed avocado.	400	30	10	25	4
11	lunch	Salmon salad, mixed greens, nuts	Combine cooked salmon with mayonnaise and mixed greens. Top with nuts.	450	35	15	20	4
12	dinner	Steak, broccoli, cauliflower	Grill steak with spices. Serve with steamed broccoli and cauliflower.	550	40	10	30	4
13	breakfast	Greek yogurt, berries, nuts	Combine Greek yogurt with berries and nuts.	250	20	25	10	5
14	lunch	Tuna salad, mixed greens, olive oil	Combine tuna with mayonnaise and mixed greens. Drizzle with olive oil.	350	25	20	15	5
15	dinner	Chicken breast, roasted vegetables, quinoa	Bake or grill chicken breast. Roast vegetables with herbs. Serve with quinoa.	450	30	40	15	5
\.


--
-- Data for Name: nutrition_program_contents_content; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.nutrition_program_contents_content ("nutritionProgramId", "contentId") FROM stdin;
1	2
1	6
2	8
2	10
3	9
4	2
4	11
5	7
5	11
\.


--
-- Data for Name: nutrition_program_review; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.nutrition_program_review (id, rating, "reviewText", "reviewDate", "userId", "nutritionProgramId") FROM stdin;
1	5	This diet plan has helped me build muscle and see great results.	2024-10-18 22:12:35.277499	1	1
2	4	The weight loss diet is effective, but it can be a bit restrictive.	2024-10-18 22:12:35.283005	2	2
3	5	Love the vegan diet plan! It's easy to follow and delicious.	2024-10-18 22:12:35.285606	3	3
4	4	The Ketogenic Diet is a bit challenging, but the results are worth it.	2024-10-18 22:12:35.287798	4	4
5	5	The Mediterranean Diet is delicious and very good for your health.	2024-10-18 22:12:35.289772	5	5
\.


--
-- Data for Name: payment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.payment (id, "amountPaid", "paymentDate", "paymentMethod", currency, secret, "intentId", "userId") FROM stdin;
1	7.99	2024-10-20 13:45:01.167901	\N	usd	pi_3QBxZAAyVkDWU93S0lK9aUwG_secret_qlclWklgAJph5F85cN6V6fERD	pi_3QBxZAAyVkDWU93S0lK9aUwG	19
2	10.99	2024-10-20 13:51:15.035999	\N	usd	pi_3QBxfCAyVkDWU93S0y5V8VxI_secret_YhZeNyQHqYUTBLoYFszRhHhOK	pi_3QBxfCAyVkDWU93S0y5V8VxI	19
3	8.99	2024-10-20 13:57:01.656358	\N	usd	pi_3QBxkmAyVkDWU93S4yLKPwEQ_secret_3kaaS9dqAGdphJwChPYGC4Vmv	pi_3QBxkmAyVkDWU93S4yLKPwEQ	19
4	12.99	2024-10-20 14:00:32.834046	\N	usd	pi_3QBxoBAyVkDWU93S4GxLtBNc_secret_9M89ZAWz2OSLQHVP1MX3zQuiI	pi_3QBxoBAyVkDWU93S4GxLtBNc	19
5	10.99	2024-10-20 14:36:11.969858	\N	usd	pi_3QByMcAyVkDWU93S2yNG6Hvl_secret_O3DazPn2zrx5Owng5EzIqANaZ	pi_3QByMcAyVkDWU93S2yNG6Hvl	19
6	10.99	2024-10-20 14:37:04.24239	\N	usd	pi_3QByNXAyVkDWU93S1dRTC7wY_secret_vSDIrg8D0JgQMpgXf2AE4mWIP	pi_3QByNXAyVkDWU93S1dRTC7wY	19
7	10.99	2024-10-20 14:37:07.181398	\N	usd	pi_3QByNaAyVkDWU93S0IxLUKEW_secret_qhFybpgzNfNAqaJ2FTWtZWzHd	pi_3QByNaAyVkDWU93S0IxLUKEW	19
\.


--
-- Data for Name: payment_contents_content; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.payment_contents_content ("paymentId", "contentId") FROM stdin;
1	2
2	3
3	4
4	1
5	9
6	9
7	9
\.


--
-- Data for Name: user_program; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_program (id, "startDate", "endDate", "programStatus", "userId", "contentId") FROM stdin;
\.


--
-- Data for Name: performance_record; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.performance_record (id, "performanceDescription", "dateRecorded", "userProgramId") FROM stdin;
1	Completed all workouts for the week.	2024-05-10	\N
2	Lost 2 pounds this week.	2024-05-12	\N
3	Increased flexibility in my hamstring.	2024-05-14	\N
4	Improved my running time by 1 minute.	2024-05-16	\N
5	Successfully followed my meal plan for the week.	2024-05-18	\N
6	Hit a new personal record on my bench press.	2024-05-20	\N
7	Started feeling more energized and less bloated.	2024-05-22	\N
8	Can now touch my toes with ease!	2024-05-24	\N
9	Completed a 5K run without stopping.	2024-05-26	\N
10	Feeling much better overall, less tired and more focused.	2024-05-28	\N
\.


--
-- Data for Name: private_discussion; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.private_discussion (id, message, "createdAt", "userId", "coachId") FROM stdin;
1	Hi, I'm looking to build muscle. Can you help me create a plan?	2024-05-01 00:00:00	1	1
2	What are some good snacks for weight loss?	2024-05-03 00:00:00	2	2
3	I'm new to yoga. What are some beginner poses I can try?	2024-05-05 00:00:00	3	3
4	I'm looking for a HIIT workout that I can do at home.	2024-05-07 00:00:00	4	4
5	What are some tips for improving my core strength?	2024-05-09 00:00:00	5	5
6	Can you help me with a meal plan for my busy schedule?	2024-05-11 00:00:00	1	6
\.


--
-- Data for Name: progress; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.progress (id, "isCompleted", "completedAt", "userId", "exerciseId") FROM stdin;
\.


--
-- Data for Name: recommendation; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.recommendation (id, "recommendationDate", "recommenderId", "recommendedCoachId", "recommendedToUserId") FROM stdin;
\.


--
-- Data for Name: session; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.session (id, "sessionTime", location, "maxParticipants", type, duration, "caloriesToburn", "contentId", "coachId", "challengeId") FROM stdin;
1	2024-05-17 16:00:00	Online	30	\N	5	0	2	2	2
2	2024-05-18 20:00:00	Online	25	\N	5	0	3	3	3
3	2024-05-19 14:00:00	Online	28	\N	5	0	4	4	4
4	2024-05-20 18:00:00	Online	35	\N	5	0	5	5	5
5	2024-05-21 12:00:00	Online	22	\N	5	0	6	6	6
6	2024-05-22 16:00:00	Online	25	\N	5	0	1	1	\N
7	2024-05-23 20:00:00	Online	30	\N	5	0	2	2	\N
8	2024-05-24 14:00:00	Online	28	\N	5	0	3	3	\N
9	2024-05-25 18:00:00	Online	35	\N	5	0	4	4	\N
10	2024-05-26 12:00:00	Online	22	\N	5	0	5	5	\N
11	2024-05-27 16:00:00	Online	25	\N	5	0	6	6	\N
12	2024-05-28 20:00:00	Online	30	\N	5	0	1	1	1
13	2024-05-29 14:00:00	Online	28	\N	5	0	2	2	2
14	2024-05-30 18:00:00	Online	35	\N	5	0	3	3	3
15	2024-05-31 12:00:00	Online	22	\N	5	0	4	4	4
16	2024-06-01 16:00:00	Online	25	\N	5	0	5	5	5
17	2024-06-02 20:00:00	Online	30	\N	5	0	6	6	6
18	2024-06-03 14:00:00	Online	28	\N	5	0	7	1	\N
19	2024-06-04 18:00:00	Online	35	\N	5	0	8	2	\N
20	2024-06-05 12:00:00	Online	22	\N	5	0	9	3	\N
21	2024-06-06 16:00:00	Online	25	\N	5	0	10	4	\N
22	2024-06-07 20:00:00	Online	30	\N	5	0	11	5	\N
23	2024-06-08 14:00:00	Online	28	\N	5	0	11	6	\N
\.


--
-- Data for Name: session_review; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.session_review (id, rating, "reviewText", "reviewDate", "userId", "sessionId") FROM stdin;
1	5	Great session! Very informative and engaging.	2024-10-18 22:12:35.292063	1	1
2	4	The coach was knowledgeable and helpful.	2024-10-18 22:12:35.29676	2	2
3	5	Loved the yoga session! Very relaxing and rejuvenating.	2024-10-18 22:12:35.299449	3	3
4	4	The HIIT workout was challenging but fun.	2024-10-18 22:12:35.301786	4	4
5	5	This bodyweight training session was a great way to work out at home.	2024-10-18 22:12:35.303775	5	5
6	4	The meal planning tips were really useful.	2024-10-18 22:12:35.305685	1	6
7	5	Great session! I learned a lot about strength training.	2024-10-18 22:12:35.30741	2	7
8	4	The coach was knowledgeable and answered all my questions.	2024-10-18 22:12:35.308958	3	8
9	5	This yoga session was very calming and helped me relax.	2024-10-18 22:12:35.311092	4	9
10	4	The HIIT workout was a good challenge.	2024-10-18 22:12:35.313055	5	10
11	5	I enjoyed the bodyweight training session.	2024-10-18 22:12:35.314822	1	11
12	4	Great session! I learned a lot about meal planning.	2024-10-18 22:12:35.316664	2	12
13	5	Another great strength training session!	2024-10-18 22:12:35.318596	3	13
14	4	The coach was very helpful.	2024-10-18 22:12:35.320129	4	14
15	5	This yoga session was very relaxing.	2024-10-18 22:12:35.322723	5	15
16	4	A challenging but rewarding HIIT workout.	2024-10-18 22:12:35.324422	1	16
17	5	I loved the bodyweight training session!	2024-10-18 22:12:35.326471	2	17
18	4	The coach was very informative.	2024-10-18 22:12:35.33011	3	18
19	5	This yoga session was great for flexibility.	2024-10-18 22:12:35.332682	4	19
20	4	A good HIIT session.	2024-10-18 22:12:35.335345	5	20
21	5	I learned a lot about strength training.	2024-10-18 22:12:35.337192	1	21
22	4	The coach was great!	2024-10-18 22:12:35.338816	2	22
23	5	This yoga session was very relaxing and energizing.	2024-10-18 22:12:35.340381	3	23
24	4	A good HIIT workout.	2024-10-18 22:12:35.342106	5	23
\.


--
-- Data for Name: stage; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.stage (id, title, description, "orderIndex", "contentId") FROM stdin;
\.


--
-- Data for Name: subscription_plan; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.subscription_plan (id, "planName", price, "durationDays", "durationType") FROM stdin;
1	Basic	9.99	30	\N
2	Premium	19.99	90	\N
3	Elite	49.99	365	\N
\.


--
-- Data for Name: training_content_link; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.training_content_link (id, "sessionId", "contentId") FROM stdin;
\.


--
-- Data for Name: training_session; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.training_session (id, attended, "attendanceDate", "userId", "sessionId") FROM stdin;
1	f	2024-10-20 11:30:00	19	12
2	t	2024-10-20 11:50:08.434	19	12
3	t	2024-10-20 11:53:37.311	19	1
4	t	2024-10-20 11:54:44.575	19	13
5	f	2024-10-20 12:30:00	19	3
\.


--
-- Data for Name: user_challenge; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_challenge (id, "startDate", "userId", "challengeId") FROM stdin;
1	2024-10-20 11:47:12.578	19	1
2	2024-10-20 11:51:59.979	19	2
3	2024-10-20 11:57:37.335	19	3
\.


--
-- Data for Name: user_nutrition; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_nutrition (id, "startDate", "adherencePercentage", "userId", "nutritionProgramId") FROM stdin;
1	2024-05-05 00:00:00	90	1	1
2	2024-05-07 00:00:00	85	2	2
3	2024-05-09 00:00:00	95	3	3
4	2024-05-11 00:00:00	80	4	4
5	2024-05-13 00:00:00	90	5	5
6	2024-10-20 12:30:00	50	19	3
\.


--
-- Data for Name: user_nutrition_progress; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_nutrition_progress (id, "dateLogged", "mealsConsumed", "caloriesIntake", "proteinIntake", "carbsIntake", "fatsIntake", "adherenceScore", "mealType", "userId", "nutritionProgramId") FROM stdin;
1	2024-05-06	{"foodItems":[{"mealType":"breakfast","calories":350,"proteins":25,"carbs":40,"fats":10},{"mealType":"lunch","calories":450,"proteins":35,"carbs":45,"fats":12},{"mealType":"dinner","calories":550,"proteins":40,"carbs":55,"fats":15}]}	1350	100	140	37	90	breakfast	1	1
2	2024-05-08	{"foodItems":[{"mealType":"breakfast","calories":280,"proteins":20,"carbs":30,"fats":8},{"mealType":"lunch","calories":380,"proteins":25,"carbs":35,"fats":10},{"mealType":"dinner","calories":480,"proteins":30,"carbs":40,"fats":12}]}	1140	75	105	30	85	breakfast	2	2
3	2024-05-10	{"foodItems":[{"mealType":"breakfast","calories":320,"proteins":22,"carbs":38,"fats":8},{"mealType":"lunch","calories":420,"proteins":28,"carbs":42,"fats":10},{"mealType":"dinner","calories":520,"proteins":32,"carbs":50,"fats":12}]}	1260	82	130	30	95	breakfast	3	3
4	2024-05-12	{"foodItems":[{"mealType":"breakfast","calories":380,"proteins":28,"carbs":10,"fats":20},{"mealType":"lunch","calories":430,"proteins":30,"carbs":12,"fats":22},{"mealType":"dinner","calories":530,"proteins":35,"carbs":15,"fats":25}]}	1340	93	37	67	80	breakfast	4	4
5	2024-05-14	{"foodItems":[{"mealType":"breakfast","calories":270,"proteins":20,"carbs":28,"fats":8},{"mealType":"lunch","calories":370,"proteins":25,"carbs":25,"fats":12},{"mealType":"dinner","calories":470,"proteins":30,"carbs":35,"fats":15}]}	1110	75	88	35	90	breakfast	5	5
7	2024-10-20	{"mealType":"dinner","foodItems":[{"id":null,"title":"Almond Meal","desc":null,"imagePath":"https://www.edamam.com/food-img/4ce/4ce26863cf14ffeb473cc6f9edcc60f0.jpg","mealType":null,"totalCalories":585.3,"totalProteins":22.37,"totalFats":49.96,"totalCarbs":19.04,"duration":null,"isBookmarked":null},{"id":null,"title":"Coconut Meal","desc":null,"imagePath":"https://www.edamam.com/food-img/4e8/4e856de8525374aa46786de1aa1c76a8.jpg","mealType":null,"totalCalories":435.7,"totalProteins":16.14,"totalFats":14.64,"totalCarbs":58.06,"duration":null,"isBookmarked":null}],"recipeItems":[]}	1021	38.510000000000005	77.1	64.6	\N	dinner	19	\N
6	2024-10-20	{"mealType":"breakfast","foodItems":[{"id":null,"title":"Cheese, Blue","desc":null,"imagePath":"https://www.edamam.com/food-img/b44/b442cfc174a1a691dca574c9b7dcb47a.jpg","mealType":null,"totalCalories":353,"totalProteins":21.4,"totalFats":28.7,"totalCarbs":2.34,"duration":null,"isBookmarked":null}],"recipeItems":[]}	353	21.4	2.34	28.7	\N	breakfast	19	\N
\.


--
-- Data for Name: user_subscription; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_subscription (id, "startDate", "endDate", "userId", "subscriptionPlanId") FROM stdin;
1	2024-05-01 00:00:00	2024-06-01 00:00:00	1	\N
2	2024-05-03 00:00:00	2024-08-02 00:00:00	2	\N
3	2024-05-05 00:00:00	2025-05-05 00:00:00	3	\N
\.


--
-- Name: admin_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.admin_id_seq', 3, true);


--
-- Name: admin_transfer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.admin_transfer_id_seq', 1, false);


--
-- Name: affiliate_link_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.affiliate_link_id_seq', 12, true);


--
-- Name: affiliate_program_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.affiliate_program_id_seq', 11, true);


--
-- Name: affiliate_sale_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.affiliate_sale_id_seq', 5, true);


--
-- Name: body_measurement_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.body_measurement_id_seq', 5, true);


--
-- Name: category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.category_id_seq', 6, true);


--
-- Name: challenge_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.challenge_id_seq', 11, true);


--
-- Name: coach_follow_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.coach_follow_id_seq', 6, true);


--
-- Name: coach_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.coach_id_seq', 6, true);


--
-- Name: coach_qualification_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.coach_qualification_id_seq', 6, true);


--
-- Name: coach_rating_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.coach_rating_id_seq', 6, true);


--
-- Name: coach_specialization_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.coach_specialization_id_seq', 6, true);


--
-- Name: coach_transfer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.coach_transfer_id_seq', 1, false);


--
-- Name: content_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.content_id_seq', 11, true);


--
-- Name: content_rating_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.content_rating_id_seq', 6, true);


--
-- Name: content_review_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.content_review_id_seq', 6, true);


--
-- Name: employee_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.employee_id_seq', 1, false);


--
-- Name: exercise_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.exercise_id_seq', 1, false);


--
-- Name: fitness_goal_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.fitness_goal_id_seq', 5, true);


--
-- Name: food_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.food_id_seq', 1, false);


--
-- Name: meal_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.meal_id_seq', 1, false);


--
-- Name: news_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.news_id_seq', 6, true);


--
-- Name: notification_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.notification_id_seq', 5, true);


--
-- Name: nutrition_detail_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.nutrition_detail_id_seq', 15, true);


--
-- Name: nutrition_program_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.nutrition_program_id_seq', 5, true);


--
-- Name: nutrition_program_review_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.nutrition_program_review_id_seq', 5, true);


--
-- Name: payment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.payment_id_seq', 7, true);


--
-- Name: performance_record_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.performance_record_id_seq', 10, true);


--
-- Name: private_discussion_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.private_discussion_id_seq', 6, true);


--
-- Name: progress_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.progress_id_seq', 1, false);


--
-- Name: recipe_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.recipe_id_seq', 1, false);


--
-- Name: recommendation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.recommendation_id_seq', 1, false);


--
-- Name: session_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.session_id_seq', 23, true);


--
-- Name: session_review_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.session_review_id_seq', 24, true);


--
-- Name: stage_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.stage_id_seq', 1, false);


--
-- Name: subscription_plan_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.subscription_plan_id_seq', 3, true);


--
-- Name: training_content_link_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.training_content_link_id_seq', 1, false);


--
-- Name: training_session_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.training_session_id_seq', 5, true);


--
-- Name: user_challenge_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_challenge_id_seq', 3, true);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_id_seq', 19, true);


--
-- Name: user_nutrition_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_nutrition_id_seq', 6, true);


--
-- Name: user_nutrition_progress_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_nutrition_progress_id_seq', 7, true);


--
-- Name: user_program_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_program_id_seq', 1, false);


--
-- Name: user_subscription_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_subscription_id_seq', 3, true);


--
-- PostgreSQL database dump complete
--

