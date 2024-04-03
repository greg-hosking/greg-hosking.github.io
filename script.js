$(document).ready(function () {
    const $formSuccessMessage = $("#form-success-message");
    const $formErrorMessage = $("#form-error-message");
    const $name = $("#name");
    const $email = $("#email");
    const $message = $("#message");
    const maxMessageLength = 500;
    const $messageRemainingChars = $("#message-remaining-chars");
    const $sendMessageButton = $("#send-message-button");

    $("input, textarea").on("input", function () {
        $formSuccessMessage.hide();
        $formErrorMessage.hide();
    });

    $name.on("input", function () {
        $("#name-error").hide();
        $name.removeClass("error");
    });

    $email.on("input", function () {
        $("#email-error").hide();
        $email.removeClass("error");
    });

    $message.on("input", function () {
        $("#message-error").hide();
        $message.removeClass("error");

        const remaining = maxMessageLength - $message.val().length;
        $messageRemainingChars
            .text(remaining)
            .css("color", remaining < 0 ? "#d32f2f" : "white");
    });

    $("form").submit(function (event) {
        event.preventDefault();

        let error = false;
        function validateField(field, errorType, errorMessage) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (
                !field.val().trim() ||
                (errorType === "email" && !emailRegex.test(field.val()))
            ) {
                field.addClass("error");
                $("#" + field.attr("id") + "-error")
                    .text(errorMessage)
                    .show();
                error = true;
            }
        }
        validateField($name, "text", "Please provide a name");
        validateField($email, "email", "Please provide a valid email address");
        validateField($message, "text", "Please provide a message");
        if ($message.val().length > maxMessageLength) {
            $message.addClass("error");
            $("#message-error")
                .text("Please provide a message less than 500 characters")
                .show();
            error = true;
        }
        if (error) {
            return;
        }

        $sendMessageButton.prop("disabled", true).val("Sending...");
        $.ajax({
            url: "https://6o5fnahh6c.execute-api.us-east-1.amazonaws.com/default/greg-hosking-github-io-lambda",
            type: "POST",
            data: JSON.stringify({
                name: $name.val(),
                email: $email.val(),
                message: $message.val(),
            }),
            contentType: "application/json",
            dataType: "json",
            success: function (response) {
                $sendMessageButton.prop("disabled", false).val("Send Message");
                if (response.statusCode === 200) {
                    $formSuccessMessage.show();
                    $name.val("");
                    $email.val("");
                    $message.val("");
                    $messageRemainingChars.text(maxMessageLength);
                } else {
                    $formErrorMessage.show();
                }
            },
            error: function () {
                $sendMessageButton.prop("disabled", false).val("Send Message");
                $formErrorMessage.show();
            },
        });
    });
});
