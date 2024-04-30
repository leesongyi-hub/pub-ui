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
            includeHTML();
          }
        }
        xhttp.open("GET", file, true);
        xhttp.send();
        return;
      }
    }
  }
}

UI.bsDropDown = {
  init: function(){
    $('.dropdown-toggle').dropdown();
  }
}

UI.bsTooltip = {
  init: function(){
    $(document).on('show.bs.modal', '.modal', function() {
      const zIndex = 1040 + 10 * $('.modal:visible').length;
      $(this).css('z-index', zIndex);
      setTimeout(function() { $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack')});
    });
  }
}

UI.themeChange = {
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
}

UI.expendedNavi= {
  init: function(){
    this.appendArrowToMenu();
    this.activateSubMenu();
    this.toggleSubMenu();
    this.toggleLnb();
  },
  appendArrowToMenu: function() {
    $('.navi > li').has('.sub-menu').children('a').append('<svg class="ico ico-arr col-lightgray" role="presentation" aria-hidden="true" focusable="false"><use xlink:href="#ico-arr_bot"></use></svg>');
  },    
  activateSubMenu: function() {
    $('.navi').find('a.on').parents('.sub-menu').prev('.navi-btn').addClass('active');
  },    
  toggleSubMenu: function() {
    var self = this;
    $('.navi-btn').click(function() {
      var $subWrap = $(this).next('.sub-menu');
      if ($subWrap.length) {
        self.toggleDisplay($subWrap);
      } else {
        self.resetMenuState($(this));
      }
    });
    $('.sub-menu a').on('click', function(){
      self.resetMenuState();
      $('.sub-menu a.on').not(this).removeClass('on');
      $(this).addClass('on');
      $(this).parents('.sub-menu').prev('.navi-btn').addClass('active');
    });
  },    
  toggleDisplay: function($subWrap) {
    if ($subWrap.css('display') === 'block') {
      $subWrap.slideUp('fast');
    } else {
      $('.sub-menu').slideUp('fast');
      $subWrap.slideDown('fast');
    }
  },    
  resetMenuState: function($currentBtn = $()) {
    $('.navi .active').removeClass('active');
    $('.sub-menu a').removeClass('on');
    $currentBtn.addClass('active');
  },    
  toggleLnb: function() {
    $('.lnbToggle-btn').click(function() {
      $('#wrap').toggleClass('fold');
    });
  }
}

UI.myMenu = {
  init: function(){
    var dropdownVisible = false;       
    
    $('.my-btn').on('click', function(){
      //false
      if (!dropdownVisible) {
        $('.my-dropdown .sub-menu').hide();
        $('.my-dropdown .my-info').show();
        $('.my-dropdown .my-list').show();
        $('.my-dropdown').show();
        dropdownVisible = true;

      } else {  
        //true
        $('.my-dropdown').hide();
        dropdownVisible = false;
      }
    });

    $('.theme-btn').on('click', function(){
      $('.my-dropdown .sub-menu').fadeIn();
      $('.my-dropdown .my-info').hide();
      $('.my-dropdown .my-list').hide();
    });

    $('.back-btn').on('click', function(){
      $('.my-dropdown .sub-menu').hide();
      $('.my-dropdown .my-info').fadeIn();
      $('.my-dropdown .my-list').fadeIn();
    });    
    
    // 사이드바 외부를 클릭하면 사이드바 닫힘
    var target = $(".my-dropdown, .my-btn");

    $(document).mouseup(function (e){
      if(target.has(e.target).length === 0) {
        $(".my-dropdown").hide();
        dropdownVisible = false;
      }
    });
  }
}

UI.fileInputValueText = {
  init: function(){
    $("#file").on('change',function(){
      var fileName = $("#file").val();
      $(".upload-name").val(fileName);
    });
  }
}


  
$(function () {
  UI.includeSVG.init();
  UI.bsTooltip.init();
  UI.bsDropDown.init();
  UI.themeChange.init();
  UI.expendedNavi.init();
  UI.myMenu.init();
  UI.fileInputValueText.init();
});

