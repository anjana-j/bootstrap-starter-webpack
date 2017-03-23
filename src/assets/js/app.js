import '../scss/app.scss';


import 'owl.carousel';
//import '../../../node_modules/owl.carousel/dist/assets/owl.carousel.css';
//import '../../../node_modules/owl.carousel/dist/assets/owl.carousel.css';
// import 'owlcss';

$(document).ready(function () {

    $('.customer-list').owlCarousel({
        animateOut: 'fadeOut',
        autoplay: true,
        lazyLoad: true,

        loop: true,
        nav: false,
        dots: true,
        dotsEach: 2,

        responsive: {
            0: {
                items: 1,
                margin: 20,
                stagePadding: 40

            },

            640: {
                items: 2,
                margin: 20,
                stagePadding: 40,

            },

            1000: {
                items: 3,
                margin: 20,
                stagePadding: 40,

            },

            1025: {
                items: 4,
                margin: 30,
                stagePadding: 50,
            },

            1600: {
                items: 5,
                margin: 30,
                stagePadding: 50,
            }
        }
    });
});