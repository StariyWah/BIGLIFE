new class Tabs {
    constructor() {
       this.$wrapper;
       this.$triggers;
       this.$body;
       this.init();
    }
    init() {
       document.querySelectorAll('[data-tabs]').forEach((wrapper) => {
          this.$wrapper = wrapper;
          this.$triggers = wrapper.querySelectorAll('[data-triggers] [data-link]');
          this.$body = [...wrapper.querySelector('[data-body]').children];
          this.$triggers[0].classList.add('active');
          this.$body[0].classList.add('active');
          this.update();
          this.addListenerClick();
          this.addListenerHash();
       });
    }
    update(event) {
       const trigger = this.$wrapper.querySelector(`a[href="${window.location.hash}"]`);
       const content = this.$wrapper.querySelector(`[data-id="${window.location.hash}"]`);
       if (window.location.hash && trigger && content) {
          this.$triggers.forEach((trigger) => {
             trigger.classList.remove('active');
          });
          this.$body.forEach((content) => {
             content.classList.remove('active');
          });
          trigger.classList.add('active');
          content.classList.add('active');
       }
       sessionStorage.setItem("last-url", event?.oldURL);
    }
    addListenerClick() {
       this.$triggers.forEach(trigger => {
          trigger.addEventListener('click', this.changeTab.bind(this));
       });
    }
    addListenerHash() {
       window.addEventListener('hashchange', this.update.bind(this));
    }
    changeTab(event) {
       event.preventDefault();
       const trigger = event.target.closest('a[href^="#"]');
       const content = this.$wrapper.querySelector(`[data-id="${trigger.hash}"]`);
       this.$triggers.forEach(trigger => {
          trigger.classList.remove('active');
       });
       this.$body.forEach(content => {
          content.classList.remove('active');
       });
       trigger.classList.add('active');
       content.classList.add('active');
       history.replaceState(undefined, undefined, trigger.hash)
    }
};
$(document).ready(function(){
    $(document).on('click', '[data-anchor]', function(e){
        e.preventDefault();
        let href = $(this).attr('href');
        if (href !== undefined && $(href).length > 0) {
            $('html, body').stop().animate(
                {
                    scrollTop: $(href).offset().top - 30,
                },
                {
                    duration: 1000,
                    specialEasing: {
                        width: 'linear',
                        height: 'easeInOutCubic',
                    },
                }
            );
        }
    });
    AOS.init({
        once: true,
        duration: 1000,
        delay: 50,
        easing: 'ease-in-out',
    });
    useDynamicAdapt();
    function toggleBurger() {
        $('body').toggleClass('_header-lock');
        $('.burger-menu__button').toggleClass('_active');
        $('header').toggleClass('_active');
        $('.burger-menu').toggleClass('_active'); 
    }
    $('.burger-menu__button').click(function(e){
        toggleBurger();
    });
    $('.burger-menu').click(function(e){
        if(!e.target.closest('.header-nav__container')) {
            toggleBurger();
        }
    });
    let selects = document.querySelectorAll('.wrapper select');
    if(selects.length > 0) {
        selects.forEach(select => {
            new Choices(select, {
                searchEnabled: false,
                allowHTML: true,
                shouldSort: false,
            });
        });
    }
    let inputsPhone = document.querySelectorAll('input[type="tel"]');
    if(inputsPhone.length > 0) {
        inputsPhone.forEach(input => {
            IMask(input, {
                mask: '+{7} (000) 000-00-00'
            });
        });
    }
    let loadMoreButtons = document.querySelectorAll('.load-more__button');
    $('.load-more__button').click(function(e){
        e.preventDefault();
        let openText = $(this).attr('data-open-text');
        let closeText = $(this).attr('data-close-text');
        loadMoreButtons.forEach(element => {
            let parent = $(element).parent();
            if(element == this){
                $(parent).toggleClass('_active');
                $(parent).children('.load-more__hidden-part').slideToggle(300);
                if($(parent).hasClass('_active')){
                    $(this).children('span').text(closeText);
                } else {
                    $(this).children('span').text(openText);
                }
            }else{
                if($(parent).hasClass('_active')){
                    $(element).children('span').text(openText);
                    $(parent).removeClass('_active');
                    $(parent).children('.load-more__hidden-part').slideToggle(300);
                }
            }
        });
    });
    let accordionButtons = document.querySelectorAll('.accordion__button');
    $('.accordion__button').click(function(e){
        e.preventDefault();
        accordionButtons.forEach(element => {
            let parent = $(element).parent();
            if(element == this){
                $(parent).toggleClass('_active');
                $(parent).children('.accordion__container').slideToggle(300);
            }else{
                if($(parent).hasClass('_active')){
                    $(parent).removeClass('_active');
                    $(parent).children('.accordion__container').slideToggle(300);
                }
            }
        });
    });
    let radioButtons = document.querySelectorAll('.input__container_radio');
    radioButtons.forEach(button => {
        if($(button).find('input').prop('checked') == true) {
            $(button).addClass('_checked');
        }
    });
    $(document).on('click', '.input__container_radio', function(e) {
        $(this).parents('.form__part_radio').find('.input__container_radio').removeClass('_checked');
        $(this).parents('.form__part_radio').find('.input__container_radio input').prop('checked', false);
        $(this).toggleClass('_checked');
        $(this).find('input').prop('checked', true);
        return false;
    });
    $(document).on('click', '.form__part_subscribe .input__container_radio', function(e) {
        let inputId = $(this).attr('data-radio-id');
        if(inputId !== null && inputId !== undefined && inputId !== '') {
            let parent = $(this).parents('.form__part_subscribe');
            if(parent.length > 0) {
                let inputs = document.querySelectorAll('input[name="subscription-input"]');
                let input = $(parent).find(`input[data-id="${inputId}"]`);            
                if(input.length > 0 && inputs.length > 0) {
                    inputs.forEach(element => {
                        if(element == input[0]) {
                            $(element).show();
                        } else {
                            $(element).hide();
                        }
                    });
                }
            }
        }
    });
    if(document.querySelectorAll('.swiper-persons').length > 0) {
        let personsSlider = new Swiper('.swiper-persons .swiper', {
            direction: 'horizontal',
            spaceBetween: 16,
            slidesPerView: 1,
            navigation: {
                prevEl: '.swiper-persons .swiper-button-prev',
                nextEl: '.swiper-persons .swiper-button-next',
            },
            breakpoints: {
                0: {
                    slidesPerView: 1,
                    spaceBetween: 16,
                },
                1380: {
                    slidesPerView: 1.38,
                    spaceBetween: 16,
                },
            }
        });
    }
    if(document.querySelectorAll('.swiper-invest-directions').length > 0) {
        let investDirectionsSlider = new Swiper('.swiper-invest-directions .swiper', {
            direction: 'horizontal',
            spaceBetween: 16,
            slidesPerView: 2,
            navigation: {
                prevEl: '.swiper-invest-directions .swiper-button-prev',
                nextEl: '.swiper-invest-directions .swiper-button-next',
            },
            breakpoints: {
                0: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                },
                701: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                },
                1100: {
                    slidesPerView: 2,
                    spaceBetween: 16,
                },
            }
        });
    }
    if(document.querySelectorAll('.swiper-tariffs').length > 0) {
        let tariffsSlider = new Swiper('.swiper-tariffs .swiper', {
            direction: 'horizontal',
            spaceBetween: 16,
            slidesPerView: 3,
            navigation: {
                prevEl: '.swiper-tariffs .swiper-button-prev',
                nextEl: '.swiper-tariffs .swiper-button-next',
            },
            breakpoints: {
                0: {
                    slidesPerView: 1.3,
                    spaceBetween: 10,
                },
                701: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                1380: {
                    slidesPerView: 3,
                    spaceBetween: 16,
                },
            },
        });
    }
    if(document.querySelectorAll('.swiper-tariffs-large').length > 0) {
        let tariffsLargeSlider = new Swiper('.swiper-tariffs-large .swiper', {
            direction: 'horizontal',
            spaceBetween: 16,
            slidesPerView: 4,
            navigation: {
                prevEl: '.swiper-tariffs-large .swiper-button-prev',
                nextEl: '.swiper-tariffs-large .swiper-button-next',
            },
            breakpoints: {
                0: {
                    slidesPerView: 1.3,
                    spaceBetween: 10,
                },
                701: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                1380: {
                    slidesPerView: 4,
                    spaceBetween: 16,
                },
            },
        });
    }
    if(document.querySelectorAll('.swiper-clients-results').length > 0) {
        let clientsResultsSlider = new Swiper('.swiper-clients-results .swiper', {
            direction: 'horizontal',
            spaceBetween: 50,
            slidesPerView: 1,
            autoHeight: 'auto',
            navigation: {
                prevEl: '.swiper-clients-results .swiper-button-prev',
                nextEl: '.swiper-clients-results .swiper-button-next',
            },
        });
    }
    if(document.querySelectorAll('.swiper-video-feedback').length > 0) {
        let feedbackSlider = new Swiper('.swiper-video-feedback .swiper', {
            direction: 'horizontal',
            spaceBetween: 16,
            slidesPerView: 4,
            navigation: {
                prevEl: '.swiper-video-feedback .swiper-button-prev',
                nextEl: '.swiper-video-feedback .swiper-button-next',
            },
            breakpoints: {
                0: {
                    slidesPerView: 2,
                    spaceBetween: 12,
                },
                701: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                1380: {
                    slidesPerView: 4,
                    spaceBetween: 16,
                },
            },
        });
    }
    if(document.querySelectorAll('.swiper-partners').length > 0) {
        let patnersSlider = new Swiper('.swiper-partners .swiper', {
            direction: 'horizontal',
            spaceBetween: 16,
            slidesPerView: 2.1,
            navigation: {
                prevEl: '.swiper-partners .swiper-button-prev',
                nextEl: '.swiper-partners .swiper-button-next',
            },
            breakpoints: {
                0: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                },
                701: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                1380: {
                    slidesPerView: 2.1,
                    spaceBetween: 16,
                },
            },
        });
    }
    const informationButtons = document.querySelectorAll('.information-button');
    if(informationButtons.length > 0) {
        informationButtons.forEach(button => {
            tippy(button, {
                content: button.querySelector('.information-button__content').innerHTML,
                allowHTML: true,
                arrow: false,
                placement: 'left',
                offset: [0, -32],
                zIndex: 10,
                trigger: 'click',
                theme: $(button).attr('data-theme'),
                maxWidth: 360,
                interactive: true,
            });
        });
    }
    const headerTooltip = document.getElementById('header-tooltip');
    if(headerTooltip !== null && headerTooltip !== undefined) {
        tippy(headerTooltip, {
            content: headerTooltip.querySelector('.header__tooltip__content').innerHTML,
            allowHTML: true,
            arrow: false,
            placement: 'bottom-start',
            offset: [0, 0],
            zIndex: 9999,
            trigger: 'click',
            theme: $(headerTooltip).attr('data-theme'),
            maxWidth: 327,
            interactive: true,
        });
    }
    Fancybox.bind('[data-fancybox]', {
        mainClass: 'fancybox__popup',
    });
    Fancybox.bind('[data-fancybox-video]', {
        mainClass: 'fancybox__video',
    });
    function itemsHoverClickAnimation(items, itemClass) {
        if(items.length > 0) {
            $(document).on('click', itemClass, function(e) {
                if (window.innerWidth < 1380) {
                    items.forEach(element => {
                        if(element === this) {
                            $(element).toggleClass('_active');
                        } else {
                            $(element).removeClass('_active');
                        }
                    });
                }
            });
            $(itemClass).hover(function(e) {
                if (window.innerWidth >= 1380) {
                    items.forEach(element => {
                        if(element === this) {
                            $(element).toggleClass('_active');
                        } else {
                            $(element).removeClass('_active');
                        }
                    });
                }
            });
        }
    }
    let directionItems = document.querySelectorAll('.directions__item');
    itemsHoverClickAnimation(directionItems, '.directions__item');
    let howWorksItems = document.querySelectorAll('.how-works__items__item');
    itemsHoverClickAnimation(howWorksItems, '.how-works__items__item.item_animated');
    let forWhomItems = document.querySelectorAll('.for-whom__items__item');
    itemsHoverClickAnimation(forWhomItems, '.for-whom__items__item.item_animated');
    let willLearnItems = document.querySelectorAll('.will-learn__items__item');
    itemsHoverClickAnimation(willLearnItems, '.will-learn__items__item');
    let gamesInformationItems = document.querySelectorAll('.games-information__items__item');
    itemsHoverClickAnimation(gamesInformationItems, '.games-information__items__item');
});
