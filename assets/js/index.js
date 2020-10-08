$(function() {
    // 调用getUserInfo
    getUserInfo();

    // 退出功能
    var layer = layui.layer;
    $('#btnLogout').on('click', function(e) {
        // 阻止表单默认提交事件
        e.preventDefault();
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
            //do something

            // 删除本地token
            localStorage.removeItem('token');
            // 跳转页面
            location.href = '/login.html';
            layer.close(index);
        });
    })
});

// 获取用户信息 后面会用到,需要是全局,如果在入口函数内部则是局部变量
function getUserInfo() {
    // 发送ajax
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败!');
            }
            // 渲染用户头像
            renderAvatar(res.data);


        },
        // 无论成功或者失败都会触发complete方法
        // complete: function(res) {
        //     console.log(res);
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
        //         // 强制删除本地token
        //         localStorage.removeItem('token');
        //         // 强制跳转页面
        //         location.href = '/login.html';
        //     }
        // }
    });
}

// 渲染用户头像
function renderAvatar(user) {
    // 获取用户的名称
    var name = user.nickname || user.username;

    // 欢迎文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);

    // 渲染用户头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first).show();
    }
}