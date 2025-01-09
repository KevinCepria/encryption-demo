const key = "eerrRwNmKi3qJWoAByBL9pKeDQVVfAta"; // 32 bytes
const iv = "MN1vX3A0vdn7XqY2"; // 16 bytes

const encoder = new TextEncoder();
const decoder = new TextDecoder();

const ivBuffer = encoder.encode(iv);
const keyBuffer = encoder.encode(key);

export const encryptURL = async (url: string) => {
  // Convert URL to ArrayBuffer
  const urlBuffer = encoder.encode(url);

  // Convert Key from ArrayBuffer to CryptoKey object
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    keyBuffer,
    { name: "AES-CBC" },
    false,
    ["encrypt"]
  );

  // Encryption
  const encryptedBuffer = await crypto.subtle.encrypt(
    { name: "AES-CBC", iv: ivBuffer },
    cryptoKey,
    urlBuffer
  );

  // Convert encrypted data to Base64 for URL encoding
  return encodeURIComponent(
    btoa(String.fromCharCode(...new Uint8Array(encryptedBuffer)))
  );
};

export const decryptURL = async (encryptedURL: string) => {
  // Decode the encrypted URL-safe Base64 string then to ArrayBuffer
  const encryptedBase64 = decodeURIComponent(encryptedURL);
  const encryptedBuffer = Uint8Array.from(atob(encryptedBase64), (c) =>
    c.charCodeAt(0)
  );

  // Convert Key from ArrayBuffer to CryptoKey object
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    keyBuffer,
    { name: "AES-CBC" },
    false,
    ["decrypt"]
  );

  // Decryption
  const decryptedBuffer = await crypto.subtle.decrypt(
    { name: "AES-CBC", iv: ivBuffer },
    cryptoKey,
    encryptedBuffer
  );

  // Decode the decrypted data to a string
  return decoder.decode(decryptedBuffer);
};
