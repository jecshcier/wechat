const request = require('request')
const config = require('../config')
const robot = config.robotConfig

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
          info.flag = true
          info.message = body.message
          info.data = body.results
          resolve(info)
        } else {
          info.message = '500'
          reject(info)
        }
      }
    })
  })
}

const sendMess = () => {
  return postReq(robot.url, {
    "reqType": 0,
    "perception": {
      "inputText": {
        "text": "我帅不帅"
      },
      "inputImage": {
        "url": ""
      }
    },
    "userInfo": {
      "apiKey": robot.apiKey,
      "userId": robot.userId
    }
  })
}


module.exports = sendMess