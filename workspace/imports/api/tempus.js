import { Mongo } from 'meteor/mongo';
export const collTempus = new Mongo.Collection('tempus');



if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('collTempus', function tasksPublication() {
    return collTempus.find();
  });
}
