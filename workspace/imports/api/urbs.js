import { Mongo } from 'meteor/mongo';
export const Urbes = new Mongo.Collection('urbes');



if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('urbes', function tasksPublication() {
    return Urbes.find();
  });
}
