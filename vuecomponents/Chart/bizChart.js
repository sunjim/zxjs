define([],function(){
    'use strict';
    let BizChar = {
        props:{
            cid:{
                type:String,
                default:'biz1',
            },
            bizData:{
                type:Array,
                default:[],
            },
            heightData:{
                type:String,
                default:window.innerHeight
            },
            download:{
                type:String,
                default:'当日累计注册量'
            },
            register:{
                type:String,
                default:'当日累计下载量'
            },
            bill:{
                type:String,
                default:'当日累计成交量'
            },
        },
        data(){
            return {
                chart:null,
            }
        },
        mounted:function(){
            this.chart = new G2.Chart({
                container: this.cid,
                forceFit: true,
                height: this.heightData,
                padding: [100, 20, 30, 45] // 上右下左
            });
            this.render();
            
        },
        watch:{
            bizData:function(val,old){
                this.chart.changeData(val);
            }
        },
        methods:{
            source:function() {
                this.chart.source(this.bizData);
            },
            tooltip:function() {
                let that = this;
                this.chart.tooltip({
                    follow: false,
                    crosshairs: 'y',
                    htmlContent: function htmlContent(title, items) {
                        var alias = {
                            download: that.download,
                            register: that.register,
                            bill: that.bill
                        };
                        var html = '<div class="custom-tooltip">';
                        for (var i = 0; i < items.length; i++) {
                            var item = items[i];
                            var color = item.color;
                            var name = alias[item.name];
                            var value = item.value;
                            var domHead = '<div class="custom-tooltip-item" style="border-left-color:' + color + '">';
                            var domName = '<div class="custom-tooltip-item-name">' + name + '</div>';
                            var domValue = '<div class="custom-tooltip-item-value">' + value + '</div>';
                            var domTail = '</div>';
                            html += domHead + domName + domValue + domTail;
                        }
                        return html + '</div>';
                    }
                });
            },
            axis:function() {
                this.chart.axis('date', {
                    label: {
                        textStyle: {
                            fill: '#aaaaaa'
                        }
                    }
                });
                this.chart.axis('value', {
                    label: {
                        textStyle: {
                            fill: '#aaaaaa'
                        },
                        formatter: function formatter(text) {
                            return text.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
                        }
                    }
                });
            },
            legend:function() {
                this.chart.legend(false);
            },
            position:function() {
                this.chart.line().position('date*value').color('type');
            },
            render:function() {
                this.source();
                this.tooltip();
                this.axis();
                this.legend();
                this.position();
                this.chart.render();
                this.chart.showTooltip({
                    x: $("#mountNode").width() - 20,
                    y: 100
                });
            }
        
        },
        template:`<div :id="cid"></div>`
    };
    
   return BizChar;
});