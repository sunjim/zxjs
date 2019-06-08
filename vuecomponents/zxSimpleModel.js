define([],function(){
    'use strict';
    let modal = {
        props:{
            mark:{
              type:[Number,String,Object],
                default:'',
            },

            classData:{
                type:String,
                default:'model1',
            },
            title:{
                type:String,
                default:'Modal title',
            },
            contents:{
                type:String,
                default:'这里填写内容',
            }
        },
        methods:{
            success(){
                let str = this.classData;
                $('.'+str).modal('hide');
                this.$emit('recived', this.mark);
            }
        },
        template:`
                <div ref="classData" class="modal fade" :class="classData"  tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">{{title}}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                        {{contents}}
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary " data-dismiss="modal">关闭</button>
                        <button type="button" class="btn btn-primary " @click="success">确认</button>
                      </div>
                    </div>
                  </div>
                </div>
                `
    };
   return modal;
});