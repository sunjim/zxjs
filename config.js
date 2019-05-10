require.config({
    urlArgs: 'version=1.2.106',
    baseUrl: '/plugin/zxjs',
    paths: {
        css: 'css.min',
        domReady: 'domReady',
        vue: 'https://lib.baomitu.com/vue/2.6.10/vue',//'https://lib.baomitu.com/vue/2.6.9/vue.min',
        scrollTo: 'https://cdn.bootcss.com/jquery-scrollTo/2.1.2/jquery.scrollTo.min',
        Aliplayer: 'http://g.alicdn.com/de/prismplayer/2.0.1/aliplayer-min',
        //微信JSSDK
        jweixin: 'package/jweixin.1.4',
        //百度编辑器
        ueditor: 'package/ueditor/ueditor.all',
        //代码高亮
        prism: 'package/prism/prism',
        //剪贴版
        ZeroClipboard: 'https://cdn.bootcss.com/zeroclipboard/2.3.0/ZeroClipboard.min',
        //JS验证
        validator: 'https://cdn.bootcss.com/validator/10.2.0/validator.min',
        //上传组件
        webuploader: 'package/webuploader/dist/webuploader',
        lodash: 'https://cdn.bootcss.com/lodash.js/4.17.10/lodash.min',
        oss: 'component/oss',
        'jquery-mousewheel': 'https://cdn.bootcss.com/jquery-mousewheel/3.1.13/jquery.mousewheel.min',


        katex: 'https://cdn.bootcss.com/KaTeX/0.9.0/katex.min',
        codemirror: 'https://cdn.bootcss.com/codemirror/5.38.0/codemirror.min',
        plupload: 'package/plupload/plupload.full.min',
        simditor: 'package/simditor/scripts/simditor',
        'simditor-fullscreen': 'package/simditor/simditor-fullscreen-master/lib/simditor-fullscreen',
        marked: 'https://cdn.bootcss.com/marked/0.4.0/marked.min',
        'to-markdown': 'https://cdn.bootcss.com/to-markdown/3.1.1/to-markdown.min',
        'simditor-markdown': 'package/simditor/simditor-markdown/lib/simditor-markdown',
        'simditor-dropzone': 'package/simditor/simditor-dropzone/lib/simditor-dropzone',
        'simple-module': 'package/simditor/scripts/module',
        //editor.md
        prettify: 'https://cdn.bootcss.com/prettify/r298/prettify.min',
        raphael: 'package/editor.md/lib/raphael.min',
        underscore: 'https://cdn.bootcss.com/underscore.js/1.9.0/underscore-min',
        flowchart: 'package/editor.md/lib/flowchart.min',
        jqueryflowchart: 'package/editor.md/lib/jquery.flowchart.min',
        sequenceDiagram: 'package/editor.md/lib/sequence-diagram.min',
        katex: 'https://cdn.bootcss.com/KaTeX/0.10.0-alpha/katex.min',
        editormd: 'package/editor.md/editormd.amd',
        //2018.9.26新增 模板依赖

        nicescroll: 'https://cdn.bootcss.com/jquery.nicescroll/3.7.6/jquery.nicescroll.min',
        scrollUp: '../../theme/Stisla/modules/scroll-up-bar/dist/scroll-up-bar.min',
        stisla: '../../theme/Stisla/js/sa-functions',
        swiperjs: 'https://cdn.bootcss.com/Swiper/4.3.0/js/swiper.min',
        pusher: 'https://cdn.bootcss.com/pusher/4.3.1/pusher.min',
        //2018.11.10新增
        DPlayer: 'https://cdn.bootcss.com/dplayer/1.25.0/DPlayer.min',
        //消息提示
        iziToast: './package/iziToast-master/dist/js/iziToast.min',
        //2019.3.16
        jquery: '../../js/jquery.min',
        popper: '../../js/popper.min',
        bootstrap: 'https://lib.baomitu.com/twitter-bootstrap/4.3.1/js/bootstrap.bundle.min',
        axios: 'https://lib.baomitu.com/axios/0.19.0-beta.1/axios.min',
        //plugins
        zxcore: 'zxcore',
        switch: '../../js/plugins/bootstrap-switch',
        tagsinput: '../../js/plugins/bootstrap-tagsinput',
        moment: '../../js/plugins/moment.min',
        nouislider: '../../js/plugins/nouislider.min',
        //2019.2.7
        vuejs: 'package/Sortable-master/vuedraggable.min',
        //2019.04.07
        chosen: '../../js/plugins/chosen/chosen.jquery.min',
        uveMoney:'./vuecomponents/zxmoney',
        uveMemberChoose:'./vuecomponents/zxmc',
        uveAuto:'./vuecomponents/zxAutombile',
        uveUploadImage:'./vuecomponents/zxUploadImage',
        zxTimePickers:'./vuecomponents/zxDateTimePickers',
        zxTimePicker:'./vuecomponents/zxSignleTimePicker',
        zxSingleSelect:'./vuecomponents/zxSingleSelect',//public/plugin/zxjs/vuecomponents/zxSingleSelect.js
        zxNomalSelect:'./vuecomponents/zxNomalSelect',//public/plugin/zxjs/vuecomponents/zxSingleSelect.js
        barChart:'./vuecomponents/Chart/barChart',
        bingChart:'./vuecomponents/Chart/bingChart',
        lineChart:'./vuecomponents/Chart/lineChart',
        bizChart:'./vuecomponents/Chart/bizChart',
        radarChart:'./vuecomponents/Chart/radarChart',
        datetimepicker:'https://cdn.bootcss.com/jquery-datetimepicker/2.5.14/jquery.datetimepicker.full',
        //图形库
        g2:'https://gw.alipayobjects.com/os/lib/antv/g2/3.4.10/dist/g2.min',
        g2Set:'package/G2/G2SetData',//public/plugin/zxjs/package/G2/G2SetData.js
        //360° 转角
        circlr:'package/G2/circlr.min',
    },
    shim: {
        datetimepicker: {
            deps: ["jquery","css!./package/datetimepicker/dateteimepicker.css"],
        },
        chosen: {
            deps: ['css!../../js/plugins/chosen/component-chosen.css'],
        },
        iziToast: {
            deps: ['css!./package/iziToast-master/dist/css/iziToast.min.css'],
        },
        DPlayer: {
            deps: ['css!https://cdn.bootcss.com/dplayer/1.25.0/DPlayer.min.css']
        },
        stisla: {
            deps: ["jquery"]
        },

        scrollUp: {
            deps: ["jquery"]
        },
        DPlayer: {
            deps: ['css!https://cdn.bootcss.com/dplayer/1.25.0/DPlayer.min.css'],
        },

        simditor: {
            deps: [
                'jquery',
                'package/simditor/scripts/module',
                'package/simditor/scripts/hotkeys',
                'package/simditor/scripts/uploader',
                'css!package/simditor/simditor-fullscreen-master/styles/simditor-fullscreen.css',
                'css!package/simditor/styles/simditor.css',
                'css!package/simditor/styles/hdjs.css',
                'css!package/simditor/simditor-markdown/styles/simditor-markdown.css',
            ],
        },
        plupload: {
            exports: 'plupload',
        },
        highlight: {
            deps: ['css!package/highlight/dracula.min.css'],
        },
        editormd: {
            deps: [
                'underscore',
                'flowchart',
                'sequenceDiagram',
                'css!package/editor.md/css/editormd.css',
                'css!package/editor.md/lib/codemirror/codemirror.min.css',
            ],
        },
        sequenceDiagram: {
            deps: [
                'raphael',
            ],
        },
        jqueryflowchart: {
            deps: ['flowchart', 'raphael'],
        },
        webuploader: {
            deps: ['css!package/webuploader/css/webuploader.css'],
        },
        prism: {
            deps: [
                'css!package/prism/prism.css',
            ],
        },
        ueditor: {
            deps: ['ZeroClipboard', 'package/ueditor/ueditor.config'],
        },
    },
    waitSeconds: 30,
});
require(['jquery', 'popper', 'bootstrap', 'axios'], function(jquery, popper, b, axios) {
    window.Popper = popper;
    window.$ = window.jQuery = jquery;
    window.axios = axios;
    window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    let token = document.head.querySelector('meta[name="csrf-token"]');
    
    if (token) {
        window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
    } else {
        console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
    }
    setTimeout(function(){
        $(".alert").alert('close');
    },2000);
});