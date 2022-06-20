import {Command} from "../../Interfaces";
import {MessageEmbed} from "discord.js";
import {QueryType} from "discord-player";

const command: Command = {
    name: "play",
    description: "Plays music in your voice channel.",
    options: [
        {
            name: "query",
            type: "STRING",
            description: "The name or link of the song which you want to play.",
            required: true,
        }
    ],
    type: "CHAT_INPUT",
    execute: async (client, interaction) => {
        if (!interaction.isCommand()) return;
        if (!interaction.guild || !interaction.guildId) return interaction.reply("You cannot use this command except in guilds.")
        const query = interaction.options.getString("query")!
        const {channel} = interaction.guild.members.cache.get(interaction.user.id)!.voice
        if (!channel) return interaction.reply({
            embeds: [
                new MessageEmbed()
                    .setTitle(":x: You need to be in a voice channel!")
                    .setColor("RED")
                    .setFooter({
                        text: interaction.user.tag,
                        iconURL: interaction.user.displayAvatarURL({dynamic: true})
                    })
            ]
        })
        let queue = client.player.getQueue(interaction.guildId)
        if (queue && interaction.guild.me!.voice.channelId !== channel.id) return interaction.reply({
            embeds: [
                new MessageEmbed()
                    .setTitle(":x: You need to be in the same voice channel with me!")
                    .setColor("RED")
                    .setFooter({
                        text: interaction.user.tag,
                        iconURL: interaction.user.displayAvatarURL({dynamic: true})
                    })
            ]
        })
        if (!queue) queue = await client.player.createQueue(interaction.guildId!, {
            autoSelfDeaf: true,
            initialVolume: 50,
            leaveOnEmpty: true,
            metadata: {
                channel: interaction.guild!.channels.cache.get(interaction.channelId),
                requester: interaction.member
            }
        }).connect(channel)
        interaction.reply({
            embeds: [
                new MessageEmbed()
                    .setTitle(":mag_right: Searching...")
                    .setColor("BLURPLE")
                    .setFooter({
                        text: interaction.user.tag,
                        iconURL: interaction.user.displayAvatarURL({dynamic: true})
                    })
            ]
        })
        const res = await client.player.search(query, {
            requestedBy: interaction.user,
            searchEngine: QueryType.AUTO,
        })

        await queue.addTrack(res.tracks[0])
        if(!queue.playing) queue.play();
    },
};

export default command;
