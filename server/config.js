import dotenv from 'dotenv';
dotenv.config();

function required(key, defaultValue = undefined) {
  const value = process.env[key] || defaultValue;
  if (value === null) {
    throw new Error(`Key ${key} is undefined`);
  }
  return value;
}

export const config = {
  jwt: {
    accessKey: required('JWT_ACCESS'),
    refreshKey: required('JWT_REFRESH'),
    accExpiresIn: required('JWT_EXPIRES_ACCESS', '7d'),
    refExpiresIn: required('JWT_EXPIRES_REFRESH', '30d')
  },
  bcrypt: {
    saltRounds: parseInt(required('BCRYPT_SALT_ROUNDS', 12))
  },
  host: {
    port: parseInt(required('HOST_PORT', 8080))
  },
  db: {
    host: required('DB_HOST'),
    user: required('DB_USER'),
    database: required('DB_DATABASE'),
    password: required('DB_PASSWORD')
  },
  PORT: required('PORT')
};
