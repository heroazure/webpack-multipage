/**
 * Created by xuwei on 2017/4/20.
 */
import 'assets/css/index.less'
import './style.less'
import Vue from 'vue'
import $ from 'jquery'
$(function () {
    'use strict';
    [1,2].forEach((item)=>{
        console.log(item)
    })
})

let vm=new Vue({
    el:'#content',
    data:{
        name:'',
        pwd:'',
        result:''
    },
    methods:{
        onSubmit(){
            this.result=this.name+'::'+this.pwd
            $.ajax({
                url:'/api/APIShoot_order/getDayMonthOrdersDetail',
                method:'get',
                dataType:'json',
                success:function (data) {
                    console.log(data)
                },
                error:function (error) {
                    console.log(error)
                }
            })
        }
    }
})