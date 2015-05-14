$(function () {

    /********************************
     *  Mouse move on Map           *
     ********************************/

    var clicking = false;
    var previousX;
    var previousY;

    $('.mapImage').load(function () {


        $('body').on('mousedown', '#map', function (e) {
            console.log("mouse down");
            e.preventDefault();
            previousX = e.clientX;
            previousY = e.clientY;
            clicking = true;
        });

        $(document).mouseup(function () {
            clicking = false;
        });

        $('body').on('mousemove', '#map', function (e) {
            if (clicking) {
                e.preventDefault();
                var directionX = (previousX - e.clientX) > 0 ? 1 : -1;
                var directionY = (previousY - e.clientY) > 0 ? 1 : -1;
                $("#map").scrollLeft($("#map").scrollLeft() + 10 * directionX);
                $("#map").scrollTop($("#map").scrollTop() + 10 * directionY);
                previousX = e.clientX;
                previousY = e.clientY;
            }
        });
    });

    /********************************
     *  Map Toggle                  *
     ********************************/

    var mapState = 1;

    if (location.hash !== "") {
        $("#start").removeClass("show");
    }
    $("#start").find("a").on("click", function () {
        $("#start").removeClass("show");
        document.getElementById('video').innerHTML = '<video z-index="10000" width="100%" height="100%"  controls autoplay>' +
            '<source src="video/output.webm" type="video/webm"></video>';
        $("#map").hide('blind');
        $("#carousel").hide('blind');
        $(this).off("click");
        $("#video").click(function () {
            $("#video").remove();
            $("#map").show();
            $('#map').animate({
                scrollLeft: currentLocation.x - ($('#map').width() / 2),
                scrollTop: currentLocation.y - ($('#map').height() / 2)
            }, 1500, 'easeInOutQuad');
            $("#carousel").show();
        });

        $(function () {
            setTimeout(function () {
                $("#video").remove();
                $("#map").show();
                $('#map').animate({
                    scrollLeft: currentLocation.x - ($('#map').width() / 2),
                    scrollTop: currentLocation.y - ($('#map').height() / 2)
                }, 1500, 'easeInOutQuad');
                $("#carousel").show();
            }, 11740);
        });
    });

    /***********************
     *  fancy box things   *
     ***********************/

    $(document).on('click', '.fancybox', function (event) {
        event.preventDefault()
        console.log("in there");
        console.log(this.href);
        $.fancybox.open({
            type: 'iframe',
            href: this.href,
            title: this.title
        })
    });


    /******************************************
     * carousel item scaling code, haven't figured it out quiet yet
     ******************************************/

    for(var i in thumbs) {
        console.log($("#thumbImage"+String(i)).position());
    }


    /***
     * Functions above requires the location tag passed in to be # + location tag name. (i.e "#hurst")
     */

    $(window).on('hashchange', function () {
        getImage(location.hash);
        getLocation(location.hash);
        getNavs(location.hash);
        getHspots(location.hash);
        loadMap(location.hash);
        getCIs(location.hash);
        $('#map').animate({scrollLeft: currentLocation.x - ($('#map').width() / 2), scrollTop: currentLocation.y - ($('#map').height() / 2)}, 1500, 'easeInOutQuad');
    });

    if (window.location.hash) {
        dispMainMenu();
        $('#drilldown-1').dcDrilldown({
            speed: 'fast',
            saveState: false,
            showCount: false,
            linkType: 'backlink',
            defaultText: ''
        });
        $(window).trigger('hashchange');
    }
});
