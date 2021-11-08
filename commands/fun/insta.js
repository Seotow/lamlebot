const axios = require('axios').default;
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'ig',
	category: 'extra',
	run: async (client, message, args) => {
		if (!args[0]) {
			return message.channel.send('Please Enter a Channel Name');
		}
		
		let res = axios.get('https://www.instagram.com/coco20002/?__a=1&page=3')
			.then((response) => {console.log(response.data)})

		return
		// try {
		// 	// account = response.data;
		// 	// details = account.graphql.user;

		// } catch (error) {
		// 	return message.channel.send('Not A Account');
		// }

		const embed = new MessageEmbed()
			.setTitle(`${details.is_verified ? `${details.username} <a:verified:727820439497211994>` : ` ${details.username}`} ${details.is_private ? '🔒' : ''} `)
			.setDescription(details.biography)
			.setThumbnail(details.profile_pic_url)
			.addFields(
				{
					name: 'Total Posts:',
					value: details.edge_owner_to_timeline_media.count.toLocaleString(),
					inline: true,
				},
				{
					name: 'Followers:',
					value: details.edge_followed_by.count.toLocaleString(),
					inline: true,
				},
				{
					name: 'Following:',
					value: details.edge_follow.count.toLocaleString(),
					inline: true,
				},
			);
		return message.channel.send(embed);
	},
};