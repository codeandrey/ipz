$(document).ready(function(){
	var room = 1;
	var kved=1;
	
	//Оочислення частки внеску 
	$('input[name="TOTAL_UAH"], input[name="SHAREUAH"]').keyup(function() {
		var total_uah = $('input[name="TOTAL_UAH"]').val();
		var shareuah = $('input[name="SHAREUAH"]').val();
		if (shareuah<=total_uah){
			$('input[name="SHARE"]').val(shareuah/total_uah*100);
		}
	});
	// add tabs  element 
   	$('.add-tabs').click(function() {
   		event.preventDefault();
		var clone = $('#shareholders0').clone('.tab-pane').removeClass('active');
		var  el_id= 'shareholders0';//$('.tab-pane').attr('id');
			el_id= el_id.substring(0, el_id.length - 1)+room;
			clone.attr('id',el_id);
			clone.find('input').each(function(){
				$(this.value='');
			});
			$('.tab-pane > .tab-content').append(clone);
		   	$('#sub__tabs > .nav-tabs').append('<li class="tabs__item"><a class="tabs__item--link" href="#'+el_id+'") data-toggle="tab">Учасник </a></li>');
		   	room++;
		});

 	// del tabs  element 
	$('.del-tabs').click(function() {
		event.preventDefault();
   		if (($('#sub__tabs .tabs__item').length)>1) {
 		 	$('#tab__shareholders .tab-pane').last().remove();
 		 	$('#sub__tabs .tabs__item').last().remove();
 		 	$('#sub__tabs .tabs__item').first().addClass('acvive');
 		 	$('#tab__shareholders .tab-pane').first().addClass('acvive');
 		}
	});

	//add kved
	$('.add-kved').click(function() {
		event.preventDefault();
		var clone= $('#kvedlist0').first().clone('.table-kved');
		var  el_id= 'kvedlist0';//$('.tab-pane').attr('id');
		el_id= el_id.substring(0, el_id.length - 1)+kved;
		clone.attr('id',el_id);
		console.log(clone);
		clone.find('input').each(function(){
			$(this.value='');
		});
		$('#tab__kvedlist').append(clone);
	   	kved++;
	});

	// del kved
	$('.del-kved').click(function() {
		event.preventDefault();
		var el = $('.table-kved').last();
   		if (($('.table-kved').length)>1) {
 		 	el.remove();
 		}
	});

	// add input
	$('.add').click(function(event) {
		event.preventDefault();
		var el_clone = $(this).parent().parent().find('.form-control').first().clone('.form-control');
		var str = el_clone.attr('name');
		str = str + ($(this).parent().parent().find('.form-control').length);
		el_clone.attr('name', str);
		$(this).parent().parent().find('.input-group').append(el_clone);
	});

	//del input
	$('.del').click(function(event) {
		event.preventDefault();
		var el = $(this).parent().parent().find('.form-control').last();
   		if (($(this).parent().parent().find('.form-control').length)>1) {
 		 	el.remove();
 		}
	});

	// submit form
 	$(".btn-success.submit").click(function() {
		event.preventDefault();
		var  	error = false,
				data__array = {},	
			shareholders__array={},
			kvedlist__array= {},
			formMessages = $("#msg");
		var conunt_shareholders=0;	
		var conunt_kved = 0;
		var  id_form= document.getElementById("form-main");
		var  fields =  id_form.querySelectorAll("fieldset");
		var  elements = fields;

			for( var i = 0; i < elements.length; ++i ) {
				var element = elements[i].querySelectorAll("input, select");

				if (/^company/.test(elements[i].id)){
					$.each(element, function (index, el) {
						//if (el.value==""){
						//		error=true;
						//}else{
							data__array[el.name]=el.value;
							
						//}
					});

				}

				if(/^shareholders/.test(elements[i].id)){
					var arr2={};
					var wk_el2= elements[i].querySelectorAll("input, select");
					$.each(wk_el2, function (index, el) {
						//if (el.value==""){
						//		error=true;
						//}else{
							arr2[el.name]=el.value;
							shareholders__array[conunt_shareholders]=arr2;
						//}
					});
					conunt_shareholders++;
				}
				if ((/^kvedlist/.test(elements[i].id)){
					var arr1={};
					var wk_el1= elements[i].querySelectorAll("input, select");
					$.each(wk_el1, function (index, el) {
						//if (el.value==""){
						//		error=true;
						//}else{
							arr1[el.name]=el.value;
							kvedlist__array[conunt_kved]=arr1;
						//}
					});
					conunt_kved++;
				}

			}
		data__array['shareholders']=shareholders__array;
		data__array['kvedlist']=kvedlist__array;
		console.log(data__array);
		alert(JSON.stringify(data__array));
		//vadli form
		if (!error) { 
			$.ajax({
				type:'POST',
				url:"ajax_send.php",
				data: data__array,
				dataType: 'json',
				   success: function(data){
        					console.log(data);
					$(formMessages).removeClass('error');
					$(formMessages).addClass('success');
					$(formMessages).delay(2000).fadeOut('slow');
					
				},
				error: function(XMLHttpRequest, statusText, errorThrown){
					console.log(XMLHttpRequest, statusText);   
				}
			});
		}
		else{
			$(formMessages).removeClass('success');
			$(formMessages).addClass('error');
			$(formMessages).html('Поля не заполнены').fadeIn('slow');
			$(formMessages).delay(3000).fadeOut('slow');
		}
		
	});

});
