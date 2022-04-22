// build your `/api/resources` router here
// need express router and the model for db access handlers
const router = require('express').Router();
const Resource = require('./model');

// [POST] /api/resources

// Example of response body: {"resource_id":1,"resource_name":"foo","resource_description":null}
//  [GET] /api/resources

// Example of response body: [{"resource_id":1,"resource_name":"foo","resource_description":null}]

router.get('/:resource_id', (req,res,next)=>{
    Resource.getResourceById(req.params.resource_id)
        .then(resource => {
            res.status(200).json(resource);
        })
        .catch(next);
});

router.get('/', (req,res,next)=>{
    Resource.getResources()
        .then(resources => {
            res.json(resources);
        })
        .catch(next);
})


router.post('/', (req,res,next) => {
    Resource.postResource(req.body)
        .then(resource => {
            res.status(201).json(resource);
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