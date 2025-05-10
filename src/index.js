const express=require('express');
const app = express();
const bodyParser = require('body-parser');

const {PORT} = require('./config/serverConfig') ;
const apiRoutes = require('./routes/index');
const db= require('/models/index');

const setupAndStartServer = ()=> {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    
    app.use('/api', apiRoutes);

    app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`);
        if(process.env.DB_SYNC){
            db.sequelie.sync({alter:true});
        }
    });
}

setupAndStartServer();