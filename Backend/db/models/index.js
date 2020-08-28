const User = require("./user");
const Event = require("./event");
const Activity = require("./activity");
const Interest = require("./interest");
const Messages = require("./messages");

User.belongsToMany(Event, { through: Activity });
Event.belongsToMany(User, { through: Activity });
User.hasMany(Messages);
Messages.belongsTo(User);
// Event.belongsToMany(User);
//alias as host
User.hasMany(Event, { as: "host" });
Event.belongsTo(User, { as: "host" });
User.hasMany(Interest, { as: "userInterest" });

module.exports = {
  User,
  Event,
  Activity,
  Messages,
  Interest,
};
