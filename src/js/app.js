import Splide from '@splidejs/splide';
import Lightpick from 'lightpick/lightpick';

function togglePushMenu() {
  document.getElementById('main-nav').classList.toggle('push')
}
document.querySelector('.toggle-push-menu').addEventListener('click',function(){
  togglePushMenu();
});
document.querySelector('.aside-layout').addEventListener('click',function(){
  togglePushMenu();
});
window.dropdownSubMenu = (function(){
  var dropdownSubMenu = function(element){
    if(!element){
        return;
    }
    var elem = document.getElementById(element);
    var handler = elem.querySelector('.display');
    var closeHandler = elem.querySelector('button');
    handler.addEventListener('click', function (e) {
      elem.classList.toggle('view');
   });
   closeHandler.addEventListener('click', function (e) {
    elem.classList.toggle('view');
 });
  };
  return function (element) {
    return dropdownSubMenu(element);
  };
})();
window.focusSelector = (function(){
  var focusSelector = function(element){
    if(!element){
        return;
    }
    var elem = document.getElementById(element);
    var handler = elem.querySelector('input');
    var actionlist = elem.querySelectorAll('button');

    var clearactive = function() {
      actionlist.forEach(function (item) {
        item.classList.remove('active');
      });
    }

    actionlist.forEach(function (item) {
      var val = item.getAttribute('data-status');
      item.onclick = function() {
          handler.value = val;
          clearactive();
          item.classList.add('active');
      }
    });


    handler.onfocus = function() {
      elem.classList.add('focus');
    }

    handler.onblur= function() {
      setTimeout(function () {
        elem.classList.remove('focus');
     }, 200);
    }

  };
  return function (element) {
    return focusSelector(element);
  };
})();

function createSliders() {
  Array.from(document.querySelectorAll('[data-slider]')).forEach(
    function(element, index, array) {
        if(element.getAttribute('data-slider') === "true") {

            var _nav = element.getAttribute('data-nav') == 'true';
            var _perpage = parseInt(element.getAttribute('data-perpage'));

            new Splide( element, {
              type   : 'loop',
              perPage: _perpage,
              gap:'1rem',
              arrows:false,
              pagination:_nav,
              padding: {
                right: '10rem',
                left : '0rem',
              },
              breakpoints: {
                '640': {
                  perPage: 1,
                  gap    : '.5rem',
                  padding: {
                    right: '0rem',
                    left : '0rem',
                  },
                },
                '480': {
                  perPage: 1,
                  gap    : '.5rem',
                  padding: {
                    right: '0rem',
                    left : '0rem',
                  },
                },
              }
            } ).mount();

        }
  });
}




(function() {
  Array.from(document.querySelectorAll('[data-dropdown]')).forEach(
    function(element, index, array) {
        if(element.getAttribute('data-dropdown') === "true") {
          dropdownSubMenu(element.id);
        }
  });

  

  /*if(document.getElementById('toggle-basket')) {
    document.getElementById('toggle-basket').addEventListener('click', function() {
      document.getElementById('shopping-basket').classList.add('in');
    });
  }
  if(document.getElementById('toggle-notifications')) {
    document.getElementById('toggle-notifications').addEventListener('click', function() {
      document.getElementById('notifications').classList.add('in');
    });
  }

  if(document.getElementById('toggle-user')) {
    document.getElementById('toggle-user').addEventListener('click', function() {
      document.getElementById('user-menu').classList.add('in');
    });
  }*/

  if(document.getElementById('date-range')) {
    new Lightpick({
      field: document.getElementById('date-range'),
      singleDate: false,
      lang: 'tr',
      locale: {
          tooltip: {
              one: 'gün',
              few: 'gün',
              many: 'gün',
          },
          pluralize: function(i, locale) {
              if ('one' in locale && i % 10 === 1 && !(i % 100 === 11)) return locale.one;
              if ('few' in locale && i % 10 === Math.floor(i % 10) && i % 10 >= 2 && i % 10 <= 4 && !(i % 100 >= 12 && i % 100 <= 14)) return locale.few;
              if ('many' in locale && (i % 10 === 0 || i % 10 === Math.floor(i % 10) && i % 10 >= 5 && i % 10 <= 9 || i % 100 === Math.floor(i % 100) && i % 100 >= 11 && i % 100 <= 14)) return locale.many;
              if ('other' in locale) return locale.other;
      
              return '';
          }
      },
      onSelect: function(start, end){
          var str = '';
          str += start ? start.format('Do MMMM YYYY') + ' to ' : '';
          str += end ? end.format('Do MMMM YYYY') : '...';
          //document.getElementById('result-2').innerHTML = str;
      }
    });
  }
  
  Array.from(document.querySelectorAll('[data-selector]')).forEach(
    function(element, index, array) {
      focusSelector(element.id);
    });

    Array.from(document.querySelectorAll('[data-order]')).forEach(
      function(element, index, array) {
        var ordertype = element.getAttribute('data-order');

        element.onclick = function() {

          document.getElementById('order-grid').classList.value = '';
          document.getElementById('order-grid').classList.add(ordertype + '-order-view');

          document.querySelectorAll('[data-order]').forEach(function(e) {
            e.classList.remove('active');
          })
          element.classList.add('active');
        }

      });
  

      if(document.getElementById('filter-toggle')) {
        document.getElementById('filter-toggle').addEventListener('click',function() {
          this.classList.toggle('open');
          document.getElementById('filters-block').classList.toggle('view')
        })
      }

      Array.from(document.querySelectorAll('[data-handler]')).forEach(
        function(element, index, array) {
          var target = element.getAttribute('data-target');
          element.onclick = function() {
            document.getElementById(target).classList.add('in');
          }
      });


      Array.from(document.querySelectorAll('[data-modalclose]')).forEach(
        function(element, index, array) {
        
          element.onclick = function() {

            var modals = document.querySelectorAll('.modal-dialog');

            modals.forEach(function(element) {

                element.classList.remove('in');

            })

          }
  
        });
  

  createSliders();
})();


