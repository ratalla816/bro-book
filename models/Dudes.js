const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const DudesSchema = new Schema
  ({
    dudename: {type: String, unique: true, required: true, trim: true},

    email: {type: String, required: true, unique: true},

    thoughts: [{type: Schema.Types.ObjectId, ref: 'Thoughts'}],

    bros: [{type: Schema.Types.ObjectId, ref: 'Dudes'}]
  },

  {
    toJSON: {virtuals: true, getters: true},
    id: false,
  });

DudesSchema.virtual('broCount').get(function() {
  return this.bros.length;
});

const Dudes = model('Dudes', DudesSchema);

module.exports = Dudes;
