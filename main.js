/*
  Web Design II
  Ex. 05
  JavaScript
  António Castro, nº201206754
*/

// "Ready" function allow for the scripts to iniatialize only when the document has fully loaded up

$(document).ready(function () {
  // For each H2 value inside the movies DIV, add the same amount of buttons to the second column DIV, with the same innerText has the H2

  // Create and append new inputs for reviewing the movie and submitting your text

  $(".movies h2").each(function (index) {
    $("<button/>")
      .text($(".movies h2")[index].innerText)
      .appendTo($(".columns2"));
    $(".columns2 button").addClass("btns");

    $("<div/>").eq(index).addClass("submittext").appendTo($(".moviereview"));

    $("<input/>")
      .eq(index)
      .attr({
        type: "button",
        id: "iptbtn",
        value: "Submit review",
        class: "submit",
      })
      .appendTo($(".submittext"));

    $("<textarea/>")
      .eq(index)
      .attr({ id: "ipttxt", class: "write" })
      .appendTo($(".submittext"));

    $("<p/>")
      .eq(index)
      .attr({ class: "your", id: "userreview" })
      .appendTo($(".moviereview"));
  });

  // For each BUTTON that is clicked, find the corresponding INDEX on the movies DIV, toggling its appearance, and scrolling into that exact DIV

  $(".btns").each(function (index) {
    $(this).on("click", function () {
      $(".movies").eq(index).toggleClass("flex");
      $(".movies").get(index).scrollIntoView();
    });
  });

  // When the hamburger menu is clicked, slide the movie list COLUMN, while hiding the images from the director that sit on top of the list (CSS)

  $(".burger").click(function (index) {
    $(".burger").css("cursor", "crosshair");
    $(".columns2 button").slideToggle("slow");
    $(".fincher").slideToggle("slow");
  });

  // If the user has watched the movie, hence pressing the BUTTON YES, hide the parapragh asking if the movie has been watched and corresponding buttons, as well as turning the specific movie list BUTTON green and showing the movie POSTER on the header of the page; the interaction hides the DIV

  //  When the user creates the review text and submits it, an array is created with the information regarding text and date values, and stored individually (by movie) in the local storage of the user's computer
  $(".btnyes").each(function (index) {
    $(this).on("click", function () {
      $(".movieposters").eq(index).toggle();
      $(".btnyes").eq(index).toggle();
      $(".btnno").eq(index).toggle();
      $(".watch").eq(index).toggle();
      $(".submit").eq(index).toggle();
      $(".write").eq(index).toggle();
      $(".submit").get(index).scrollIntoView();
      $(".btns").eq(index).css("background-color", "#00b346");
    });
  });

  $(".submit").each(function (index) {
    $(this).on("click", function () {
      let date = new Date();
      let arrayreview = {
        value: $(".write").eq(index).val(),
        text:
          date.getDate() +
          "/" +
          (date.getMonth() + 1) +
          "/" +
          date.getFullYear() +
          " @ " +
          date.getHours() +
          ":" +
          date.getMinutes(),
      };

      let arraystring = JSON.stringify(arrayreview);
      localStorage.setItem($(".movies h2")[index].innerText, arraystring);

      $(".submit").eq(index).toggle();
      $(".write").eq(index).toggle();
      alert("Your review has been submmited!");
      $(".your").eq(index).toggle();
      $(".your")
        .eq(index)
        .text(
          "On " +
            arrayreview.text +
            ", you reviewed the movie " +
            $(".movies h2")[index].innerText +
            ", writing the following: " +
            arrayreview.value
        );
    });
  });

  // If the user hasn't watched the movie, a propmpt to watch the trailer is shown, using the INDEX from the movies DIV to fetch the exact href of the list; the interaction hides the DIV

  $(".btnno").each(function (index) {
    $(this).on("click", function () {
      $(".btns").eq(index).css("background-color", "#fa3043");
      let prompt = confirm("You want to watch the trailer?");
      if (prompt == true) {
        window.open($(".movies")[index].children.item(0).href);
      } else {
        alert("You should.");
      }
      $(".movies").eq(index).toggleClass("flex");
    });
  });
});
