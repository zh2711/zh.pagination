# zh.pagination
Pagination.js是一个纯js实现的前端分页组件

使用方法：</br>
1.引入pagination.js和相关css</br>
2.设置一个div,且设置其id,用于分页显示的容器</br>
3.如下根据实际需要，设置相关属性</br>
var a = new Pagination({
//容器
el:'z-page',
//当前页码
current:1,
//总记录数
total:155,
//每页显示条数
pageSize:10,
//分页模式
type:"normal",
//是否显示分页数量下拉项
isShowSizeOption:true,
paginationText:{
  goBtnText:'go',
  prevPageText:'<',
  nextPageText:'>',
  pageText:'page',
  goText:' ',
  totalPageText:'total ',
  selectText:'/page'
},
style:{
  borderColor:'#fff',
  currentPageColor:'blue',
  hoverPageColor:'yellow',
  color:'#ccc',
  fontSize:'14px'
},
//回调函数
onPage:function(num,size){
  console.log(num+","+size);
}
});

