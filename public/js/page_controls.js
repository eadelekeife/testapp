$(document).ready(function () {
    $(window).on('scroll', function () {
        if ($(window).scrollTop() > 100) {
            $('.navigation').addClass('fixed');
        } else {
            $('.navigation').removeClass('fixed');
        }
    })

    $('#redesigned-menu').on('click', () => {
        $('#redesigned-nav-content').css('display', 'flex');
    })
    $('#redesigned-times').on('click', () => {
        $('#redesigned-nav-content').css('display', 'none');
    })
})
let currStyle;

document.querySelector('.nav .header-icon ').addEventListener('click', () => {
    if (!currStyle) {
        currStyle = getComputedStyle(document.querySelector('.small ul')).display;
        document.querySelector('.small .ul').style.display = 'block';
        document.querySelector('.small').style.display = 'block';
    } else {
        currStyle = null;
        document.querySelector('.small .ul').style.display = 'none';
        document.querySelector('.small').style.display = 'none';
    }
})
document.querySelector('.nav .times ').addEventListener('click', () => {
    if (!currStyle) {
        currStyle = getComputedStyle(document.querySelector('.small ul')).display;
        document.querySelector('.small .ul').style.display = 'block';
        document.querySelector('.small').style.display = 'block';
    } else {
        currStyle = null;
        document.querySelector('.small .ul').style.display = 'none';
        document.querySelector('.small').style.display = 'none';
    }
})
