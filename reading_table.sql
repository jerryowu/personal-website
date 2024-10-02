--
-- PostgreSQL database dump
--

-- Dumped from database version 14.13 (Homebrew)
-- Dumped by pg_dump version 14.13 (Homebrew)

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Book; Type: TABLE; Schema: public; Owner: jerryowu
--

CREATE TABLE public."Book" (
    id integer NOT NULL,
    title text NOT NULL,
    author text NOT NULL,
    status text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "isBanger" boolean DEFAULT false NOT NULL,
    "order" integer DEFAULT 0 NOT NULL
);


ALTER TABLE public."Book" OWNER TO jerryowu;

--
-- Name: Book_id_seq; Type: SEQUENCE; Schema: public; Owner: jerryowu
--

CREATE SEQUENCE public."Book_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Book_id_seq" OWNER TO jerryowu;

--
-- Name: Book_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jerryowu
--

ALTER SEQUENCE public."Book_id_seq" OWNED BY public."Book".id;


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: jerryowu
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO jerryowu;

--
-- Name: Book id; Type: DEFAULT; Schema: public; Owner: jerryowu
--

ALTER TABLE ONLY public."Book" ALTER COLUMN id SET DEFAULT nextval('public."Book_id_seq"'::regclass);


--
-- Data for Name: Book; Type: TABLE DATA; Schema: public; Owner: jerryowu
--

COPY public."Book" (id, title, author, status, "createdAt", "updatedAt", "isBanger", "order") FROM stdin;
74	Extreme Ownership	Jocko Willink	current	2024-10-02 19:34:37.057	2024-10-02 19:34:50.264	f	0
65	The Official ACT Prep Guide 2019-2020	ACT	finished	2024-10-02 19:30:29.067	2024-10-02 19:54:55.61	f	0
63	The Happiness Paradox	Richard Eyre	finished	2024-10-02 19:30:18.384	2024-10-02 19:54:55.61	f	1
64	Man's Search for Meaning	Viktor E Frankl	finished	2024-10-02 19:30:24.06	2024-10-02 19:54:55.61	t	2
62	Redemption	Bryan Clay	finished	2024-10-02 19:30:11.513	2024-10-02 19:54:55.61	f	3
61	The Diary of a Young Girl	Anne Frank	finished	2024-10-02 19:30:06.962	2024-10-02 19:54:55.61	f	4
60	How to Win Friends and Influence People	Dale Carnegie	finished	2024-10-02 19:30:01.503	2024-10-02 19:54:55.61	t	5
59	The Subtle Art of Not Giving a F*ck	Mark Manson	finished	2024-10-02 19:29:54.882	2024-10-02 19:54:55.61	t	6
58	12 Rules for Life	Jordan Peterson	finished	2024-10-02 19:29:45.196	2024-10-02 19:54:55.61	f	7
57	Shoe Dog	Phil Knight	finished	2024-10-02 19:29:39.419	2024-10-02 19:54:55.61	t	8
56	Never Finished	David Goggins	finished	2024-10-02 19:29:33.039	2024-10-02 19:54:55.61	t	9
55	Can't Hurt Me	David Goggins	finished	2024-10-02 19:28:30.484	2024-10-02 19:54:55.61	t	10
73	Allegiant	Veronica Roth	finished	2024-10-02 19:32:49.906	2024-10-02 19:54:55.61	f	11
72	Insurgent	Veronica Roth	finished	2024-10-02 19:32:43.406	2024-10-02 19:54:55.61	f	12
71	Divergent	Veronica Roth	finished	2024-10-02 19:32:30.76	2024-10-02 19:54:55.61	t	13
70	The Fever Code	James Dashner	finished	2024-10-02 19:31:54.406	2024-10-02 19:54:55.61	f	14
69	The Kill Order	James Dashner	finished	2024-10-02 19:31:25.27	2024-10-02 19:54:55.61	f	15
68	The Death Cure	James Dashner	finished	2024-10-02 19:31:23.779	2024-10-02 19:54:55.61	f	16
67	The Scorch Trials	James Dashner	finished	2024-10-02 19:31:11.218	2024-10-02 19:54:55.61	f	17
66	The Maze Runner	James Dashner	finished	2024-10-02 19:31:02.472	2024-10-02 19:54:55.61	t	18
79	Surely You're Joking, Mr. Feynman!	Richard Feynman	current	2024-10-02 20:21:20.319	2024-10-02 20:21:20.319	f	-1
78	What If?	Randall Munroe	readingList	2024-10-02 19:35:18.757	2024-10-02 20:21:43.963	f	0
80	The 4-Hour Workweek	Tim Ferriss	readingList	2024-10-02 20:21:40.501	2024-10-02 20:21:43.963	f	1
77	Elon Musk	Walter Isaacson	readingList	2024-10-02 19:35:10.586	2024-10-02 20:21:43.963	f	2
76	Steve Jobs	Walter Isaacson	readingList	2024-10-02 19:35:05.687	2024-10-02 20:21:43.963	f	3
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: jerryowu
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
806bd479-9103-4c59-b8f0-7f6f02e2acb6	919e8d7cc45ab5f798847f7bdbf686eaacb0325beed194237b2f1d7580ae4bc9	2024-10-01 23:50:56.006537-07	20241002065055_add_order_to_books	\N	\N	2024-10-01 23:50:56.000833-07	1
\.


--
-- Name: Book_id_seq; Type: SEQUENCE SET; Schema: public; Owner: jerryowu
--

SELECT pg_catalog.setval('public."Book_id_seq"', 80, true);


--
-- Name: Book Book_pkey; Type: CONSTRAINT; Schema: public; Owner: jerryowu
--

ALTER TABLE ONLY public."Book"
    ADD CONSTRAINT "Book_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: jerryowu
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: jerry
--

GRANT ALL ON SCHEMA public TO jerryowu;


--
-- PostgreSQL database dump complete
--

