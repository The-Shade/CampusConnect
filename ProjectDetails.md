# Project Data

## Status Codes
 - Impossible Error => 99999
 - Server start: Successful: 1; Unsuccessful: 2;
 - Database Connection: Successful: 3; Unsuccessful: 4;
### User Data Codes
 - Login message from:
   - client to server => Successful: 1001; Unsuccessful: 1002;
   - server to client => Successful: 1003; Unsuccessful: 1004;
 - Registration message from:
   - client to server => Successful: 1005; Unsuccessful: 1006;
   - server to client => Successful: 1007; Unsuccessful: 1008;
 - Registration mail check:
   - generated from server => Successful: 1009; Unsuccessful: 1010;
   - generated from client => Successful: 1011; Unsuccessful: 1012;
### Post Codes
 - Post Creation from:
   - client to server => Successful: 2001; Unsuccessful: 2002;
   - server to client => Successful: 2003; Unsuccessful: 2004;
 - Post Update from:
   - client to server => Successful: 2005; Unsuccessful: 2006;
   - server to client => Successful: 2007; Unsuccessful: 2008;
 - Post Delete from:
   - client to server => Successful: 2009; Unsuccessful: 2010;
   - server to client => Successful: 2011; Unsuccessful: 2012;
### Comment Codes
 - Comment Creation from:
   - client to server => Successful: 3001; Unsuccessful: 3002;
   - server to client => Successful: 3003; Unsuccessful: 3004;
 - Comment Deletion from:
   - client to server => Successful: 3005; Unsuccessful: 3006;
   - server to client => Successful: 3007; Unsuccessful: 3008;


## Message Formats
### Login message
#### Client to server
message = {
status int,
[(name string or email string, password string), error]
}
#### Server to client
message = {
status int,
[(userid string, token_expiration_time datetime), error]
}
### Registration Message
#### Client to Server
message = {
status int,
[(name string, email string, password string(hashed?), role string), error]
}
#### Server to client
message = {
status int,
[(userid string, token_expiration_time datetime), error]
}

*client side error messages are for integrity constraints on client side (ex - null values), usually not sent to server*