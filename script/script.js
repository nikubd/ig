$(window).on('resize', _.debounce(e => {
  heroOverCardMargin();
}, 100));
function heroOverCardMargin() {
  let heroOverCard = $('.hero-over-card');
  if ($(window).width() + 17 < 767.98) {
    heroOverCard.css({ marginTop: '20px' });
  } else {
    let cardHeight = heroOverCard.innerHeight();
    heroOverCard.css({ marginTop: -cardHeight / 2 });
  }
}
heroOverCardMargin();

$(".layout-5__before-after").twentytwenty();