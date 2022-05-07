import EarestClient from "Client";
import {
  ApplicationCommandOptionData,
  ApplicationCommandType,
  Interaction,
} from "discord.js";

export interface Command {
  name: string;
  description: string;
  options: Array<ApplicationCommandOptionData>;
  type: ApplicationCommandType;
  execute: (client: EarestClient, interaction: Interaction) => void;
}
