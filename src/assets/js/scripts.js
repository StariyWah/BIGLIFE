"use strict";function _typeof(e){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},_typeof(e)}function _toConsumableArray(e){return _arrayWithoutHoles(e)||_iterableToArray(e)||_unsupportedIterableToArray(e)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(e,t){if(e){if("string"==typeof e)return _arrayLikeToArray(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?_arrayLikeToArray(e,t):void 0}}function _iterableToArray(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}function _arrayWithoutHoles(e){if(Array.isArray(e))return _arrayLikeToArray(e)}function _arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,i=new Array(t);r<t;r++)i[r]=e[r];return i}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var r=0;r<t.length;r++){var i=t[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,_toPropertyKey(i.key),i)}}function _createClass(e,t,r){return t&&_defineProperties(e.prototype,t),r&&_defineProperties(e,r),Object.defineProperty(e,"prototype",{writable:!1}),e}function _toPropertyKey(e){var t=_toPrimitive(e,"string");return"symbol"===_typeof(t)?t:String(t)}function _toPrimitive(e,t){if("object"!==_typeof(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var i=r.call(e,t||"default");if("object"!==_typeof(i))return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}new(function(){function e(){_classCallCheck(this,e),this.$wrapper,this.$triggers,this.$body,this.init()}return _createClass(e,[{key:"init",value:function(){var e=this;document.querySelectorAll("[data-tabs]").forEach((function(t){e.$wrapper=t,e.$triggers=t.querySelectorAll("[data-triggers] [data-link]"),e.$body=_toConsumableArray(t.querySelector("[data-body]").children),e.$triggers[0].classList.add("active"),e.$body[0].classList.add("active"),e.update(),e.addListenerClick(),e.addListenerHash()}))}},{key:"update",value:function(e){var t=this.$wrapper.querySelector('a[href="'.concat(window.location.hash,'"]')),r=this.$wrapper.querySelector('[data-id="'.concat(window.location.hash,'"]'));window.location.hash&&t&&r&&(this.$triggers.forEach((function(e){e.classList.remove("active")})),this.$body.forEach((function(e){e.classList.remove("active")})),t.classList.add("active"),r.classList.add("active")),sessionStorage.setItem("last-url",null==e?void 0:e.oldURL)}},{key:"addListenerClick",value:function(){var e=this;this.$triggers.forEach((function(t){t.addEventListener("click",e.changeTab.bind(e))}))}},{key:"addListenerHash",value:function(){window.addEventListener("hashchange",this.update.bind(this))}},{key:"changeTab",value:function(e){e.preventDefault();var t=e.target.closest('a[href^="#"]'),r=this.$wrapper.querySelector('[data-id="'.concat(t.hash,'"]'));this.$triggers.forEach((function(e){e.classList.remove("active")})),this.$body.forEach((function(e){e.classList.remove("active")})),t.classList.add("active"),r.classList.add("active"),history.replaceState(void 0,void 0,t.hash)}}]),e}()),$(document).ready((function(){function e(){$("body").toggleClass("_header-lock"),$(".burger-menu__button").toggleClass("_active"),$("header").toggleClass("_active"),$(".burger-menu").toggleClass("_active")}$(document).on("click","[data-anchor]",(function(e){e.preventDefault();var t=$(this).attr("href");void 0!==t&&$(t).length>0&&$("html, body").stop().animate({scrollTop:$(t).offset().top-30},{duration:1e3,specialEasing:{width:"linear",height:"easeInOutCubic"}})})),AOS.init({once:!0,duration:1e3,delay:50,easing:"ease-in-out"}),useDynamicAdapt(),$(".burger-menu__button").click((function(t){e()})),$(".burger-menu").click((function(t){t.target.closest(".header-nav__container")||e()}));var t=document.querySelectorAll(".wrapper select");t.length>0&&t.forEach((function(e){new Choices(e,{searchEnabled:!1,allowHTML:!0,shouldSort:!1})}));var r=document.querySelectorAll('input[type="tel"]');r.length>0&&r.forEach((function(e){IMask(e,{mask:"+{7} (000) 000-00-00"})}));var i=document.querySelectorAll(".load-more__button");$(".load-more__button").click((function(e){var t=this;e.preventDefault();var r=$(this).attr("data-open-text"),n=$(this).attr("data-close-text");i.forEach((function(e){var i=$(e).parent();e==t?($(i).toggleClass("_active"),$(i).children(".load-more__hidden-part").slideToggle(300),$(i).hasClass("_active")?$(t).children("span").text(n):$(t).children("span").text(r)):$(i).hasClass("_active")&&($(e).children("span").text(r),$(i).removeClass("_active"),$(i).children(".load-more__hidden-part").slideToggle(300))}))}));var n=document.querySelectorAll(".accordion__button");if($(".accordion__button").click((function(e){var t=this;e.preventDefault(),n.forEach((function(e){var r=$(e).parent();e==t?($(r).toggleClass("_active"),$(r).children(".accordion__container").slideToggle(300)):$(r).hasClass("_active")&&($(r).removeClass("_active"),$(r).children(".accordion__container").slideToggle(300))}))})),document.querySelectorAll(".input__container_radio").forEach((function(e){1==$(e).find("input").prop("checked")&&$(e).addClass("_checked")})),$(document).on("click",".input__container_radio",(function(e){return $(this).parents(".form__part_radio").find(".input__container_radio").removeClass("_checked"),$(this).parents(".form__part_radio").find(".input__container_radio input").prop("checked",!1),$(this).toggleClass("_checked"),$(this).find("input").prop("checked",!0),!1})),$(document).on("click",".form__part_subscribe .input__container_radio",(function(e){var t=$(this).attr("data-radio-id");if(null!=t&&""!==t){var r=$(this).parents(".form__part_subscribe");if(r.length>0){var i=document.querySelectorAll('input[name="subscription-input"]'),n=$(r).find('input[data-id="'.concat(t,'"]'));n.length>0&&i.length>0&&i.forEach((function(e){e==n[0]?$(e).show():$(e).hide()}))}}})),document.querySelectorAll(".swiper-persons").length>0)new Swiper(".swiper-persons .swiper",{direction:"horizontal",spaceBetween:16,slidesPerView:1,navigation:{prevEl:".swiper-persons .swiper-button-prev",nextEl:".swiper-persons .swiper-button-next"},breakpoints:{0:{slidesPerView:1,spaceBetween:16},1380:{slidesPerView:1.38,spaceBetween:16}}});if(document.querySelectorAll(".swiper-invest-directions").length>0)new Swiper(".swiper-invest-directions .swiper",{direction:"horizontal",spaceBetween:16,slidesPerView:2,navigation:{prevEl:".swiper-invest-directions .swiper-button-prev",nextEl:".swiper-invest-directions .swiper-button-next"},breakpoints:{0:{slidesPerView:1,spaceBetween:20},701:{slidesPerView:1,spaceBetween:20},1100:{slidesPerView:2,spaceBetween:16}}});if(document.querySelectorAll(".swiper-tariffs").length>0)new Swiper(".swiper-tariffs .swiper",{direction:"horizontal",spaceBetween:16,slidesPerView:3,navigation:{prevEl:".swiper-tariffs .swiper-button-prev",nextEl:".swiper-tariffs .swiper-button-next"},breakpoints:{0:{slidesPerView:1.3,spaceBetween:10},701:{slidesPerView:2,spaceBetween:20},1380:{slidesPerView:3,spaceBetween:16}}});if(document.querySelectorAll(".swiper-tariffs-large").length>0)new Swiper(".swiper-tariffs-large .swiper",{direction:"horizontal",spaceBetween:16,slidesPerView:4,navigation:{prevEl:".swiper-tariffs-large .swiper-button-prev",nextEl:".swiper-tariffs-large .swiper-button-next"},breakpoints:{0:{slidesPerView:1.3,spaceBetween:10},701:{slidesPerView:2,spaceBetween:20},1380:{slidesPerView:4,spaceBetween:16}}});if(document.querySelectorAll(".swiper-clients-results").length>0)new Swiper(".swiper-clients-results .swiper",{direction:"horizontal",spaceBetween:50,slidesPerView:1,autoHeight:"auto",navigation:{prevEl:".swiper-clients-results .swiper-button-prev",nextEl:".swiper-clients-results .swiper-button-next"}});if(document.querySelectorAll(".swiper-video-feedback").length>0)new Swiper(".swiper-video-feedback .swiper",{direction:"horizontal",spaceBetween:16,slidesPerView:4,navigation:{prevEl:".swiper-video-feedback .swiper-button-prev",nextEl:".swiper-video-feedback .swiper-button-next"},breakpoints:{0:{slidesPerView:2,spaceBetween:12},701:{slidesPerView:2,spaceBetween:20},1380:{slidesPerView:4,spaceBetween:16}}});if(document.querySelectorAll(".swiper-partners").length>0)new Swiper(".swiper-partners .swiper",{direction:"horizontal",spaceBetween:16,slidesPerView:2.1,navigation:{prevEl:".swiper-partners .swiper-button-prev",nextEl:".swiper-partners .swiper-button-next"},breakpoints:{0:{slidesPerView:2,spaceBetween:10},701:{slidesPerView:2,spaceBetween:20},1380:{slidesPerView:2.1,spaceBetween:16}}});var o=document.querySelectorAll(".information-button");o.length>0&&o.forEach((function(e){tippy(e,{content:e.querySelector(".information-button__content").innerHTML,allowHTML:!0,arrow:!1,placement:"left",offset:[0,-32],zIndex:10,trigger:"click",theme:$(e).attr("data-theme"),maxWidth:360,interactive:!0})}));var a=document.getElementById("header-tooltip");function s(e,t){e.length>0&&($(document).on("click",t,(function(t){var r=this;window.innerWidth<1380&&e.forEach((function(e){e===r?$(e).toggleClass("_active"):$(e).removeClass("_active")}))})),$(t).hover((function(t){var r=this;window.innerWidth>=1380&&e.forEach((function(e){e===r?$(e).toggleClass("_active"):$(e).removeClass("_active")}))})))}null!=a&&tippy(a,{content:a.querySelector(".header__tooltip__content").innerHTML,allowHTML:!0,arrow:!1,placement:"bottom-start",offset:[0,0],zIndex:9999,trigger:"click",theme:$(a).attr("data-theme"),maxWidth:327,interactive:!0}),Fancybox.bind("[data-fancybox]",{mainClass:"fancybox__popup"}),Fancybox.bind("[data-fancybox-video]",{mainClass:"fancybox__video"}),s(document.querySelectorAll(".directions__item"),".directions__item"),s(document.querySelectorAll(".how-works__items__item"),".how-works__items__item.item_animated"),s(document.querySelectorAll(".for-whom__items__item"),".for-whom__items__item.item_animated"),s(document.querySelectorAll(".will-learn__items__item"),".will-learn__items__item"),s(document.querySelectorAll(".games-information__items__item"),".games-information__items__item")}));