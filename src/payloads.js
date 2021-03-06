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
};
