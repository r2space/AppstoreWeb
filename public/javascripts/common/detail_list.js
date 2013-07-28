var DetailList = {
    create: function(){return {
        _this: this
        ,container: null
        ,id_prex: ""
        ,url: ""
        ,titles: []
        ,str: {
            loading: "加载中..."
        }
        ,tmpl_id: "template_detail_list"
        ,head_pages: null
        ,foot_pages: null
        ,init: function(container_, data) {
            if( typeof(container_) ===  "string")
                this.container = $(container_);
            else
                this.container = container_;

            this.id_prex = data.id_prex;
            this.url = data.url;
            this.titles = data.titles;
            // Copy左边有的字符串
            $sw.string.copyByLeft(this.str, data.str);

            var table_tmpl = $('#' + this.tmpl_id).html();
            var str_list = _.template(table_tmpl, this);
            container.append(str_list);


            // 初始化分页
            head_pages = Pages.create();
            head_pages.init($("#" + id_prex + "_head_pages"), {
                callback: this.load
            });
            foot_pages = Pages.create();
            foot_pages.init($("#" + id_prex + "_foot_pages"), {
                callback: this.load
            });

            // test
            var testData = {
                num: 1
                ,start: 1
                ,count: 3
            };
            head_pages.show(testData);
            foot_pages.show(testData);
        }
        ,load: function(page_num){
              alert(page_num);
        }
    }}};