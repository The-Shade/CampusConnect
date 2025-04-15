const express = require('express');
const logger = new (require('./Utilities/LogTool'))("./LOGS/Server_Logs.txt");
const app = express();
const path = require('path');
const db = new (require('./Utilities/DatabaseManager'))();
app.use(express.json());
app.use(express.static(path.join(__dirname)));

const PORT = 3000;

app.post('/login/', (req, res) => {
    let result;
    if (req.body.status === 1001) {
        const user_data = {
            key: (req.body.name)? req.body.name: req.body.email,
            password: req.body.password
        };
        logger.Log({status: 1001, message: `Successfully received data for name/email: ${user_data.key}`});
        result = db.login(user_data);
    } else {
        logger.ErrorLog(req.body);
        result = req.body;
    }

    if (result.status === 1004) logger.ErrorLog(result);
    else if (result.status === 1003) logger.Log({status: 1003, message: `Login successful userid: ${result.userid}`});
    res.send(result);
});

app.post('/registration/', (req, res) => {
    let result;
    if (req.body.status === 1005) {
        const user_data = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role
        };
        logger.Log({status: 1005, message: `Successfully received data for ${user_data.role}: ${user_data.name}`});
        result = db.register(user_data);
    } else {
        logger.ErrorLog(req.body);
        result = req.body;
    }

    if (result.status === 1008) logger.ErrorLog(result);
    else if (result.status === 1007) logger.Log({status: 1007, message: `Registration successful userid: ${result.userid}`});
    res.send(result);
});

app.post('/post/creation/', (req, res) => {

});

app.listen(PORT, '0.0.0.0', (error) => {
    if (error) logger.ErrorLog({status: 0, error: error});
    else logger.Log({status: 1, message: `Server running on port ${PORT}`});
});