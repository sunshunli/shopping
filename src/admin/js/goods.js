! function(window, document, $, undefined) {

    var $dlg = $('#goodsDlg');
    var $delBtn = $('#delBtn');
    var cache = {}; //修改商品，获取数据时，将对象按id存放
    var param = { //搜索传参
        query: '',
        size: 3,
        page: 0
    };

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
        $('#searchBtn').on('click', onSearchBtnClick);
        //绑定未来元素事件，产品checkbox绑定事件
        $('#goodsTable').on('click', 'tbody input[type=checkbox]', onChkBoxClick);
        $('#pageUl').on('click', 'li', onPageLiClick);
    };
    //从后台获取数据
    var getTableData = function() {
        var url = '../../../api/shopping_goods_list.php'
            url2 = '../../../api/shopping_classify_list.php';

        $.when($.getJSON(url, param), $.getJSON(url2)).done(function(resTableData, resClassify) {
            //弹出遮罩层
            var loadingMsg = layer.msg('正在加载，请稍等...', {time: 0, shade: [0.3, '#000'] });
            if (resTableData[0].success) {
                //渲染表格
                renderTable(resTableData[0], resClassify[0]);
                //渲染分页项
                renderPaging(resTableData[0]);
                //关闭遮罩层
                layer.close(loadingMsg);
            }
        });

    };
    //渲染表格
    var renderTable = function(resTbl, resCla) {
        //获得数据数组
        var data = resTbl.data,
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
                '<td>', getClassifyById(obj.classify, resCla.data), '</td>',
                '</tr>'
            );
            cache[obj.id] = obj;

        });

        $('#goodsTable tbody').html(trArr.join(''));
    };
    //通过id获取类别name
    var getClassifyById = function(id, arr) {
        var name;
        $.each(arr, function(i, objCla) {
            if (objCla.id == id) {
                name = objCla.name;
                return false;
            }
        });
        return name;
    }

    //添加新商品
    var onNewBtnClick = function() {
        getClassifyData(function() {
            $('#gForm').trigger('reset');

            $dlg
                .find('#gid').val('0').end()
                .find('#dlgTitle').text('新增商品').end().modal({
                    keyboard: true
                });
        });
    };
    //获取商品类别
    var getClassifyData = function(callback) {
        var url = '../../../api/shopping_classify_list.php';
        var classifyMsg = layer.msg('正在加载，请稍等...', {time: 0, shade: [0.3, '#000'] });
        $.get(url, function(response) {
            var tempArr = ['<option>请选择</option>'];
            if (response.success) {
                $.each(response.data, function(i, obj) {
                    tempArr.push('<option value="', obj.id, '">', obj.name, '</option>');
                });
                $('#classify').html(tempArr.join(''));
            }
            layer.close(classifyMsg);
            callback();
        }, 'json');
    };
    //保存新增商品
    var onSaveBtnClick = function() {
        var url = '../../../api/shopping_goods_add.php';
        var gid = $('#gid').val();
        var data = {
                title: $('#title').val(),
                price: $('#price').val(),
                details: $('#details').val(),
                amount: $('#amount').val(),
                classify: $('#classify').val(),
                status: $('input[name=status]:checked').val()
            }
            //通过给表单添加一个hidden的input元素，在点击修改商品时添加value属性为当前选中商品id
            //这里判断如果id有值，保存按钮为修改，如果id为0，则为添加新商品
        if (gid != 0) {
            url = '../../..//api/shopping_goods_update.php';
            data.id = gid;
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
        var saveMsg = layer.msg('正在保存商品...', {time: 0, shade: [0.3, '#000'] });

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

        $dlg.find('#gid').val(id);
        $dlg.find('#title').val(obj.title);
        $dlg.find('#price').val(obj.price);
        $dlg.find('#details').val(obj.details);
        $dlg.find('#amount').val(obj.amount);
        $dlg.find('#classify').val(obj.classify);
        //上架，下架状态
        $dlg.find('input[name="status"][value="' + obj.status + '"]').trigger('click');
        $dlg.find('#dlgTitle').text('修改商品').end().modal({
            keyboard: true
        });
    };
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
            var delMsg = layer.msg('正在删除商品...', {time: 0, shade: [0.3, '#000'] });
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
    //搜索
    var onSearchBtnClick = function() {
        var $searchIpt = $('#searchIpt'),
            txt = $searchIpt.val();
        param.query = txt;
        getTableData();
    };
    //分页
    var renderPaging = function(response) {
        var $pageUl = $('#pageUl'),
            total = response.total,
            pages = Math.ceil(total / param.size),
            tempArr = ['<li class="prev"><a href="javascript:;">&laquo;</a></li>'];

        param.totalPages = pages;

        for (var i = 0; i < pages; i++) {
            if (param.page == i) {
                tempArr.push('<li data-pageid="', i, '" class="active"><a href="javascript:;">', i + 1, '</a></li>');
            } else {
                tempArr.push('<li data-pageid="', i, '"><a href="javascript:;">', i + 1, '</a></li>');
            }
        }
        tempArr.push('<li class="next"><a href="javascript:;">&raquo;</a></li>');
        $pageUl.html(tempArr.join(''));
    };
    //分页项渲染
    var onPageLiClick = function() {
        var $this = $(this);
        var pageLiID = $this.attr('data-pageid');

        if ($this.hasClass('next')) { //下一页
            pageLiID = ++param.page;
            pageLiID = pageLiID > param.totalPages - 1 ? param.totalPages - 1 : pageLiID;
        } else if ($this.hasClass('prev')) { //上一页
            pageLiID = --param.page;
            pageLiID = pageLiID < 0 ? 0 : pageLiID;
        }
        param.page = pageLiID;
        getTableData();
    };
    $(document).ready(init);
}(window, document, jQuery);
