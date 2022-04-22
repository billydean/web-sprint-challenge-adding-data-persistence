// build your `/api/projects` router here
// need express router and the model for db access handlers
const router = require('express').Router();
const Project = require('./model');


/**
 * Required Endpoints
 * 
 * [POST] "/"
 * even though project_completed is stored as an integer, the API uses booleans when interacting with the client
 * response body:
 * {"project_id":1,"project_name":"bar","project_description":null,"project_completed":false}
 * 
 * [GET] "/"
 * [{"project_id":1,"project_name":"bar","project_description":null,"project_completed":false}]
 */

router.get('/:project_id', (req,res,next)=>{
    Project.getProjectById(req.params.project_id)
        .then(project => {
            res.status(200).json(project);
        })
        .catch(next);
});

router.post('/', (req,res,next) => {
    Project.postProject(req.body)
        .then(project => {
            res.status(201).json(project);
        })
        .catch(next);
})

router.use((err,req,res,next) => {
    res.status(500).json({
        debugMessage: 'something went horribly wrong',
        message:err.message,
        stack:err.stack,
    })
})

//export the module
module.exports = router;