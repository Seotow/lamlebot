const axios = require('axios')
const { MessageEmbed } = require('discord.js')
const { stripIndent } = require('common-tags')

module.exports = {
    name: 'instagram',
    aliases: ['ig', 'instagram', 'insta'],
    category: 'fun',
    run: async (client, message, args) => {
        const string = args.join(' ');
        if(!string) { 
            return message.reply({ 
                content: `Djt me ${author} nhập cc gì đấy`
            }) 
        }
        const author = message.author.username;
        const url = `https://www.instagram.com/${string}/channel/?__a=1`
        let response
        axios.get('https://www.instagram.com/__thuyb/?__a=1')
            .then(res => console.log(res.data))
        return
        try {
        } catch (e) {
            return message.reply({ 
                content: `Djt me ${author} nhập sai link rồi`
            })
        }
        // const user = response.data.graphql.user
        // console.log(response.data);
        

        const username = user.username
        const desc = user.biography,
        followers = user.edge_followed_by.count,
        followings = user.edge_followed.count,
        fullName = user.full_name,
        isPrivate = user.is_private,
        avatar = user.profile_pic_url_hd,
        postNumber = user.edge_owner_to_timeline_media.count;

        // const embed = new MessageEmbed()
        //     .setColor('RANDOM')
        //     .setTitle(fullName)
        //     .setURL(`https://www.instagram.com/${url}`)
        //     .setThumbnail(avatar)
        //     .addField('Thông tin cá nhân', stripIndent`**- Tên người dùng: ** ${username}}
        //     **- Tên đầy đủ: ** ${fullName}
        //     **- Mô tả: ** ${desc}
        //     **- Số người theo dõi: ** ${followers}
        //     **- Đang theo dõi: ** ${followings}
        //     **- Số lượng bài đăng : ** ${postNumber}
        //     **- Tài khoản private: ** ${isPrivate ? 'Có 🔒' : 'Không 🔓'}`)

        // message.channel.send(embed)

    }
}