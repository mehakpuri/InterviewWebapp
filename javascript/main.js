var pages = { buttonId: 'button-1', prev: false, next: true, content: 'page-1', sidebarPage: 'sidebar-1', question: 'ques-link-1' }
bodyPages = []
headerButtons = []

// this function checks the visibility of various components present on the web page
function checkVisibility(flag) {
if(flag == 0){
		if(pages.buttonId == 'button-5'){
			pages.prev = false
			pages.next = false
			document.getElementById('button-submit').style.display = 'none'
		}
		else if(pages.buttonId == 'button-1'){
			pages.prev = false
			pages.next = true
			document.getElementById('button-submit').style.display = 'none'
		}
		else if(pages.buttonId == 'button-4'){
			pages.prev = true
			pages.next = false
			document.getElementById('button-submit').style.display = 'block'
		}
		else{
			pages.prev = true
			pages.next = true
			document.getElementById('button-submit').style.display = 'none'
		}

		if(pages.prev == false)
			document.getElementById("button-previous").style.display= "none"
		else
			document.getElementById("button-previous").style.display= "block"
		if(pages.next == false)
			document.getElementById("button-next").style.display= "none"
		else
			document.getElementById("button-next").style.display= "block"
	
		console.log(pages.content)
		for(var j=0;j<bodyPages.length;j++){
			if(bodyPages[j].id == pages.content){
				console.log("YES")
				document.getElementById(bodyPages[j].id).style.display = 'block'
				}
			else
				document.getElementById(bodyPages[j].id).style.display = 'none'
			}

	if(pages.buttonId != 'button-5'){
		for(var i =0; i<headerButtons.length;i++){
			if(headerButtons[i].id == pages.buttonId){
				document.getElementById(pages.buttonId).style.backgroundColor = "orange"
				document.getElementById(pages.buttonId).style.color = 'white'
				document.getElementById(headerButtons[i].id).innerHTML = pages.buttonId.split('-')[1]
			}
			else{
				document.getElementById(headerButtons[i].id).style.color = 'orange'
				if(headerButtons[i].id.split('-')[1]<pages.buttonId.split('-')[1]){

					document.getElementById(headerButtons[i].id).innerHTML = "&#10003;"
					document.getElementById(headerButtons[i].id).style.backgroundColor = "white"
				}
				else{
					document.getElementById(headerButtons[i].id).innerHTML = i+1
					document.getElementById(headerButtons[i].id).style.backgroundColor = "white"
				}
				}
			}
			document.getElementById('buttons-container').style.display = 'flex'
			document.getElementById('header-container').style.display = 'block'
		}
		else{
			// console.log("IN HERE")
			document.getElementById('buttons-container').style.display = 'none'
			document.getElementById('header-container').style.display = 'none'
			console.log(bodyPages)
		}
		
	}
}
	
window.onload= function() {
	var buttons = document.querySelectorAll('button')
	headerButtons = document.getElementsByClassName('buttons__container_wrapper_button')

	var allPages = document.getElementsByClassName('body__container_wrapper_page')

	this.bodyPages = allPages

	

	// checking if session storage contains elements
	var btn = sessionStorage.getItem('buttonId')
	if(btn!=null){
		pages.buttonId = btn
		pages.content = 'page-'+btn.split('-')[1]
	}
	var sidebar = sessionStorage.getItem('sidebarPage')
	if(sidebar!=null){
		pages.sidebarPage = sidebar
		
	}
	page3_visibility(pages.sidebarPage)

	var question = sessionStorage.getItem('question')
	if(question!=null){
		pages.question = question
		
	}
	page4_visibility(pages.question)
	
	for(var i=0;i<buttons.length;i++){
		buttons[i].onclick = handleClick 
	}

	// click events on buttons and links of different pages
	var links = document.getElementsByClassName('page2__form_link')
	for(var i =0 ;i<links.length;i++){
		links[i].onclick = handleClick
	}
	var list_page3 = document.getElementsByClassName('page3__items_link')
	for(var i =0;i<list_page3.length;i++){
		list_page3[i].onclick = handleClick
	}
	var list_page4 = document.getElementsByClassName('page4__items_link')
	for(var i =0;i<list_page4.length;i++){
		list_page4[i].onclick = handleClick
	}
	var list_buttons = document.getElementsByClassName('page4_buttons')

	for(var i =0;i<list_buttons.length;i++){
		list_buttons[i].onclick = handleClick
	}
	
	change()
	fetchItems(pages.content,1)
	checkVisibility(0)

}

// this function handles all the click events in this whole application
function handleClick(e) {
	if(e.target.id == "button-previous"){

		var storedPageId = pages.content
		var buttonIdName = pages.buttonId.split('-')
		var value = parseInt(buttonIdName[1]) - 1
		pages.buttonId = 'button-'+value
		flag = 0;
		var pageName = pages.content.split('-')
		var value = parseInt(pageName[1]) - 1
		pages.content = 'page-'+value

		var name = storedPageId + '_form'
		var form = document.forms[name]
					
		saveValues(form,storedPageId)
		fetchItems(pages.content,0)
		change()
	}
	else if(e.target.id == "button-next"){
		var flag = submitForm(pages.content)
		// var flag = 0
		if(flag==0){
			
			console.log("flag is zero")
			var storedPageId = pages.content
			var buttonIdName = pages.buttonId.split('-')
			var value = parseInt(buttonIdName[1]) + 1
			pages.buttonId = 'button-'+value
			var pageName = pages.content.split('-')
			var value = parseInt(pageName[1]) + 1
			pages.content = 'page-'+value

			var name = storedPageId + '_form'
			var form  = document.forms[name]
			saveValues(form,storedPageId)
			fetchItems(pages.content,0)
			change()
		}
		
	}
	else if(e.target.id == "button-submit"){
		saveValues(null,pages.content)

		alert("Your form is successfully submitted")

		pages.content = 'page-5'
		pages.buttonId = 'button-5'
		flag = 0
		console.log(sessionStorage)
		sessionStorage.clear()

	}
	else if(e.target.id == 'button-home'){
		pages.content = 'page-1'
		pages.buttonId = 'button-1'
		flag = 0
	}
	else if(e.target.id == 'link-job'){
		createWorkHistory()
	}
	else if(e.target.id == 'link-education') {
		createEducation()
	}
	else if(e.target.className == 'page3__items_link') {
		var listNumber = e.target.id.split('-')[1]
		sessionStorage.setItem('sidebarPage','sidebar-'+listNumber)
		pages.sidebarPage = 'sidebar-'+listNumber
		page3_visibility(e.target.id)	
	}
	else if(e.target.className == 'page4__items_link') {
		var listNumber = e.target.id.split('-')[2]
		sessionStorage.setItem('question','ques-link-'+listNumber)
		pages.question = 'ques-link-'+listNumber
		page4_visibility(e.target.id)	
	}
	else if(e.target.className == 'page4_buttons'){
		if(e.target.id == 'page4-button-next'){
			var quesNumber = parseInt(pages.question.split('-')[2]) + 1

			pages.question = 'ques-link-'+quesNumber
			page4_visibility(pages.question)
		}
		else{
			var quesNumber = parseInt(pages.question.split('-')[2]) - 1
			pages.question = 'ques-link-'+quesNumber
			page4_visibility(pages.question)	
		}
	}
	else{
		var jumpTo = e.target.id.split('-')[1]
		var present = pages.buttonId.split('-')[1]

		var value = parseInt(present) + 1
		if(jumpTo > value)
			alert("You cannot jump directly to that page")
		else{
			var flag = submitForm(pages.content)

			if(flag == 0){
				var storedPageId = pages.content
				pages.buttonId = e.target.id
				pages.content = 'page-'+jumpTo

				var name = storedPageId + '_form'
				var form  = document.forms[name]
				saveValues(form,storedPageId)
				fetchItems(pages.content,0)
			}
		}
		
	}

	sessionStorage.setItem('buttonId',pages.buttonId)

	var value = pages.buttonId.split('-')[1]
	pages.content = 'page-'+value

	
	checkVisibility(flag)


}

