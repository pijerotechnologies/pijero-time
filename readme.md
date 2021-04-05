# Standup Configuration And Summary Collection Helper

## Creating a standup config using a Slash Command and a Dialog Modal

Use a slash command and a dialog to create a standup configuration. Once the standup is setup the selected users will receive an alert asking to answer 3 standup questions:
1: What did you do yesterday?
2: What will you do today?
3: Do you have any blockers?

Answers are saved on DB and will be sent to all of the initially selected users 5 minutes before standup as a summary

## Setup

### Create a Slack app

1. Create an app at [https://api.slack.com/apps](https://api.slack.com/apps)
2. Add a Slash command (See _Add a Slash Command_ section below)
3. Enable Interactive components (See _Enable Interactive Components_ below)
4. Navigate to the **OAuth & Permissions** page and select the following bot token scopes:
   - `commands`
   - `chat:write`
   - `users:read`
   - `users:read.email`
   - `im:write`
5. Click 'Save Changes' and install the app (You should get an OAuth access token after the installation)

#### Add a Slash Command

1. Go back to the app settings and click on Slash Commands.
1. Click the 'Create New Command' button and fill in the following:
   - Command: `/start-pijero-time` or just type any command name you want
   - Request URL: Your server or Glitch URL + `/command`
   - Short description: `Standup helper`
   - Usage hint: `[init standup configuration]`

#### Enable Interactive Components

1. Go back to the app settings and click on Interactive Components.
1. Set the Request URL to your server or Glitch URL + `/interactive`.
1. Save the change.

#### Enable Beta Features (this is needed for date picker)

1. Go back to the app settings and click on Beta Features on the sidebar.
1. Enable Beta Features.
1. Save the change.

#### Run the app

1. Get the code
   - Clone this repo and run `npm install`
2. Set the following environment variables to `.env`.
   - `SLACK_ACCESS_TOKEN`: Your bot token, `xoxb-` (available on the **OAuth & Permissions** once you install the app)
   - `SLACK_SIGNING_SECRET`: Your app's Signing Secret (available on the **Basic Information** page)
3. If you're running the app locally, run the app (`npm start`).

If you want to run it locally, I recommend creating a localhost tunnel with [ngrok](https://ngrok.com)!
