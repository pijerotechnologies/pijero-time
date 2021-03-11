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
  fs.writeFile(file, formattedData, callback);

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

const sendAnswers = async (usersArray, data) => {
  let channel = await api.callAPIMethod("conversations.open", {
    users: usersArray,
  });

  let message = payloads.answersSummary({
    channel_id: channel.channel.id,
    content: JSON.stringify(data.response),
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
  let data = {};

  switch (view.external_id) {
    case "standup_questions":
      data = {
        response: {
          user: userId,
          firstAnswer: values.standup_question_one.answer.value,
          secondAnswer: values.standup_question_two.answer.value,
          thirdAnswer: values.standup_question_three.answer.value,
        },
      };
      const usersInChannel = await readData("database/data.json").then(
        (data) => data.users_picker_block.users.selected_users
      );

      await sendAnswers(usersInChannel, data);

      await writeData("database/answers.json", data);
      break;
    default:
      const selectedUsers = values.users_picker_block.users.selected_users;
      await initStandupQuestions(selectedUsers);

      await writeData("database/data.json", values);
  }

  console.log(data);
};

module.exports = { sendConfirmation, handleUserInteraction };
