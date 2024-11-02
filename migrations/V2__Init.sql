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
-- Name: content_status_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.content_status_enum AS ENUM (
    'pending',
    'approved',
    'rejected'
);


ALTER TYPE public.content_status_enum OWNER TO postgres;

--
-- Name: meal_mealtype_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.meal_mealtype_enum AS ENUM (
    'breakfast',
    'lunch',
    'dinner',
    'snack'
);


ALTER TYPE public.meal_mealtype_enum OWNER TO postgres;

--
-- Name: user_nutrition_progress_mealtype_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.user_nutrition_progress_mealtype_enum AS ENUM (
    'breakfast',
    'lunch',
    'dinner',
    'snack'
);


ALTER TYPE public.user_nutrition_progress_mealtype_enum OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: admin; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.admin (
    id integer NOT NULL,
    "coachId" integer
);


ALTER TABLE public.admin OWNER TO postgres;

--
-- Name: admin_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.admin_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.admin_id_seq OWNER TO postgres;

--
-- Name: admin_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.admin_id_seq OWNED BY public.admin.id;


--
-- Name: admin_transfer; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.admin_transfer (
    id integer NOT NULL,
    amount numeric(10,2) NOT NULL,
    currency character varying NOT NULL,
    "paymentMethod" character varying NOT NULL,
    "stripeTransferId" character varying,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "adminId" integer
);


ALTER TABLE public.admin_transfer OWNER TO postgres;

--
-- Name: admin_transfer_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.admin_transfer_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.admin_transfer_id_seq OWNER TO postgres;

--
-- Name: admin_transfer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.admin_transfer_id_seq OWNED BY public.admin_transfer.id;


--
-- Name: affiliate_link; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.affiliate_link (
    id integer NOT NULL,
    "generatedLink" character varying NOT NULL,
    "creationDate" timestamp without time zone DEFAULT now() NOT NULL,
    "affiliateProgramId" integer,
    "userId" integer
);


ALTER TABLE public.affiliate_link OWNER TO postgres;

--
-- Name: affiliate_link_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.affiliate_link_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.affiliate_link_id_seq OWNER TO postgres;

--
-- Name: affiliate_link_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.affiliate_link_id_seq OWNED BY public.affiliate_link.id;


--
-- Name: affiliate_program; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.affiliate_program (
    id integer NOT NULL,
    "commissionRate" numeric(5,2) NOT NULL,
    "programDescription" character varying,
    "contentId" integer
);


ALTER TABLE public.affiliate_program OWNER TO postgres;

--
-- Name: affiliate_program_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.affiliate_program_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.affiliate_program_id_seq OWNER TO postgres;

--
-- Name: affiliate_program_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.affiliate_program_id_seq OWNED BY public.affiliate_program.id;


--
-- Name: affiliate_sale; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.affiliate_sale (
    id integer NOT NULL,
    "saleAmount" numeric(10,2) NOT NULL,
    "commissionEarned" numeric(10,2) NOT NULL,
    "saleDate" timestamp without time zone DEFAULT now() NOT NULL,
    "affiliateLinkId" integer
);


ALTER TABLE public.affiliate_sale OWNER TO postgres;

--
-- Name: affiliate_sale_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.affiliate_sale_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.affiliate_sale_id_seq OWNER TO postgres;

--
-- Name: affiliate_sale_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.affiliate_sale_id_seq OWNED BY public.affiliate_sale.id;


--
-- Name: body_measurement; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.body_measurement (
    id integer NOT NULL,
    "dateRecorded" date DEFAULT now() NOT NULL,
    weight numeric(5,2),
    height numeric(5,2),
    "bodyFatPercentage" numeric(4,2),
    "muscleMass" numeric(5,2),
    macros json,
    "userId" integer
);


ALTER TABLE public.body_measurement OWNER TO postgres;

--
-- Name: body_measurement_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.body_measurement_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.body_measurement_id_seq OWNER TO postgres;

--
-- Name: body_measurement_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.body_measurement_id_seq OWNED BY public.body_measurement.id;


--
-- Name: category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.category (
    id integer NOT NULL,
    "categoryName" character varying NOT NULL,
    "categoryDescription" character varying
);


ALTER TABLE public.category OWNER TO postgres;

--
-- Name: category_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.category_id_seq OWNER TO postgres;

--
-- Name: category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.category_id_seq OWNED BY public.category.id;


--
-- Name: challenge; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.challenge (
    id integer NOT NULL,
    "challengeDescription" character varying,
    "startDate" date,
    "endDate" date,
    type character varying,
    "imageUrl" character varying,
    tags json,
    "contentId" integer,
    "coachId" integer
);


ALTER TABLE public.challenge OWNER TO postgres;

--
-- Name: challenge_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.challenge_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.challenge_id_seq OWNER TO postgres;

--
-- Name: challenge_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.challenge_id_seq OWNED BY public.challenge.id;


--
-- Name: coach; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.coach (
    id integer NOT NULL,
    bio character varying,
    "ratingAvg" double precision DEFAULT '0'::double precision NOT NULL,
    "stripeAccountId" character varying,
    type character varying DEFAULT 'fitness_trainer'::character varying NOT NULL,
    "coverImageUrl" character varying,
    "userId" integer,
    "managerId" integer
);


ALTER TABLE public.coach OWNER TO postgres;

--
-- Name: coach_follow; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.coach_follow (
    id integer NOT NULL,
    "followDate" date NOT NULL,
    "userId" integer,
    "coachId" integer
);


ALTER TABLE public.coach_follow OWNER TO postgres;

--
-- Name: coach_follow_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.coach_follow_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.coach_follow_id_seq OWNER TO postgres;

--
-- Name: coach_follow_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.coach_follow_id_seq OWNED BY public.coach_follow.id;


--
-- Name: coach_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.coach_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.coach_id_seq OWNER TO postgres;

--
-- Name: coach_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.coach_id_seq OWNED BY public.coach.id;


--
-- Name: coach_qualification; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.coach_qualification (
    id integer NOT NULL,
    "qualificationName" character varying NOT NULL,
    "institutionName" character varying,
    "yearObtained" integer,
    "imageUrl" character varying,
    "coachId" integer
);


ALTER TABLE public.coach_qualification OWNER TO postgres;

--
-- Name: coach_qualification_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.coach_qualification_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.coach_qualification_id_seq OWNER TO postgres;

--
-- Name: coach_qualification_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.coach_qualification_id_seq OWNED BY public.coach_qualification.id;


--
-- Name: coach_rating; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.coach_rating (
    id integer NOT NULL,
    rating integer NOT NULL,
    comment character varying,
    "ratingDate" timestamp without time zone DEFAULT now() NOT NULL,
    "userId" integer,
    "coachId" integer
);


ALTER TABLE public.coach_rating OWNER TO postgres;

--
-- Name: coach_rating_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.coach_rating_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.coach_rating_id_seq OWNER TO postgres;

--
-- Name: coach_rating_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.coach_rating_id_seq OWNED BY public.coach_rating.id;


--
-- Name: coach_specialization; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.coach_specialization (
    id integer NOT NULL,
    specialization character varying NOT NULL,
    description character varying,
    "coachId" integer
);


ALTER TABLE public.coach_specialization OWNER TO postgres;

--
-- Name: coach_specialization_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.coach_specialization_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.coach_specialization_id_seq OWNER TO postgres;

--
-- Name: coach_specialization_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.coach_specialization_id_seq OWNED BY public.coach_specialization.id;


--
-- Name: coach_transfer; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.coach_transfer (
    id integer NOT NULL,
    amount numeric(10,2) NOT NULL,
    currency character varying NOT NULL,
    "paymentMethod" character varying NOT NULL,
    "stripeTransferId" character varying,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "coachId" integer
);


ALTER TABLE public.coach_transfer OWNER TO postgres;

--
-- Name: coach_transfer_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.coach_transfer_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.coach_transfer_id_seq OWNER TO postgres;

--
-- Name: coach_transfer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.coach_transfer_id_seq OWNED BY public.coach_transfer.id;


--
-- Name: content; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.content (
    id integer NOT NULL,
    title character varying NOT NULL,
    description character varying,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    price double precision DEFAULT '0'::double precision NOT NULL,
    "isPaid" boolean NOT NULL,
    "isBookmarked" boolean,
    tags json,
    "imageUrl" character varying,
    "videoUrl" character varying,
    "goalSpecifics" character varying,
    "averageRating" double precision DEFAULT '0'::double precision NOT NULL,
    "numberOfRatings" integer DEFAULT 0 NOT NULL,
    "contentType" character varying,
    status public.content_status_enum DEFAULT 'pending'::public.content_status_enum NOT NULL,
    "statusReason" character varying,
    "coachId" integer,
    "categoryId" integer
);


ALTER TABLE public.content OWNER TO postgres;

--
-- Name: content_goals_fitness_goal; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.content_goals_fitness_goal (
    "contentId" integer NOT NULL,
    "fitnessGoalId" integer NOT NULL
);


ALTER TABLE public.content_goals_fitness_goal OWNER TO postgres;

--
-- Name: content_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.content_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.content_id_seq OWNER TO postgres;

--
-- Name: content_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.content_id_seq OWNED BY public.content.id;


--
-- Name: content_rating; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.content_rating (
    id integer NOT NULL,
    rating integer NOT NULL,
    comment character varying,
    "ratingDate" timestamp without time zone DEFAULT now() NOT NULL,
    "easeOfUse" integer,
    effectiveness integer,
    "userId" integer,
    "contentId" integer
);


ALTER TABLE public.content_rating OWNER TO postgres;

--
-- Name: content_rating_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.content_rating_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.content_rating_id_seq OWNER TO postgres;

--
-- Name: content_rating_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.content_rating_id_seq OWNED BY public.content_rating.id;


--
-- Name: content_review; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.content_review (
    id integer NOT NULL,
    rating integer,
    "reviewText" character varying,
    "reviewDate" timestamp without time zone DEFAULT now() NOT NULL,
    "userId" integer,
    "contentId" integer
);


ALTER TABLE public.content_review OWNER TO postgres;

--
-- Name: content_review_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.content_review_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.content_review_id_seq OWNER TO postgres;

--
-- Name: content_review_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.content_review_id_seq OWNED BY public.content_review.id;


--
-- Name: employee; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.employee (
    id integer NOT NULL,
    "userId" integer,
    "createById" integer
);


ALTER TABLE public.employee OWNER TO postgres;

--
-- Name: employee_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.employee_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.employee_id_seq OWNER TO postgres;

--
-- Name: employee_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.employee_id_seq OWNED BY public.employee.id;


--
-- Name: exercise; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.exercise (
    id integer NOT NULL,
    title character varying NOT NULL,
    description character varying,
    "videoUrl" character varying,
    duration integer,
    "goalSpecifics" character varying,
    "contentId" integer
);


ALTER TABLE public.exercise OWNER TO postgres;

--
-- Name: exercise_goals_fitness_goal; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.exercise_goals_fitness_goal (
    "exerciseId" integer NOT NULL,
    "fitnessGoalId" integer NOT NULL
);


ALTER TABLE public.exercise_goals_fitness_goal OWNER TO postgres;

--
-- Name: exercise_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.exercise_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.exercise_id_seq OWNER TO postgres;

--
-- Name: exercise_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.exercise_id_seq OWNED BY public.exercise.id;


--
-- Name: fitness_goal; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.fitness_goal (
    id integer NOT NULL,
    "goalDescription" character varying NOT NULL,
    "targetDate" timestamp without time zone,
    status character varying NOT NULL,
    "userId" integer
);


ALTER TABLE public.fitness_goal OWNER TO postgres;

--
-- Name: fitness_goal_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.fitness_goal_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.fitness_goal_id_seq OWNER TO postgres;

--
-- Name: fitness_goal_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.fitness_goal_id_seq OWNED BY public.fitness_goal.id;


--
-- Name: food; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.food (
    id integer NOT NULL,
    name character varying NOT NULL,
    description character varying,
    calories integer,
    protein integer,
    carbs integer,
    fat integer
);


ALTER TABLE public.food OWNER TO postgres;

--
-- Name: food_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.food_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.food_id_seq OWNER TO postgres;

--
-- Name: food_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.food_id_seq OWNED BY public.food.id;


--
-- Name: meal; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.meal (
    id integer NOT NULL,
    "mealType" public.meal_mealtype_enum NOT NULL,
    date date NOT NULL
);


ALTER TABLE public.meal OWNER TO postgres;

--
-- Name: meal_foods_food; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.meal_foods_food (
    "mealId" integer NOT NULL,
    "foodId" integer NOT NULL
);


ALTER TABLE public.meal_foods_food OWNER TO postgres;

--
-- Name: meal_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.meal_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.meal_id_seq OWNER TO postgres;

--
-- Name: meal_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.meal_id_seq OWNED BY public.meal.id;


--
-- Name: meal_recipes_recipe; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.meal_recipes_recipe (
    "mealId" integer NOT NULL,
    "recipeId" integer NOT NULL
);


ALTER TABLE public.meal_recipes_recipe OWNER TO postgres;

--
-- Name: news; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.news (
    id integer NOT NULL,
    title character varying,
    "publishedDate" timestamp without time zone DEFAULT now() NOT NULL,
    "coachId" integer,
    "contentId" integer
);


ALTER TABLE public.news OWNER TO postgres;

--
-- Name: news_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.news_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.news_id_seq OWNER TO postgres;

--
-- Name: news_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.news_id_seq OWNED BY public.news.id;


--
-- Name: notification; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.notification (
    id integer NOT NULL,
    message character varying NOT NULL,
    "isRead" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "userId" integer
);


ALTER TABLE public.notification OWNER TO postgres;

--
-- Name: notification_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.notification_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.notification_id_seq OWNER TO postgres;

--
-- Name: notification_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.notification_id_seq OWNED BY public.notification.id;


--
-- Name: nutrition_detail; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.nutrition_detail (
    id integer NOT NULL,
    "mealType" character varying NOT NULL,
    ingredients character varying,
    preparation character varying,
    calories integer,
    proteins double precision,
    carbs double precision,
    fats double precision,
    "nutritionProgramId" integer
);


ALTER TABLE public.nutrition_detail OWNER TO postgres;

--
-- Name: nutrition_detail_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.nutrition_detail_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.nutrition_detail_id_seq OWNER TO postgres;

--
-- Name: nutrition_detail_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.nutrition_detail_id_seq OWNED BY public.nutrition_detail.id;


--
-- Name: nutrition_program; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.nutrition_program (
    id integer NOT NULL,
    title character varying NOT NULL,
    description character varying,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "coachId" integer
);


ALTER TABLE public.nutrition_program OWNER TO postgres;

--
-- Name: nutrition_program_contents_content; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.nutrition_program_contents_content (
    "nutritionProgramId" integer NOT NULL,
    "contentId" integer NOT NULL
);


ALTER TABLE public.nutrition_program_contents_content OWNER TO postgres;

--
-- Name: nutrition_program_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.nutrition_program_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.nutrition_program_id_seq OWNER TO postgres;

--
-- Name: nutrition_program_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.nutrition_program_id_seq OWNED BY public.nutrition_program.id;


--
-- Name: nutrition_program_review; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.nutrition_program_review (
    id integer NOT NULL,
    rating integer NOT NULL,
    "reviewText" character varying,
    "reviewDate" timestamp without time zone DEFAULT now() NOT NULL,
    "userId" integer,
    "nutritionProgramId" integer
);


ALTER TABLE public.nutrition_program_review OWNER TO postgres;

--
-- Name: nutrition_program_review_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.nutrition_program_review_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.nutrition_program_review_id_seq OWNER TO postgres;

--
-- Name: nutrition_program_review_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.nutrition_program_review_id_seq OWNED BY public.nutrition_program_review.id;


--
-- Name: payment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.payment (
    id integer NOT NULL,
    "amountPaid" numeric(10,2) NOT NULL,
    "paymentDate" timestamp without time zone DEFAULT now() NOT NULL,
    "paymentMethod" character varying,
    currency character varying NOT NULL,
    secret character varying NOT NULL,
    "intentId" character varying NOT NULL,
    "userId" integer
);


ALTER TABLE public.payment OWNER TO postgres;

--
-- Name: payment_contents_content; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.payment_contents_content (
    "paymentId" integer NOT NULL,
    "contentId" integer NOT NULL
);


ALTER TABLE public.payment_contents_content OWNER TO postgres;

--
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
-- Name: payment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.payment_id_seq OWNED BY public.payment.id;


--
-- Name: performance_record; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.performance_record (
    id integer NOT NULL,
    "performanceDescription" character varying,
    "dateRecorded" date NOT NULL,
    "userProgramId" integer
);


ALTER TABLE public.performance_record OWNER TO postgres;

--
-- Name: performance_record_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.performance_record_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.performance_record_id_seq OWNER TO postgres;

--
-- Name: performance_record_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.performance_record_id_seq OWNED BY public.performance_record.id;


--
-- Name: private_discussion; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.private_discussion (
    id integer NOT NULL,
    message character varying,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "userId" integer,
    "coachId" integer
);


ALTER TABLE public.private_discussion OWNER TO postgres;

--
-- Name: private_discussion_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.private_discussion_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.private_discussion_id_seq OWNER TO postgres;

--
-- Name: private_discussion_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.private_discussion_id_seq OWNED BY public.private_discussion.id;


--
-- Name: progress; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.progress (
    id integer NOT NULL,
    "isCompleted" boolean DEFAULT false NOT NULL,
    "completedAt" timestamp without time zone DEFAULT now() NOT NULL,
    "userId" integer,
    "exerciseId" integer
);


ALTER TABLE public.progress OWNER TO postgres;

--
-- Name: progress_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.progress_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.progress_id_seq OWNER TO postgres;

--
-- Name: progress_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.progress_id_seq OWNED BY public.progress.id;


--
-- Name: recipe; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.recipe (
    id integer NOT NULL,
    name character varying NOT NULL,
    description character varying,
    instructions character varying,
    "imageUrl" character varying,
    calories integer,
    protein integer,
    carbs integer,
    fat integer
);


ALTER TABLE public.recipe OWNER TO postgres;

--
-- Name: recipe_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.recipe_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.recipe_id_seq OWNER TO postgres;

--
-- Name: recipe_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.recipe_id_seq OWNED BY public.recipe.id;


--
-- Name: recommendation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.recommendation (
    id integer NOT NULL,
    "recommendationDate" timestamp without time zone DEFAULT now() NOT NULL,
    "recommenderId" integer,
    "recommendedCoachId" integer,
    "recommendedToUserId" integer
);


ALTER TABLE public.recommendation OWNER TO postgres;

--
-- Name: recommendation_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.recommendation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.recommendation_id_seq OWNER TO postgres;

--
-- Name: recommendation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.recommendation_id_seq OWNED BY public.recommendation.id;


--
-- Name: session; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.session (
    id integer NOT NULL,
    "sessionTime" timestamp without time zone DEFAULT now() NOT NULL,
    location character varying,
    "maxParticipants" integer,
    type character varying,
    duration integer DEFAULT 5 NOT NULL,
    "caloriesToburn" integer DEFAULT 0 NOT NULL,
    "contentId" integer,
    "coachId" integer,
    "challengeId" integer
);


ALTER TABLE public.session OWNER TO postgres;

--
-- Name: session_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.session_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.session_id_seq OWNER TO postgres;

--
-- Name: session_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.session_id_seq OWNED BY public.session.id;


--
-- Name: session_review; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.session_review (
    id integer NOT NULL,
    rating integer NOT NULL,
    "reviewText" character varying,
    "reviewDate" timestamp without time zone DEFAULT now() NOT NULL,
    "userId" integer,
    "sessionId" integer
);


ALTER TABLE public.session_review OWNER TO postgres;

--
-- Name: session_review_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.session_review_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.session_review_id_seq OWNER TO postgres;

--
-- Name: session_review_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.session_review_id_seq OWNED BY public.session_review.id;


--
-- Name: stage; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.stage (
    id integer NOT NULL,
    title character varying,
    description character varying,
    "orderIndex" integer,
    "contentId" integer
);


ALTER TABLE public.stage OWNER TO postgres;

--
-- Name: stage_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.stage_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.stage_id_seq OWNER TO postgres;

--
-- Name: stage_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.stage_id_seq OWNED BY public.stage.id;


--
-- Name: subscription_plan; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.subscription_plan (
    id integer NOT NULL,
    "planName" character varying NOT NULL,
    price numeric(10,2) NOT NULL,
    "durationDays" integer NOT NULL,
    "durationType" character varying
);


ALTER TABLE public.subscription_plan OWNER TO postgres;

--
-- Name: subscription_plan_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.subscription_plan_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.subscription_plan_id_seq OWNER TO postgres;

--
-- Name: subscription_plan_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.subscription_plan_id_seq OWNED BY public.subscription_plan.id;


--
-- Name: training_content_link; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.training_content_link (
    id integer NOT NULL,
    "sessionId" integer,
    "contentId" integer
);


ALTER TABLE public.training_content_link OWNER TO postgres;

--
-- Name: training_content_link_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.training_content_link_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.training_content_link_id_seq OWNER TO postgres;

--
-- Name: training_content_link_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.training_content_link_id_seq OWNED BY public.training_content_link.id;


--
-- Name: training_session; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.training_session (
    id integer NOT NULL,
    attended boolean DEFAULT false NOT NULL,
    "attendanceDate" timestamp without time zone DEFAULT now() NOT NULL,
    "userId" integer,
    "sessionId" integer
);


ALTER TABLE public.training_session OWNER TO postgres;

--
-- Name: training_session_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.training_session_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.training_session_id_seq OWNER TO postgres;

--
-- Name: training_session_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.training_session_id_seq OWNED BY public.training_session.id;


--
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
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "lastLogin" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- Name: user_challenge; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_challenge (
    id integer NOT NULL,
    "startDate" timestamp without time zone DEFAULT now() NOT NULL,
    "userId" integer,
    "challengeId" integer
);


ALTER TABLE public.user_challenge OWNER TO postgres;

--
-- Name: user_challenge_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_challenge_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_challenge_id_seq OWNER TO postgres;

--
-- Name: user_challenge_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_challenge_id_seq OWNED BY public.user_challenge.id;


--
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
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- Name: user_nutrition; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_nutrition (
    id integer NOT NULL,
    "startDate" timestamp without time zone DEFAULT now() NOT NULL,
    "adherencePercentage" double precision DEFAULT '100'::double precision NOT NULL,
    "userId" integer,
    "nutritionProgramId" integer
);


ALTER TABLE public.user_nutrition OWNER TO postgres;

--
-- Name: user_nutrition_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_nutrition_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_nutrition_id_seq OWNER TO postgres;

--
-- Name: user_nutrition_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_nutrition_id_seq OWNED BY public.user_nutrition.id;


--
-- Name: user_nutrition_progress; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_nutrition_progress (
    id integer NOT NULL,
    "dateLogged" date NOT NULL,
    "mealsConsumed" json,
    "caloriesIntake" integer,
    "proteinIntake" double precision,
    "carbsIntake" double precision,
    "fatsIntake" double precision,
    "adherenceScore" double precision,
    "mealType" public.user_nutrition_progress_mealtype_enum DEFAULT 'breakfast'::public.user_nutrition_progress_mealtype_enum NOT NULL,
    "userId" integer,
    "nutritionProgramId" integer
);


ALTER TABLE public.user_nutrition_progress OWNER TO postgres;

--
-- Name: user_nutrition_progress_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_nutrition_progress_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_nutrition_progress_id_seq OWNER TO postgres;

--
-- Name: user_nutrition_progress_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_nutrition_progress_id_seq OWNED BY public.user_nutrition_progress.id;


--
-- Name: user_program; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_program (
    id integer NOT NULL,
    "startDate" date,
    "endDate" date,
    "programStatus" character varying NOT NULL,
    "userId" integer,
    "contentId" integer
);


ALTER TABLE public.user_program OWNER TO postgres;

--
-- Name: user_program_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_program_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_program_id_seq OWNER TO postgres;

--
-- Name: user_program_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_program_id_seq OWNED BY public.user_program.id;


--
-- Name: user_subscription; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_subscription (
    id integer NOT NULL,
    "startDate" timestamp without time zone DEFAULT now() NOT NULL,
    "endDate" timestamp without time zone DEFAULT now() NOT NULL,
    "userId" integer,
    "subscriptionPlanId" integer
);


ALTER TABLE public.user_subscription OWNER TO postgres;

--
-- Name: user_subscription_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_subscription_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_subscription_id_seq OWNER TO postgres;

--
-- Name: user_subscription_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_subscription_id_seq OWNED BY public.user_subscription.id;


--
-- Name: admin id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin ALTER COLUMN id SET DEFAULT nextval('public.admin_id_seq'::regclass);


--
-- Name: admin_transfer id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin_transfer ALTER COLUMN id SET DEFAULT nextval('public.admin_transfer_id_seq'::regclass);


--
-- Name: affiliate_link id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.affiliate_link ALTER COLUMN id SET DEFAULT nextval('public.affiliate_link_id_seq'::regclass);


--
-- Name: affiliate_program id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.affiliate_program ALTER COLUMN id SET DEFAULT nextval('public.affiliate_program_id_seq'::regclass);


--
-- Name: affiliate_sale id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.affiliate_sale ALTER COLUMN id SET DEFAULT nextval('public.affiliate_sale_id_seq'::regclass);


--
-- Name: body_measurement id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.body_measurement ALTER COLUMN id SET DEFAULT nextval('public.body_measurement_id_seq'::regclass);


--
-- Name: category id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category ALTER COLUMN id SET DEFAULT nextval('public.category_id_seq'::regclass);


--
-- Name: challenge id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.challenge ALTER COLUMN id SET DEFAULT nextval('public.challenge_id_seq'::regclass);


--
-- Name: coach id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coach ALTER COLUMN id SET DEFAULT nextval('public.coach_id_seq'::regclass);


--
-- Name: coach_follow id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coach_follow ALTER COLUMN id SET DEFAULT nextval('public.coach_follow_id_seq'::regclass);


--
-- Name: coach_qualification id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coach_qualification ALTER COLUMN id SET DEFAULT nextval('public.coach_qualification_id_seq'::regclass);


--
-- Name: coach_rating id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coach_rating ALTER COLUMN id SET DEFAULT nextval('public.coach_rating_id_seq'::regclass);


--
-- Name: coach_specialization id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coach_specialization ALTER COLUMN id SET DEFAULT nextval('public.coach_specialization_id_seq'::regclass);


--
-- Name: coach_transfer id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coach_transfer ALTER COLUMN id SET DEFAULT nextval('public.coach_transfer_id_seq'::regclass);


--
-- Name: content id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.content ALTER COLUMN id SET DEFAULT nextval('public.content_id_seq'::regclass);


--
-- Name: content_rating id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.content_rating ALTER COLUMN id SET DEFAULT nextval('public.content_rating_id_seq'::regclass);


--
-- Name: content_review id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.content_review ALTER COLUMN id SET DEFAULT nextval('public.content_review_id_seq'::regclass);


--
-- Name: employee id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employee ALTER COLUMN id SET DEFAULT nextval('public.employee_id_seq'::regclass);


--
-- Name: exercise id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exercise ALTER COLUMN id SET DEFAULT nextval('public.exercise_id_seq'::regclass);


--
-- Name: fitness_goal id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fitness_goal ALTER COLUMN id SET DEFAULT nextval('public.fitness_goal_id_seq'::regclass);


--
-- Name: food id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.food ALTER COLUMN id SET DEFAULT nextval('public.food_id_seq'::regclass);


--
-- Name: meal id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.meal ALTER COLUMN id SET DEFAULT nextval('public.meal_id_seq'::regclass);


--
-- Name: news id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.news ALTER COLUMN id SET DEFAULT nextval('public.news_id_seq'::regclass);


--
-- Name: notification id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notification ALTER COLUMN id SET DEFAULT nextval('public.notification_id_seq'::regclass);


--
-- Name: nutrition_detail id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nutrition_detail ALTER COLUMN id SET DEFAULT nextval('public.nutrition_detail_id_seq'::regclass);


--
-- Name: nutrition_program id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nutrition_program ALTER COLUMN id SET DEFAULT nextval('public.nutrition_program_id_seq'::regclass);


--
-- Name: nutrition_program_review id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nutrition_program_review ALTER COLUMN id SET DEFAULT nextval('public.nutrition_program_review_id_seq'::regclass);


--
-- Name: payment id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payment ALTER COLUMN id SET DEFAULT nextval('public.payment_id_seq'::regclass);


--
-- Name: performance_record id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.performance_record ALTER COLUMN id SET DEFAULT nextval('public.performance_record_id_seq'::regclass);


--
-- Name: private_discussion id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.private_discussion ALTER COLUMN id SET DEFAULT nextval('public.private_discussion_id_seq'::regclass);


--
-- Name: progress id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.progress ALTER COLUMN id SET DEFAULT nextval('public.progress_id_seq'::regclass);


--
-- Name: recipe id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recipe ALTER COLUMN id SET DEFAULT nextval('public.recipe_id_seq'::regclass);


--
-- Name: recommendation id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recommendation ALTER COLUMN id SET DEFAULT nextval('public.recommendation_id_seq'::regclass);


--
-- Name: session id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.session ALTER COLUMN id SET DEFAULT nextval('public.session_id_seq'::regclass);


--
-- Name: session_review id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.session_review ALTER COLUMN id SET DEFAULT nextval('public.session_review_id_seq'::regclass);


--
-- Name: stage id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stage ALTER COLUMN id SET DEFAULT nextval('public.stage_id_seq'::regclass);


--
-- Name: subscription_plan id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subscription_plan ALTER COLUMN id SET DEFAULT nextval('public.subscription_plan_id_seq'::regclass);


--
-- Name: training_content_link id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.training_content_link ALTER COLUMN id SET DEFAULT nextval('public.training_content_link_id_seq'::regclass);


--
-- Name: training_session id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.training_session ALTER COLUMN id SET DEFAULT nextval('public.training_session_id_seq'::regclass);


--
-- Name: user id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- Name: user_challenge id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_challenge ALTER COLUMN id SET DEFAULT nextval('public.user_challenge_id_seq'::regclass);


--
-- Name: user_nutrition id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_nutrition ALTER COLUMN id SET DEFAULT nextval('public.user_nutrition_id_seq'::regclass);


--
-- Name: user_nutrition_progress id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_nutrition_progress ALTER COLUMN id SET DEFAULT nextval('public.user_nutrition_progress_id_seq'::regclass);


--
-- Name: user_program id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_program ALTER COLUMN id SET DEFAULT nextval('public.user_program_id_seq'::regclass);


--
-- Name: user_subscription id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_subscription ALTER COLUMN id SET DEFAULT nextval('public.user_subscription_id_seq'::regclass);


-- PostgreSQL database dump complete
--

