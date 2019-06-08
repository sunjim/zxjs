define(['zxcore'], function(zxcore) {
    'use strict';
    let zxbutton = {
        props: {
            //input name
            inputName: {
                type: String,
                default: 'uploadname',
                require: true,
            },
            //预加载图片地址
            preImage: {
                type: String,
                default: '/images/lu/welcome.gif',
            },
            picNum:{
              type:[String,Number],
                default:5
            },
            picData:{
                type:Array,
                default:function(){
                    return [];
                }
            }
        },
        mounted(){
          this.imgpath =  this.picData
        },
        data: function() {
            return {
                imgpath: [],
                del:[]
            };
        },
        methods: {
            uploadImagePc: function() {
                let len = this.imgpath.length;
                if(len>=5){
                    zxcore.ToastSuccess('已经超过上限!');
                    return;
                }
                let that = this;
                zxcore.image(function(images) {
                    let obj = {
                        id:0,
                        path:images[0]
                    }
                    that.imgpath.push(obj)//显示图片
                });
            },
            removeImg: function(index,id) {
                if(id!=0){
                    this.del.push(id);
                }
                this.imgpath.splice(index,1);
            },
        },
        template: `
            <div  class="fileinput text-center" >
                <div>
                    <span class="btn btn-primary btn-round" @click="uploadImagePc();">选择图片</span>
                    <input type="text" name="del" v-model="del" hidden />
                </div>
                <div v-for="(item,index) in imgpath" class="pull-left ml-2">
                    <div style="width:140px;height:140px;">
                      <img :src="item.path" style="width: 200px;height:200px;" />
                      <textarea type="text" :name="inputName"  hidden >{{item}}</textarea>
                    </div>
                    
                    <div>
                      <a href="#pablo" @click="removeImg(index,item.id)" class="btn btn-danger btn-round fileinput-exists" data-dismiss="fileinput"><i class="fa fa-times"></i> 删除</a>
                      
                    </div>
                </div>
            </div>
        `,
    };
    return zxbutton;
});