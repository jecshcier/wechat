const request = require('request')
const config = require('../config')
const robot = config.robotConfig
let userData = {}

const postReq = (url, data) => {
  let info = {
    flag: false,
    message: '',
    data: null
  }
  return new Promise((resolve, reject) => {
    request.post({
      url: url,
      body: data,
      json: true
    }, function optionalCallback(err, httpResponse, body) {
      if (err) {
        info.message = err
        console.log("错误")
        reject(info)
      } else {
        if (typeof body === "object" && body) {
          console.log("ok")
          info.flag = true
          info.message = "send ok"
          info.data = body
          resolve(info)
        } else {
          info.message = '500'
          reject(info)
        }
      }
    })
  })
}

const sendMess = (message, userID) => {
  console.log(userData)
  if (!userData[userID]) {
    userData[userID] = parseInt(Math.random() * 5)
  }
  return postReq(robot.url, {
    "reqType": 0,
    "perception": {
      "inputText": {
        "text": message
      },
      "inputImage": {
        "url": ""
      }
    },
    "userInfo": {
      "apiKey": robot.apiKey[userData[userID]],
      "userId": userID.replace(/[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g,"")
    }
  })

}


// 3小时清一次api缓存
setInterval(() => {
  userData = {}
}, 1000 * 60 * 60 * 3)


module.exports = sendMess