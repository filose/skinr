var skinr = (function(exports){

	// vars
	var selectItems;

	// helper fns
	var qsa = function(elem){
	  return document.querySelectorAll(elem);
	}

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
				if(e.target.getAttribute('data-val')){
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