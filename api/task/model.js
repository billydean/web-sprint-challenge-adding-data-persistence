// build your `Task` model here
// gotta access that database somehow
const db = require('../../data/dbConfig');
//handler for booleans. will this work??
const booleanize = (integer) => {
    if (integer === 0) {
        return false;
    } else {
        return true;
    }
}

// access first, with "completed" as an integer, and then "booleanize" it

async function getProjects() {
    const rawProjects = await  db('projects');
    rawProjects.forEach(project => {
        project.project_completed = booleanize(project.project_completed);
    });
    return rawProjects;
}

async function getTasks() {
    const rawTasks = await db('tasks')
        .join('projects', 'tasks.project_id', 'projects.project_id')
        .select('tasks.*', 'projects.project_name', 'projects.project_description')
    ;
    rawTasks.forEach(task => {
        task.task_completed = booleanize(task.task_completed);
    });
    return rawTasks;
}
async function getTaskById(task_id) {
    const rawTask = await db('tasks')
        .where('task_id', task_id)
        .first();
    rawTask.task_completed = booleanize(rawTask.task_completed);
    return rawTask;
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