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
