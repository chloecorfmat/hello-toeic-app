window.addEventListener('load', imageZoomInitialize);

var lens, image;

function imageZoomInitialize(e) {
    var images = document.querySelectorAll('.documents img');

    for (var i = 0; i < images.length; i++) {
        images[i].parentElement.addEventListener('mouseenter', function() {
            imageZoom(this.querySelector('img').id, 'preview');
        });

        images[i].parentElement.addEventListener('mouseleave', function() {
            var p = document.getElementById('preview');
            if (!p.classList.contains('hidden')) {
                p.classList.add('hidden');
            }

            var l = document.getElementById('lens');
            if (l !== null) {
                l.parentElement.removeChild(l);
            }
        });
    }

}

function imageZoom(imageID, resultID) {
    var image, result, cx, cy;

    image = document.getElementById(imageID);
    result = document.getElementById(resultID);

    lens = document.createElement("div");
    lens.setAttribute("class", "img-zoom-lens");
    lens.setAttribute("id", "lens");
    image.parentElement.insertBefore(lens, image);

    if (result.classList.contains('hidden')) {
        result.classList.remove('hidden');
    }

    cx = result.offsetWidth / lens.offsetWidth;
    cy = result.offsetHeight / lens.offsetHeight;

    result.style.backgroundImage = "url('" + image.src + "')";
    result.style.backgroundSize = (image.width * cx) + "px " + (image.height * cy) + "px";

    image.addEventListener('mousemove', moveLens);
    image.addEventListener('touchmove', moveLens);

    lens.addEventListener('mousemove', moveLens);
    lens.addEventListener('touchmove', moveLens);

    function moveLens(e) {
        var pos, x, y;

        // Prevent others actions that may occur when moving over image.
        e.preventDefault();

        // Pos top, right.
        pos = getCursorPos(e);

        x = pos.x - (lens.offsetWidth / 2);
        y = pos.y - (lens.offsetHeight / 2);

        if (x > image.width - lens.offsetWidth) {x = image.width - lens.offsetWidth;}
        if (x < 0) {x = 0;}
        if (y > image.height - lens.offsetHeight) {y = image.height - lens.offsetHeight;}
        if (y < 0) {y = 0;}

        lens.style.left = x + "px";
        lens.style.top = y + "px";

        result.style.backgroundPosition = "-" + (x * cx) + "px -" + (y * cy) + "px";
    }

    function getCursorPos(e) {
        var a, x = 0, y = 0;
        e = e || window.event;
        /* Get the x and y positions of the image: */
        a = image.getBoundingClientRect();

        /* Calculate the cursor's x and y coordinates, relative to the image: */
        x = e.pageX - a.left;
        y = e.pageY - a.top;

        /* Consider any page scrolling: */
        x = x - window.pageXOffset;
        y = y - window.pageYOffset;

        return {x : x, y : y};
    }
}
