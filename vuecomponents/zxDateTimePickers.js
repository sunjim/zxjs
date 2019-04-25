define(['zxcore'],function(zxcore){
    'use strict';
    let zxinput = {
        props:{
            startLabel:{
                type:String,
                default:'Strart'
            },
            startName:{
                type:String,
                default:'startName'
            },
            endName:{
                type:String,
                default:'endName'
            }
        },
        data:function(){
            return{
                start_time:'',
                end_time:''
            }
        },
        methods:{
            startTime:function(date_timepicker_start){
                let that = this;
                zxcore.datetimepicker('.'+date_timepicker_start,{
                    format:'Y/m/d',
                    onShow:function( ct ){
                        this.setOptions({
                            maxDate:that.end_time?that.end_time:false
                        })
                    },
                    timepicker:false,
                    onChangeDateTime: function (dp, $input) {
                        that.start_time = $input.val();
                    }
                });
            },
            endTime:function(date_timepicker_end){
                let that = this;
                zxcore.datetimepicker('.'+date_timepicker_end,{
                    format:'Y/m/d',
                    timepicker:false,
                    onShow:function( ct ){
                        this.setOptions({
                            minDate:that.start_time?that.start_time:false
                        })
                    },
                    onChangeDateTime: function (dp, $input) {
                        that.end_time = $input.val();
                    }
                });
            },
        
        },
        template:`
        <div class="input-group">
            {{startLabel}} <input class="date_timepicker_start form-control text-left" v-model="start_time" :name="startName" @focus="startTime('date_timepicker_start')">
            <div class="input-group-append">
                <div class="input-group-text"><i class="now-ui-icons ui-2_time-alarm"></i></div>
            </div>
            <input class="date_timepicker_end form-control text-right" v-model="end_time" :name="endName" @focus="endTime('date_timepicker_end')">
        </div>
        `
    };
    
   return zxinput;
});