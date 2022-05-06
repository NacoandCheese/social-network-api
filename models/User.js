const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            trim: true,
            required: 'Must include username.'
        },
        email: {
            type: String,
            unique: true,
            trim: true,
            required: 'Must include email.'
        },

        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],

        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        // prevents virtuals from creating duplicate of _id as `id`
        id: false
    }
);

// get total count of comments and replies on retrieval
userSchema.virtual('friendCount').get(function () {
    return this.users.reduce(
        (total, user) => total + user.replies.length + 1,
        0
    );
});

const User = model('User', userSchema);

module.exports = User;
