var baseURL = 'http://ajax.frontend.itheima.net';
// 注意: 每次调用 $.get() 或 $.post() 或 $.ajax() 的时候
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数中,可以拿到我们给Ajax 提供的配置对象
$.ajaxPrefilter(function(params) {
    params.url = baseURL + params.url;

    // 对需要权限的接口配置头信息
    // 必须以/my/开头
    if (params.url.indexOf('/my/') !== -1) {
        params.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    // 全局统一挂载 complete 回调函数
    // 无论成功或者失败都会触发complete方法
    params.complete = function(res) {
        //  console.log(res);
        if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
            // 强制删除本地token
            localStorage.removeItem('token');
            // 强制跳转页面
            location.href = '/login.html';
        }
    }
})