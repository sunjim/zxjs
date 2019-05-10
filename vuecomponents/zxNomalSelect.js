define(['lodash'],function(){
    'use strict';
    let zxbutton = {
        props:{
            defalutVal:{
                type:String,
                default:null
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
                chooseButton:null,
                options:this.dataArr,
            }
        },

        filters:{
            selectName:function(val){
                return _.toArray(val)[1];
            }
        },
        computed:{
          title:function(){
              return _.toArray(this.dataArr[0])[1];
          }
        },
        mounted(){
            this.chooseButton = this.defalutVal?this.defalutVal:this.title;
        },
        methods:{
            choose:function(id,index){
                this.chooseId = id;
                this.chooseButton = this.picker(index);
                this.$emit('select-change',this.options[index].id);
            },
            picker:function(index){
                return _.toArray(this.options[index])[1];
            },
        },
        template:`
            <div class="form-group">
                <input type="text" v-model="chooseId" :name="inputName" hidden />
                    <div class="dropdown input-group-prepend">
                        <div class="btn-outline-primary  dropdown-toggle dropdown-toggle-split"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {{chooseButton}}
                        </div>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink" x-placement="top-start" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(1px, -145px, 0px);">
                          <a class="dropdown-item" href="#" v-for="(item,index) in options" @click="choose(item.id,index)">{{ item|selectName }}</a>
                        </div>
                    </div>
            </div>`
    };
   return zxbutton;
});