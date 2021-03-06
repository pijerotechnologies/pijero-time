const Axios = require("axios");
var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", async function (req, res, next) {
  const result = await Axios.get(
    "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=SHOP&apikey=LXE8C19S0W94F5C1"
  );
  const lastRefresh = result.data["Meta Data"]["3. Last Refreshed"];
  const lastClose = result.data["Time Series (Daily)"][lastRefresh]["4. close"];

  await Axios.post(
    "https://hooks.slack.com/services/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",
    {
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `PIRKYTE MUILA *MUILAS* is now $${lastClose} <https://lt.wikipedia.org/wiki/Muilas | PERZIUREKITE WIKIPEDIJOJE>`,
          },
        },
      ],
    }
  );

  res.json({
    lastClose,
    date: new Date().toISOString(),
  });
});

module.exports = router;
