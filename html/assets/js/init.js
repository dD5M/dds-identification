$(document).ready(function(){
  // LUA listener
  window.addEventListener('message', function( event ) {
	if (event.data.action == 'open') {
	  var metadata	= event.data.metadata;
	  var type		= event.data.metadata.cardtype;
	  var sex		 = metadata.sex;
	  var mugshot	 = metadata.mugshoturl;
	  if ( type == 'identification' || type == null || type == "driver_license") {
		$('img').show();
		$('#name').css('color', '#282828');
		$('#fname').css('color', '#282828');
		if ( sex == 0 ) {
			$('#sex').text('m');
		  } else {
			$('#sex').text('f');
		  }
		$('img').attr('src', mugshot);
		$('#idnum').text(metadata.citizenid);
		$('#expiry').text(metadata.expireson);
		$('#name').text(metadata.lastName);
		$('#fname').text(metadata.firstName);
		$('#dob').text(metadata.dateofbirth);
		$('#nationality').text(metadata.nationality);
		$('#signature').text(metadata.firstName + ' ' + metadata.lastName);

		if ( type == 'driver_license' ) {
			$('#dstatus').text(metadata.driver);
			$('#bstatus').text(metadata.bike);
			$('#cstatus').text(metadata.cdl);

		  $('#id-card').css('background', 'url(assets/images/license.png)');
		} else {
		  $('#id-card').css('background', 'url(assets/images/idcard.png)');
		}
	  } else if ( type == 'hunting_license' ) {
		$('img').show();
		$('#idnum').text(metadata.citizenid);
		$('#name').css('color', '#282828');
		$('#fname').css('color', '#282828');
		if ( sex == 0 ) {
			$('#sex').text('m');
		  } else {
			$('#sex').text('f');
		  }
		$('img').attr('src', mugshot);
		$('#name').text(metadata.lastName);
		$('#fname').text(metadata.firstName);
		$('#dob').text(metadata.dateofbirth);
		$('#nationality').text(metadata.nationality);
		$('#signature').text(metadata.firstName + ' ' + metadata.lastName);
		$('img').attr('src', mugshot);
		$('#expiry').text(metadata.expireson);
		$('#id-card').css('background', 'url(assets/images/hunting.png)');
	  } else if ( type == 'firearms_license' ) {
		$('img').show();
		$('#idnum').text(metadata.citizenid);
		$('#name').css('color', '#282828');
		$('#fname').css('color', '#282828');
		if ( sex == 0 ) {
			$('#sex').text('m');
		  } else {
			$('#sex').text('f');
		  }
		$('img').attr('src', mugshot);
		$('#name').text(metadata.lastName);
		$('#fname').text(metadata.firstName);
		$('#dob').text(metadata.dateofbirth);
		$('#nationality').text(metadata.nationality);
		$('#weapon').text(metadata.weapon);
		$('#weapon2').text(metadata.weapon2);
		$('#signature').text(metadata.firstName + ' ' + metadata.lastName);
		$('img').attr('src', mugshot);
		$('#expiry').text(metadata.expireson);
		$('#id-card').css('background', 'url(assets/images/firearm.png)');
	  } else if ( type == 'pilot_license' ) {
		$('img').show();
		$('#idnum').text(metadata.citizenid);
		$('#name').css('color', '#282828');
		$('#fname').css('color', '#282828');
		if ( sex == 0 ) {
			$('#sex').text('m');
		  } else {
			$('#sex').text('f');
		  }
		$('img').attr('src', mugshot);
		$('#name').text(metadata.lastName);
		$('#fname').text(metadata.firstName);
		$('#dob').text(metadata.dateofbirth);
		$('#nationality').text(metadata.nationality);
		$('#pilot').text(metadata.pilot);
		$('#signature').text(metadata.firstName + ' ' + metadata.lastName);
		$('img').attr('src', mugshot);
		$('#expiry').text(metadata.expireson);
		$('#id-card').css('background', 'url(assets/images/pilot.png)');
	  } 

	  $('#id-card').show();
	} else if (event.data.action == 'close') {
	  $('#name').text('');
	  $('#fname').text('');
	  $('#dob').text('');
	  $('#nationality').text('');
	  $('#signature').text('');
	  $('#sex').text('');
	  $('#dstatus').text('');
	  $('#bstatus').text('');
	  $('#cstatus').text('');
	  $('#weapon').text('');
	  $('#weapon2').text('');
	  $('#pilot').text('');
	  $('#id-card').hide();
	}
  });
});
