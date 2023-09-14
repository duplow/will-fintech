import { MigrationInterface, QueryRunner } from 'typeorm'

export class Setup1694687797971 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;

      CREATE TYPE public.creditcard_bill_status AS ENUM (
        'PENDING',
        'PAID',
        'OVERDUE'
      );

      CREATE TYPE public.creditcard_transaction_status AS ENUM (
        'PENDING',
        'CONSOLIDATED',
        'CANCELED'
      );

      CREATE TYPE public.user_kind AS ENUM (
        'CUSTOMER',
        'COLLABORATOR'
      );

      CREATE TABLE IF NOT EXISTS public.users (
        id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
        kind public.user_kind DEFAULT 'CUSTOMER'::public.user_kind NOT NULL,
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
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE IF EXISTS public.users;
      DROP TYPE IF EXISTS public.user_kind;
      DROP TYPE IF EXISTS public.creditcard_bill_status;
      DROP TYPE IF EXISTS public.creditcard_transaction_status;
    `)
  }
}
