import { Queue } from "discord-player";
import { TextChannel } from "discord.js";
import EarestClient from "../Client";

interface IMetadata {
  channel: TextChannel;
}

export default function (client: EarestClient): void {
  client.logger.log("Loading player events...");
  let { player } = client;
  player.on("trackStart", async function (queue, track) {
    (queue.metadata as IMetadata).channel.send(`Now playing: ${track.title}`);
  });
  client.logger.log("Player events loaded!");
}
