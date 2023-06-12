const Koa = require('koa');
const Router = require('@koa/router')
const bodyParser = require('koa-bodyparser')
const session = require('koa-session')
// 引入模版引擎
const views = require('koa-views')
const serve = require('koa-static')
const app = new Koa();

const router = new Router()

// 配置中间件

// session 的使用
// 设置cookie加密，里面的为密钥
app.keys = ['some secret hurr'];

const CONFIG = {
    key: 'koa.sess', /** cookie的名称 */
    maxAge: 86400000, /** cookie 过期时间 */
    autoCommit: true, /** (boolean) automatically commit headers (default true) */
    overwrite: true, /** (boolean) can overwrite or not (default true) */
    httpOnly: true, /** 是否只允许服务端获取 */
    signed: true, /** 签名，加密使用到，默认开启 */
    rolling: true, /** 没次请求都修改过期时间， */
    renew: false, /** session快过期了，再修改过期时间 */
    secure: false, /** 是否只https来设置cookie*/
    sameSite: null, /** (string) session cookie sameSite options (default null, don't set it) */
};

app.use(session(CONFIG, app));

app.use(views(__dirname + '/views', {
    map: {
        html: 'ejs'
    }
}))
// 配置 koa-bodyparser 中间件
app.use(bodyParser())
app.use(serve('public'))

// 错误级中间件
app.use(async (ctx,next) => {
    //
    console.log('1. 匹配中间件')
    await next(); // 注意要添加 await
    console.log('3.错误处理')
    if(ctx.status === 404){
        ctx.body = '404:没有找到对应的路由'
    }
});

// 配置中间件
// ctx 上下文 content ，包含了request 和response 等信息
// 访问所有路由都会触发，应用级中间件
// app.use(async (ctx,next) => {
//     console.log('中间件');
//     // 添加全局数据
//     ctx.state.username = '张三'
//     await next(); // 注意要添加 await
// });

// 只有访问首页时才出发的中间件
// router.get('/',async (ctx, next)=>{
//     console.log('2.访问首页时的中间件')
//     await next()
// })
// 访问首页路由配置路由
router.get('/',async (ctx)=>{
    // 设置cookie,目前值为中文
    ctx.cookies.set('username','lisi',{maxAge:1000*60})
    // 设置session
    ctx.session.username = '张三' // 可以直接写汉语
    ctx.body = '你好，首页' // 此方法不用加await
})

router.get('/new',async (ctx)=>{
    // console.log(ctx.request.query)
    // console.log(ctx.request.querystring)
    // console.log(ctx.query) // 最常用
    // console.log(ctx.querystring)
    // ctx.body = '你好，新闻页面'
    // 返回一个json数据
    ctx.body = {
        reqQuery:ctx.query
    }
})

// 动态路由,使用：
router.get('/new/:id',async (ctx)=>{
    // 获取动态路由数据
    let param = ctx.params
    ctx.body = {
        id:param.id
    }
})

// 渲染模版
router.get('/render',async (ctx)=>{
    let title = '你好，这是一个标题'
    // 获取动态路由数据,第一个参数是模版文件名，第二个参数是要渲染的动态数据
    await ctx.render('index.html',{title})
})

// post 请求

router.post('/doLogin',async (ctx)=>{
    // 获取表单中的数据
    console.log(ctx.request.body)
    ctx.body = '接受post过来的数据'
})

// 接受put的值
router.put('/edit',async (ctx)=>{
    // 获取表单中的数据
    console.log(ctx.request.body)
    ctx.body = '接受put过来的数据'
})

// 获取cookies值
router.get('/get',async (ctx)=>{
    let cookie = ctx.cookies.get('username')
    console.log(cookie)
    ctx.body = cookie
})

// 获取session值
router.get('/getSession',async (ctx)=>{
    // 获取session的值
    ctx.body = ctx.session.username
})

// 启动路由
app.use(router.routes())
    .use(router.allowedMethods())
app.listen(3000,()=>{
    console.log('启动在： http://localhost:3000')
});