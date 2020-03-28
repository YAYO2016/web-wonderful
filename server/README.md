#1.如果需要搭建https的服务的话，那就需要去读取https的认证文件

const fs = require('fs')
const https = require('https')

const privateKey = fs.readFileSync('https/book_youbaobao_xyz.key', 'utf8')
const certificate = fs.readFileSync('https/book_youbaobao_xyz.pem', 'utf8')
const credentials = { key: privateKey, cert: certificate }
const httpsServer = https.createServer(credentials, app)
const SSLPORT = 18082
httpsServer.listen(SSLPORT, function() {
  console.log('HTTPS Server is running on: https://localhost:%s', SSLPORT)
})

#2.npm i -S body-parser
安装body-parser，这样可以通过req.body获取POST请求中的参数
const bodyParser = require('body-parser')

// 创建 express 应用
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

#npm i -S cors
如果请求接口出现这种跨域的报错Access to XMLHttpRequest at 'https://book.youbaobao.xyz:18082/user/login' from origin 'http://localhost:9527' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.
const cors = require('cors')
// ...
app.use(cors())
再次请求即可成功，这里我们在 Network 中会发现发起了两次 https 请求，这是因为由于触发跨域，所以会首先进行 OPTIONS 请求，判断服务端是否允许跨域请求，如果允许才能实际进行请求

#npm i -S mysql
安装 mysql 库：连接mysql数据库和进行mysql的操作

#npm i -S crypto
安装crypto，进行md5密码的加密处理

#npm i express-validator -S
可以快速实现表单的验证

#npm i jsonwebtoken -S
生成 JWT Token
