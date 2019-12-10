const graphql = require('graphql');
const mongoose = require('mongoose');

const User = require('../models/users')
const Order = require('../models/orders').default
const Item = require('../models/items')

mongoose.set('useFindAndModify', false);

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLSchema,
    GraphQLList,
    GraphQLBoolean, 
    GraphQLObjectType } = graphql;

const ItemType = new GraphQLObjectType({
    name: 'Item',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        price: { type: Number },
        category: { type: GraphQLString },
        img: { type: GraphQLString }
    })
});


const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        surname: { type: GraphQLString },
        password: { type: GraphQLString },
        geo_id: { type: GraphQLString },
        address: { type: GraphQLString },
        orders: {
            type: new GraphQLList(OrderType),
            resolve(parent, _) {
                return Order.find({user_id: parent.id})
            }
        }
    })
});

const OrderType = new GraphQLObjectType({
    name: 'Message',
    fields: () => ({
        id: { type: GraphQLString },
        date: { type: GraphQLString },
        status: {type: GraphQLBoolean},
        user_id: { type: GraphQLString },
        user: {
            type: UserType,
            resolve(parent, _){
                return User.findById(parent.user_id)
            }
        },
        items: {type: new GraphQLList(ItemType)}
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: {
                name:  { type: GraphQLString },
                surname: { type: GraphQLString },
                gei_id: { type: GraphQLString } 
            },
            resolve(_, args) {
                return User.findOne({ userName: args.userName })
            }
        },
        userConf: {
            type: UserType,
            args: { userName: { type: GraphQLString }, password: { type: GraphQLString } },
            resolve(_, args) {
                return User.findOne({ userName: args.userName, password: args.password })
            }
        },
        messages: {
            type: MessageType,
            args: { roomId: { type: GraphQLString } },
            resolve(_, args) {
                return Message.find({ roomId: args.id });
            }
        },
        usersInRoom: {
            type: new GraphQLList(UserType),
            args: { roomId: { type: GraphQLString } },
            resolve(_, args) {
                return User.find({ roomId: args.roomId });
            }
        },
        room: {
            type: RoomType,
            args: { roomName: { type: GraphQLString } },
            resolve(_, args) {
                return Room.findOne({ roomName: args.roomName })
            }
        },
        roomById: {
            type: RoomType,
            args: { id: { type: GraphQLString } },
            resolve(_, args) {
                return Room.findById(args.id)
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                userName: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) },
                roomId: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(_, args) {
                let user = new User({
                    userName: args.userName,
                    password: args.password,
                    lastActive: new Date().toString(),
                    roomId: args.roomId
                })
                return user.save();
            }
        },
        updateLastActive: {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(_, args) {
                return User.findByIdAndUpdate(args.id, {
                    lastActive: new Date().toString()
                }, { new: true });
            }
        },
        removeUser: {
            type: UserType,
            args: { id: { type: new GraphQLNonNull(GraphQLString) } },
            resolve(_, args) {
                const removedUser = User.findByIdAndRemove(args.id).exec();
                if (!removedUser) {
                    throw new Error(`Couldn't find User with id: ${args.id}`)
                } else {
                    return removedUser;
                }
            }
        },
        addRoom: {
            type: RoomType,
            args: {
                roomName: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(_, args) {
                let room = new Room({
                    roomName: args.roomName
                });
                return room.save();
            }
        },
        removeRoom: {
            type: RoomType,
            args: { id: { type: new GraphQLNonNull(GraphQLString) } },
            resolve(_, args) {
                const removedPost = Room.findByIdAndRemove(args.id).exec();
                if (!removedPost) {
                    throw new Error(`Couldn't find Post with id: ${args.id}`)
                }
                const removedMessages = Message.deleteMany({ roomId: args.id }).exec()
                if (!removedMessages) {
                    console.log('there were no messages in this room')
                }
                return removedPost;
            }
        },
        removeMessages: {
            type: MessageType,
            args: { roomId: { type: new GraphQLNonNull(GraphQLString) } },
            resolve(_, args) {
                const removedMessages = Message.deleteMany({ roomId: args.id }).exec()
                if (!removedMessages) {
                    console.log('there were no messages in this room')
                }
                return removedMessages;
            }
        }
    }
})
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})