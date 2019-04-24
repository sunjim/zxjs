!function(window) {
    'use strict';
    function getQuery(e) {
        t = '';
        if (-1 != e.indexOf('?')) {
            var t = e.split('?')[1];
        }
        return t;
    }
    
    var util = {
        timeId:''
    };
    //弹框提示
    util.ToastSuccess = function(val,callback){
        require(['iziToast'],function(iziToast){
            iziToast.show({
                class:'card',
                theme: 'light',
                image: '/images/lu/winer.gif',
                imageWidth:100,
                maxWidth:1000,
                timeout: 2000,
                message: '<h3>'+val+'</h3>',
                progressBarColor: '#f96332',//'rgb(0, 255, 184)',
                position:'topCenter',
                messageColor:'#f96332',
                backgroundColor:'rgba(0,0,0,0)',
                close:false,
                onClosed: function () {
                    if ($.isFunction(callback)) {
                        return callback();
                    }
                }
            });
        });
    },
    //自动展开已经预览的导航
    util.isToggle = function(e) {
        if (!e && '' != e) {
            return '';
        }
        $(e).click(function() {
            'use strict';
            let i = $(e).index(this);
            sessionStorage.setItem('current_meun_index', i);
        });
        let currentMenuIndex = sessionStorage.getItem('current_meun_index');
        $(e).
                eq(currentMenuIndex).
                addClass('menu-open');
        $(e).
                eq(currentMenuIndex).
                find('.treeview-menu').
                show();
    };
    //编辑器
    util.editor = function(id, opt, callback){
        if (!id && "" != id) return "";
        require(['ZeroClipboard','ueditor','css!less/ueditor.css',
            'component/custombtn'],function(z){
                window['ZeroClipboard'] = z;
                var options = $.extend({
                    UEDITOR_HOME_URL: window.zxjs.root + 'plugin/zxjs/package/ueditor/',
                    serverUrl: window.zxjs.ueditor,
                    'elementPathEnabled': false,
                    // 'initialFrameHeight': 200,
                    'focus': false,
                    'maximumWords': 9999999999999,
                    'autoClearinitialContent': false,
                    'toolbars': [[
                        'fullscreen', 'source', '|', 'undo', 'redo', '|',
                        'bold', 'italic', 'underline', 'fontborder', 'strikethrough',
                        'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor',
                        'backcolor','insertorderedlist', 'insertunorderedlist', 'selectall', '|',
                        'paragraph', 'fontfamily', 'fontsize', '|',
                        'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|',
                        'link', 'emotion', 'map',  'insertcode','|',
                        'inserttable', 'deletetable'
                    ]],
                    autoHeightEnabled: false,//自动增高
                    autoFloatEnabled: false,
                }, opt);
                var editor = UE.getEditor(id, options);
        
                if ($.isFunction(callback)) {
                    return callback(editor);
                }
                return editor;
        });
       
    };
    //图片上传
    util.image = function(callback, options){
        require(['component/image'], function (image) {
            image(callback, options);
        })
    };
    //图表
    util.chart = function (el, opt) {
        require(['component/chart'], function (chart) {
            chart(el, opt);
        })
    },
    //文件上传
    util.file = function(callback, options){
        require(['component/file'], function (image) {
            image(callback, options);
        })
    };
    util.smscode = function(obj,phone,openid){
        require([''],function(){
            $(obj).prop('hidden',true);
            $(obj).next().removeAttr('hidden');
            var data = {
                phone:phone,
                openid:openid
            }, timeId;
            intervals(obj,60);
            axios.post('/wx/api/sendcode',data).then(function(response){
                if(response.status===200){
                    return;
                }else{
                    alert('验证码发送失败!');
                }
            });
            function intervals(obj,seconds){
                if (seconds < 0) {
                    clearTimeout(timeId);
                    $(obj).removeAttr('hidden');
                    $(obj).next().prop('hidden',true);
                } else {
                    timeId = setTimeout(function() {
                        clearTimeout(timeId);
                        $(obj).next().html(seconds+'秒');
                        seconds--;
                        intervals(obj,seconds);
                    }, 1000);
                }
            };
        });
    };
    //字体选择
    util.font = function (callback) {
        require(['component/font'], function (font) {
            font(callback);
        })
    };
    //设备检测
    util.isMobile= function () {
        let userAgentInfo = navigator.userAgent;
        let Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
        let flag = false;
        for (let v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = true;
                break;
            }
        }
        return flag;
    };
    util.simditor = function (options) {
        require(['simditor', 'simditor-fullscreen', 'marked', 'to-markdown', 'simditor-dropzone',
            'simditor-markdown'], function (Simditor) {
            let opt =_.merge({
                spellChecker: false,
                pasteImage: true,
                locale: 'zh-CN',
                // markdown: true,
                toolbar: [
                    'title',
                    'bold',
                    'italic',
                    'fontScale',
                    'color',
                    'ol',
                    'ul',
                    'blockquote',
                    'code',
                    //'table',
                    //'link',
                    'image',
                    'hr',
                    //'fullscreen',
                ]
            },options);
            new Simditor(opt);
        })
    };
    //列表框选择日期
    util.datetimepicker = function (elem, options) {
        require(['component/datetimepicker'], function (datetimepicker) {
            datetimepicker(elem, options);
        })
    },
    //模型框
    util.modal = function(options, callback){
        require(['component/modal'], function (modal) {
            modal(options, callback);
        })
    };
    'function' == typeof define && define.amd ? define(function() {
        return util;
    }) : window.util = util;
}(window);