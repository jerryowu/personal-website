--
-- PostgreSQL database dump
--

-- Dumped from database version 14.15 (Homebrew)
-- Dumped by pg_dump version 14.15 (Homebrew)

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
-- Data for Name: book; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."book" (id, title, author, status, "createdAt", "updatedAt", "isBanger", "order") FROM stdin;
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
-- Name: book_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."book_id_seq"', 80, true);


--
-- PostgreSQL database dump complete
--

