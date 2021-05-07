//reviews
const findBlockByAlias = alias => {
    return $('.reviews__item').filter((ndx, item) => {
        return $(item).attr('data-linked-with') === alias;
    });
};

$('.reviews__switcher-link').on('click', e => {
    e.preventDefault();

    const $this = $(e.currentTarget);
    const target = $this.attr('data-open');
    const itemToShow = findBlockByAlias(target);
    const curItem = $this.closest('.reviews__switcher-item');

    itemToShow.addClass('active').siblings().removeClass('active');
    curItem.addClass('active').siblings().removeClass('active');
});

//team

const openItem = item => {
    const container = item.closest('.team__item');
    const contentBlock = container.find('.team__content');
    const textBlock = contentBlock.find('.team__content-block');
    const reqHeight = textBlock.height();

    container.addClass('active');
    contentBlock.height(reqHeight); 
};

const closeEveryItem = (container) => {
    const items = container.find('.team__content');
    const itemContainer = container.find('.team__item');

    itemContainer.removeClass('active');
    items.height(0);
}

$('.team__title').on('click', e => {
    const $this = $(e.currentTarget);
    const container = $this.closest('.team');
    const elemContainer = $this.closest('.team__item');

    if(elemContainer.hasClass('active')) {
        closeEveryItem(container);
    } else {
        closeEveryItem(container);
        openItem($this);
    }

    

});


//slider



$('.slider__list').slick({
     prevArrow: $('.arrow-left'),
     nextArrow: $('.arrow-right')
});


//form

const validateFields = (form, fieldsArray) => {

    fieldsArray.forEach(field => {
        field.removeClass('input-error');
        if (field.val().trim() === "") {
            field.addClass('input-error');
        }
    });

    const errorFields = form.find('.input-error');

    return errorFields.length === 0;
}


$('.form').submit((e) => {
    e.preventDefault();

    const form = $(e.currentTarget);
    const name = form.find("[name='name']");
    const phone = form.find("[name='phone']");
    const comment = form.find("[name='comment']");
    const to = form.find("[name='to']");

    const modal = $('modal');
    const content = modal.find('.modal__content');

    modal.removeClass('error-modal');

    const isValid = validateFields(form, [name, phone, comment, to]);

    if (isValid) {
    const request = $.ajax({
        url: "https://webdev-api.loftschool.com/sendmail",
        method: "post",
        data: {
            name: name.val(),
            phone: phone.val(),
            comment: comment.val(),
            to: to.val(),
        },
        error: (data) => {},
});

    request.done(data => {
        content.text(data.message);
    })

    request.fail((data) => {
        const message = data.responseJSON.message;
        content.text(message);
        modal.addClass('error-modal');
    });

    request.always(() => {
        $.fancybox.open({
            src: "#modal",
            type: "inline",
        });
    })
    }
});

$('.app-submit-btn').click((e) => {
    e.preventDefault();

    $.fancybox.close();
})




//hamburger

const hamburgerBtn = document.querySelector(".hamburger");
const hamburgerMenu = document.querySelector(".vert-menu");

    hamburgerBtn.addEventListener("click", function(e) {
        e.preventDefault();

        let className = hamburgerBtn.getAttribute("class");

        if (className == "hamburger") {
            hamburgerMenu.classList.add("vert-menu--open");
            hamburgerBtn.classList.add("hamburger__link--active");

                } else {
            hamburgerBtn.classList.remove("hamburger__link--active");
            hamburgerMenu.classList.remove("vert-menu--open");
        }
    });