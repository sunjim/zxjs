define(['component/fileUploader','ueditor'], function (fileUploader) {
    let token = document.head.querySelector('meta[name="csrf-token"]');
    if(token){
        var csrf_token = token.content;
    }
       UE.registerUI('zximage',function(editor,uiName){
       'use strict';
       editor.registerCommand(uiName,{
           execCommand:function(){
               var This = this;
               fileUploader.show(function(imgs){
                   if(imgs.length>0){
                       var imglist = [];
                       for(let i in imgs){
                           imglist.push({
                                src:imgs[i],
                                width:'720',
                                height:'300'
                           });
                       }
                       This.execCommand('insertimage',imglist);
                   }
               },{
                   type:'image',
                   multiple:true,
                   extensions:'gif,jpg,jpeg,bmp,png',
                   width:'750px',
                   data:{csrf_token:csrf_token}
               })
           }
       });
       var o = new UE.ui.Button({
           name:"insertimage",
           title:"插入图片",
           cssRules:"background-position:-726 -77px",
           onclick:function(){
               'use strict';
               editor.execCommand(uiName)
           }
       });
       function afterUploadImage() {
           if(arguments[0]=="inserthtml" || arguments[0]=="insertimage"){
               editor.execCommand( 'insertparagraph' );
               editor.execCommand( 'insertparagraph' );
               editor.focus();
           }
       }
       return editor.addListener("afterExecCommand",function(t, e, arg){
           afterUploadImage(e);
        
       }),o
   });
    UE.registerUI('zxvideo',function(editor,uiName){
        'use strict';
        editor.registerCommand(uiName,{
            execCommand:function(){
                console.log(csrf_token);
                //alert('execCommand:'+uiName);
            }
        });
        var o = new UE.ui.Button({
            name:"insertvideo",
            title:"插入视频",
            cssRules:"background-position:-726 -77px",
            onclick:function(){
                'use strict';
                editor.execCommand(uiName)
            }
        });
        return editor.addListener("selectionchange",function(){
            var i = editor.queryCommandState(uiName);
            -1 ==i ?(o.setDisabled(!0), o.setChecked(!1)):
                    (o.setDisabled(!1),o.setChecked(i))
            
        }),o
    });
   

});
