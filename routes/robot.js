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
          console.log("ok")
          info.flag = true
          info.message = "okok"
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

const sendMess = (message) => {
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
      "apiKey": robot.apiKey,
      "userId": robot.userId
    }
  })
}


module.exports = sendMess