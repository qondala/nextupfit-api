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


--
-- Name: user_nutrition PK_03ee075542b09eb1a35a90a940b; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_nutrition
    ADD CONSTRAINT "PK_03ee075542b09eb1a35a90a940b" PRIMARY KEY (id);


--
-- Name: body_measurement PK_094e197b44a824f270b716fd89d; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.body_measurement
    ADD CONSTRAINT "PK_094e197b44a824f270b716fd89d" PRIMARY KEY (id);


--
-- Name: recommendation PK_17cb51984a6627ef2ce7370e23c; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recommendation
    ADD CONSTRAINT "PK_17cb51984a6627ef2ce7370e23c" PRIMARY KEY (id);


--
-- Name: admin_transfer PK_1e53e67f7e22bd1f7673ac346a8; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin_transfer
    ADD CONSTRAINT "PK_1e53e67f7e22bd1f7673ac346a8" PRIMARY KEY (id);


--
-- Name: session_review PK_1fe01f7f3ade8654e4f4d93b4cf; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.session_review
    ADD CONSTRAINT "PK_1fe01f7f3ade8654e4f4d93b4cf" PRIMARY KEY (id);


--
-- Name: nutrition_program_contents_content PK_204325fabb8e9c167e84f86171e; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nutrition_program_contents_content
    ADD CONSTRAINT "PK_204325fabb8e9c167e84f86171e" PRIMARY KEY ("nutritionProgramId", "contentId");


--
-- Name: food PK_26d12de4b6576ff08d30c281837; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.food
    ADD CONSTRAINT "PK_26d12de4b6576ff08d30c281837" PRIMARY KEY (id);


--
-- Name: training_content_link PK_34412aa91c7e771cb630d400fca; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.training_content_link
    ADD CONSTRAINT "PK_34412aa91c7e771cb630d400fca" PRIMARY KEY (id);


--
-- Name: news PK_39a43dfcb6007180f04aff2357e; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.news
    ADD CONSTRAINT "PK_39a43dfcb6007180f04aff2357e" PRIMARY KEY (id);


--
-- Name: employee PK_3c2bc72f03fd5abbbc5ac169498; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employee
    ADD CONSTRAINT "PK_3c2bc72f03fd5abbbc5ac169498" PRIMARY KEY (id);


--
-- Name: coach_transfer PK_4334dcd2484a682fec4b09de3cb; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coach_transfer
    ADD CONSTRAINT "PK_4334dcd2484a682fec4b09de3cb" PRIMARY KEY (id);


--
-- Name: affiliate_link PK_4d8e59b42a53f7718de5c0a8002; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.affiliate_link
    ADD CONSTRAINT "PK_4d8e59b42a53f7718de5c0a8002" PRIMARY KEY (id);


--
-- Name: challenge PK_5f31455ad09ea6a836a06871b7a; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.challenge
    ADD CONSTRAINT "PK_5f31455ad09ea6a836a06871b7a" PRIMARY KEY (id);


--
-- Name: subscription_plan PK_5fde988e5d9b9a522d70ebec27c; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subscription_plan
    ADD CONSTRAINT "PK_5fde988e5d9b9a522d70ebec27c" PRIMARY KEY (id);


--
-- Name: coach_qualification PK_6795cae7a9c61c7640c6f21b360; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coach_qualification
    ADD CONSTRAINT "PK_6795cae7a9c61c7640c6f21b360" PRIMARY KEY (id);


--
-- Name: content PK_6a2083913f3647b44f205204e36; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.content
    ADD CONSTRAINT "PK_6a2083913f3647b44f205204e36" PRIMARY KEY (id);


--
-- Name: content_goals_fitness_goal PK_6ce7710bc1fc16bce7b570c593b; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.content_goals_fitness_goal
    ADD CONSTRAINT "PK_6ce7710bc1fc16bce7b570c593b" PRIMARY KEY ("contentId", "fitnessGoalId");


--
-- Name: notification PK_705b6c7cdf9b2c2ff7ac7872cb7; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notification
    ADD CONSTRAINT "PK_705b6c7cdf9b2c2ff7ac7872cb7" PRIMARY KEY (id);


--
-- Name: coach_rating PK_753978e8a783ffd2c275c5fdff0; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coach_rating
    ADD CONSTRAINT "PK_753978e8a783ffd2c275c5fdff0" PRIMARY KEY (id);


--
-- Name: content_review PK_76988fae19e2a3d89ba01bde674; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.content_review
    ADD CONSTRAINT "PK_76988fae19e2a3d89ba01bde674" PRIMARY KEY (id);


--
-- Name: progress PK_79abdfd87a688f9de756a162b6f; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.progress
    ADD CONSTRAINT "PK_79abdfd87a688f9de756a162b6f" PRIMARY KEY (id);


--
-- Name: exercise_goals_fitness_goal PK_88e25ce6fd6a9fd9d386104479a; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exercise_goals_fitness_goal
    ADD CONSTRAINT "PK_88e25ce6fd6a9fd9d386104479a" PRIMARY KEY ("exerciseId", "fitnessGoalId");


--
-- Name: content_rating PK_8a23e5d7e4e156a6607a41adf29; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.content_rating
    ADD CONSTRAINT "PK_8a23e5d7e4e156a6607a41adf29" PRIMARY KEY (id);


--
-- Name: nutrition_detail PK_93b990b0d38da1a35b160f104a4; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nutrition_detail
    ADD CONSTRAINT "PK_93b990b0d38da1a35b160f104a4" PRIMARY KEY (id);


--
-- Name: nutrition_program_review PK_998e5e954396f42119e172bdbb9; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nutrition_program_review
    ADD CONSTRAINT "PK_998e5e954396f42119e172bdbb9" PRIMARY KEY (id);


--
-- Name: category PK_9c4e4a89e3674fc9f382d733f03; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY (id);


--
-- Name: exercise PK_a0f107e3a2ef2742c1e91d97c14; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exercise
    ADD CONSTRAINT "PK_a0f107e3a2ef2742c1e91d97c14" PRIMARY KEY (id);


--
-- Name: training_session PK_a17a9657ff5a6e048bfd82c4651; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.training_session
    ADD CONSTRAINT "PK_a17a9657ff5a6e048bfd82c4651" PRIMARY KEY (id);


--
-- Name: private_discussion PK_a8c71732a00fd7808de0b8256a5; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.private_discussion
    ADD CONSTRAINT "PK_a8c71732a00fd7808de0b8256a5" PRIMARY KEY (id);


--
-- Name: user_program PK_ab02fb05fe2e9b1e6ebaead78ed; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_program
    ADD CONSTRAINT "PK_ab02fb05fe2e9b1e6ebaead78ed" PRIMARY KEY (id);


--
-- Name: meal PK_ada510a5aba19e6bb500f8f7817; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.meal
    ADD CONSTRAINT "PK_ada510a5aba19e6bb500f8f7817" PRIMARY KEY (id);


--
-- Name: affiliate_sale PK_aeabdc0bca10ac3d30339a83f0c; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.affiliate_sale
    ADD CONSTRAINT "PK_aeabdc0bca10ac3d30339a83f0c" PRIMARY KEY (id);


--
-- Name: coach_specialization PK_bc23f2d0189c13e86b197dac817; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coach_specialization
    ADD CONSTRAINT "PK_bc23f2d0189c13e86b197dac817" PRIMARY KEY (id);


--
-- Name: meal_recipes_recipe PK_bd7addd752eb1327a08e76c13c6; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.meal_recipes_recipe
    ADD CONSTRAINT "PK_bd7addd752eb1327a08e76c13c6" PRIMARY KEY ("mealId", "recipeId");


--
-- Name: fitness_goal PK_bef8300c7b1982111249fe28f1d; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fitness_goal
    ADD CONSTRAINT "PK_bef8300c7b1982111249fe28f1d" PRIMARY KEY (id);


--
-- Name: coach PK_c2ca0875fe0755b197d0147713d; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coach
    ADD CONSTRAINT "PK_c2ca0875fe0755b197d0147713d" PRIMARY KEY (id);


--
-- Name: stage PK_c54d11b3c24a188262844af1612; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stage
    ADD CONSTRAINT "PK_c54d11b3c24a188262844af1612" PRIMARY KEY (id);


--
-- Name: user PK_cace4a159ff9f2512dd42373760; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);


--
-- Name: nutrition_program PK_d150f537be3b72c71699f06ba95; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nutrition_program
    ADD CONSTRAINT "PK_d150f537be3b72c71699f06ba95" PRIMARY KEY (id);


--
-- Name: meal_foods_food PK_d1a089bd9b1467458bce3a00864; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.meal_foods_food
    ADD CONSTRAINT "PK_d1a089bd9b1467458bce3a00864" PRIMARY KEY ("mealId", "foodId");


--
-- Name: payment_contents_content PK_d28a57e37609a76c3247a63569e; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payment_contents_content
    ADD CONSTRAINT "PK_d28a57e37609a76c3247a63569e" PRIMARY KEY ("paymentId", "contentId");


--
-- Name: user_nutrition_progress PK_d8e1ae68bcbfa8c2b4351ce1283; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_nutrition_progress
    ADD CONSTRAINT "PK_d8e1ae68bcbfa8c2b4351ce1283" PRIMARY KEY (id);


--
-- Name: admin PK_e032310bcef831fb83101899b10; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin
    ADD CONSTRAINT "PK_e032310bcef831fb83101899b10" PRIMARY KEY (id);


--
-- Name: recipe PK_e365a2fedf57238d970e07825ca; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recipe
    ADD CONSTRAINT "PK_e365a2fedf57238d970e07825ca" PRIMARY KEY (id);


--
-- Name: coach_follow PK_e3936c04c7c31a3f475c7516f32; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coach_follow
    ADD CONSTRAINT "PK_e3936c04c7c31a3f475c7516f32" PRIMARY KEY (id);


--
-- Name: performance_record PK_e8e6d579150116ffd018ba858dd; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.performance_record
    ADD CONSTRAINT "PK_e8e6d579150116ffd018ba858dd" PRIMARY KEY (id);


--
-- Name: user_subscription PK_ec4e57f4138e339fb111948a16f; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_subscription
    ADD CONSTRAINT "PK_ec4e57f4138e339fb111948a16f" PRIMARY KEY (id);


--
-- Name: user_challenge PK_f17ac7d57d22c067e61d6b64aad; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_challenge
    ADD CONSTRAINT "PK_f17ac7d57d22c067e61d6b64aad" PRIMARY KEY (id);


--
-- Name: session PK_f55da76ac1c3ac420f444d2ff11; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY (id);


--
-- Name: payment PK_fcaec7df5adf9cac408c686b2ab; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payment
    ADD CONSTRAINT "PK_fcaec7df5adf9cac408c686b2ab" PRIMARY KEY (id);


--
-- Name: affiliate_program PK_fd589da04adc9a3f0dfa7bee3a2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.affiliate_program
    ADD CONSTRAINT "PK_fd589da04adc9a3f0dfa7bee3a2" PRIMARY KEY (id);


--
-- Name: admin REL_4adf038720cb2511f6e669d251; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin
    ADD CONSTRAINT "REL_4adf038720cb2511f6e669d251" UNIQUE ("coachId");


--
-- Name: news REL_abeeb307b96b4f8c10b1c3624e; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.news
    ADD CONSTRAINT "REL_abeeb307b96b4f8c10b1c3624e" UNIQUE ("contentId");


--
-- Name: coach REL_b41c508e2dacfe91a064b5b98f; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coach
    ADD CONSTRAINT "REL_b41c508e2dacfe91a064b5b98f" UNIQUE ("userId");


--
-- Name: employee REL_d189b8711c36f33fef96d0a969; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employee
    ADD CONSTRAINT "REL_d189b8711c36f33fef96d0a969" UNIQUE ("createById");


--
-- Name: employee REL_f4b0d329c4a3cf79ffe9d56504; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employee
    ADD CONSTRAINT "REL_f4b0d329c4a3cf79ffe9d56504" UNIQUE ("userId");


--
-- Name: user UQ_e12875dfb3b1d92d7d7c5377e22; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE (email);


--
-- Name: IDX_12c99b36498f515504dbd323ca; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_12c99b36498f515504dbd323ca" ON public.exercise_goals_fitness_goal USING btree ("fitnessGoalId");


--
-- Name: IDX_41abd6b00a3d87233fb0af4d18; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_41abd6b00a3d87233fb0af4d18" ON public.payment_contents_content USING btree ("contentId");


--
-- Name: IDX_4363f0a2b6794e0c68f3a247c4; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_4363f0a2b6794e0c68f3a247c4" ON public.exercise_goals_fitness_goal USING btree ("exerciseId");


--
-- Name: IDX_52b2a17600ce01f747d63391e5; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_52b2a17600ce01f747d63391e5" ON public.content_goals_fitness_goal USING btree ("fitnessGoalId");


--
-- Name: IDX_7a94860421a33e21c644f0a23f; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_7a94860421a33e21c644f0a23f" ON public.nutrition_program_contents_content USING btree ("contentId");


--
-- Name: IDX_91a69c3b8168b2075994d511d5; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_91a69c3b8168b2075994d511d5" ON public.content_goals_fitness_goal USING btree ("contentId");


--
-- Name: IDX_96d9d6774e73c162e6f8f7f29c; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_96d9d6774e73c162e6f8f7f29c" ON public.nutrition_program_contents_content USING btree ("nutritionProgramId");


--
-- Name: IDX_97164e0846414533bd3979a4f3; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_97164e0846414533bd3979a4f3" ON public.meal_foods_food USING btree ("mealId");


--
-- Name: IDX_a284b69ecf191a62f1ca7a65d3; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_a284b69ecf191a62f1ca7a65d3" ON public.meal_recipes_recipe USING btree ("mealId");


--
-- Name: IDX_db8f6d7f2540ad4792f960de42; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_db8f6d7f2540ad4792f960de42" ON public.meal_foods_food USING btree ("foodId");


--
-- Name: IDX_e9f08011a5c493b10dd62a73b0; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_e9f08011a5c493b10dd62a73b0" ON public.meal_recipes_recipe USING btree ("recipeId");


--
-- Name: IDX_f34184007489db6a129cfcdcb5; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_f34184007489db6a129cfcdcb5" ON public.payment_contents_content USING btree ("paymentId");


--
-- Name: progress FK_0366c96237f98ea1c8ba6e1ec35; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.progress
    ADD CONSTRAINT "FK_0366c96237f98ea1c8ba6e1ec35" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- Name: affiliate_link FK_0d839ead583baaed712336a33db; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.affiliate_link
    ADD CONSTRAINT "FK_0d839ead583baaed712336a33db" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- Name: performance_record FK_10256273253f5f0b79b5121b5c6; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.performance_record
    ADD CONSTRAINT "FK_10256273253f5f0b79b5121b5c6" FOREIGN KEY ("userProgramId") REFERENCES public.user_program(id);


--
-- Name: content_rating FK_1112c1255709428a8adc577e5f7; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.content_rating
    ADD CONSTRAINT "FK_1112c1255709428a8adc577e5f7" FOREIGN KEY ("contentId") REFERENCES public.content(id);


--
-- Name: exercise_goals_fitness_goal FK_12c99b36498f515504dbd323ca3; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exercise_goals_fitness_goal
    ADD CONSTRAINT "FK_12c99b36498f515504dbd323ca3" FOREIGN KEY ("fitnessGoalId") REFERENCES public.fitness_goal(id);


--
-- Name: nutrition_program FK_14919756abdb12d4d6a5146ab3d; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nutrition_program
    ADD CONSTRAINT "FK_14919756abdb12d4d6a5146ab3d" FOREIGN KEY ("coachId") REFERENCES public.coach(id);


--
-- Name: user_program FK_1b1ba12685cf3cd9c46cdbb99df; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_program
    ADD CONSTRAINT "FK_1b1ba12685cf3cd9c46cdbb99df" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- Name: affiliate_program FK_1c04ba722cd2706fa5ed92194a3; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.affiliate_program
    ADD CONSTRAINT "FK_1c04ba722cd2706fa5ed92194a3" FOREIGN KEY ("contentId") REFERENCES public.content(id);


--
-- Name: notification FK_1ced25315eb974b73391fb1c81b; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notification
    ADD CONSTRAINT "FK_1ced25315eb974b73391fb1c81b" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- Name: user_nutrition FK_24bbf41492088c8dc70a687f178; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_nutrition
    ADD CONSTRAINT "FK_24bbf41492088c8dc70a687f178" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- Name: affiliate_sale FK_2635808ffc2e4013e9aacbfa7fb; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.affiliate_sale
    ADD CONSTRAINT "FK_2635808ffc2e4013e9aacbfa7fb" FOREIGN KEY ("affiliateLinkId") REFERENCES public.affiliate_link(id);


--
-- Name: user_challenge FK_2a670b2efe9436c88cef7f15699; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_challenge
    ADD CONSTRAINT "FK_2a670b2efe9436c88cef7f15699" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- Name: recommendation FK_2ea751c4af425e523d4638d55b5; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recommendation
    ADD CONSTRAINT "FK_2ea751c4af425e523d4638d55b5" FOREIGN KEY ("recommendedCoachId") REFERENCES public.coach(id);


--
-- Name: fitness_goal FK_2fa98e8fd23ee90993b930f26c3; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fitness_goal
    ADD CONSTRAINT "FK_2fa98e8fd23ee90993b930f26c3" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- Name: coach_rating FK_2fab914d2d5bdf7102c643d077c; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coach_rating
    ADD CONSTRAINT "FK_2fab914d2d5bdf7102c643d077c" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- Name: user_subscription FK_3010dd7813f5c8f6359dc5ecab8; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_subscription
    ADD CONSTRAINT "FK_3010dd7813f5c8f6359dc5ecab8" FOREIGN KEY ("subscriptionPlanId") REFERENCES public.subscription_plan(id);


--
-- Name: progress FK_36b66733d026a365fb6e6dd63ae; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.progress
    ADD CONSTRAINT "FK_36b66733d026a365fb6e6dd63ae" FOREIGN KEY ("exerciseId") REFERENCES public.exercise(id);


--
-- Name: user_subscription FK_403d98d1638533c09f9b185929b; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_subscription
    ADD CONSTRAINT "FK_403d98d1638533c09f9b185929b" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- Name: payment_contents_content FK_41abd6b00a3d87233fb0af4d189; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payment_contents_content
    ADD CONSTRAINT "FK_41abd6b00a3d87233fb0af4d189" FOREIGN KEY ("contentId") REFERENCES public.content(id);


--
-- Name: exercise_goals_fitness_goal FK_4363f0a2b6794e0c68f3a247c48; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exercise_goals_fitness_goal
    ADD CONSTRAINT "FK_4363f0a2b6794e0c68f3a247c48" FOREIGN KEY ("exerciseId") REFERENCES public.exercise(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: affiliate_link FK_45364026df51176d495c9796d19; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.affiliate_link
    ADD CONSTRAINT "FK_45364026df51176d495c9796d19" FOREIGN KEY ("affiliateProgramId") REFERENCES public.affiliate_program(id);


--
-- Name: training_session FK_487b6d452df5807077415b6d080; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.training_session
    ADD CONSTRAINT "FK_487b6d452df5807077415b6d080" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- Name: nutrition_detail FK_49c2ea3a1e2fc886f6932f8ca94; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nutrition_detail
    ADD CONSTRAINT "FK_49c2ea3a1e2fc886f6932f8ca94" FOREIGN KEY ("nutritionProgramId") REFERENCES public.nutrition_program(id);


--
-- Name: admin FK_4adf038720cb2511f6e669d251f; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin
    ADD CONSTRAINT "FK_4adf038720cb2511f6e669d251f" FOREIGN KEY ("coachId") REFERENCES public.coach(id);


--
-- Name: session FK_5042a686da5522dfa12274f479e; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT "FK_5042a686da5522dfa12274f479e" FOREIGN KEY ("contentId") REFERENCES public.content(id);


--
-- Name: user_nutrition_progress FK_5082ae9bf807a05bbcc6ccda382; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_nutrition_progress
    ADD CONSTRAINT "FK_5082ae9bf807a05bbcc6ccda382" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- Name: content_goals_fitness_goal FK_52b2a17600ce01f747d63391e51; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.content_goals_fitness_goal
    ADD CONSTRAINT "FK_52b2a17600ce01f747d63391e51" FOREIGN KEY ("fitnessGoalId") REFERENCES public.fitness_goal(id);


--
-- Name: session FK_5cbfe840b22daef21736bce8313; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT "FK_5cbfe840b22daef21736bce8313" FOREIGN KEY ("challengeId") REFERENCES public.challenge(id);


--
-- Name: admin_transfer FK_5f15459b3e0a5b047e1b3c3a648; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin_transfer
    ADD CONSTRAINT "FK_5f15459b3e0a5b047e1b3c3a648" FOREIGN KEY ("adminId") REFERENCES public.admin(id);


--
-- Name: coach_transfer FK_606d876646780114fe94d50638a; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coach_transfer
    ADD CONSTRAINT "FK_606d876646780114fe94d50638a" FOREIGN KEY ("coachId") REFERENCES public.coach(id);


--
-- Name: exercise FK_6735351d76c9ff1bcd2eedbe5d7; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exercise
    ADD CONSTRAINT "FK_6735351d76c9ff1bcd2eedbe5d7" FOREIGN KEY ("contentId") REFERENCES public.content(id);


--
-- Name: coach_rating FK_689af48d5054be9d3196e343bf1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coach_rating
    ADD CONSTRAINT "FK_689af48d5054be9d3196e343bf1" FOREIGN KEY ("coachId") REFERENCES public.coach(id);


--
-- Name: session FK_6af8e812a7930c92e5d5c5be0f6; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT "FK_6af8e812a7930c92e5d5c5be0f6" FOREIGN KEY ("coachId") REFERENCES public.coach(id);


--
-- Name: content FK_6f2dcfd2fc4beedc6fc0eef3410; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.content
    ADD CONSTRAINT "FK_6f2dcfd2fc4beedc6fc0eef3410" FOREIGN KEY ("coachId") REFERENCES public.coach(id);


--
-- Name: news FK_74a98d082b2273a388e84ed8421; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.news
    ADD CONSTRAINT "FK_74a98d082b2273a388e84ed8421" FOREIGN KEY ("coachId") REFERENCES public.coach(id);


--
-- Name: nutrition_program_review FK_79c3c5a3b3be7ca27fc0c8485a7; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nutrition_program_review
    ADD CONSTRAINT "FK_79c3c5a3b3be7ca27fc0c8485a7" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- Name: nutrition_program_contents_content FK_7a94860421a33e21c644f0a23fe; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nutrition_program_contents_content
    ADD CONSTRAINT "FK_7a94860421a33e21c644f0a23fe" FOREIGN KEY ("contentId") REFERENCES public.content(id);


--
-- Name: content_rating FK_7f00a7437c631af7085cd264c70; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.content_rating
    ADD CONSTRAINT "FK_7f00a7437c631af7085cd264c70" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- Name: training_content_link FK_87471eea0c5d44f0bd7efc8c6f5; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.training_content_link
    ADD CONSTRAINT "FK_87471eea0c5d44f0bd7efc8c6f5" FOREIGN KEY ("contentId") REFERENCES public.content(id);


--
-- Name: training_session FK_8da38493837784f8122eddb7fa3; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.training_session
    ADD CONSTRAINT "FK_8da38493837784f8122eddb7fa3" FOREIGN KEY ("sessionId") REFERENCES public.session(id);


--
-- Name: content_goals_fitness_goal FK_91a69c3b8168b2075994d511d52; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.content_goals_fitness_goal
    ADD CONSTRAINT "FK_91a69c3b8168b2075994d511d52" FOREIGN KEY ("contentId") REFERENCES public.content(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: private_discussion FK_94c242a398d431190c335c71d6e; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.private_discussion
    ADD CONSTRAINT "FK_94c242a398d431190c335c71d6e" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- Name: session_review FK_96244c7c5b5913d25bcc52bb920; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.session_review
    ADD CONSTRAINT "FK_96244c7c5b5913d25bcc52bb920" FOREIGN KEY ("sessionId") REFERENCES public.session(id);


--
-- Name: nutrition_program_contents_content FK_96d9d6774e73c162e6f8f7f29c6; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nutrition_program_contents_content
    ADD CONSTRAINT "FK_96d9d6774e73c162e6f8f7f29c6" FOREIGN KEY ("nutritionProgramId") REFERENCES public.nutrition_program(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: meal_foods_food FK_97164e0846414533bd3979a4f3f; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.meal_foods_food
    ADD CONSTRAINT "FK_97164e0846414533bd3979a4f3f" FOREIGN KEY ("mealId") REFERENCES public.meal(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user_program FK_9fc3823253c6f88880ed5099e3d; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_program
    ADD CONSTRAINT "FK_9fc3823253c6f88880ed5099e3d" FOREIGN KEY ("contentId") REFERENCES public.content(id);


--
-- Name: nutrition_program_review FK_a19b2ca7c1b84dc1d43e4e63e59; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nutrition_program_review
    ADD CONSTRAINT "FK_a19b2ca7c1b84dc1d43e4e63e59" FOREIGN KEY ("nutritionProgramId") REFERENCES public.nutrition_program(id);


--
-- Name: meal_recipes_recipe FK_a284b69ecf191a62f1ca7a65d3c; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.meal_recipes_recipe
    ADD CONSTRAINT "FK_a284b69ecf191a62f1ca7a65d3c" FOREIGN KEY ("mealId") REFERENCES public.meal(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user_nutrition_progress FK_a7383999ba3414160be1602c7a3; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_nutrition_progress
    ADD CONSTRAINT "FK_a7383999ba3414160be1602c7a3" FOREIGN KEY ("nutritionProgramId") REFERENCES public.nutrition_program(id);


--
-- Name: user_nutrition FK_aa5d071f227452f0bd44af64eea; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_nutrition
    ADD CONSTRAINT "FK_aa5d071f227452f0bd44af64eea" FOREIGN KEY ("nutritionProgramId") REFERENCES public.nutrition_program(id);


--
-- Name: content_review FK_aa985e8d17e1e3c0fb858396381; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.content_review
    ADD CONSTRAINT "FK_aa985e8d17e1e3c0fb858396381" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- Name: news FK_abeeb307b96b4f8c10b1c3624e6; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.news
    ADD CONSTRAINT "FK_abeeb307b96b4f8c10b1c3624e6" FOREIGN KEY ("contentId") REFERENCES public.content(id);


--
-- Name: payment FK_b046318e0b341a7f72110b75857; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payment
    ADD CONSTRAINT "FK_b046318e0b341a7f72110b75857" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- Name: recommendation FK_b26c58cd335e7911fa7935a6f1b; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recommendation
    ADD CONSTRAINT "FK_b26c58cd335e7911fa7935a6f1b" FOREIGN KEY ("recommenderId") REFERENCES public."user"(id);


--
-- Name: coach FK_b41c508e2dacfe91a064b5b98f6; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coach
    ADD CONSTRAINT "FK_b41c508e2dacfe91a064b5b98f6" FOREIGN KEY ("userId") REFERENCES public."user"(id) ON DELETE CASCADE;


--
-- Name: coach_follow FK_b610b53d025bed951f1e05651c5; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coach_follow
    ADD CONSTRAINT "FK_b610b53d025bed951f1e05651c5" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- Name: body_measurement FK_c0dedd6d251be590e531d83d9fd; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.body_measurement
    ADD CONSTRAINT "FK_c0dedd6d251be590e531d83d9fd" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- Name: challenge FK_c3ebec440a532b69677e03106f5; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.challenge
    ADD CONSTRAINT "FK_c3ebec440a532b69677e03106f5" FOREIGN KEY ("contentId") REFERENCES public.content(id);


--
-- Name: content_review FK_ca51b9c43155219455ca8873178; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.content_review
    ADD CONSTRAINT "FK_ca51b9c43155219455ca8873178" FOREIGN KEY ("contentId") REFERENCES public.content(id);


--
-- Name: user_challenge FK_ca62482b3c020cd5055eaabf4cf; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_challenge
    ADD CONSTRAINT "FK_ca62482b3c020cd5055eaabf4cf" FOREIGN KEY ("challengeId") REFERENCES public.challenge(id);


--
-- Name: session_review FK_cfcf6c986332dcb001a14f2a50d; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.session_review
    ADD CONSTRAINT "FK_cfcf6c986332dcb001a14f2a50d" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- Name: coach_specialization FK_d0237b1c36a6b072587caccd719; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coach_specialization
    ADD CONSTRAINT "FK_d0237b1c36a6b072587caccd719" FOREIGN KEY ("coachId") REFERENCES public.coach(id);


--
-- Name: employee FK_d189b8711c36f33fef96d0a9698; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employee
    ADD CONSTRAINT "FK_d189b8711c36f33fef96d0a9698" FOREIGN KEY ("createById") REFERENCES public.admin(id) ON DELETE CASCADE;


--
-- Name: coach_qualification FK_d5445ca98d8a71c863b2e12f4ab; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coach_qualification
    ADD CONSTRAINT "FK_d5445ca98d8a71c863b2e12f4ab" FOREIGN KEY ("coachId") REFERENCES public.coach(id);


--
-- Name: training_content_link FK_da01899b33e124bd10e7a6aa2db; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.training_content_link
    ADD CONSTRAINT "FK_da01899b33e124bd10e7a6aa2db" FOREIGN KEY ("sessionId") REFERENCES public.session(id);


--
-- Name: recommendation FK_db1446d9cbd34d2230a019d6ebc; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recommendation
    ADD CONSTRAINT "FK_db1446d9cbd34d2230a019d6ebc" FOREIGN KEY ("recommendedToUserId") REFERENCES public."user"(id);


--
-- Name: meal_foods_food FK_db8f6d7f2540ad4792f960de423; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.meal_foods_food
    ADD CONSTRAINT "FK_db8f6d7f2540ad4792f960de423" FOREIGN KEY ("foodId") REFERENCES public.food(id);


--
-- Name: coach FK_dc6e86802adb7b35530c2df26e2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coach
    ADD CONSTRAINT "FK_dc6e86802adb7b35530c2df26e2" FOREIGN KEY ("managerId") REFERENCES public.admin(id) ON DELETE CASCADE;


--
-- Name: content FK_dedf4676dc7654f0320fcdc5d53; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.content
    ADD CONSTRAINT "FK_dedf4676dc7654f0320fcdc5d53" FOREIGN KEY ("categoryId") REFERENCES public.category(id);


--
-- Name: stage FK_df40e5c70d2adc45a4edd8d697f; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stage
    ADD CONSTRAINT "FK_df40e5c70d2adc45a4edd8d697f" FOREIGN KEY ("contentId") REFERENCES public.content(id);


--
-- Name: challenge FK_e18a78c27ee8623b1f889d4478e; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.challenge
    ADD CONSTRAINT "FK_e18a78c27ee8623b1f889d4478e" FOREIGN KEY ("coachId") REFERENCES public.coach(id);


--
-- Name: coach_follow FK_e1c27b5f88521247e82f54342f9; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coach_follow
    ADD CONSTRAINT "FK_e1c27b5f88521247e82f54342f9" FOREIGN KEY ("coachId") REFERENCES public.coach(id);


--
-- Name: meal_recipes_recipe FK_e9f08011a5c493b10dd62a73b09; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.meal_recipes_recipe
    ADD CONSTRAINT "FK_e9f08011a5c493b10dd62a73b09" FOREIGN KEY ("recipeId") REFERENCES public.recipe(id);


--
-- Name: payment_contents_content FK_f34184007489db6a129cfcdcb5f; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payment_contents_content
    ADD CONSTRAINT "FK_f34184007489db6a129cfcdcb5f" FOREIGN KEY ("paymentId") REFERENCES public.payment(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: employee FK_f4b0d329c4a3cf79ffe9d565047; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employee
    ADD CONSTRAINT "FK_f4b0d329c4a3cf79ffe9d565047" FOREIGN KEY ("userId") REFERENCES public."user"(id) ON DELETE CASCADE;


--
-- Name: private_discussion FK_fad6386e0570d9187114917f78d; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.private_discussion
    ADD CONSTRAINT "FK_fad6386e0570d9187114917f78d" FOREIGN KEY ("coachId") REFERENCES public.coach(id);


--
-- PostgreSQL database dump complete
--

