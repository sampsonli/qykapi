/**
 * Created by lichun on 2018/1/16.
 */
import company from '../models/company'
const Router = require('koa-router')
const router = Router()

//按照公司名字查询
router.all('/query_by_name',async (ctx) => {
    let name = ctx.query.name || ctx.request.body
    ctx.body = await company.find({name: eval(`/${name}/`)}, {name: 1}).limit(1)
})
// 按照资质查询
router.all('/query_by_zizhi',async (ctx) => {
    let zizhi1 = ctx.query.zizhi1 || ctx.request.zizhi1
    let zizhi2 = ctx.query.zizhi2 || ctx.request.zizhi2
    console.log(zizhi1)
    console.log(zizhi2)
    ctx.body = await company.find({'zizhi.name': zizhi1, 'zizhi.name': zizhi2}, {name: 1, zizhi: 1}).count()
})

export default router