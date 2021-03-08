const debug = require("debug")("slash-command-template:standupconfig");
const api = require("./api");
const payloads = require("./payloads");

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
    let values = view.state.values;

    let result = await api.callAPIMethod("users.info", {
        user: userId,
    });

    console.log(values);

    await sendConfirmation({
        userId,
    });
};

module.exports = { create, sendConfirmation };
