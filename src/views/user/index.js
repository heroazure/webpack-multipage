/**
 * Created by xuwei on 2017/4/20.
 */
import 'assets/css/index.less'
import $ from 'jquery'
$(function () {
    'use strict'
    console.log('process.env.NODE_ENV:',process.env.NODE_ENV)
    if(process.env.NODE_ENV==='pro'){
        var qq=44
        console.log(qq)
    }
})