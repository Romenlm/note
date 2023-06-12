const router = require('koa-router')()
const db = require('../db/mysql')
router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

router.get('/mysql', async (ctx, next) => {
  let data = await db.query(`select * from user`)
  console.log(data)
  ctx.body = data
})

module.exports = router
