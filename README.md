# logabug

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

> Detailed issue reporting made trivial
## Setup

After cloning the repo, install the required dependencies using `npm`:

```bash
npm install
```

Create a `.env.local` file in the root of the project with the following environment variables:

```bash
# Can be obtained from your firebase configuration
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
```

Now the development server can be run:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

