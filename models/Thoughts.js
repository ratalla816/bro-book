const { Schema, model, Types } = require('mongoose');

// This is the timestamp format from the Module 18 Pizza Hunt activity 
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema(
  {
    // set custom id to avoid confusion with parent comment _id
    reactionId: {
      type: Schema.Types.ObjectId,      
      default: () => new Types.ObjectId()
    },

    reactionBody: {type: String, required: true},
    
    dude: {type: String, required: true, trim: true},

    createdAt: {
      type: Date, default: Date.now,
      get:
      createdAtVal => dateFormat(createdAtVal)
    }
  },

  { toJSON: { getters: true }
});

const ThoughtsSchema = new Schema(
  {
    writtenBy: { type: String, required: true },
    commentBody: { type: String, required: true},
    createdAt: { type: Date, default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    },
    
    replies: [ReactionSchema]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

ThoughtsSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Thoughts = model('Thoughts', ThoughtsSchema);

module.exports = Thoughts;
