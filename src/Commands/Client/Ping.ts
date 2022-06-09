import { ApplicationCommandTypes } from "discord.js/typings/enums";
import { Command } from "../../Interfaces";
const command: Command = {
  name: "ping",
  description: "Shows the latency of bot.",
  options: [],
  type: "CHAT_INPUT",
  execute: (client, interaction) => {
    if (!interaction.isCommand()) return;
    interaction.reply({
      content: `Pong! **${client.ws.ping}ms**`,
      ephemeral: true,
    });
  },
};

export default command;
