const gql = String.raw;
const typeDefs = gql `
  type Post {
    _id: ID
    title: String
    body: String
    pet: Pet
  }

  type Pet {
    _id: ID
    name: String
    type: String
    age: Int
    owner: User
    posts: [Post]
  }

  type User {
    _id: ID
    username: String
    email: String
    pets: [Pet]
  }

  # "We wrote this Response, it's nothing special" - JD, 11/13/2024
  type Response {
    user: User
    message: String
    errors: [String]
  }

  type Query {
    #  AUTH QUERIES 
    getUser: Response

    #  PET QUERIES 
    getAllPosts: [Post]
    getUserPets: [Pet]
    getPostsForPet(pet_id: ID): [Post]
  }

  type Mutation {
    # THESE ARE AUTH RESOLVERS
    # resolverName(intake: types): return 
    registerUser(username: String, email: String, password: String): Response
    loginUser(email: String, password: String): Response
    logoutUser: Response

    # THESE ARE PET RESOLVERS 
    createPet(name: String, type: String, age: Int): Response
    createPost(title: String, body: String, pet: ID): Response
  }
`;
export default typeDefs;
