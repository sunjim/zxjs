define(['zxcore'],function(zxcore){
    'use strict';
    let zxinput = {
        props:{
            dateLabel:{
                type:String,
                default:'Strart'
            },
            className:{
                type:String,
                default:'className'
            },
            dateName:{
                type:String,
                default:'startName'
            },
        },
        data:function(){
            return{
                date_time:'',
            }
        },
        methods:{
            startTime:function(signle_date_time_picker){
                let that = this;
                zxcore.datetimepicker('.'+signle_date_time_picker,{
                    format:'Y-m-d',
                    onShow:function( ct ){
                        this.setOptions({
                            maxDate:that.date_time?that.date_time:false
                        })
                    },
                    timepicker:false,
                    onChangeDateTime: function (dp, $input) {
                        that.start_time = $input.val();
                    }
                });
            },
        },
        template:`
        <div class="form-group row">
            <label for="buy_price" class="col-md-2 col-form-label text-right">{{dateLabel}}</label>
            <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9 input-group">
                <input :class="className" class="form-control text-left" v-model="date_time" :name="dateName" @focus="startTime(className)">
                <div class="input-group-append">
                    <div class="input-group-text"><i class="now-ui-icons ui-2_time-alarm"></i></div>
                </div>
            </div>
        </div>
        `
    };
    
   return zxinput;
});