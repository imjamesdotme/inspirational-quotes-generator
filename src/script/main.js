function randomQuote() {

  $.getJSON('quotes.json')

  .done(function(data) {

    // Get an random index in the quotes array.
    var quote = data.quotes[Math.floor(Math.random() * data.quotes.length)];

    // Output the data from the object in the random array item.
    $('#quote').text(quote.quote);
    $('#author').text(quote.author);

    // Format the quote text replacing spaces with %20 for the twitter URL string.
    quote = $('#quote').text().split(" ").join("%20");
    var author = $('#author').text().split(" ").join("%20");
    // Update the URL string with the quote text.
    $('#tweet').attr('href', 'https://twitter.com/intent/tweet?text=' + quote + " - " + author);
  })


  .fail(function() {
    $('#quote').text('Sorry it looks like somethings gone wrong. Please try again.');
  });

}

// Window load
$(window).load(function () {
  $('#quote').addClass('fadeIn');
  $('#author').addClass('fadeIn');
});

// Document Read
$(document).ready(function() {

  // Run on document ready.
  randomQuote();

  // Generate another random quote.
  $('#new-quote').on('click', function() {
    randomQuote();
  });

  // Overlay
  $('.overlay-button').on('click', function() {

    if($('.overlay-button').hasClass('active')) {
      $('.overlay-button').removeClass('active');
      $('.overlay').slideUp(150);
    } else {
      $('.overlay-button').addClass('active');
      $('.overlay').slideDown(150);
    }

  });

  // Check for theme preferences
  var themePreference = localStorage.getItem('theme');

  if(themePreference === 'dark') {
    $('body').addClass('dark');
  }

  // Change theme
  $('#dark-theme').on('click', function() {

    if(!$('body').hasClass('dark')) {
      $('body').addClass('dark');
      localStorage.setItem('theme', 'dark');
    }

  });

  $('#light-theme').on('click', function() {

    if($('body').hasClass('dark')) {
      $('body').removeClass('dark');
      localStorage.setItem('theme', 'light');
    }

  });

}); // End ready
