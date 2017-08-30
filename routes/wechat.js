var config = require(process.cwd() + '/config')
var wechat = require('wechat')
module.exports = wechat(config.wechatConfig, function(req, res, next) {
    // 微信输入信息都在req.weixin上

    var message = req.weixin;
    if (message.Content === "七夕") {
        res.reply([{
            title: '测测你七夕的对象是谁？',
            description: '来玩吧！',
            picurl: config.serverDomain + config.serverName + config.sourcePathName + '/images/1.png',
            url: 'http://cshayne.ga/77source/77.html'
        }]);
    } else {
        res.reply(config.serverDomain);
    }
    // if (message.FromUserName === 'diaosi') {
    //     // 回复屌丝(普通回复)
    //     res.reply('hehe');
    // } else if (message.FromUserName === 'text') {
    //     //你也可以这样回复text类型的信息
    //     res.reply({
    //         content: 'text object',
    //         type: 'text'
    //     });
    // } else if (message.FromUserName === 'hehe') {
    //     // 回复一段音乐
    //     res.reply({
    //         type: "music",
    //         content: {
    //             title: "来段音乐吧",
    //             description: "一无所有",
    //             musicUrl: "http://mp3.com/xx.mp3",
    //             hqMusicUrl: "http://mp3.com/xx.mp3",
    //             thumbMediaId: "thisThumbMediaId"
    //         }
    //     });
    // } else {
    //     // 回复高富帅(图文回复)
    //     res.reply([{
    //         title: '你来我家接我吧',
    //         description: '这是女神与高富帅之间的对话',
    //         picurl: 'http://nodeapi.cloudfoundry.com/qrcode.jpg',
    //         url: 'http://nodeapi.cloudfoundry.com/'
    //     }]);
    // }
})
