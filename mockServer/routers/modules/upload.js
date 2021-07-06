const express = require('express')
const router = express.Router();

/*  图片上传中间件 */
var multer = require('multer');
var moment = require('moment');
var timestamp = '';
var timepath = moment().format('YYYY-MM-DD');
var destination = '/upload/' + timepath;
var filename = '';

var storage = multer.diskStorage({
  //这里destination是一个字符串
  destination: '.' + destination,
  filename: function(req, file, cb) {
    //自定义设置文件的名字
    timestamp = new Date().getTime();
    let filenameArr = file.originalname.split('.');
    let mimetypename = filenameArr[filenameArr.length - 1];
    filename = 'upload-' + timestamp + '.' + mimetypename;
    cb(null, filename)
  }
});

var upload = multer({
  storage: storage
});



//处理来自页面的ajax请求。单文件上传
//多文件上传使用upload.array('file', number)
router.post('/api/uploadImage', upload.single('file'), function(req, res, next) {
  console.log(req.file);
  //拼接文件上传后的路径
  var url = destination + '/' + filename;
  res.json({
    code: 200,
    msg: '上传成功',
    imageUrl: url
  })
});


module.exports = router
