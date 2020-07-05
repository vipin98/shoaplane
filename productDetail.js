$(document).ready(function(){

 
var productId = window.location.search.split('=')[1];
console.log(productId)
  var responseArr = null;

 
$.get("https://5ee248c68b27f3001609488e.mockapi.io/producdetail/" +productId ,function(data,status){
   responseArr=data;
        
   $('#image-preview').attr('src', data.preview)
   $('#product-name').html(data.name);
   $('#product-brand').html(data.brand);
   $('#product-des-para').html(data.description);
   $('#product-price').html('Rs'+data.price);


     for (let i=0; i<data.photos.length;i++){
    let imgProduct = $('<img>')
    .addClass('preview-img')
    .attr('src', data.photos[i]);
  if (i == 0) {
    imgProduct.addClass('active-image');
  }
  imgProduct.click(function () {
    $('#image-preview').attr('src', data.photos[i]);
    $('.preview-img').removeClass('active-image');
    imgProduct.addClass('active-image');
  });
  $('#preview-imgs').append(imgProduct);
}   
$('#add-to-cart').click(function () {
  $('#add-to-cart').css({
    transform: 'scale(1.1)',
  });
  setTimeout(() => {
    $('#add-to-cart').css({
      transform: 'scale(1)',
    });
  }, 200);
  if( localStorage.getItem('cart') == null){ 
    let cart = [];
    // responseArr.count = 1;
      cart.push(responseArr);
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log(cart);
  } else{
    let datalocal= JSON.parse(localStorage.getItem('cart'));
    let found = false;
    for(var i=0; i < datalocal.length; i++) {
        if(datalocal[i].id == responseArr.id) {
            found = true;
            break;
        }
    }

    if(found) {
        datalocal[i].count  += 1;
        localStorage.setItem('cart', JSON.stringify(datalocal));
    } else {
        responseArr.count = 1;
        datalocal.push(responseArr);
        localStorage.setItem('cart', JSON.stringify(datalocal));
    }
  }
  $('#cart-count').text(parseInt($('#cart-count').text()) + 1);
});
 
    });   
//    $("#add-to-cart").click(function() {
//     $('#add-to-cart').addClass('bigger');
//     setTimeout(function() {
//         $('#btn-add-to-cart').removeClass('bigger');
//     }, 200)

//     if( window.localStorage.getItem('cart') === null){}
//     let carts = [];
//     responseArr.count = 1;
//       carts.push(responseArr);
//     localStorage.setItem('cart', JSON.stringify(carts));
//     console.log(carts);
//     var foundAtPos = -1;
//     for(var i=0; i < carts.length; i++) {
//         if(parseInt(carts[i].id) == parseInt(responseArr.id)) {
//             foundAtPos = i;
//         }
//     }

//     if(foundAtPos > -1) {
//         carts[foundAtPos].count = carts[foundAtPos].count + 1;
//         localStorage.setItem('cart', JSON.stringify(carts));
//     } else {
//         responseArr.count = 1;
//         carts.push(responseArr);
//         localStorage.setItem('cart', JSON.stringify(carts));
//     }
//     $('#cart-count').text(parseInt($('#cart-count').text()) + 1);
// })  


 
});