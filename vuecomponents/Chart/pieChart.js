define(['g2Set'],function(DataSet){
    'use strict';
    let BingChar = {
        props: {
            id: {
                type: String,
                default: 'l2',
            },
            baseInfo: {
                type: Array,
                default: null,
            },
            total: {
                type: Number,
                default: 0,
            },
        },
        data(){
            return {
                chart: null,
            };
        },
        mounted(){
        
            this.chart = new G2.Chart({
                container: this.id, // 指定图表容器 ID
                forceFit: true,
                height: window.innerHeight,
                padding: 'auto',
            });
            this.initChat();
        
        },
        computed: {
            moneyTotal: function() {
                let val = this.total;
                if (!val) {
                    val = '0';
                }
                val = val.toString().replace(/\$|\,/g, '');
                let sign = (val == (val = Math.abs(val)));
                val = Math.floor(val * 100 + 0.50000000001);
                let cents = val % 100;
                val = Math.floor(val / 100).toString();
                if (cents < 10) {
                    cents = '0' + cents;
                }
                for (var i = 0; i < Math.floor((val.length - (1 + i)) / 3); i++) {
                    val = val.substring(0, val.length - (4 * i + 3)) + ',' +
                            val.substring(val.length - (4 * i + 3));
                }
                return (((sign) ? '' : '-') + val + '.' + cents);
            },
        },
        methods: {
            source: function() {
                let ds = new DataSet();
                let dv = ds.createView().source(this.baseInfo);
                let that = this;
                dv.transform({
                    type: 'map',
                    callback: function callback(row) {
                        row.value = parseInt(that.total * row.percent);
                        return row;
                    },
                });
                this.chart.source(dv, {
                    percent: {
                        formatter: function formatter(val) {
                            val = val * 100 + '%';
                            return val;
                        },
                    },
                });
            },
            coord: function() {
                this.chart.coord('theta', {
                    radius: 0.75,
                    innerRadius: 0.6,
                });
            },
            tooltip: function() {
                this.chart.tooltip({
                    showTitle: false,
                    itemTpl: '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>',
                });
            },
            legend: function() {
                this.chart.legend({
                    position: 'right-center',
                    offsetX: -100,
                });
            },
            guide: function() {
                this.chart.guide().html({
                    position: ['50%', '50%'],
                    html: '<div style="color:#8c8c8c;font-size: 14px;text-align: center;width: 10em;">共计<br><span style="color:#8c8c8c;font-size:20px">' +
                    this.moneyTotal + '元',
                    alignX: 'middle',
                    alignY: 'middle',
                });
            },
            intervalStack: function() {
                let that = this;
                this.chart.intervalStack().position('percent').color('type').opacity(1).label('percent', {
                    offset: -18,
                    textStyle: {
                        fill: 'white',
                        fontSize: 12,
                        shadowBlur: 2,
                        shadowColor: 'rgba(0, 0, 0, .45)',
                    },
                    rotate: 0,
                    autoRotate: false,
                    formatter: function formatter(text, item) {
                        return String(parseInt(item.point.percent * 100)) + '%';
                    },
                }).tooltip('type*percent', function(item, percent) {
                    percent = that.total * percent;
                    percent = percent.toFixed(2);
                    return {
                        name: item,
                        value: percent,
                    };
                });
            },
        
            initChat: function() {
               
                //加载数据源
                this.source();

                //基本设置
                this.legend();

                //基础设置
                this.coord();
                //悬浮提示设置
                this.tooltip();
                //辅助文本
                this.guide();
            
                this.intervalStack();
            
                this.chart.render();
            },
        },
        template: `<div :id="id"></div>`,
    };
    
   return BingChar;
});