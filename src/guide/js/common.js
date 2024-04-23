
  var UI = {
    syntaxHighlighter: {
      init: function(){
        SyntaxHighlighter.all();
        SyntaxHighlighter.defaults['quick-code'] = false;      
        
        // SyntaxHighlighter clipboard copy
        $(".btn-clipboard-copy").click(function () {
      
          var textLine = $(this).closest(".code-area").find(".syntaxhighlighter .code .line");
      
          //라인별 &nbsp; 를 공백으로 변환
          textLine.each(function(i){
            var thisHtmlReplace = $(this).html().replace(/&nbsp;/g, " ");
            $(this).html(thisHtmlReplace);
          });
      
          //각 라인에 줄바꿈추가
          var textToCopy = textLine.append('\r\n').text();	
      
          //textarea 에 코드 복사
          var tempInput = $("<textarea id='tempBlank'>");
          $("body").append(tempInput);
          tempInput.val(textToCopy).select();
          document.execCommand("copy");
          tempInput.remove();
      
          //버튼에 copied 툴팁 노출
          var $thisBtn = $(this);
          $thisBtn.addClass('on');
          setTimeout(function(){
            $thisBtn.removeClass('on')
          }, 700);
      
          //줄바꿈 코드원복
          var htmlCode = $(this).closest(".code-area").find(".syntaxhighlighter .code").html();
          var replaceHtmlCode = htmlCode.replace(/\r\n/g, "");
          $(this).closest(".code-area").find(".syntaxhighlighter .code").html(replaceHtmlCode);
        });
      }
    },
    activeNavi: {
      init: function(){
        //스크롤에 따른 navi 활성화	
        $('a[href^="#n_info"]').addClass('on');

        //smoothscroll
        $('.menuitem').on('click', function (e) {
          e.preventDefault();
          $(document).off("scroll");
          var athis = this;
          var target = this.hash,
          $target = $(target);

          $('.menuitem').removeClass('on');
          $(this).addClass('on');

          $('html, body').stop().animate({
            'scrollTop': $target.offset().top
          }, 400, 'swing', function () {
            window.location.hash = target;
          });

          setTimeout(function(){
            scrollContent();
          }, 400);

        });

        scrollContent();

        function scrollContent(){
          $(document).scroll(function(event){
            var scrollPos = $(document).scrollTop();
            if (scrollPos === 0){
              $('a[href^="#n_info"]').addClass('on');
              return;
            };
            $('.menuitem').each(function () {
              var currLink = $(this);
              var refElement = $(currLink.attr("href"));
              if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
                $('.menuitem').removeClass("on");
                currLink.addClass("on");
              } else {
                currLink.removeClass("on");
              }
            });
          })
        }
      }
    },
    clipboard: {
      init: function(){
        $('.btn-copy').on('click', function(){  
          var textToCopy = $(this).siblings('.txt-variables').text(); 
          
          var $tempInput = $('<textarea>');
          $('body').append($tempInput);
          $tempInput.val(textToCopy).select();
          document.execCommand('copy');
          $tempInput.remove();
          
          // 원래의 툴팁 문구를 저장합니다.
          var originalTooltip = $(this).attr('data-original-title');
          
          // 툴팁 문구를 변경합니다.
          $(this).tooltip('hide').attr('data-original-tooltip', originalTooltip).attr('data-original-title', 'copied!').tooltip('show');
          
          // 복사가 완료된 후 일정 시간(예: 2초) 뒤에 원래의 툴팁 문구로 복구합니다.
          setTimeout(function() {
            $(this).tooltip('hide').attr('data-original-title', originalTooltip).tooltip();
          }.bind(this), 1000);
          
          // 복사가 완료되었다는 알림창을 띄우는 것은 주석 처리했습니다.
          // alert('텍스트가 복사되었습니다: ' + textToCopy);
        });
      }
    },
    themeChange: {
      init: function(){
        function setTheme(themeName) {
          var root = document.documentElement;
        
          // 선택된 테마에 대한 데이터 속성 설정
          root.setAttribute('data-theme', themeName);
        }
        
        // 라디오 버튼에 대한 이벤트 처리
        var themeRadios = document.querySelectorAll('input[name="theme"]');
        if (themeRadios.length > 0) {
          var radiosArray = Array.prototype.slice.call(themeRadios);
          radiosArray.forEach(function(radio) {
            radio.addEventListener('change', function() {
              if (this.checked) {
                var selectedTheme = this.value;
                setTheme(selectedTheme);
              }
            });
          });
        }
      }
    },
  };
  
  $(function () {
    UI.syntaxHighlighter.init();
    UI.activeNavi.init();
    UI.clipboard.init();
    UI.themeChange.init();
  });

  //퍼블리싱본만 필요
  function includeHTML(){
    let z, elmnt, file, xhttp;

    z = document.getElementsByTagName("*");
    
    for (let i = 0; i < z.length; i++) {
        elmnt = z[i];
        file = elmnt.getAttribute("data-include");
        
        if (file) {
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if (this.status == 200) {elmnt.innerHTML = this.responseText;}
                    if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
                    /* Remove the attribute, and call this function once more: */
                    elmnt.removeAttribute("data-include");
                    includeHTML();
                }//if
            }//onreadystatechange

            xhttp.open("GET", file, true);
            xhttp.send();
            return;
        }//if - file
    }//for
  }//includeHTML

  /* ✨ 실행 */
  window.addEventListener('DOMContentLoaded', function() {
    includeHTML();
  });
