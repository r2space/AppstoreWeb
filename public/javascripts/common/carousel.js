var Carousel = {
    create: function(){return {
        container: null
        ,id_prex: ""
        ,tmpl_id: "template_carousel"
        ,init: function(container_, data) {
            var _this = this;
            if( typeof(container_) ===  "string")
                this.container = $(container_);
            else
                this.container = container_;

            this.id_prex = data.id_prex;
            this.url = data.url;

        }
        ,load: function(start, limit){
            start = start || 0;
            limit = limit || this.foot_pages.limit;

            // for test
            var d = {
                apps: test_detail_list_data
                ,isShowTopPages: this.isShowTopPages
            };
            this.load_end(d);
        }
        ,load_end: function(data_) {
            var _this = this;
            var tmpl = $('#' + this.tmpl_id).html();
            var res = _.template(tmpl, {
                id_prex: _this.id_prex
                ,apps: data_.apps
            });

            this.container.html(res);

            $('#' + this.id_prex + "_carousel").carousel({
                interval: 10000
            });
        }
    }}};