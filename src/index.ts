import EarestClient from "./Client";
import { Intents } from "discord.js";
const client = new EarestClient({
  intents: Object.values(Intents.FLAGS).reduce((acc, p) => acc | p, 0),
  partials: ["CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION", "USER"],
  allowedMentions: {
    repliedUser: false,
  },
  restTimeOffset: 10,
});

client.start();
