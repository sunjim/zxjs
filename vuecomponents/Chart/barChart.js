define([],function(){
    'use strict';
    let BarChar = {
        props: {
            id: {
                type: String,
                default: 'c2',
            },
            charData: {
                type: Array,
                default: [],
            },
            
        },
        mounted(){
            this.chart = new G2.Chart({
                container: this.id, // 指定图表容器 ID
                forceFit: true,
                height: 300, // 指定图表高度
                renderer: 'canvas',
                padding: [60, 20, 40, 60],
            });
        },
        watch: {
            charData: function(val, old) {
                this.drawChart(val);
            },
        },
        data(){
            return {
                chart: null,
                imageMap: {
                    'Sports': '/images/caravatar/mYhpaYHyHhjYcQf.png',
                    'Strategy': '/images/caravatar/JBxkqlzhrlkGlLW.png',
                    'Action': '/images/caravatar/zlkGnEMgOawcyeX.png',
                    'Shooter': '/images/caravatar/KzCdIdkwsXdtWkg.png',
                },
            };
        },
        methods: {
            drawChart: function(datas) {
                this.chart.source(datas, {
                    vote: {
                        min: 0,
                    },
                });
                this.chart.legend(false);
                this.chart.axis('vote', {
                    labels: null,
                    title: null,
                    line: null,
                    tickLine: null,
                });
                // Step 3：创建图形语法，绘制柱状图，由 genre 和 sold 两个属性决定图形位置，genre 映射至 x 轴，sold 映射至 y 轴
                this.chart.interval().position('genre*sold').color('genre');
                //自定义头像
                let that = this;
                this.chart.point().position('genre*sold').size(60).shape('genre', function(name) {
                    return ['image', that.imageMap[name]];
                });
                // Step 4: 渲染图表
                this.chart.render();
            },
        },
        template: `<div :id="id"></div>`,
    };
    
   return BarChar;
});