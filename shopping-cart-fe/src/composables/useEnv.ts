import baseAxios from '@/services/api/baseAxios';

let env: Partial<Record<keyof ImportMetaEnv, string>> = {};
let isLoaded: boolean = false;
let envLoadPromise: Promise<void> | null = null;

const loadEnv = async () => {
  if (isLoaded) {
    return;
  }

  if (envLoadPromise) {
    return envLoadPromise;
  }

  envLoadPromise = baseAxios
    .get<Record<string, string>>('./env.json')
    .then((res) => {
      env = res.data;
      isLoaded = true;
    })
    .finally(() => {
      envLoadPromise = null;
    });

  return envLoadPromise;
};

const getEnv = (key: keyof ImportMetaEnv, fallback?: string): string | undefined => {
  return env[key] ?? import.meta.env[key] ?? fallback;
};

export default function useEnv() {
  return {
    isLoaded,
    loadEnv,
    getEnv,
  };
}
