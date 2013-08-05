var Categories = {
    id: undefined
    ,code: 0
     ,name: "root"
     ,items: [
         {
             id: undefined
             ,code: 10000
             ,name: "デバイス"
             ,items: [
                {  id: undefined, code: 10001 ,name: "iOS"
                ,items: [
                    { id: undefined, code: 11000 ,name: "os" ,items:[
                        ] }
                    ,{ id: undefined, code: 10002 ,name: "device" ,items:[
                    ] }
                ]}
                ,{ id: undefined, code: 10002 ,name: "Android" }
                ,{ id: undefined, code: 10003 ,name: "PC Web" }
             ]
         }
         ,{
            id: undefined
            ,code: 20000
             ,name: "業種"
            ,items: [
                {  id: undefined, code: 20001 ,name: "贩卖/零售" }
                ,{ id: undefined, code: 20002 ,name: "制造" }
                ,{ id: undefined, code: 20003 ,name: "政府部门/事业单位" }
                ,{ id: undefined, code: 20004 ,name: "金融" }
                ,{ id: undefined, code: 20005 ,name: "运输" }
                ,{ id: undefined, code: 20006 ,name: "服务" }
                ,{ id: undefined, code: 20007 ,name: "信息・通信/广播" }
                ,{ id: undefined, code: 20008 ,name: "电器・煤气" }
                ,{ id: undefined, code: 20009 ,name: "教育" }
                ,{ id: undefined, code: 20010 ,name: "其它" }
            ]
         }
         ,{
            id: undefined
            ,code: 30000
             ,name: "規模"
            ,items: [
                {  id: undefined, code: 30001 ,name: "2000人以下" }
                ,{ id: undefined, code: 30002 ,name: "1000人以下" }
                ,{ id: undefined, code: 30003 ,name: "500人以下" }
                ,{ id: undefined, code: 30004 ,name: "100人以下" }
                ,{ id: undefined, code: 30005 ,name: "50人以下" }
            ]
         }
     ]
};

exports.getCategories = function(){
    return Categories;
}