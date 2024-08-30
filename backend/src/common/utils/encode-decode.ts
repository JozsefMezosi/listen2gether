import { createCipheriv, createDecipheriv, createHash } from 'crypto';

const key = createHash('sha512')
  .update(process.env.ENC_KEY)
  .digest('hex')
  .substring(0, 32);
const encryptionIV = createHash('sha512')
  .update(process.env.ENC_IV)
  .digest('hex')
  .substring(0, 16);

export const encrypt = (text: string): string => {
  const cipher = createCipheriv('AES-256-CBC', key, encryptionIV);
  return cipher.update(text, 'utf-8', 'hex') + cipher.final('hex');
};

export const decrypt = (text: string): string => {
  const decipher = createDecipheriv('AES-256-CBC', key, encryptionIV);
  return decipher.update(text, 'hex', 'utf-8') + decipher.final('utf-8');
};
