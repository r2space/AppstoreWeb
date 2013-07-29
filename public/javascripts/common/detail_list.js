var DetailList = {
    create: function(){return {
        _this: this
        ,container: null
        ,id_prex: ""
        ,url: ""
        ,cols: []
        ,str: {
            loading: "加载中..."
        }
        ,tmpl_table_id: "template_detail_list"
        ,tmpl_item_id: "template_detail_list_item"
        ,table: undefined
        ,thead: undefined
        ,tbody: undefined
        ,tfoot: undefined
        ,head_pages: null
        ,foot_pages: null
        ,init: function(container_, data) {
            var _this = this;
            if( typeof(container_) ===  "string")
                this.container = $(container_);
            else
                this.container = container_;

            this.id_prex = data.id_prex;
            this.url = data.url;
            // Copy左边有的字符串
            $sw.string.copyByLeft(this.str, data.str);

            // 初始化列
            this.cols = this._parse_cols(data.cols);

            // 初始化列表显示
            var tmpl_table = $('#' + this.tmpl_table_id).html();
            var res_table = _.template(tmpl_table, this);
            this.container.append(res_table);
            this.table = $('#' + this.id_prex + "_table");
            this.thead = $('#' + this.id_prex + "_thead");
            this.tbody = $('#' + this.id_prex + "_tbody");
            this.tfoot = $('#' + this.id_prex + "_tfoot");


            // 初始化分页
            this.head_pages = Pages.create();
            this.head_pages.init($("#" + this.id_prex + "_head_pages"), {
                owner: this
                , callback: this.load
            });
            this.foot_pages = Pages.create();
            this.foot_pages.init($("#" + this.id_prex + "_foot_pages"), {
                owner: this
                , callback: this.load
            });

            // test
            var testData = {
                num: 1
                ,start: 1
                ,count: 3
            };
            this.head_pages.show(testData);
            this.foot_pages.show(testData);
        }
        ,_parse_cols: function(cols) {
            var result = [];
            if(cols) {
                _.each(cols, function(col) {
                    var name, title;
                    if(typeof(col) == "string") {// 如果是字符串，data.cols本身是列名的数组
                        name = col;
                        title = undefined;
                    } else {// 如果不是字符串，data.cols本身是列对象的数组
                        name = col.name;
                        title = col.title;
                    }

                    if(title) { // 有自定义title的场合
                        result.push(col);
                    } else { // 没有自定义title的场合,使用默认的title
                        for(var i=0; i< DetailList.all_cols.length; i++) {
                            var c = DetailList.all_cols[i];
                            if(c.name == name) {
                                result.push(c);
                                break;
                            }
                        }
                    }
                });
            } else {
                result = DetailList.all_cols;
            }

            return result;
        }
        ,load: function(page_num){
            page_num = page_num || 1;
            alert(page_num);

            // for test
            var d = {
                apps: [
                    {
                        name: "AAAAAA"
                        ,memo: "AAAAA----"
                        ,appType: "iphone,ipad"
                        ,icon:{
                            big:""
                            ,small: ""
                        }
                        ,category: "10001"
                        ,version: "1.2.3"
                        ,downloadId: ""
                        ,open_date: {}
                        ,expire_date: {}
                        ,create_date: {}
                        , create_user: "1111"
                        , update_date: {}
                        , update_user: "222"
                        , require: {
                            os: "iOS"
                            ,device:"iphone4以上,ipad5"
                            ,server: "nothing"              //服务器要求
                        }
                        , size: 4848448
                        , status: -1                // 状态：-1、无效app 0、未公开 1、社内公开 2、社外限定公开 3、社外任意公开
                        , rank: 300
                    }
                ]};
            this.load_end(d);
        }
        ,load_end: function(data_) {
            var _this = this;
            var data = {
                cols: _this.cols
                ,apps: data_.apps
            };
            var tmpl_item = $('#' + this.tmpl_item_id).html();
            var res_item = _.template(tmpl_item, data);
            this.tbody.html(res_item);

            // test
            var testData = {
                num: 1
                ,start: 1
                ,count: 3
            };
            this.head_pages.show(testData);
            this.foot_pages.show(testData);
        }
    }}};