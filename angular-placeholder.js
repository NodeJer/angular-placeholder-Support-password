/**
* placeholder Module
*
* Description
*/
angular.module('placeholder', []).

directive('placeholder', function(){
	return function($scope, elements, attrs, controller) {
			var placeholder = attrs.placeholder;
			var type = elements.attr('type');
			var ie8 = !-[1,];

			if(!ie8 && !elements[0].attachEvent)return false;

			if(ie8 && type === 'password'){
				var id = +new Date();
				var textInputHTML = elements[0].outerHTML.replace('type=password', 'type=text style="color:gray" id='+id).
				replace('value=""', 'value='+placeholder);

				elements.css('display', 'none');
				elements.after(textInputHTML);

				var textInput = document.getElementById(id);

				elements.on('blur', function(){
					if(this.value === ''){
						this.style.display = 'none';
						textInput.style.display = '';
					}
				});
				angular.element(textInput).on('focus', function(){
					this.style.display = 'none';
					elements.css('display', '')[0].focus();
				}).attr('name', '');
			}
			else{
				if(type === 'password'){
					elements.attr('type', '')
				}
				elements.val(placeholder).css('color', 'gray').
				on('focus blur', function(){
					if(this.value === placeholder){
						if(type === 'password'){
							elements.attr('type', 'password');
						}
						this.value = '';
						this.style.color = '';
					}
					else if(this.value === ''){
						if(type === 'password'){
							elements.attr('type', 'text');
						}
						this.value = placeholder;
						this.style.color = 'gray';
					}
				});
			}
		};
});
