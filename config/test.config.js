import dotenv from 'dotenv';

dotenv.config();

const env = process.env.ENV || 'qat';

const baseUrlMap = {
  sit: process.env.SIT_BASE_URL,
  dt2: process.env.DT2_BASE_URL,
  qat: process.env.QAT_BASE_URL,
};

const baseUrl = baseUrlMap[env];

if (!baseUrl) {
  throw new Error(`Base URL not defined for ENV=${env}`);
}

export const config = {
  baseUrl,
  timeout: 15000,
  headless: false,
  browser: 'chrome',
};
