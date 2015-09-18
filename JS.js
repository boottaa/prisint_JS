/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var uri = function(id){
    var url = location.href;
    url = "http://localhost/test/#id=4"
    id  = url.match(/[#id=]+?([\d]{1})/);   
    console.log(id[1]);
}


var scan_dir = function (){
        var getContent = document.querySelector('.content');
        var xhr = new XMLHttpRequest();
        var n = 1;
        var arr = [];
        do {
           // console.log(n);
            xhr.open('GET', './pages/page_'+ n +'.html', false);
            xhr.send();
            n = n+1;
            
        } while (xhr.status == 200);
        return n-2;
        //console.log(n);
        /*for(var i=2; i<=n-2; i++){
            var block = document.createElement('div');
            block.className = 'block next';
            block.id = i;
            getContent.appendChild(block);
        }*/
 }

var scan_section = function(){
    var now = document.querySelector('.now');
    var section = now.querySelectorAll('section');
    var btn_down = document.querySelector('.btn_down');
    //Получаем ключ к самой последней секции
    var x = parseInt(+section.length-1);
    //получаем видимость последней секции
    
    
    if(section.length > 0){
        var getOpacity = section[x].style.opacity;
        btn_down.disabled = false;
        if(getOpacity == 1){
            btn_down.disabled = true;
        }
    }else{
        btn_down.disabled = true;
    }

   
 
   
}

var getPage = function(Npage){
        //ajax загруска контента
    // 1. Создаём новый объект XMLHttpRequest
    var xhr = new XMLHttpRequest();
    // 2. Конфигурируем его: GET-запрос на URL 'phones.json'
    xhr.open('GET', './pages/page_'+ Npage +'.html', false);
    // 3. Отсылаем запрос
    xhr.send();
    // 4. Если код ответа сервера не 200, то это ошибка
    if (xhr.status != 200) {
      // обработать ошибку
      return xhr.status;// пример вывода: 404: Not Found
    }else{
        return xhr.responseText;
    }
}

var loadPage = function(countPage, countBlocks, totalPage, class_content){
    if(countBlocks.length < totalPage){
           //alert(countBlocks.length);
           var block = document.createElement('div');
           block.className = 'block next';
           block.id = countPage;
           class_content.appendChild(block);
       }
       setTimeout(function(){
       t = document.getElementById(countPage);
       t.innerHTML = getPage(countPage);
       t.className = "block now";
       },40);
}

    //ajax загруска контента
    // 1. Создаём новый объект XMLHttpRequest
    
    // 2. Конфигурируем его: GET-запрос на URL 'phones.json'
    
    // 3. Отсылаем запрос
    

    // 4. Если код ответа сервера не 200, то это ошибка



window.onload = function(){
   var end = 0;
   var countPage;
   var totalPage = scan_dir();
   var bNow     = document.querySelector('.now');
   var btn_next = document.querySelector('.btn_next');
   var btn_back = document.querySelector('.btn_back');
   var btn_down = document.querySelector('.btn_down');
   if(bNow.id == 1){
       btn_back.disabled = true; 
   }else{
       btn_back.disabled = false; 
       alert('bad');
   }
   //Считаем количество кликов по кнопке вниз для отоброжения 
        //всех секция и сбрасываем при переходи на новый слайд 
        var countClick = 0;
   
  
   
   bNow.innerHTML = getPage(1);
   btn_next.disabled = false;
   scan_section();
   var next = function(e){
       if(end == 1){
           return false;
       }
       var countBlocks = document.querySelectorAll('.block');
       var class_bnow = document.querySelector('.now');
       var id_now     = class_bnow.id;
       var countPage = +id_now + 1;
       var class_content = document.querySelector('.content>.view');
       
       if(id_now >= totalPage){
           return false;
       }else{
           countClick = 0;
       end = 1;
       btn_next.disabled = true;
       btn_back.disabled = true;
       btn_down.disabled = true;
       setTimeout(loadPage, 100, countPage, countBlocks, totalPage, class_content);
       //////////////////////////////
       class_bnow.className  = "block back";
       setTimeout(function(){
           end = 0; 
           if((+id_now+1) >= totalPage){
                btn_next.disabled = true;
           }else{ 
                btn_next.disabled = false;
           } 
           //btn_next.disabled = false; 
           btn_back.disabled = false; 
           scan_section();
       }, 1000);
           
       }
   }
   
   var back = function(e){
       
            if(end == 1){
                return false;
            }
            var class_bnow = document.querySelector('.now');
            var id_now     = class_bnow.id;
            var countPage = +id_now - 1;
            
            
            
            if(id_now == 1){
                
                
             return false;
            }else{
            countClick = 0;
            end = 1;
            btn_next.disabled = true;
            btn_back.disabled = true;
            btn_down.disabled = true;
            t = document.getElementById(countPage);
            class_bnow.className  = "block next";
            t.className = "block now";
            setTimeout(function(){end = 0;
                if((id_now-1) == 1){
                    btn_back.disabled = true;
                }else{ 
                    btn_back.disabled = false;
                } 
            btn_next.disabled = false; 
            scan_section();
            }, 1000);
            }
    }
    
    var down = function(e){
        var classNow     = document.querySelector('.now');
        var section = classNow.querySelectorAll('section');
        if(section.length > countClick){
            section[countClick].style.opacity = 1;
            countClick = countClick+1;
            if(section.length == countClick){
                btn_down.disabled = true;
            }
        }
    }
    
    
    
    btn_next.onclick = next;
    btn_back.onclick = back;
    btn_down.onclick = down;
    //Управления клавишами
    window.onkeydown = function(e){
       e.preventDefault(); 
        if(!e){
           e = window.event;
        }
        var keycode;
        if(e.which){
           keycode = e.which;
        }else{
           keycode = e.keyCode;
        }
        if(keycode == 39){
            next();
        }
        else if(keycode == 37){
            back();
        }
        else if(keycode == 40){
            down();
        }
        else if(keycode == 116){
            location.reload(); 
        }
    }
}