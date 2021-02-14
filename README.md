# Smart Tourism Server

[Representational state transfer (REST)](https://en.wikipedia.org/wiki/Representational_state_transfer) server using [Express.js](https://expressjs.com/) and [MongoDB](https://www.mongodb.com/).
This server is written in [Node.js](https://nodejs.org/en/) and using some libraries or frameworks like MongoDB as the server database (with [mongoose](https://mongoosejs.com/) as the client library) and Express.js as the HTTP framework.
This server uses [HTTP methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) to handle the requested [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) operation, then process it to the MongoDB database.

We created this project as part of the Smart Tourism project that consists of several parts like [database server](https://github.com/threeal/smart-tourism-server), [card scanner device](https://github.com/threeal/smart-tourism-device), [administrator website](https://github.com/threeal/smart-tourism-web), and [location's direction app](https://github.com/threeal/smart-tourism-app).
Smart Tourism project is a system for smart tourism that improves the impression of tourism sites using an electronic card to enter and exit locations, a website that monitors and show statistic for each location, and AR app for visitors to show location's direction.
This project is undertaken to fulfill the Telematics Projects course in the [Computer Engineering department](https://www.its.ac.id/study-at-its/faculties-and-departments/faculty-electrical-technology/computer-engineering/) of [Sepuluh Nopember Institute of Technology](https://www.its.ac.id/).

## Usage

- Install Node.js as in their [official guide](https://nodejs.org/en/download/).
  > As an alternative, you may install Node.js using the [NVM](https://github.com/nvm-sh/nvm).
- Install MongoDB as in their [official guide](https://docs.mongodb.com/manual/installation/).
- Install Yarn as in their [official guide](https://classic.yarnpkg.com/en/docs/install/).
  > If you don't want to use Yarn, you may skip this step and use NPM instead.
- Open this project directory in terminal, and initialize the dependencies.
  ```bash
  $ yarn install
  ```
- Run the server using the following command.
  ```bash
  $ yarn start
  ```
  > (Optional), after filling some data, you may run `$ yarn fill` to automatically fill the visitation data.
