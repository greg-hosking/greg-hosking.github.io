$(document).ready(function () {
    $("form").submit(function (event) {
        event.preventDefault();

        const url =
            "https://6o5fnahh6c.execute-api.us-east-1.amazonaws.com/default/greg-hosking-github-io-lambda";

        // TO DO: Validate and sanitize input
        let name = $("#name").val();
        let email = $("#email").val();
        let message = $("#message").val();

        const data = {
            name: name,
            email: email,
            message: message,
        };

        $.ajax({
            url: url,
            type: "POST",
            data: JSON.stringify(data),
            contentType: "application/json",
            dataType: "json",
            // TO DO: Add success and error handling
            success: function (response) {
                console.log("Response:", response);
            },
            error: function (err) {
                console.log("Error:", err);
            },
        });
    });
});
