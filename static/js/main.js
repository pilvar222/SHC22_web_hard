$( "#newWhitelistForm" ).submit(function( event ) {
    event.preventDefault();
    var $form = $( this ),
      tokenTerm = $form.find( "input[name='token']" ).val(),
      addressTerm = $form.find( "input[name='address']" ).val(),
      url = $form.attr( "action" );
    var posting = $.ajax({
        type: "POST",
        url: "/whitelistIp",
        data: JSON.stringify({ token: tokenTerm, address: addressTerm }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
            $( "#newWhitelistResult" ).empty().append( data["message"] );
        },
        error: function(errMsg) {
        alert(errMsg);
        }
    });
});
$( "#oldWhitelistForm" ).submit(function( event ) {
    event.preventDefault();
    var $form = $( this ),
      tokenTerm = $form.find( "input[name='token']" ).val(),
      addressTerm = $form.find( "input[name='address']" ).val(),
      url = $form.attr( "action" );
    var posting = $.ajax({
        type: "POST",
        url: "/whitelistIp",
        data: JSON.stringify({ token: tokenTerm, address: addressTerm }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
            $( "#oldWhitelistResult" ).empty().append( data["message"] );
        },
        error: function(errMsg) {
        alert(errMsg);
        }
    });
});
$( "#oldReportForm" ).submit(function( event ) {
    event.preventDefault();
    var $form = $( this ),
      urlTerm = $form.find( "input[name='url']" ).val(),
      url = $form.attr( "action" );
    var posting = $.ajax({
        type: "POST",
        url: "/report",
        data: JSON.stringify({ url: urlTerm }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
            $( "#oldReportResult" ).empty().append( data["message"] );
        },
        error: function(errMsg) {
        alert(errMsg);
        }
    });
});
$( "#newReportForm" ).submit(function( event ) {
    event.preventDefault();
    var $form = $( this ),
      urlTerm = $form.find( "input[name='url']" ).val(),
      url = $form.attr( "action" );
    var posting = $.ajax({
        type: "POST",
        url: "/report",
        data: JSON.stringify({ url: urlTerm }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
            $( "#newReportResult" ).empty().append( data["message"] );
        },
        error: function(errMsg) {
        alert(errMsg);
        }
    });
});