// build your `Project` model here
// gotta access that database somehow
const db = require('../../data/dbConfig');

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

function getProjects() {
    return db('projects');
}
function getProjectById(project_id) {
    return db('projects')
        .where('project_id', project_id)
        .first();
}

function postProject(project) {
   return db('projects').insert(project)
    .then(([project_id]) => {
        return db('projects')
            .where('project_id', project_id)
            .first()
    })
}

//export the module
module.exports = {getProjectById, postProject, getProjects}