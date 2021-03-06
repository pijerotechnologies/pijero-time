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
              emoji: true,
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
              emoji: true,
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
              emoji: true,
            },
          },
        ],
      }),
    };
  },
  modal: (context) => {
    return {
      trigger_id: context.trigger_id,
      view: JSON.stringify({
        type: "modal",
        title: {
          type: "plain_text",
          text: "Submit a helpdesk ticket",
        },
        callback_id: "submit-ticket",
        submit: {
          type: "plain_text",
          text: "Submit",
        },
        blocks: [
          {
            block_id: "title_block",
            type: "input",
            label: {
              type: "plain_text",
              text: "Title",
            },
            element: {
              action_id: "title",
              type: "plain_text_input",
            },
            hint: {
              type: "plain_text",
              text: "30 second summary of the problem",
            },
          },
          {
            block_id: "description_block",
            type: "input",
            label: {
              type: "plain_text",
              text: "Description",
            },
            element: {
              action_id: "description",
              type: "plain_text_input",
              multiline: true,
            },
            optional: true,
          },
          {
            block_id: "urgency_block",
            type: "input",
            label: {
              type: "plain_text",
              text: "Importance",
            },
            element: {
              action_id: "urgency",
              type: "static_select",
              options: [
                {
                  text: {
                    type: "plain_text",
                    text: "High",
                  },
                  value: "high",
                },
                {
                  text: {
                    type: "plain_text",
                    text: "Medium",
                  },
                  value: "medium",
                },
                {
                  text: {
                    type: "plain_text",
                    text: "Low",
                  },
                  value: "low",
                },
              ],
            },
            optional: true,
          },
        ],
      }),
    };
  },
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
  modal: (context) => {
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
            type: "input",
            element: {
              type: "timepicker",
              initial_time: "13:37",
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
            type: "input",
            element: {
              type: "timepicker",
              initial_time: "13:37",
              placeholder: {
                type: "plain_text",
                text: "Select time",
                emoji: true,
              },
              action_id: "timepicker-action",
            },
            label: {
              type: "plain_text",
              text: "Standup time",
              emoji: true,
            },
          },
          {
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
              action_id: "reminder_time_minutes",
            },
          },
          {
            type: "divider",
          },
          {
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
              action_id: "checkboxes-action",
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
            type: "input",
            element: {
              type: "multi_users_select",
              placeholder: {
                type: "plain_text",
                text: "Select users",
                emoji: true,
              },
              action_id: "team_members",
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
