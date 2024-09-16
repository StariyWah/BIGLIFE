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
});
