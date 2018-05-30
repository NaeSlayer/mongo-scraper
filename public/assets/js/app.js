// Grab the articles as a json
$.getJSON("/articles", function (data) {

    // For each one
    for (var i = 0; i < data.length; i++) {
        // console.log("Articles: ", data[i]);

        // Display the apropos information on the main page
        $("#article-container").append("<div class='panel panel-default'> <div class='panel-heading'> <h3><a class='article-link' target='_blank' href='" + data[i].link + "' data-id='" + data[i]._id + "'>" + data[i].title + "</a> <a class='btn btn-danger save' data-id='" + data[i]._id + "'> Save Article</a> </h3></div><div class='panel-body'>Article Summar</div></div>")

        // Display the apropos information on the Saved Articles page
        // $("#saved-article-container").append("<div class='panel panel-default'> <div class='panel-heading'> <h3><a class='article-link' target='_blank' href='" + data[i].link + "' data-id='" + data[i]._id + "'>" + data[i].title + "</a> <a class='btn btn-danger delete'> Delete from Saved</a> <a class='btn btn-info notes'>Article Notes</a></h3></div><div class='panel-body'>Article Summary</div></div>")



        $("#articles").append("<div class= articleDiv> <p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p> </div>");
    }
});

// click event for 'Scrape Articles' button
$(".scrape-new").on("click", function () {
    $.ajax("/scrape", {
        type: "GET",
        // data: newTask
    }).then(function () {
        console.log("You've added a task!");
        location.reload();
    });
})
var savedArticles = [];
// click event to save an article
$(document).on("click", ".save", function () {

    // alert("you clicked on save");
    var thisId = $(this).attr("data-id");
    console.log(thisId);

    // Now make an ajax call for the Article
    $.ajax({
            method: "GET",
            url: "/articles/" + thisId
        })
        //  With that done, add the article to savedArticles
        .then(function (data) {
            console.log(data);
        });
})


// Whenever someone clicks a p tag
$(document).on("click", "p", function () {
    // Empty the notes from the note section
    // $("#notes").empty();
    // Save the id from the p tag
    var thisId = $(this).attr("data-id");

    // Now make an ajax call for the Article
    $.ajax({
            method: "GET",
            url: "/articles/" + thisId
        })
        // With that done, add the note information to the page
        .then(function (data) {
            console.log(data);
            // The title of the article
            // $("#notes").append("<h2>" + data.title + "</h2>");
            // // An input to enter a new title
            // $("#notes").append("<input id='titleinput' name='title' >");
            // // A textarea to add a new note body
            // $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
            // // A button to submit a new note, with the id of the article saved to it
            // $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

            // // If there's a note in the article
            // // This section displays the note when you click on the article, need to figure out how to store multiple notes and display the title of each with buttons to edit/delete/view note
            // if (data.note) {
            //     // Place the title of the note in the title input
            //     $("#titleinput").val(data.note.title);
            //     // Place the body of the note in the body textarea
            //     $("#bodyinput").val(data.note.body);
            // }
        });
});

// When you click the savenote button
$(document).on("click", "#savenote", function () {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");

    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
            method: "POST",
            url: "/articles/" + thisId,
            data: {
                // Value taken from title input
                title: $("#titleinput").val(),
                // Value taken from note textarea
                body: $("#bodyinput").val()
            }
        })
        // With that done
        .then(function (data) {
            // Log the response
            console.log(data);
            // Empty the notes section
            $("#notes").empty();
        });

    // Also, remove the values entered in the input and textarea for note entry
    $("#titleinput").val("");
    $("#bodyinput").val("");
});