'use strict';

var skinr = (function(exports){

  var buildOptions = function(options, titleOption){
    var optionsHtml = '';
    for(var i = titleOption ? 1 : 0, l = options.length; i < l; i++){
      optionsHtml += '<li class="skinr-select__options__item" data-val="' +
        options[i].value + '">' +
        options[i].text + '</li>';
    }
    return optionsHtml;
  };

  var buildSkinrs = function(options, originalElems){
    // set title position - if titleOption is true then use first option, otherwise use second (default second)
    var skinrHtml = '<dl class="skinr-select" tabindex="0"><dt class="skinr-select__title">' + originalElems.children[0].text + '</dt><dd class="skinr-select__body"><ul class="skinr-select__options">' + options + '</ul></dd></dl>';
    return skinrHtml;
  };

  // build up and insert Skinr HTML after each element matching selector, then hide element
  var build = function(selector, titleOption){
    var originalElems = document.querySelectorAll(selector);

    // loop through all elements matching query selector
    for(var i = 0, l = originalElems.length; i < l; i++){
      var skinrOptions = originalElems[i].children,
          // build new Skinr HTML
          skinrHtml = buildSkinrs(buildOptions(skinrOptions, titleOption), originalElems[i]);

      // insert Skinr HTML after each queried element, hide original element
      originalElems[i].insertAdjacentHTML('afterend', skinrHtml);
      originalElems[i].setAttribute('hidden', '');
    }

    // set inline width, prevents skinr from resizing after selecting option
    var skinrs = document.querySelectorAll('.skinr-select');
    for(var i = 0, l = skinrs.length; i < l; i++){
      skinrs[i].style.width = skinrs[i].offsetWidth + 'px';
    }
  };

  var skinrEvents = function(){
    var skinrs = document.querySelectorAll('.skinr-select');

    var openSkinr = function(skinr){
      skinr.classList.add('skinr-select--active');
    };

    var closeSkinr = function(skinr){
      skinr.classList.remove('skinr-select--active');
    };

    var selectOriginalOption = function(skinrOption, originalOptions, skinrTitle){
      if(skinrOption.hasAttribute('data-val')){
        var optionVal = skinrOption.getAttribute('data-val');
        for(var i = 0, l = originalOptions.length; i < l; i++){
          if(originalOptions[i].hasAttribute('selected')){
            originalOptions[i].removeAttribute('selected');
          }
          if(originalOptions[i].getAttribute('value') === optionVal){
            originalOptions[i].setAttribute('selected', '');
            skinrTitle.textContent = originalOptions[i].textContent;
          }
        }
      }
    };

    var getSkinrInFocus = function(){
      if(document.activeElement.classList.contains('skinr-select')){
        return document.activeElement;
      }
    };

    var getSkinrOpen = function(){
      var skinrsOpen = document.querySelectorAll('.skinr-select');
      for(var i = 0, l = skinrsOpen.length; i < l; i++){
        if(skinrsOpen[i].classList.contains('skinr-select--active')){
          return skinrsOpen[i];
          break;
        }
      }
    };

    var isSelected = function(arr){
      var selected = false;
      for(var i = 0; i < arr.length; i++){
        if(arr[i].hasAttribute('selected')){
          selected = true;
        }
      }
      return selected;
    };

    var getSelected = function(arr){
      for(var i = 0; i < arr.length; i++){
        if(arr[i].hasAttribute('selected')){
          return arr[i];
        }
      }
    };

    var getSelectedIndex = function(arr){
      for(var i = 0; i < arr.length; i++){
        if(arr[i].hasAttribute('selected')){
          return i;
        }
      }
    };

    var deselectAll = function(arr){
      for(var i = 0; i < arr.length; i++){
        arr[i].removeAttribute('selected');
      }
    };

    var selectOption = function(arr, index){
      deselectAll(arr);
      arr[index].setAttribute('selected', '');
    };

    var selectThisOption = function(arr, item){
      deselectAll(arr);
      item.setAttribute('selected', '');
    };

    /* ============ *\
       Mouse events
    \* ============ */

    // loop through all skinr elements and add events to:
    for(var i = 0, l = skinrs.length; i < l; i++){
      var skinrCurrent = skinrs[i];
      skinrCurrent.addEventListener('click', function(e){
        // 1 open skinr
        openSkinr(this);
        // 2 select corresonding option from original select element on skinr-select__options__item click
        if(e.target.classList.contains('skinr-select__options__item')){
          var skinrOption = e.target,
              originalOptions = this.previousSibling.querySelectorAll('option'),
              skinrOptionsAll = this.querySelectorAll('.skinr-select__options__item');
          // select corresponsing option in original element
          selectOriginalOption(skinrOption, originalOptions, this.children[0]);
          // select this skinr option
          selectThisOption(skinrOptionsAll, skinrOption);

          // 3 close skinr
          closeSkinr(this);
        }
      });
    }

    // global events
    addEventListener('click', function(e){
      var skinrsActive = document.querySelectorAll('.skinr-select--active');
      // loop through all active skinrs and if click target is not inside, close skinr
      for(var i = 0, l = skinrsActive.length; i < l; i++){
        var target = e.target;
        while(target && target !== skinrsActive[i]){
          target = target.parentNode;
        }
        if(!target){
          closeSkinr(skinrsActive[i]);
        }
      }
    });

    /* =============== *\
       Keyboard events
    \* =============== */

    addEventListener('keydown', function(e){
      // if skinr is active element
      if(getSkinrInFocus()){
        var skinrInFocus = getSkinrInFocus();
        // 1 open focussed skinr when up arrow, down arrow, enter key or spacebar is pressed
        if(e.keyCode === 32 || e.keyCode === 38 || e.keyCode === 40 || e.keyCode === 13){
          openSkinr(skinrInFocus);
        }else{
          closeSkinr(skinrInFocus);
        }
      }

      // 2 Navigate options
      if(getSkinrOpen()){
        var activeOptions = document.querySelectorAll('.skinr-select--active .skinr-select__options__item');
        if(!isSelected(activeOptions)){
          selectOption(activeOptions, 0);
        }else{
          var selectedOptionIndex = getSelectedIndex(activeOptions);
          // press down arrow: increment selectedOptionIndex option by one
          if(e.keyCode === 40){
            if(selectedOptionIndex < activeOptions.length - 1){
              selectedOptionIndex++;
            }
          }
          // press up arrow: decrement selectedOptionIndex option by one
          if(e.keyCode === 38){
            if(selectedOptionIndex > 0){
              selectedOptionIndex--;
            }
          }
          // 3 select skinr option
          selectOption(activeOptions, selectedOptionIndex);
          // 4 press spacebar or enter: select corresponding option from original element
          if(e.keyCode === 32|| e.keyCode === 13){
            var skinrOpen = getSkinrOpen(),
                originalOptions = skinrOpen.previousSibling.querySelectorAll('option');

            selectOriginalOption(activeOptions[selectedOptionIndex], originalOptions, skinrOpen.children[0]);
            closeSkinr(skinrOpen);
          }
        }
      }
    });


  };

  var exports = {
    init: function(c){
      var c = c || {},
          config = {
        selector: c.selector || 'select',
        titleOption: c.titleOption || false
      };

      // cut the mustard -> http://responsivenews.co.uk/post/18948466399/cutting-the-mustard
      if('querySelector' in document
        && 'localStorage' in window
        && 'addEventListener' in window){
          build(config.selector, config.titleOption);
          skinrEvents();
      }else{
        console.log('Skinr error: Failed to instantiate. You didn\'t cut the mustard :(');
      }
    }
  };

  return exports;

})(skinr || {});