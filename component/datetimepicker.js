//日期时间选择
define(['jquery','datetimepicker'
], function (jQuery) {
    return function (el, options) {
        jQuery.datetimepicker.setLocale('zh');
        jQuery(el).datetimepicker(options);
    }
})