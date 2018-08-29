# Galacticode
_Galacticode uses a 3D gaming interface to guide users through increasingly difficult JavaScript challenges._

Nova the alien is lost in space and needs help getting home after running out of fuel on an unfamiliar planet. Use your foundational JavaScript skills to solve coding challenges, gain fuel points, unlock planets, and guide Nova home.

## How to Play
Sign in with a Google or GitHub account and select a planet from the main screen to play. Once on the planet, use the arrow or WASD keys to move Nova around. Coding challenges are rendered as green cones on the planet’s surface. Move Nova up to a cone to begin a challenge or click “View as List” on the bottom of the screen to select a challenge by name instead. 

Once in a coding challenge, read the prompt instructions and examples before writing your solution. When you’re ready to submit your code, click the “Run” button below the code editor and wait for your results to populate on the “Output” tab. If you’ve passed all of the tests, you’ll receive points in your fuel bar. Otherwise, you’ll be able to re-attempt the challenge after making some changes. 

When your fuel bar reaches 100 points, you’ll unlock the next planet on the home screen. Planets contain an additional set of coding challenges at progressively higher difficulty levels. 

At any time, you can access your account details to view a list of challenges you’ve already completed along with solutions. You’ll also be able to see the furthest planet you’ve unlocked.

_At the moment, Galacticode supports just two planets._

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

### Set-Up

Galacticode runs in a Node environment and requires a postgreSQL database named “galacticode.” You’ll also need to create a database for testing called “galacticode-testing.”

Fork and/or clone this repository to create your own local copy and follow the instructions below.

### Installation

Install dependencies for the project with

```
npm install
```

And run the seed file with

```
npm run seed
```

## Deployment
Galacticode is deployed on Heroku at [https://galacticode.herokuapp.com/](https://galacticode.herokuapp.com/). 

If you have a local copy of this repository, start a localhost server in development mode by running

```
npm run start-dev
```

## Built With

Technology | Description
------------ | -------------
[Node.js](https://www.npmjs.com/) | Runtime environment and npm package manager
[Express](https://expressjs.com/) | The web framework used
[PostgreSQL](https://postgresapp.com/) | Relational database
[Sequelize](http://docs.sequelizejs.com/) | promise-based ORM 
[React](https://reactjs.org/) | Used to build main components
[Redux](https://redux.js.org/) | Used to store game state
[Docker](https://www.docker.com/) | Used to securely run user’s code. 
[Ace](https://ace.c9.io/) | Embedded editor for user input.
[Three.js](https://threejs.org/) | webGL
[Mochawesome](https://www.npmjs.com/package/mochawesome) | Used to transform test results into JSON file

## Authors

[Daryl Concha](https://github.com/DC-1680), [Amy De Genaro](https://github.com/amydegenaro), [Rebecca Eom](https://github.com/mye391), [Katherine Pangtay](https://github.com/kpangtay)
