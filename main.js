const Discord = require('discord.js-selfbot');
const client = new Discord.Client({
  checkUpdate: false,
  intents: Discord.Intents.ALL,
});

client.on('ready', () => {
  console.log(`Logged as: ${client.user.tag}`);
  joinVC();
});

client.on('voiceStateUpdate', (oldState, newState) => {
  // Check if the user's voice channel has changed
  if (oldState.channelID !== newState.channelID) {
    const userId = newState.id;
    if (userId === '763515736622104597') {
      // Get the new voice channel
      const voiceChannel = client.channels.cache.get(newState.channelID);
      // Make sure the voice channel is defined
      if (voiceChannel && voiceChannel.type === 'voice') {
        joinVC(voiceChannel);
      } else {
        leaveVC();
      }
    }
  }
});

async function joinVC(channel) {
  if (!channel) {
    console.log('Not in a voice channel');
    return;
  }

  // Check if the bot has permission to connect and speak
  const permissions = channel.permissionsFor(client.user);
  if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
    console.log('Bot does not have permission to connect or speak in the voice channel');
    return;
  }

  try {
    // Join the voice channel with a specified region (replace 'your_region' with the desired region)
    await channel.join({ force: true, selfDeaf: false, selfMute: false, region: 'your_region' });
    console.log('Joined voice channel');
  } catch (error) {
    console.log(`Error joining voice channel: ${error}`);
  }
}

function leaveVC() {
  const voiceChannel = client.voice.channel;
  if (!voiceChannel) {
    console.log('Not in a voice channel');
    return;
  }
  voiceChannel.leave().then(() => {
    console.log('Left voice channel');
  }).catch(error => {
    console.log(`Error leaving voice channel: ${error}`);
  });
}


const keepAlive = require('./server.js');
keepAlive();

client.login(process.env.TOKEN);
