const mongoose = require('mongoose');
require('dotenv').config()

const db_url = `mongodb+srv://${process.env.db_username}:${process.env.db_password}@${process.env.db_cluster_link}/${process.env.db_name}?retryWrites=true&w=majority`
console.log(db_url)

module.exports = {
  connectToServer: function( callback ) {
    mongoose.connect( db_url,  { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log(`Connected to ${process.env.db_username}:${process.env.db_name} database.`) 
    )
    .catch(err => console.error('Could not connect to MongoDB...', err));
  }, 
};

