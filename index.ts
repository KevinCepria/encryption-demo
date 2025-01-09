import {
  encryptURL as aesGcmEncryptUrl,
  decryptURL as aesGcmDecryptUrl,
} from "./methods/AES-GCM";

import {
  encryptURL as aesCbcEncryptUrl,
  decryptURL as aesCbcDecryptUrl,
} from "./methods/AES-CBC";

const url = "https://example.com/page?param=value";

(async () => {
  console.log("------------------ENCRYPTION DEMO------------------\n");
  console.log("-----AES-256(AES-GCM)-----\n");

  console.log("Given URL: ", url, "\n");
  const aesGcmEncryptedURL = await aesGcmEncryptUrl(url);
  console.log("Encrypted URL:", aesGcmEncryptedURL, "\n");

  // Decrypt the URL
  const aesGcmDecryptedURL = await aesGcmDecryptUrl(aesGcmEncryptedURL);
  console.log("Decrypted URL:", aesGcmDecryptedURL, "\n");

  console.log("-----AES-256(AES-CBC)-----\n");

  console.log("Given URL: ", url, "\n");
  const aesCbcEncryptedURL = await aesCbcEncryptUrl(url);
  console.log("Encrypted URL:", aesCbcEncryptedURL, "\n");

  // Decrypt the URL
  const aesCbcDecryptedURL = await aesCbcDecryptUrl(aesCbcEncryptedURL);
  console.log("Decrypted URL:", aesCbcDecryptedURL, "\n");

  console.log("------------------DEMO END------------------\n");
})();
