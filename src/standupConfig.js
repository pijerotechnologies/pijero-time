const debug = require('debug')('slash-command-template:standupconfig')

const api = require('./api')
const payloads = require('./payloads')

const { filePaths } = require('./constants')
const {
  writeData,
  readData,
  appendData,
  addData,
} = require('./utils/fileWrite')
const { json } = require('body-parser')

const sendAnswers = async (usersArray, data) => {
  const formattedData = await Promise.all(
    data.map(async (item) => {
      const response = await api.callAPIMethod('users.info', {
        user: item.userId,
      })
      return `user: ${response.user.real_name}\n What did you do yesterday: ${item.first}\n What will you do today: ${item.second}\n Do you have any blockers: ${item.third}\n`
    }),
  )

  const formattedMessage = formattedData.join('\n \n')

  usersArray.forEach(async (element) => {
    let message = payloads.answersSummary({
      channel_id: element,
      content: formattedMessage,
    })

    let result = await api.callAPIMethod('chat.postMessage', message)
    debug('sendAnswers: %o', result)

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

    await addData(
      'database/utils.json',
      { ts: result.ts, channel: result.channel },
      'answers_summary_btn_timestamp',
    )

    debug('initStandupQuestions: %o', result)
    // return res.send('')
  })
}

const handleUserInteraction = async (userId, view) => {
  // @todo disable 'start' buttons after the user submitted data or limit user to answer once
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

      await appendData('database/answers.json', data, 'answers')

      updateMessage('answers_summary_btn_timestamp', userId)

      break
    default:
      const selectedUsers = values.users_picker_block.users.selected_users
      await initStandupQuestions(selectedUsers)
      await writeData('database/data.json', values)
  }
}

const updateMessage = async (target, userId) => {
  const timeStampToUpdate = await readData(filePaths.utils).then(
    (data) => data[target],
  )

  let message = payloads.updatedMessage({
    channel_id: timeStampToUpdate.channel,
    time_stamp: timeStampToUpdate.ts,
  })

  let result = await api.callAPIMethod('chat.update', message)

  debug('sendAnswers: %o', result)
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
}

module.exports = {
  handleUserInteraction,
  create,
  initStandupQuestions,
  sendAnswers,
}
