const key = "eerrRwNmKi3qJWoAByBL9pKeDQVVfAta"; // 32 bytes
const iv = "MN1vX3A0vdn7"; // 12 bytes

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
    { name: "AES-GCM" },
    false,
    ["encrypt"]
  );

  // Encryption
  // Authentication tag is automatically included in the encrypted output by AES-GCM
  const encryptedBuffer = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv: ivBuffer },
    cryptoKey,
    urlBuffer
  );

  // Convert encrypted data to Base64 for URL encoding
  const encryptedData = new Uint8Array(encryptedBuffer);
  const encryptedBase64 = btoa(String.fromCharCode(...encryptedData));

  // Convert IV to Base64 for URL encoding
  const ivBase64 = btoa(iv);

  // Combine IV and encrypted data for transmission
  // It is standard practice to concat the IV base64 string to the encrypted value.
  // Can be removed if we intend to save IV value in the frontend
  return encodeURIComponent(ivBase64 + encryptedBase64);
};

export const decryptURL = async (encryptedURL: string) => {
  // Decode the URL-safe Base64 string
  const decodedBase64 = decodeURIComponent(encryptedURL);

  // Decode the encrypted URL-safe Base64 string
  const encryptedDataBase64 = decodedBase64.slice(16);
  const encryptedData = new Uint8Array(
    atob(encryptedDataBase64)
      .split("")
      .map((c) => c.charCodeAt(0))
  );

  // Convert Key from ArrayBuffer to CryptoKey object
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    keyBuffer,
    { name: "AES-GCM" },
    false,
    ["decrypt"]
  );

  // Decryption
  const decryptedBuffer = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: ivBuffer },
    cryptoKey,
    encryptedData
  );

  // Decode the decrypted data to a string
  return decoder.decode(decryptedBuffer);
};
