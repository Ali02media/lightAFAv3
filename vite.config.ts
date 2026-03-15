
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, (process as any).cwd(), '');
  
  const getEnvVar = (key: string) => {
    return JSON.stringify(env[key] || process.env[key] || "");
  };

  return {
    plugins: [react()],
    define: {
      // API_KEY is handled securely by Netlify Functions (Backend)
      // Google Sheets URL for the contact form intake
      'process.env.GOOGLE_SHEETS_URL': JSON.stringify("https://script.google.com/macros/s/AKfycbwpuMld9arZAH3IfkSSJij7dnSSYoe_ASo1ya5bXr9Z_nRVZh4VtrzOuQXAhAYyjoH7Qg/exec")
    },
    build: {
      outDir: 'dist',
      sourcemap: false
    },
    base: '/'
  };
});
