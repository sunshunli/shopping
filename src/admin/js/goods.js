!function(window, document, $, undefined) {
    var init = function(argument) {
        initEvent();
    };

    var initEvent = function() {
        $('#newBtn').on('click', onNewBtnClick);
        $('#saveBtn').on('click', onsaveBtnClick);
    };

    var onNewBtnClick = function() {
        $('#goodsDlg').modal({
            keyboard: true
        });
    };

    var onsaveBtnClick = function() {
        var data = {
            title: $('#title').val(),
            price: $('#price').val(),
            detail: $('#detail').val(),
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

    }

    $(document).ready(init);
}(window, document, jQuery);