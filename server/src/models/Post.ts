import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const postSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Your post title must include text'],
    minLength: [3, 'Your title must be at least 3 characters in length']
  },
  body: {
    type: String,
    required: [true, 'Your post body must include text'],
    minLength: [3, 'Your post body must be at least 3 characters in length']
  },
  pet: {
    type: Schema.Types.ObjectId,
    required: [true, 'You must attach the pet _id to the post'],
    ref: 'Pet'
  }
});

// pass in model method: give name we want to call it, then the schema 
const Post = model('Post', postSchema);

// export it 
export default Post;