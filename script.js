$(document).ready(function () {
  let jsonUrl = "https://2024.ocadu.gd/json/all";
  let baseUrl = "https://2024.ocadu.gd";

  $.getJSON(jsonUrl, function (data) {
    $.each(data, function (index, item) {
      let fullImageUrl = `${baseUrl}${item.field_thumbnail_image}`;
      $(".container").append(
        `<div class="image-wrapper"><img src="${fullImageUrl}" alt="Thumbnail" class="image" data-pos-x="0" data-pos-y="0" data-speed-x="3" data-speed-y="3"></div>`
      );
    });
    animateImages();
    addHoverEffect();
  });

  function animateImages() {
    $(".image").each(function () {
      let $this = $(this);

      function move() {
        if ($this.hasClass("paused")) return;

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

        requestAnimationFrame(move);
      }

      move();
    });
  }
});
