const {Project, validate} = require('../models/project');
const express = require('express');
const router = express.Router();

router.post('/' , async(req , res) => {
    try{
        const { error } = validate(req.body);
        if (error) return res.status(400).send({"err": 1 , "message" : error.details[0].message});

        let project = new Project({
            name: req.body.name,
            summary: req.body.summary,
            description: req.body.description
        })

        await project.save().then((data) => {
            return res.status(200).send(data);
        }).catch((err) => {
            console.log(err)
            return res.send({"err": 1 , "message" : "There was some error adding project."});
        })
    }catch(e){
        return res.status(500).send({"err": 1 , "message" : "Internal Server Error"});
    }
})

router.get('/', async (req, res) => {
    await Project.find().then((data) => {
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

        await Project.updateOne({_id : id} , {$set : req.body})
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
        await Project.deleteOne({_id : id}).then((data) => {
            return res.send({"err": 0 , "message" : "Deleted successfully"});
        }).catch((err) => {
            return res.send({"err": 1 , "message" : "Error in model deletion"});
        })

    }catch(e){
        return res.status(500).send({"err": 1 , "message" : "Internal Server Error"});
    }
})

router.post('/data' , async(req , res) => {
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
            query._id =  req.body.id
        }
        if (!req.body.id){
            findById = {}
        }
        const project = await Project.find(query).sort(sortOption).limit(Number(limit)).skip(Number(offset))
        const projectCount = await Project.countDocuments(query)
        return res.status(200).send({
            total: projectCount,
            success: true,
            message: 'Fetched projects',
            response: project,
        })
    } catch (error) {
        console.log('Failed to fetch project', error);
        return res.status(500).send({
            success: false,
            message: 'Failed to fetch project'
        })
    }
})
module.exports = router;
