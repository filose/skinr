var skinr = (function(exports){

	// vars
	var selectItems;

	// helper fns
	var qsa = function(elem){
	  return document.querySelectorAll(elem);
	};

  var qs = function(elem){
    return document.querySelector(elem);
  };

	function build(selectItems){
		var skinrArr = [];
		for(var i = 0; i < selectItems.length; i++){
			var optionsHTML = '',
					skinrHTML = '';
			skinrArr.push(new Skinr(selectItems[i]));
			for(var j = 1; j < skinrArr[i].options.length; j++){
				optionsHTML += '<li class="skinr-select__options__item" data-val="' + skinrArr[i].options[j].value + '">' + skinrArr[i].options[j].text + '</li>';
			}
			skinrHTML = '<dl class="skinr-select" tabindex="0"><dt class="skinr-select__title">' + skinrArr[i].options[0].text + '</dt><dd class="skinr-select__body"><ul class="skinr-select__options">' + optionsHTML + '</ul></dd></dl>';
			selectItems[i].insertAdjacentHTML('afterend', skinrHTML);
			selectItems[i].setAttribute('hidden', '');
		}
	}

	function skinrEvents(){
		var skinrElems = qsa('.skinr-select');
		addEventListener('click', function(e){
			for(var i = 0; i < skinrElems.length; i++){
				if(e.target !== skinrElems[i].children[0] && skinrElems[i].classList.contains('skinr-select--active')){
					skinrElems[i].classList.remove('skinr-select--active');
				}
			}
		});

    // keyboard events to navigate skinr-select elems
    // helpers
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

    // 1 open skinr
    addEventListener('keydown', function(e){
      var skinrOpen = false;
      if(document.activeElement.classList.contains('skinr-select')){
        var skinrFocus = document.activeElement;
        if(e.keyCode === 32 || e.keyCode === 38 || e.keyCode === 40){
          skinrFocus.classList.add('skinr-select--active');
          skinrOpen = true;
        }else{
          skinrFocus.classList.remove('skinr-select--active');
          skinrOpen = false;
        }
      }

      // 2 Navigate options
      var options = qsa('.skinr-select--active .skinr-select__options__item');
      if(skinrOpen){
        if(!isSelected(options)){
          options[0].setAttribute('selected', '');
        }else{
          if(e.keyCode == 40 && getSelectedIndex(options) < options.length - 1){
            var selectedItem = getSelected(options);
            deselectAll(options);
            selectedItem.nextSibling.setAttribute('selected', '');
          }
          if(e.keyCode == 38 && getSelectedIndex(options) > 0){
            var selectedItem = getSelected(options);
            deselectAll(options);
            selectedItem.previousSibling.setAttribute('selected', '');
          }
        }
      }else{
        var optionsAll = qsa('.skinr-select__options__item');
        deselectAll(optionsAll);
      }

      // 3 select option

    });

		for(var i = 0; i < skinrElems.length; i++){
			skinrElems[i].style.width = skinrElems[i].offsetWidth + 'px';
      // remove focus on mousedown
      blurOnce = function(){
        this.removeEventListener('focus', blurOnce);
        this.blur();
      }
      skinrElems[i].addEventListener('mousedown', function(e){
        this.addEventListener('focus', blurOnce);
      });
			skinrElems[i].addEventListener('click', function(e){
				this.classList.add('skinr-select--active');
				if(e.target.hasAttribute('data-val')){
					var optionVal = e.target.getAttribute('data-val'),
							selectItemOptions = this.previousSibling.querySelectorAll('option');
					for(var j = 0; j < selectItemOptions.length; j++){
						if(selectItemOptions[j].hasAttribute('selected')){
							selectItemOptions[j].removeAttribute('selected');
						}
						if(selectItemOptions[j].getAttribute('value') === optionVal){
							selectItemOptions[j].setAttribute('selected', '');
							this.children[0].textContent = selectItemOptions[j].textContent;
						}
					}
				}
			});
		}
	}

	function Skinr(elem){
		this.select = elem,
		this.options = this.select.children
	}

	var exports = {
		select: {
			init: function(selector){
				selectItems = selector && typeof selector === 'string' ? qsa(selector) : qsa('select');
				build(selectItems);
				skinrEvents();
			}
		}
	};

	return exports;

})(skinr || {});