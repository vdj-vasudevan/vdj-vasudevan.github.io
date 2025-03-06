$(function($) {

    $.fn.imagePreviewer = function(options) {

        var defaults = {

            scroll: true,
        };

        var options = $.extend(defaults, options);

        this.each(function() {
            var _this = $(this);


            $("img", _this).css('cursor', 'zoom-in').on("click", function(e) {

                if ($("#image_preview_popup").length == 0) {

                    $("body").append('\
                        <div class="layer image-preview-layer flex" id="image_preview_popup">\
                            <div class="layer-wrap">\
                                <img src="' + $(this).attr("src") + '" alt="' + ($(this).attr("alt") || "") + '" class="hide">\
                            </div>\
                        </div>\
                    ');
                    setTimeout(function() {
                        $("#image_preview_popup img").removeClass("hide");
                    }, 100);
                } else {
                    $("#image_preview_popup").show();
                    $("#image_preview_popup img").attr("src", $(this).attr("src"))
                        .attr("alt", $(this).attr("alt"))
                        .removeClass("hide");
                }

                var hideImagePop = function() {
                    if ($("#image_preview_popup").length) {
                        $("#image_preview_popup img").addClass("hide");
                        setTimeout(function() {
                            $("#image_preview_popup").hide();
                        }, 200);
                    }
                    $("#image_preview_popup").off("click.image_preview_popup");
                    options.scroll && $(window).off("scroll.image_preview_popup");
                };

                $("#image_preview_popup").on("click.image_preview_popup", hideImagePop);

                options.scroll && $(window).on("scroll.image_preview_popup", hideImagePop);
            });
        });

        return $(this);
    };
    $(document.head).append('<style>.layer {position: fixed;z-index: 100000;top: 0;right: 0;bottom: 0;left: 0;overflow: auto;background-color: rgba(43,51,59,0.80);}\
                                .flex {display:flex;display:-webkit-flex;align-items: center;justify-content: center;}\
                                #image_preview_popup img.hide {opacity:0;transform:scale(0);transition:all 0.2;cursor:zoom-out;}\
                                #image_preview_popup img {width:auto;height:600px;opacity:1;transform:scale(1);transition:all 0.2s;cursor:zoom-out;}\
                            </style>');
}(jQuery));