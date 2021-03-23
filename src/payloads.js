module.exports = {
  confirmation: (context) => {
    return {
      channel: context.channel_id,
      text: 'Helpdesk ticket created!',
      blocks: JSON.stringify([
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: '*Helpdesk ticket created!*',
          },
        },
        {
          type: 'divider',
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*Title*\n${context.title}\n\n*Description*\n${context.description}`,
          },
        },
        {
          type: 'context',
          elements: [
            {
              type: 'mrkdwn',
              text: `*Urgency*: ${context.urgency}`,
            },
          ],
        },
      ]),
    }
  },
  standupQuestions: (context) => {
    return {
      trigger_id: context.trigger_id,
      view: JSON.stringify({
        type: 'modal',
        callback_id: 'standup_questions_modal',
        submit: {
          type: 'plain_text',
          text: 'Submit',
          emoji: true,
        },
        close: {
          type: 'plain_text',
          text: 'Cancel',
          emoji: true,
        },
        title: {
          type: 'plain_text',
          text: 'Stand-up Questions',
          emoji: true,
        },
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: 'Please answer these questions',
            },
          },
          {
            block_id: 'what_did_you_do_yesterday',
            type: 'input',
            element: {
              type: 'plain_text_input',
              multiline: true,
              action_id: 'answer',
            },
            label: {
              type: 'plain_text',
              text: 'What did you do yesterday?',
            },
          },
          {
            block_id: 'what_will_you_do_today',
            type: 'input',
            element: {
              type: 'plain_text_input',
              multiline: true,
              action_id: 'answer',
            },
            label: {
              type: 'plain_text',
              text: 'What will you do today?',
            },
          },
          {
            block_id: 'do_you_have_any_blockers',
            type: 'input',
            element: {
              type: 'plain_text_input',
              multiline: true,
              action_id: 'answer',
            },
            label: {
              type: 'plain_text',
              text: 'Do you have any blockers?',
            },
          },
        ],
      }),
    }
  },

  answersSummary: (context) => {
    return {
      channel: context.channel_id,
      blocks: JSON.stringify([
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: '*STANDUP SUMMARY*',
          },
        },
        {
          type: 'divider',
        },
        {
          type: 'section',
          text: {
            type: 'plain_text',
            text: context.content,
            emoji: true,
          },
        },
      ]),
    }
  },
  standupQuestionsInit: (context) => {
    return {
      channel: context.channel_id,

      blocks: JSON.stringify([
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text:
              'Get your team up to speed by answering a few standup questions',
          },
        },
        {
          type: 'actions',
          elements: [
            {
              type: 'button',
              text: {
                type: 'plain_text',
                emoji: true,
                text: 'Start',
              },
              style: 'primary',
              value: 'standup_questions',
            },
          ],
        },
      ]),
    }
  },
  standupConfig: (context) => {
    return {
      trigger_id: context.trigger_id,
      view: JSON.stringify({
        callback_id: 'standup_config',
        type: 'modal',
        submit: {
          type: 'plain_text',
          text: 'Submit',
          emoji: true,
        },
        close: {
          type: 'plain_text',
          text: 'Cancel',
          emoji: true,
        },
        title: {
          type: 'plain_text',
          text: 'Pijero Time',
          emoji: true,
        },
        blocks: [
          {
            type: 'header',
            text: {
              type: 'plain_text',
              text: 'Configure your stands',
              emoji: true,
            },
          },
          {
            type: 'divider',
          },
          {
            block_id: 'reminder_picker_block',
            type: 'input',
            element: {
              type: 'timepicker',
              initial_time: '09:00',
              placeholder: {
                type: 'plain_text',
                text: 'Select time',
                emoji: true,
              },
              action_id: 'reminder_time',
            },
            label: {
              type: 'plain_text',
              text: 'Reminder time',
              emoji: true,
            },
          },
          {
            type: 'divider',
          },
          {
            block_id: 'reminder_minutes_block',
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: 'Reminder minutes',
            },
            accessory: {
              type: 'static_select',
              placeholder: {
                type: 'plain_text',
                text: 'Select an item',
                emoji: true,
              },
              options: [
                {
                  text: {
                    type: 'plain_text',
                    text: '00:00',
                    emoji: true,
                  },
                  value: '0',
                  value: '00:00',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:01',
                    emoji: true,
                  },
                  value: '00:01',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:02',
                    emoji: true,
                  },
                  value: '00:02',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:03',
                    emoji: true,
                  },
                  value: '00:03',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:04',
                    emoji: true,
                  },
                  value: '00:04',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:05',
                    emoji: true,
                  },
                  value: '00:05',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:06',
                    emoji: true,
                  },
                  value: '00:06',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:07',
                    emoji: true,
                  },
                  value: '00:07',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:08',
                    emoji: true,
                  },
                  value: '00:08',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:09',
                    emoji: true,
                  },
                  value: '00:09',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:10',
                    emoji: true,
                  },
                  value: '00:10',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:11',
                    emoji: true,
                  },
                  value: '00:11',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:12',
                    emoji: true,
                  },
                  value: '00:12',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:13',
                    emoji: true,
                  },
                  value: '00:13',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:14',
                    emoji: true,
                  },
                  value: '00:14',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:15',
                    emoji: true,
                  },
                  value: '00:15',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:16',
                    emoji: true,
                  },
                  value: '00:16',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:17',
                    emoji: true,
                  },
                  value: '00:17',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:18',
                    emoji: true,
                  },
                  value: '00:18',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:19',
                    emoji: true,
                  },
                  value: '00:19',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:20',
                    emoji: true,
                  },
                  value: '00:20',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:21',
                    emoji: true,
                  },
                  value: '00:21',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:22',
                    emoji: true,
                  },
                  value: '00:22',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:23',
                    emoji: true,
                  },
                  value: '00:23',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:24',
                    emoji: true,
                  },
                  value: '00:24',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:25',
                    emoji: true,
                  },
                  value: '00:25',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:26',
                    emoji: true,
                  },
                  value: '00:26',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:27',
                    emoji: true,
                  },
                  value: '00:27',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:28',
                    emoji: true,
                  },
                  value: '00:28',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:29',
                    emoji: true,
                  },
                  value: '00:29',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:30',
                    emoji: true,
                  },
                  value: '00:30',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:31',
                    emoji: true,
                  },
                  value: '00:31',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:32',
                    emoji: true,
                  },
                  value: '00:32',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:33',
                    emoji: true,
                  },
                  value: '00:33',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:34',
                    emoji: true,
                  },
                  value: '00:34',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:35',
                    emoji: true,
                  },
                  value: '00:35',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:36',
                    emoji: true,
                  },
                  value: '00:36',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:37',
                    emoji: true,
                  },
                  value: '00:37',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:38',
                    emoji: true,
                  },
                  value: '00:38',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:39',
                    emoji: true,
                  },
                  value: '00:39',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:40',
                    emoji: true,
                  },
                  value: '00:40',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:41',
                    emoji: true,
                  },
                  value: '00:41',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:42',
                    emoji: true,
                  },
                  value: '00:42',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:43',
                    emoji: true,
                  },
                  value: '00:43',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:44',
                    emoji: true,
                  },
                  value: '00:44',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:45',
                    emoji: true,
                  },
                  value: '00:45',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:46',
                    emoji: true,
                  },
                  value: '00:46',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:47',
                    emoji: true,
                  },
                  value: '00:47',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:48',
                    emoji: true,
                  },
                  value: '00:48',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:49',
                    emoji: true,
                  },
                  value: '00:49',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:50',
                    emoji: true,
                  },
                  value: '00:50',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:51',
                    emoji: true,
                  },
                  value: '00:51',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:52',
                    emoji: true,
                  },
                  value: '00:52',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:53',
                    emoji: true,
                  },
                  value: '00:53',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:54',
                    emoji: true,
                  },
                  value: '00:54',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:55',
                    emoji: true,
                  },
                  value: '00:55',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:56',
                    emoji: true,
                  },
                  value: '00:56',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:57',
                    emoji: true,
                  },
                  value: '00:57',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:58',
                    emoji: true,
                  },
                  value: '00:58',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:59',
                    emoji: true,
                  },
                  value: '00:59',
                },
              ],
              action_id: 'reminder_time_minutes',
            },
          },
          {
            block_id: 'standup_picker_block',
            type: 'input',
            element: {
              type: 'timepicker',
              initial_time: '09:00',
              placeholder: {
                type: 'plain_text',
                text: 'Select time',
                emoji: true,
              },
              action_id: 'standup_picker',
            },
            label: {
              type: 'plain_text',
              text: 'Standup time',
              emoji: true,
            },
          },
          {
            block_id: 'standup_minutes_picker_block',
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: 'Standup minutes',
            },
            accessory: {
              type: 'static_select',
              placeholder: {
                type: 'plain_text',
                text: 'Select an item',
                emoji: true,
              },
              options: [
                {
                  text: {
                    type: 'plain_text',
                    text: '00:00',
                    emoji: true,
                  },
                  value: '0',
                  value: '00:00',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:01',
                    emoji: true,
                  },
                  value: '00:01',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:02',
                    emoji: true,
                  },
                  value: '00:02',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:03',
                    emoji: true,
                  },
                  value: '00:03',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:04',
                    emoji: true,
                  },
                  value: '00:04',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:05',
                    emoji: true,
                  },
                  value: '00:05',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:06',
                    emoji: true,
                  },
                  value: '00:06',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:07',
                    emoji: true,
                  },
                  value: '00:07',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:08',
                    emoji: true,
                  },
                  value: '00:08',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:09',
                    emoji: true,
                  },
                  value: '00:09',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:10',
                    emoji: true,
                  },
                  value: '00:10',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:11',
                    emoji: true,
                  },
                  value: '00:11',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:12',
                    emoji: true,
                  },
                  value: '00:12',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:13',
                    emoji: true,
                  },
                  value: '00:13',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:14',
                    emoji: true,
                  },
                  value: '00:14',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:15',
                    emoji: true,
                  },
                  value: '00:15',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:16',
                    emoji: true,
                  },
                  value: '00:16',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:17',
                    emoji: true,
                  },
                  value: '00:17',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:18',
                    emoji: true,
                  },
                  value: '00:18',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:19',
                    emoji: true,
                  },
                  value: '00:19',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:20',
                    emoji: true,
                  },
                  value: '00:20',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:21',
                    emoji: true,
                  },
                  value: '00:21',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:22',
                    emoji: true,
                  },
                  value: '00:22',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:23',
                    emoji: true,
                  },
                  value: '00:23',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:24',
                    emoji: true,
                  },
                  value: '00:24',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:25',
                    emoji: true,
                  },
                  value: '00:25',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:26',
                    emoji: true,
                  },
                  value: '00:26',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:27',
                    emoji: true,
                  },
                  value: '00:27',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:28',
                    emoji: true,
                  },
                  value: '00:28',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:29',
                    emoji: true,
                  },
                  value: '00:29',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:30',
                    emoji: true,
                  },
                  value: '00:30',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:31',
                    emoji: true,
                  },
                  value: '00:31',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:32',
                    emoji: true,
                  },
                  value: '00:32',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:33',
                    emoji: true,
                  },
                  value: '00:33',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:34',
                    emoji: true,
                  },
                  value: '00:34',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:35',
                    emoji: true,
                  },
                  value: '00:35',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:36',
                    emoji: true,
                  },
                  value: '00:36',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:37',
                    emoji: true,
                  },
                  value: '00:37',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:38',
                    emoji: true,
                  },
                  value: '00:38',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:39',
                    emoji: true,
                  },
                  value: '00:39',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:40',
                    emoji: true,
                  },
                  value: '00:40',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:41',
                    emoji: true,
                  },
                  value: '00:41',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:42',
                    emoji: true,
                  },
                  value: '00:42',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:43',
                    emoji: true,
                  },
                  value: '00:43',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:44',
                    emoji: true,
                  },
                  value: '00:44',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:45',
                    emoji: true,
                  },
                  value: '00:45',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:46',
                    emoji: true,
                  },
                  value: '00:46',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:47',
                    emoji: true,
                  },
                  value: '00:47',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:48',
                    emoji: true,
                  },
                  value: '00:48',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:49',
                    emoji: true,
                  },
                  value: '00:49',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:50',
                    emoji: true,
                  },
                  value: '00:50',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:51',
                    emoji: true,
                  },
                  value: '00:51',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:52',
                    emoji: true,
                  },
                  value: '00:52',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:53',
                    emoji: true,
                  },
                  value: '00:53',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:54',
                    emoji: true,
                  },
                  value: '00:54',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:55',
                    emoji: true,
                  },
                  value: '00:55',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:56',
                    emoji: true,
                  },
                  value: '00:56',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:57',
                    emoji: true,
                  },
                  value: '00:57',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:58',
                    emoji: true,
                  },
                  value: '00:58',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '00:59',
                    emoji: true,
                  },
                  value: '00:59',
                },
              ],
              action_id: 'standup_minutes',
            },
          },
          {
            type: 'divider',
          },
          {
            block_id: 'days_picker_block',
            type: 'input',
            element: {
              type: 'checkboxes',
              options: [
                {
                  text: {
                    type: 'plain_text',
                    text: 'Monday',
                    emoji: true,
                  },
                  value: 'monday',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: 'Tuesday',
                    emoji: true,
                  },
                  value: 'tuesday',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: 'Wednesday',
                    emoji: true,
                  },
                  value: 'wednesday',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: 'Thursday',
                    emoji: true,
                  },
                  value: 'thursday',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: 'Friday',
                    emoji: true,
                  },
                  value: 'friday',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: 'Saturday',
                    emoji: true,
                  },
                  value: 'saturday',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: 'Sunday',
                    emoji: true,
                  },
                  value: 'sunday',
                },
              ],
              action_id: 'days_picker',
            },
            label: {
              type: 'plain_text',
              text: 'Active days',
              emoji: true,
            },
          },
          {
            type: 'divider',
          },
          {
            block_id: 'users_picker_block',
            type: 'input',
            element: {
              type: 'multi_users_select',
              placeholder: {
                type: 'plain_text',
                text: 'Select users',
                emoji: true,
              },
              action_id: 'users',
            },
            label: {
              type: 'plain_text',
              text: 'Team members',
              emoji: true,
            },
          },
        ],
      }),
    }
  },
}
