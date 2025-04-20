--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4 (Debian 17.4-1.pgdg110+2)
-- Dumped by pg_dump version 17.4

-- Started on 2025-05-02 22:22:48 UTC

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 5152 (class 0 OID 20175)
-- Dependencies: 288
-- Data for Name: base_app_update; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.base_app_update (id, version, features, name) FROM stdin;
2	1.0.0	MVP	Starter
\.


--
-- TOC entry 5154 (class 0 OID 20181)
-- Dependencies: 290
-- Data for Name: base_body_param; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.base_body_param (id, name, description, "unitId", code, "createdAt", "updatedAt") FROM stdin;
2	\N	\N	\N	\N	2025-04-25 19:11:04.873504	\N
3	\N	\N	\N	\N	2025-04-25 19:11:04.873504	\N
4	\N	\N	\N	\N	2025-04-25 19:11:04.873504	\N
1	Weight	\N	\N	\N	2025-04-25 19:11:04.873504	\N
\.


--
-- TOC entry 5156 (class 0 OID 20188)
-- Dependencies: 292
-- Data for Name: base_food; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.base_food (id, name, description, "iconUrl", "createdByUserId", code, "foodGroupId", "createdAt", "updatedAt") FROM stdin;
2	Banana bread	\N	\N	0	\N	1	2025-04-25 19:12:58.190394	\N
3	Biscuit (bread)	\N	\N	0	\N	1	2025-04-25 19:12:58.190394	\N
4	Cornbread	\N	\N	0	\N	1	2025-04-25 19:12:58.190394	\N
5	Cuban bread	\N	\N	0	\N	1	2025-04-25 19:12:58.190394	\N
6	Frybread	\N	\N	0	\N	1	2025-04-25 19:12:58.190394	\N
7	Muffin	\N	\N	0	\N	1	2025-04-25 19:12:58.190394	\N
8	Sopaipilla	\N	\N	0	\N	1	2025-04-25 19:12:58.190394	\N
9	Muenster cheese	\N	\N	0	\N	2	2025-04-25 19:12:58.190394	\N
10	Cheesesteak	\N	\N	0	\N	2	2025-04-25 19:12:58.190394	\N
11	Macaroni and cheese	\N	\N	0	\N	2	2025-04-25 19:12:58.190394	\N
12	American cheese 	\N	\N	0	\N	2	2025-04-25 19:12:58.190394	\N
13	Colby	\N	\N	0	\N	2	2025-04-25 19:12:58.190394	\N
14	Sour cream	\N	\N	0	\N	2	2025-04-25 19:12:58.190394	\N
15	Cream cheese	\N	\N	0	\N	2	2025-04-25 19:12:58.190394	\N
16	Monterey Jack 	\N	\N	0	\N	2	2025-04-25 19:12:58.190394	\N
17	String cheese	\N	\N	0	\N	2	2025-04-25 19:12:58.190394	\N
18	Velveeta	\N	\N	0	\N	2	2025-04-25 19:12:58.190394	\N
19	Eggs Benedict	\N	\N	0	\N	3	2025-04-25 19:12:58.190394	\N
20	Bagels	\N	\N	0	\N	3	2025-04-25 19:12:58.190394	\N
21	American pancakes	\N	\N	0	\N	3	2025-04-25 19:12:58.190394	\N
22	Grits	\N	\N	0	\N	3	2025-04-25 19:12:58.190394	\N
23	Breakfast burrito	\N	\N	0	\N	3	2025-04-25 19:12:58.190394	\N
24	Chicken-fried steak	\N	\N	0	\N	3	2025-04-25 19:12:58.190394	\N
25	Hashbrowns	\N	\N	0	\N	3	2025-04-25 19:12:58.190394	\N
26	Coleslaw	\N	\N	0	\N	4	2025-04-25 19:12:58.190394	\N
27	weet potato casserole	\N	\N	0	\N	4	2025-04-25 19:12:58.190394	\N
28	Corn on the cob	\N	\N	0	\N	4	2025-04-25 19:12:58.190394	\N
29	Fried green tomatoes	\N	\N	0	\N	4	2025-04-25 19:12:58.190394	\N
30	Fried okra	\N	\N	0	\N	4	2025-04-25 19:12:58.190394	\N
31	Green salad	\N	\N	0	\N	4	2025-04-25 19:12:58.190394	\N
32	Caesar salad	\N	\N	0	\N	4	2025-04-25 19:12:58.190394	\N
33	Cobb salad	\N	\N	0	\N	4	2025-04-25 19:12:58.190394	\N
34	Green Goddess salad	\N	\N	0	\N	4	2025-04-25 19:12:58.190394	\N
35	Kale salad	\N	\N	0	\N	4	2025-04-25 19:12:58.190394	\N
36	Waldorf salad	\N	\N	0	\N	4	2025-04-25 19:12:58.190394	\N
37	Chef salad	\N	\N	0	\N	4	2025-04-25 19:12:58.190394	\N
38	New Mexico chile	\N	\N	0	\N	4	2025-04-25 19:12:58.190394	\N
39	Hatch Green Chile	\N	\N	0	\N	4	2025-04-25 19:12:58.190394	\N
40	Roasted turkey	\N	\N	0	\N	5	2025-04-25 19:12:58.190394	\N
41	Southern fried chicken	\N	\N	0	\N	5	2025-04-25 19:12:58.190394	\N
42	Barbecue	\N	\N	0	\N	5	2025-04-25 19:12:58.190394	\N
43	Pork ribs	\N	\N	0	\N	5	2025-04-25 19:12:58.190394	\N
44	Texas smoked brisket	\N	\N	0	\N	5	2025-04-25 19:12:58.190394	\N
45	Pulled pork	\N	\N	0	\N	5	2025-04-25 19:12:58.190394	\N
46	Barbecue chicken	\N	\N	0	\N	5	2025-04-25 19:12:58.190394	\N
47	Crab cake	\N	\N	0	\N	5	2025-04-25 19:12:58.190394	\N
48	Crayfish as food	\N	\N	0	\N	5	2025-04-25 19:12:58.190394	\N
49	Lobster	\N	\N	0	\N	5	2025-04-25 19:12:58.190394	\N
50	Maryland blue crab	\N	\N	0	\N	5	2025-04-25 19:12:58.190394	\N
51	Club sandwich	\N	\N	0	\N	5	2025-04-25 19:12:58.190394	\N
52	Chicken Nuggets	\N	\N	0	\N	5	2025-04-25 19:12:58.190394	\N
53	Chili	\N	\N	0	\N	6	2025-04-25 19:12:58.190394	\N
54	Clam chowder	\N	\N	0	\N	6	2025-04-25 19:12:58.190394	\N
55	Corn chowder	\N	\N	0	\N	6	2025-04-25 19:12:58.190394	\N
56	Gumbo	\N	\N	0	\N	6	2025-04-25 19:12:58.190394	\N
57	Brunswick stew	\N	\N	0	\N	6	2025-04-25 19:12:58.190394	\N
58	Drip Coffee (Regular Coffee)	\N	\N	0	\N	14	2025-04-25 19:12:58.190394	\N
59	Espresso	\N	\N	0	\N	14	2025-04-25 19:12:58.190394	\N
60	Americano	\N	\N	0	\N	14	2025-04-25 19:12:58.190394	\N
61	Latte	\N	\N	0	\N	14	2025-04-25 19:12:58.190394	\N
62	Cappuccino	\N	\N	0	\N	14	2025-04-25 19:12:58.190394	\N
63	Macchiato	\N	\N	0	\N	14	2025-04-25 19:12:58.190394	\N
64	Flat White	\N	\N	0	\N	14	2025-04-25 19:12:58.190394	\N
65	Mocha (Caffè Mocha)	\N	\N	0	\N	14	2025-04-25 19:12:58.190394	\N
66	Café au Lait	\N	\N	0	\N	14	2025-04-25 19:12:58.190394	\N
67	Cortado	\N	\N	0	\N	14	2025-04-25 19:12:58.190394	\N
68	Pumpkin Spice Latte (PSL)	\N	\N	0	\N	14	2025-04-25 19:12:58.190394	\N
69	Peppermint Mocha	\N	\N	0	\N	14	2025-04-25 19:12:58.190394	\N
70	Eggnog Latte	\N	\N	0	\N	14	2025-04-25 19:12:58.190394	\N
\.


--
-- TOC entry 5159 (class 0 OID 20206)
-- Dependencies: 295
-- Data for Name: base_food_group; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.base_food_group (id, name, "iconUrl", "createdByUserId", code, "createdAt", "updatedAt") FROM stdin;
4	Vegetables and salads	\N	\N	\N	2025-04-25 18:58:07.970183	\N
5	Main dishes	\N	\N	\N	2025-04-25 18:58:07.970183	\N
6	Soups and stews	\N	\N	\N	2025-04-25 18:58:07.970183	\N
7	Desserts	\N	\N	\N	2025-04-25 18:58:07.970183	\N
8	Rice dishes	\N	\N	\N	2025-04-25 18:58:07.970183	\N
9	Sandwiches	\N	\N	\N	2025-04-25 18:58:07.970183	\N
10	Sausages	\N	\N	\N	2025-04-25 18:58:07.970183	\N
11	Snacks and side dishes	\N	\N	\N	2025-04-25 18:58:07.970183	\N
12	Condiments	\N	\N	\N	2025-04-25 18:58:07.970183	\N
13	Miscellaneous	\N	\N	\N	2025-04-25 18:58:07.970183	\N
1	Breads and baked goods	\N	\N	breads-and-baked-goods	2025-04-25 18:58:07.970183	\N
2	Cheese and dairy	\N	\N	cheese-and-dairy	2025-04-25 18:58:07.970183	\N
3	Breakfast	\N	\N	breakfast	2025-04-25 18:58:07.970183	\N
14	Coffee drinks	\N	\N	coffee-drinks	2025-04-25 18:58:07.970183	\N
\.


--
-- TOC entry 5157 (class 0 OID 20196)
-- Dependencies: 293
-- Data for Name: base_food_nutrients; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.base_food_nutrients (id, "foodId", "nutrientId", "foodQty", "nutrientQty", "createdByUserId", "foodQtyUnitId", "nutrientQtyUnitId", "createdAt", "updatedAt") FROM stdin;
1	1	1	2.00	0.00	0	0	0	2025-04-25 19:14:04.768302	\N
2	1	2	10.00	0.00	0	0	0	2025-04-25 19:14:04.768302	\N
\.


--
-- TOC entry 5162 (class 0 OID 20215)
-- Dependencies: 298
-- Data for Name: base_meal; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.base_meal (id, "mealType", description, "createdByUserId", code, name, "iconUrl", "order", "createdAt", "updatedAt") FROM stdin;
1	breakfast	Plain standard cup of coffee	0	\N	Cup of coffee	\N	0	2025-04-25 19:14:37.277376	\N
\.


--
-- TOC entry 5163 (class 0 OID 20223)
-- Dependencies: 299
-- Data for Name: base_meal_food; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.base_meal_food (id, "mealId", "foodId", "foodQty", "foodQtyUnitId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 5166 (class 0 OID 20231)
-- Dependencies: 302
-- Data for Name: base_muscle; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.base_muscle (id, name, code, "bodyPart", "iconUrl", "order", "createdAt", "updatedAt") FROM stdin;
1	Occipitofrontalis (frontal belly)	occipitofrontalis	head	occipitofrontalis-frontal-belly	0	2025-04-25 19:16:06.525404	\N
\.


--
-- TOC entry 5169 (class 0 OID 20240)
-- Dependencies: 305
-- Data for Name: base_nutrient; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.base_nutrient (id, name, description, hint, "iconUrl", "nutrientGroup", abbreviation, "baseUnitId", "order", code, "createdAt", "updatedAt") FROM stdin;
1	Carbohydrates	Carbohydrates are molecules made of carbon, hydrogen, and oxygen. Their main role is to provide your body with energy.	This nutrient is used to measure sugar levels in the body.	\N	carbohydrates	Carbs	6	0	\N	2025-04-25 19:17:18.904397	\N
9	Water	Water is essential for hydration, temperature control, digestion, and circulation.	Makes up ~60% of the human body.	\N	water	Water	11	0	\N	2025-04-25 19:17:18.904397	\N
2	Proteins	Proteins are essential macronutrients made of building blocks called amino acids.	Your body needs protein every day, especially if you're active, growing, healing, or trying to build muscle.	\N	proteins	Prots	3	0	\N	2025-04-25 19:17:18.904397	\N
3	Fats	Provide energy, support cell growth, protect organs, help absorb vitamins.	Each gram of fat when burned or metabolized releases about nine food calories (37 kJ = 8.8 kcal).	\N	fats	Fats	12	0	\N	2025-04-25 19:17:18.904397	\N
11	Vitamins	Help with immunity, energy production, blood clotting, and more.	In humans there are 13 vitamins: 4 fat-soluble (A, D, E, and K) and 9 water-soluble (8 B vitamins and vitamin C).	\N	vitamins	Vitamins	6	0	\N	2025-04-25 19:17:18.904397	\N
12	Minerals	Minerals are inorganic elements (meaning they don’t come from living things).	Minerals are classified as essential nutrients your body needs in small amounts.	\N	minerals	Minerals	6	0	\N	2025-04-25 19:17:18.904397	\N
13	Fibre	Dietary fiber is a type of carbohydrate that your body can’t fully digest. Instead of breaking it down for energy, your body uses it to regulate digestion, support gut health, and even help manage blood sugar and cholesterol.	Plant components that are not broken down by human digestive enzymes.	\N	fibre	Fibre	2	0	\N	2025-04-25 19:17:18.904397	\N
\.


--
-- TOC entry 5170 (class 0 OID 20249)
-- Dependencies: 306
-- Data for Name: base_program_goal; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.base_program_goal (id, title, description, framework, icon, code, "createdAt", "updatedAt") FROM stdin;
1	🥦  Weight Loss	Reduce body fat through a calorie-controlled, nutrient-rich diet.	nutrition	\N	\N	\N	\N
2	💪  Muscle Gain / Bodybuilding	Support muscle growth with high-protein, calorie-surplus meals and nutrient timing.	nutrition	\N	\N	\N	\N
3	❤️  Improve Heart Health	Lower cholesterol and blood pressure by reducing saturated fats, increasing fiber, and incorporating heart-healthy fats (like omega-3s).	nutrition	\N	\N	\N	\N
4	🍬 Manage Blood Sugar / Diabetes	Stabilize blood glucose levels with low-glycemic foods, balanced meals, and controlled carbohydrate intake.	nutrition	\N	\N	\N	\N
5	🍏  Improve Overall Health & Immunity	Strengthen the immune system and promote general well-being with vitamins, minerals, and antioxidant-rich foods.	nutrition	\N	\N	\N	\N
6	🧠  Enhance Mental Focus & Brain Health	Support cognitive function with omega-3 fatty acids, B-vitamins, and foods that improve blood flow and reduce inflammation.	nutrition	\N	\N	\N	\N
8	🌿  Support a Plant-Based Lifestyle	Ensure adequate nutrients (like protein, iron, B12, calcium) while following vegetarian or vegan diets.	nutrition	\N	\N	\N	\N
9	🤰  Prenatal and Postnatal Nutrition	Support a healthy pregnancy and recovery through nutrient-dense foods rich in folic acid, iron, calcium, and protein.	nutrition	\N	\N	\N	\N
7	🥗  Improve Gut Health / Digestion	Boost digestive health with fiber, probiotics, and foods that support a healthy microbiome.	nutrition	\N	\N	\N	\N
10	🏃 Enhance Athletic Performance / Endurance	Optimize energy, hydration, and recovery with nutrient timing, electrolytes, and appropriate macro balance.	nutrition	\N	\N	\N	\N
11	🧘 Support Hormonal Balance	Promote healthy hormone function with essential fats, micronutrients (like zinc and magnesium), and balanced blood sugar levels.	nutrition	\N	\N	\N	\N
12	🌞  Improve Skin, Hair, and Nail Health	Boost intake of vitamins A, C, E, biotin, and collagen-building nutrients for better skin elasticity, hair growth, and nail strength.	nutrition	\N	\N	\N	\N
13	🦴  Strengthen Bones and Joints	Support bone density and joint health with calcium, vitamin D, magnesium, and anti-inflammatory foods.	nutrition	\N	\N	\N	\N
14	💧 Promote Hydration and Electrolyte Balance	Encourage proper fluid intake and replenish essential electrolytes (sodium, potassium, magnesium), especially for active individuals.	nutrition	\N	\N	\N	\N
15	🚽 Address Food Intolerances or Allergies	Create meal plans that avoid allergens (e.g., gluten, dairy, nuts) while ensuring adequate nutrition.	nutrition	\N	\N	\N	\N
16	🛌  Improve Sleep Quality	Incorporate foods rich in tryptophan, magnesium, and melatonin-supporting nutrients to enhance restful sleep.	nutrition	\N	\N	\N	\N
17	👶  Child and Adolescent Growth Support	Ensure optimal development with age-appropriate portions, protein, iron, calcium, and healthy snacks.	nutrition	\N	\N	\N	\N
18	👵  Senior Nutrition and Healthy Aging	Support aging adults with nutrient-dense, easy-to-digest meals that maintain strength, memory, and bone health.	nutrition	\N	\N	\N	\N
19	🧠 Manage ADHD or Focus Disorders (Dietary Support)	Reduce processed sugar, artificial additives, and include omega-3s and steady-energy foods to support focus.	nutrition	\N	\N	\N	\N
20	♻️  Detoxification and Liver Support	Aid the body’s natural detox processes with cruciferous veggies, antioxidants, fiber, and adequate hydration.	nutrition	\N	\N	\N	\N
22	💪  Increase Strength	Focus on maximal force production with heavy compound lifts and lower rep ranges.	sport	\N	\N	\N	\N
21	🏋️  Build Muscle Mass (Hypertrophy)	Increase muscle size through resistance training, progressive overload, and proper recovery.	sport	\N	\N	\N	\N
23	🏃  Improve Cardiovascular Endurance	Enhance heart and lung capacity through aerobic activities like running, cycling, or swimming.	sport	\N	\N	\N	\N
24	🧘  Increase Flexibility & Mobility	Improve joint range of motion and muscle elasticity through stretching, yoga, or mobility drills.	sport	\N	\N	\N	\N
25	🧍  Improve Posture and Core Stability	Strengthen core muscles and postural alignment to prevent injury and support daily movements.	sport	\N	\N	\N	\N
26	⚡  Boost Metabolism and Fat Burn	Combine strength training and high-intensity interval training (HIIT) to maximize calorie burn and metabolic rate.	sport	\N	\N	\N	\N
27	🏃‍♂️ Enhance Athletic Performance	Improve agility, speed, power, and coordination for better performance in sports and physical activities.	sport	\N	\N	\N	\N
28	🔄  Support Weight Loss Goals	Create a structured workout routine that complements a calorie-controlled diet to reduce body fat.	sport	\N	\N	\N	\N
29	😌  Reduce Stress and Improve Mental Well-being	Use movement, breathing techniques, and consistency to support mental clarity, reduce anxiety, and improve mood.	sport	\N	\N	\N	\N
30	👵  Promote Functional Fitness and Healthy Aging	Support daily activities and longevity with low-impact, joint-friendly exercises focusing on balance, strength, and mobility.	sport	\N	\N	\N	\N
31	🦵  Lower Body Strength & Sculpting	Focus on glutes, quads, hamstrings, and calves with targeted resistance and functional movements.	sport	\N	\N	\N	\N
32	🧠  Improve Mind-Body Connection	Use practices like yoga, Pilates, or mindful movement to enhance coordination, body awareness, and mental focus.	sport	\N	\N	\N	\N
33	🏔  Build Stamina for Outdoor Activities	Train for hiking, biking, or adventure sports with endurance, strength, and agility workouts.	sport	\N	\N	\N	\N
34	🦿  Injury Prevention & Joint Stability	Strengthen supporting muscles and improve movement mechanics to avoid common injuries.	sport	\N	\N	\N	\N
35	⚖️  Improve Balance and Coordination	Use stability exercises, unilateral movements, and neuromuscular training to increase physical control.	sport	\N	\N	\N	\N
36	🔋  Boost Daily Energy and Vitality	Improve energy levels through regular movement, circulation-enhancing workouts, and active recovery.	sport	\N	\N	\N	\N
37	🤰  Pre/Postnatal Fitness Support	Adapt training to safely support pregnancy or recovery after childbirth, focusing on core, posture, and pelvic floor health.	sport	\N	\N	\N	\N
38	🕺 Enhance Agility & Quickness	Incorporate plyometrics, agility ladders, and direction-change drills to improve reaction time and speed.	sport	\N	\N	\N	\N
39	📏  Improve Body Composition	Balance muscle gain and fat loss to achieve a leaner, more defined physique through strategic training.	sport	\N	\N	\N	\N
40	⛹️  Support Recreational Sports Performance	Train with sport-specific drills (e.g., for tennis, basketball, soccer) to improve game-day fitness and prevent overuse injuries.	sport	\N	\N	\N	\N
41	🏔 Outdoor & Adventure Readiness	Get fit for outdoor activities like hiking, kayaking, climbing, or backpacking with endurance and core-focused training.	sport	\N	\N	\N	\N
42	🪖  Tactical or Occupational Fitness	Develop job-specific strength and endurance for military, first responders, or labor-intensive professions.	sport	\N	\N	\N	\N
43	👶 Pre/Postnatal Fitness	Support safe, functional movement during and after pregnancy to maintain strength and reduce discomfort.	sport	\N	\N	\N	\N
44	🌄  Train for a Specific Event or Challenge	Prepare for races, hikes, obstacle courses, or other physical challenges with a goal-specific program.	sport	\N	\N	\N	\N
45	🛡  Injury Prevention & Recovery Support	Rebuild strength, stability, and range of motion post-injury with physical therapy-informed workouts.	sport	\N	\N	\N	\N
46	⚖️  Body Recomposition	Lose fat and gain muscle simultaneously with a mix of strength and cardio training plus tailored nutrition.	sport	\N	\N	\N	\N
47	🚴  Increase Muscular Endurance	Perform high-rep, low-weight routines to improve muscle stamina and resistance to fatigue.	sport	\N	\N	\N	\N
48	💨  Enhance Speed and Agility	Boost quickness and responsiveness with sprint training, agility drills, and plyometrics.	sport	\N	\N	\N	\N
\.


--
-- TOC entry 5172 (class 0 OID 20255)
-- Dependencies: 308
-- Data for Name: base_program_sociology; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.base_program_sociology (id, name, description, code, "createdAt", "updatedAt") FROM stdin;
1	👶 Age Group	\N	\N	\N	\N
2	🧘‍♂️ Lifestyle	\N	\N	\N	\N
3	❤️ Health Condition	\N	\N	\N	\N
4	🏋️‍♀️ Athletic Performance	\N	\N	\N	\N
\.


--
-- TOC entry 5174 (class 0 OID 20261)
-- Dependencies: 310
-- Data for Name: base_recipe; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.base_recipe (id, name, description, instructions, "imageUrl", calories, protein, carbs, fat, code, "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 5176 (class 0 OID 20268)
-- Dependencies: 312
-- Data for Name: base_unit; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.base_unit (id, name, abbreviation, containance, "order", "createdAt", "updatedAt", code) FROM stdin;
1	Inch	inch	height	0	2025-04-25 19:20:59.970604	\N	\N
2	Gram	g	weight	1	2025-04-25 19:20:59.970604	\N	\N
3	Kilogram	kg	weight	2	2025-04-25 19:20:59.970604	\N	\N
4	Millimeters of mercury	mmHg	pressure	3	2025-04-25 19:20:59.970604	\N	\N
5	Millimoles per liter	mmol/L	concentration	4	2025-04-25 19:20:59.970604	\N	\N
6	Milligrams per deciliter	mg/dL	concentration	5	2025-04-25 19:20:59.970604	\N	\N
9	Hour	hr	time	0	2025-04-25 19:20:59.970604	\N	\N
8	Minute	min	time	0	2025-04-25 19:20:59.970604	\N	\N
7	Second	s	time	0	2025-04-25 19:20:59.970604	\N	\N
10	Percentage	%	count	0	2025-04-25 19:20:59.970604	\N	\N
11	Litter	l	volume	0	2025-04-25 19:20:59.970604	\N	\N
12	Calories	cal	energy	0	2025-04-25 19:20:59.970604	\N	\N
13	Millilitter	ml	volume	0	2025-04-25 19:20:59.970604	\N	\N
14	Days	days	programduration	1	2025-04-25 19:20:59.970604	\N	\N
15	Weeks	weeks	programduration	2	2025-04-25 19:20:59.970604	\N	\N
16	Months	months	programduration	3	2025-04-25 19:20:59.970604	\N	\N
\.


--
-- TOC entry 5178 (class 0 OID 20276)
-- Dependencies: 314
-- Data for Name: base_workout; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.base_workout (id, name, description, targets, "createdByUserId", discipline, "appleCode", "fitbitCode", "withingsCode", "imageUrl", "illustrationUrl", "videoUrl", code, "createdAt", "updatedAt") FROM stdin;
1	Aerobics	\N	{muscle,weight,cardio}	0	gymnastics	0	0	0	\N	\N	\N	\N	2025-04-25 19:22:29.454574	\N
2	Bike	\N	{muscle,cardio}	0	cycling	0	0	0	\N	\N	\N	\N	2025-04-25 19:22:29.454574	\N
3	Bicycling	\N	{muscle,cardio}	0	cycling	0	0	0	\N	\N	\N	\N	2025-04-25 19:22:29.454574	\N
4	Bootcamp	\N	{muscle,cardio,relaxing}	0	camping	0	0	0	\N	\N	\N	\N	2025-04-25 19:22:29.454574	\N
5	Multi-sport	\N	{muscle,cardio}	0	athletism	0	0	0	\N	\N	\N	\N	2025-04-25 19:22:29.454574	\N
6	Canoeing	\N	{muscle,cardio,emotions,respiration}	0	riding	0	0	0	\N	\N	\N	\N	2025-04-25 19:22:29.454574	\N
7	Swimming	\N	{muscle,cardio,emotions,respiration}	0	swimming	0	0	0	\N	\N	\N	\N	2025-04-25 19:22:29.454574	\N
8	Circuit training	\N	{muscle,flexibility,respiration}	0	gymnastics	0	0	0	\N	\N	\N	\N	2025-04-25 19:22:29.454574	\N
9	Pilates	\N	{muscle,flexibility,respiration}	0	gymnastics	0	0	0	\N	\N	\N	\N	2025-04-25 19:22:29.454574	\N
10	Spinning	\N	{muscle,flexibility,respiration}	0	gymnastics	0	0	0	\N	\N	\N	\N	2025-04-25 19:22:29.454574	\N
11	Yoga	\N	{muscle,flexibility,respiration,concentration,mindfulness,relaxing}	0	gymnastics	0	0	0	\N	\N	\N	\N	2025-04-25 19:22:29.454574	\N
12	HIIT	\N	{muscle,flexibility,respiration,concentration,mindfulness,relaxing}	0	gymnastics	0	0	0	\N	\N	\N	\N	2025-04-25 19:22:29.454574	\N
13	Paddleboard	\N	{muscle,cardio}	0	navigating	0	0	0	\N	\N	\N	\N	2025-04-25 19:22:29.454574	\N
14	Powerlifting	\N	{muscle}	0	weightlifting	0	0	0	\N	\N	\N	\N	2025-04-25 19:22:29.454574	\N
15	Rollerblading	\N	{cardio,emotions}	0	navigating	0	0	0	\N	\N	\N	\N	2025-04-25 19:22:29.454574	\N
16	Skating	\N	{cardio,emotions}	0	navigating	0	0	0	\N	\N	\N	\N	2025-04-25 19:22:29.454574	\N
17	Snowboarding	\N	{cardio,emotions}	0	navigating	0	0	0	\N	\N	\N	\N	2025-04-25 19:22:29.454574	\N
18	Tennis	\N	{cardio}	0	tennis	0	0	0	\N	\N	\N	\N	2025-04-25 19:22:29.454574	\N
19	Weightlifting	\N	{muscle}	0	weightlifting	0	0	0	\N	\N	\N	\N	2025-04-25 19:22:29.454574	\N
20	Lift weights	\N	{muscle}	0	weightlifting	0	0	0	\N	\N	\N	\N	2025-04-25 19:22:29.454574	\N
21	Strength training	\N	{muscle,strength}	0	weightlifting	0	0	0	\N	\N	\N	\N	2025-04-25 19:22:29.454574	\N
22	Skiing	\N	{emotions,endurance}	0	skiing	0	0	0	\N	\N	\N	\N	2025-04-25 19:22:29.454574	\N
23	Kickboxing	\N	{strength}	0	fighting	0	0	0	\N	\N	\N	\N	2025-04-25 19:22:29.454574	\N
24	Martial arts	\N	{strength}	0	fighting	0	0	0	\N	\N	\N	\N	2025-04-25 19:22:29.454574	\N
\.


--
-- TOC entry 5180 (class 0 OID 20288)
-- Dependencies: 316
-- Data for Name: base_workout_howto_perform_step; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.base_workout_howto_perform_step (id, description, "illustrationUrl", "createdByUserId", highlight, "baseWorkoutId", "order", code, "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 5182 (class 0 OID 20297)
-- Dependencies: 318
-- Data for Name: base_workout_nutrient_burn; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.base_workout_nutrient_burn (id, "baseWorkoutId", duration, "nutrientId", "burnsNutrientQty", "durationUnitId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 5184 (class 0 OID 20302)
-- Dependencies: 320
-- Data for Name: base_workout_recommended_repetition; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.base_workout_recommended_repetition (id, "attendeeLevel", duration, "durationUnitId", "setCount", "baseWorkoutId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 5186 (class 0 OID 20311)
-- Dependencies: 322
-- Data for Name: gym; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.gym (id, name, "logoUrl", "coverUrl", address, "facebookPageUrl", "twitterPageUrl", "linkedinPageUrl", "youtubePageUrl", "tiktokPageUrl", "phoneLine1", "phoneLine2", moto, "followersCount", "createdByUserId", "stripeAccountId", "countryId", "stateId", "cityId", "membersCount", "verifiedStatus", email, "createdAt", "updatedAt") FROM stdin;
1	My gym !	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	Build strength. Shape confidence.	\N	1	\N	\N	\N	\N	\N	\N	\N	2025-04-28 18:40:27.323097	\N
2	My Gym 2	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	1	\N	\N	\N	\N	\N	\N	\N	2025-04-28 18:40:27.323097	\N
3	My Gym 3	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	1	\N	\N	\N	\N	\N	\N	\N	2025-04-28 18:40:27.323097	\N
4	My Gym 4	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	1	\N	\N	\N	\N	\N	\N	\N	2025-04-28 18:40:27.323097	\N
5	My Gym 5	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	1	\N	\N	\N	\N	\N	\N	\N	2025-04-28 18:40:27.323097	\N
6	My Gym 6	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	1	\N	\N	\N	\N	\N	\N	\N	2025-04-28 18:40:27.323097	\N
7	My Gym 7	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	1	\N	\N	\N	\N	\N	\N	\N	2025-04-28 18:40:27.323097	\N
8	My Gym 8	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	1	\N	\N	\N	\N	\N	\N	\N	2025-04-28 18:40:27.323097	\N
9	My Gym 9	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	1	\N	\N	\N	\N	\N	\N	\N	2025-04-28 18:40:27.323097	\N
10	My Gym 10	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	1	\N	\N	\N	\N	\N	\N	\N	2025-04-28 18:40:27.323097	\N
11	My Gym 11	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	1	\N	\N	\N	\N	\N	\N	\N	2025-04-28 18:40:27.323097	\N
12	My Gym 12	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	1	\N	\N	\N	\N	\N	\N	\N	2025-04-28 18:40:27.323097	\N
\.


--
-- TOC entry 5187 (class 0 OID 20317)
-- Dependencies: 323
-- Data for Name: gym_follower; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.gym_follower (id, "gymId", "followerUserId", "acceptedDate", "stoppedDate", accepted, blocked, stopped, "blockedDate") FROM stdin;
\.


--
-- TOC entry 5190 (class 0 OID 20324)
-- Dependencies: 326
-- Data for Name: gym_manager; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.gym_manager (id, "managerUserId", "dateEnrollment", "gymId", role, suspended, "managerOverviewId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 5191 (class 0 OID 20328)
-- Dependencies: 327
-- Data for Name: gym_manager_follower; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.gym_manager_follower (id, "managerUserId", "followerUserId", "acceptedDate", "stoppedDate", stopped, blocked, accepted, "blockedDate") FROM stdin;
\.


--
-- TOC entry 5194 (class 0 OID 20334)
-- Dependencies: 330
-- Data for Name: gym_manager_overview; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.gym_manager_overview (id, bio, text, email, phone, "coverUrl", "facebookPageUrl", "twitterPageUrl", "linkedinPageUrl", "youtubePageUrl", "tiktokPageUrl", "stripeAccountId", "countryId", "stateId", "cityId", "followersCount", "verifiedStatus", experiences, "viewsCount", "attendeesCount", "ratingsAvg", "ratingsCount", "managerUserId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 5196 (class 0 OID 20342)
-- Dependencies: 332
-- Data for Name: gym_manager_qualification; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.gym_manager_qualification (id, "qualificationName", "institutionName", "yearObtained", "imageUrl", "gymManagerUserId", "gymId") FROM stdin;
1	Certified Personal Trainer	National Academy of Sports Medicine	2022	\N	1	\N
2	Registered Dietitian	Academy of Nutrition and Dietetics	2021	\N	2	\N
3	Yoga Alliance Certified Instructor	Yoga Alliance	2020	\N	3	\N
4	Certified Strength and Conditioning Specialist	National Strength and Conditioning Association	2023	\N	4	\N
5	Certified Exercise Physiologist	American College of Sports Medicine	2022	\N	5	\N
6	Certified Nutrition Coach	International Coaching Federation	2021	\N	6	\N
\.


--
-- TOC entry 5198 (class 0 OID 20348)
-- Dependencies: 334
-- Data for Name: gym_manager_request; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.gym_manager_request (id, "gymId", "applicantUserId", letter, "portfolioUrl", "documentUrl", favorite, accepted, "acceptedDate", "rejectedDate", "acceptedByGymManagerUserId", "rejectedByGymManagerUserId", rejected, "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 5200 (class 0 OID 20356)
-- Dependencies: 336
-- Data for Name: gym_manager_specialized_in_workout; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.gym_manager_specialized_in_workout (id, "managerUserId", "baseWorkoutId", "createdAt", "updateAt") FROM stdin;
\.


--
-- TOC entry 5202 (class 0 OID 20362)
-- Dependencies: 338
-- Data for Name: gym_membership; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.gym_membership (id, "memberUserId", "startedDate", "membershipStatus", "gymId", "stoppedDate", "isFavorite", "suspendedDate", "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 5205 (class 0 OID 20369)
-- Dependencies: 341
-- Data for Name: gym_membership_plan; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.gym_membership_plan (id, "planName", price, "trialNumberDays", description, "trialNumberProgramActivities", "listFeatures", periodicity, "createdAt", "updatedAt", "gymId") FROM stdin;
\.


--
-- TOC entry 5206 (class 0 OID 20376)
-- Dependencies: 342
-- Data for Name: gym_membership_plan_features; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.gym_membership_plan_features (id, description, highlight, "gymId", "gymMembershipPlanId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 5208 (class 0 OID 20383)
-- Dependencies: 344
-- Data for Name: gym_open_day; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.gym_open_day (id, day, "hourFrom", "minuteFrom", "hourTo", "minuteTo", "createdAt", "updatedAt", "gymId") FROM stdin;
\.


--
-- TOC entry 5210 (class 0 OID 20388)
-- Dependencies: 346
-- Data for Name: gym_specialized_in_workout; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.gym_specialized_in_workout (id, "gymId", "workoutId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 5212 (class 0 OID 20394)
-- Dependencies: 348
-- Data for Name: map; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.map (id, "gymId", "userId", "createdAt", "userProfile", location) FROM stdin;
1	0	0	2025-05-02 22:18:57.406887	1	0101000020E610000000000000000014400000000000002240
\.


--
-- TOC entry 5214 (class 0 OID 20400)
-- Dependencies: 350
-- Data for Name: payment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.payment (id, "amountPaid", "paymentDate", "paymentMethod", currency, secret, "userId", item, "itemId", status) FROM stdin;
\.


--
-- TOC entry 5216 (class 0 OID 20408)
-- Dependencies: 352
-- Data for Name: payment_transfer; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.payment_transfer (id, "senderUserId", "paymentMethod", "stripeTransferId", "amountTransferred", currency, "operationDate", "completionDate", "receiverUserId", "senderGymId", status) FROM stdin;
\.


--
-- TOC entry 5219 (class 0 OID 20419)
-- Dependencies: 355
-- Data for Name: program; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.program (id, name, "gymId", "ownerUserId", type, status, "iconUrl", "coverUrl", description, "attendeesCount", "viewsCount", "ratingsAvg", "ratingsCount", duration, "durationUnitId", "difficultyLevel", "createdAt", "updatedAt") FROM stdin;
1	Standard Adults Diet Program	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	0	0	0.00	2025-04-26 04:09:22.875833+00	\N
2	Diet program for Children & Teens	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	0	0	0.00	2025-04-26 04:09:22.875833+00	\N
3	Seniors Nutrition Program	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	0	0	0.00	2025-04-26 04:09:22.875833+00	\N
4	Line Coaching Program	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	0	0	0.00	2025-04-26 04:09:22.875833+00	\N
5	Shine From Within: A Beauty & Wellness Program	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	0	0	0.00	2025-04-26 04:09:22.875833+00	\N
6	Living Well: A Journey of Beauty and Balance	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	0	0	0.00	2025-04-26 04:09:22.875833+00	\N
7	Radiant Living: Beauty & Wellness in Harmony	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	0	0	0.00	2025-04-26 04:09:22.875833+00	\N
8	The Ultime Diet Rooted in Wellness, Flourishing in Beauty	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	0	0	0.00	2025-04-26 04:09:22.875833+00	\N
9	Line coaching: Apply the Hidden Secrets of the Best Nutritionists	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	0	0	0.00	2025-04-26 04:09:22.875833+00	\N
10	The Best Weight Management Blueprint	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	0	0	0.00	2025-04-26 04:09:22.875833+00	\N
11	Elevate Your Life Style with Sport & Nutrition	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	0	0	0.00	2025-04-26 04:09:22.875833+00	\N
12	The Heart-Healthy Plan	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	0	0	0.00	2025-04-26 04:09:22.875833+00	\N
13	The HeartWise Nutrition Program	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	0	0	0.00	2025-04-26 04:09:22.875833+00	\N
14	CardioCare Program	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	0	0	0.00	2025-04-26 04:09:22.875833+00	\N
15	VitalHeart Wellness Journey	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	0	0	0.00	2025-04-26 04:09:22.875833+00	\N
16	The Heart Harmony Program	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	0	0	0.00	2025-04-26 04:09:22.875833+00	\N
17	Prenatal and Postnatal Nutrition Routine	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	0	0	0.00	2025-04-26 04:09:22.875833+00	\N
18	Detoxification and Liver Support	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	0	0	0.00	2025-04-26 04:09:22.875833+00	\N
19	Physicians Recommended Program for Diabetes / Blood Sugar	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	0	0	0.00	2025-04-26 04:09:22.875833+00	\N
20	Sculpt & Grow: Build the Body You’ve Always Wanted	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	0	0	0.00	2025-04-26 04:09:22.875833+00	\N
21	From Strength to Shape: The Ultimate Sculpt & Grow Journey	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	0	0	0.00	2025-04-26 04:09:22.875833+00	\N
22	Train Smart. Sculpt Strong. Grow Without Limits	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	0	0	0.00	2025-04-26 04:09:22.875833+00	\N
23	Sculpt & Grow: A Complete Program to Build Lean Muscle and Define Your Physique	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	0	0	0.00	2025-04-26 04:09:22.875833+00	\N
24	Grow Muscle, Sculpt Confidence: Your Body Transformation Blueprint	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	0	0	0.00	2025-04-26 04:09:22.875833+00	\N
25	From Foundation to Finish: The Full-Body Sculpt & Strength Plan	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	0	0	0.00	2025-04-26 04:09:22.875833+00	\N
26	Sculpt & Grow: Where Aesthetics Meet Athletic Strength	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	0	0	0.00	2025-04-26 04:09:22.875833+00	\N
27	The Sculpt & Grow Method: Train to Build, Eat to Fuel, Live to Thrive	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	0	0	0.00	2025-04-26 04:09:22.875833+00	\N
28	Train Like a Pro: Build Strength, Speed, and Next-Level Focus	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	0	0	0.00	2025-04-26 04:09:22.875833+00	\N
29	The Pro Method: Train, Recover, and Perform at Your Peak	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	0	0	0.00	2025-04-26 04:09:22.875833+00	\N
30	Train Like a Pro: Unlock the Athlete Within You	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	0	0	0.00	2025-04-26 04:09:22.875833+00	\N
31	From Amateur to Elite: A Proven System to Train Like a Pro	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	0	0	0.00	2025-04-26 04:09:22.875833+00	\N
32	Train Like a Pro: Master Your Body. Elevate Your Game	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	0	0	0.00	2025-04-26 04:09:22.875833+00	\N
33	Train Like a Pro: Performance Training for Real-Life Athletes	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	0	0	0.00	2025-04-26 04:09:22.875833+00	\N
34	The Pro-Level Blueprint: How to Train, Move, and Fuel Like a Champion	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	0	0	0.00	2025-04-26 04:09:22.875833+00	\N
35	Train Like a Pro: The Complete Strength, Conditioning, and Recovery Plan	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	0	0	0.00	2025-04-26 04:09:22.875833+00	\N
36	Not Just Fit — Athlete Fit: Train Like a Pro and Rise Above	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	0	0	0.00	2025-04-26 04:09:22.875833+00	\N
37	Train Like a Pro: Turn Consistency Into Excellence	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	0	0	0.00	2025-04-26 04:09:22.875833+00	\N
38	Trail Strong: Build the Strength and Stamina to Conquer Every Path	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	0	0	0.00	2025-04-26 04:09:22.875833+00	\N
39	Trail Strong: Train for the Wild with Strength, Endurance, and Mobility	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	0	0	0.00	2025-04-26 04:09:22.875833+00	\N
40	Be Trail Strong: Prepare Your Body for the Mountains, Forests, and Beyond	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	0	0	0.00	2025-04-26 04:09:22.875833+00	\N
41	Trail Strong: A Fitness Journey for Hikers, Climbers, and Outdoor Athletes	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	0	0	0.00	2025-04-26 04:09:22.875833+00	\N
42	From Trailhead to Summit: The Trail Strong Performance Program	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	0	0	0.00	2025-04-26 04:09:22.875833+00	\N
43	Trail Strong: Build the Power to Go Farther, Higher, and Harder	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	0	0	0.00	2025-04-26 04:09:22.875833+00	\N
44	Train Trail Strong: Resilience, Strength, and Balance for the Backcountry	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	0	0	0.00	2025-04-26 04:09:22.875833+00	\N
45	Trail Strong: The Complete Strength and Conditioning Plan for Life Outdoors	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	0	0	0.00	2025-04-26 04:09:22.875833+00	\N
46	Move with Nature, Train with Purpose: Become Trail Strong	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	0	0	0.00	2025-04-26 04:09:22.875833+00	\N
47	Trail Strong: Forge a Body That’s Built for the Wild	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	0	0	0.00	2025-04-26 04:09:22.875833+00	\N
48	WorkForce Strong: Build Real-World Strength That Works as Hard as You Do	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	0	0	0.00	2025-04-26 04:09:22.875833+00	\N
49	Train for Life, Not Just Looks: The WorkForce Strong System	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	0	0	0.00	2025-04-26 04:09:22.875833+00	\N
50	WorkForce Strong: Functional Fitness for the Everyday Hero	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	0	0	0.00	2025-04-26 04:09:22.875833+00	\N
51	Be WorkForce Strong: Strength, Endurance, and Resilience for Demanding Days	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	0	0	0.00	2025-04-26 04:09:22.875833+00	\N
52	WorkForce Strong: Train Like Your Job Depends on It — Because It Does	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	0	0	0.00	2025-04-26 04:09:22.875833+00	\N
53	WorkForce Strong: Power, Mobility, and Recovery for Labor-Ready Bodies	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	0	0	0.00	2025-04-26 04:09:22.875833+00	\N
54	WorkForce Strong: Built for Workers, First Responders, and Real-World Athletes	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	0	0	0.00	2025-04-26 04:09:22.875833+00	\N
55	From the Ground Up: The WorkForce Strong Blueprint for Physical Grit	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	0	0	0.00	2025-04-26 04:09:22.875833+00	\N
56	WorkForce Strong: Forged Strength for the Everyday Demands of Life	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	0	0	0.00	2025-04-26 04:09:22.875833+00	\N
57	WorkForce Strong: Move Better, Lift Smarter, Perform Longer	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	0	0	0.00	2025-04-26 04:09:22.875833+00	\N
58	From Gym to Mountain: The AdventureFit Conditioning Plan	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	0	0	0.00	2025-04-26 04:09:22.875833+00	\N
59	AdventureFit: Fitness for Hikers, Climbers, and Trailblazers	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	0	0	0.00	2025-04-26 04:09:22.875833+00	\N
60	AdventureFit: Strength, Endurance, and Mobility for the Great Outdoors	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	0	0	0.00	2025-04-26 04:09:22.875833+00	\N
61	AdventureFit: A Complete Program to Prepare You for the Path Less Traveled	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	0	0	0.00	2025-04-26 04:09:22.875833+00	\N
62	From Gym to Mountain: The AdventureFit Conditioning Plan	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	0	0	0.00	2025-04-26 04:09:22.875833+00	\N
63	AdventureFit: Functional Strength and Endurance for Life on the Move	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	0	0	0.00	2025-04-26 04:09:22.875833+00	\N
64	AdventureFit: Forge a Body Built for Exploration	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	0	0	0.00	2025-04-26 04:09:22.875833+00	\N
65	Ignite HIIT: Burn Fat, Build Power, and Fire Up Your Metabolism	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	0	0	0.00	2025-04-26 04:09:22.875833+00	\N
66	Ignite HIIT: The Explosive Training Plan to Sculpt, Sweat, and Shred	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	0	0	0.00	2025-04-26 04:09:22.875833+00	\N
67	Train Fast. Burn Long. Get Strong — Welcome to Ignite HIIT	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	0	0	0.00	2025-04-26 04:09:22.875833+00	\N
68	Ignite HIIT: High-Intensity Training to Push Limits and Light Results	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	0	0	0.00	2025-04-26 04:09:22.875833+00	\N
69	Ignite HIIT: 30 Minutes, Full Power, Zero Excuses	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	0	0	0.00	2025-04-26 04:09:22.875833+00	\N
70	Ignite HIIT: Fast-Paced Workouts for Maximum Burn and Minimum Time	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	0	0	0.00	2025-04-26 04:09:22.875833+00	\N
71	From Zero to Lit: The Ignite HIIT Method for Total Body Transformation	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	0	0	0.00	2025-04-26 04:09:22.875833+00	\N
72	Ignite HIIT: A Metabolic-Firestorm Fitness Program for All Levels	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	0	0	0.00	2025-04-26 04:09:22.875833+00	\N
73	Ignite HIIT: Turn Up the Heat, Turn Down the Fat	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	0	0	0.00	2025-04-26 04:09:22.875833+00	\N
74	Ignite HIIT: Accelerated Workouts to Unleash Your Inner Athlete	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	0	0	0.00	2025-04-26 04:09:22.875833+00	\N
75	Get Back in the Game: Rehab Ready for Strength and Mobility	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	0	0	0.00	2025-04-26 04:09:22.875833+00	\N
76	Rehab Ready: Restore Mobility, Rebuild Strength, and Recover with Confidence	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	0	0	0.00	2025-04-26 04:09:22.875833+00	\N
77	Rehab Ready: A Full-Body Recovery System for Injury-Free Movement	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	0	0	0.00	2025-04-26 04:09:22.875833+00	\N
78	Rehab Ready: Strengthen, Recover, and Return to Your Best	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	0	0	0.00	2025-04-26 04:09:22.875833+00	\N
79	Rehab Ready: Train Your Body for Recovery, Resilience, and Performance	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	0	0	0.00	2025-04-26 04:09:22.875833+00	\N
80	Rehab Ready: Functional Fitness for a Faster and Stronger Comeback	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	0	0	0.00	2025-04-26 04:09:22.875833+00	\N
\.


--
-- TOC entry 5221 (class 0 OID 20434)
-- Dependencies: 357
-- Data for Name: program_activity_content; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.program_activity_content (id, title, description, type, "gymOwnerId", "gymManagerOwnerId", content, "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 5222 (class 0 OID 20441)
-- Dependencies: 358
-- Data for Name: program_per_sociology; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.program_per_sociology (id, "programId", "baseSociologyId", "createdAt") FROM stdin;
\.


--
-- TOC entry 5224 (class 0 OID 20446)
-- Dependencies: 360
-- Data for Name: program_step; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.program_step (id, name, description, "iconUrl", "gymId", "programId", "ownerUserId", status, "attendeesCount", "viewsCount", "ratingsAvg", "ratingsCount", duration, "durationUnitId", "difficultyLevel", "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 5226 (class 0 OID 20461)
-- Dependencies: 362
-- Data for Name: program_step_activity; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.program_step_activity (id, name, description, "gymId", "programId", "programStepId", "ownerUserId", "iconUrl", status, points, "isPublic", "isChallenge", price, "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 5227 (class 0 OID 20472)
-- Dependencies: 363
-- Data for Name: program_step_activity_workingsession; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.program_step_activity_workingsession (id, name, goal, description, "gymId", "programId", "programStepId", "programStepActivityId", "ownerUserId", "imageUrl", "illustrationUrl", "videoUrl", points, status, price, targets, "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 5230 (class 0 OID 20482)
-- Dependencies: 366
-- Data for Name: program_step_activity_workingsession_workout; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.program_step_activity_workingsession_workout (id, "workingSessionId", "baseWorkoutId", "gymId", "programId", "programStepId", "programStepActivityId", "ownerUserId", title, description, "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 5232 (class 0 OID 20489)
-- Dependencies: 368
-- Data for Name: program_subscription_plan; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.program_subscription_plan (id, "planName", price, "trialNumberDays", "durationType", description, "trialEndDate", "trialNumberProgramActivities", "planFeatures", "createdAt", "updatedAt") FROM stdin;
1	Basic	9.99	30	\N	\N	\N	\N	\N	2025-04-26 04:14:32.784032	\N
2	Premium	19.99	90	\N	\N	\N	\N	\N	2025-04-26 04:14:32.784032	\N
3	Elite	49.99	365	\N	\N	\N	\N	\N	2025-04-26 04:14:32.784032	\N
\.


--
-- TOC entry 5235 (class 0 OID 20497)
-- Dependencies: 371
-- Data for Name: program_workout_nutrient_burn; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.program_workout_nutrient_burn (id, duration, "nutrientId", "burnsNutrientQty", "durationUnitId", "baseWorkoutId", "gymId", "programId", "programStepId", "programStepActivityId", "programStepActivityWorkingsessionId", "programStepActivityWorkingsessionWorkoutId", "ownerUserId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 5236 (class 0 OID 20502)
-- Dependencies: 372
-- Data for Name: program_workout_recommended_repetition; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.program_workout_recommended_repetition (id, "attendeeLevel", duration, "durationUnitId", "setCount", "baseWorkoutId", "baseWorkoutRecommendedRepetitionId", "gymId", "programId", "programStepId", "programStepActivityId", "programStepActivityWorkingsessionId", "programStepActivityWorkingsessionWorkoutId", "ownerUserId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 5237 (class 0 OID 20510)
-- Dependencies: 373
-- Data for Name: social_advertisement; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.social_advertisement (id, "videoUrl", "imageUrl", action, "actionLink", "actionProgramId", "actionGymId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 5239 (class 0 OID 20517)
-- Dependencies: 375
-- Data for Name: social_affiliate_link; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.social_affiliate_link (id, "generatedLink", "affiliateProgramIdId", "ownerUserId", "createdAt", "updatedAt") FROM stdin;
1	https://yourdomain.com/affiliate/link1	0	1	2025-04-26 04:17:40.627623	\N
2	https://yourdomain.com/affiliate/link2	0	2	2025-04-26 04:17:40.627623	\N
3	https://yourdomain.com/affiliate/link3	0	3	2025-04-26 04:17:40.627623	\N
4	https://yourdomain.com/affiliate/link4	0	4	2025-04-26 04:17:40.627623	\N
5	https://yourdomain.com/affiliate/link5	0	5	2025-04-26 04:17:40.627623	\N
6	https://yourdomain.com/affiliate/link6	0	1	2025-04-26 04:17:40.627623	\N
7	https://yourdomain.com/affiliate/link7	0	2	2025-04-26 04:17:40.627623	\N
8	https://yourdomain.com/affiliate/link8	0	3	2025-04-26 04:17:40.627623	\N
9	https://yourdomain.com/affiliate/link9	0	4	2025-04-26 04:17:40.627623	\N
10	https://yourdomain.com/affiliate/link10	0	5	2025-04-26 04:17:40.627623	\N
11	https://yourdomain.com/affiliate/link11	0	1	2025-04-26 04:17:40.627623	\N
12	https://yourdomain.com/affiliate/link12	0	2	2025-04-26 04:17:40.627623	\N
\.


--
-- TOC entry 5241 (class 0 OID 20524)
-- Dependencies: 377
-- Data for Name: social_affiliate_program; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.social_affiliate_program (id, "commissionRate", description, "programId", "programActivityId", "programActivityWorkingsessionId", "createdAt", "updatedAt") FROM stdin;
1	0.15	Earn 15% commission on every sale of this strength training program.	1	0	0	2025-04-26 04:18:21.4974	\N
2	0.10	Earn 10% commission on every sale of this nutrition guide.	2	0	0	2025-04-26 04:18:21.4974	\N
3	0.20	Earn 20% commission on every sale of this yoga program.	3	0	0	2025-04-26 04:18:21.4974	\N
4	0.18	Earn 18% commission on every sale of this HIIT program.	4	0	0	2025-04-26 04:18:21.4974	\N
5	0.25	Earn 25% commission on every sale of this bodyweight training program.	5	0	0	2025-04-26 04:18:21.4974	\N
6	0.12	Earn 12% commission on every sale of this meal planning guide.	6	0	0	2025-04-26 04:18:21.4974	\N
7	0.17	Earn 17% commission on every sale of this HIIT program.	7	0	0	2025-04-26 04:18:21.4974	\N
8	0.19	Earn 19% commission on every sale of this yoga program.	8	0	0	2025-04-26 04:18:21.4974	\N
9	0.22	Earn 22% commission on every sale of this strength training program.	9	0	0	2025-04-26 04:18:21.4974	\N
10	0.14	Earn 14% commission on every sale of this nutrition guide.	10	0	0	2025-04-26 04:18:21.4974	\N
11	0.21	Earn 21% commission on every sale of this yoga program.	11	0	0	2025-04-26 04:18:21.4974	\N
\.


--
-- TOC entry 5243 (class 0 OID 20534)
-- Dependencies: 379
-- Data for Name: social_affiliate_sale; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.social_affiliate_sale (id, "saleAmount", "commissionEarned", "affiliateLinkId", "createdDate", "updatedAt") FROM stdin;
1	12.99	1.95	\N	2025-04-26 04:20:40.478426	\N
2	10.99	1.10	\N	2025-04-26 04:20:40.478426	\N
3	15.99	3.20	\N	2025-04-26 04:20:40.478426	\N
4	9.99	1.80	\N	2025-04-26 04:20:40.478426	\N
5	11.99	3.00	\N	2025-04-26 04:20:40.478426	\N
\.


--
-- TOC entry 5245 (class 0 OID 20539)
-- Dependencies: 381
-- Data for Name: social_chat; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.social_chat (id, "heyUserId", "hiUserId", "dateStarted") FROM stdin;
1	1	1	\N
2	2	2	\N
3	3	3	\N
4	4	4	\N
5	5	5	\N
6	1	6	\N
\.


--
-- TOC entry 5247 (class 0 OID 20544)
-- Dependencies: 383
-- Data for Name: social_chat_message; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.social_chat_message (id, "chatId", "sentDate", "senderUserId", auto, "messageTextId") FROM stdin;
\.


--
-- TOC entry 5249 (class 0 OID 20550)
-- Dependencies: 385
-- Data for Name: social_chat_message_text; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.social_chat_message_text (id, text, "sentDate") FROM stdin;
\.


--
-- TOC entry 5251 (class 0 OID 20557)
-- Dependencies: 387
-- Data for Name: social_news; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.social_news (id, title, "userId", text, "mediaUrls", "createdDate", "updatedAt") FROM stdin;
1	The Importance of Hydration	2	2	\N	2025-04-20 17:33:55.740795	\N
2	Yoga for Beginners	3	3	\N	2025-04-20 17:33:55.740795	\N
3	HIIT for Weight Loss	4	4	\N	2025-04-20 17:33:55.740795	\N
4	The Benefits of Bodyweight Training	5	5	\N	2025-04-20 17:33:55.740795	\N
5	Meal Planning Tips for Busy People	6	6	\N	2025-04-20 17:33:55.740795	\N
6	Meal Planning Tips for Busy People	6	7	\N	2025-04-20 17:33:55.740795	\N
\.


--
-- TOC entry 5253 (class 0 OID 20564)
-- Dependencies: 389
-- Data for Name: social_notification; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.social_notification (id, message, "isRead", "userId", type, "isClicked", "isPushed", "readDate", "pushedDate", "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 5255 (class 0 OID 20574)
-- Dependencies: 391
-- Data for Name: social_review; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.social_review (id, rating, comment, "itemType", "itemId", "userId", "easeOfUse", effectiveness, "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 4812 (class 0 OID 18372)
-- Dependencies: 225
-- Data for Name: spatial_ref_sys; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.spatial_ref_sys (srid, auth_name, auth_srid, srtext, proj4text) FROM stdin;
\.


--
-- TOC entry 5257 (class 0 OID 20581)
-- Dependencies: 393
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" (id, email, "firstName", "lastName", "phoneNumber", "birthDate", "passwordHash", "profileImageUrl", "isEmailVerified", "verificationToken", "resetPasswordToken", "lastLogin", "userProfile", "coverImageUrl", "createdAt", "updatedAt") FROM stdin;
1	test1@example.com	Test	User1	\N	2024-10-18 22:12:32.285428	$argon2id$v=19$m=65536,t=3,p=4$hFXmms7N7+Dz46TFytDawQ$uUqXAKAr7m62tYAlu1+ZF/aOCCkElIvZSAtbbUveEiQ	https://res.cloudinary.com/ds9ufzny1/image/upload/v1697110658/fitness_user_images/fpdl.in__portrait-bald-handsome-bearded-man-black-t-shirt-street-who-looks-away_152904-6792_normal_tvejdj.jpg	t	\N	\N	2024-10-18 22:12:32.285428	\N	\N	2025-04-26 04:26:19.823692	\N
2	test2@example.com	Test	User2	\N	2024-10-18 22:12:32.511713	$argon2id$v=19$m=65536,t=3,p=4$KAv+ZjUJuMlMEeOmbHPFSw$ridl+K7ZwZ/jwlS11gk9CCKOtf3nLhLJZHleAf1+NTU	https://res.cloudinary.com/ds9ufzny1/image/upload/v1697110656/fitness_user_images/young-man-white-shirt-looking-camera-looking-happy_176474-83327_pmuqbp.jpg	t	\N	\N	2024-10-18 22:12:32.511713	\N	\N	2025-04-26 04:26:19.823692	\N
3	test3@example.com	Test	User3	\N	2024-10-18 22:12:32.628739	$argon2id$v=19$m=65536,t=3,p=4$IawNGthvm5QGelf17CtVTQ$c4XvCPYcxd85W3QgYDRjCw16Mfg7XS5CPnv4vwDQQS4	https://res.cloudinary.com/ds9ufzny1/image/upload/v1697110655/fitness_user_images/young-man-wearing-blue-outfit-looking-confident_1298-291_trhntu.jpg	t	\N	\N	2024-10-18 22:12:32.628739	\N	\N	2025-04-26 04:26:19.823692	\N
4	test4@example.com	Test	User4	\N	2024-10-18 22:12:32.74275	$argon2id$v=19$m=65536,t=3,p=4$EY414ABN6PA1UNu5c8O1QA$OfWpKKwJMh6hO4uecglucDlCdJmPlXZF5w6FB7OQxIU	https://res.cloudinary.com/ds9ufzny1/image/upload/v1697110653/fitness_user_images/worried-fatso-male-makes-size-sign-with-fingers-speaks-about-something-very-little-tiny-asks-wait-few-minutes-keeps-hand-thick-belly-isolated-yellow-wall-much-few_273609-39957_cvt8ou.jpg	t	\N	\N	2024-10-18 22:12:32.74275	\N	\N	2025-04-26 04:26:19.823692	\N
5	test5@example.com	Test	User5	\N	2024-10-18 22:12:32.852469	$argon2id$v=19$m=65536,t=3,p=4$kMJa/TrgF9vgrAFsKcUmgA$yIXdKQWGJy7lvvurHsLL8tcSTez+fNjTLLTWQL01N3o	https://res.cloudinary.com/ds9ufzny1/image/upload/v1697110651/fitness_user_images/tender-woman-having-brow-color-added-her-eyebrows_231208-3536_uhw96q.jpg	t	\N	\N	2024-10-18 22:12:32.852469	\N	\N	2025-04-26 04:26:19.823692	\N
6	test6@example.com	Test	User6	\N	2024-10-18 22:12:32.965786	$argon2id$v=19$m=65536,t=3,p=4$7ZTpCrAsdcW6bNobtqKcEQ$9yNVVRUvYFmTsBcIayDU05a/HJPeBH/fwsJ4PXEH/I0	https://res.cloudinary.com/ds9ufzny1/image/upload/v1697110650/fitness_user_images/smiling-man_1098-15443_pxfwre.jpg	t	\N	\N	2024-10-18 22:12:32.965786	\N	\N	2025-04-26 04:26:19.823692	\N
7	test7@example.com	Test	User7	\N	2024-10-18 22:12:33.089454	$argon2id$v=19$m=65536,t=3,p=4$3AgrhOIwGAoY9Gm5aIEIYw$M7b5b6lIJ3PcjlHw3xqN7bshhXdZXeh9afTNn2q1Doo	https://res.cloudinary.com/ds9ufzny1/image/upload/v1697110648/fitness_user_images/smiling-man-sitting-street-cafe-table-with-his-arms-crossed_1262-19055_v0h04p.jpg	t	\N	\N	2024-10-18 22:12:33.089454	\N	\N	2025-04-26 04:26:19.823692	\N
8	test8@example.com	Test	User8	\N	2024-10-18 22:12:33.221242	$argon2id$v=19$m=65536,t=3,p=4$1ipwSMrOxCW4ZeRsGIJTzw$uRcIR7XQUzLtMWNflO9JsaQxVBLxzskuQEB4tB+Dwlk	https://res.cloudinary.com/ds9ufzny1/image/upload/v1697110646/fitness_user_images/smiling-happy-businessman-looking-camera_23-2148113005_xokzjx.jpg	t	\N	\N	2024-10-18 22:12:33.221242	\N	\N	2025-04-26 04:26:19.823692	\N
9	test9@example.com	Test	User9	\N	2024-10-18 22:12:33.348852	$argon2id$v=19$m=65536,t=3,p=4$9ga4DbCcFS88GSXCpiNiyA$ewbJ6Ss/s4nFf0csp7jtXYYnMrlZH8zNOI21v4jwKD8	https://res.cloudinary.com/ds9ufzny1/image/upload/v1697110645/fitness_user_images/smiling-caucasian-young-guy-wearing-pink-shirt-isolated-white-background_141793-38614_xd7hya.jpg	t	\N	\N	2024-10-18 22:12:33.348852	\N	\N	2025-04-26 04:26:19.823692	\N
10	test10@example.com	Test	User10	\N	2024-10-18 22:12:33.457874	$argon2id$v=19$m=65536,t=3,p=4$E/4eWmFKxTaY2hiDWYXBQg$gsa9SA0hqoT0U3Drqj2wTvTnewwlVbZdXg2knbg+p3A	https://res.cloudinary.com/ds9ufzny1/image/upload/v1697110643/fitness_user_images/smart-looking-teacher_53876-23045_qvjszp.jpg	t	\N	\N	2024-10-18 22:12:33.457874	\N	\N	2025-04-26 04:26:19.823692	\N
11	test11@example.com	Test	User11	\N	2024-10-18 22:12:33.57628	$argon2id$v=19$m=65536,t=3,p=4$A7iJb1B4rkl+E9MTP7UWrw$KmIMzKS3UW5D1E7qPTuDPf8Mt683vc8mZctsUzQDkB8	https://res.cloudinary.com/ds9ufzny1/image/upload/v1697110641/fitness_user_images/pretty-fat-man-smiles-checking-his-smartphone-while-he-sits-sofa-eats_8353-5517_ammcle.jpg	t	\N	\N	2024-10-18 22:12:33.57628	\N	\N	2025-04-26 04:26:19.823692	\N
12	test12@example.com	Test	User12	\N	2024-10-18 22:12:33.68141	$argon2id$v=19$m=65536,t=3,p=4$cnBtIlZNlF6+lwbZoWmMLA$8mO+Hcw0KQo4tt1WM1eKkigp1iYhT7glkQV5hf2VbjA	https://res.cloudinary.com/ds9ufzny1/image/upload/v1697110640/fitness_user_images/overweight-man-glasses-wearing-black-t-shirt-with-frowning-face-displeased-light_141793-58882_bx9cpp.jpg	t	\N	\N	2024-10-18 22:12:33.68141	\N	\N	2025-04-26 04:26:19.823692	\N
13	test13@example.com	Test	User13	\N	2024-10-18 22:12:33.800006	$argon2id$v=19$m=65536,t=3,p=4$uNMwfX0gg1PnXrFUFDjPAQ$R0x5usEXlq/PesyQP2QMR2XpP10jThr5hFkpVlIRND0	https://res.cloudinary.com/ds9ufzny1/image/upload/v1697110638/fitness_user_images/handsome-man-with-glasses_144627-18665_jr8pbs.jpg	t	\N	\N	2024-10-18 22:12:33.800006	\N	\N	2025-04-26 04:26:19.823692	\N
14	test14@example.com	Test	User14	\N	2024-10-18 22:12:33.914079	$argon2id$v=19$m=65536,t=3,p=4$hiSfzf1irRtifk3iWHOCXA$oHGtihpZrG5x+wvranZU7YmfCDHp5fUTi9dgbTScjYw	https://res.cloudinary.com/ds9ufzny1/image/upload/v1697110633/fitness_user_images/handsome-man-looking-camera_23-2148323719_vyxqfk.jpg	t	\N	\N	2024-10-18 22:12:33.914079	\N	\N	2025-04-26 04:26:19.823692	\N
15	test15@example.com	Test	User15	\N	2024-10-18 22:12:34.042897	$argon2id$v=19$m=65536,t=3,p=4$8P3vMLiErtwOsvsw30U+9A$ly2W0zTI5XEUjkIvPM4eQlIKsK9RU9Psxsd/trhRnD0	https://res.cloudinary.com/ds9ufzny1/image/upload/v1697110631/fitness_user_images/front-view-smiley-woman-seaside_23-2149455861_l2o9qm.jpg	t	\N	\N	2024-10-18 22:12:34.042897	\N	\N	2025-04-26 04:26:19.823692	\N
16	test16@example.com	Test	User16	\N	2024-10-18 22:12:34.166907	$argon2id$v=19$m=65536,t=3,p=4$Aez+/Mhcimz6qkZdD2CJUg$pLjA/6Z+42NR0olBrYAGY/ZJm0y82yShUvpufV/MFD4	https://res.cloudinary.com/ds9ufzny1/image/upload/v1697110630/fitness_user_images/cute-boy-with-down-syndrome-homeschooling-using-digital-tablet-during-coronavirus-pandemic_53876-153945_slt2wl.jpg	t	\N	\N	2024-10-18 22:12:34.166907	\N	\N	2025-04-26 04:26:19.823692	\N
17	test17@example.com	Test	User17	\N	2024-10-18 22:12:34.305148	$argon2id$v=19$m=65536,t=3,p=4$ill/gt0S47piVkNiNUlu7g$rS7HIAP60NKf6aJE8AKJFYU28sXIj3+WOHqMI/9T8Rk	https://res.cloudinary.com/ds9ufzny1/image/upload/v1697110650/fitness_user_images/smiling-man_1098-15443_pxfwre.jpg	t	\N	\N	2024-10-18 22:12:34.305148	\N	\N	2025-04-26 04:26:19.823692	\N
18	test18@example.com	Test	User18	\N	2024-10-18 22:12:34.411959	$argon2id$v=19$m=65536,t=3,p=4$ovwOo6Lr7YS6XYaCMIWeJQ$brkmnVMXiDHBKr+TevX9tGKcS0V4EoljYcZbG7slX+8	https://res.cloudinary.com/ds9ufzny1/image/upload/v1697110638/fitness_user_images/handsome-man-with-glasses_144627-18665_jr8pbs.jpg	t	\N	\N	2024-10-18 22:12:34.411959	\N	\N	2025-04-26 04:26:19.823692	\N
19	cabrelniamekon@gmail.com	\N		\N	2024-10-20 13:36:47.2893	$argon2id$v=19$m=65536,t=3,p=4$fOnKENsmgsNwjBLTkbHkvw$puIS6rLNfr2qVTvjYPbySGmmnZbLJ8/BXznjGMqxPz8	https://lh3.googleusercontent.com/a/ACg8ocIyab-RX0HEDIXnOgzGMhkbSS7Grsma-aOiIVheef2HiEmdFw=s96-c	f	\N	\N	2024-10-20 13:36:47.2893	\N	\N	2025-04-26 04:26:19.823692	\N
20	ntbryze@gmail.com	Brice	NTSA	\N	2025-04-13 19:48:00.109827	$argon2id$v=19$m=65536,t=3,p=4$BDxQ3LiBUH1CWPe+jRDyjA$sWGiDho09f2HzlMV654HjJBr7ch6jdNRUUS4Md3YtX4		f	\N	\N	2025-04-13 19:48:00.109827	\N	\N	2025-04-26 04:26:19.823692	\N
\.


--
-- TOC entry 5258 (class 0 OID 20591)
-- Dependencies: 394
-- Data for Name: user_body_param; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_body_param (id, "userId", "bodyParamId", "paramValue", "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 5259 (class 0 OID 20595)
-- Dependencies: 395
-- Data for Name: user_bookmark_and_favorite; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_bookmark_and_favorite (id, "bookmarkType", "isBookMark", "isFavorite", "itemId", "userId", "createdAt") FROM stdin;
\.


--
-- TOC entry 5262 (class 0 OID 20600)
-- Dependencies: 398
-- Data for Name: user_program_evolution_event; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_program_evolution_event (id, event, "userId", "gymId", "programItemId", "programItem", "progressionPoints", "progressionPercentage", "totalrogressionPercentage", "totalProgressionPoints", quantity, iteration, "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 5263 (class 0 OID 20610)
-- Dependencies: 399
-- Data for Name: user_recommendation; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_recommendation (id, "recommenderUserId", "recommendedManagerUserId", "recommendeeUserId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 5265 (class 0 OID 20615)
-- Dependencies: 401
-- Data for Name: user_subscription_plan; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_subscription_plan (id, "itemId", status, item, "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 5272 (class 0 OID 0)
-- Dependencies: 289
-- Name: base_app_update_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.base_app_update_id_seq', 2, true);


--
-- TOC entry 5273 (class 0 OID 0)
-- Dependencies: 291
-- Name: base_body_param_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.base_body_param_id_seq', 4, true);


--
-- TOC entry 5274 (class 0 OID 0)
-- Dependencies: 294
-- Name: base_food_group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.base_food_group_id_seq', 14, true);


--
-- TOC entry 5275 (class 0 OID 0)
-- Dependencies: 296
-- Name: base_food_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.base_food_id_seq', 70, true);


--
-- TOC entry 5276 (class 0 OID 0)
-- Dependencies: 297
-- Name: base_food_nutrients_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.base_food_nutrients_id_seq', 2, true);


--
-- TOC entry 5277 (class 0 OID 0)
-- Dependencies: 300
-- Name: base_meal_food_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.base_meal_food_id_seq', 1, false);


--
-- TOC entry 5278 (class 0 OID 0)
-- Dependencies: 301
-- Name: base_meal_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.base_meal_id_seq', 1, true);


--
-- TOC entry 5279 (class 0 OID 0)
-- Dependencies: 303
-- Name: base_muscle_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.base_muscle_id_seq', 1, false);


--
-- TOC entry 5280 (class 0 OID 0)
-- Dependencies: 304
-- Name: base_nutrient_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.base_nutrient_id_seq', 13, true);


--
-- TOC entry 5281 (class 0 OID 0)
-- Dependencies: 307
-- Name: base_program_goal_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.base_program_goal_id_seq', 48, true);


--
-- TOC entry 5282 (class 0 OID 0)
-- Dependencies: 309
-- Name: base_program_sociology_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.base_program_sociology_id_seq', 4, true);


--
-- TOC entry 5283 (class 0 OID 0)
-- Dependencies: 311
-- Name: base_recipe_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.base_recipe_id_seq', 1, false);


--
-- TOC entry 5284 (class 0 OID 0)
-- Dependencies: 313
-- Name: base_unit_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.base_unit_id_seq', 16, true);


--
-- TOC entry 5285 (class 0 OID 0)
-- Dependencies: 315
-- Name: base_workout_category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.base_workout_category_id_seq', 24, true);


--
-- TOC entry 5286 (class 0 OID 0)
-- Dependencies: 317
-- Name: base_workout_howto_perform_step_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.base_workout_howto_perform_step_id_seq', 1, false);


--
-- TOC entry 5287 (class 0 OID 0)
-- Dependencies: 319
-- Name: base_workout_nutrient_burn_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.base_workout_nutrient_burn_id_seq', 1, false);


--
-- TOC entry 5288 (class 0 OID 0)
-- Dependencies: 321
-- Name: base_workout_recommended_repetition_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.base_workout_recommended_repetition_id_seq', 1, false);


--
-- TOC entry 5289 (class 0 OID 0)
-- Dependencies: 324
-- Name: gym_follower_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.gym_follower_id_seq', 1, false);


--
-- TOC entry 5290 (class 0 OID 0)
-- Dependencies: 325
-- Name: gym_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.gym_id_seq', 12, true);


--
-- TOC entry 5291 (class 0 OID 0)
-- Dependencies: 328
-- Name: gym_manager_follower_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.gym_manager_follower_id_seq', 1, false);


--
-- TOC entry 5292 (class 0 OID 0)
-- Dependencies: 329
-- Name: gym_manager_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.gym_manager_id_seq', 1, false);


--
-- TOC entry 5293 (class 0 OID 0)
-- Dependencies: 331
-- Name: gym_manager_overview_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.gym_manager_overview_id_seq', 1, false);


--
-- TOC entry 5294 (class 0 OID 0)
-- Dependencies: 333
-- Name: gym_manager_qualification_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.gym_manager_qualification_id_seq', 6, true);


--
-- TOC entry 5295 (class 0 OID 0)
-- Dependencies: 335
-- Name: gym_manager_request_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.gym_manager_request_id_seq', 1, false);


--
-- TOC entry 5296 (class 0 OID 0)
-- Dependencies: 337
-- Name: gym_manager_specialized_in_workout_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.gym_manager_specialized_in_workout_id_seq', 1, false);


--
-- TOC entry 5297 (class 0 OID 0)
-- Dependencies: 339
-- Name: gym_membership_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.gym_membership_id_seq', 1, false);


--
-- TOC entry 5298 (class 0 OID 0)
-- Dependencies: 343
-- Name: gym_membership_plan_features_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.gym_membership_plan_features_id_seq', 1, false);


--
-- TOC entry 5299 (class 0 OID 0)
-- Dependencies: 340
-- Name: gym_membership_plan_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.gym_membership_plan_id_seq', 1, false);


--
-- TOC entry 5300 (class 0 OID 0)
-- Dependencies: 345
-- Name: gym_open_day_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.gym_open_day_id_seq', 1, false);


--
-- TOC entry 5301 (class 0 OID 0)
-- Dependencies: 347
-- Name: gym_specialized_in_workout_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.gym_specialized_in_workout_id_seq', 1, false);


--
-- TOC entry 5302 (class 0 OID 0)
-- Dependencies: 349
-- Name: map_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.map_id_seq', 1, true);


--
-- TOC entry 5303 (class 0 OID 0)
-- Dependencies: 351
-- Name: payment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.payment_id_seq', 7, true);


--
-- TOC entry 5304 (class 0 OID 0)
-- Dependencies: 353
-- Name: payment_transfer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.payment_transfer_id_seq', 1, false);


--
-- TOC entry 5305 (class 0 OID 0)
-- Dependencies: 356
-- Name: program_activity_content_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.program_activity_content_id_seq', 1, false);


--
-- TOC entry 5306 (class 0 OID 0)
-- Dependencies: 354
-- Name: program_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.program_id_seq', 80, true);


--
-- TOC entry 5307 (class 0 OID 0)
-- Dependencies: 361
-- Name: program_step_activity_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.program_step_activity_id_seq', 1, false);


--
-- TOC entry 5308 (class 0 OID 0)
-- Dependencies: 364
-- Name: program_step_activity_workingsession_exercise_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.program_step_activity_workingsession_exercise_id_seq', 1, false);


--
-- TOC entry 5309 (class 0 OID 0)
-- Dependencies: 365
-- Name: program_step_activity_workingsession_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.program_step_activity_workingsession_id_seq', 1, false);


--
-- TOC entry 5310 (class 0 OID 0)
-- Dependencies: 367
-- Name: program_step_activity_workingsession_workout_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.program_step_activity_workingsession_workout_id_seq', 1, false);


--
-- TOC entry 5311 (class 0 OID 0)
-- Dependencies: 359
-- Name: program_step_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.program_step_id_seq', 1, false);


--
-- TOC entry 5312 (class 0 OID 0)
-- Dependencies: 369
-- Name: program_subscription_plan_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.program_subscription_plan_id_seq', 3, true);


--
-- TOC entry 5313 (class 0 OID 0)
-- Dependencies: 370
-- Name: program_workout_nutrient_burn_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.program_workout_nutrient_burn_id_seq', 1, false);


--
-- TOC entry 5314 (class 0 OID 0)
-- Dependencies: 374
-- Name: social_advertisement_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.social_advertisement_id_seq', 1, false);


--
-- TOC entry 5315 (class 0 OID 0)
-- Dependencies: 376
-- Name: social_affiliate_link_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.social_affiliate_link_id_seq', 12, true);


--
-- TOC entry 5316 (class 0 OID 0)
-- Dependencies: 378
-- Name: social_affiliate_program_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.social_affiliate_program_id_seq', 11, true);


--
-- TOC entry 5317 (class 0 OID 0)
-- Dependencies: 380
-- Name: social_affiliate_sale_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.social_affiliate_sale_id_seq', 5, true);


--
-- TOC entry 5318 (class 0 OID 0)
-- Dependencies: 382
-- Name: social_chat_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.social_chat_id_seq', 6, true);


--
-- TOC entry 5319 (class 0 OID 0)
-- Dependencies: 384
-- Name: social_chat_message_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.social_chat_message_id_seq', 1, false);


--
-- TOC entry 5320 (class 0 OID 0)
-- Dependencies: 386
-- Name: social_chat_message_text_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.social_chat_message_text_id_seq', 1, false);


--
-- TOC entry 5321 (class 0 OID 0)
-- Dependencies: 388
-- Name: social_news_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.social_news_id_seq', 6, true);


--
-- TOC entry 5322 (class 0 OID 0)
-- Dependencies: 390
-- Name: social_notification_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.social_notification_id_seq', 5, true);


--
-- TOC entry 5323 (class 0 OID 0)
-- Dependencies: 392
-- Name: social_review_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.social_review_id_seq', 1, false);


--
-- TOC entry 5324 (class 0 OID 0)
-- Dependencies: 396
-- Name: user_bookmark_and_favorite_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_bookmark_and_favorite_id_seq', 1, false);


--
-- TOC entry 5325 (class 0 OID 0)
-- Dependencies: 397
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_id_seq', 20, true);


--
-- TOC entry 5326 (class 0 OID 0)
-- Dependencies: 400
-- Name: user_recommendation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_recommendation_id_seq', 1, false);


--
-- TOC entry 5327 (class 0 OID 0)
-- Dependencies: 402
-- Name: user_subscription_plan_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_subscription_plan_id_seq', 1, false);


-- Completed on 2025-05-02 22:22:48 UTC

--
-- PostgreSQL database dump complete
--

