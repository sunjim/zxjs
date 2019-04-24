define([],function(){
    'use strict';
    let zxinput = {
        props:{
            zxLabel:{
                type: String,
                default: '设置金额',
                
            },
            zxName:{
                type:String,
                default:'money'
            },
            val:{
                type:Number,
                default:0,
            }
        },
        data:function(){
            return {
                value:this.val
            }
        },
        filters: {
            money: function(val) {
                if(!val) {
                    val = "0";
                }
                val = val.toString().replace(/\$|\,/g,'');
                let sign = (val == (val = Math.abs(val)));
                val = Math.floor(val*100+0.50000000001);
                let cents = val%100;
                val = Math.floor(val/100).toString();
                if(cents<10) {
                    cents = "0" + cents
                }
                for (var i = 0; i < Math.floor((val.length-(1+i))/3); i++) {
                    val = val.substring(0,val.length-(4*i+3))+',' + val.substring(val.length-(4*i+3));
                }
                return (((sign)?'':'-') + val + '.' + cents);
            },
        },
        template:`
                    <div class="form-group row">
                        <label for="title" class="col-sm-2 col-form-label">{{zxLabel}}</label>
                        <div class="col-sm-9">
                            <div class="input-group row">
                                <div class="input-group-prepend">
                                    <span class="input-group-text text-primary" >¥<strong class="ml-1 mr-3">{{value|money}}</strong></span>
                                </div>
                                <input class="form-control" type="test" :name="zxName" placeholder="这里输入金额" v-model="value">
                            </div>
                        </div>
                    </div>
                `
    };
    
   return zxinput;
});