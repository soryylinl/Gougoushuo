// // rap官网：rap.taobao.org
//
// // moock官网：mockjs.com
// 在控制台中使用：
//     调用Mock.mock(JSONObject)方法,JSONObject为接口返回的内容
//     Mock.mock({"success":true,"data|10":[{"video":"blob:http:\/\/www.imooc.com\/17b60259-f8a1-4b22-8b79-565e002ce89d","_id":"@ID","thumb":"@IMG(1200*600,@color())"}]})
//
//
//     示范：
//     在控制台中：
//     var data = Mock.mock({"success":true,"data|10":[{"video":"blob:http:\/\/www.imooc.com\/17b60259-f8a1-4b22-8b79-565e002ce89d","_id":"@ID","thumb":"@IMG(1200*600,@color())"}]});
//     data.data.forEach(function (item) {
//         $("#examples").append('<h3>'+'item._id'+'</h3><img src="'+item.thumb+'"/>')
//     });
//     回车，关掉控制台，在页面最下面就能看到添加的内容
//
