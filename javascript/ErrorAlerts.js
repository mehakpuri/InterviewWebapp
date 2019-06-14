
// console.log(form)

	function change(){
		var form = document.forms[pages.content + '_form'] ? document.forms[pages.content + '_form'].elements : null
		console.log(form)
		if(form!=null){
			for(var i =0;i<form.length;i++){
				form[i].oninput = checkForm
			}
		}
	}


function checkForm(e) {
	var flag = 0
	var page = e.target.id.split('-')[0]
	console.log(page)
	if(page != 'page1'){
		page = 'page2'
	}
	var requiredId = page+'-error-'+e.target.name
	console.log(requiredId)
	var str = e.target.value.trim()
	if(str == ''){
		console.log("empty")
		var fieldName = e.target.name
		message = fieldName + " cannot be empty"
		flag = 1
		
	}
	else if(e.target.type == "email"){
		var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
			if (reg.test(e.target.value) == false) 
			{
		    	message = 'Invalid Email Address'
		    	flag = 1
			}
		}
	else if(e.target.id == "page1-mobile"){
		console.log("checking mobile")
		console.log(e.target.value)
		var reg=/^[6-9]\d{9}$/;
		if (reg.test(e.target.value) == false) 
    	{
        	message = 'Invalid Mobile Number'
        	flag = 1
        
    	}
	}
	else{
		var reg = /^[a-zA-Z ]*$/;
		if(reg.test(e.target.value) == false) 
    	{
        	message = 'Invalid format for '+ e.target.name
        	flag = 1
    	}
	}


	if(flag == 1 && e.target.type!='radio' && e.target.type!='select-one')
		createErrorMessage(e.target,message)
	else if(e.target.type!='radio' && e.target.type!='select-one')
		document.getElementById(requiredId).style.display = 'none'
	
}

function createErrorMessage(input,message){
	console.log(input.name)
	console.log(message)
	if(input == 'page1')
		page = input
	else
		var page = input.id.split('-')[0]
	console.log(page)

	if(page != 'page1'){
		page = 'page2'
	}
	var requiredId = page+'-error-'+input.name

	document.getElementById(requiredId).innerHTML = message
	document.getElementById(requiredId).style.display = 'block'
}