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
        <div class="dropdown input-group-prepend">
            <button  class="btn btn-outline-primary dropdown-toggle" type="button" :id="inputName" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {{chooseButton}}
            </button>
            <div class="dropdown-menu" :aria-labelledby="inputName">
              <li class="dropdown-item"  v-for="(item,index) in options" @click="choose(item.id,index)">
              	{{ item|selectName }}
              </li>
            </div>
            <input type="text" v-model="chooseId" :name="inputName" hidden />
        </div>`
    };
   return zxbutton;
});