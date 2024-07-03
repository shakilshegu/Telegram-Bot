const TelegramBot = require("node-telegram-bot-api");

// Replace the value below with the Telegram token you receive from @BotFather
const token = "7181897528:AAF01LSVMvO1DxU_p6hTk29SNBCMuwtw8pw";

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

// Create an object to store user language preferences
const userLanguagePreferences = {};

// Listen for the /start command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const keyboard = {
    reply_markup: {
      inline_keyboard: [
        [
          { text: "English", callback_data: "english" },
          { text: "Chinese", callback_data: "chinese" },
        ],
      ],
    },
  };

  bot
    .sendMessage(chatId, "Please select a language:", keyboard)
    .catch((error) => {
      console.log("Error sending message:", error);
    });
});

bot.on("callback_query", (query) => {
  const chatId = query.message.chat.id;

  // Set the user's language preference
  if (query.data === "english") {
    userLanguagePreferences[chatId] = "english";
    const options = {
      caption:
        "Cryptocurrency Projects: Facilitating exposure for cryptocurrency, and Web3 projects through targeted advertising solutions",
      reply_markup: {
        inline_keyboard: [
          [
            { text: "❤️Button 1", callback_data: "button1" },
            { text: "📁Button 2", callback_data: "button2" },
          ],
          [
            { text: "💕Button 3", callback_data: "button3" },
            { text: "👍Button 4👍", callback_data: "button4" },
          ],
        ],
      },
    };
    bot.sendMessage(chatId, options.caption, options).catch((error) => {
      console.log("Error sending message:", error);
    });
  } else if (query.data === "chinese") {
    userLanguagePreferences[chatId] = "chinese";
    const options = {
      caption:
        "您选择了英语！加密货币项目推广：通过定向广告解决方案提升加密货币和Web3项目的曝光度",
      reply_markup: {
        inline_keyboard: [
          [
            { text: "❤️按钮 1", callback_data: "button1" },
            { text: "📁按钮 2", callback_data: "button2" },
          ],
          [
            { text: "💕按钮 3", callback_data: "button3" },
            { text: "👍按钮 4👍", callback_data: "button4" },
          ],
        ],
      },
    };

    bot.sendMessage(chatId, options.caption, options).catch((error) => {
      console.log("Error sending message:", error);
    });
  }

  // Acknowledge the callback query to remove the loading spinner
  bot.answerCallbackQuery(query.id).catch((error) => {
    console.log("Error answering callback query:", error);
  });
});

// Example of sending a message based on the user's language preference
bot.onText(/\/example/, (msg) => {
  const chatId = msg.chat.id;
  const language = userLanguagePreferences[chatId] || "english"; // Default to English if no preference is set

  if (language === "english") {
    bot
      .sendMessage(chatId, "This is an example message in English.")
      .catch((error) => {
        console.log("Error sending message:", error);
      });
  } else if (language === "chinese") {
    bot.sendMessage(chatId, "这是一个中文的示例消息。").catch((error) => {
      console.log("Error sending message:", error);
    });
  }
});
