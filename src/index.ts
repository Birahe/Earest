import EarestClient from "./Client";
import { IntentsBitField, Partials } from "discord.js";
const client = new EarestClient({
  intents: Object.values(IntentsBitField.Flags).reduce(
    (acc, p) => acc | (p as any),
    0
  ),
  partials: [
    Partials.Channel,
    Partials.Reaction,
    Partials.GuildMember,
    Partials.User,
    Partials.Message,
  ],
  allowedMentions: {
    repliedUser: false,
  },
  rest: {
    offset: 10,
  },
});

client.start();
client.on("ready", () => {
  client.logger.log(`${client.user!.tag} is ready!`);
  client.registerCommands();
});
client.on("interactionCreate", (interaction) => {
  if (
    (interaction.isCommand() || interaction.isContextMenuCommand()) &&
    client.commandHandler.hasCommand(interaction.commandName)
  ) {
    const command = client.commandHandler.getCommand(interaction.commandName);
    if (command) {
      command.execute(client, interaction);
    }
  }
});
