--
-- PostgreSQL database dump
--

-- Dumped from database version 13.9 (Debian 13.9-1.pgdg110+1)
-- Dumped by pg_dump version 14.4

-- Started on 2023-09-08 00:55:52

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
-- TOC entry 3121 (class 1262 OID 57374)
-- Name: cash_flow; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE cash_flow WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.utf8';


ALTER DATABASE cash_flow OWNER TO postgres;

\connect cash_flow

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
-- TOC entry 2 (class 3079 OID 57380)
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- TOC entry 3122 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- TOC entry 665 (class 1247 OID 57490)
-- Name: creditcard_bill_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.creditcard_bill_status AS ENUM (
    'PENDING',
    'PAID',
    'OVERDUE'
);


ALTER TYPE public.creditcard_bill_status OWNER TO postgres;

--
-- TOC entry 659 (class 1247 OID 57460)
-- Name: creditcard_transaction_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.creditcard_transaction_status AS ENUM (
    'PENDING',
    'CONSOLIDATED',
    'CANCELED'
);


ALTER TYPE public.creditcard_transaction_status OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 204 (class 1259 OID 57414)
-- Name: balance_transactions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.balance_transactions (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_id uuid NOT NULL,
    amount integer NOT NULL,
    description character varying(100) NOT NULL,
    transaction_time timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.balance_transactions OWNER TO postgres;

--
-- TOC entry 210 (class 1259 OID 57525)
-- Name: creditcard_balances; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.creditcard_balances (
    user_id uuid NOT NULL,
    balance integer DEFAULT 0 NOT NULL,
    last_updated_at timestamp with time zone,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.creditcard_balances OWNER TO postgres;

--
-- TOC entry 208 (class 1259 OID 57498)
-- Name: creditcard_bills; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.creditcard_bills (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_id uuid NOT NULL,
    description character varying NOT NULL,
    amount integer NOT NULL,
    status public.creditcard_bill_status DEFAULT 'PENDING'::public.creditcard_bill_status NOT NULL,
    due_date date,
    period_start_at timestamp with time zone NOT NULL,
    period_end_at timestamp with time zone NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    paid_amount integer DEFAULT 0 NOT NULL,
    last_month_remain_amount integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.creditcard_bills OWNER TO postgres;

--
-- TOC entry 205 (class 1259 OID 57440)
-- Name: creditcard_purchases; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.creditcard_purchases (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_id uuid NOT NULL,
    description character varying(100) NOT NULL,
    total_installments integer DEFAULT 1 NOT NULL,
    total_amount integer NOT NULL,
    purchased_at timestamp with time zone DEFAULT now() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.creditcard_purchases OWNER TO postgres;

--
-- TOC entry 206 (class 1259 OID 57449)
-- Name: creditcard_purchases_v2; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.creditcard_purchases_v2 (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_id uuid NOT NULL,
    description character varying(100) NOT NULL,
    total_installments integer DEFAULT 1 NOT NULL,
    total_amount integer NOT NULL,
    interest_per_month integer DEFAULT 0 NOT NULL,
    purchased_at timestamp with time zone DEFAULT now() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.creditcard_purchases_v2 OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 57548)
-- Name: creditcard_tradicional_cards; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.creditcard_tradicional_cards (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "user_Id" uuid NOT NULL,
    active boolean DEFAULT false NOT NULL,
    creditcard_holder character varying(40) NOT NULL,
    creditcard_number character varying NOT NULL,
    creditcard_brand character varying NOT NULL,
    creditcard_cvv character varying(3) NOT NULL,
    max_credit_limit integer DEFAULT 0 NOT NULL,
    invoice_closing_day integer DEFAULT 15 NOT NULL
);


ALTER TABLE public.creditcard_tradicional_cards OWNER TO postgres;

--
-- TOC entry 207 (class 1259 OID 57468)
-- Name: creditcard_transactions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.creditcard_transactions (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_id uuid NOT NULL,
    purchase_id uuid,
    installment integer DEFAULT 0 NOT NULL,
    total_installments integer DEFAULT 0 NOT NULL,
    amount integer NOT NULL,
    status public.creditcard_transaction_status DEFAULT 'PENDING'::public.creditcard_transaction_status NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    charged_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.creditcard_transactions OWNER TO postgres;

--
-- TOC entry 201 (class 1259 OID 57375)
-- Name: ledgers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ledgers (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_id uuid NOT NULL,
    amount integer NOT NULL,
    transaction_time timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.ledgers OWNER TO postgres;

--
-- TOC entry 203 (class 1259 OID 57401)
-- Name: ledgers_accounting; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ledgers_accounting (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_id uuid NOT NULL,
    start_timestamp timestamp with time zone NOT NULL,
    end_timestamp timestamp with time zone NOT NULL,
    balance integer DEFAULT 0 NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.ledgers_accounting OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 57511)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    fullname character varying(100) NOT NULL,
    nickname character varying(30) NOT NULL,
    document_number character varying(30) NOT NULL,
    balance integer DEFAULT 0 NOT NULL,
    last_balance_updated_at timestamp with time zone DEFAULT now() NOT NULL,
    max_credit_limit integer DEFAULT 0 NOT NULL,
    active boolean DEFAULT false NOT NULL,
    account_email character varying NOT NULL,
    account_password_hash character varying NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 202 (class 1259 OID 57393)
-- Name: users_balances; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users_balances (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_id uuid NOT NULL,
    balance integer DEFAULT 0 NOT NULL,
    last_balance_updated_time timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.users_balances OWNER TO postgres;

--
-- TOC entry 3108 (class 0 OID 57414)
-- Dependencies: 204
-- Data for Name: balance_transactions; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.balance_transactions VALUES ('670bf431-a853-4cf4-bef1-d194c6e12423', '4752bd58-6428-4315-ae47-a8b099f01856', 1000, 'Deposit $10,00', '2023-09-07 23:10:45.331061-03');
INSERT INTO public.balance_transactions VALUES ('fd920d47-0a89-476d-ba7a-3679abcbea26', '4752bd58-6428-4315-ae47-a8b099f01856', 500, 'Deposit $5,00', '2023-09-07 23:10:45.331061-03');
INSERT INTO public.balance_transactions VALUES ('0b92aa00-a60e-45e8-844c-a1d1d8c3b6d3', '4752bd58-6428-4315-ae47-a8b099f01856', -1500, 'Withdraw $15,00', '2023-09-07 23:12:15.836658-03');
INSERT INTO public.balance_transactions VALUES ('e9a9fc18-506d-430a-879e-618e1ada273a', '4752bd58-6428-4315-ae47-a8b099f01856', -99, 'Tax $0,99', '2023-09-07 23:12:57.063109-03');
INSERT INTO public.balance_transactions VALUES ('7d40a91a-e5c6-4693-b642-70d85f42ac92', '4752bd58-6428-4315-ae47-a8b099f01856', -2000, 'Balance correction $-20,00', '2023-09-07 23:13:59.922145-03');


--
-- TOC entry 3114 (class 0 OID 57525)
-- Dependencies: 210
-- Data for Name: creditcard_balances; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3112 (class 0 OID 57498)
-- Dependencies: 208
-- Data for Name: creditcard_bills; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3109 (class 0 OID 57440)
-- Dependencies: 205
-- Data for Name: creditcard_purchases; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3110 (class 0 OID 57449)
-- Dependencies: 206
-- Data for Name: creditcard_purchases_v2; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3115 (class 0 OID 57548)
-- Dependencies: 211
-- Data for Name: creditcard_tradicional_cards; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3111 (class 0 OID 57468)
-- Dependencies: 207
-- Data for Name: creditcard_transactions; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3105 (class 0 OID 57375)
-- Dependencies: 201
-- Data for Name: ledgers; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3107 (class 0 OID 57401)
-- Dependencies: 203
-- Data for Name: ledgers_accounting; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3113 (class 0 OID 57511)
-- Dependencies: 209
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3106 (class 0 OID 57393)
-- Dependencies: 202
-- Data for Name: users_balances; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 2972 (class 2606 OID 57531)
-- Name: creditcard_balances creditcard_balances_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.creditcard_balances
    ADD CONSTRAINT creditcard_balances_pkey PRIMARY KEY (user_id);


--
-- TOC entry 2968 (class 2606 OID 57508)
-- Name: creditcard_bills creditcard_bills_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.creditcard_bills
    ADD CONSTRAINT creditcard_bills_pkey PRIMARY KEY (id);


--
-- TOC entry 2974 (class 2606 OID 57558)
-- Name: creditcard_tradicional_cards creditcard_cards_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.creditcard_tradicional_cards
    ADD CONSTRAINT creditcard_cards_pkey PRIMARY KEY (id);


--
-- TOC entry 2962 (class 2606 OID 57448)
-- Name: creditcard_purchases creditcard_purchases_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.creditcard_purchases
    ADD CONSTRAINT creditcard_purchases_pkey PRIMARY KEY (id);


--
-- TOC entry 2964 (class 2606 OID 57458)
-- Name: creditcard_purchases_v2 creditcard_purchases_v2_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.creditcard_purchases_v2
    ADD CONSTRAINT creditcard_purchases_v2_pkey PRIMARY KEY (id);


--
-- TOC entry 2966 (class 2606 OID 57478)
-- Name: creditcard_transactions creditcard_transactions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.creditcard_transactions
    ADD CONSTRAINT creditcard_transactions_pkey PRIMARY KEY (id);


--
-- TOC entry 2958 (class 2606 OID 57408)
-- Name: ledgers_accounting ledgers_history_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ledgers_accounting
    ADD CONSTRAINT ledgers_history_pkey PRIMARY KEY (id);


--
-- TOC entry 2954 (class 2606 OID 57379)
-- Name: ledgers ledgers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ledgers
    ADD CONSTRAINT ledgers_pkey PRIMARY KEY (id);


--
-- TOC entry 2960 (class 2606 OID 57420)
-- Name: balance_transactions transactions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.balance_transactions
    ADD CONSTRAINT transactions_pkey PRIMARY KEY (id);


--
-- TOC entry 2956 (class 2606 OID 57400)
-- Name: users_balances users_balances_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_balances
    ADD CONSTRAINT users_balances_pkey PRIMARY KEY (id);


--
-- TOC entry 2970 (class 2606 OID 57524)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


-- Completed on 2023-09-08 00:55:53

--
-- PostgreSQL database dump complete
--

