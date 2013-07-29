var Pages = {
    create: function(){return {
        container: null
        ,tmpl_id: "template_pages"
        ,num: 0
        ,start: 0
        ,count: 0
        ,range: 5
        ,str: {
             prev_page: "前一页"
            ,next_page: "下一页"
        }
        ,owner: undefined
        ,callback: null
        ,init: function(container_, data) {
            if( typeof(container_) ===  "string")
                this.container = $(container_);
            else
                this.container = container_;

            data = data || {};
            this.id = data.id;
            this.range = data.range || this.range;
            this.tmpl_id = data.tmpl_id || this.tmpl_id;
            this.owner = data.owner;
            this.callback = data.callback;

            // Copy左边有的字符串
            $sw.string.copyByLeft(this.str, data.str);
        }
        ,show: function(data) {
            this.num = data.num;
            this.start = data.start;
            this.count = data.count;

            var tmpl = $("#" + this.tmpl_id).html();
            var result = _.template(tmpl, this);
            this.container.html(result);
            var _this = this;
            this.container.find('a').each(function(index){
                var page =  $(this).attr("page");
                if( page ) {
                    $(this).click(function() {
                        if(_this.callback)
                            _this.callback.call(_this.owner, parseInt(page));
                    });
                }
            });
        }
    }}};