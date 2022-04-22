// build your `Resource` model here
// gotta access that database somehow
const db = require('../../data/dbConfig');

// [POST] /api/resources

// Example of response body: {"resource_id":1,"resource_name":"foo","resource_description":null}
//  [GET] /api/resources

// Example of response body: [{"resource_id":1,"resource_name":"foo","resource_description":null}]

function getResources() {
    return db('resources');
}
function getResourceById(resource_id) {
    return db('resources')
        .where('resource_id', resource_id)
        .first();
}

function postResource(resource) {
   return db('resources').insert(resource)
    .then(([resource_id]) => {
        return db('resources')
            .where('resource_id', resource_id)
            .first()
    })
}

//export the module
module.exports = {getResourceById, postResource, getResources}