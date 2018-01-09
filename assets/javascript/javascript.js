$(document).ready(function() {

    // ======================================== GIF TOPICS ======================================== //
    // Initial array of gif topics - new topics will be pushed onto the end of this array
    var gifTopics = ["No", "Deal With It", "Barack Obama", "Neil Degrasse Tyson", "Sloth", "Pug", "Cat", "Fail"];


    // ======================================== DISPLAYS GIF TOPICS ARRAY AS BUTTONS  ======================================== //

    function displayGifButtons() {

        // Clearout the div for new items
        $("#gifButtonsView").empty();

        // Looping though gifTopics
        for (var i = 0; i < gifTopics.length; i++) {

            // Variable to store new buttons
            // Adds classes and custom attributes to newGifButton
            // Appends gifButtons to gifButtonsView
            var gifButton = $("<button>");
            gifButton.addClass("newGifButton btn btn-primary");
            gifButton.attr("data-name", gifTopics[i]);
            gifButton.text(gifTopics[i]);
            $("#gifButtonsView").append(gifButton);
        }
    }


    // ======================================== FUNCTION TO ADD NEW GIF BUTTON ======================================== //
    function addNewButton() {

        // When button is clicked...
        $("#newGif").on("click", function() {

            // Fetches value from input box
            var newGifButton = $("#newGifButton-input").val().trim();

            // No text input?  Then no button for you.
            if (newGifButton == "") {
                return false;
            }

            // Appends new element to gifTopic array
            gifTopics.push(newGifButton);

            // Runs function to display new button
            displayGifButtons();
            return false;

            // Resets input box value
            $("#newGifButton-input").val("");
        });
    }


    // ======================================== DISPLAYS GIFS RETURNED FROM GIPHY ======================================== //
    function displayGifs() {

        var newGifButton = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + newGifButton + "&api_key=dSItiArtnJnekRZUwXqiIgPni0BVbLxc&limit=12";

        // Prints contructed URL
        console.log(queryURL);

        // Picks up the phone and calls your boy AJAX
        $.ajax({
            url: queryURL,
            method: 'GET'
        })

        // AJAX response
        .done(function(response) {

            // Prints AJAX response
            console.log(response);

            // Clearout the div for new GIF items
            $("#gifsViewPanel").empty();

            // Variable to store GIPHY results
            var results = response.data;

            // If GIPHY returns null results, then no GIF for you!
            if (results === "") {
                alert("No GIF for you!");
            }

            // Looping through GIPHY response results (limited to 12 in queryURL)
            for (var i = 0; i < results.length; i++) {

                // Creates a div to hold GIF image
                // Assigns class gifDiv to image div
                var gifDiv = $("<div>");
                gifDiv.addClass("gifDiv");

                // Variable to store ratings data returned from GIPHY
                // Appends ratings data to the new GIPHY Image
                var gifRating = $("<p>").text("Rating: " + results[i].rating);
                gifDiv.append(gifRating);

                // Variable to store GIF image
                // Displays still GIF image of GIPHY results
                // Stores location of still and animated version of GIF
                // Sets initial image state as "still" and adds class of "image"
                // Appends gifImage to image div
                var gifImage = $("<img>");
                gifImage.attr("src", results[i].images.fixed_height_small_still.url);
                gifImage.attr("data-still", results[i].images.fixed_height_small_still.url);
                gifImage.attr("data-animate", results[i].images.fixed_height_small.url);
                gifImage.attr("data-state", "still");
                gifImage.addClass("image");
                gifDiv.append(gifImage);

                // Displays GIF image in GIPHY results panel
                $("#gifsViewPanel").prepend(gifDiv);
            }
        });
    }

    // ======================================== DISPLAYS INITIAL LIST OF GIF TOPIC BUTTONS ======================================== //
    displayGifButtons();


    // ======================================== CREATES NEW GIF BUTTON ======================================== //
    addNewButton();


    // ========================================  CLICK EVENT LISTENERS FOR BUTTONS AND GIFS ======================================== //

    $(document).on("click", ".newGifButton", displayGifs)

    $(document).on("click", ".image", function() {

        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    });
});