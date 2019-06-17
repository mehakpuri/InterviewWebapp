function submitForm(pageId) {
	console.log("in submit form")
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
	var field = document.forms[pageId+"_form"].elements
	var flag=0

	for(var i=0;i<field.length;i++){
		var str = field[i].value.trim()
		if(str == '' && field[i].type!= 'select-one'){
			console.log("in first")
			var fieldName = field[i].name
			message = fieldName + " cannot be empty"
			flag=1
			break;
		}
		// else if(str != '' && field[i].type == 'text'){
		// 	var number = pageId.split('-')[1]
		// 	var requiredId = 'page'+number+'-error-'+field[i].name
		// 	console.log(requiredId)
		// 	document.getElementById(requiredId).style.display = 'none';
		// }
		else if(field[i].name == 'qualification'){
			if(document.getElementById('radio-uni').checked == false && document.getElementById('radio-prof').checked == false)
			{
				message = "choose one option"
				document.getElementById('page1-error-qualification').innerHTML = message
				document.getElementById('page1-error-qualification').style.display = 'block'
				flag = 1
				break;
			}
			else{
				document.getElementById('page1-error-qualification').style.display = 'none'
			}
		}
		else if(field[i].name == 'tax'){
			console.log("check tax")
			if(document.getElementById('radio-tax').checked == false && document.getElementById('radio-notax').checked == false)
			{
				console.log("checking tax validation")
				message = "choose one option"
				document.getElementById('page1-error-tax').innerHTML = message
				document.getElementById('page1-error-tax').style.display = 'block'
				flag = 1
				break;
			}
			else{
				document.getElementById('page1-error-tax').style.display = 'none'
			}
		}
		else if(field[i].type == "email"){
			var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
			if (reg.test(field[i].value) == false) 
        	{
            	message = 'Invalid Email Address'
            	flag = 1
            	break;
        	}
		}
		else if(field[i].id == "page1-mobile"){
			var reg=/^[6-9]\d{9}$/;
			if (reg.test(field[i].value) == false) 
        	{
            	message = 'Invalid Mobile Number'
            	flag = 1
            	break;
        	}
		}
		else if(field[i].type == 'select-one'){
			console.log('In select one')
			if(field[i].name == 'graduation' && field[i].value == ''){
				message = 'select a graduation option'
				document.getElementById('page1-error-graduation').innerHTML = message
				document.getElementById('page1-error-graduation').style.display = 'block'
				flag = 1
				break;
			}
			else if(field[i].name == 'graduation' && field[i].value != ''){
				document.getElementById('page1-error-graduation').style.display = 'none'
			}
			else if(field[i].name == 'active-from' && field[i].value == ''){
				
				message = 'Active From cannot be empty'
				flag = 1
				document.getElementById('page2-error-active').innerHTML = message
				document.getElementById('page2-error-active').style.display = 'block'
				break;
			}
			else if(field[i].name == 'active-from' && field[i].value != ''){
				document.getElementById('page2-error-active').style.display = 'none'	
			}
			else if(field[i].name == 'active-to' && field[i].value == ''){
				message = 'Active To cannot be empty'
				flag = 1
				document.getElementById('page2-error-active').innerHTML = message
				document.getElementById('page2-error-active').style.display = 'block'
				break;
			}
			else if(field[i].name == 'active-to' && field[i].value != ''){
				document.getElementById('page2-error-active').style.display = 'none'	
			}
			else if(field[i].name == 'enrolled' && field[i].value == ''){
				message = 'Enrolled cannot be empty'
				flag = 1
				document.getElementById('page2-error-school').innerHTML = message
				document.getElementById('page2-error-school').style.display = 'block'
				break
			}
			else if(field[i].name == 'enrolled' && field[i].value != ''){
				document.getElementById('page2-error-school').style.display = 'none'	
			}
			else if(field[i].name == 'graduated' && field[i].value == ''){
				message = 'Graduated cannot be empty'
				flag = 1
				document.getElementById('page2-error-school').innerHTML = message
				document.getElementById('page2-error-school').style.display = 'block'
				break
			}
			else if(field[i].name == 'graduated' && field[i].value != ''){
				document.getElementById('page2-error-school').style.display = 'none'	
			}

		}
		else{
			var reg = /^[a-zA-Z ]*$/;
			if (reg.test(field[i].value) == false) 
        	{
            	message = 'Invalid format for '+ field[i].name
            	flag = 1
            	break;
        	}
		}
	}
	if(flag == 1 && field[i].type!='radio' && field[i].type!='select-one'){
		// console.log("calling function")
		createErrorMessage(field[i],message)
	}

	// console.log("error message created")
	console.log(flag)
	return flag
}
function page2_Validation() {
	var flag = 0
	var form = document.forms['page-2_form'].elements

	console.log("in page 2 validation ")
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
		
	}
	
	if(flag ==0){
	
		var activeFrom = document.forms['page-2_form']['active-from']
		var activeTo = document.forms['page-2_form']['active-to']
		if(activeFrom.value != ''){
			if(activeFrom.value > activeTo.value){
				flag = 1
				message = "Active-from cannot be greater than Active-to field"
				document.getElementById('page2-error-active').style.display = 'block'
				document.getElementById('page2-error-active').innerHTML = message
				
			}
		}
		else {
			for(var i=0;i<activeFrom.length;i++){	
				if(activeFrom[i].value>activeTo[i].value){
					flag =1
					message = "Active-from cannot be greater than Active-to field"
					document.getElementById('page2-error-active').style.display = 'block'
					document.getElementById('page2-error-active').innerHTML = message
					break;
				}
			}
		}
		var enrolled = document.forms['page-2_form']['enrolled']
		var graduated = document.forms['page-2_form']['graduated']
		if(enrolled.value != ''){
			if(enrolled.value > graduated.value){
				flag = 1
				message = "Enrolled cannot be greater than Graduated field"
				document.getElementById('page2-error-school').style.display = 'block'
				document.getElementById('page2-error-school').innerHTML = message
				
			}
		}
		else {
			for(var i=0;i<enrolled.length;i++){
				if(enrolled[i].value>graduated[i].value){
					flag =1
					message = "Enrolled cannot be greater than Graduated field"
					document.getElementById('page2-error-school').style.display = 'block'
					document.getElementById('page2-error-school').innerHTML = message
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