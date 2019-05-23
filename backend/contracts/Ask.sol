pragma solidity ^0.5.1;

contract Ask {
    
    constructor() public payable {
    }
    
    struct Ticket {
        uint ticketNumber;
        uint price;
        uint status;
    }
    
    struct User {
        uint userId;
        bool registered;
    }
    
    mapping (address => User) users;
    mapping (uint => Ticket) tickets;
     
    function register(address _address, uint _id) public {
        require(_id >= 0);
        
        User storage user = users[_address];
        user.userId = _id;
        user.registered = true;
    }
    
    function unregister(address _address) public {
        User storage user = users[_address];
        user.registered = false;
    }
    
    function request(uint ticketNumber) public {
        require(ticketNumber > 0); 
        
        Ticket storage ticket = tickets[ticketNumber];
        ticket.status = 1;
    }
    
    function approveReject(uint status, uint ticketNumber) public {
        require(status > 1); 
        
        Ticket storage ticket = tickets[ticketNumber];
        ticket.status = status;
    }
    
    function viewBalance() public view returns(uint) {
        return msg.sender.balance;
    }
}