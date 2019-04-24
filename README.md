# 使用说明
## 目录结构
```
plugin
├── zxjs
│   ├── component
│   ├── image
│   ├── vuecomponents
│   └── scss
│       ├── bootstrap
│       ├── core
│       ├── material-kit.scss
│       └── plugins
├── config.js
├── require.js
├── css.min.js
└── zxcore.js
```
## 头部声明 设置全局变量
~~~
<script>
    window.zxjs = {
        //设置config.js 相对基础路径
        'base':'/plugin/zxjs',
        //设置上传功能地址
        'uploader':'/upload',
        //设置图片列表地址
        'filesLists':'/filesLists',
    };
</script>
~~~
## css 样式根据实际需求在 head 自行引入
## require laravel 引入
~~~
<script src="{{asset('plugin/zxjs/require.js')}}"></script>
<script src="{{asset('plugin/zxjs/config.js')}}"></script>
~~~
## require  普通引入
~~~
<script src="/plugin/zxjs/require.js"></script>
<script src="/plugin/zxjs/config.js"></script>
~~~
## Vue 插件调用方法
* [货币转换](#zxmoney) 
* [图片上传](#zx-upload-image)
## Zxmoney 
### 描述
- 数字转换成货币格式
### 调用方法 
- html
~~~
<vue-money zx-label="收购价格" zx-name="buy_price" :val="val"></vue-money> 
~~~
- js
~~~
 require(['vue','uveMoney'],function(vue,uveMoney){
    new vue({
        ...
        data:function(){
            return {
              val:0  
            };
        },
        components:{
            'vue-money':uveMoney
        }
    });
   })
~~~
### 参数说明 

|   参数  |  说明     |
| --- | ----------- |
|  zx-label   |  插件标题    |
|  zx-name   |  input name值    |
|  val   |  父组件传值    |

## ZxUploadImage 
### 描述
- 上传图片功能
### 调用方法 
- html
~~~
<vue-upload-image upload-label="车预览图片" input-name="am_image" pre-image="/images/car.png " ></vue-upload-image>
~~~
- js
~~~
 require(['vue','uveUploadImage'],function(vue,uveUploadImage){
    new vue({
        ...
        components:{
            'vue-upload-image':uveUploadImage
        }
    });
   })
~~~
### 参数说明 

|   参数  |  说明     |
| ------ | ----------- |
|  upload-label   |  插件标题      |
|  input-name     |  input name值 |
|  pre-image      |  预览图片      |