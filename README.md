# zh.pagination
Pagination.js是一个纯js实现的前端分页组件

使用方法：</br>
1.引入pagination.js和相关css</br>
2.设置一个div,且设置其id,用于分页显示的容器</br>
3.如下根据实际需要，设置相关属性</br>
var a = new Pagination({</br>
//容器</br>
el:'z-page',</br>
//当前页码</br>
current:1,</br>
//总记录数</br>
total:155,</br>
//每页显示条数</br>
pageSize:10,</br>
//分页模式</br>
type:"normal",</br>
//是否显示分页数量下拉项,默认不显示</br>
isShowSizeOption:false,</br>
//是否显示跳转项，默认显示</br>
isShowJumpPage:false,</br>
//是否显示上一页和下一页，默认显示</br>
isShowPrevNext:false,</br>
//是否显示总共多少页，默认显示</br>
isShowTotal:false,</br>
paginationText:{</br>
  goBtnText:'go',</br>
  prevPageText:'<',</br>
  nextPageText:'>',</br>
  pageText:'page',</br>
  goText:' ',</br>
  totalPageText:'total ',</br>
  selectText:'/page'</br>
},</br>
style:{</br>
  borderColor:'#fff',</br>
  currentPageColor:'blue',</br>
  hoverPageColor:'yellow',</br>
  color:'#ccc',</br>
  fontSize:'14px'</br>
},</br>
//回调函数</br>
onPage:function(num,size){</br>
  console.log(num+","+size);</br>
}</br>
});</br>

