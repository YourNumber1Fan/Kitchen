"use strict";

new WOW({
    animateClass: 'animate__animated'
}).init();

let loader = $('.loader');

$('#phone').inputmask({"mask": "+7 (999) 999 - 99 - 99"});
$('#phonePopup').inputmask({"mask": "+7 (999) 999 - 99 - 99"});


$('#submit').click(function () {
    let name = $('#name');
    let phone = $('#phone');
    let date = $('#date');
    let hasError = false;
    name.css('border-color', 'black');
    phone.css('border-color', 'black');
    date.css('border-color', 'black');

    $('.error-input').hide();

    if (!name.val()) {
        name.next().show();
        hasError = true;
        name.css('border-color', 'red');
    }

    if (!phone.val()) {
        phone.next().show();
        hasError = true;
        phone.css('border-color', 'red');
    }

    if (!date.val()) {
        date.next().show();
        hasError = true;
        date.css('border-color', 'red');
    }


    if (!hasError) {
        loader.css('display', 'flex');

        $.ajax({
            method: "POST",
            url: "https://testologia.site/checkout",
            data: {name: name.val(), phone: phone.val(), date: date.val()}
        })
            .done(function (msg) {
                loader.hide();
                if (msg.success) {
                    $('#order-tittle').hide();
                    $('.order').hide();
                    $('#order-thanks').css('display', 'flex');
                } else {
                    alert('Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ')
                }
            });
    }
})


$('#calculate').click(function () {
    $('#popup').css('display', 'inherit')
})

$('#submitPopup').click(function () {
    let namePopup = $('#namePopup');
    let phonePopup = $('#phonePopup');
    let hasError = false;
    namePopup.css('border-color', 'black');
    phonePopup.css('border-color', 'black');

    $('.error-popup-input').hide();

    if (!namePopup.val()) {
        namePopup.next().show();
        hasError = true;
        namePopup.css('border-color', 'red');
    }

    if (!phonePopup.val()) {
        phonePopup.next().show();
        hasError = true;
        phonePopup.css('border-color', 'red');
    }

    if (!hasError) {
        loader.css('display', 'flex');

        $.ajax({
            method: "POST",
            url: "https://testologia.site/checkout",
            data: {name: namePopup.val(), phone: phonePopup.val()}
        })
            .done(function (msg) {
                loader.hide();
                if (msg.success) {
                    $('#popup').hide();
                    alert('Спасибо! Мы перезвоним вам в течение нескольких минут')
                    // $('.popup-tittle').hide();
                    // $('.popup-text').hide();
                    // $('.popup-order').hide();
                    // $('.popup-thanks').css('display', 'flex');
                } else {
                    alert('Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ')
                    $('#popup').hide();
                }
            });
    }
})


document.querySelectorAll('#menu *').forEach((item)=>{
    item.onclick = () => {
        document.getElementById('menu').classList.remove('open');
    }
})

$('#burger').click(function (){
    $('#menu').addClass('open')
})

$('a[href^="#"]').click(function(){
    let anchor = $(this).attr('href');
    if (anchor === 1) return false;

    $('html, body').animate({
        scrollTop:  $(anchor).offset().top
    }, 600);
});