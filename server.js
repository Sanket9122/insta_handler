const express = require('express');


const { ServerConfig, dbConnect } = require('./config');
const apiRoutes = require('./routes');
const { sequelize } = require('./config');
const cookieParser = require('cookie-parser');
const { User } = require('./models/user.model');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use('/api', apiRoutes);


(async () => {
  await dbConnect();
  await sequelize.sync({alter:true});
})();

app.listen(ServerConfig.PORT, () => {
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
});



