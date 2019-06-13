var textbox = document.getElementsByClassName('page4__items_text')

function page4_visibility(e){
	console.log("in page 4 page4_visibility")
	// console.log(e)
	var listNumber = e.split('-')[2]
	
	var quesPage = "page4-"+listNumber
	for(var i=1;i<5;i++){
		var page = "page4-"+i
		if(page == quesPage)
			document.getElementById(quesPage).style.display = 'block'
		else
			document.getElementById(page).style.display = 'none'
	}

	var ques = 'ques-link-'+listNumber
	var tick = 'ques-tick-'+listNumber
	for(var i=1;i<5;i++){
		var temp_ques = 'ques-link-'+i
		var temp_tick = 'ques-tick-'+i
		if(ques == temp_ques ){
			document.getElementById(temp_ques).style.color = 'black'
			document.getElementById(temp_ques).style.fontWeight = 'bold'	
		}
		else{
			document.getElementById(temp_ques).style.color = 'grey'
			document.getElementById(temp_ques).style.fontWeight = 'normal'
		}
	}

	if(e == 'ques-link-1')
		document.getElementById('page4-button-prev').style.display = 'none'
	else
		document.getElementById('page4-button-prev').style.display = 'block'

	if(e == 'ques-link-4')
		document.getElementById('page4-button-next').style.display = 'none'
	else
		document.getElementById('page4-button-next').style.display = 'block'


	checkEmpty()

	for(var i =0;i<textbox.length;i++){
		textbox[i].onkeyup = checkEmpty
		textbox[i].onblur = checkEmpty
	}
	
	

}
function checkEmpty() {
	var empty = 0
	for(var i =0;i<textbox.length;i++){
		var number = i+1
		var tick = 'ques-tick-'+number
		if(textbox[i].value == ''){
			empty = 1
			document.getElementById(tick).style.color = 'grey'
			//break;
		}
		else{
			document.getElementById(tick).style.color = 'orange'
		}
	}
	console.log(empty)
	if(empty == 1){
		document.getElementById('button-submit').disabled = true
		document.getElementById('button-submit').style.backgroundColor = 'lightgreen'
	}
	else{

		document.getElementById('button-submit').disabled = false
		document.getElementById('button-submit').style.backgroundColor = '#00a900'
	}
}
