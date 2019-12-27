const graphql = require('graphql');
const mongoose = require('mongoose');

const User = require('../models/users')
const Order = require('../models/orders')
const Item = require('../models/items')
const Filter = require('../models/filter_stats')

mongoose.set('useFindAndModify', false);

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLSchema,
    GraphQLList,
    GraphQLFloat,
    GraphQLBoolean,
    GraphQLInt,
    GraphQLInputObjectType } = graphql;



/********************************************************************************************
*********************************************************************************************
                                   Object Schemas
*********************************************************************************************
********************************************************************************************/


//-------------------------------------------------------------------------------------------
//----------------------------------- Filter Schema -----------------------------------------
//-------------------------------------------------------------------------------------------
const ThematicsNarrowInputType = new GraphQLInputObjectType({
    name: 'ThematicsNarrowInput',
    fields: () => ({
        key: { type: GraphQLString },
        values: { type: new GraphQLList(GraphQLString) },
    })
})

const ThematicsNarrowType = new GraphQLObjectType({
    name: 'ThematicsNarrow',
    fields: () => ({
        key: { type: GraphQLString },
        values: { type: new GraphQLList(GraphQLString) },
    })
})

const FilterType = new GraphQLObjectType({
    name: 'Filter',
    fields: () => ({
        id: { type: GraphQLString },
        categories: { type: new GraphQLList(GraphQLString) },
        thematics: { type: new GraphQLList(GraphQLString) },
        thematics_narrow: { type: new GraphQLList(ThematicsNarrowType) },
        high_price: { type: GraphQLInt }
    })
})

//-------------------------------------------------------------------------------------------
//-----------------------------------Full Item Schema ---------------------------------------
//-------------------------------------------------------------------------------------------
const StockInput = new GraphQLInputObjectType({
    name: 'StockInput',
    fields: () => ({
        option: { type: GraphQLString },
        left: { type: GraphQLInt }
    })
})

const StockType = new GraphQLObjectType({
    name: 'Stock',
    fields: () => ({
        option: { type: GraphQLString },
        left: { type: GraphQLInt }
    })
})
const ItemType = new GraphQLObjectType({
    name: 'Item',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        price: { type: GraphQLFloat },
        category: { type: GraphQLString },
        thematics: { type: GraphQLString },
        thematics_narrow: { type: GraphQLString },
        img: { type: GraphQLString },
        stock: { type: new GraphQLList(StockType) }
    })
});

const ItemsWithCountType = new GraphQLObjectType({
    name: 'ItemsWithCount',
    fields: () => ({
        count: { type: GraphQLInt },
        data: { type: new GraphQLList(ItemType) }
    })
});
//-------------------------------------------------------------------------------------------
//-----------------------------------User Schema --------------------------------------------
//-------------------------------------------------------------------------------------------
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
                return Order.find({ user_id: parent.id })
            }
        }
    })
});
//-------------------------------------------------------------------------------------------
//-----------------------------------Order Schema -------------------------------------------
//-------------------------------------------------------------------------------------------
const OrderItemInput = new GraphQLInputObjectType({
    name: 'OrderItemInput',
    fields: () => ({
        item_id: { type: new GraphQLNonNull(GraphQLString) },
        count: { type: new GraphQLNonNull(GraphQLInt) }
    })
})

const OrderItemType = new GraphQLObjectType({
    name: 'OrderItem',
    fields: () => ({
        item: {
            type: ItemType,
            resolve(parent, _) {
                return Item.findById(parent.item_id)
            }
        },
        count: { type: GraphQLInt }
    })
})

const OrderType = new GraphQLObjectType({
    name: 'Order',
    fields: () => ({
        id: { type: GraphQLString },
        date: { type: GraphQLString },
        status: { type: GraphQLBoolean },
        user_id: { type: GraphQLString },
        items: { type: new GraphQLList(OrderItemType) },
        user: {
            type: UserType,
            resolve(parent, _) {
                return User.findById(parent.user_id)
            }
        }
    })
});

const OrdersWithCountType = new GraphQLObjectType({
    name: 'CountedOrders',
    fields: () => ({
        count: { type: GraphQLInt },
        data: { type: new GraphQLList(OrderType) }
    })
});

/********************************************************************************************
*********************************************************************************************
                                  Query Schema
*********************************************************************************************
********************************************************************************************/

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    //-------------------------------------------------------------------------------------------
    //----------------------------- Filter Queries [ filter ] -----------------------------------
    //-------------------------------------------------------------------------------------------
    fields: {
        filter: {
            type: FilterType,
            resolve(_, __) {
                return Filter.findOne({})
            }
        },
        //-------------------------------------------------------------------------------------------
        //------------------- user Queries [ user_with_id, user_with_password ] ---------------------
        //-------------------------------------------------------------------------------------------
        user_with_id: {
            type: UserType,
            args: {
                geo_id: { type: GraphQLString }
            },
            resolve(_, args) {
                return User.findOne({ geo_id: args.geo_id })
            }
        },
        user_with_password: {
            type: UserType,
            args: {
                password: { type: GraphQLString },
                geo_id: { type: GraphQLString }
            },
            resolve(_, args) {
                return User.findOne({ $and: [{ geo_id: args.geo_id }, { password: args.password }] })
            }
        },
        //-------------------------------------------------------------------------------------------
        //--------------------------- order Queries [ order_with_id, orders ] -----------------------
        //-------------------------------------------------------------------------------------------
        order_with_id: {
            type: OrderType,
            args: {
                id: { type: GraphQLString }
            },
            resolve(_, args) {
                return Order.findById(args.id)
            }
        },
        orders: {
            type: OrdersWithCountType,
            args: {
                limit: { type: GraphQLInt, defaultValue: -1 },
                skip: { type: GraphQLInt, defaultValue: 0 },
                sort_field: { type: GraphQLString, defaultValue: "date" },
                sort_direction: { type: GraphQLInt, defaultValue: 1 }
            },
            resolve(_, args) {
                if (args.limit > 0) {
                    return {
                        count: Order.countDocuments({}),
                        data: Order.find({})
                            .sort({ sort_field: args.sort_direction })
                            .skip(args.skip)
                            .limit(args.limit)
                    }
                } else {
                    return {
                        count: Order.countDocuments({}),
                        data: Order.find({})
                            .sort({ sort_field: args.sort_direction })
                    }
                }
            }
        },
        //-------------------------------------------------------------------------------------------
        //-------------------------------- item Queries [ item_with_id, items ] ---------------------
        //-------------------------------------------------------------------------------------------
        item_with_id: {
            type: ItemType,
            args: {id: {type: new GraphQLNonNull(GraphQLString)}},
            resolve(_, args){
                return Item.findById(args.id)
            }
        },
        items: {
            type: ItemsWithCountType,
            args: {
                limit: { type: new GraphQLNonNull(GraphQLInt) },
                skip: { type: GraphQLInt, defaultValue: 0 },
                sort_field: { type: GraphQLString, defaultValue: "price" },
                sort_direction: { type: GraphQLInt, defaultValue: 1 },
                category: { type: GraphQLString, defaultValue: "სხვადასხვა" },
                thematics: { type: GraphQLString, defaultValue: "სხვადასხვა" },
                thematics_narrow: { type: GraphQLString, defaultValue: "სხვადასხვა" },
                low_price: { type: GraphQLFloat, defaultValue: 0 },
                high_price: { type: GraphQLFloat, defaultValue: 100 },
            },
            resolve(_, args) {
                if (args.category == "სხვადასხვა") {
                    return {
                        data: Item
                            .find(
                                args.thematics == "სხვადასხვა" ? {}
                                    : args.thematics_narrow == "სხვადასხვა" ? { thematics: args.thematics }
                                        : { thematics_narrow: args.thematics_narrow }
                            )
                            .where('price').gt(args.low_price).lt(args.high_price)
                            .sort({ sort_field: args.sort_direction })
                            .skip(args.skip)
                            .limit(args.limit),
                        count: Item
                            .find(
                                args.thematics == "სხვადასხვა" ? {}
                                    : args.thematics_narrow == "სხვადასხვა" ? { thematics: args.thematics }
                                        : { thematics_narrow: args.thematics_narrow }
                            )
                            .where('price').gt(args.low_price).lt(args.high_price)
                            .countDocuments({})
                    }
                } else {
                    return {
                        data: Item
                            .find(
                                args.thematics == "სხვადასხვა" ? { category: args.category }
                                    : args.thematics_narrow == "სხვადასხვა" ? { $and: [{ category: args.category }, { thematics: args.thematics }] }
                                        : { $and: [{ category: args.category }, { thematics_narrow: args.thematics_narrow }] }
                            )
                            .where('price').gt(args.low_price).lt(args.high_price)
                            .sort({ sort_field: args.sort_direction })
                            .skip(args.skip)
                            .limit(args.limit),
                        count: Item
                            .find(
                                args.thematics == "სხვადასხვა" ? { category: args.category }
                                    : args.thematics_narrow == "სხვადასხვა" ? { $and: [{ category: args.category }, { thematics: args.thematics }] }
                                        : { $and: [{ category: args.category }, { thematics_narrow: args.thematics_narrow }] }
                            )
                            .where('price').gt(args.low_price).lt(args.high_price)
                            .countDocuments({})
                    }
                }

            }
        },
    }
});
/********************************************************************************************
*********************************************************************************************
                                  Mutation Schema
*********************************************************************************************
********************************************************************************************/
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        //-------------------------------------------------------------------------------------------
        //------------------------ Filter mutations [ add_filter, update_filter ] -----------------------
        //-------------------------------------------------------------------------------------------
        add_filter: {
            type: FilterType,
            args: {
                categories: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
                thematics: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
                thematics_narrow: { type: new GraphQLNonNull(new GraphQLList(ThematicsNarrowInputType)) },
                high_price: { type: new GraphQLNonNull(GraphQLInt) },
            },
            resolve(_, args) {
                let filter = new Filter({
                    categories: args.categories,
                    thematics: args.thematics,
                    thematics_narrow: args.thematics_narrow,
                    high_price: args.high_price
                })
                return filter.save()
            }
        },
        update_filter: {
            type: FilterType,
            args: {
                categories: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
                thematics: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
                thematics_narrow: { type: new GraphQLNonNull(new GraphQLList(ThematicsNarrowInputType)) },
                high_price: { type: new GraphQLNonNull(GraphQLInt) },
            },
            resolve(_, args) {
                return Filter.findOneAndUpdate({}, {
                    categories: args.categories,
                    thematics: args.thematics,
                    thematics_narrow: args.thematics_narrow,
                    high_price: args.high_price
                }, { new: true });
            }
        },
        //-------------------------------------------------------------------------------------------
        //------------------------ User mutations [] add_user, remove_user ] -------------------------
        //-------------------------------------------------------------------------------------------
        add_user: {
            type: UserType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                surname: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) },
                geo_id: { type: new GraphQLNonNull(GraphQLString) },
                address: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(_, args) {
                let user = new User({
                    name: args.name,
                    surname: args.surname,
                    password: args.password,
                    geo_id: args.geo_id,
                    address: args.address,
                })
                return user.save();
            }
        },
        remove_user: {
            type: UserType,
            args: { id: { type: new GraphQLNonNull(GraphQLString) } },
            resolve(_, args) {
                const removedUser = User.findByIdAndRemove(args.id).exec();
                if (removedUser) {
                    return removedUser;
                } else {
                    console.log(`Couldn't find User with id: ${args.id}`)
                }
            }
        },
        //-------------------------------------------------------------------------------------------
        //---------------------- Item mutations [ add_item, update_price, remove_item ] -------------
        //-------------------------------------------------------------------------------------------
        add_item: {
            type: ItemType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                description: { type: new GraphQLNonNull(GraphQLString) },
                price: { type: new GraphQLNonNull(GraphQLFloat) },
                category: { type: new GraphQLNonNull(GraphQLString) },
                thematics: { type: new GraphQLNonNull(GraphQLString) },
                thematics_narrow: { type: new GraphQLNonNull(GraphQLString) },
                img: { type: new GraphQLNonNull(GraphQLString) },
                stock: { type: new GraphQLNonNull(new GraphQLList(StockInput)) }
            },
            resolve(_, args) {
                let item = new Item({
                    name: args.name,
                    description: args.description,
                    price: args.price,
                    category: args.category,
                    thematics: args.thematics,
                    thematics_narrow: args.thematics_narrow,
                    img: "https://drive.google.com/uc?id=" + args.img,
                    stock: args.stock
                })
                return item.save();
            }
        },
        update_price: {
            type: ItemType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) },
                price: { type: new GraphQLNonNull(GraphQLFloat) }
            },
            resolve(_, args) {
                return Item.findByIdAndUpdate(args.id, {
                    price: args.price
                }, { new: true });
            }
        },
        update_qnty: {
            type: ItemType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) },
                qnty: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve(_, args) {
                return Item.findByIdAndUpdate(args.id, {
                    left: args.qnty
                }, { new: true });
            }
        },
        remove_item: {
            type: ItemType,
            args: { id: { type: new GraphQLNonNull(GraphQLString) } },
            resolve(_, args) {
                const removedItem = Item.findByIdAndRemove(args.id).exec();
                if (removedItem) {
                    return removedItem;
                } else {
                    console.log(`Couldn't find Item with id: ${args.id}`)
                }
            }
        },
        //-------------------------------------------------------------------------------------------
        //------------------- Order mutations [ add_order, update_order, remove_order ] -------------
        //-------------------------------------------------------------------------------------------
        add_order: {
            type: OrderType,
            args: {
                user_id: { type: new GraphQLNonNull(GraphQLString) },
                items: { type: new GraphQLNonNull(new GraphQLList(OrderItemInput)) },
            },
            resolve(_, args) {
                let order = new Order({
                    date: new Date().toLocaleString(),
                    status: args.status,
                    user_id: args.user_id,
                    items: args.items
                })
                return order.save();
            }
        },
        remove_order: {
            type: OrderType,
            args: { id: { type: new GraphQLNonNull(GraphQLString) } },
            resolve(_, args) {
                const removedOrder = Order.findByIdAndRemove(args.id).exec();
                if (removedOrder) {
                    return removedItem;
                } else {
                    console.log(`Couldn't find order with id: ${args.id}`)
                }
            }
        },
    }
})
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})