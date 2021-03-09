module.exports = {
  confirmation: (context) => {
    return {
      channel: context.channel_id,
      text: "Helpdesk ticket created!",
      blocks: JSON.stringify([
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "*Helpdesk ticket created!*",
          },
        },
        {
          type: "divider",
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*Title*\n${context.title}\n\n*Description*\n${context.description}`,
          },
        },
        {
          type: "context",
          elements: [
            {
              type: "mrkdwn",
              text: `*Urgency*: ${context.urgency}`,
            },
          ],
        },
      ]),
    };
  },
  standupQuestions: (context) => {
    return {
      trigger_id: context.trigger_id,
      view: JSON.stringify({
        type: "modal",
        submit: {
          type: "plain_text",
          text: "Submit",
          emoji: true,
        },
        close: {
          type: "plain_text",
          text: "Cancel",
          emoji: true,
        },
        title: {
          type: "plain_text",
          text: "Stand-up Questions",
          emoji: true,
        },
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: "Please answer these questions",
            },
          },
          {
            type: "input",
            element: {
              type: "plain_text_input",
              action_id: "standup_question_one",
            },
            label: {
              type: "plain_text",
              text: "What did you do yesterday?",
            },
          },
          {
            type: "input",
            element: {
              type: "plain_text_input",
              action_id: "standup_question_two",
            },
            label: {
              type: "plain_text",
              text: "What will you do today?",
            },
          },
          {
            type: "input",
            element: {
              type: "plain_text_input",
              action_id: "standup_question_three",
            },
            label: {
              type: "plain_text",
              text: "Do you have any blockers?",
            },
          },
        ],
      }),
    };
  },
  standupQuestionsInit: (context) => {
    return {
      channel: context.channel_id,
      blocks: JSON.stringify([
        {
          type: "actions",
          elements: [
            {
              type: "button",
              text: {
                type: "plain_text",
                text: "Answer Questions",
                emoji: true,
              },
              value: "click_me_123",
              action_id: "start_questions",
            },
          ],
        },
      ]),
    };
  },

  standupConfig: (context) => {
    return {
      trigger_id: context.trigger_id,
      view: JSON.stringify({
        type: "modal",
        submit: {
          type: "plain_text",
          text: "Submit",
          emoji: true,
        },
        close: {
          type: "plain_text",
          text: "Cancel",
          emoji: true,
        },
        title: {
          type: "plain_text",
          text: "Pijero Time",
          emoji: true,
        },
        blocks: [
          {
            type: "header",
            text: {
              type: "plain_text",
              text: "Configure your stands",
              emoji: true,
            },
          },
          {
            type: "divider",
          },
          {
            block_id: "reminder_picker_block",
            type: "input",
            element: {
              type: "timepicker",
              initial_time: "09:00",
              placeholder: {
                type: "plain_text",
                text: "Select time",
                emoji: true,
              },
              action_id: "reminder_time",
            },
            label: {
              type: "plain_text",
              text: "Reminder time",
              emoji: true,
            },
          },
          {
            type: "divider",
          },
          {
            block_id: "reminder_minutes_block",
            type: "section",
            text: {
              type: "mrkdwn",
              text: "Reminder minutes",
            },
            accessory: {
              type: "static_select",
              placeholder: {
                type: "plain_text",
                text: "Select an item",
                emoji: true,
              },
              options: [
                {
                  text: {
                    type: "plain_text",
                    text: "00:00",
                    emoji: true,
                  },
                  value: "0",
                },
                {
                  text: {
                    type: "plain_text",
                    text: "00:15",
                    emoji: true,
                  },
                  value: "15",
                },
                {
                  text: {
                    type: "plain_text",
                    text: "00:30",
                    emoji: true,
                  },
                  value: "30",
                },
                {
                  text: {
                    type: "plain_text",
                    text: "00:45",
                    emoji: true,
                  },
                  value: "45",
                },
              ],
              action_id: "reminder_time_minutes",
            },
          },
          {
            block_id: "standup_picker_block",
            type: "input",
            element: {
              type: "timepicker",
              initial_time: "09:00",
              placeholder: {
                type: "plain_text",
                text: "Select time",
                emoji: true,
              },
              action_id: "standup_picker",
            },
            label: {
              type: "plain_text",
              text: "Standup time",
              emoji: true,
            },
          },
          {
            block_id: "standup_minutes_picker_block",
            type: "section",
            text: {
              type: "mrkdwn",
              text: "Standup minutes",
            },
            accessory: {
              type: "static_select",
              placeholder: {
                type: "plain_text",
                text: "Select an item",
                emoji: true,
              },
              options: [
                {
                  text: {
                    type: "plain_text",
                    text: "00:00",
                    emoji: true,
                  },
                  value: "0",
                },
                {
                  text: {
                    type: "plain_text",
                    text: "00:15",
                    emoji: true,
                  },
                  value: "15",
                },
                {
                  text: {
                    type: "plain_text",
                    text: "00:30",
                    emoji: true,
                  },
                  value: "30",
                },
                {
                  text: {
                    type: "plain_text",
                    text: "00:45",
                    emoji: true,
                  },
                  value: "45",
                },
              ],
              action_id: "standup_minutes",
            },
          },
          {
            type: "divider",
          },
          {
            block_id: "days_picker_block",
            type: "input",
            element: {
              type: "checkboxes",
              options: [
                {
                  text: {
                    type: "plain_text",
                    text: "Monday",
                    emoji: true,
                  },
                  value: "monday",
                },
                {
                  text: {
                    type: "plain_text",
                    text: "Tuesday",
                    emoji: true,
                  },
                  value: "tuesday",
                },
                {
                  text: {
                    type: "plain_text",
                    text: "Wednesday",
                    emoji: true,
                  },
                  value: "wednesday",
                },
                {
                  text: {
                    type: "plain_text",
                    text: "Thursday",
                    emoji: true,
                  },
                  value: "thursday",
                },
                {
                  text: {
                    type: "plain_text",
                    text: "Friday",
                    emoji: true,
                  },
                  value: "friday",
                },
                {
                  text: {
                    type: "plain_text",
                    text: "Saturday",
                    emoji: true,
                  },
                  value: "saturday",
                },
                {
                  text: {
                    type: "plain_text",
                    text: "Sunday",
                    emoji: true,
                  },
                  value: "sunday",
                },
              ],
              action_id: "days_picker",
            },
            label: {
              type: "plain_text",
              text: "Active days",
              emoji: true,
            },
          },
          {
            type: "divider",
          },
          {
            block_id: "users_picker_block",
            type: "input",
            element: {
              type: "multi_users_select",
              placeholder: {
                type: "plain_text",
                text: "Select users",
                emoji: true,
              },
              action_id: "users",
            },
            label: {
              type: "plain_text",
              text: "Team members",
              emoji: true,
            },
          },
        ],
      }),
    };
  },
};
