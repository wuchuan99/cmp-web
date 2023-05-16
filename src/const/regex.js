/**
 * RegExp
 * @type {RegExp}
 */

// ip
export const reg_ip = /^((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})$/;

export const reg_ip_mask = /^((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})(\/(24|32))?$/;

// port 1 - 65535
export const reg_port = /^([1-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/;

// port 1,2,4-12
export const reg_port_pool = /^([1-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])([-|,]([1-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5]))*$/;

// name 1-64
export const reg_name64 = /^([\u4e00-\u9fa5]|\w|\s){1,64}$/;

// name 1-64  no space
export const reg_name64_w = /^([\u4e00-\u9fa5]|\w){1,64}$/;

// name 1-32 chinese english number _
export const reg_name32 = /^[\w\u4e00-\u9fff]{1,32}$/;

// name 1-32 .-_
export const reg_name32_w = /^[\u4e00-\u9fff.\w-]{1,32}$/;

// mac
export const reg_mac = /^((([a-fA-F0-9]{2}:){5})|(([a-fA-F0-9]{2}-){5}))[a-fA-F0-9]{2}$/;

// 11phone
export const reg_phone = /^1\d{10}$/; ///^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;

// 网址
export const reg_url = /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/;

// 网址 http/https
export const reg_url_h = /^((https|http)?:\/\/)[^\s]+/;

// ip + port url
export const reg_ipUrl = /^((https|http)?:\/\/)((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2}):([1-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])[^\s]+/;

// 域名
export const reg_domain = /(^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$)/;

// 邮箱
export const reg_mail = /^\w+([-+.]\w+)*@\w+([-.]\\w+)*.\w+([-.]\w+)*$/;

export const reg_mobile = /^1\d{10}$/;

// 是否含有中文
export const reg_chinese = /[\u4e00-\u9fa5]+$/;
