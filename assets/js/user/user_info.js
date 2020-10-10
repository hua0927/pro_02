$(function() {
    // 定义校验规则
    var form = layui.form;
    form.verify({
        nickname: [
            /^[\S]{1,6}$/,
            "昵称长度必须在 1 ~ 6 个字符之间!"
        ]
    });

    // 初始化用户信息
    initUserInfo();

    // 初始化用户信息封装,后面要用
    var layer = layui.layer;

    function initUserInfo() {
        $.ajax({
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                // 成功后渲染
                form.val('formUserInfo', res.data);
            }
        })
    }
    $('#reset').on('click', function(e) {
        // 阻止表单默认提交行为
        e.preventDefault();
        // 重新用户渲染
        initUserInfo();
    });

    // 更新用户信息
    $('.layui-form').on('submit', function(e) {
        // 阻止表单默认提交行为
        e.preventDefault();
        // 发起ajax
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('更新用户信息成功！');
                // 调用父页面中的方法,重新渲染用户的头像和用户的信息
                window.parent.getUserInfo();
            }
        })
    })
});