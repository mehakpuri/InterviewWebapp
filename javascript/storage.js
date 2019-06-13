function saveValues(form,storedPageId) {
	if(storedPageId == 'page-1'){

	var formData = {}
	var j = 0
	for(var i=0;i<form.elements.length;i++){
		if(form.elements[i].type == 'radio' && form.elements[i].checked == true){
			formData[j] = form.elements[i].value
			j++
		}
		else if(form.elements[i].type != 'radio'){
			formData[j] = form.elements[i].value
			j++
		}
	}
	sessionStorage.setItem(storedPageId,JSON.stringify(formData))
	
	}
	else if(storedPageId == 'page-2'){
		var formData = {}
		var j =0,i=0
		var workIndex = 0
		var workHistory = {}
		var educationIndex = 0
		var education = {}
		
		while(i<form.elements.length){
			if(form.elements[i].name == 'history'){
				var select = {}
				for(var p=0;p<3;p++){
					select[p] = form.elements[i].value
					i++
				}
				workHistory[workIndex] = select
				workIndex++
			}
			else if(form.elements[i].name == 'education'){
				
				var select = {}
				for(var p=0;p<3;p++){
					select[p] = form.elements[i].value
					i++
				}
				education[educationIndex] = select
				educationIndex++
			}
			else if(form.elements[i].type != 'radio'){
				formData[j] = form.elements[i].value
				j++
				i++
			}
			formData['2'] = workHistory
			formData['3'] = education
		}
		sessionStorage.setItem(storedPageId,JSON.stringify(formData))

	}
	else if(storedPageId =='page-3'){
		var numberItem = pages.sidebarPage.split('-')[1]
		var input = document.getElementsByClassName('page3__list_'+numberItem)

		var formData = {}
		for(var i=0;i<input.length;i++){
			if(input[i].checked == true)
				formData[i] = input[i].value
		}

		sessionStorage.setItem(storedPageId,JSON.stringify(formData))
	}
	else if(storedPageId == 'page-4'){

		var textbox = document.getElementsByClassName('page4__items_text')
		var textboxData = {}
		for(var i=0;i<textbox.length;i++){
			textboxData[i] = textbox[i].value
		}
		sessionStorage.setItem(storedPageId,JSON.stringify(textboxData))
	}
}

function fetchItems(pageId,flag){
	if(pageId == 'page-1')
		page1_load()
	else if(pageId == 'page-2')
		page2_load()

	if(pageId == 'page-1' && sessionStorage.getItem(pageId)!=null){
		var fetchObject = JSON.parse(sessionStorage.getItem(pageId))
		
		var form  = document.forms[pageId+'_form'].elements
		var j = 0
		for(var i=0;i<form.length;i++){

			if(form[i].type == 'radio' && form[i].value == fetchObject[j]){
				// console.log("in radio "+fetchObject.formData[j])
				form[i].checked = true
				j++
			}
			
			else if(form[i].type != 'radio'){
					form[i].value = fetchObject[j]

				j++
			}
		}

	}
	if((pageId == 'page-2' || flag==1) && sessionStorage.getItem('page-2')!=null){
		var fetchObject = JSON.parse(sessionStorage.getItem('page-2'))
		var form  = document.forms['page-2_form'].elements
		form[0].value = fetchObject['0']
		form[1].value = fetchObject['1']

		var count = Object.keys(fetchObject['2']).length
		var count_edu = Object.keys(fetchObject['3']).length
		if(flag ==1){
			if(count > 1)
			{
				for(var i =0;i<count-1;i++){
					createWorkHistory()
				}
			}

			if(count_edu > 1){
				for(var i =0;i<count_edu-1;i++){
					createEducation()
				}	
			}
		}

		var formIndex = 2
		for(var i =0;i<count;i++){
			for(var j=0;j<3;j++){
				if(form[formIndex]!=null){
					form[formIndex].value = fetchObject['2'][i][j]
					formIndex++
				}
			}
		}
		for(var i =0;i<count_edu;i++){
			for(var j=0;j<3;j++){
				if(form[formIndex]!=null){
					form[formIndex].value = fetchObject['3'][i][j]
					formIndex++
				}
			}
		}
		
	}
	if(pageId == 'page-3' && sessionStorage.getItem(pageId)!=null){
		var fetchObject = JSON.parse(sessionStorage.getItem(pageId))
		var numberItem = pages.sidebarPage.split('-')[1]
		var input = document.getElementsByClassName('page3__list_'+numberItem)

		var keys = Object.keys(fetchObject)

		for(var i=0;i<keys.length;i++){
			input[keys[i]].checked = true
		}
	}
	if((pageId == 'page-4' || flag==1) && sessionStorage.getItem('page-4')!=null) {
		console.log("fetching page 4")
		var textbox = document.getElementsByClassName('page4__items_text')
		var fetchObject = JSON.parse(sessionStorage.getItem('page-4'))
		console.log(fetchObject)
		for(var i=0;i<textbox.length;i++){
			textbox[i].value = fetchObject[i]	
		}
		checkEmpty()
	}
	
}