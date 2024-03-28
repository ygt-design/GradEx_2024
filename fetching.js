$(document).ready(function () {
  var jsonUrl = "https://2024.ocadu.gd/json/all";

  $.getJSON(jsonUrl, function (data) {
    $.each(data, function (index, item) {
      $(".container").append(
        "<div><h2>" +
          item.title +
          '</h2><img src="' +
          item.field_thumbnail_image +
          '" alt="Thumbnail"></div>'
      );
    });
  });
});
