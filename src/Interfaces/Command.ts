import EarestClient from "Client";
import {
  ApplicationCommandOptionData,
  ApplicationCommandType,
  Interaction,
  LocaleString,
} from "discord.js";

export interface Command {
  name: string;
  nameLocalizations: Partial<Record<LocaleString, string>>;
  description: string;
  descriptionLocalizations: Partial<Record<LocaleString, string>>;
  options: Array<ApplicationCommandOptionData>;
  type: ApplicationCommandType;
  execute: (client: EarestClient, interaction: Interaction) => void;
}
