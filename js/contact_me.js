// Contact Form Scripts

$(function() {

    $("#gform input,#gform textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            var name = $('input[name="entry.833710143"]').val();
            var email = $('input[name="entry.1376413320"]').val();
            var message = $('textarea[name="entry.752045271"]').val();
            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }
			
            $.ajax({
                url: "https://docs.google.com/forms/d/e/1FAIpQLSc-ENYyT8tL53oSxCMH8al-h2ObLuhYf45QFrdimuDlCKJN_g/formResponse",
                data: {"entry.833710143" : name, "entry.1376413320" : email, "entry.752045271" : message},
				type: "POST",
				dataType: "html",
				statusCode: {
					0: function() {
						// Success message
						$('div[id="success"]').html("<div class='alert alert-success'>");
						$('div[id="success"] > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
							.append("</button>");
						$('div[id="success"] > .alert-success')
							.append("<strong>Your message has been sent. </strong>");
						$('div[id="success"] > .alert-success')
							.append('</div>');

						//clear all fields
						$('#gform').trigger("reset");
					},
					200: function() {
						// Fail message
						$('div[id="success"]').html("<div class='alert alert-danger'>");
						$('div[id="success"] > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
							.append("</button>");
						$('div[id="success"] > .alert-danger').append("<strong>Sorry " + firstName + ", there was an error sending the e-mail. Please try again!");
						$('div[id="success"] > .alert-danger').append('</div>');
						//clear all fields
						$('#gform').trigger("reset");
					}
				}
            });
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});


/*When clicking on Full hide fail/success boxes */
$('input[name="entry.833710143"]').focus(function() {
    $('div[id="success"]').html('');
});
