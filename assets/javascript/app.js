$(document).ready(function(){

    //Global Var

     var addAnimal = "";
     var dupAnimal = false;
     var querySearch ="";
     //var APIKey = "gt3WAhSW7LVThPoJ1pnyx24eTcrqv2Iz";
     
     

//Array for starting buttons
     var animals = [
    "dog",
    "cat",
    "rabbit",
    "chicken",
    "frog",
    "goldfish",
    "bird",
    "skunk",
    "turtle",
    "hamster",
];
    //starting buttons
    createButtons();


    //creating buttons
    function createButtons() {
    $("#animal-buttons").empty();
    for (var i = 0; i < animals.length; i++) {
        var animalBtn = $("<button id=" + animals[i] + " type='button'>"+animals[i]+"</button>");
            //appending the buttons
        $("#animal-buttons").append(animalBtn);
        console.log(animalBtn);
    }
}

   

        $(document).on("click", "button", function(){

        let animal = $(this).attr("id");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=gt3WAhSW7LVThPoJ1pnyx24eTcrqv2Iz&limit=10&offset=0&rating=G&lang=en";

        console.log(animal);
        $("#animals").empty();

  

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            console.log(response);

            var results = response.data;
                console.log(results);
            for (var i = 0; i < results.length; i++) {

                var gifDiv = $("<div class='item'>");
                var rating = results[i].rating.toUpperCase();
                var p = $("<p>").text("Rating: " + rating);
                var animalImage = $("<img>");

                animalImage.attr("src", results[i].images.fixed_height_small_still.url);
                animalImage.attr("data-still",results[i].images.fixed_height_small_still.url);
                animalImage.attr("data-animate", results[i].images.fixed_height_small.url);
                animalImage.attr("data-state","still");
                animalImage.addClass("image");


                gifDiv.append(p);
                gifDiv.append(animalImage);

                $("#animals").prepend(gifDiv);
            }
        })
    });

    function userButton(){
        addAnimal = $("#animal-input").val().trim();


        dupAnimal = false;
        for (var i = 0; i < animals.length; i++) {
            if (addAnimal === animals[i]) {

                dupAnimal = true;
                alert("Button already created!")
                event.preventDefault();

                document.getElementById("animal-form").requestFullscreen();

                break;
            }
        }

        if (dupAnimal === false) {
            animals.push(addAnimal);
            event.preventDefault();

            document.getElementById("animal-form").reset();

            createButtons();
            
        }
    }

   

    $(document).on("click", "#addAnimal", userButton);

    $(document).on("click", ".image", function () {
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr("data-state");
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });

})