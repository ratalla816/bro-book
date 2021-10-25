const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    username: 
    {
      type: String,
      unique: true,
      required: "All dudes need to enter a username",
      trim: true,
    },

    email:
    {
      type: String,
      required: "Dude, we need your Email address",
      unique: true,
      match: [/.+@.+\..+/, 
      "Dude.. bro.. just enter your email address"],
    },

    thoughts: [ { type: Schema.Types.ObjectId, ref: "Thought"} ],

    friends: 
    [
      { type: Schema.Types.ObjectId,
        ref: "User",
      },
      
    ],
  },

  {
    toJSON: { virtuals: true },
    id: false,
  });

UserSchema.virtual("friendCount")
.get(function () {
  
    return this.friends.length;
});

const User = model("User", UserSchema);

module.exports = User;
