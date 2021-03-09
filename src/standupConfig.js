const debug = require("debug")("slash-command-template:standupconfig");
const { zonedTimeToUtc, utcToZonedTime, format } = require("date-fns-tz");

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
    console.log(`err ${err}`);
  }
};

readData("database/data.json").then((data) => {
  console.log("DATABASE DATA");
  console.log(data);
});

/*
 *  Send standupconfig creation confirmation via
 *  chat.postMessage to the user who created it
 */
const sendConfirmation = async (userId) => {
  let channel = await api.callAPIMethod("conversations.open", {
    users: [userId],
  });

  let message = payloads.confirmation({
    channel_id: channel.channel.id,
    title: `selected users: `,
  });

  let result = await api.callAPIMethod("chat.postMessage", message);
  debug("sendConfirmation: %o", result);
};

const sendMessageToUsers = async (usersArray) => {
  console.log(usersArray);
  let channel = await api.callAPIMethod("conversations.open", {
    users: usersArray,
  });

  let message = payloads.confirmation({
    channel_id: channel.channel.id,
    title: `GET READY FOR THE SETUP`,
  });

  let result = await api.callAPIMethod("chat.postMessage", message);
  debug("sendConfirmation: %o", result);
};

const initStandupQuestions = async (usersArray) => {
  console.log(usersArray);
  let channel = await api.callAPIMethod("conversations.open", {
    users: usersArray,
  });

  let message = payloads.standupQuestionsInit({
    channel_id: channel.channel.id,
    title: `PARE YOU READY TO ANSWER QUESTIONS?`,
  });

  let result = await api.callAPIMethod("chat.postMessage", message);
  debug("sendConfirmation: %o", result);
};

// Create helpdesk standupconfig. Call users.find to get the user's email address
// from their user ID

const handleUserInteraction = async (userId, view) => {
  let values = view.state.values;

  let userData = await api.callAPIMethod("users.info", {
    user: userId,
  });

  console.log(values);
  console.log(userData);
};
const create = async (userId, view) => {
  let values = view.state.values;

  let result = await api.callAPIMethod("users.info", {
    user: userId,
  });

  // await sendConfirmation(userId);

  const selectedUsers = values.users_picker_block.users.selected_users;
  await initStandupQuestions(selectedUsers);

  await writeData("database/data.json", values);
};

module.exports = { create, sendConfirmation };
