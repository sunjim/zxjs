define(['g2'],function(G2){
    'use strict';
    let baseLineChart = {
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
            }
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
                //padding: [100, 20, 30, 45] // 上右下左
            });
            this.render();
            
        },
        methods:{
            source:function() {
                this.chart.source(this.bizData);
            },
            tooltip:function() {
                this.chart.tooltip({
                    crosshairs: {
                        type: 'y',
                        share: true
                    }
                });
            },
            axis:function() {
                this.chart.scale('value', {
                    label: {
                        textStyle: {
                            fill: '#aaaaaa'
                        }
                    }
                });
                this.chart.scale('year',  {
                    label: {
                        textStyle: {
                            fill: '#aaaaaa'
                        }
                    }
                });
            },
            legend:function() {
                this.chart.legend({
                    attachLast: true
                });
            },
            position:function() {
                this.chart.line().position('day*value');
                this.chart.point().position('day*value').size(4).shape('circle').style({
                    stroke: '#fff',
                    lineWidth: 1
                });
            },
            render:function() {
                this.source();
                this.tooltip();
                this.axis();
                this.legend();
                this.position();
                this.chart.render();
            }
        
        },
        template:`<div :id="cid"></div>`
    };
    
   return baseLineChart;
});