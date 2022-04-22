// build your `Project` model here
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

async function getProjects() {
    const rawProjects = await  db('projects');
    rawProjects.forEach(project => {
        project.project_completed = booleanize(project.project_completed);
    });
    return rawProjects;
}
async function getProjectById(project_id) {
    // access first, with "completed" as an integer, and then "booleanize" it
    const raw = await db('projects')
        .where('project_id', project_id)
        .first();
    raw.project_completed = booleanize(raw.project_completed);
    return raw;
}

function postProject(project) {
    // const newProject = await db('projects').insert(project);
    // return getProjectById(project[project_id]);
   return db('projects').insert(project)
    .then(([project_id]) => {
        return db('projects')
            .where('project_id', project_id)
            .first()
    })
}

//export the module
module.exports = {getProjectById, postProject, getProjects}