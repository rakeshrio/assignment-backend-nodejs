const express = require('express');
const { json } = require('body-parser');
var cors = require('cors');
var mongoUtil = require('./config/mongodb');

const app = express();
app.use(json());
app.use(cors())
 

mongoUtil.connectToServer( function( err, client ) {
  if (err) console.log(err);
} );
require("./routes/index")(app);


const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}...`));