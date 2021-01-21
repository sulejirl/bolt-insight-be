const User = require('./schema.js')

const getUsersWithQueryAndProject = async(query,project) => {
    return User.find(query, project).lean();
}
const getUserByIdWithProject = async(userId,project) => {
    return User.findById(userId, project);
}
module.exports = {
    getUsersWithQueryAndProject,
    getUserByIdWithProject,
}