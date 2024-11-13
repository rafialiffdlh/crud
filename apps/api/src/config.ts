import { config } from 'dotenv';
import { resolve } from 'path';

export const NODE_ENV = process.env.NODE_ENV || 'development';

const envFile = NODE_ENV === 'development' ? '.env.development' : '.env';


// Load all environment variables from .env file

export const BASE_URL = process.env.BASE_URL || 'http://localhost';
export const WEB_URL = process.env.WEB_URL || 'http://localhost:3000';
export const PORT = process.env.PORT || 8000;
export const DATABASE_URL = process.env.DATABASE_URL || '';
