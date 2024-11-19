import Post from '../../models/Post.js';
import Pet from '../../models/Pet.js';
import { errorHandler } from '../helpers/index.js';
import { GraphQLError } from 'graphql';
// ------------------
// PET RESOLVERS 
// ------------------
const pet_resolvers = {
    Query: {
        // GET ALL POSTS 
        async getAllPosts() {
            const posts = await Post.find().populate('pet');
            return posts;
        },
        // GET USER PETS 
        async getUserPets(_, __, context) {
            if (!context.req.user) {
                return {
                    error: ['You are not authorized to perform this action']
                };
            }
            const pets = await Pet.find({
                owner: context.req.user._id
            });
            return pets;
        },
        //GET PET POSTS 
        async getPostsForPet(_, args) {
            const posts = await Post.find({
                pet: args.pet_id
            });
            return posts;
        }
    },
    Mutation: {
        // CREATE A PET 
        async createPet(_, args, context) {
            if (!context.req.user) {
                return {
                    error: ['You are not authorized to perform this action']
                };
            }
            try {
                const pet = await Pet.create({
                    ...args,
                    owner: context.req.user._id
                });
                context.req.user.pets.push(pet._id);
                await context.req.user.save();
                return {
                    message: 'Pet added successfully!'
                };
            }
            catch (error) {
                const errorMessage = errorHandler(error);
                throw new GraphQLError(errorMessage);
            }
        },
        // ---------------------------
        // CREATE A POST FOR A PET 
        // ---------------------------
        async createPost(_, args, context) {
            if (!context.req.user) {
                return {
                    errors: ['You are not authorized to perform this action']
                };
            }
            try {
                const post = await Post.create(args);
                await Pet.findByIdAndUpdate(args.pet, {
                    $push: {
                        posts: post._id
                    }
                });
                return {
                    message: 'Post created successfully!'
                };
            }
            catch (error) {
                console.log(error.message);
                return errorHandler(error);
            }
        }
    }
};
export default pet_resolvers;
/*
const pet = await Pet.findById(args.pet);
        const post = await Post.create(args);

        pet?.posts.push(post._id);
        pet?.save();

        return {
          message: 'Post created successfully!'
        }
        */ 
