/**
 * Created by likuan on 2016/3/30*/
$(initPage);
$(window).scroll(function(){
    menu_hei();
});
function initPage(){
    //菜单的高度设置
    menu_hei();
    //让外框高度等于满屏
    $('body,.ysy-waik,.ysy-hou-waik').css('min-height',$(window).height());
    $(window).resize(function () {
        //window窗口改变是，菜单的高度设置
        menu_hei();
        //当屏幕宽度大与1024，菜单显示
        if($(window).width()>768){
            $('.ysy-hou-waik  .ysy-menu-c').show().css('left',0);
        } else{
            $('.ysy-hou-waik  .ysy-menu-c').hide().css('left','-270px');
        }
    });
    //平板端菜单操作
    $('.caid-tub').click(function () {
        if (!$(this).hasClass('on-t')) {
            $(this).addClass('on-t');
            $('.ysy-menu-c').show().animate({
                left: 0
            });
            $(this).find(':eq(1)').show();
            $(this).find(':eq(0)').hide();
        } else {
            $(this).removeClass('on-t');
            $('.ysy-menu-c').animate({
                left: -270
            }, 200, function () {
                $(this).hide()
            });
            $(this).find(':eq(1)').hide();
            $(this).find(':eq(0)').show();
        }
    });
    //一级菜单提示
    $('.f-ico').each(function () {
        var this_tag = $(this);
        var text_t = $(this).find('.muk-tit').text();
        $(this).find('i').hover(function () {
            if ($('.m-text-c').attr('data-y') == 0) {
                $('.m-text-c').attr('data-y', '1').css('top', (this_tag.index() + 1) * 50).text(text_t).css('opacity', '1');
            }
            $('.m-text-c').stop().show().stop().animate({
                'top': (this_tag.index()) * 50
            }, 200).text(text_t);
        }, function () {
            $('.m-text-c').stop().fadeOut();
        });
    });
    //一级菜单事件
    $('.ysy-menu-c li').click(function () {
        $('li.menu-on').removeClass('menu-on');
        $(this).addClass('menu-on');
    });
    //显示三级菜单
    $('.erji-caid-n dl dt').click(function () {
        if ($(this).parent().find('dd').size()) {
            if (!$(this).parent().hasClass('three-open')) {
                $(this).parent().siblings().animate({
                    height: 60
                }, 100);
                $('.three-open').removeClass('three-open');
                $(this).parent().addClass('three-open');
                $(this).parent().animate({
                    height: (($(this).parent().find('dd').size() + 1) * 60 + 1) + 'px'
                }, 100);
                menu_hei();
            } else {
                $('.three-open').removeClass('three-open');
                $(this).parent().animate({
                    height: 60
                }, 100)
            }
        }
    });
    //三级菜单很多时，处理
    $('.has-three').click(function () {
        menu_hei();
        $('.ysy-menu-c,.menu-er-c').height($(window).height()+$(this).children().size()*60);
    });
    //小于1024信息库页面处理
    if($(window).width()<= 1024){
        $('.cheng-zhan .tio-n').click(function(){
            $(this).parent().parent().siblings().find('.wen-cha-inp').animate({
                height:0,
                'padding-top':'0',
                'padding-bottom':'0'
            },300,function(){
                $(this).hide()
            });
            $(this).parent().find('.wen-cha-inp').show().animate({
                height:330,
                'padding-top':'20px',
                'padding-bottom':'20px'
            },300);
        });
    }
}
function menu_hei(){
    setTimeout(function(){
        if($('body').height()>$('#root').height()){
            $('.ysy-menu-c').height($('body').height());
            $('.menu-er-c').height($('body').height());
        } else{
            $('.ysy-menu-c').height($('#root').height()+38+50);
            $('.menu-er-c').height($('#root').height()+38+50);
        }
    },3)
}
function show_page(inx,iny){
    $('.ysy-menu-c ul li').removeClass('menu-on');
    $('.erji-caid-n dl').find('dt').removeClass('menu-on2');
    $(".ysy-menu-c ul li:eq('+inx+')").addClass('menu-on').find("dl:eq('+iny+')").addClass('menu-on2');
}