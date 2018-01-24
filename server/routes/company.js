/**
 * Created by lichun on 2018/1/16.
 */
import company from '../models/company'
const Router = require('koa-router')
const router = Router()

//按照公司名字查询
router.all('/query_by_name',async (ctx) => {
    let name = ctx.query.name || ctx.request.body.name
    let pn = parseInt(ctx.query.pn || ctx.request.body.pn) || 0
    let ps = parseInt(ctx.query.ps || ctx.request.body.ps) || 20
    let list = await company.find({name: name?eval(`/${name}/`): /.*/}, {name: 1, qyfddbrzs: 1, yyzz: 1}).skip(pn * ps).limit(ps)

    list.forEach(item => {
        item.qyfddbrzs.phoneNo = ''
    })
    ctx.body = ctx.body = {
        code: 100,
        msg: 'ok',
        data: {
            list
        }
    }


})
// 按照资质查询
router.all('/query_by_zizhi',async (ctx) => {
    let zizhi1 = ctx.query.zizhi1 || ctx.request.body.zizhi1 || /.*/
    let zizhi2 = ctx.query.zizhi2 || ctx.request.body.zizhi2 || /.*/
    let pn = parseInt(ctx.query.pn || ctx.request.body.pn) || 0
    let ps = parseInt(ctx.query.ps || ctx.request.body.ps) || 20

    let list = await company.find({$and: [{'zizhi.name': zizhi1}, {'zizhi.name': zizhi2}]}, {name: 1, qyfddbrzs: 1, yyzz: 1}).skip(pn*ps).limit(ps)
    if(list) {
        list.forEach(item => {
            item.qyfddbrzs.phoneNo = ''
        })
    }
    ctx.body = {
        code: 100,
        msg: 'ok',
        data: {
            list
        }
    }



})

router.all('/query_by_cid',async (ctx) => {
    let cid = ctx.query.cid || ctx.request.body.cid
    let res = await company.find({_id: cid})
    let data = res[0]
    data.lxrxx.mphone = data.lxrxx.mphone.replace(/(.*)(\d{4})(\d{3})$/, ($0, $1, $2, $3) => $1 + '****' + $3)
    data.lxrxx.phone = data.lxrxx.phone.replace(/(.*)(\d{4})(\d{3})$/, ($0, $1, $2, $3) => $1 + '****' + $3)

    if(res && res.length) {
        ctx.body = {
            code: 100,
            msg: 'ok',
            data
        }
    }else {
        ctx.body = {
            code: 200,
            msg: 'no result',
            data: {}
        }
    }




})

export default router