$(function () {

  function createCard(data) {
      
    let item = $('<div>').addClass('item');
    let itemImg = $('<img>').addClass('item-img').attr('src', data.preview);
    let plus = $('<i>').addClass('far fa-plus-square');
    let minus = $('<i>').addClass('far fa-minus-square');
    let dlt = $('<i>').addClass('delet').text("remove")

    let countItem = data.count;
    let itemCount = $('<p>').addClass('item-count').text(`x${countItem}`);
    let itemAmount = $('<p>')
      .addClass('item-amount')
      .text(`Amount: Rs ${data.price * countItem}`);
    let itemDesc = $('<div>')
      .addClass('item-desc')
      .append(
        $('<h2>').addClass('item-title').text(data.name),
        $('<span>').addClass('span-count').append(minus, itemCount, plus, dlt),
        itemAmount
      );
    plus.click(function () {
      if (countItem < 30) {
        countItem++;
        itemCount.text(`x${countItem}`);
        itemAmount.text(`Amount: Rs ${data.price * countItem}`);
       increaseCountItem(data.id);
        makeTotal();
      }
    });
    minus.click(function () {
      if (countItem > 1) {
        countItem--;
        itemCount.text(`x${countItem}`);
        itemAmount.text(`Amount: Rs ${data.price * countItem}`);

       decreaseCountItem(data.id);
        makeTotal();
      }
    });
    dlt.click(function () {
      item.remove();
      removeCountItem(data.id);
      makeTotal();
    });

    item.append(itemImg, itemDesc);
    return item;
  }
    const getList = JSON.parse(localStorage.getItem('cart'));
    function increaseCountItem(id) {    
      let found = false;
      // var foundAtPos = -1;
      for (var i = 0; i < getList.length; i++) {
        if (getList[i].id == id) {
          found = true;
          // foundAtPos=1
          break;
        }
      }
      if ( found) {
        $('#cart-count').text(parseInt($('#cart-count').text()) + 1);
        getList[i].count += 1;
        localStorage.setItem('cart', JSON.stringify(getList));
      }
    }
    function decreaseCountItem(id) {
      let found = false;  
      // var foundAtPos = -1                                  
      for (var i = 0; i < getList.length; i++) {
        if (getList[i].id == id) {
          found = true;
          // foundAtPos=1
          break;
        }
      }
      if ( found) {
        $('#cart-count').text(parseInt($('#cart-count').text()) - 1);
        getList[i].count -= 1;
        localStorage.setItem('cart', JSON.stringify(getList));
      }
    }
    function removeCountItem(id) {    
      $('#count-items').text(parseInt($('#count-items').text()) - 1);
      let found = false;
      for (var i = 0; i < getList.length; i++) {
        if (getList[i].id == id) {
          found = true;
          break;
        }
      }
      if (found) {
        $('#cart-count').text(
          parseInt($('#cart-count').text()) - getList[i].count
        );
        getList.splice(i, 1);
        localStorage.setItem('cart', JSON.stringify(getList));
      }
    }
    function makeTotal() {
      let total = 0;
      getList.map((item) => {
        total += item.count * item.price;
      });
      $('#amount').text(total);
    }
    
  
    $('#items').text('');
    $('#count-items').text(0);
    let total = 0;
    if (getList != null && getList != undefined && getList != []) {
      // let total = 0;
      $('#place-card').css({ display: 'block' });
      getList.map((item) => {
        let card = createCard(item);
        $('#items').append(card);
        $('#count-items').text(parseInt($('#count-items').text()) + 1);
        total += item.count * item.price;
      });
      $('#amount').text(total);
    } else {
      $('#place-card').css({ display: 'none' });
    }
    $('#btn-place').click(function () {

      localStorage.removeItem('cart');
      location.assign('./order.html');
    //   var orderItemArr = [];
    // for(var i=0; i< getList.length; i++) {
    //     var prodObj = {
    //         "id":  getList[i].id,
    //         "brand": getList[i].brand,
    //         "name":  getList[i].name,
    //         "price": getList[i].price,
    //         "preview":  getList[i].preview,
    //         "isAccessory":  getList[i].isAccessory
    //     }

    //     orderItemArr.push(prodObj);
    // }
    // var dataObj = {
    //     // amount: makeTotal,
    //     products: orderItemArr
    // }
    // $.post('https://5ee248c68b27f3001609488e.mockapi.io/createorder', dataObj, function() {
    //     alert('Order Placed Successfully')
    //     localStorage.setItem('cart', []);
    //     location.assign('./order.html');
   
    // })
    // $('#cart-count').html(total);
    // });
  });
  
 
})