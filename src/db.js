import dotenv from 'dotenv';
import { neon } from "@neondatabase/serverless";

dotenv.config();  

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined in .env file.");
}

const sql = neon(process.env.DATABASE_URL);

 export { sql };
