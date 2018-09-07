;(function(window){
    function Pagination(obj){
      this.el = document.getElementById(obj.el);
      if(!this.el) return;
      this.current = obj.current || 1;//当前页码数
      this.total = obj.total || 1;//后台返回的总记录条数
      this.pageNum = 0;//总分页数
      this.pageSize = obj.pageSize || 10;//每页查询显示的条数
      this.sizeType = obj.sizeType || [10,20,50,100];
      this.type = obj.type || 'normal';
      this.onPage = obj.onPage || function(){};//点击页码执行的函数，两个参数，当前页数，每页查询条数
      this.isShowSizeOption = obj.isShowSizeOption || false;//是否显示查询条数选择框
      this.isShowPrevNext = obj.isShowPrevNext == null ? true : obj.isShowPrevNext;//是否显示上下页
      this.isShowTotal = obj.isShowTotal == null ? true : obj.isShowTotal;//是否显示总页数
      this.isShowJumpPage = obj.isShowJumpPage == null ? true : obj.isShowJumpPage;//是否显示跳转
      var pageText = obj.paginationText || {};//文字描述
      this.paginationText = this.setText(pageText);
      if(obj.style){
        this.style = this.setStyle(obj.style);//自定义样式
      }
      this.init();
    }
    Pagination.prototype = {
      init: function(){
        var self = this;
        self.totalPages();
        self.showPaginationType(self.type);
      },
      totalPages:function(){
        var self = this;
        if(self.total>=0 && self.pageSize > 0){
          pageNum = self.pageNum = Math.ceil(self.total / self.pageSize);
        }
      },
      showPaginationType: function(type){
        var self = this;
        if(type == null) return;
        switch(type+''){
          case 'normal':
          self.normalHtm();
          break;
          case 'simple':
          self.simpleHtm();
          break;
        }
      },
      setText:function(paginationText){
        return {
          prevPageText:paginationText.prevPageText || '上一页',
          nextPageText:paginationText.nextPageText || '下一页',
          totalPageText:paginationText.totalPageText || '总共',
          pageText:paginationText.pageText || '页',
          goText:paginationText.goText || '跳至',
          goBtnText:paginationText.goBtnText || '确定',
          selectText:paginationText.selectText || '条/页'
        }
      },
      setStyle:function(style){
        return {
          borderStyle:style.borderStyle || 'solid',
          borderWidth:style.borderWidth || '1px',
          borderColor:style.borderColor || '#ddd',
          color:style.color || '#666',
          fontSize:style.fontSize || '12px',
          currentPageColor:style.currentPageColor || '#FF8400',
          currentPageFontColor:style.currentPageFontColor || '#666',
          hoverPageColor:style.hoverPageColor || '#FFB800',
          hoverPageFontColor:style.hoverPageFontColor || '#FFF'
        }
      },
      renderCss:function(){
        var self = this;
        var a = self.el.getElementsByTagName('a');
        if(a && a.length > 0 && self.style){
          for(var i=0,j=a.length; i < j; i++){
            a[i].style.borderStyle = self.style.borderStyle;
            a[i].style.borderWidth = self.style.borderWidth;
            a[i].style.borderColor = self.style.borderColor;
            a[i].style.color = self.style.color;
            a[i].style.fontSize = self.style.fontSize;
          }
        }
        if(self.style){
          if(a && a.length > 0){
            var color = a[0].style.color;
            for(var i=0,j=a.length; i < j; i++){
              a[i].onmouseenter = function(){
                if(this.innerText == self.current || this.textContent == self.current) return;
                this.style.backgroundColor = self.style.hoverPageColor;
                this.style.color = self.style.hoverPageFontColor;
              }
              a[i].onmouseleave = function(){
                if(this.innerText == self.current || this.textContent == self.current) return;
                this.style.backgroundColor = "#FFFFFF";
                this.style.color = color;
              }
            }
          }
        }
      },
      normalHtm:function(){
        var self = this;
        self.remove();
        var $paginationBox = document.createElement('div');
        $paginationBox.className = 'ui-pagination';
        if(self.isShowSizeOption){
          var $pageSize = self.createPageSizeOptions();
          $paginationBox.appendChild($pageSize);
        }
        var $ul = document.createElement('ul');
        $ul.className = 'page';
        if(self.isShowPrevNext){
          var $prevPage = self.createPrevPage();
          $ul.appendChild($prevPage);
        }
        var $li = self.createLi();
        for(var s=0;s<$li.length;s++){
          $ul.appendChild($li[s]);
        }
        if(self.isShowPrevNext){
          var $nextPage = self.createNextPage();
          $ul.appendChild($nextPage);
        }
        $paginationBox.appendChild($ul);
        if(self.isShowTotal){
          var $total = self.createTotalPage();
          $paginationBox.appendChild($total);
        }
        if(self.isShowJumpPage){
          var $jump = self.createJumpPage();
          $paginationBox.appendChild($jump);
        }
        self.el.appendChild($paginationBox);
        self.renderCss();
      },
      simpleHtm: function(){
        var self = this;
        self.remove();
        var $div = document.createElement('div');
        $div.className = 'ui-pagination';
        var $ul = document.createElement('ul');
        $ul.className = 'page';
        if(self.isShowPrevNext){
          var $prevPage = self.createPrevPage();
          $ul.appendChild($prevPage);
        }
        if(self.isShowPrevNext){
          var $nextPage = self.createNextPage();
          $ul.appendChild($nextPage);
        }
        $div.appendChild($ul);
        if(self.isShowTotal){
          var $total = self.createTotalPage();
          $div.appendChild($total);
        }
        self.el.appendChild($div);
        self.renderCss();
      },
      remove: function(){
        var div = this.el;
        while(div.hasChildNodes())
        {
          div.removeChild(div.firstChild);
        }
      },
      createPageSizeOptions:function(){
        var self = this;
        var $pageSize = document.createElement('div');
        $pageSize.className = 'pagesize-wrap';
        var select = document.createElement('select');
        select.className = 'pagesize';
        for(var i = 0 ;i < self.sizeType.length;i ++ ) {   
          var option  =  document.createElement("option");   
          var text  =  document.createTextNode(self.sizeType[i]+' '+self.paginationText.selectText);   
          option.appendChild(text);   
          option.value = self.sizeType[i];
          select.appendChild(option);    
        }
        select.onchange = function(){
          var pageSize = this.value;
          self.current = 1;
          self.pageSize = pageSize;
          self.showPaginationType(self.type);
        }
        select.value = self.pageSize;
        $pageSize.appendChild(select);
        return $pageSize;
      },
      createTotalPage: function(){
        var self = this;
        var $total = document.createElement('div');
        var $totalTxt;
        $total.className = 'pagesize';
        if(self.type && self.type == 'normal'){
          $totalTxt = document.createTextNode(self.paginationText.totalPageText + 
            ''+ self.pageNum + self.paginationText.pageText);
        }else{
          $totalTxt = document.createTextNode(self.current + '/' + self.pageNum);
        }
        $total.appendChild($totalTxt);
        return $total;
      },
      createJumpPage: function(){
        var self = this;
        var jump = document.createElement('div');
        jump.className = 'jump';
        var jumpTxt1 = document.createTextNode(self.paginationText.goText);
        jump.appendChild(jumpTxt1);
        var jumpInput = document.createElement('input');
        jumpInput.className = 'goto-input';
        jumpInput.type = 'text';
        jumpInput.maxLength = '8';
        jumpInput.onkeyup = function(){
         var inpVal = this.value;
         if(!/^\d+$/.test(inpVal)){
          this.value = '';
        }}
        jump.appendChild(jumpInput);
        var jumpTxt2 = document.createTextNode(self.paginationText.pageText);
        jump.appendChild(jumpTxt2);
        var a = document.createElement('a');
        a.href = 'javascript:void(0);';
        a.className = 'go';
        var aTxt = document.createTextNode(self.paginationText.goBtnText);
        a.onclick = function(){
          var pageNo = this.parentNode.getElementsByTagName('input')[0].value;
          if(!/^\d+$/.test(pageNo)) return;
          pageNo = Math.max(1,pageNo);
          pageNo = Math.min(pageNo,self.pageNum);
          self.current = parseInt(pageNo);
          self.onPage(self.current,self.pageSize);
          self.showPaginationType(self.type);
        }
        a.appendChild(aTxt);
        jump.appendChild(a);
        return jump;
      },
      createPrevPage: function(){
        var self = this;
        var prevPage = document.createElement('li');
        prevPage.className = 'prev';
        var a = document.createElement('a');
        a.href = 'javascript:void(0);';
        a.className = 'prev';
        var prevPageATxt = document.createTextNode(self.paginationText.prevPageText);
        a.appendChild(prevPageATxt);
        prevPage.appendChild(a);
        if(self.current == 1){
          prevPage.setAttribute('disabled','true');
        }
        prevPage.onclick = function(){
          if(self.current <= 1) return;
          self.current = self.current*1 - 1;
          self.onPage(self.current,self.pageSize);
          self.showPaginationType(self.type);
        }
        return prevPage;
      },
      createNextPage: function(){
        var self = this;
        var nextPage = document.createElement('li');
        nextPage.className = 'next';
        var a = document.createElement('a');
        a.href = 'javascript:void(0);';
        a.className = 'next';
        var nextPageATxt = document.createTextNode(self.paginationText.nextPageText);
        a.appendChild(nextPageATxt);
        nextPage.appendChild(a);
        if(self.current == self.pageNum){
          nextPage.setAttribute('disabled','true');
        }
        nextPage.onclick = function(){
          if(self.current >= self.pageNum) return;
          self.current = self.current*1 + 1;
          self.onPage(self.current,self.pageSize);
          self.showPaginationType(self.type);
        }
        return nextPage;
      },
      createLi: function(){
        var self = this;
        var liArray = [];
        var list = self.pageList();
        if(list && list.length > 0){
          for(var i=0,j=list.length; i < j; i++){
            if(list[i] == 0){
              var node = document.createElement('li');
              var nodeText = document.createTextNode('...');
              node.appendChild(nodeText);
              liArray.push(node);
            }else{
              var liNode = document.createElement('li');
              if(list[i] == self.current){
                liNode.className = 'current';
              }else{
                liNode.className = '';
              }
              var aNode = document.createElement('a');
              aNode.href = 'javascript:void(0)';
              var aNodeTxt = document.createTextNode(list[i]);
              aNode.appendChild(aNodeTxt);
              liNode.onclick = function(){
                var val = this.childNodes[0].innerText;
                self.current = parseInt(val);
                self.onPage(val,self.pageSize);
                self.showPaginationType(self.type);
              }
              liNode.appendChild(aNode);
              if(list[i] == self.current && self.style){
                liNode.getElementsByTagName('a')[0].style.backgroundColor = self.style.currentPageColor;
                liNode.getElementsByTagName('a')[0].style.color = self.style.currentPageFontColor;
              }
              liArray.push(liNode);
            }
          }
        }
        return liArray;
      },
      sizeType:function(){
        if(this.sizeType.indexOf(this.pageSize1) == -1){
          this.sizeType.push(this.pageSize);
        }
        this.sizeType.sort(function(a,b){
          return a-b;
        });
      },
      pageList:function(){
        var self = this;
        self.totalPages();
        var pageNum = self.pageNum;
        var current = self.current*1;
        var list = [];
        if(pageNum<=10){
          for(var i=1;i<=pageNum;i++){
            list.push(i);
          }
        }else{
          var start = current - 5;
          var end = current + 5;
          if(current<=5){
            list = [1,2,3,4,5,6,7,0,pageNum-1,pageNum];
          }else if(end>=pageNum){
            list = [1,2,0,pageNum-6,pageNum-5,pageNum-4,pageNum-3,pageNum-2,pageNum-1,pageNum];
          }else{
            list = [1,0,current-2,current-1,current,current+1,current+2,0,pageNum];
          }
        }
        return list;
      }
    }
    window.Pagination = Pagination;
  })(window)
