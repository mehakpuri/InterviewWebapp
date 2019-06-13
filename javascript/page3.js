function page3_visibility(e){
	console.log(e)
	var listNumber = e.split('-')[1]
	
	var itemPage = "page3-"+listNumber
	for(var i=1;i<4;i++){
		var page = "page3-"+i
		if(page == itemPage)
			document.getElementById(itemPage).style.display = 'flex'
		else
			document.getElementById(page).style.display = 'none'
	}

	var sidebarItem = 'sidebar-'+listNumber
	for(var i=1;i<4;i++){
		var temp = 'sidebar-'+i
		if(sidebarItem == temp ){
			document.getElementById(sidebarItem).style.borderLeft = '4px solid orange'
			document.getElementById(sidebarItem).style.backgroundColor = 'white'
		}
		else{
			document.getElementById(temp).style.borderLeft = 'none'
			document.getElementById(temp).style.backgroundColor = '#f1f1f1'
		}
	}

}
