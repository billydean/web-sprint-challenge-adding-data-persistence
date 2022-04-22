// build your `Task` model here
// gotta access that database somehow
const db = require('../../data/dbConfig');

function getTasks() {
    return db('tasks');
}
function getTaskById(task_id) {
    return db('tasks')
        .where('task_id', task_id)
        .first();
}

function postTask(task) {
   return db('tasks').insert(task)
    .then(([task_id]) => {
        return db('tasks')
            .where('task_id', task_id)
            .first()
    })
}
//export the module
module.exports = {getTasks,getTaskById,postTask}