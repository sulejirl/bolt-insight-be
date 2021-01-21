const router = module.exports = require('express').Router();
const {
    postUser,
    getAllUsers,
    getUserCount
} = require('./controller');

router.post('/', postUser);
router.get('/', getAllUsers);
router.get('/count', getUserCount);


