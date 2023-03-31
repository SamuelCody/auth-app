### Technologies Used

- [![Next][next.js]][next-url]
- [![React][react.js]][react-url]
- [![Typescript][typescript]][typescript-url]

## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

You need to install npm

- npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Set up a mongodb database on [https://www.mongodb.com](https://www.mongodb.com/)
2. Clone the repo
   ```sh
   git clone https://github.com/SamuelCody/auth-app.git
   ```
3. `cd` into the project and install NPM packages
   ```sh
   npm install
   ```
4. Enter your DATABASE_URL and NEXTAUTH_URL in `.env` file in the root directory
   ```js
   DATABASE_URL = "ENTER DATABASE URL";
   NEXTAUTH_URL = "http://localhost:3000";
   ```
5. Open a terminal and `cd` into the project and create the collections in your database. Using the Prisma CLI tool, run the below in your terminal
   ```js
   npx prisma db push
   ```
6. Start the project using:
   ```js
   npm run dev
   ```

[next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[next-url]: https://nextjs.org/
[react.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[react-url]: https://reactjs.org/
[typescript]: https://img.shields.io/badge/Typescript-20232A?style=for-the-badge&logo=typescript&logoColor=61DAFB
[typescript-url]: https://www.typescriptlang.org/
