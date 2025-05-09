$(document).ready(function () {
    'use strict';
  
    var c;
    var currentScrollTop = 0;
    var navbar = $('nav');
  
    // Efeito scroll para esconder navbar
    $(window).scroll(function () {
      var a = $(window).scrollTop();
      var b = navbar.height();
  
      currentScrollTop = a;
  
      if (c < currentScrollTop && a > b + b) {
        navbar.addClass("scrollUp");
      } else if (c > currentScrollTop && !(a <= b)) {
        navbar.removeClass("scrollUp");
      }
      c = currentScrollTop;
    });
  
    // Alternar visibilidade do menu responsivo
    $("nav button.hamburger").click(function () {
      $("ul.navbar-menu").toggleClass("active");
    });
  });
  