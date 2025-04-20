--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4 (Debian 17.4-1.pgdg110+2)
-- Dumped by pg_dump version 17.4

-- Started on 2025-05-02 22:22:22 UTC

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
-- TOC entry 2068 (class 1247 OID 19724)
-- Name: base_body_part_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.base_body_part_enum AS ENUM (
    'head',
    'shoulder',
    'neck',
    'arms',
    'hands',
    'chest',
    'stomac',
    'back',
    'ribs',
    'hips',
    'kidneybelt',
    'buttocks',
    'thighs',
    'hamstrings',
    'knees',
    'wrists',
    'elbows',
    'ankles',
    'calves',
    'shins',
    'egs',
    'feets',
    'phalanges',
    'toes',
    'sinus',
    'forearm',
    'uppertrapezius'
);


ALTER TYPE public.base_body_part_enum OWNER TO postgres;

--
-- TOC entry 2071 (class 1247 OID 19780)
-- Name: base_exercise_target_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.base_exercise_target_enum AS ENUM (
    'cardio',
    'weight',
    'muscle',
    'hygiene',
    'relaxing',
    'mindfulness',
    'respiration',
    'emotions',
    'flexibility',
    'concentration',
    'tennis',
    'strength',
    'endurance',
    'resistance'
);


ALTER TYPE public.base_exercise_target_enum OWNER TO postgres;

--
-- TOC entry 2074 (class 1247 OID 19810)
-- Name: base_highlight_color_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.base_highlight_color_enum AS ENUM (
    'red',
    'blue',
    'purple',
    'grey',
    'yellow',
    'none'
);


ALTER TYPE public.base_highlight_color_enum OWNER TO postgres;

--
-- TOC entry 2077 (class 1247 OID 19824)
-- Name: base_meal_type_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.base_meal_type_enum AS ENUM (
    'breakfast',
    'lunch',
    'dinner',
    'snack',
    'supper'
);


ALTER TYPE public.base_meal_type_enum OWNER TO postgres;

--
-- TOC entry 2080 (class 1247 OID 19836)
-- Name: base_nutrient_group_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.base_nutrient_group_enum AS ENUM (
    'carbohydrates',
    'proteins',
    'fats',
    'vitamins',
    'minerals',
    'fibre',
    'water'
);


ALTER TYPE public.base_nutrient_group_enum OWNER TO postgres;

--
-- TOC entry 2083 (class 1247 OID 19852)
-- Name: base_subscription_periodicity_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.base_subscription_periodicity_enum AS ENUM (
    'weekly',
    'monthly',
    'yearly',
    'lifetime',
    'trial'
);


ALTER TYPE public.base_subscription_periodicity_enum OWNER TO postgres;

--
-- TOC entry 2086 (class 1247 OID 19864)
-- Name: base_subscription_plan_item_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.base_subscription_plan_item_enum AS ENUM (
    'gym',
    'program'
);


ALTER TYPE public.base_subscription_plan_item_enum OWNER TO postgres;

--
-- TOC entry 2089 (class 1247 OID 19870)
-- Name: base_subscription_plan_status_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.base_subscription_plan_status_enum AS ENUM (
    'active',
    'cancelled',
    'suspended'
);


ALTER TYPE public.base_subscription_plan_status_enum OWNER TO postgres;

--
-- TOC entry 2092 (class 1247 OID 19878)
-- Name: base_unit_containance_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.base_unit_containance_enum AS ENUM (
    'volume',
    'time',
    'weight',
    'height',
    'concentration',
    'pressure',
    'count',
    'speed',
    'energy',
    'programduration',
    'none'
);


ALTER TYPE public.base_unit_containance_enum OWNER TO postgres;

--
-- TOC entry 2095 (class 1247 OID 19902)
-- Name: base_week_days_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.base_week_days_enum AS ENUM (
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday'
);


ALTER TYPE public.base_week_days_enum OWNER TO postgres;

--
-- TOC entry 2098 (class 1247 OID 19918)
-- Name: base_workout_attendee_level_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.base_workout_attendee_level_enum AS ENUM (
    'beginner',
    'intermediate',
    'advanced'
);


ALTER TYPE public.base_workout_attendee_level_enum OWNER TO postgres;

--
-- TOC entry 2101 (class 1247 OID 19926)
-- Name: base_workout_discipline_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.base_workout_discipline_enum AS ENUM (
    'running',
    'dancing',
    'fighting',
    'swimming',
    'walking',
    'gymnastics',
    'cycling',
    'riding',
    'driving',
    'camping',
    'athletism',
    'navigating',
    'weightlifting',
    'tennis',
    'skiing'
);


ALTER TYPE public.base_workout_discipline_enum OWNER TO postgres;

--
-- TOC entry 2104 (class 1247 OID 19958)
-- Name: gym_manager_role_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.gym_manager_role_enum AS ENUM (
    'owner',
    'communityManager',
    'nutritionistCoach',
    'fitnessCoach'
);


ALTER TYPE public.gym_manager_role_enum OWNER TO postgres;

--
-- TOC entry 2107 (class 1247 OID 19968)
-- Name: gym_membership_status_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.gym_membership_status_enum AS ENUM (
    'active',
    'inactive',
    'suspended'
);


ALTER TYPE public.gym_membership_status_enum OWNER TO postgres;

--
-- TOC entry 2110 (class 1247 OID 19976)
-- Name: gym_speciality_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.gym_speciality_enum AS ENUM (
    'fitness',
    'nutrition'
);


ALTER TYPE public.gym_speciality_enum OWNER TO postgres;

--
-- TOC entry 2113 (class 1247 OID 19982)
-- Name: gym_verified_status_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.gym_verified_status_enum AS ENUM (
    'verified',
    'unverified'
);


ALTER TYPE public.gym_verified_status_enum OWNER TO postgres;

--
-- TOC entry 2116 (class 1247 OID 19988)
-- Name: payment_payable_item_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.payment_payable_item_enum AS ENUM (
    'program',
    'activity',
    'workingsession'
);


ALTER TYPE public.payment_payable_item_enum OWNER TO postgres;

--
-- TOC entry 2119 (class 1247 OID 19996)
-- Name: payment_status_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.payment_status_enum AS ENUM (
    'triggered',
    'inprogress',
    'done',
    'failed'
);


ALTER TYPE public.payment_status_enum OWNER TO postgres;

--
-- TOC entry 2122 (class 1247 OID 20007)
-- Name: program_activity_content_accordion; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.program_activity_content_accordion AS (
	title character varying,
	text character varying,
	"mediaUrl" character varying
);


ALTER TYPE public.program_activity_content_accordion OWNER TO postgres;

--
-- TOC entry 2125 (class 1247 OID 20009)
-- Name: program_activity_content_type_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.program_activity_content_type_enum AS ENUM (
    'text',
    'video',
    'audio',
    'image',
    'accordion',
    'commitment',
    'duration',
    'exercice',
    'goals'
);


ALTER TYPE public.program_activity_content_type_enum OWNER TO postgres;

--
-- TOC entry 2128 (class 1247 OID 20028)
-- Name: program_evolution_event_type_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.program_evolution_event_type_enum AS ENUM (
    'registered',
    'started',
    'paused',
    'progressed',
    'blocked',
    'canceled',
    'done'
);


ALTER TYPE public.program_evolution_event_type_enum OWNER TO postgres;

--
-- TOC entry 2131 (class 1247 OID 20044)
-- Name: program_item_type_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.program_item_type_enum AS ENUM (
    'program',
    'step',
    'activity',
    'workingsession',
    'workout'
);


ALTER TYPE public.program_item_type_enum OWNER TO postgres;

--
-- TOC entry 2134 (class 1247 OID 20056)
-- Name: program_status_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.program_status_enum AS ENUM (
    'published',
    'unpublished'
);


ALTER TYPE public.program_status_enum OWNER TO postgres;

--
-- TOC entry 2137 (class 1247 OID 20062)
-- Name: program_step_activity_status_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.program_step_activity_status_enum AS ENUM (
    'published',
    'unpublished'
);


ALTER TYPE public.program_step_activity_status_enum OWNER TO postgres;

--
-- TOC entry 2140 (class 1247 OID 20068)
-- Name: program_step_activity_type_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.program_step_activity_type_enum AS ENUM (
    'tool',
    'trail',
    'help'
);


ALTER TYPE public.program_step_activity_type_enum OWNER TO postgres;

--
-- TOC entry 2143 (class 1247 OID 20076)
-- Name: program_step_activity_workingsession_status_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.program_step_activity_workingsession_status_enum AS ENUM (
    'published',
    'unpublished'
);


ALTER TYPE public.program_step_activity_workingsession_status_enum OWNER TO postgres;

--
-- TOC entry 2146 (class 1247 OID 20082)
-- Name: program_step_status_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.program_step_status_enum AS ENUM (
    'published',
    'unpublished'
);


ALTER TYPE public.program_step_status_enum OWNER TO postgres;

--
-- TOC entry 2149 (class 1247 OID 20088)
-- Name: program_type_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.program_type_enum AS ENUM (
    'sport',
    'nutrition'
);


ALTER TYPE public.program_type_enum OWNER TO postgres;

--
-- TOC entry 2152 (class 1247 OID 20094)
-- Name: social_advertisement_action_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.social_advertisement_action_enum AS ENUM (
    'openLink',
    'openProgram',
    'openGymPage'
);


ALTER TYPE public.social_advertisement_action_enum OWNER TO postgres;

--
-- TOC entry 2155 (class 1247 OID 20102)
-- Name: social_notification_type_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.social_notification_type_enum AS ENUM (
    'programEvolution',
    'chatMessage',
    'appUpdate',
    'socialReview',
    'recommendation',
    'userConsumption',
    'socialNewsLike',
    'socialNewsComment',
    'socialNewsShare',
    'programManagementRequest',
    'paymentSuccess',
    'paymentFailed'
);


ALTER TYPE public.social_notification_type_enum OWNER TO postgres;

--
-- TOC entry 2158 (class 1247 OID 20128)
-- Name: social_review_item_type_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.social_review_item_type_enum AS ENUM (
    'program',
    'activity',
    'content',
    'workingsession',
    'manager',
    'gym',
    'workout',
    'programstep'
);


ALTER TYPE public.social_review_item_type_enum OWNER TO postgres;

--
-- TOC entry 2161 (class 1247 OID 20146)
-- Name: user_bookmark_and_favorite_item_type_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.user_bookmark_and_favorite_item_type_enum AS ENUM (
    'program',
    'programstep',
    'activity',
    'workingsession',
    'workout',
    'meal',
    'recipe',
    'manager'
);


ALTER TYPE public.user_bookmark_and_favorite_item_type_enum OWNER TO postgres;

--
-- TOC entry 2164 (class 1247 OID 20164)
-- Name: user_profile_type_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.user_profile_type_enum AS ENUM (
    'owner',
    'attendee',
    'coach',
    'nutritionist',
    'instructor'
);


ALTER TYPE public.user_profile_type_enum OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 288 (class 1259 OID 20175)
-- Name: base_app_update; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.base_app_update (
    id integer NOT NULL,
    version character varying NOT NULL,
    features text NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.base_app_update OWNER TO postgres;

--
-- TOC entry 289 (class 1259 OID 20180)
-- Name: base_app_update_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.base_app_update_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.base_app_update_id_seq OWNER TO postgres;

--
-- TOC entry 5402 (class 0 OID 0)
-- Dependencies: 289
-- Name: base_app_update_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.base_app_update_id_seq OWNED BY public.base_app_update.id;


--
-- TOC entry 290 (class 1259 OID 20181)
-- Name: base_body_param; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.base_body_param (
    id integer NOT NULL,
    name character varying,
    description character varying,
    "unitId" integer,
    code character varying,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone
);


ALTER TABLE public.base_body_param OWNER TO postgres;

--
-- TOC entry 291 (class 1259 OID 20187)
-- Name: base_body_param_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.base_body_param_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.base_body_param_id_seq OWNER TO postgres;

--
-- TOC entry 5403 (class 0 OID 0)
-- Dependencies: 291
-- Name: base_body_param_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.base_body_param_id_seq OWNED BY public.base_body_param.id;


--
-- TOC entry 292 (class 1259 OID 20188)
-- Name: base_food; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.base_food (
    id integer NOT NULL,
    name character varying NOT NULL,
    description character varying,
    "iconUrl" character varying,
    "createdByUserId" integer DEFAULT 0,
    code character varying,
    "foodGroupId" character varying DEFAULT 0 NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone
);


ALTER TABLE public.base_food OWNER TO postgres;

--
-- TOC entry 293 (class 1259 OID 20196)
-- Name: base_food_nutrients; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.base_food_nutrients (
    id integer NOT NULL,
    "foodId" integer NOT NULL,
    "nutrientId" integer NOT NULL,
    "foodQty" numeric(5,2) DEFAULT 0 NOT NULL,
    "nutrientQty" numeric(5,2) DEFAULT 0 NOT NULL,
    "createdByUserId" integer DEFAULT 0 NOT NULL,
    "foodQtyUnitId" integer DEFAULT 0 NOT NULL,
    "nutrientQtyUnitId" integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone
);


ALTER TABLE public.base_food_nutrients OWNER TO postgres;

--
-- TOC entry 294 (class 1259 OID 20205)
-- Name: base_food_group_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.base_food_group_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.base_food_group_id_seq OWNER TO postgres;

--
-- TOC entry 5404 (class 0 OID 0)
-- Dependencies: 294
-- Name: base_food_group_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.base_food_group_id_seq OWNED BY public.base_food_nutrients.id;


--
-- TOC entry 295 (class 1259 OID 20206)
-- Name: base_food_group; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.base_food_group (
    id integer DEFAULT nextval('public.base_food_group_id_seq'::regclass) NOT NULL,
    name character varying NOT NULL,
    "iconUrl" character varying,
    "createdByUserId" integer,
    code character varying,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone
);


ALTER TABLE public.base_food_group OWNER TO postgres;

--
-- TOC entry 296 (class 1259 OID 20213)
-- Name: base_food_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.base_food_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.base_food_id_seq OWNER TO postgres;

--
-- TOC entry 5405 (class 0 OID 0)
-- Dependencies: 296
-- Name: base_food_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.base_food_id_seq OWNED BY public.base_food.id;


--
-- TOC entry 297 (class 1259 OID 20214)
-- Name: base_food_nutrients_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.base_food_nutrients_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.base_food_nutrients_id_seq OWNER TO postgres;

--
-- TOC entry 5406 (class 0 OID 0)
-- Dependencies: 297
-- Name: base_food_nutrients_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.base_food_nutrients_id_seq OWNED BY public.base_food_nutrients.id;


--
-- TOC entry 298 (class 1259 OID 20215)
-- Name: base_meal; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.base_meal (
    id integer NOT NULL,
    "mealType" public.base_meal_type_enum NOT NULL,
    description character varying,
    "createdByUserId" integer DEFAULT 0,
    code character varying,
    name character varying NOT NULL,
    "iconUrl" character varying,
    "order" integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone
);


ALTER TABLE public.base_meal OWNER TO postgres;

--
-- TOC entry 299 (class 1259 OID 20223)
-- Name: base_meal_food; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.base_meal_food (
    id integer NOT NULL,
    "mealId" integer NOT NULL,
    "foodId" integer NOT NULL,
    "foodQty" numeric(3,2) DEFAULT 1 NOT NULL,
    "foodQtyUnitId" integer DEFAULT 2 NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone
);


ALTER TABLE public.base_meal_food OWNER TO postgres;

--
-- TOC entry 300 (class 1259 OID 20229)
-- Name: base_meal_food_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.base_meal_food_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.base_meal_food_id_seq OWNER TO postgres;

--
-- TOC entry 5407 (class 0 OID 0)
-- Dependencies: 300
-- Name: base_meal_food_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.base_meal_food_id_seq OWNED BY public.base_meal_food.id;


--
-- TOC entry 301 (class 1259 OID 20230)
-- Name: base_meal_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.base_meal_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.base_meal_id_seq OWNER TO postgres;

--
-- TOC entry 5408 (class 0 OID 0)
-- Dependencies: 301
-- Name: base_meal_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.base_meal_id_seq OWNED BY public.base_meal.id;


--
-- TOC entry 302 (class 1259 OID 20231)
-- Name: base_muscle; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.base_muscle (
    id integer NOT NULL,
    name character varying NOT NULL,
    code character varying NOT NULL,
    "bodyPart" public.base_body_part_enum NOT NULL,
    "iconUrl" character varying NOT NULL,
    "order" integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone
);


ALTER TABLE public.base_muscle OWNER TO postgres;

--
-- TOC entry 303 (class 1259 OID 20238)
-- Name: base_muscle_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.base_muscle_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.base_muscle_id_seq OWNER TO postgres;

--
-- TOC entry 5409 (class 0 OID 0)
-- Dependencies: 303
-- Name: base_muscle_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.base_muscle_id_seq OWNED BY public.base_muscle.id;


--
-- TOC entry 304 (class 1259 OID 20239)
-- Name: base_nutrient_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.base_nutrient_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.base_nutrient_id_seq OWNER TO postgres;

--
-- TOC entry 305 (class 1259 OID 20240)
-- Name: base_nutrient; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.base_nutrient (
    id integer DEFAULT nextval('public.base_nutrient_id_seq'::regclass) NOT NULL,
    name character varying NOT NULL,
    description character varying,
    hint character varying,
    "iconUrl" character varying,
    "nutrientGroup" public.base_nutrient_group_enum DEFAULT 'carbohydrates'::public.base_nutrient_group_enum NOT NULL,
    abbreviation character varying NOT NULL,
    "baseUnitId" integer NOT NULL,
    "order" integer DEFAULT 0 NOT NULL,
    code character varying,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone
);


ALTER TABLE public.base_nutrient OWNER TO postgres;

--
-- TOC entry 306 (class 1259 OID 20249)
-- Name: base_program_goal; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.base_program_goal (
    id integer NOT NULL,
    title character varying NOT NULL,
    description character varying,
    framework public.program_type_enum,
    icon character varying,
    code character varying,
    "createdAt" timestamp without time zone,
    "updatedAt" timestamp without time zone
);


ALTER TABLE public.base_program_goal OWNER TO postgres;

--
-- TOC entry 307 (class 1259 OID 20254)
-- Name: base_program_goal_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.base_program_goal_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.base_program_goal_id_seq OWNER TO postgres;

--
-- TOC entry 5410 (class 0 OID 0)
-- Dependencies: 307
-- Name: base_program_goal_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.base_program_goal_id_seq OWNED BY public.base_program_goal.id;


--
-- TOC entry 308 (class 1259 OID 20255)
-- Name: base_program_sociology; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.base_program_sociology (
    id integer NOT NULL,
    name character varying NOT NULL,
    description character varying,
    code character varying,
    "createdAt" timestamp without time zone,
    "updatedAt" timestamp without time zone
);


ALTER TABLE public.base_program_sociology OWNER TO postgres;

--
-- TOC entry 309 (class 1259 OID 20260)
-- Name: base_program_sociology_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.base_program_sociology_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.base_program_sociology_id_seq OWNER TO postgres;

--
-- TOC entry 5411 (class 0 OID 0)
-- Dependencies: 309
-- Name: base_program_sociology_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.base_program_sociology_id_seq OWNED BY public.base_program_sociology.id;


--
-- TOC entry 310 (class 1259 OID 20261)
-- Name: base_recipe; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.base_recipe (
    id integer NOT NULL,
    name character varying NOT NULL,
    description character varying,
    instructions character varying,
    "imageUrl" character varying,
    calories integer,
    protein integer,
    carbs integer,
    fat integer,
    code character varying,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone
);


ALTER TABLE public.base_recipe OWNER TO postgres;

--
-- TOC entry 311 (class 1259 OID 20267)
-- Name: base_recipe_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.base_recipe_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.base_recipe_id_seq OWNER TO postgres;

--
-- TOC entry 5412 (class 0 OID 0)
-- Dependencies: 311
-- Name: base_recipe_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.base_recipe_id_seq OWNED BY public.base_recipe.id;


--
-- TOC entry 312 (class 1259 OID 20268)
-- Name: base_unit; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.base_unit (
    id integer NOT NULL,
    name character varying NOT NULL,
    abbreviation character varying NOT NULL,
    containance public.base_unit_containance_enum NOT NULL,
    "order" integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone,
    code character varying
);


ALTER TABLE public.base_unit OWNER TO postgres;

--
-- TOC entry 313 (class 1259 OID 20275)
-- Name: base_unit_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.base_unit_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.base_unit_id_seq OWNER TO postgres;

--
-- TOC entry 5413 (class 0 OID 0)
-- Dependencies: 313
-- Name: base_unit_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.base_unit_id_seq OWNED BY public.base_unit.id;


--
-- TOC entry 314 (class 1259 OID 20276)
-- Name: base_workout; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.base_workout (
    id integer NOT NULL,
    name character varying NOT NULL,
    description character varying,
    targets public.base_exercise_target_enum[] NOT NULL,
    "createdByUserId" integer DEFAULT 0,
    discipline public.base_workout_discipline_enum DEFAULT 'running'::public.base_workout_discipline_enum,
    "appleCode" character varying DEFAULT 0,
    "fitbitCode" character varying DEFAULT 0,
    "withingsCode" character varying DEFAULT 0,
    "imageUrl" character varying,
    "illustrationUrl" character varying,
    "videoUrl" character varying,
    code character varying,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone
);


ALTER TABLE public.base_workout OWNER TO postgres;

--
-- TOC entry 315 (class 1259 OID 20287)
-- Name: base_workout_category_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.base_workout_category_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.base_workout_category_id_seq OWNER TO postgres;

--
-- TOC entry 5414 (class 0 OID 0)
-- Dependencies: 315
-- Name: base_workout_category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.base_workout_category_id_seq OWNED BY public.base_workout.id;


--
-- TOC entry 316 (class 1259 OID 20288)
-- Name: base_workout_howto_perform_step; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.base_workout_howto_perform_step (
    id integer NOT NULL,
    description character varying NOT NULL,
    "illustrationUrl" character varying NOT NULL,
    "createdByUserId" integer DEFAULT 0 NOT NULL,
    highlight public.base_highlight_color_enum,
    "baseWorkoutId" integer NOT NULL,
    "order" integer DEFAULT 0 NOT NULL,
    code character varying,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone
);


ALTER TABLE public.base_workout_howto_perform_step OWNER TO postgres;

--
-- TOC entry 317 (class 1259 OID 20296)
-- Name: base_workout_howto_perform_step_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.base_workout_howto_perform_step_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.base_workout_howto_perform_step_id_seq OWNER TO postgres;

--
-- TOC entry 5415 (class 0 OID 0)
-- Dependencies: 317
-- Name: base_workout_howto_perform_step_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.base_workout_howto_perform_step_id_seq OWNED BY public.base_workout_howto_perform_step.id;


--
-- TOC entry 318 (class 1259 OID 20297)
-- Name: base_workout_nutrient_burn; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.base_workout_nutrient_burn (
    id integer NOT NULL,
    "baseWorkoutId" integer NOT NULL,
    duration integer NOT NULL,
    "nutrientId" integer NOT NULL,
    "burnsNutrientQty" numeric(5,2) NOT NULL,
    "durationUnitId" integer,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone
);


ALTER TABLE public.base_workout_nutrient_burn OWNER TO postgres;

--
-- TOC entry 319 (class 1259 OID 20301)
-- Name: base_workout_nutrient_burn_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.base_workout_nutrient_burn_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.base_workout_nutrient_burn_id_seq OWNER TO postgres;

--
-- TOC entry 5416 (class 0 OID 0)
-- Dependencies: 319
-- Name: base_workout_nutrient_burn_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.base_workout_nutrient_burn_id_seq OWNED BY public.base_workout_nutrient_burn.id;


--
-- TOC entry 320 (class 1259 OID 20302)
-- Name: base_workout_recommended_repetition; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.base_workout_recommended_repetition (
    id integer NOT NULL,
    "attendeeLevel" public.base_workout_attendee_level_enum DEFAULT 'beginner'::public.base_workout_attendee_level_enum NOT NULL,
    duration integer DEFAULT 10 NOT NULL,
    "durationUnitId" integer DEFAULT 1 NOT NULL,
    "setCount" integer DEFAULT 2 NOT NULL,
    "baseWorkoutId" integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone
);


ALTER TABLE public.base_workout_recommended_repetition OWNER TO postgres;

--
-- TOC entry 321 (class 1259 OID 20310)
-- Name: base_workout_recommended_repetition_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.base_workout_recommended_repetition_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.base_workout_recommended_repetition_id_seq OWNER TO postgres;

--
-- TOC entry 5417 (class 0 OID 0)
-- Dependencies: 321
-- Name: base_workout_recommended_repetition_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.base_workout_recommended_repetition_id_seq OWNED BY public.base_workout_recommended_repetition.id;


--
-- TOC entry 322 (class 1259 OID 20311)
-- Name: gym; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.gym (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    "logoUrl" character varying(100),
    "coverUrl" character varying,
    address character varying,
    "facebookPageUrl" character varying,
    "twitterPageUrl" character varying,
    "linkedinPageUrl" character varying,
    "youtubePageUrl" character varying,
    "tiktokPageUrl" character varying,
    "phoneLine1" character varying,
    "phoneLine2" character varying,
    moto character varying,
    "followersCount" integer,
    "createdByUserId" integer NOT NULL,
    "stripeAccountId" character varying,
    "countryId" integer,
    "stateId" integer,
    "cityId" integer,
    "membersCount" integer,
    "verifiedStatus" public.gym_verified_status_enum,
    email character varying,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone
);


ALTER TABLE public.gym OWNER TO postgres;

--
-- TOC entry 323 (class 1259 OID 20317)
-- Name: gym_follower; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.gym_follower (
    id integer NOT NULL,
    "gymId" integer NOT NULL,
    "followerUserId" integer NOT NULL,
    "acceptedDate" timestamp without time zone DEFAULT now() NOT NULL,
    "stoppedDate" timestamp without time zone,
    accepted boolean DEFAULT true,
    blocked boolean,
    stopped boolean,
    "blockedDate" timestamp without time zone
);


ALTER TABLE public.gym_follower OWNER TO postgres;

--
-- TOC entry 324 (class 1259 OID 20322)
-- Name: gym_follower_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.gym_follower_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.gym_follower_id_seq OWNER TO postgres;

--
-- TOC entry 5418 (class 0 OID 0)
-- Dependencies: 324
-- Name: gym_follower_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.gym_follower_id_seq OWNED BY public.gym_follower.id;


--
-- TOC entry 325 (class 1259 OID 20323)
-- Name: gym_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.gym_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.gym_id_seq OWNER TO postgres;

--
-- TOC entry 5419 (class 0 OID 0)
-- Dependencies: 325
-- Name: gym_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.gym_id_seq OWNED BY public.gym.id;


--
-- TOC entry 326 (class 1259 OID 20324)
-- Name: gym_manager; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.gym_manager (
    id integer NOT NULL,
    "managerUserId" integer NOT NULL,
    "dateEnrollment" date,
    "gymId" integer NOT NULL,
    role public.gym_manager_role_enum NOT NULL,
    suspended boolean,
    "managerOverviewId" integer,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone
);


ALTER TABLE public.gym_manager OWNER TO postgres;

--
-- TOC entry 327 (class 1259 OID 20328)
-- Name: gym_manager_follower; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.gym_manager_follower (
    id integer NOT NULL,
    "managerUserId" integer,
    "followerUserId" integer,
    "acceptedDate" timestamp without time zone DEFAULT now(),
    "stoppedDate" timestamp without time zone,
    stopped boolean,
    blocked boolean,
    accepted boolean,
    "blockedDate" timestamp without time zone
);


ALTER TABLE public.gym_manager_follower OWNER TO postgres;

--
-- TOC entry 328 (class 1259 OID 20332)
-- Name: gym_manager_follower_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.gym_manager_follower_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.gym_manager_follower_id_seq OWNER TO postgres;

--
-- TOC entry 5420 (class 0 OID 0)
-- Dependencies: 328
-- Name: gym_manager_follower_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.gym_manager_follower_id_seq OWNED BY public.gym_manager_follower.id;


--
-- TOC entry 329 (class 1259 OID 20333)
-- Name: gym_manager_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.gym_manager_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.gym_manager_id_seq OWNER TO postgres;

--
-- TOC entry 5421 (class 0 OID 0)
-- Dependencies: 329
-- Name: gym_manager_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.gym_manager_id_seq OWNED BY public.gym_manager.id;


--
-- TOC entry 330 (class 1259 OID 20334)
-- Name: gym_manager_overview; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.gym_manager_overview (
    id integer NOT NULL,
    bio character varying,
    text text,
    email character varying NOT NULL,
    phone character varying,
    "coverUrl" character varying,
    "facebookPageUrl" character varying,
    "twitterPageUrl" character varying,
    "linkedinPageUrl" character varying,
    "youtubePageUrl" character varying,
    "tiktokPageUrl" character varying,
    "stripeAccountId" integer,
    "countryId" integer,
    "stateId" integer,
    "cityId" integer,
    "followersCount" integer,
    "verifiedStatus" public.gym_verified_status_enum,
    experiences text,
    "viewsCount" integer,
    "attendeesCount" integer,
    "ratingsAvg" numeric(2,2) DEFAULT 0,
    "ratingsCount" integer,
    "managerUserId" integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone
);


ALTER TABLE public.gym_manager_overview OWNER TO postgres;

--
-- TOC entry 331 (class 1259 OID 20341)
-- Name: gym_manager_overview_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.gym_manager_overview_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.gym_manager_overview_id_seq OWNER TO postgres;

--
-- TOC entry 5422 (class 0 OID 0)
-- Dependencies: 331
-- Name: gym_manager_overview_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.gym_manager_overview_id_seq OWNED BY public.gym_manager_overview.id;


--
-- TOC entry 332 (class 1259 OID 20342)
-- Name: gym_manager_qualification; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.gym_manager_qualification (
    id integer NOT NULL,
    "qualificationName" character varying NOT NULL,
    "institutionName" character varying,
    "yearObtained" integer,
    "imageUrl" character varying,
    "gymManagerUserId" integer,
    "gymId" integer
);


ALTER TABLE public.gym_manager_qualification OWNER TO postgres;

--
-- TOC entry 333 (class 1259 OID 20347)
-- Name: gym_manager_qualification_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.gym_manager_qualification_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.gym_manager_qualification_id_seq OWNER TO postgres;

--
-- TOC entry 5423 (class 0 OID 0)
-- Dependencies: 333
-- Name: gym_manager_qualification_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.gym_manager_qualification_id_seq OWNED BY public.gym_manager_qualification.id;


--
-- TOC entry 334 (class 1259 OID 20348)
-- Name: gym_manager_request; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.gym_manager_request (
    id integer DEFAULT nextval('public.gym_manager_id_seq'::regclass) NOT NULL,
    "gymId" integer NOT NULL,
    "applicantUserId" integer,
    letter text,
    "portfolioUrl" character varying,
    "documentUrl" character varying,
    favorite boolean,
    accepted boolean,
    "acceptedDate" date,
    "rejectedDate" date,
    "acceptedByGymManagerUserId" integer,
    "rejectedByGymManagerUserId" integer,
    rejected boolean,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone
);


ALTER TABLE public.gym_manager_request OWNER TO postgres;

--
-- TOC entry 335 (class 1259 OID 20355)
-- Name: gym_manager_request_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.gym_manager_request_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.gym_manager_request_id_seq OWNER TO postgres;

--
-- TOC entry 5424 (class 0 OID 0)
-- Dependencies: 335
-- Name: gym_manager_request_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.gym_manager_request_id_seq OWNED BY public.gym_manager_request.id;


--
-- TOC entry 336 (class 1259 OID 20356)
-- Name: gym_manager_specialized_in_workout; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.gym_manager_specialized_in_workout (
    id integer DEFAULT nextval('public.gym_manager_specialized_in_workout'::regclass) NOT NULL,
    "managerUserId" integer NOT NULL,
    "baseWorkoutId" integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updateAt" timestamp without time zone
);


ALTER TABLE public.gym_manager_specialized_in_workout OWNER TO postgres;

--
-- TOC entry 337 (class 1259 OID 20361)
-- Name: gym_manager_specialized_in_workout_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.gym_manager_specialized_in_workout_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.gym_manager_specialized_in_workout_id_seq OWNER TO postgres;

--
-- TOC entry 5425 (class 0 OID 0)
-- Dependencies: 337
-- Name: gym_manager_specialized_in_workout_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.gym_manager_specialized_in_workout_id_seq OWNED BY public.gym_manager_specialized_in_workout.id;


--
-- TOC entry 338 (class 1259 OID 20362)
-- Name: gym_membership; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.gym_membership (
    id integer NOT NULL,
    "memberUserId" integer NOT NULL,
    "startedDate" date DEFAULT now() NOT NULL,
    "membershipStatus" public.gym_membership_status_enum NOT NULL,
    "gymId" integer NOT NULL,
    "stoppedDate" date,
    "isFavorite" boolean,
    "suspendedDate" date,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone
);


ALTER TABLE public.gym_membership OWNER TO postgres;

--
-- TOC entry 339 (class 1259 OID 20367)
-- Name: gym_membership_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.gym_membership_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.gym_membership_id_seq OWNER TO postgres;

--
-- TOC entry 5426 (class 0 OID 0)
-- Dependencies: 339
-- Name: gym_membership_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.gym_membership_id_seq OWNED BY public.gym_membership.id;


--
-- TOC entry 340 (class 1259 OID 20368)
-- Name: gym_membership_plan_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.gym_membership_plan_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.gym_membership_plan_id_seq OWNER TO postgres;

--
-- TOC entry 341 (class 1259 OID 20369)
-- Name: gym_membership_plan; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.gym_membership_plan (
    id integer DEFAULT nextval('public.gym_membership_plan_id_seq'::regclass) NOT NULL,
    "planName" character varying NOT NULL,
    price numeric(10,2) NOT NULL,
    "trialNumberDays" integer NOT NULL,
    description character varying,
    "trialNumberProgramActivities" integer,
    "listFeatures" character varying[],
    periodicity public.base_subscription_periodicity_enum,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone,
    "gymId" integer NOT NULL
);


ALTER TABLE public.gym_membership_plan OWNER TO postgres;

--
-- TOC entry 342 (class 1259 OID 20376)
-- Name: gym_membership_plan_features; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.gym_membership_plan_features (
    id integer NOT NULL,
    description character varying NOT NULL,
    highlight public.base_highlight_color_enum,
    "gymId" integer NOT NULL,
    "gymMembershipPlanId" integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone
);


ALTER TABLE public.gym_membership_plan_features OWNER TO postgres;

--
-- TOC entry 343 (class 1259 OID 20382)
-- Name: gym_membership_plan_features_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.gym_membership_plan_features_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.gym_membership_plan_features_id_seq OWNER TO postgres;

--
-- TOC entry 5427 (class 0 OID 0)
-- Dependencies: 343
-- Name: gym_membership_plan_features_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.gym_membership_plan_features_id_seq OWNED BY public.gym_membership_plan_features.id;


--
-- TOC entry 344 (class 1259 OID 20383)
-- Name: gym_open_day; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.gym_open_day (
    id integer NOT NULL,
    day public.base_week_days_enum NOT NULL,
    "hourFrom" integer NOT NULL,
    "minuteFrom" integer NOT NULL,
    "hourTo" integer NOT NULL,
    "minuteTo" integer NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now(),
    "updatedAt" timestamp without time zone,
    "gymId" integer NOT NULL
);


ALTER TABLE public.gym_open_day OWNER TO postgres;

--
-- TOC entry 345 (class 1259 OID 20387)
-- Name: gym_open_day_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.gym_open_day_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.gym_open_day_id_seq OWNER TO postgres;

--
-- TOC entry 5428 (class 0 OID 0)
-- Dependencies: 345
-- Name: gym_open_day_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.gym_open_day_id_seq OWNED BY public.gym_open_day.id;


--
-- TOC entry 346 (class 1259 OID 20388)
-- Name: gym_specialized_in_workout; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.gym_specialized_in_workout (
    id integer DEFAULT nextval('public.gym_specialized_in_workout'::regclass) NOT NULL,
    "gymId" integer NOT NULL,
    "workoutId" integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone
);


ALTER TABLE public.gym_specialized_in_workout OWNER TO postgres;

--
-- TOC entry 347 (class 1259 OID 20393)
-- Name: gym_specialized_in_workout_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.gym_specialized_in_workout_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.gym_specialized_in_workout_id_seq OWNER TO postgres;

--
-- TOC entry 5429 (class 0 OID 0)
-- Dependencies: 347
-- Name: gym_specialized_in_workout_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.gym_specialized_in_workout_id_seq OWNED BY public.gym_specialized_in_workout.id;


--
-- TOC entry 348 (class 1259 OID 20394)
-- Name: map; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.map (
    id integer NOT NULL,
    "gymId" integer,
    "userId" integer,
    "createdAt" timestamp without time zone DEFAULT now(),
    "userProfile" smallint DEFAULT 1,
    location public.geography(Point,4326)
);


ALTER TABLE public.map OWNER TO postgres;

--
-- TOC entry 5430 (class 0 OID 0)
-- Dependencies: 348
-- Name: TABLE map; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.map IS 'For userProfile column, we used a smallint type instead of user_profile_type_enum, in order to reduce table size when data grow.
userProfile = 0 (Gym), 1(Manager), 2(Attendee)';


--
-- TOC entry 349 (class 1259 OID 20399)
-- Name: map_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.map_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.map_id_seq OWNER TO postgres;

--
-- TOC entry 5431 (class 0 OID 0)
-- Dependencies: 349
-- Name: map_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.map_id_seq OWNED BY public.map.id;


--
-- TOC entry 350 (class 1259 OID 20400)
-- Name: payment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.payment (
    id integer NOT NULL,
    "amountPaid" numeric(10,2) NOT NULL,
    "paymentDate" timestamp without time zone DEFAULT now() NOT NULL,
    "paymentMethod" character varying NOT NULL,
    currency character varying NOT NULL,
    secret character varying NOT NULL,
    "userId" integer NOT NULL,
    item public.payment_payable_item_enum NOT NULL,
    "itemId" integer NOT NULL,
    status public.payment_status_enum DEFAULT 'triggered'::public.payment_status_enum NOT NULL
);


ALTER TABLE public.payment OWNER TO postgres;

--
-- TOC entry 351 (class 1259 OID 20407)
-- Name: payment_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.payment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.payment_id_seq OWNER TO postgres;

--
-- TOC entry 5432 (class 0 OID 0)
-- Dependencies: 351
-- Name: payment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.payment_id_seq OWNED BY public.payment.id;


--
-- TOC entry 352 (class 1259 OID 20408)
-- Name: payment_transfer; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.payment_transfer (
    id integer NOT NULL,
    "senderUserId" integer NOT NULL,
    "paymentMethod" integer NOT NULL,
    "stripeTransferId" character varying NOT NULL,
    "amountTransferred" numeric(10,2) NOT NULL,
    currency character varying(5) NOT NULL,
    "operationDate" timestamp without time zone DEFAULT now() NOT NULL,
    "completionDate" timestamp without time zone,
    "receiverUserId" integer DEFAULT 0 NOT NULL,
    "senderGymId" integer DEFAULT 0 NOT NULL,
    status public.payment_status_enum DEFAULT 'triggered'::public.payment_status_enum NOT NULL
);


ALTER TABLE public.payment_transfer OWNER TO postgres;

--
-- TOC entry 353 (class 1259 OID 20417)
-- Name: payment_transfer_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.payment_transfer_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.payment_transfer_id_seq OWNER TO postgres;

--
-- TOC entry 5433 (class 0 OID 0)
-- Dependencies: 353
-- Name: payment_transfer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.payment_transfer_id_seq OWNED BY public.payment_transfer.id;


--
-- TOC entry 354 (class 1259 OID 20418)
-- Name: program_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.program_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.program_id_seq OWNER TO postgres;

--
-- TOC entry 355 (class 1259 OID 20419)
-- Name: program; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.program (
    id integer DEFAULT nextval('public.program_id_seq'::regclass) NOT NULL,
    name character varying,
    "gymId" integer,
    "ownerUserId" integer,
    type public.program_type_enum,
    status public.program_status_enum,
    "iconUrl" character varying,
    "coverUrl" character varying,
    description text,
    "attendeesCount" integer DEFAULT 0,
    "viewsCount" integer DEFAULT 0,
    "ratingsAvg" integer DEFAULT 0,
    "ratingsCount" integer DEFAULT 0,
    duration integer DEFAULT 0,
    "durationUnitId" integer DEFAULT 0,
    "difficultyLevel" numeric(2,2) DEFAULT 0,
    "createdAt" character varying DEFAULT now(),
    "updatedAt" character varying
);


ALTER TABLE public.program OWNER TO postgres;

--
-- TOC entry 356 (class 1259 OID 20433)
-- Name: program_activity_content_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.program_activity_content_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.program_activity_content_id_seq OWNER TO postgres;

--
-- TOC entry 357 (class 1259 OID 20434)
-- Name: program_activity_content; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.program_activity_content (
    id integer DEFAULT nextval('public.program_activity_content_id_seq'::regclass) NOT NULL,
    title character varying,
    description character varying,
    type public.program_activity_content_type_enum,
    "gymOwnerId" integer,
    "gymManagerOwnerId" integer,
    content json,
    "createdAt" character varying DEFAULT now(),
    "updatedAt" character varying
);


ALTER TABLE public.program_activity_content OWNER TO postgres;

--
-- TOC entry 358 (class 1259 OID 20441)
-- Name: program_per_sociology; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.program_per_sociology (
    id integer NOT NULL,
    "programId" integer NOT NULL,
    "baseSociologyId" integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now()
);


ALTER TABLE public.program_per_sociology OWNER TO postgres;

--
-- TOC entry 359 (class 1259 OID 20445)
-- Name: program_step_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.program_step_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.program_step_id_seq OWNER TO postgres;

--
-- TOC entry 360 (class 1259 OID 20446)
-- Name: program_step; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.program_step (
    id integer DEFAULT nextval('public.program_step_id_seq'::regclass) NOT NULL,
    name character varying,
    description character varying,
    "iconUrl" character varying,
    "gymId" integer,
    "programId" integer,
    "ownerUserId" integer,
    status public.program_step_status_enum,
    "attendeesCount" integer DEFAULT 0,
    "viewsCount" integer DEFAULT 0,
    "ratingsAvg" integer DEFAULT 0,
    "ratingsCount" integer DEFAULT 0,
    duration integer DEFAULT 0,
    "durationUnitId" integer DEFAULT 0,
    "difficultyLevel" integer DEFAULT 0,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone
);


ALTER TABLE public.program_step OWNER TO postgres;

--
-- TOC entry 361 (class 1259 OID 20460)
-- Name: program_step_activity_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.program_step_activity_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.program_step_activity_id_seq OWNER TO postgres;

--
-- TOC entry 362 (class 1259 OID 20461)
-- Name: program_step_activity; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.program_step_activity (
    id integer DEFAULT nextval('public.program_step_activity_id_seq'::regclass) NOT NULL,
    name integer NOT NULL,
    description character varying,
    "gymId" integer NOT NULL,
    "programId" integer NOT NULL,
    "programStepId" integer NOT NULL,
    "ownerUserId" integer NOT NULL,
    "iconUrl" character varying,
    status public.program_step_activity_status_enum,
    points integer DEFAULT 0,
    "isPublic" boolean DEFAULT false,
    "isChallenge" boolean DEFAULT false,
    price numeric(5,2) DEFAULT 0,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone
);


ALTER TABLE public.program_step_activity OWNER TO postgres;

--
-- TOC entry 363 (class 1259 OID 20472)
-- Name: program_step_activity_workingsession; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.program_step_activity_workingsession (
    id integer,
    name character varying,
    goal character varying,
    description character varying,
    "gymId" integer,
    "programId" integer,
    "programStepId" integer,
    "programStepActivityId" integer,
    "ownerUserId" integer,
    "imageUrl" character varying,
    "illustrationUrl" character varying,
    "videoUrl" character varying,
    points integer DEFAULT 0,
    status public.program_step_activity_workingsession_status_enum,
    price numeric(5,2) DEFAULT 0,
    targets public.base_exercise_target_enum[],
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone
);


ALTER TABLE public.program_step_activity_workingsession OWNER TO postgres;

--
-- TOC entry 364 (class 1259 OID 20480)
-- Name: program_step_activity_workingsession_exercise_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.program_step_activity_workingsession_exercise_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.program_step_activity_workingsession_exercise_id_seq OWNER TO postgres;

--
-- TOC entry 365 (class 1259 OID 20481)
-- Name: program_step_activity_workingsession_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.program_step_activity_workingsession_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.program_step_activity_workingsession_id_seq OWNER TO postgres;

--
-- TOC entry 5434 (class 0 OID 0)
-- Dependencies: 365
-- Name: program_step_activity_workingsession_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.program_step_activity_workingsession_id_seq OWNED BY public.program_step_activity_workingsession.id;


--
-- TOC entry 366 (class 1259 OID 20482)
-- Name: program_step_activity_workingsession_workout; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.program_step_activity_workingsession_workout (
    id integer NOT NULL,
    "workingSessionId" integer NOT NULL,
    "baseWorkoutId" integer NOT NULL,
    "gymId" integer NOT NULL,
    "programId" integer,
    "programStepId" integer NOT NULL,
    "programStepActivityId" integer NOT NULL,
    "ownerUserId" integer NOT NULL,
    title character varying NOT NULL,
    description text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone
);


ALTER TABLE public.program_step_activity_workingsession_workout OWNER TO postgres;

--
-- TOC entry 367 (class 1259 OID 20488)
-- Name: program_step_activity_workingsession_workout_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.program_step_activity_workingsession_workout_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.program_step_activity_workingsession_workout_id_seq OWNER TO postgres;

--
-- TOC entry 5435 (class 0 OID 0)
-- Dependencies: 367
-- Name: program_step_activity_workingsession_workout_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.program_step_activity_workingsession_workout_id_seq OWNED BY public.program_step_activity_workingsession_workout.id;


--
-- TOC entry 368 (class 1259 OID 20489)
-- Name: program_subscription_plan; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.program_subscription_plan (
    id integer NOT NULL,
    "planName" character varying NOT NULL,
    price numeric(10,2) NOT NULL,
    "trialNumberDays" integer NOT NULL,
    "durationType" character varying,
    description character varying,
    "trialEndDate" timestamp without time zone,
    "trialNumberProgramActivities" integer,
    "planFeatures" text,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone
);


ALTER TABLE public.program_subscription_plan OWNER TO postgres;

--
-- TOC entry 369 (class 1259 OID 20495)
-- Name: program_subscription_plan_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.program_subscription_plan_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.program_subscription_plan_id_seq OWNER TO postgres;

--
-- TOC entry 5436 (class 0 OID 0)
-- Dependencies: 369
-- Name: program_subscription_plan_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.program_subscription_plan_id_seq OWNED BY public.program_subscription_plan.id;


--
-- TOC entry 370 (class 1259 OID 20496)
-- Name: program_workout_nutrient_burn_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.program_workout_nutrient_burn_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.program_workout_nutrient_burn_id_seq OWNER TO postgres;

--
-- TOC entry 371 (class 1259 OID 20497)
-- Name: program_workout_nutrient_burn; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.program_workout_nutrient_burn (
    id integer DEFAULT nextval('public.program_workout_nutrient_burn_id_seq'::regclass) NOT NULL,
    duration integer NOT NULL,
    "nutrientId" integer NOT NULL,
    "burnsNutrientQty" numeric(5,2) NOT NULL,
    "durationUnitId" integer,
    "baseWorkoutId" integer,
    "gymId" integer,
    "programId" integer,
    "programStepId" integer,
    "programStepActivityId" integer,
    "programStepActivityWorkingsessionId" integer,
    "programStepActivityWorkingsessionWorkoutId" integer,
    "ownerUserId" integer,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone
);


ALTER TABLE public.program_workout_nutrient_burn OWNER TO postgres;

--
-- TOC entry 372 (class 1259 OID 20502)
-- Name: program_workout_recommended_repetition; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.program_workout_recommended_repetition (
    id integer NOT NULL,
    "attendeeLevel" public.base_workout_attendee_level_enum DEFAULT 'beginner'::public.base_workout_attendee_level_enum NOT NULL,
    duration integer DEFAULT 10 NOT NULL,
    "durationUnitId" integer DEFAULT 1 NOT NULL,
    "setCount" integer DEFAULT 2 NOT NULL,
    "baseWorkoutId" integer,
    "baseWorkoutRecommendedRepetitionId" integer,
    "gymId" integer,
    "programId" integer,
    "programStepId" integer,
    "programStepActivityId" integer,
    "programStepActivityWorkingsessionId" integer,
    "programStepActivityWorkingsessionWorkoutId" integer,
    "ownerUserId" integer,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone
);


ALTER TABLE public.program_workout_recommended_repetition OWNER TO postgres;

--
-- TOC entry 373 (class 1259 OID 20510)
-- Name: social_advertisement; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.social_advertisement (
    id integer NOT NULL,
    "videoUrl" character varying,
    "imageUrl" character varying,
    action public.social_advertisement_action_enum,
    "actionLink" character varying,
    "actionProgramId" integer,
    "actionGymId" integer,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone
);


ALTER TABLE public.social_advertisement OWNER TO postgres;

--
-- TOC entry 374 (class 1259 OID 20516)
-- Name: social_advertisement_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.social_advertisement_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.social_advertisement_id_seq OWNER TO postgres;

--
-- TOC entry 5437 (class 0 OID 0)
-- Dependencies: 374
-- Name: social_advertisement_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.social_advertisement_id_seq OWNED BY public.social_advertisement.id;


--
-- TOC entry 375 (class 1259 OID 20517)
-- Name: social_affiliate_link; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.social_affiliate_link (
    id integer NOT NULL,
    "generatedLink" character varying NOT NULL,
    "affiliateProgramIdId" integer NOT NULL,
    "ownerUserId" integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone
);


ALTER TABLE public.social_affiliate_link OWNER TO postgres;

--
-- TOC entry 376 (class 1259 OID 20523)
-- Name: social_affiliate_link_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.social_affiliate_link_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.social_affiliate_link_id_seq OWNER TO postgres;

--
-- TOC entry 5438 (class 0 OID 0)
-- Dependencies: 376
-- Name: social_affiliate_link_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.social_affiliate_link_id_seq OWNED BY public.social_affiliate_link.id;


--
-- TOC entry 377 (class 1259 OID 20524)
-- Name: social_affiliate_program; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.social_affiliate_program (
    id integer NOT NULL,
    "commissionRate" numeric(5,2) NOT NULL,
    description character varying,
    "programId" integer DEFAULT 0,
    "programActivityId" integer DEFAULT 0,
    "programActivityWorkingsessionId" integer DEFAULT 0,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone
);


ALTER TABLE public.social_affiliate_program OWNER TO postgres;

--
-- TOC entry 378 (class 1259 OID 20533)
-- Name: social_affiliate_program_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.social_affiliate_program_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.social_affiliate_program_id_seq OWNER TO postgres;

--
-- TOC entry 5439 (class 0 OID 0)
-- Dependencies: 378
-- Name: social_affiliate_program_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.social_affiliate_program_id_seq OWNED BY public.social_affiliate_program.id;


--
-- TOC entry 379 (class 1259 OID 20534)
-- Name: social_affiliate_sale; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.social_affiliate_sale (
    id integer NOT NULL,
    "saleAmount" numeric(10,2) NOT NULL,
    "commissionEarned" numeric(10,2) NOT NULL,
    "affiliateLinkId" integer,
    "createdDate" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone
);


ALTER TABLE public.social_affiliate_sale OWNER TO postgres;

--
-- TOC entry 380 (class 1259 OID 20538)
-- Name: social_affiliate_sale_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.social_affiliate_sale_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.social_affiliate_sale_id_seq OWNER TO postgres;

--
-- TOC entry 5440 (class 0 OID 0)
-- Dependencies: 380
-- Name: social_affiliate_sale_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.social_affiliate_sale_id_seq OWNED BY public.social_affiliate_sale.id;


--
-- TOC entry 381 (class 1259 OID 20539)
-- Name: social_chat; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.social_chat (
    id bigint NOT NULL,
    "heyUserId" integer NOT NULL,
    "hiUserId" integer NOT NULL,
    "dateStarted" timestamp without time zone DEFAULT now()
);


ALTER TABLE public.social_chat OWNER TO postgres;

--
-- TOC entry 382 (class 1259 OID 20543)
-- Name: social_chat_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.social_chat_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.social_chat_id_seq OWNER TO postgres;

--
-- TOC entry 5441 (class 0 OID 0)
-- Dependencies: 382
-- Name: social_chat_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.social_chat_id_seq OWNED BY public.social_chat.id;


--
-- TOC entry 383 (class 1259 OID 20544)
-- Name: social_chat_message; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.social_chat_message (
    id bigint NOT NULL,
    "chatId" bigint NOT NULL,
    "sentDate" timestamp without time zone,
    "senderUserId" integer NOT NULL,
    auto integer DEFAULT 0,
    "messageTextId" bigint DEFAULT 0 NOT NULL
);


ALTER TABLE public.social_chat_message OWNER TO postgres;

--
-- TOC entry 5442 (class 0 OID 0)
-- Dependencies: 383
-- Name: TABLE social_chat_message; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.social_chat_message IS 'auto=1 missed audio call
auto=2 missed video call
auto=3 sender deleted message (last message text == null)';


--
-- TOC entry 384 (class 1259 OID 20549)
-- Name: social_chat_message_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.social_chat_message_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.social_chat_message_id_seq OWNER TO postgres;

--
-- TOC entry 5443 (class 0 OID 0)
-- Dependencies: 384
-- Name: social_chat_message_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.social_chat_message_id_seq OWNED BY public.social_chat_message.id;


--
-- TOC entry 385 (class 1259 OID 20550)
-- Name: social_chat_message_text; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.social_chat_message_text (
    id bigint NOT NULL,
    text text,
    "sentDate" timestamp without time zone DEFAULT now()
);


ALTER TABLE public.social_chat_message_text OWNER TO postgres;

--
-- TOC entry 386 (class 1259 OID 20556)
-- Name: social_chat_message_text_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.social_chat_message_text_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.social_chat_message_text_id_seq OWNER TO postgres;

--
-- TOC entry 5444 (class 0 OID 0)
-- Dependencies: 386
-- Name: social_chat_message_text_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.social_chat_message_text_id_seq OWNED BY public.social_chat_message_text.id;


--
-- TOC entry 387 (class 1259 OID 20557)
-- Name: social_news; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.social_news (
    id integer NOT NULL,
    title character varying,
    "userId" integer,
    text integer,
    "mediaUrls" character varying,
    "createdDate" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone
);


ALTER TABLE public.social_news OWNER TO postgres;

--
-- TOC entry 388 (class 1259 OID 20563)
-- Name: social_news_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.social_news_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.social_news_id_seq OWNER TO postgres;

--
-- TOC entry 5445 (class 0 OID 0)
-- Dependencies: 388
-- Name: social_news_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.social_news_id_seq OWNED BY public.social_news.id;


--
-- TOC entry 389 (class 1259 OID 20564)
-- Name: social_notification; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.social_notification (
    id integer NOT NULL,
    message character varying NOT NULL,
    "isRead" boolean DEFAULT false NOT NULL,
    "userId" integer NOT NULL,
    type public.social_notification_type_enum NOT NULL,
    "isClicked" boolean DEFAULT false NOT NULL,
    "isPushed" boolean DEFAULT false NOT NULL,
    "readDate" timestamp without time zone,
    "pushedDate" timestamp without time zone,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone
);


ALTER TABLE public.social_notification OWNER TO postgres;

--
-- TOC entry 390 (class 1259 OID 20573)
-- Name: social_notification_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.social_notification_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.social_notification_id_seq OWNER TO postgres;

--
-- TOC entry 5446 (class 0 OID 0)
-- Dependencies: 390
-- Name: social_notification_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.social_notification_id_seq OWNED BY public.social_notification.id;


--
-- TOC entry 391 (class 1259 OID 20574)
-- Name: social_review; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.social_review (
    id integer NOT NULL,
    rating integer NOT NULL,
    comment character varying,
    "itemType" public.social_review_item_type_enum NOT NULL,
    "itemId" integer NOT NULL,
    "userId" integer NOT NULL,
    "easeOfUse" integer,
    effectiveness integer,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone
);


ALTER TABLE public.social_review OWNER TO postgres;

--
-- TOC entry 392 (class 1259 OID 20580)
-- Name: social_review_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.social_review_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.social_review_id_seq OWNER TO postgres;

--
-- TOC entry 5447 (class 0 OID 0)
-- Dependencies: 392
-- Name: social_review_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.social_review_id_seq OWNED BY public.social_review.id;


--
-- TOC entry 393 (class 1259 OID 20581)
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    email character varying NOT NULL,
    "firstName" character varying,
    "lastName" character varying,
    "phoneNumber" character varying,
    "birthDate" timestamp without time zone DEFAULT now(),
    "passwordHash" character varying NOT NULL,
    "profileImageUrl" character varying,
    "isEmailVerified" boolean DEFAULT false NOT NULL,
    "verificationToken" boolean,
    "resetPasswordToken" boolean,
    "lastLogin" timestamp without time zone DEFAULT now() NOT NULL,
    "userProfile" public.user_profile_type_enum[] DEFAULT '{attendee}'::public.user_profile_type_enum[],
    "coverImageUrl" character varying,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- TOC entry 394 (class 1259 OID 20591)
-- Name: user_body_param; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_body_param (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "bodyParamId" integer NOT NULL,
    "paramValue" double precision NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone
);


ALTER TABLE public.user_body_param OWNER TO postgres;

--
-- TOC entry 395 (class 1259 OID 20595)
-- Name: user_bookmark_and_favorite; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_bookmark_and_favorite (
    id integer NOT NULL,
    "bookmarkType" public.user_bookmark_and_favorite_item_type_enum,
    "isBookMark" boolean,
    "isFavorite" boolean,
    "itemId" integer,
    "userId" integer NOT NULL,
    "createdAt" timestamp without time zone
);


ALTER TABLE public.user_bookmark_and_favorite OWNER TO postgres;

--
-- TOC entry 396 (class 1259 OID 20598)
-- Name: user_bookmark_and_favorite_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_bookmark_and_favorite_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_bookmark_and_favorite_id_seq OWNER TO postgres;

--
-- TOC entry 5448 (class 0 OID 0)
-- Dependencies: 396
-- Name: user_bookmark_and_favorite_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_bookmark_and_favorite_id_seq OWNED BY public.user_bookmark_and_favorite.id;


--
-- TOC entry 397 (class 1259 OID 20599)
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_id_seq OWNER TO postgres;

--
-- TOC entry 5449 (class 0 OID 0)
-- Dependencies: 397
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- TOC entry 398 (class 1259 OID 20600)
-- Name: user_program_evolution_event; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_program_evolution_event (
    id integer NOT NULL,
    event public.program_evolution_event_type_enum NOT NULL,
    "userId" integer NOT NULL,
    "gymId" integer NOT NULL,
    "programItemId" integer NOT NULL,
    "programItem" public.program_item_type_enum NOT NULL,
    "progressionPoints" integer DEFAULT 0 NOT NULL,
    "progressionPercentage" numeric(3,2) DEFAULT 0 NOT NULL,
    "totalrogressionPercentage" numeric(3,2) DEFAULT 0 NOT NULL,
    "totalProgressionPoints" integer DEFAULT 0 NOT NULL,
    quantity integer DEFAULT 0,
    iteration integer DEFAULT 0,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone
);


ALTER TABLE public.user_program_evolution_event OWNER TO postgres;

--
-- TOC entry 399 (class 1259 OID 20610)
-- Name: user_recommendation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_recommendation (
    id integer NOT NULL,
    "recommenderUserId" integer NOT NULL,
    "recommendedManagerUserId" integer NOT NULL,
    "recommendeeUserId" integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone
);


ALTER TABLE public.user_recommendation OWNER TO postgres;

--
-- TOC entry 400 (class 1259 OID 20614)
-- Name: user_recommendation_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_recommendation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_recommendation_id_seq OWNER TO postgres;

--
-- TOC entry 5450 (class 0 OID 0)
-- Dependencies: 400
-- Name: user_recommendation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_recommendation_id_seq OWNED BY public.user_recommendation.id;


--
-- TOC entry 401 (class 1259 OID 20615)
-- Name: user_subscription_plan; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_subscription_plan (
    id integer NOT NULL,
    "itemId" integer NOT NULL,
    status public.base_subscription_plan_status_enum NOT NULL,
    item public.base_subscription_plan_item_enum,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone
);


ALTER TABLE public.user_subscription_plan OWNER TO postgres;

--
-- TOC entry 402 (class 1259 OID 20619)
-- Name: user_subscription_plan_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_subscription_plan_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_subscription_plan_id_seq OWNER TO postgres;

--
-- TOC entry 5451 (class 0 OID 0)
-- Dependencies: 402
-- Name: user_subscription_plan_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_subscription_plan_id_seq OWNED BY public.user_subscription_plan.id;


--
-- TOC entry 4843 (class 2604 OID 20620)
-- Name: base_app_update id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.base_app_update ALTER COLUMN id SET DEFAULT nextval('public.base_app_update_id_seq'::regclass);


--
-- TOC entry 4844 (class 2604 OID 20621)
-- Name: base_body_param id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.base_body_param ALTER COLUMN id SET DEFAULT nextval('public.base_body_param_id_seq'::regclass);


--
-- TOC entry 4846 (class 2604 OID 20622)
-- Name: base_food id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.base_food ALTER COLUMN id SET DEFAULT nextval('public.base_food_id_seq'::regclass);


--
-- TOC entry 4850 (class 2604 OID 20623)
-- Name: base_food_nutrients id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.base_food_nutrients ALTER COLUMN id SET DEFAULT nextval('public.base_food_nutrients_id_seq'::regclass);


--
-- TOC entry 4859 (class 2604 OID 20624)
-- Name: base_meal id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.base_meal ALTER COLUMN id SET DEFAULT nextval('public.base_meal_id_seq'::regclass);


--
-- TOC entry 4863 (class 2604 OID 20625)
-- Name: base_meal_food id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.base_meal_food ALTER COLUMN id SET DEFAULT nextval('public.base_meal_food_id_seq'::regclass);


--
-- TOC entry 4867 (class 2604 OID 20626)
-- Name: base_muscle id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.base_muscle ALTER COLUMN id SET DEFAULT nextval('public.base_muscle_id_seq'::regclass);


--
-- TOC entry 4874 (class 2604 OID 20627)
-- Name: base_program_goal id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.base_program_goal ALTER COLUMN id SET DEFAULT nextval('public.base_program_goal_id_seq'::regclass);


--
-- TOC entry 4875 (class 2604 OID 20628)
-- Name: base_program_sociology id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.base_program_sociology ALTER COLUMN id SET DEFAULT nextval('public.base_program_sociology_id_seq'::regclass);


--
-- TOC entry 4876 (class 2604 OID 20629)
-- Name: base_recipe id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.base_recipe ALTER COLUMN id SET DEFAULT nextval('public.base_recipe_id_seq'::regclass);


--
-- TOC entry 4878 (class 2604 OID 20630)
-- Name: base_unit id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.base_unit ALTER COLUMN id SET DEFAULT nextval('public.base_unit_id_seq'::regclass);


--
-- TOC entry 4881 (class 2604 OID 20631)
-- Name: base_workout id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.base_workout ALTER COLUMN id SET DEFAULT nextval('public.base_workout_category_id_seq'::regclass);


--
-- TOC entry 4888 (class 2604 OID 20632)
-- Name: base_workout_howto_perform_step id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.base_workout_howto_perform_step ALTER COLUMN id SET DEFAULT nextval('public.base_workout_howto_perform_step_id_seq'::regclass);


--
-- TOC entry 4892 (class 2604 OID 20633)
-- Name: base_workout_nutrient_burn id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.base_workout_nutrient_burn ALTER COLUMN id SET DEFAULT nextval('public.base_workout_nutrient_burn_id_seq'::regclass);


--
-- TOC entry 4894 (class 2604 OID 20634)
-- Name: base_workout_recommended_repetition id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.base_workout_recommended_repetition ALTER COLUMN id SET DEFAULT nextval('public.base_workout_recommended_repetition_id_seq'::regclass);


--
-- TOC entry 4900 (class 2604 OID 20635)
-- Name: gym id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gym ALTER COLUMN id SET DEFAULT nextval('public.gym_id_seq'::regclass);


--
-- TOC entry 4902 (class 2604 OID 20636)
-- Name: gym_follower id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gym_follower ALTER COLUMN id SET DEFAULT nextval('public.gym_follower_id_seq'::regclass);


--
-- TOC entry 4905 (class 2604 OID 20637)
-- Name: gym_manager id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gym_manager ALTER COLUMN id SET DEFAULT nextval('public.gym_manager_id_seq'::regclass);


--
-- TOC entry 4907 (class 2604 OID 20638)
-- Name: gym_manager_follower id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gym_manager_follower ALTER COLUMN id SET DEFAULT nextval('public.gym_manager_follower_id_seq'::regclass);


--
-- TOC entry 4909 (class 2604 OID 20639)
-- Name: gym_manager_overview id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gym_manager_overview ALTER COLUMN id SET DEFAULT nextval('public.gym_manager_overview_id_seq'::regclass);


--
-- TOC entry 4912 (class 2604 OID 20640)
-- Name: gym_manager_qualification id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gym_manager_qualification ALTER COLUMN id SET DEFAULT nextval('public.gym_manager_qualification_id_seq'::regclass);


--
-- TOC entry 4917 (class 2604 OID 20641)
-- Name: gym_membership id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gym_membership ALTER COLUMN id SET DEFAULT nextval('public.gym_membership_id_seq'::regclass);


--
-- TOC entry 4922 (class 2604 OID 20642)
-- Name: gym_membership_plan_features id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gym_membership_plan_features ALTER COLUMN id SET DEFAULT nextval('public.gym_membership_plan_features_id_seq'::regclass);


--
-- TOC entry 4924 (class 2604 OID 20643)
-- Name: gym_open_day id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gym_open_day ALTER COLUMN id SET DEFAULT nextval('public.gym_open_day_id_seq'::regclass);


--
-- TOC entry 4928 (class 2604 OID 20644)
-- Name: map id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.map ALTER COLUMN id SET DEFAULT nextval('public.map_id_seq'::regclass);


--
-- TOC entry 4931 (class 2604 OID 20645)
-- Name: payment id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payment ALTER COLUMN id SET DEFAULT nextval('public.payment_id_seq'::regclass);


--
-- TOC entry 4934 (class 2604 OID 20646)
-- Name: payment_transfer id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payment_transfer ALTER COLUMN id SET DEFAULT nextval('public.payment_transfer_id_seq'::regclass);


--
-- TOC entry 4966 (class 2604 OID 20647)
-- Name: program_step_activity_workingsession id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.program_step_activity_workingsession ALTER COLUMN id SET DEFAULT nextval('public.program_step_activity_workingsession_id_seq'::regclass);


--
-- TOC entry 4970 (class 2604 OID 20648)
-- Name: program_step_activity_workingsession_workout id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.program_step_activity_workingsession_workout ALTER COLUMN id SET DEFAULT nextval('public.program_step_activity_workingsession_workout_id_seq'::regclass);


--
-- TOC entry 4972 (class 2604 OID 20649)
-- Name: program_subscription_plan id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.program_subscription_plan ALTER COLUMN id SET DEFAULT nextval('public.program_subscription_plan_id_seq'::regclass);


--
-- TOC entry 4981 (class 2604 OID 20650)
-- Name: social_advertisement id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.social_advertisement ALTER COLUMN id SET DEFAULT nextval('public.social_advertisement_id_seq'::regclass);


--
-- TOC entry 4983 (class 2604 OID 20651)
-- Name: social_affiliate_link id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.social_affiliate_link ALTER COLUMN id SET DEFAULT nextval('public.social_affiliate_link_id_seq'::regclass);


--
-- TOC entry 4985 (class 2604 OID 20652)
-- Name: social_affiliate_program id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.social_affiliate_program ALTER COLUMN id SET DEFAULT nextval('public.social_affiliate_program_id_seq'::regclass);


--
-- TOC entry 4990 (class 2604 OID 20653)
-- Name: social_affiliate_sale id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.social_affiliate_sale ALTER COLUMN id SET DEFAULT nextval('public.social_affiliate_sale_id_seq'::regclass);


--
-- TOC entry 4992 (class 2604 OID 20654)
-- Name: social_chat id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.social_chat ALTER COLUMN id SET DEFAULT nextval('public.social_chat_id_seq'::regclass);


--
-- TOC entry 4994 (class 2604 OID 20655)
-- Name: social_chat_message id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.social_chat_message ALTER COLUMN id SET DEFAULT nextval('public.social_chat_message_id_seq'::regclass);


--
-- TOC entry 4997 (class 2604 OID 20656)
-- Name: social_chat_message_text id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.social_chat_message_text ALTER COLUMN id SET DEFAULT nextval('public.social_chat_message_text_id_seq'::regclass);


--
-- TOC entry 4999 (class 2604 OID 20657)
-- Name: social_news id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.social_news ALTER COLUMN id SET DEFAULT nextval('public.social_news_id_seq'::regclass);


--
-- TOC entry 5001 (class 2604 OID 20658)
-- Name: social_notification id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.social_notification ALTER COLUMN id SET DEFAULT nextval('public.social_notification_id_seq'::regclass);


--
-- TOC entry 5006 (class 2604 OID 20659)
-- Name: social_review id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.social_review ALTER COLUMN id SET DEFAULT nextval('public.social_review_id_seq'::regclass);


--
-- TOC entry 5008 (class 2604 OID 20660)
-- Name: user id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- TOC entry 5015 (class 2604 OID 20661)
-- Name: user_bookmark_and_favorite id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_bookmark_and_favorite ALTER COLUMN id SET DEFAULT nextval('public.user_bookmark_and_favorite_id_seq'::regclass);


--
-- TOC entry 5023 (class 2604 OID 20662)
-- Name: user_recommendation id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_recommendation ALTER COLUMN id SET DEFAULT nextval('public.user_recommendation_id_seq'::regclass);


--
-- TOC entry 5025 (class 2604 OID 20663)
-- Name: user_subscription_plan id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_subscription_plan ALTER COLUMN id SET DEFAULT nextval('public.user_subscription_plan_id_seq'::regclass);


--
-- TOC entry 5140 (class 2606 OID 20665)
-- Name: base_app_update base_app_update_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.base_app_update
    ADD CONSTRAINT base_app_update_pkey PRIMARY KEY (id);


--
-- TOC entry 5142 (class 2606 OID 20667)
-- Name: base_body_param base_body_param_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.base_body_param
    ADD CONSTRAINT base_body_param_pkey PRIMARY KEY (id);


--
-- TOC entry 5146 (class 2606 OID 20669)
-- Name: base_food_group base_food_group_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.base_food_group
    ADD CONSTRAINT base_food_group_pkey PRIMARY KEY (id);


--
-- TOC entry 5144 (class 2606 OID 20671)
-- Name: base_food_nutrients base_food_nutrients_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.base_food_nutrients
    ADD CONSTRAINT base_food_nutrients_pkey PRIMARY KEY (id);


--
-- TOC entry 5150 (class 2606 OID 20673)
-- Name: base_meal_food base_meal_food_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.base_meal_food
    ADD CONSTRAINT base_meal_food_pkey PRIMARY KEY (id);


--
-- TOC entry 5148 (class 2606 OID 20675)
-- Name: base_meal base_meal_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.base_meal
    ADD CONSTRAINT base_meal_pkey PRIMARY KEY (id);


--
-- TOC entry 5152 (class 2606 OID 20677)
-- Name: base_muscle base_muscle_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.base_muscle
    ADD CONSTRAINT base_muscle_pkey PRIMARY KEY (id);


--
-- TOC entry 5154 (class 2606 OID 20679)
-- Name: base_nutrient base_nutrient_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.base_nutrient
    ADD CONSTRAINT base_nutrient_pkey PRIMARY KEY (id);


--
-- TOC entry 5156 (class 2606 OID 20681)
-- Name: base_program_goal base_program_goals_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.base_program_goal
    ADD CONSTRAINT base_program_goals_pkey PRIMARY KEY (id);


--
-- TOC entry 5158 (class 2606 OID 20683)
-- Name: base_program_sociology base_program_sociology_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.base_program_sociology
    ADD CONSTRAINT base_program_sociology_pkey PRIMARY KEY (id);


--
-- TOC entry 5160 (class 2606 OID 20685)
-- Name: base_unit base_unit_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.base_unit
    ADD CONSTRAINT base_unit_pkey PRIMARY KEY (id);


--
-- TOC entry 5162 (class 2606 OID 20687)
-- Name: base_workout base_workout_category_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.base_workout
    ADD CONSTRAINT base_workout_category_pkey PRIMARY KEY (id);


--
-- TOC entry 5164 (class 2606 OID 20689)
-- Name: base_workout_howto_perform_step base_workout_howto_perform_step_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.base_workout_howto_perform_step
    ADD CONSTRAINT base_workout_howto_perform_step_pkey PRIMARY KEY (id);


--
-- TOC entry 5166 (class 2606 OID 20691)
-- Name: base_workout_nutrient_burn base_workout_nutrient_burn_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.base_workout_nutrient_burn
    ADD CONSTRAINT base_workout_nutrient_burn_pkey PRIMARY KEY (id);


--
-- TOC entry 5168 (class 2606 OID 20693)
-- Name: base_workout_recommended_repetition base_workout_recommended_repetition_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.base_workout_recommended_repetition
    ADD CONSTRAINT base_workout_recommended_repetition_pkey PRIMARY KEY (id);


--
-- TOC entry 5172 (class 2606 OID 20695)
-- Name: gym_follower gym_follower_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gym_follower
    ADD CONSTRAINT gym_follower_pkey PRIMARY KEY (id);


--
-- TOC entry 5176 (class 2606 OID 20697)
-- Name: gym_manager_follower gym_manager_follower_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gym_manager_follower
    ADD CONSTRAINT gym_manager_follower_pkey PRIMARY KEY (id);


--
-- TOC entry 5178 (class 2606 OID 20699)
-- Name: gym_manager_overview gym_manager_overview_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gym_manager_overview
    ADD CONSTRAINT gym_manager_overview_pkey PRIMARY KEY (id);


--
-- TOC entry 5174 (class 2606 OID 20701)
-- Name: gym_manager gym_manager_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gym_manager
    ADD CONSTRAINT gym_manager_pkey PRIMARY KEY (id);


--
-- TOC entry 5180 (class 2606 OID 20703)
-- Name: gym_manager_qualification gym_manager_qualification_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gym_manager_qualification
    ADD CONSTRAINT gym_manager_qualification_pkey PRIMARY KEY (id);


--
-- TOC entry 5182 (class 2606 OID 20705)
-- Name: gym_manager_request gym_manager_request_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gym_manager_request
    ADD CONSTRAINT gym_manager_request_pkey PRIMARY KEY (id);


--
-- TOC entry 5184 (class 2606 OID 20707)
-- Name: gym_manager_specialized_in_workout gym_manager_specialized_in_workout_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gym_manager_specialized_in_workout
    ADD CONSTRAINT gym_manager_specialized_in_workout_pkey PRIMARY KEY (id);


--
-- TOC entry 5186 (class 2606 OID 20709)
-- Name: gym_membership gym_membership_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gym_membership
    ADD CONSTRAINT gym_membership_pkey PRIMARY KEY (id);


--
-- TOC entry 5190 (class 2606 OID 20711)
-- Name: gym_membership_plan_features gym_membership_plan_features_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gym_membership_plan_features
    ADD CONSTRAINT gym_membership_plan_features_pkey PRIMARY KEY (id);


--
-- TOC entry 5188 (class 2606 OID 20713)
-- Name: gym_membership_plan gym_membership_plan_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gym_membership_plan
    ADD CONSTRAINT gym_membership_plan_pkey PRIMARY KEY (id);


--
-- TOC entry 5192 (class 2606 OID 20715)
-- Name: gym_open_day gym_open_day_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gym_open_day
    ADD CONSTRAINT gym_open_day_pkey PRIMARY KEY (id);


--
-- TOC entry 5170 (class 2606 OID 20717)
-- Name: gym gym_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gym
    ADD CONSTRAINT gym_pkey PRIMARY KEY (id);


--
-- TOC entry 5194 (class 2606 OID 20719)
-- Name: gym_specialized_in_workout gym_specialized_in_workout_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gym_specialized_in_workout
    ADD CONSTRAINT gym_specialized_in_workout_pkey PRIMARY KEY (id);


--
-- TOC entry 5197 (class 2606 OID 20721)
-- Name: map map_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.map
    ADD CONSTRAINT map_pkey PRIMARY KEY (id);


--
-- TOC entry 5199 (class 2606 OID 20723)
-- Name: payment payment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payment
    ADD CONSTRAINT payment_pkey PRIMARY KEY (id);


--
-- TOC entry 5201 (class 2606 OID 20725)
-- Name: payment_transfer payment_transfer_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payment_transfer
    ADD CONSTRAINT payment_transfer_pkey PRIMARY KEY (id);


--
-- TOC entry 5205 (class 2606 OID 20727)
-- Name: program_activity_content program_activity_content_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.program_activity_content
    ADD CONSTRAINT program_activity_content_pkey PRIMARY KEY (id);


--
-- TOC entry 5207 (class 2606 OID 20729)
-- Name: program_per_sociology program_per_sociology_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.program_per_sociology
    ADD CONSTRAINT program_per_sociology_pkey PRIMARY KEY (id);


--
-- TOC entry 5203 (class 2606 OID 20731)
-- Name: program program_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.program
    ADD CONSTRAINT program_pkey PRIMARY KEY (id);


--
-- TOC entry 5211 (class 2606 OID 20733)
-- Name: program_step_activity program_step_activity_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.program_step_activity
    ADD CONSTRAINT program_step_activity_pkey PRIMARY KEY (id);


--
-- TOC entry 5213 (class 2606 OID 20735)
-- Name: program_step_activity_workingsession_workout program_step_activity_workingsession_workout_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.program_step_activity_workingsession_workout
    ADD CONSTRAINT program_step_activity_workingsession_workout_pkey PRIMARY KEY (id);


--
-- TOC entry 5209 (class 2606 OID 20737)
-- Name: program_step program_step_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.program_step
    ADD CONSTRAINT program_step_pkey PRIMARY KEY (id);


--
-- TOC entry 5215 (class 2606 OID 20739)
-- Name: program_workout_nutrient_burn program_workout_nutrient_burn_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.program_workout_nutrient_burn
    ADD CONSTRAINT program_workout_nutrient_burn_pkey PRIMARY KEY (id);


--
-- TOC entry 5217 (class 2606 OID 20741)
-- Name: program_workout_recommended_repetition program_workout_recommended_repetition_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.program_workout_recommended_repetition
    ADD CONSTRAINT program_workout_recommended_repetition_pkey PRIMARY KEY (id);


--
-- TOC entry 5229 (class 2606 OID 20743)
-- Name: social_review review_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.social_review
    ADD CONSTRAINT review_pkey PRIMARY KEY (id);


--
-- TOC entry 5219 (class 2606 OID 20745)
-- Name: social_advertisement social_advertisement_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.social_advertisement
    ADD CONSTRAINT social_advertisement_pkey PRIMARY KEY (id);


--
-- TOC entry 5221 (class 2606 OID 20747)
-- Name: social_affiliate_link social_affiliate_link_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.social_affiliate_link
    ADD CONSTRAINT social_affiliate_link_pkey PRIMARY KEY (id);


--
-- TOC entry 5225 (class 2606 OID 20749)
-- Name: social_chat_message_text social_chat_message_text_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.social_chat_message_text
    ADD CONSTRAINT social_chat_message_text_pkey PRIMARY KEY (id);


--
-- TOC entry 5223 (class 2606 OID 20751)
-- Name: social_chat social_chat_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.social_chat
    ADD CONSTRAINT social_chat_pkey PRIMARY KEY (id);


--
-- TOC entry 5227 (class 2606 OID 20753)
-- Name: social_news social_news_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.social_news
    ADD CONSTRAINT social_news_pkey PRIMARY KEY (id);


--
-- TOC entry 5235 (class 2606 OID 20755)
-- Name: user_body_param user_body_param_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_body_param
    ADD CONSTRAINT user_body_param_pkey PRIMARY KEY (id);


--
-- TOC entry 5237 (class 2606 OID 20757)
-- Name: user_bookmark_and_favorite user_bookmark_and_favorite_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_bookmark_and_favorite
    ADD CONSTRAINT user_bookmark_and_favorite_pkey PRIMARY KEY (id);


--
-- TOC entry 5231 (class 2606 OID 20759)
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- TOC entry 5239 (class 2606 OID 20761)
-- Name: user_program_evolution_event user_program_evolution_event_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_program_evolution_event
    ADD CONSTRAINT user_program_evolution_event_pkey PRIMARY KEY (id);


--
-- TOC entry 5241 (class 2606 OID 20763)
-- Name: user_recommendation user_recommendation_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_recommendation
    ADD CONSTRAINT user_recommendation_pkey PRIMARY KEY (id);


--
-- TOC entry 5233 (class 2606 OID 20765)
-- Name: user user_unique_email; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_unique_email UNIQUE (email);


--
-- TOC entry 5195 (class 1259 OID 20797)
-- Name: idx_map_location; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_map_location ON public.map USING gist (location);


-- Completed on 2025-05-02 22:22:22 UTC

--
-- PostgreSQL database dump complete
--

