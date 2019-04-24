define(['zxcore'],function(zxcore){
    'use strict';
    let zxbutton = {
        props:{
            //label
            uploadLabel:{
                type:String,
                default:'上传图片',
                require:true,
            },
            //input name
            inputName:{
                type:String,
                default:'uploadname',
                require:true,
            },
            //预加载图片地址
            preImage:{
                type:String,
                default:'/images/lu/welcome.gif',
            },
        },
        data:function(){
            return{
                fileclass:true,
                imgpath:'',
            }
        },
        methods:{
            uploadImagePc:function(){
                let that = this;
                zxcore.image(function(images){
                    that.imgpath = images[0];//显示图片
                    that.fileclass = false;
                });
            },
            removeImg:function(){
                this.fileclass = true;
                this.imgpath   = '';
            },
        },
        template:`
            <div class="form-group row">
                <label for="am_image" class="col-md-2 col-form-label text-right">{{uploadLabel}}</label>
                <div class="col-md-8">
                    <div :class="fileclass ? 'fileinput-new' : 'fileinput-exists' " class="fileinput text-center" >
                        <div class="fileinput-new thumbnail img-raised">
                            <img style="width: 140px;" height="140" :src="preImage"
                                 alt="预览图">
                        </div>
                        <div style="width:140px;" class="fileinput-preview fileinput-exists thumbnail img-raised">
                            <img :src="imgpath" />
                        </div>
                        <div>
                            <span class="btn btn-primary btn-round">
                                <span class="fileinput-new" @click="uploadImagePc();">选择图片</span>
                                <span class="fileinput-exists" @click="uploadImagePc();">更换</span>
                                <input type="text" :name="inputName" v-model="imgpath" hidden>
                            </span>
                            <a href="#pablo" @click="removeImg()" class="btn btn-danger btn-round fileinput-exists" data-dismiss="fileinput"><i class="fa fa-times"></i> 删除</a>
                        </div>
                    </div>
                </div>
            </div>
        `
    };
   return zxbutton;
});