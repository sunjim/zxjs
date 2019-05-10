define(['g2Set'],function(DataSet){
    'use strict';
    const radarChart = {
        props:{
            pid:{
                type:String,
                default:'personal1'
            },
            personalData:{
                type:Array,
                default:null
            }
        },
        data(){
            return {
                chart:null,
            }
        },
        mounted(){
            this.chart = new G2.Chart({
                container: this.pid,
                forceFit: true,
                height: window.innerHeight,
                padding: [20, 20, 95, 20]
            });
            this.render();
        },
        methods:{
            mapData:function() {
                let row = _.map(this.personalData,function(row){
                    let base = row.target;
                    row.target = 100//设置目标值
                    row.avarage = parseInt(row.target*0.6)//设置平均值
                    let signle = parseInt(row.real*100/base);
                    if(signle&&signle>140){
                        row.real = 140;
                    }else{
                        row.real = signle;
                    }
                    return row;
                });
                return row;
            },
            source:function() {
                let dv = new DataSet.View().source(this.mapData());
                dv.transform({
                    type: 'fold',
                    fields: ['target', 'avarage','real'], // 展开字段集
                    key: 'user', // key字段
                    value: 'score' // value字段
                });
                this.chart.source(dv, {
                    score: {
                        min: 0,
                        max: 140
                    }
                });
            },
            coord:function() {
                this.chart.coord('polar', {
                    radius: 0.8
                });
            },
            axis:function() {
                this.chart.axis('item', {
                    line: null,
                    tickLine: null,
                    grid: {
                        lineStyle: {
                            lineDash: null
                        },
                        hideFirstLine: false
                    }
                });
                this.chart.axis('score', {
                    line: null,
                    tickLine: null,
                    grid: {
                        type: 'polygon',
                        lineStyle: {
                            lineDash: null
                        },
                        alternateColor: 'rgba(0, 0, 0, 0.04)'
                    }
                });
            },
            legend:function() {
                this.chart.legend('user', {
                    marker: 'circle',
                    offset: 30
                });
            },
            line:function() {
                this.chart.line().position('item*score').color('user').size(2);
            },
            point:function() {
                this.chart.point().position('item*score').color('user').shape('circle').size(4).style({
                    stroke: '#fff',
                    lineWidth: 1,
                    fillOpacity: 1
                }).label('score',{
                    formatter: function formatter(val) {
                        return parseInt(val);
                    }
                });
            },
            render:function() {
                this.source();
                this.coord();
                this.axis();
                this.legend();
                this.line();
                this.point();
                this.chart.render();
            }
        },
        template:`<div :id="pid"></div>`
    };
    return radarChart
});