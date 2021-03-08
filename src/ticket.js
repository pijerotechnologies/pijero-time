const debug = require("debug")("slash-command-template:ticket");
const api = require("./api");
const payloads = require("./payloads");
const fs = require("fs");

async function readData(file) {
  const data = await fs.readFileSync(file);
  const formattedData = JSON.parse(data);

  return formattedData;
}

const writeData = (file, data) => {
  const formattedData = JSON.stringify(data);
  fs.writeFile("database/data.json", formattedData, callback);

  function callback(err) {
    console.log(err);
  }
};

readData("database/data.json").then((data) => {
  console.log(data);
});

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

  writeData("database/data.json", values);

  await sendConfirmation({
    userId,
  });
};

module.exports = { create, sendConfirmation };
