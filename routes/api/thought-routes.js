const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    addReaction
} = require('../../controllers/thought-controller');

//GET all and POST at /api/thoughts
router.route('/').get(getAllThoughts).post(createThought);

//GET one PUT one at /api/thoughts/:id
router
 .route('/:id')
 .get(getThoughtById)
 .put(updateThought);



router.route('/:thoughtId/reactions').post(addReaction);

module.exports = router;