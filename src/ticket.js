const debug = require("debug")("slash-command-template:ticket");
const api = require("./api");
const payloads = require("./payloads");

/*
 *  Send ticket creation confirmation via
 *  chat.postMessage to the user who created it
 */
const sendConfirmation = async (ticket) => {
  // open a DM channel for that user

  let channel = await api.callAPIMethod("conversations.open", {
    users: [ticket.userId],
  });

  let message = payloads.confirmation({
    channel_id: channel.channel.id,
    title: `selected users: `,
  });

  let result = await api.callAPIMethod("chat.postMessage", message);
  debug("sendConfirmation: %o", result);
};

const sendTestMsg = async (users) => {
  let channel = await api.callAPIMethod("conversations.open", {
    users,
  });

  let message = payloads.confirmation({
    channel_id: channel.channel.id,
    title: "test",
  });

  let result = await api.callAPIMethod("chat.postMessage", message);
};

// Create helpdesk ticket. Call users.find to get the user's email address
// from their user ID
const create = async (userId, view) => {
  let values = view.state.values;

  let result = await api.callAPIMethod("users.info", {
    user: userId,
  });

  console.log(values.reminder_block);

  await sendConfirmation({
    userId,
  });
};

module.exports = { create, sendConfirmation };
