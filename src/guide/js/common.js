
var UI = UI || {};

UI.includeSVG = {
  init: function(){
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
            elmnt.removeAttribute("data-include");
          }
        }
        xhttp.open("GET", file, true);
        xhttp.send();
        return;
      }
    }
  }
}

UI.syntaxHighlighter = {
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
      // var $thisBtn = $(this);
      // $thisBtn.addClass('on');
      // setTimeout(function(){
      //   $thisBtn.removeClass('on')
      // }, 700);


      // 원래의 툴팁 문구를 저장합니다.
      var originalTooltip = $(this).attr('data-original-title');
      
      // 툴팁 문구를 변경합니다.
      $(this).tooltip('hide').attr('data-original-tooltip', originalTooltip).attr('data-original-title', '✔복사완료').tooltip('show');
      
      // 복사가 완료된 후 일정 시간(예: 2초) 뒤에 원래의 툴팁 문구로 복구합니다.
      setTimeout(function() {
        $(this).tooltip('hide').attr('data-original-title', originalTooltip).tooltip();
      }.bind(this), 1000);




  
      //줄바꿈 코드원복
      var htmlCode = $(this).closest(".code-area").find(".syntaxhighlighter .code").html();
      var replaceHtmlCode = htmlCode.replace(/\r\n/g, "");
      $(this).closest(".code-area").find(".syntaxhighlighter .code").html(replaceHtmlCode);
    });
  }
}

UI.activeNavi = {
  init: function(){
    //smoothscroll
    $('.menuitem').on('click', function (e) {
      e.preventDefault();
      $('.menuitem').removeClass('on');
      $(this).addClass('on');
      $('html, body').animate({
        scrollTop: 0
      }, 400);
    });
  }
}

UI.clipboard = {
  init: function(){
    $('.btn-copy').on('click', function(){  
      var textToCopy = $(this).siblings('.copyTxt').text(); 
      
      var $tempInput = $('<textarea>');
      $('body').append($tempInput);
      $tempInput.val(textToCopy).select();
      document.execCommand('copy');
      $tempInput.remove();
      
      // 원래의 툴팁 문구를 저장합니다.
      var originalTooltip = $(this).attr('data-original-title');
      
      // 툴팁 문구를 변경합니다.
      $(this).tooltip('hide').attr('data-original-tooltip', originalTooltip).attr('data-original-title', '✔복사완료').tooltip('show');
      
      // 복사가 완료된 후 일정 시간(예: 2초) 뒤에 원래의 툴팁 문구로 복구합니다.
      setTimeout(function() {
        $(this).tooltip('hide').attr('data-original-title', originalTooltip).tooltip();
      }.bind(this), 1000);
    });
  }
}
UI.themeLayerShow = {
  init: function(){
    $('.button-theme-area button').on('click', function(){
      $('.theme-area').show();
    });

    $(document).on('click', function(event) {
      var $target = $(event.target);
      if (!$target.closest('.theme-area').length && !$target.closest('.button-theme-area button').length) {
        $('.theme-area').hide();
      }
    });
  }
}
UI.themeChange = (function() {
  function setTheme(themeName) {
    var root = document.documentElement;
    root.setAttribute('data-theme', themeName);
    localStorage.setItem('theme', themeName); // Save the selected theme to local storage
  }

  function init() {
    // Load the initial theme from local storage
    var savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      // Check the appropriate radio button
      var themeRadio = document.querySelector('input[name="theme"][value="' + savedTheme + '"]');
      if (themeRadio) {
        themeRadio.checked = true;
      }
    }

    // Add event listeners to radio buttons
    var themeRadios = document.querySelectorAll('input[name="theme"]');
    if (themeRadios.length > 0) {
      themeRadios.forEach(function(radio) {
        radio.addEventListener('change', function() {
          if (this.checked) {
            var selectedTheme = this.value;
            setTheme(selectedTheme);
          }
        });
      });
    }
  }

  return {
    init: init
  };
})();


UI.showSection = {
  init: function(){

    $('navi li:first a').addClass('on');
    //$('.content .gd-content-wrap:first').show();
    $('#n_buttons').show();

    $('nav a').on('click', function(e){
      var targetId = $(this).attr('href'); // 클릭된 링크의 href 값을 가져옴
      $('.gd-content-wrap').hide();
      
      $(targetId).show(); // 해당 href 값을 가진 요소를 보여줌
    });
  }
}

UI.bsTooltip = {
  init: function(){
    $("[data-tooltip=tooltip]").tooltip({
      trigger: 'hover',
      template: '<div class="tooltip tooltip-label" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>'
    });
  }
}

UI.scrollToAnchorWithOffset = {
  init: function(){
    var headerOffset = 60; // Offset for fixed header
    var links = document.querySelectorAll('.index-nav a[href^="#"]');

    links.forEach(function(link) {
      link.addEventListener('click', function(event) {
        event.preventDefault();
        var targetId = link.getAttribute('href');
        var targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          var elementPosition = targetElement.getBoundingClientRect().top;
          var offsetPosition = elementPosition + window.scrollY - headerOffset;
            
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }
}

UI.lnbExpandedToggle = (function() {
  function init() {
    // Load the initial state from local storage
    var isExpand = localStorage.getItem('isExpand') === 'true';
    if (isExpand) {
      $('.wrap').addClass('is-expand');
    } else {
      $('.wrap').removeClass('is-expand');
    }

    $('.btn-navToggle').on('click', function() {
      $('.wrap').toggleClass('is-expand');
      // Save the current state to local storage
      var currentState = $('.wrap').hasClass('is-expand');
      localStorage.setItem('isExpand', currentState);
    });
  }

  return {
    init: init
  };
})();


$(function () {
  UI.scrollToAnchorWithOffset.init();
  UI.syntaxHighlighter.init();
  UI.activeNavi.init();
  UI.clipboard.init();
  UI.themeChange.init();
  UI.showSection.init();
  UI.includeSVG.init();
  UI.bsTooltip.init();
  UI.lnbExpandedToggle.init();
  UI.themeLayerShow.init();
});
