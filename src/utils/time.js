const formatConfiguredTime = (hour, minutes) => {
    const hourFormatted = hour.toString().split(":")[0];
    const minutesFormatted =
        minutes === null ? "00" : minutes.toString().split(":")[1];
    const result = `${hourFormatted}:${minutesFormatted}`;

    return result;
};

module.exports = { formatConfiguredTime };
