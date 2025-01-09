import { encryptURL, decryptURL } from "./methods/AES-CBC";

const url = "https://example.com/page?param=value";

(async () => {
  // Encrypt the URL
  const encryptedURL = await encryptURL(url);
  console.log("Encrypted URL:", encryptedURL);

  // Decrypt the URL
  const decryptedURL = await decryptURL(encryptedURL);
  console.log("Decrypted URL:", decryptedURL);
})();
