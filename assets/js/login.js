$(function() {
    // 点击"去注册账号"的链接,隐藏登录区域,显示注册区域
    $('#link_reg').on('click', function() {
        $('.login-box').hide();
        $('.reg-box').show();
    });
    // 点击"去登录"的链接,隐藏注册区域,显示登录区域
    $('#link_login').on('click', function() {
        $('.login-box').show();
        $('.reg-box').hide();
    });

    // 自定义验证规则
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        // 密码规则
        pwd: [
            /^[\S]{6,16}$/,
            "密码必须6-16位,且不能输入空格"
        ],
        repwd: function(value) {
            // 通过形参拿到的是确认密码框中的内容
            // 选择器必须带空格,选择的是后代中的input,name属性值为password的那一个标签
            var pwd = $('.reg-box [name=password]').val();
            if (value !== pwd) {
                return "两次密码输入不一致!";
            }
        }
    });

    // 注册功能 监听提交事件
    $('#form_reg').on('submit', function(e) {
        // 阻止表单的默认提交事件
        e.preventDefault();
        // 发送ajax
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username: $('.reg-box [name=username]').val(),
                password: $('.reg-box [name=password]').val()
            },
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('注册成功!');
                // 注册成功之后,模拟手动点击登录事件
                $('#link_login').click();
            }
        });

    });
    // 登录功能
    $('#form_login').on('submit', function(e) {
        // 阻止表单的默认提交事件
        e.preventDefault();
        // 发送ajax
        $.ajax({
            method: 'POST',
            url: '/api/login',
            // 快速获取表单
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('登录成功!');

                // 将登录成功之后返回的token 值保存到本地 未来的接口要使用token
                localStorage.setItem('token', res.token);
                // 跳转页面
                location.href = '/index.html';
            }
        });

    });
})