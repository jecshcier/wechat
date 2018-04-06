const config = require(process.cwd() + '/config')
const wechat = require('wechat')
const List = require('wechat').List;
const sendMess = require('./robot')
const words = config.keyWords

let userData = {};


List.add('view', [
  // ['您好！阿C很高兴为您服务!😳😳😳😳\n\n-回复 {七夕} 查看 ->\n《测测你七夕的对象是谁》\n', function(info, req, res) {
  //     res.nowait([{
  //         title: '测测你七夕的对象是谁？',
  //         description: '来玩吧！',
  //         picurl: config.serverDomain + config.serverName + config.sourcePathName + '/images/1.png',
  //         url: 'http://cshayne.ga/77source/77.html'
  //     }]);
  // }],
  // ['\n-回复 {数据测试} 查看测试数据📖', function(info, req, res) {
  //     res.nowait(JSON.stringify(info));
  // }],
  ['您好！阿C很高兴为您服务!😳😳😳😳\n\n-回复 {幸运色} 来获取你今天的幸运色号🍀\n\n当然，您也可以跟我的客服小丢丢聊天哦！', function(info, req, res) {
    let today = new Date().toLocaleDateString();
    let data = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
    let color = '#'
    for (var i = 0; i < 6; i++) {
      color += data[parseInt(Math.random() * data.length)];
    }
    if (!userData.hasOwnProperty(info.FromUserName)) {
      userData[info.FromUserName] = {}
      userData[info.FromUserName].updateTime = today;
      userData[info.FromUserName].fortunColor = color
    } else {
      if (userData[info.FromUserName].updateTime !== today) {
        userData[info.FromUserName].updateTime = today;
        userData[info.FromUserName].fortunColor = color
      }
    }
    res.nowait(userData[info.FromUserName].fortunColor);
  }]
]);
module.exports = wechat(config.wechatConfig, wechat.text(function(message, req, res, next) {
  // 微信输入信息都在req.weixin上
  // res.wait('view');

  if (words.indexOf(message.Content) !== -1) {
    res.wait('view');
    return;
  }

  sendMess(message.Content, message.FromUserName).then((result) => {
      if (result.flag) {
        // {"intent":{"code":4200}}
        console.log(result)
        if (result.data.results) {
          let mess = result.data.results
          let content = ''
          for (var i = 0; i < mess.length; i++) {
            if (mess.resultType === "text") {
              content += mess.values.text
            } else if (mess.resultType === "image") {
              content += mess.values.image
            } else if (mess.resultType === "url") {
              content += mess.values.url
            }
          }
          res.reply(content);
        } else {
          // api调用次数使用完毕
          if (result.data.intent.code === 4003) {
            res.reply("机器人有点累啦，让她休息一会吧！");
          } else {
            res.reply("不好意思哦，机器人出现了故障。。。");
          }
        }

      }
    }).catch((e) => {
      console.log(e.message)
      res.reply("不好意思哦，机器人出现了故障。。。");
    })
    // console.log(res)
    // var message = req.weixin;
    // if (message.Content === "七夕") {
    //     res.reply([{
    //         title: '测测你七夕的对象是谁？',
    //         description: '来玩吧！',
    //         picurl: config.serverDomain + config.serverName + config.sourcePathName + '/images/1.png',
    //         url: 'http://cshayne.ga/77source/77.html'
    //     }]);
    // } else if (message.Content === "数据测试") {
    //     res.reply(JSON.stringify(message));
    // } else if (message.Content === "菜单测试") {
    //
    // } else {
    //     res.reply("说的什么玩意？");
    // }
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
}).image(function(message, req, res, next) {
  res.reply("说的什么玩意？");
  // message为图片内容
  // { ToUserName: 'gh_d3e07d51b513',
  // FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
  // CreateTime: '1359124971',
  // MsgType: 'image',
  // PicUrl: 'http://mmsns.qpic.cn/mmsns/bfc815ygvIWcaaZlEXJV7NzhmA3Y2fc4eBOxLjpPI60Q1Q6ibYicwg/0',
  // MediaId: 'media_id',
  // MsgId: '5837397301622104395' }
}).voice(function(message, req, res, next) {
  res.reply("说的什么玩意？");
  // message为音频内容
  // { ToUserName: 'gh_d3e07d51b513',
  // FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
  // CreateTime: '1359125022',
  // MsgType: 'voice',
  // MediaId: 'OMYnpghh8fRfzHL8obuboDN9rmLig4s0xdpoNT6a5BoFZWufbE6srbCKc_bxduzS',
  // Format: 'amr',
  // MsgId: '5837397520665436492' }
}).video(function(message, req, res, next) {
  res.reply("说的什么玩意？");
  // message为视频内容
  // { ToUserName: 'gh_d3e07d51b513',
  // FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
  // CreateTime: '1359125022',
  // MsgType: 'video',
  // MediaId: 'OMYnpghh8fRfzHL8obuboDN9rmLig4s0xdpoNT6a5BoFZWufbE6srbCKc_bxduzS',
  // ThumbMediaId: 'media_id',
  // MsgId: '5837397520665436492' }
}).shortvideo(function(message, req, res, next) {
  res.reply("说的什么玩意？");
  // message为短视频内容
  // { ToUserName: 'gh_d3e07d51b513',
  // FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
  // CreateTime: '1359125022',
  // MsgType: 'shortvideo',
  // MediaId: 'OMYnpghh8fRfzHL8obuboDN9rmLig4s0xdpoNT6a5BoFZWufbE6srbCKc_bxduzS',
  // ThumbMediaId: 'media_id',
  // MsgId: '5837397520665436492' }
}).location(function(message, req, res, next) {
  res.reply("说的什么玩意？");
  // message为位置内容
  // { ToUserName: 'gh_d3e07d51b513',
  // FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
  // CreateTime: '1359125311',
  // MsgType: 'location',
  // Location_X: '30.283950',
  // Location_Y: '120.063139',
  // Scale: '15',
  // Label: {},
  // MsgId: '5837398761910985062' }
}).link(function(message, req, res, next) {
  res.reply("说的什么玩意？");
  // message为链接内容
  // { ToUserName: 'gh_d3e07d51b513',
  // FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
  // CreateTime: '1359125022',
  // MsgType: 'link',
  // Title: '公众平台官网链接',
  // Description: '公众平台官网链接',
  // Url: 'http://1024.com/',
  // MsgId: '5837397520665436492' }
}).event(function(message, req, res, next) {
  res.wait('view');
  // message为事件内容
  // { ToUserName: 'gh_d3e07d51b513',
  // FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
  // CreateTime: '1359125022',
  // MsgType: 'event',
  // Event: 'LOCATION',
  // Latitude: '23.137466',
  // Longitude: '113.352425',
  // Precision: '119.385040',
  // MsgId: '5837397520665436492' }
}).device_text(function(message, req, res, next) {
  res.reply("说的什么玩意？");
  // message为设备文本消息内容
  // { ToUserName: 'gh_d3e07d51b513',
  // FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
  // CreateTime: '1359125022',
  // MsgType: 'device_text',
  // DeviceType: 'gh_d3e07d51b513'
  // DeviceID: 'dev1234abcd',
  // Content: 'd2hvc3lvdXJkYWRkeQ==',
  // SessionID: '9394',
  // MsgId: '5837397520665436492',
  // OpenID: 'oPKu7jgOibOA-De4u8J2RuNKpZRw' }
}).device_event(function(message, req, res, next) {
  res.reply("说的什么玩意？");
  // message为设备事件内容
  // { ToUserName: 'gh_d3e07d51b513',
  // FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
  // CreateTime: '1359125022',
  // MsgType: 'device_event',
  // Event: 'bind'
  // DeviceType: 'gh_d3e07d51b513'
  // DeviceID: 'dev1234abcd',
  // OpType : 0, //Event为subscribe_status/unsubscribe_status时存在
  // Content: 'd2hvc3lvdXJkYWRkeQ==', //Event不为subscribe_status/unsubscribe_status时存在
  // SessionID: '9394',
  // MsgId: '5837397520665436492',
  // OpenID: 'oPKu7jgOibOA-De4u8J2RuNKpZRw' }
}))