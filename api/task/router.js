// build your `/api/tasks` router here
// need express router and the model for db access handlers
const router = require('express').Router();
const Task = require('./model');


router.get('/:task_id', (req,res,next)=>{
    Task.getTaskById(req.params.task_id)
        .then(task => {
            res.status(200).json(task);
        })
        .catch(next);
});

router.get('/', (req,res,next)=>{
    Task.getTasks()
        .then(tasks => {
            res.json(tasks);
        })
        .catch(next);
})


router.post('/', (req,res,next) => {
    Task.postTask(req.body)
        .then(task => {
            res.status(201).json(task);
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