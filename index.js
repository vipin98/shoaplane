$(document).ready(function(){
  $('.center').slick({
    centerMode: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    dots: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 3
        }
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 1
        }
      }
    ]
});
  
 
function  createCard(data){
   
      var cardDiv = $("<div>");
      cardDiv.addClass('card');
  
      var cardHyperLink = $('<a>');
      cardHyperLink.attr('href',"./productDetail.html?p="+data.id) ;
  
      var thumbnail= $('<img>');
      thumbnail.addClass('thumbnail');
      thumbnail.attr('src',data.preview) ;
  
  
      var title = $('<h2>');
       title.addClass('title')
      title.text(data.name);

      var discription = $('<h2>');
      discription.addClass('title-brand')
      discription.text(data.brand);

      var price =$('<p>');
      price.addClass('price');
      price.text('Rs'+ data.price)

  
       cardHyperLink.append(thumbnail);
       cardHyperLink.append(title);
       cardHyperLink.append(discription);
       cardHyperLink.append(price)
       cardDiv.append(cardHyperLink);
      
       
       return cardDiv;
  
   };

   $.get("https://5ee248c68b27f3001609488e.mockapi.io/homepage",function( responseArr){

        // var responseArr=data;
     for (let i=0; i< responseArr.length;i++){
    //  var mainCard= $(".product-grid")
    //  mainCard.append(cardDiv)
       
       if(responseArr[i].isAccessory) {
        $('#accessory-section-grid').append(createCard(responseArr[i]))
      } else {
        $('#clothing-section-grid').append(createCard(responseArr[i]))
      }
       
     }
    //  $('#cart-count').text(parseInt($('#cart-count').text()) + 1);
   });

  
  });