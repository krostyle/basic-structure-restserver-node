const { Router } = require('express');
const { search } = require('../controllers/searches.controllers');


const router = Router();
router.get('/:collection/:query', search);

module.exports = router;