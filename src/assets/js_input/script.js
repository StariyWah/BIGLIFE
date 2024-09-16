$(document).ready(function(){
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
                    $(this).text(closeText);
                    console.log(1);
                } else {
                    $(this).text(openText);
                    console.log(openText);
                }
            }else{
                if($(parent).hasClass('_active')){
                    $(element).text(openText);
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
});
