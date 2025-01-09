## Encryption/Decryption Implementation

The API used for the encryption/decryption implementation is the **[Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API)**, which is native to JavaScript. Note that **CryptoJS** is no longer in active development. For more details, see the [CryptoJS Discontinued Notice](https://github.com/brix/crypto-js?tab=readme-ov-file#discontinued).

### Running the project

1. Install dependencies `npm install`
2. Run `npm run tsc`
3. Run `node dist/index.js`

## Introduction

### AES-CBC
32bytes (AES-256) keys are used in this repo

**AES-CBC (Advanced Encryption Standard - Cipher Block Chaining)** is a mode of operation for AES hat provides encryption only.In this operation, each plaintext block is combined with the previous ciphertext block before being encrypted. The first block uses an Initialization Vector (IV) instead of a previous ciphertext block. It does not provide built-in integrity verification.

### AES-GCM
**AES-GCM (Advanced Encryption Standard - Galois/Counter Mode)** is a mode of operation for AES that provides both encryption and integrity verification. The plaintext is encrypted using a counter value, which is incremented for each block of data. It includes an **authentication tag** to ensure that the data hasn't been tampered with. The encryption is done in parallel, meaning there’s no dependency on the previous block of data.

## Comparison Table

| Feature                     | AES-GCM                             | AES-CBC                             |
|-----------------------------|--------------------------------------|--------------------------------------|
| **Security**                | Provides encryption + integrity (authenticated encryption). | Provides encryption only. No integrity check. |
| **Performance**             | Faster, especially on modern hardware. | Slower due to sequential block dependency. |
| **Use Case**                | Recommended for most modern applications requiring secure data transmission. | Useful in scenarios where only encryption is needed. |
| **IV Requirement**          | 12-byte IV recommended.             | 16-byte IV required.                |
| **Authentication Tag**      | Yes, included in the output.         | No.                                 |
| **Output Size**             | Slightly larger due to authentication tag. | Same size as input (plus padding).  |
