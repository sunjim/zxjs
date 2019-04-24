define(['iziToast','lodash'],function(iziToast){
    'use strict';
    let zxbutton = {
      data:function(){
          return {
              searchInputs: '',//搜索栏
              options:[],//搜索选项
              members:[],//员工列表
              otherTeams:[],//其它选项列表
              teams:[]
          }
      },
        props:[
          'label',
            'purchase',
            'rates'
        ],
        watch: {
            searchInputs: _.debounce(
                    function(newVal,oldVal) {
                        let str = newVal.replace(/^\s+|\s+$/g, '');
                        if (str) {
                            let that = this;
                            axios.post('/hr/employerSearch', {data: str}).then(function(response) {
                                if(response.data.length>0){
                                    that.options = response.data;
                                }
                            });
                        }
                        else {
                            console.log('没有收入有效值!');
                        }
                    }, 1000),
        },
        mounted(){
            this.members=this.purchase;
            this.otherTeams=this.rates;
        },
        computed:{
            allLists:function(){
                return _.flatten(this.otherTeams);
            },
            mjson:function(){
                return JSON.stringify(this.members);
            },
        },
        methods: {
            set:function(){
                this.otherTeams = _(this.members)
                .groupBy(it => it.post_id)
                .value();
                let rate = parseFloat(this.getResults(30/this.members.length));//基础比例
                this.lists(rate);
            },
            lists:function(rate){
                this.otherTeams = _(this.otherTeams).map((item,index)=>{
                    let ratearr=[];
                    let max=_.maxBy(item,'grade_id');
                    let one=_.find(item,{grade_id:1});
                    let two=_.find(item,{grade_id:2});
                    let three=_.find(item,{grade_id:3});
                    let len=item.length;
                    let that=this;
                    axios.post('/automobile/otherteamuser', {pid:max.pid}).then(function(response) {
                    
                        let teams=response.data;
                        let gone=_.find(teams,{grade_id:1});
                        let gtwo=_.find(teams,{grade_id:2});
                    
                        if(len==1){
                            if(one){
                                one.rate=that.getFixed(rate);
                            }else if(two){
                                two.rate=that.getFixed(rate*(that.rateD()));
                                one=gone;
                                one.rate=that.getFixed(rate*(that.rateA()));
                            }else if(three){
                                three.rate=that.getFixed(rate*(that.rateC()));
                                if(gtwo){
                                    one=gone;
                                    one.rate=that.getFixed(rate*(that.rateA()));
                                    two=gtwo;
                                    two.rate=that.getFixed(rate*(that.rateA()));
                                }else{
                                    one=gone;
                                    one.rate=that.getFixed(rate*(that.rateB()));
                                }
                            }
                        }else if(len==2){
                            if(one && two){
                                one.rate=that.getFixed(rate+rate*(that.rateA()));
                                two.rate=that.getFixed(rate*(that.rateD()));
                            }else if(one && three){
                                three.rate=that.getFixed(rate*(that.rateC()));
                                if(gtwo){
                                    one.rate=that.getFixed(rate+rate*(that.rateA()));
                                    two=gtwo;
                                    two.rate=that.getFixed(rate*(that.rateA()));
                                }else{
                                    one.rate=that.getFixed(rate+rate*(that.rateB()));
                                }
                            }else if(two && three){
                                one=gone;
                                one.rate=that.getFixed(rate*(that.rateA()));
                                two.rate=that.getFixed(rate*(that.rateD())+rate*(that.rateA()));
                                three.rate=that.getFixed(rate*(that.rateC()));
                            }
                        
                        }else if(len==3){
                            one.rate=that.getFixed(rate+rate*(that.rateA()));
                            two.rate=that.getFixed(rate*(that.rateD())+rate*(that.rateA()));
                            three.rate=that.getFixedgetFixed(rate*(that.rateC()));
                        }
                        if(one){
                            ratearr.push(one);
                        }
                        if(two){
                            ratearr.push(two);
                        }
                        if(three){
                            ratearr.push(three);
                        }
                    
                    });
                
                    return ratearr;
                }).reverse().value();
            },
            rateA:function(){
                return this.getResults(5/30);
            },
            rateB:function(){
                return this.getResults(10/30);
            },
            rateC:function(){
                return this.getResults(20/30);
            },
            rateD:function(){
                return this.getResults(25/30);
            },
        
            selectButton:function(){
                this.options = [];
                this.searchInputs = '';
            },
            chooseName: function(index) {
                if(this.members.length<4){
                    if(this.members.length==0&&this.options[index].grade_id==3){
                        this.toast('销售员不能为学徒');
                        return;
                    }
                    this.members.push(this.options[index]);
                }else{
                    console.log('已经超过上线');
                }
                this.set();
            },
            removeTag:function(index){
                this.members.splice(index,1);
            },
            otherTeamRemoveTag:function(index){
                this.otherTeams.splice(index,1);
            },
            toast:function(val){
                iziToast.show({
                    theme: 'dark',
                    icon: 'fa fa-info-circle',
                    timeout: 2000,
                    message: val,
                    progressBarColor: 'rgb(0, 255, 184)',
                });
            },
            //四舍五入到num后面的n位
            getResults:function(num){
                return num.toPrecision(5);
            },
            getFixed:function(num){
                return num.toFixed(3);
            },
            clearAll:function(){
                this.members=[];//员工列表
                this.otherTeams=[];
            }
        },
        template:`
           <div class='chooseRate'>
             <div class="form-group row ">
                <input type='hidden' name='purchase_ids' :value='mjson'>
                <label for="title" class="col-sm-2 col-form-label text-right">{{label}}:</label>
                <div class="col-sm-8">
                    <div class="bootstrap-tagsinput badge-primary" v-if="members">
                        <span class="tag badge" v-for="(opt,index) in members">{{opt.name}}</span>
                    </div>
                    <div class="dropdown bootstrap-select col-md-6">
                        <button type="button" @click="selectButton()"
                                class="btn dropdown-toggle bs-placeholder select-with-transition btn-primary btn-round col-md-5"
                                data-toggle="dropdown" role="button" aria-expanded="false">
                            <div class="filter-option">
                                <div class="filter-option-inner">
                                    <div class="filter-option-inner-inner">选择{{label}}</div>
                                </div>
                            </div>
                        </button>
                        <button type="button" @click="clearAll()" class="btn btn-primary btn-round" style='margin: 0;'>
                            <div class="filter-option">
                                <div class="filter-option-inner">
                                    <div class="filter-option-inner-inner">清除数据</div>
                                </div>
                            </div>
                        </button>
                        <div class="dropdown-menu" role="combobox" x-placement="bottom-start"
                             style="overflow: hidden; position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(0px, 43px, 0px);">
                            <div class="inner show" role="listbox" aria-expanded="false" style="overflow-y: auto;">
                                <ul class="dropdown-menu inner show">
                                    <li class="disabled">
                                        <div class="input-group">
                                            <input type="text" class="form-control col-md-10 offset-md-1" v-model="searchInputs" placeholder="输入姓名或者手机号搜索">
                                        </div>
                                    </li>
                                    <li v-for="(items,index) in options">
                                        <a role="option" class="dropdown-item" aria-disabled="false" tabindex="0"
                                           aria-selected="false" @click="chooseName(index)">
                                           <table>
                                            <tr>
                                                <th style='width:4.6rem'>ID：{{items.id}}</th>
                                                <th style='width:7.8rem'>姓名：{{items.name}}</th>
                                                <th style='width:9rem'>手机：{{items.phone}}</th>
                                            </tr>
                                            </table>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="form-group row "  v-for="(item,index) in otherTeams">
            
                <label for="title" class="col-sm-2 col-form-label text-right">比例分配{{index+1}}：</label>
                <div class="col-sm-9 row">
                    <div class="bootstrap-tagsinput badge-primary" >
                        <span class="tag badge" v-for="(v,i) in item">{{v.name}}--分配:<input :name='index+"rate"+v.id' class='text-right' v-model="v.rate"  style="color:#fff; width:3.4rem">&nbsp;&nbsp;%</span>
                    </div>
                </div>
            </div>
        </div>
        `
    };
    
   return zxbutton;
});