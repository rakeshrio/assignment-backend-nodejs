
const projectController       = require('../controllers/projectController');
const taskController       = require('../controllers/taskController');

/**
 * 
 * @param {import('express').Application} app 
 */
module.exports = function(app) {

  app.use('/api/project' , projectController)
  app.use('/api/task' , taskController)

  app.get('/', (req, res)=>{
    res.send('you are not authorized to view this page')
  })
};