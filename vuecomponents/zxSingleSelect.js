define(['lodash'],function(zxcore){
    'use strict';
    let zxbutton = {
        props:{
            inputLabel:{
                type:String,
                default:'选择操作'
            },
            defalutVal:{
                type:String,
                default:'默认选项'
            },
            defalutId:{
                type:[String, Number],
                default:1
            },
            inputName:{
                type:String,
                default:'inputName'
            },
            dataArr:{
                type:Array,
                default:[]
            },
        },
        data:function(){
            return{
                chooseId:this.defalutId,
                chooseButton:this.defalutVal,
                options:this.dataArr,
            }
        },
        filters:{
            selectName:function(val){
                return _.toArray(val)[1];
            }
        },
        methods:{
            choose:function(id,index){
                this.chooseId = id;
                this.chooseButton = this.picker(index);
            },
            picker:function(index){
                return _.toArray(this.options[index])[1];
            },
        },
        template:`
            <div class="form-group row ">
            <input type="text" v-model="chooseId" :name="inputName" hidden />
                <label for="title" class="col-md-2 col-form-label text-right" style="line-height:3;">{{inputLabel}}</label>
                <div class="col-sm-9 row col-md-8 ">
                    <div class="dropdown input-group-prepend">
                        <button class="btn btn-outline-primary  dropdown-toggle dropdown-toggle-split"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {{chooseButton}}
                        </button>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink" x-placement="top-start" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(1px, -145px, 0px);">
                        <a class="dropdown-item" href="#" v-for="(item,index) in options" @click="choose(item.id,index)">{{ item|selectName }}</a>
                        </div>
                    </div>
                </div>
                
            </div>`
    };
   return zxbutton;
});