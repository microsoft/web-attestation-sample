# Web Attestation Test Issuer

## Setup

Make sure [node.js](https://nodejs.org/) and [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) are installed on your system; the latest Long-Term Support (LTS) version is recommended for both. 

Build the `npm` package:
```
npm install
npm run build
```

Create the issuer key pair:
```
npm run setup-issuer
```

Deploy the issuer server:
```
npm run deploy-issuer
```

Optionally, test the server by running:
```
npm run test-issuer
```

