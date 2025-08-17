import dotenv from 'dotenv';
import { z } from 'zod';
// Load environment variables once
dotenv.config();
const ZEnv = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    PORT: z.coerce.number().default(5001),
    HOST: z.string().default('0.0.0.0'),
    ORIGIN: z.string().default('http://localhost:5001'),
    LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
    REQUEST_SIZE_LIMIT: z.string().default('1mb'),
    RATE_LIMIT_WINDOW_MS: z.coerce.number().default(60000),
    RATE_LIMIT_MAX: z.coerce.number().default(1000), // Increased from 100 to 1000
    // Supabase environment variables (optional)
    SUPABASE_URL: z.string().optional(),
    NEXT_PUBLIC_SUPABASE_URL: z.string().optional(),
    SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),
    SUPABASE_ANON_KEY: z.string().optional(),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().optional(),
});
// Parse and validate environment variables
export const env = ZEnv.parse(process.env);
// In development, allow both Vite dev server and API server origins
if (env.NODE_ENV === 'development') {
    env.ORIGIN = 'http://localhost:5173,http://localhost:5001';
}
