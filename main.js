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
    if (userId === '759139546113507348') {
      // Get the new voice channel
      const voiceChannel = client.channels.cache.get(newState.channelID);
      // Make sure the voice channel is defined
      // if (voiceChannel && voiceChannel.type === 'voice' && voiceChannel.guild.id === '1019697365558505583') {
      if (voiceChannel && voiceChannel.type === 'voice') {
        joinVC(voiceChannel);
      } else {
        leaveVC();
      }
    }
  }
});

function joinVC(channel) {
  if (!channel) {
    console.log('Not in a voice channel');
    return;
  }
  channel.join().then(() => {
    console.log('Joined voice channel');
  }).catch(error => {
    console.log(`Error joining voice channel: ${error}`);
  });
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
