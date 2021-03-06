const debug = require("debug")("slash-command-template:ticket");
const api = require("./api");
const payloads = require("./payloads");

/*
 *  Send ticket creation confirmation via
 *  chat.postMessage to the user who created it
 */
const sendConfirmation = async (ticket) => {
  // open a DM channel for that user
  console.log(ticket);
  let channel = await api.callAPIMethod("conversations.open", {
    users: [ticket.userId],
  });

  console.log(channel);

  let message = payloads.confirmation({
    channel_id: channel.channel.id,
    title: "test",
  });

  let result = await api.callAPIMethod("chat.postMessage", message);
  debug("sendConfirmation: %o", result);
};

// Create helpdesk ticket. Call users.find to get the user's email address
// from their user ID
const create = async (userId, view) => {
  let values = view.state.values;

  let result = await api.callAPIMethod("users.info", {
    user: userId,
  });

  await sendConfirmation({
    userId,
  });

  console.log({ values });
  console.log({ result });
};

module.exports = { create, sendConfirmation };
