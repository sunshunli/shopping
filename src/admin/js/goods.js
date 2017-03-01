! function(window, document, $, undefined) {

    var $dlg = $('#goodsDlg');
    var $delBtn = $('#delBtn');
    var cache = {};

    //程序唯一入口
    var init = function(argument) {
        initEvent();
        getTableData();
    };
    //事件绑定
    var initEvent = function() {
        $('#newBtn').on('click', onNewBtnClick);
        $('#saveBtn').on('click', onSaveBtnClick);
        $('#delBtn').on('click', onDelBtnClick);
        $('#updateBtn').on('click', onUpdateBtnClick);
        //绑定未来元素事件，产品checkbox绑定事件
        $('#goodsTable').on('click', 'tbody input[type=checkbox]', onChkBoxClick);
    };

    //从后台获取数据
    var getTableData = function(argument) {
            var url = '../../../api/shopping_goods_list.php';
            //弹出遮罩层
            var loadingMsg = layer.msg('正在加载，请稍等...', { shade: [0.3, '#000'] });
            $.get(url, function(response) {
                if (response.success) {
                    //渲染表格
                    renderTable(response);
                    //关闭遮罩层
                    layer.close(loadingMsg);
                }
            }, 'json');
        }
        //渲染表格
    var renderTable = function(response) {
            //获得数据数组
            var data = response.data,
                trArr = [];
            //遍历数组
            $.each(data, function(index, obj) {
                trArr.push(
                    '<tr>',
                    '<td><input id="', obj.id, '" type="checkbox"></td>',
                    '<td>', index + 1, '</td>',
                    '<td>', obj.title, '</td>',
                    '<td>￥', obj.price, '</td>',
                    '<td>', obj.details, '</td>',
                    '<td>', obj.amount, '</td>',
                    '<td>', obj.classify, '</td>',
                    '</tr>'
                );
                cache[obj.id] = obj;
            });

            $('#goodsTable tbody').html(trArr.join(''));
        };
        //添加新商品
    var onNewBtnClick = function() {
        $('#gForm').trigger('reset');
        $dlg.find('#dlgTitle').text('新增商品').end().modal({
            keyboard: true
        });
    };
    //保存新增商品
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
            var saveMsg = layer.msg('正在保存商品...', { shade: [0.3, '#000'] });

            //Ajax请求
            $.get(url, data, function(response) {
                if (response.success) {
                    //关闭遮罩层
                    layer.close(saveMsg);
                    $dlg.modal('hide');
                    $('#gForm').trigger('reset');
                    layer.msg('商品添加成功！', { offset: 't', anim: 0 });
                    getTableData();
                } else {
                    layer.msg('商品添加失败！', { offset: 't', anim: 0 });
                }
            }, 'json');
    };

    //修改商品
    var onUpdateBtnClick = function() {
        var $chkbox = $('#goodsTable tbody input[type=checkbox]:checked');
        var id = $chkbox[0].id;
        var obj = cache[id];
        console.log(obj.title);
        $dlg.find('#title').val(obj.title);
        $dlg.find('#price').val(obj.price);
        $dlg.find('#details').val(obj.details);
        $dlg.find('#amount').val(obj.amount);
        $dlg.find('#classify').val(obj.classify);
        //上架，下架状态
        $dlg.find('input[name="status"][value="'+obj.status+'"]').trigger('click');
        $dlg.find('#dlgTitle').text('修改商品').end().modal({
            keyboard: true
        });
    }
        //删除商品
    var onDelBtnClick = function(argument) {
        var $chkbox = $('#goodsTable tbody input[type=checkbox]:checked');
        var tempArr = [];
        var url = '../../../api/shopping_goods_del.php';
        //询问框
        var delGoodsConfirm = layer.confirm('确定是否删除所选商品？', {
            btn: ['取消', '确定'],
            title: '删除商品',
            cancel: function() {
                layer.close(delGoodsConfirm);
            }
        }, function() {
            layer.close(delGoodsConfirm);
        }, function() {
            var delMsg = layer.msg('正在删除商品...', { shade: [0.3, '#000'] });
            $chkbox.each(function() {
                tempArr.push(this.id);
            });

            $.get(url, { ids: tempArr.join(',') }, function(response) {
                if (response.success) {
                    layer.close(delMsg);
                    layer.msg('商品成功删除！', { offset: 't', anim: 0 });
                    //删除成功后，disable掉删除商品按钮
                    $delBtn.attr('disabled', 'disabled');
                    getTableData();
                }
            }, 'json');
        });
    };
    //复选框选中产品事件
    var onChkBoxClick = function() {
        var $inputs = $('#goodsTable tbody input[type=checkbox]');
        var $chkbox = $('#goodsTable tbody input[type=checkbox]:checked');
        var $updateBtn = $('#updateBtn');
        var len = $chkbox.length;

        //选中复选框后，本行高亮
        $inputs.each(function(i, obj) {
            if ($(obj).prop('checked')) {
                $(obj).parent().parent().attr('class', 'danger');
            } else {
                $(obj).parent().parent().removeAttr('class', 'danger');
            }
        });

        if (len > 0) {
            $delBtn.removeAttr('disabled');
            if (len == 1) {
                $updateBtn.removeAttr('disabled');
            } else {
                $updateBtn.attr('disabled', 'disabled')
            }
        } else {
            $delBtn.add($updateBtn).attr('disabled', 'disabled');
        }
    };

    $(document).ready(init);
}(window, document, jQuery);
