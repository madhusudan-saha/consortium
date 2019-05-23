const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const fs = require('fs');
const Web3 = require('web3');

const routes = express.Router();
const PORT = 4000;
let User = require('./src/models/user');
let Ticket = require('./src/models/ticket');
let Request = require('./src/models/request');

app.use(cors());
app.use(bodyParser.json());
mongoose.connect('mongodb://127.0.0.1:27017/ask', { useNewUrlParser: true });
const connection = mongoose.connection;
const usersColl = connection.collection('users');
const ticketsColl = connection.collection('tickets');
const requestsColl = connection.collection('requests');

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
bytecode = fs.readFileSync('./contracts/Ask_sol_Ask.bin').toString()
abi = JSON.parse(fs.readFileSync('./contracts/Ask_sol_Ask.abi').toString())
const contract = new web3.eth.Contract(abi);

let deployedContract;
let addresses;
let count;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

routes.route('/users').get(function(req, res) {
    usersColl.find().toArray(function(err, users) {
        if (err) {
            console.log(err);
        } else {
            res.send(JSON.stringify(users));
        }
    });
});

routes.route('/tickets').get(function(req, res) {
    ticketsColl.find().toArray(function(err, tickets) {
        if (err) {
            console.log(err);
        } else {
	    res.send(JSON.stringify(tickets));
        }
    });
});

routes.route('/requests').get(function(req, res) {
    requestsColl.find().toArray(function(err, requests) {
        if (err) {
            console.log(err);
        } else {
	    res.send(JSON.stringify(requests));
        }
    });
});

routes.route('/request').post(function(req, res) {
    let r = new Request();

    r.user = req.body.username;
    r.ticketNumber = Number(req.body.ticketNumber);
    r.date = req.body.date;
    r.reason = req.body.reason;
    r.status = "Requested";
	    
    ticketsColl.findOne({'ticketNumber': r.ticketNumber}, function(err, ticket) {
	if (ticket) {
	    r.destination = ticket.destination;
	    r.amount = 20;
	    r.airlines =ticket.airlines;
	    
	    usersColl.findOne({'username': req.body.username}, function(err, user) {
		if (user) {
		    deployedContract.methods.request(r.ticketNumber).send({from: user.address}).then(function(txHash) {
			console.log("Request: "+JSON.stringify(txHash));

			requestsColl.insertOne(r)
			    .then(r => {
				requestsColl.find().toArray(function(err, requests) {
				    if (err) {
					console.log(err);
				    } else {
					res.send(JSON.stringify(requests));
				    }
				});
			    })
			    .catch(err => {
				res.status(400).send("Insert not possible!");		   
			    });
		    });
		}
	    });
	}
    });
});

routes.route('/approve_reject').post(function(req, res) {
    requestsColl.findOne({'ticketNumber': req.body.ticketNumber}, function(err, request) {
	if (request) {
	    request.status = req.body.action;
	    
	    usersColl.findOne({'username': req.body.username}, function(err, airlines) {
		if(airlines) {
		    usersColl.findOne({'username': request.user}, function(err, user) {
			if (user) {
			    let status = 1;
			    if(request.status === "Approved") {
				status = 2;
			    }
			    else if(request.status === "Rejected") {
				status = 3;
			    }
			    
			    console.log(user.address);
			    console.log(status);
			    console.log(request.ticketNumber);
			    console.log(airlines.address);
			    deployedContract.methods.approveReject(status, request.ticketNumber).send({from: airlines.address}).then(function(txHash1) {
				console.log("Approve/Reject: "+JSON.stringify(txHash1));
				
				requestsColl.updateOne({'ticketNumber': req.body.ticketNumber}, {$set: {"status": request.status}})
				    .then(r => {
					if(status == 2) {
				    	    ticketsColl.updateOne({'ticketNumber': req.body.ticketNumber}, {$set: {"date": request.date, "destination": request.destination, "airlines": req.body.username}})
						.then(t => {	
						    requestsColl.find().toArray(function(err, requests) {
							if (err) {
							    console.log(err);
							} else {
							    web3.eth.sendTransaction({from: user.address, to: airlines.address, value: web3.utils.toWei('10', 'ether')})
								.then((result) => {
								    console.log(result);
								    deployedContract.methods.viewBalance().call({from: user.address}, (error, data1) => {
									deployedContract.methods.viewBalance().call({from: airlines.address}, (error, data2) => {
									    console.log("User wallet: " + data1);
									    console.log("Airlines wallet: " + data2);
									    
									    res.send(JSON.stringify(requests));
									});
								    });
								});
							}
						    });
						})
					    	.catch(err => {
						    res.status(400).send("Update not possible!");
						});
					}
					else if(status == 3) {
					    requestsColl.find().toArray(function(err, requests) {
						if (err) {
						    console.log(err);
						} else {
						    res.send(JSON.stringify(requests));
						}
					    });
					}
				    })
				    .catch(err => {
					res.status(400).send("Update not possible!");
				    });
			    });
			}
		    });
		}
	    });
	}
    });    
});

routes.route('/register_user').post(function(req, res) {
    usersColl.findOne({'username': req.body.username}, function(err, user) {
        if (user) {
	    res.send("User already exists!");
	}
        else {
	    let u = new User();
	    u.userId = Number(req.body.userId);
	    u.username = req.body.username;
	    u.password = req.body.password;
	    u.airlines = req.body.airlines;
	    u.ticketNumber = Number(req.body.ticketNumber);
	    u.address = addresses[count];
	    u.registered = "yes";
	    count++;
	    
	    deployedContract.methods.register(u.address, u.userId).send({from: addresses[0]}).then(function(txHash){
		console.log("Register: "+JSON.stringify(txHash));
		
		    usersColl.insertOne(u)
		    .then(u => {
			res.json('User registered!');
		    })
		    .catch(err => {
			res.status(400).send("Insert not possible!");
		    });
	    });
	}
    });
});

routes.route('/login').post(function(req, res) {
    usersColl.findOne({'username': req.body.username,
		       'password': req.body.password,
		       'registered': 'yes'}, function(err, user) {
			   if(user) {
			       res.json(user);
			   }
			   else {
			       res.send("Login failed.");
			   }
		       });
});

routes.route('/unregister_user').post(function(req, res) {
    usersColl.findOne({'username': req.body.username}, function(err, user) {
        if (user) {
	    deployedContract.methods.unregister(user.address).send({from: addresses[0]}).then(function(txHash){
		console.log("Unregister: "+JSON.stringify(txHash));
		
		usersColl.updateOne({"username": user.username}, {$set: {"registered": "false"}})
		    .then(u => {
			res.json('User unregistered!');
		    })
		    .catch(err => {
			res.status(400).send("Update not possible!");
		    });
	    });
	}
    });
});

function onInsert(err, docs) {
    if (err) {
	console.log(err);
    } else {
        console.log('%d documents were successfully stored.', docs.length);
    }
}

web3.eth.getAccounts().then((accounts) => {
    addresses = accounts;
    
    contract.deploy({data: bytecode, arguments: []}).send({from: accounts[0], gas: 4700000, value: 100})
	.then((result) => {
	    deployedContract = result;
	    
	    let dummyUsers = [
		{"userId": 1, "username": "Airlines A", "password": "xyz", "airlines": "yes", "address": addresses[0], "registered": "yes"},
		{"userId": 2, "username": "Airlines B", "password": "xyz", "airlines": "yes", "address": addresses[1], "registered": "yes"},
		{"userId": 3, "username": "Mr. X", "password": "xyz", "airlines": "no", "address": addresses[2], "registered": "yes"},
		{"userId": 4, "username": "Mr. Y", "password": "xyz", "airlines": "no", "address": addresses[3], "registered": "yes"}
	    ]
	    count = 1;
	    let dummyTickets = [
		{"ticketNumber": 1, "date": "2019-05-02", "destination": "Seattle", "price": 10, "user": "Mr. X", "airlines": "Airlines A"},
		{"ticketNumber": 2, "date": "2019-05-03", "destination": "New York", "price": 10, "user": "Mr. Y", "airlines": "Airlines A"}
	    ]
	    
	    deployedContract.methods.register(addresses[0], 1).send({from: addresses[0]}).then(function(rHash1){
		console.log("Register: "+JSON.stringify(rHash1));
		deployedContract.methods.register(addresses[1], 2).send({from: addresses[1]}).then(function(rHash2){
		    console.log("Register: "+JSON.stringify(rHash2));
		    deployedContract.methods.register(addresses[2], 3).send({from: addresses[2]}).then(function(rHash3){
			console.log("Register: "+JSON.stringify(rHash3));
			deployedContract.methods.register(addresses[3], 4).send({from: addresses[3]}).then(function(rHash4){
			    console.log("Register: "+JSON.stringify(rHash4));
			    
			    usersColl.insert(dummyUsers, onInsert);
			    ticketsColl.insert(dummyTickets, onInsert);
			    
			    app.use('/ask', routes);
			    app.listen(PORT, function() {
				console.log("Server is running on Port: " + PORT);
			    });
			});
		    });
		});
	    });	
	})
    	.catch(err => {
	    console.log(err);
	});
});

