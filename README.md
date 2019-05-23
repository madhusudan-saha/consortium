Please follow the following instructions to get the app running.


1. Install mongodb.
2. Open a terminal window and "cd part3/backend".
3. mkdir -p ./db && mongod --dbpath ./db
4. Install ganache or ganache-cli and make sure it is running on port 8545.
5. Open another terminal window and do "npm start" (Path: part3/backend). Wait till you see "Server is running on Port: 4000" on terminal.
6. cd part3/frontend
7. npm start
8. The web app is now available on "localhost:3000".

Dummy users and products already available -

Users:
{"userId": 1, "username": "Airlines A", "password": "xyz", "airlines": "yes", "address": addresses[0], "registered": "yes"},
{"userId": 2, "username": "Airlines B", "password": "xyz", "airlines": "yes", "address": addresses[1], "registered": "yes"},
{"userId": 3, "username": "Mr. X", "password": "xyz", "airlines": "no", "address": addresses[2], "registered": "yes"},
{"userId": 4, "username": "Mr. Y", "password": "xyz", "airlines": "no", "address": addresses[3], "registered": "yes"}

Tickets:
{"ticketNumber": 1, "date": "2019-05-02", "destination": "Seattle", "price": 10, "user": "Mr. X", "airlines": "Airlines A"},
{"ticketNumber": 2, "date": "2019-05-03", "destination": "New York", "price": 10, "user": "Mr. Y", "airlines": "Airlines A"}

To manually clear the database -

1. mongo
2. use ask
3. db.runCommand( { dropDatabase: 1 } )

To compile smart contract (Already compiled) -

1. cd part3/backend/contracts  
2. ../node_modules/.bin/solcjs --bin --abi Ask.sol
