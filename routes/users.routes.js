const { Router } = require('express');
const { getUsers, postUsers, putUsers, patchUsers, getDelete } = require('../controllers/users.controllers');

const router = Router();

router.get('/', getUsers)

router.post('/', postUsers)

router.put('/:id', putUsers)

router.patch('/', patchUsers)

router.delete('/', getDelete)



module.exports = router;