const express = require('express')
const app = express()
const path = require('path')

app.use('/upload', express.static(path.join(__dirname, 'upload')));


/*##############################   body-parser中间件     #######################################*/

// POST 请求中间件
const bodyParser = require('body-parser');
// POST body-parser 中间件配置
app.use(bodyParser.urlencoded({extended: false}));
// parse application/json
app.use(bodyParser.json());


/*################################   路由挂载   #####################################*/

let indexRouter = require('./routers/index')

app.use('/', indexRouter)


/*###############################  监听服务  ######################################*/

const port = 3000
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
