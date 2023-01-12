$(document).ready(function(){

  $(".mCustomScrollbar-y").mCustomScrollbar({
		scrollbarPosition: "outside"
	});

  $.datepicker.setDefaults({
      dateFormat: 'yy년 mm월 dd일',
      prevText: '이전 달',
      nextText: '다음 달',
      monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
      monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
      dayNames: ['일', '월', '화', '수', '목', '금', '토'],
      dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
      dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
      showMonthAfterYear: true,
      yearSuffix: '년'
  });

	$(".datepicker").datepicker({
		showOtherMonths: true,
    selectOtherMonths: true,
		showOn: "both",
		buttonText: "날짜 선택"
	});

    var dateFormat = "yy년 mm월 dd일",
      from = $( ".from" )
        .datepicker({
          defaultDate: "+1w",
          changeMonth: true,
          numberOfMonths: 3
        })
        .on( "change", function() {
          to.datepicker( "option", "minDate", getDate( this ) );
        }),
      to = $( ".to" ).datepicker({
        defaultDate: "+1w",
        changeMonth: true,
        numberOfMonths: 3
      })
      .on( "change", function() {
        from.datepicker( "option", "maxDate", getDate( this ) );
      });
 
    function getDate( element ) {
      var date;
      try {
        date = $.datepicker.parseDate( dateFormat, element.value );
      } catch( error ) {
        date = null;
      }
 
      return date;
    }

	$(".datepicker:disabled").datepicker('option', 'disabled', true);

  /* map tool btn */
  $(".map-tool-btn").on("click", function(){
    $(this).not(".initial").toggleClass("active").siblings().removeClass("active");
    if($(this).hasClass("initial")){
      $(this).parent().find(".map-tool-btn").removeClass("active");
      $(".popup-panel").removeClass("opened");
    }
  });

  /* bar menu */
  $(".bar-btn").on("click", function(){
    $(this).parent().addClass("active").siblings().removeClass("active");
    $("." + $(this).attr("data-menu")).addClass("active").siblings().removeClass("active");
    $(this).closest(".map-menu").find(".menu-cont").addClass("opened").removeClass("closed");
    $(this).closest(".map-menu").find(".menu-cont-btn").addClass("on").attr("title", "접기");
    if(!$(this).closest("#container").is(".mapdiv2, .mapdiv4")){
      $(".map-header").css("left", "320px");
    }
  });

  $(".map-menu .menu-cont-btn").on("click", function(){
    if($(this).hasClass("on")){
      $(this).closest(".map-menu").find(".menu-cont").addClass("closed").removeClass("opened");
      $(this).removeClass("on").attr("title", "열기");
      if(!$(this).closest("#container").is(".mapdiv2, .mapdiv4")){
        $(".map-header").css("left", "70px");
      }
    } else {
      $(this).closest(".map-menu").find(".menu-cont").addClass("opened").removeClass("closed");
      $(this).addClass("on").attr("title", "접기");
      if(!$(this).closest("#container").is(".mapdiv2, .mapdiv4")){
        $(".map-header").css("left", "320px");
      }
    }
  });

  //탭메뉴
  $('.tab-group > li').on('click', function(e){
    e.preventDefault();
    $(this).parent().children('li').removeClass('active');

    var ind = $(this).index();
    $(this).addClass('active');

    $(".tab-content[data-tab='" + $(this).parent().attr('data-tab') + "']").children('div').hide().removeClass('active');

    $(".tab-content[data-tab='" + $(this).parent().attr('data-tab') + "']").each(function () {
      $(this).children('div').eq(ind).addClass('active').show();

      //tab 3depth 있을 시
      if ($(this).children('div').eq(ind).children().hasClass("tab-group")) {
        $(this).parent().children(".tab-group").addClass("in-depth3");
      } else {
        $(this).parent().children(".tab-group").removeClass("in-depth3");
      }

    });

  });

  $('.tab-group li.active').click();

  /* layer fold */
  $(".layer-list-fold").on("click", function(){
    if($(this).hasClass("on")){
      $(this).removeClass("on").attr("title", "열기");
      $(this).closest(".layer-dep1-tit").next(".layer-dep2-list").hide();
    } else {
      $(this).addClass("on").attr("title", "접기");
      $(this).closest(".layer-dep1-tit").next(".layer-dep2-list").show();
    }
  });

  /* popup */
  $("*[data-popup]").on("click", function(){
    $("." + $(this).attr("data-popup")).addClass("opened");
    if($(this).is(".map-tool-btn") && !$(this).hasClass("active")){
      $(this).removeClass("active");
      $("." + $(this).attr("data-popup")).removeClass("opened");
    }
  });

  $(".popup-panel .popup-close").on("click", function(){
    $(this).closest(".popup-panel").removeClass("opened");
    if($(".map-tool-btn").hasClass("active")){
      $(".map-tool-btn").removeClass("active");
    }
  });

  /* division */
	$(".tool-btn *[name='divBtn']").on("click", function(){
    $(".bar-btn").parent().removeClass("active");
    $(".menu-cont").removeClass("opened closed");
    $(".menu-cont-btn").removeClass("on").attr("title", "열기");

		if($(this).is("#div2Btn")){
      $(this).addClass("")
			$("#container").attr("class", "mapdiv2");
			$(".map-wrap.div2").show();
			$(".map-wrap.div4").hide();
		} else if ($(this).is("#div4Btn")){
			$("#container").attr("class", "mapdiv4");
			$(".map-wrap.div2, .map-wrap.div4").show();
		} else if ($(this).is("#divResetBtn")){
			$("#container").removeAttr("class");
			$(".map-wrap.div2, .map-wrap.div4").hide();
      $(".map-header").removeAttr("style");
		}

	});

});