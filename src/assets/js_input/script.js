$(document).ready(function(){
    AOS.init({
        once: true,
    });
    let financeSelectOrigin = document.querySelector('[name="finance-select"]');
    if(financeSelectOrigin !== null && financeSelectOrigin !== undefined) {
        let financeSelect = new Choices(financeSelectOrigin, {
            searchEnabled: false,
            allowHTML: true,
            shouldSort: false,
        })
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
    const informationButtons = document.querySelectorAll('#information-button');
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
    Fancybox.bind('[data-fancybox]', {
    });
    let directionItems = document.querySelectorAll('.directions__item');
    if(directionItems.length > 0) {
        let directionClick = $(document).on('click', '.directions__item', function(e) {
            if (window.innerWidth < 1380) {
                directionItems.forEach(element => {
                    if(element === this) {
                        $(element).toggleClass('_active');
                    } else {
                        $(element).removeClass('_active');
                    }
                });
            }
        });
        $('.directions__item').hover(function(e) {
            if (window.innerWidth >= 1380) {
                directionItems.forEach(element => {
                    if(element === this) {
                        $(element).toggleClass('_active');
                    } else {
                        $(element).removeClass('_active');
                    }
                });
            }
        });
    }
});
