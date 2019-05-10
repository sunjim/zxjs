define([],function(){
    'use strict';
    let LineChar = {
        props:{
            id: {
                type: String,
                default: 'l2',
            },
            baseInfo: {
                type: Array,
                default: null,
            },
        },
        data(){
            return {
                lineData:this.baseInfo,
                chart: null,
                sortType:true,
            }
        },
        mounted(){
            this.chart = new G2.Chart({
                container: this.id,
                forceFit: true,
                height: 300,
            
            });
            this.initChats();
        },
        methods:{
            ascOrder:function(){
                this.sortType = !this.sortType;
                if(this.sortType){
                    this.baseInfo.sort(function(a, b) {
                        return b.value - a.value;
                    });
                }else{
                    this.baseInfo.sort(function(a, b) {
                        return a.value - b.value;
                    });
                }
                this.chart.repaint();
            },
            source:function() {
                this.chart.source(this.lineData, {
                    value: {
                        max: 1000,
                        min: 0,
                        nice: false,
                        alias: '单位（元）'
                    }
                });
            },
            axis:function() {
                this.chart.axis('type', {
                    label: {
                        textStyle: {
                            fill: '#f96332',
                            fontSize: 12
                        }
                    },
                    tickLine: {
                        alignWithLabel: false,
                        length: 0
                    },
                    line: {
                        lineWidth: 0
                    }
                });
                this.chart.axis('value', {
                    label: null,
                    title: {
                        offset: 30,
                        textStyle: {
                            fill: '#f96332',
                            fontSize: 12,
                            fontWeight: 300
                        }
                    }
                });
            },
            legend:function() {
                this.chart.legend(false);
            },
            coord:function() {
                this.chart.coord().transpose();
            },
            intvalStack:function() {
                this.chart.interval().position('type*value').size(26).opacity(1).label('value', {
                    textStyle: {
                        fill: '#8d8d8d'
                    },
                    offset: 10
                });
            
            },
            initChats:function() {
                this.source();
                this.axis();
                this.legend();
                this.coord();
                this.intvalStack();
                this.chart.render();
            }
        },
        template: `<div>
                        <div :id="id"></div>
                        <div @click="ascOrder" class="bottom-tool-box pull-right">
                        <div class=" fa " :class="sortType?'fa-sort-amount-asc':'fa-sort-amount-desc'"></div>
                        </div>
                      </div>`,
    };
    
   return LineChar;
});