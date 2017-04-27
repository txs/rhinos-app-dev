import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor'; // ADD THIS

const Items = new Mongo.Collection('items');

// ADD THIS
Meteor.methods({
  'Items.addOne': ({ name }) => {
    return Items.insert({ name });
  },
});

export default Items;
