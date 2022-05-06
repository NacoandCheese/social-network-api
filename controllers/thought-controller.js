const { Thought, User } = require('../models');

const thoughtController = {
  // get all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
    .populate({
      path: 'reactions',
      select: '-__v',
    })
    // .populate({
    //   path: 'thoughts',
    //   select: '-__v',
    // })
    .select('-__v')
    .then((dbThoughtData) => res.json(dbThoughtData))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
  },
 

  //get Thought by ID
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
     .then((dbThoughtData) => {
       if (!dbThoughtData) {
         res.status(404).json({ message: 'No thought with this id' });
         return;
       }
       res.json(dbThoughtData);
     })
     .catch((err) => {
       console.log(err);
       res.status(400).json(err);
     });
  },

  // create thought to user
  createThought({ body }, res) {
    console.log(body);
    Thought.create(body)
     .then((thoughtData) => {
       return User.findOneAndUpdate(
         { _id: body.userId },
         { $push: { thoughts: thoughtData._id } },
         { new: true }
       );
     })
     .then((dbUserData) => {
       if (!dbUserData) {
         res.status(404).json({ message: 'No user with this id' });
         return;
       }
       res.json(dbUserData);
     })
     .catch((err) => res.json(err));
  },

  // update thought by id
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
     .then((dbThoughtData) => {
       if (!dbThoughtData) {
         res.status(404).json({ message: 'No thought with this id' });
         return;
       }
       res.json(dbThoughtData);
     })
     .catch((err) => res.status(400).json(err));
  },

  // add reaction
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $addToSet: { reactions: body } },
      { new: true }
    )
    .then((dbThoughtData) => {
      if (!dbThoughtData) {
        res.status(404).json({ message: 'No thought with this id'});
        return;
      }
      res.json(dbThoughtData);
    })
    .catch((err) => res.json(err));
  }
 
};

module.exports = thoughtController;