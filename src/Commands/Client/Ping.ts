import { ApplicationCommandType } from "discord.js";
import { Command } from "./../../Interfaces";
const command: Command = {
  name: "ping",
  nameLocalizations: {
    tr: "gecikme",
  },
  description: "Shows the latency of bot.",
  descriptionLocalizations: {
    tr: "Botun gecikmesini gönderir.",
  },
  options: [],
  type: ApplicationCommandType.ChatInput,
  execute: (client, interaction) => {
    if (!interaction.isCommand()) return;
    interaction.reply({
      content: `Pong! **${client.ws.ping}ms**`,
      ephemeral: true,
    });
  },
};

export default command;
