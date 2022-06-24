async function newToken() {
    fetch("/token")
      .then(response => response.json())
      .then(data => {
        $( "#newTokenResult" ).empty().append( data["message"] );
    });
}

$( "#validateForm" ).submit(function( event ) {
    event.preventDefault();
    var $form = $( this ),
      term = $form.find( "input[name='token']" ).val(),
      url = $form.attr( "action" );
    var posting = $.ajax({
        type: "POST",
        url: "/validate",
        data: JSON.stringify({ token: term }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
            $( "#validationResult" ).empty().append( data["message"] );
        },
        error: function(errMsg) {
        alert(errMsg);
        }
    });
});
$( "#whitelistForm" ).submit(function( event ) {
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
            $( "#whitelistResult" ).empty().append( data["message"] );
        },
        error: function(errMsg) {
        alert(errMsg);
        }
    });
});
$( "#reportForm" ).submit(function( event ) {
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
            $( "#reportResult" ).empty().append( data["message"] );
        },
        error: function(errMsg) {
        alert(errMsg);
        }
    });
});