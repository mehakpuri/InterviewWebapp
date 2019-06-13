// this function is used to add options to the select tag
function addOptions() {
	var startFrom = 1900;
	var endFrom = new Date().getFullYear();
	var options = "";
	
	for(var year = endFrom ; year >= startFrom; year--){
  		options += "<option value="+year+">"+ year +"</option>";
	}
	return options
}

// this function is called when page 1 is loaded
function page1_load() {
	console.log("in page 1 on load")
	var start = 1900;
	var end = new Date().getFullYear() + 4;
	var options = "";
	if(sessionStorage.getItem('page-1') == null)
		options += "<option disabled selected value=''> Graduation Date </option>"
	for(var year = end ; year >=start; year--){
  		options += "<option value="+year+">"+ year +"</option>";
	}

	document.getElementById("graduation").innerHTML = options;
}

// this function is called when page 2 is loaded
function page2_load(){
	console.log("page 2 load ")
	var options = addOptions()
	document.getElementById("active-from").innerHTML += options;
	document.getElementById("active-to").innerHTML += options;
	document.getElementById("enrolled").innerHTML += options;
	document.getElementById("graduated").innerHTML += options;
}

// this function creates new select dropdown for Work History field
function createWorkHistory(){
	console.log("creating")
	var job = document.getElementById('add-job') 
	job.appendChild(document.createElement('br'))
	var input = document.createElement('input')
	input.className = 'input_extra'
	// input.id = 'work-history'
	input.type = 'text'
	input.name = 'history'
	job.appendChild(input)
	job.appendChild(document.createElement('br'))
	var selectFirst = document.createElement('select')
	selectFirst.className = 'dropdown'
	selectFirst.id = 'active-from'
	selectFirst.name = 'active-from'

	var optionsList = addOptions()
	var option = "<option selected disabled value=''> Active From </option"
	selectFirst.innerHTML += option
	selectFirst.innerHTML += optionsList
	job.appendChild(selectFirst)

	var selectSecond = document.createElement('select')
	selectSecond.className = 'dropdown'
	selectSecond.id = 'active-to'
	selectSecond.name = 'active-to'

	var option = "<option selected disabled value=''> Active To </option"
	selectSecond.innerHTML += option
	selectSecond.innerHTML += optionsList
	job.appendChild(selectSecond)
}

// this function creates new select dropdown for Education field
function createEducation(){
	var education = document.getElementById('add-education') 
	education.appendChild(document.createElement('br'))
	var input = document.createElement('input')
	input.className = 'input_extra'
	
	input.type = 'text'
	input.name = 'education'
	education.appendChild(input)
	education.appendChild(document.createElement('br'))
	var selectFirst = document.createElement('select')
	selectFirst.className = 'dropdown'
	selectFirst.id = 'enrolled'
	selectFirst.name = 'enrolled'

	var optionsList = addOptions()
	var option = "<option disabled selected value=''> Enrolled </option"
	selectFirst.innerHTML += option
	selectFirst.innerHTML += optionsList
	education.appendChild(selectFirst)

	var selectSecond = document.createElement('select')
	selectSecond.className = 'dropdown'
	selectSecond.id = 'graduated'
	selectSecond.name = 'graduated'

	var option = "<option disabled selected value=''> Graduated </option"
	selectSecond.innerHTML += option
	selectSecond.innerHTML += optionsList
	education.appendChild(selectSecond)
}
