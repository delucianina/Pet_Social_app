import dotenv from 'dotenv';
dotenv.config();
import auth_resolvers from './resolvers/auth_resolvers.js';
import pet_resolvers from './resolvers/pet_resolvers.js';
// import { User as UserInterface } from '../interfaces/User.interface'
// import User from '../models/User.js';
// import Context from '../interfaces/Context.interface';
const resolvers = {
    Query: {
        // spread Query resolvers
        ...auth_resolvers.Query,
        ...pet_resolvers.Query
    },
    Mutation: {
        // spread the Mutation resolvers
        ...auth_resolvers.Mutation,
        ...pet_resolvers.Mutation
    }
};
export default resolvers;
