$(function () {
    // 点击切换效果
    $('#link_reg').click(() => {
        $('.login-box').hide().siblings('.reg-box').show();
    })
    $('#link_login').click(() => {
        $('.reg-box').hide().siblings('.login-box').show();
    })

    // 获取form
    const form = layui.form;

    form.verify({
        pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
        // 校验两次密码是否一致
        repwd: (val) => {
            const pwd = $('.reg-box [name=password]').val();
            if (val !== pwd) return '两次密码输入不一致'
        }
    });

    // 根路径
    // const baseUrl = `http://www.liulongbin.top:3007`;
    // 获取layer内置模块
    const layer = layui.layer
    // 监听注册表单提交事件
    $('#form_reg').on('submit', (e) => {
        // 阻止默认提交事件
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/api/reguser',
            data: {
                username: $('.reg-box [name=username]').val(),
                password: $('.reg-box [name=password]').val(),
            },
            success: (res) => {
                if (res.status !== 0) return layer.msg(res.message);
                layer.msg('注册成功');
                $('#link_login').click();
                $(".tcyhm").val($(".sryhm").val())
                $(".tcmm").val($(".srmm").val())
            }
        })

    })

    // 监听登录表单提交事件
    $('#form_login').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: "/api/login",
            data: $(this).serialize(),
            success: (res) => {
                if (res.status !== 0) return layer.msg(res.message)
                layer.msg('登录成功')
                // 将登录成功得到的 token 字符串，保存到 localStorage 中
                localStorage.setItem("token", res.token);
                // 跳转到主页
                location.href = "/index.html";
            }
        })
    })
})