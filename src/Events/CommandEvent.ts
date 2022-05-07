import { Event } from "../Interfaces/Events";

const event: Event<"interactionCreate"> = {
  name: "interactionCreate",
  once: true,
  run(client, interaction) {
    if (
      (interaction.isCommand() || interaction.isContextMenuCommand()) &&
      client.commandHandler.hasCommand(interaction.commandName)
    ) {
      const command = client.commandHandler.getCommand(interaction.commandName);
      if (command) {
        command.execute(client, interaction);
      }
    }
  },
};

export default event;
