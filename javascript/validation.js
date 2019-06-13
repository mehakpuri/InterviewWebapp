function submitForm(pageId) {
	var flag = 0
	if(pageId == 'page-1' )
		flag = commonValidation(pageId)
	else if(pageId == 'page-2'){
		flag = commonValidation(pageId)
		if(flag ==0){
			flag = page2_Validation()
		}
	}
	else if(pageId == 'page-3'){
		flag = page3_validation()
	}

	return flag
	
}
function commonValidation(pageId) {
	var field = document.forms[pageId+"_form"].getElementsByClassName("input_field")
	var flag=0

	for(var i=0;i<field.length;i++){
		console.log(field[i].childNodes)
		var str = field[i].childNodes[1].value.trim()
		if(str == ''){
			console.log(str)
			var fieldName = field[i].childNodes[1].name
			alert(fieldName + " cannot be empty")
			flag=1
			break;
		}
		else if(field[i].childNodes[1].type == 'radio'){
			if(document.getElementById('radio-uni').checked == false && document.getElementById('radio-prof').checked == false)
			{
				alert("choose one option")
				flag = 1
				break;
			}
			else if(document.getElementById('radio-tax').checked == false && document.getElementById('radio-notax').checked == false)
			{
				alert("choose one option")
				flag = 1
				break;
			}
		}
		else if(field[i].childNodes[0].textContent == " Email "){
			var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
			if (reg.test(field[i].childNodes[1].value) == false) 
        	{
            	alert('Invalid Email Address');
            	flag = 1
            	break;
        	}
		}
		else if(field[i].childNodes[0].textContent == " Mobile "){
			var reg = /^([1-9]\d{9})$/;
			if (reg.test(field[i].childNodes[1].value) == false) 
        	{
            	alert('Invalid Mobile Number');
            	flag = 1
            	break;
        	}
		}
		else if(field[i].childNodes[1].type == 'select-one'){
			// console.log("in select-one ")
			// console.log(field[i].childNodes)
		}
		else{
			var reg = /^[a-zA-Z ]*$/;
			if (reg.test(field[i].childNodes[1].value) == false) 
        	{
            	alert('Invalid format for '+ field[i].childNodes[0].textContent);
            	flag = 1
            	break;
        	}
		}
	}

	return flag
}
function page2_Validation() {
	var flag = 0
	var form = document.forms['page-2_form'].elements


	var extra_fields = document.getElementsByClassName('input_extra')
	for(var i=0;i<extra_fields.length;i++){
		if(extra_fields[i].value == ''){
			alert("field cannot be empty")
			flag = 1
			break
		}
	}
	if(flag == 0){
		var select = []
		for(var i =0; i<form.length; i++){
			if(form[i].type == 'select-one')
				select.push(form[i])

		}
		
		for(var i =0;i<select.length;i++){
			
			if(select[i].value == '')
			{
				alert(select[i].name + " cannot be empty")
				flag = 1
				break
			}
		}
	}
	
	if(flag ==0){
	
		var activeFrom = document.forms['page-2_form']['active-from']
		var activeTo = document.forms['page-2_form']['active-to']
		if(activeFrom.value != ''){
			if(activeFrom.value > activeTo.value){
				flag = 1
				alert("Active-from cannot be greater than Active-to field")
				
			}
		}
		else {
			for(var i=0;i<activeFrom.length;i++){	
				if(activeFrom[i].value>activeTo[i].value){
					flag =1
					alert("Active-from cannot be greater than Active-to field")
					break;
				}
			}
		}
		var enrolled = document.forms['page-2_form']['enrolled']
		var graduated = document.forms['page-2_form']['graduated']
		if(enrolled.value != ''){
			if(enrolled.value > graduated.value){
				flag = 1
				alert("Enrolled cannot be greater than Graduated field")
				
			}
		}
		else {
			for(var i=0;i<enrolled.length;i++){
				if(enrolled[i].value>graduated[i].value){
					flag =1
					alert("Enrolled cannot be greater than Graduated field")
					break;
				}
			}
		}
	}

	return flag
}
function page3_validation() {
	var flag = 1
	if(sessionStorage.getItem('sidebarPage') == null){
		var sidebar = 'sidebar-1'

		var pageList = 'page3__list_1'
	}
	else
	{
		var numberItem = sessionStorage.getItem('sidebarPage').split('-')[1]
		var pageList = 'page3__list_'+numberItem
	}
	var input = document.getElementsByClassName(pageList)
	for(var i=0;i<input.length;i++){
		if(input[i].checked == true){
			flag = 0
			break;
		}
	}
	if(flag == 1){
		alert("fill in your choices")
	}
	return flag
}