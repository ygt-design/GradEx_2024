$(document).ready(function () {
  let jsonUrl = "https://2024.ocadu.gd/json/all";
  let baseUrl = "https://2024.ocadu.gd";

  $.getJSON(jsonUrl, function (data) {
    $("#uploaded").text(data.length);
    $.each(data, function (index, item) {
      let fullImageUrl = `${baseUrl}${item.field_thumbnail_image}`;
      let speedX = Math.random() * 2 + 1;
      let speedY = Math.random() * 2 + 1;
      $(".container").append(
        `<div class="image-wrapper"><img src="${fullImageUrl}" alt="Thumbnail" class="image" data-pos-x="0" data-pos-y="0" data-speed-x="${speedX}" data-speed-y="${speedY}"></div>`
      );
    });
    animateImages();
    addHoverEffect();
  });

  function animateImages() {
    $(".image").each(function () {
      let $this = $(this);
      let animationFrameRequest;

      // Ensure initial random position is set within viewport bounds
      // Determine max x and y positions accounting for image size
      let maxX = $(window).width() - $this.width() - 200;
      let maxY = $(window).height() - $this.height() - 200;

      // Set random starting positions
      let startPosX = Math.random() * maxX;
      let startPosY = Math.random() * maxY;

      // Apply the starting positions
      $this.css({
        top: startPosY,
        left: startPosX,
      });

      // Update the data attributes with these starting positions
      $this.data("pos-x", startPosX);
      $this.data("pos-y", startPosY);

      // Define the move function
      function move() {
        if ($this.hasClass("paused")) {
          // Cancel the current animation frame request if paused
          cancelAnimationFrame(animationFrameRequest);
          return;
        }

        let posX = parseFloat($this.data("pos-x"));
        let posY = parseFloat($this.data("pos-y"));
        let speedX = parseFloat($this.data("speed-x"));
        let speedY = parseFloat($this.data("speed-y"));

        posX += speedX;
        posY += speedY;

        if (posX <= 0 || posX >= $(window).width() - $this.width()) {
          speedX = -speedX;
          $this.data("speed-x", speedX);
        }
        if (posY <= 0 || posY >= $(window).height() - $this.height()) {
          speedY = -speedY;
          $this.data("speed-y", speedY);
        }

        $this.data("pos-x", posX);
        $this.data("pos-y", posY);

        $this.css({
          top: posY,
          left: posX,
        });

        animationFrameRequest = requestAnimationFrame(move);
      }

      // Initial call to start the animation
      move();

      // Listen for a custom event to restart the animation
      $this.on("restartAnimation", function () {
        move();
      });
    });
  }

  function addHoverEffect() {
    $(".image").hover(
      function () {
        // Mouse enter
        $(this).addClass("paused"); // Add paused class to stop the animation
        $(this).css({
          transform: "scale(2)", // Scale the image up 2 times
          zIndex: 1000, // Ensure the scaled image is above others
        });
      },
      function () {
        // Mouse leave
        $(this).removeClass("paused"); // Remove paused class to resume the animation
        $(this).css({
          transform: "scale(1)", // Scale the image back down to its original size
          zIndex: "auto", // Reset the z-index
        });

        // Trigger the custom event to restart the animation
        $(this).trigger("restartAnimation");
      }
    );
  }
});
