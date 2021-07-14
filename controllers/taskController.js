const {Task, validate} = require('../models/tasks');
const express = require('express');
const router = express.Router();
// const { paginate } = require('./paginate')

router.post('/' , async(req , res) => {
    try{
        const { error } = validate(req.body);
        if (error) return res.status(400).send({"err": 1 , "message" : error.details[0].message});

        let task = new Task({
            name: req.body.name,
            description: req.body.description,
            label: req.body.label,
            project: req.body.project,
        })

        await task.save().then((data) => {
            return res.status(200).send(data);
        }).catch((err) => {
            console.log(err)
            return res.send({"err": 1 , "message" : "There was some error adding Task."});
        })
    }catch(e){
        console.log(e)
        return res.status(500).send({"err": 1 , "message" : "Internal Server Error"});
    }
})

router.get('/', async (req, res) => {
    await Task.find().populate({path : 'project'}).then((data) => {
        return res.send(data)
    }).catch((err) => {
        return res.send({"err": 1 , "message" : "There was some error fetching records."});
    })
  });

router.put('/:id' , async(req , res) => {
    try{
        let id = req.params.id
        if(!id){
            return res.send({"err": 1 , "message" : "Not a valid id"});
        }

        await Task.updateOne({_id : id} , {$set : req.body})
            .then((data) => {
                return res.send({"err": 0 , "message" : "Updated successfully"});
            }).catch((err) => {
                return res.send({"err": 1 , "message" : "Error while updating."});
            })
    }catch(e){
        return res.status(500).send({"err": 1 , "message" : "Internal Server Error"});
    }
})

router.delete('/:id' , async (req , res) => {
    try{
        let id = req.params.id
        if(!id){
            return res.send({"err": 1 , "message" : "Provided ID is not valid"});
        }
        await Task.deleteOne({_id : id}).then((data) => {
            return res.send({"err": 0 , "message" : "Deleted successfully"});
        }).catch((err) => {
            return res.send({"err": 1 , "message" : "Error in model deletion"});
        })

    }catch(e){
        return res.status(500).send({"err": 1 , "message" : "Internal Server Error"});
    }
})
router.post('/sort/data' , async(req , res) => {
    try {
        // get the query params

        const { q, limit, offset } = req.query;
        const sort = req.body.sort
        let query = {}
        let findById = {}
        if (q){
            query.name = {'$regex': q, '$options': 'i'}
        }
        if (sort) {
            var sortOption = sort
        }
        if (!sort) {
            sortOption = {}
        }
        if (req.body.id){
            query.project =  req.body.id
        }
        if (!req.body.id){
            findById = {}
        }
        const task = await Task.find(query).sort(sortOption).limit(Number(limit)).skip(Number(offset))
        const taskCount = await Task.count(query)
        return res.status(200).send({
            total: taskCount,
            success: true,
            message: 'Fetched tasks',
            response: task,
        })
    } catch (error) {
        console.log('Failed to fetch task', error);
        return res.status(500).send({
            success: false,
            message: 'Failed to fetch task'
        })
    }
})

module.exports = router;
