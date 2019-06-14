var form = document.forms[pages.content + '_form'].elements
	if(form!=null){
		for(var i =0;i<form.length;i++){
			form[i].onchange = checkForm
		}
	}


function checkForm(e) {
	console.log(e.target.id)
}