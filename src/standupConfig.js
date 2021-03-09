const debug = require("debug")("slash-command-template:standupconfig");
const { zonedTimeToUtc, utcToZonedTime, format } = require("date-fns-tz");

const api = require("./api");
const payloads = require("./payloads");

const { filePaths } = require("./constants");
const { writeData } = require("./utils/fileWrite");

/*
 *  Send standupconfig creation confirmation via
 *  chat.postMessage to the user who created it
 */
const sendConfirmation = async (standupconfig) => {
    // open a DM channel for that user

    let channel = await api.callAPIMethod("conversations.open", {
        users: [standupconfig.userId],
    });

    let message = payloads.confirmation({
        channel_id: channel.channel.id,
        title: `selected users: `,
    });

    let result = await api.callAPIMethod("chat.postMessage", message);
    debug("sendConfirmation: %o", result);
};

const sendTestMsg = async (users) => {
    let channel = await api.callAPIMethod("conversations.open", {
        users,
    });

    let message = payloads.confirmation({
        channel_id: channel.channel.id,
        title: "test",
    });

    let result = await api.callAPIMethod("chat.postMessage", message);
};

// Create helpdesk standupconfig. Call users.find to get the user's email address
// from their user ID
const create = async (userId, view) => {
    const result = await api.callAPIMethod("users.info", {
        user: userId,
    });
    const timeZone = result.user.tz;
    const zonedDate = {
        clientTime: new Date().toLocaleString("en-US", {
            timeZone,
        }),
    };
    const values = view.state.values;
    const data = {
        ...values,
        ...zonedDate,
    };

    writeData(filePaths.standupConfig, data);

    const reminderTime = values.reminder_picker_block.reminder_time;
    const reminderTimeMinutes =
        values.reminder_minutes_block.reminder_time_minutes;
    const standupTime = values.standup_picker_block.standup_picker;
    const standupTimeMinutes =
        values.standup_minutes_picker_block.standup_minutes;
    const daysPicker = values.days_picker_block.days_picker;
    const usersPicker = values.users_picker_block.users;

    console.log({ reminderTime });
    console.log({ reminderTimeMinutes });
    console.log({ standupTime });
    console.log({ standupTimeMinutes });
    console.log({ daysPicker });
    console.log({ usersPicker });

    await sendConfirmation({
        userId,
    });
};

module.exports = { create, sendConfirmation };
