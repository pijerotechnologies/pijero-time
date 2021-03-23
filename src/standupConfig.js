const debug = require('debug')('slash-command-template:standupconfig')

const api = require('./api')
const payloads = require('./payloads')

const { filePaths } = require('./constants')
const { writeData, readData, appendData } = require('./utils/fileWrite')
const { json } = require('body-parser')

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
  const formattedText = await Promise.all(
    data.map(async (item) => {
      const response = await api.callAPIMethod('users.info', {
        user: item.userId,
      })
      return `user: ${response.user.real_name}\n What did you do yesterday: ${item.first}\n What will you do today: ${item.second}\n Do you have any blockers: ${item.third}\n`
    }),
  )

  const text = formattedText.join('\n \n')

  usersArray.forEach(async (element) => {
    let message = payloads.answersSummary({
      channel_id: element,
      content: text,
    })

    let result = await api.callAPIMethod('chat.postMessage', message)
    debug('sendConfirmation: %o', result)

    // return res.send('')
  })
}

const initStandupQuestions = async (usersArray) => {
  usersArray.forEach(async (element) => {
    let message = payloads.standupQuestionsInit({
      channel_id: element,
      title: `Reminder to answer the standup questions`,
    })

    let result = await api.callAPIMethod('chat.postMessage', message)
    debug('sendConfirmation: %o', result)
    // return res.send('')
  })
}

// Create helpdesk standupconfig. Call users.find to get the user's email address
// from their user ID

const handleUserInteraction = async (userId, view) => {
  let values = view.state.values
  let data = {}

  switch (view.callback_id) {
    case 'standup_questions_modal':
      data = {
        userId,
        first: values.what_did_you_do_yesterday.answer.value,
        second: values.what_will_you_do_today.answer.value,
        third: values.do_you_have_any_blockers.answer.value,
      }

      const usersInChannel = await readData('database/data.json').then(
        (data) => data.users_picker_block.users.selected_users,
      )

      await appendData('database/answers.json', data)

      let currentAnswers = await readData('database/answers.json')
        .then((data) => data)
        .catch((error) => {
          throw new Error('Error reading data: ', error)
        })

      console.log(currentAnswers)

      await sendAnswers(usersInChannel, currentAnswers.answers)

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

module.exports = {
  sendConfirmation,
  handleUserInteraction,
  create,
  initStandupQuestions,
}
