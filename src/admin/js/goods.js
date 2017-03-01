!function(window, document, $, undefined) {

    var $dlg = $('#goodsDlg');

    var init = function(argument) {
        initEvent();
    };

    var initEvent = function() {
        $('#newBtn').on('click', onNewBtnClick);
        $('#saveBtn').on('click', onSaveBtnClick);
    };

    var onNewBtnClick = function() {
        $dlg.modal({
            keyboard: true
        });
    };

    var onSaveBtnClick = function() {
        var url = '../../../api/shopping_goods_add.php';
        var data = {
            title: $('#title').val(),
            price: $('#price').val(),
            details: $('#details').val(),
            amount: $('#amount').val(),
            classify: $('#classify').val(),
            status: $('input[name=status]:checked').val()
        }


        // 表单验证
        if (data.title == '') {
            alert('商品名称不能为空！');
            return;
        }

        if (data.price == '' || data.price < 0) {
            alert('商品价格不能为空，并且不能小于0！');
            return;
        }

        if (data.detail == '') {
            alert('商品描述不能为空！');
            return;
        }

        if (data.amount == '') {
            alert('商品库存不能为空！');
            return;
        }
        //弹出遮罩层
        var index = layer.load(0, {shade: [0.3,'#fff']}); //0代表加载的风格，支持0-2

        //Ajax请求
        $.get(url, data, function(response) {
            if (response.success) {
                //关闭遮罩层
                layer.closeAll('loading');
                $dlg.modal('hide');
                $('#gForm').trigger('reset');
                layer.msg('商品添加成功！', {offset: 't', anim: 0});
            } else {
                alert('商品添加失败！');
            }
        }, 'json');

    }

    $(document).ready(init);
}(window, document, jQuery);