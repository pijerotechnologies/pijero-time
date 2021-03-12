const debug = require('debug')('slash-command-template:standupconfig')

const api = require('./api')
const payloads = require('./payloads')

const { filePaths } = require('./constants')
const { writeData, readData } = require('./utils/fileWrite')

/*
 *  Send standupconfig creation confirmation via
 *  chat.postMessage to the user who created it
 */
const sendConfirmation = async (userId) => {
  let channel = await api.callAPIMethod('conversations.open', {
    users: [userId],
  })

  let message = payloads.confirmation({
    channel_id: channel.channel.id,
    title: `selected users: `,
  })

  let result = await api.callAPIMethod('chat.postMessage', message)
  debug('sendConfirmation: %o', result)
}

const sendAnswers = async (usersArray, data) => {
  console.log(data)
  let channel = await api.callAPIMethod('conversations.open', {
    users: usersArray,
  })

  let message = payloads.answersSummary({
    channel_id: channel.channel.id,
    content: JSON.stringify(data.response),
  })

  let result = await api.callAPIMethod('chat.postMessage', message)
  debug('sendConfirmation: %o', result)
}

const initStandupQuestions = async (usersArray) => {
  console.log(usersArray)
  let channel = await api.callAPIMethod('conversations.open', {
    users: usersArray,
  })

  let message = payloads.standupQuestionsInit({
    channel_id: channel.channel.id,
    title: `PARE YOU READY TO ANSWER QUESTIONS?`,
  })

  let result = await api.callAPIMethod('chat.postMessage', message)
  console.log(result)
  debug('sendConfirmation: %o', result)
}

// Create helpdesk standupconfig. Call users.find to get the user's email address
// from their user ID

const handleUserInteraction = async (userId, view) => {
  let values = view.state.values
  let userData = await api.callAPIMethod('users.info', {
    user: userId,
  })
  let data = {}

  switch (view.external_id) {
    case 'standup_questions':
      data = {
        response: {
          user: userId,
          firstAnswer: values.standup_question_one.answer.value,
          secondAnswer: values.standup_question_two.answer.value,
          thirdAnswer: values.standup_question_three.answer.value,
        },
      }
      const usersInChannel = await readData('database/data.json').then(
        (data) => data.users_picker_block.users.selected_users,
      )

      // const formatData = JSON.stringify(data);

      // await fs.appendFile("database/answers.json", formatData, callback);

      // function callback(err) {
      //   console.log(`err ${err}`);
      // }

      let currentAnswers = await readData('database/answers.json').then(
        (data) => data,
      )

      console.log('CURRENT DATA')
      console.log(currentAnswers)

      await sendAnswers(usersInChannel, data)
      await writeData('database/answers.json', data)

      break
    default:
      const selectedUsers = values.users_picker_block.users.selected_users
      await initStandupQuestions(selectedUsers)

      await writeData('database/data.json', values)
  }
}

const create = async (userId, view) => {
  const result = await api.callAPIMethod('users.info', {
    user: userId,
  })
  const timeZone = result.user.tz
  const timeZoneObj = {
    clientTimeZone: timeZone,
  }
  const values = view.state.values
  const data = {
    ...values,
    ...timeZoneObj,
  }

  writeData(filePaths.standupConfig, data)

  await sendConfirmation({
    userId,
  })
}

module.exports = { sendConfirmation, handleUserInteraction, create }
