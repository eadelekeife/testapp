//filters
// (function() {
//     // manually initialize 2 filter backend to give ability to switch:
var webglBackend;
try {
    webglBackend = new fabric.WebglFilterBackend();
} catch (e) {
    console.log(e)
}
var canvas2dBackend = new fabric.Canvas2dFilterBackend()

fabric.filterBackend = fabric.initFilterBackend();
fabric.Object.prototype.transparentCorners = false;
var $ = function (id) { return document.getElementById(id) };

function applyFilter(index, filter) {
    var obj = canvas.getActiveObject();
    obj.filters[index] = filter;
    var timeStart = +new Date();
    obj.applyFilters();
    var timeEnd = +new Date();
    var dimString = canvas.getActiveObject().width + ' x ' +
        canvas.getActiveObject().height;
    $('bench').innerHTML = dimString + 'px ' +
        parseFloat(timeEnd - timeStart) + 'ms';
    canvas.renderAll();
}

function getFilter(index) {
    var obj = canvas.getActiveObject();
    return obj.filters[index];
}

function applyFilterValue(index, prop, value) {
    var obj = canvas.getActiveObject();
    if (obj.filters[index]) {
        obj.filters[index][prop] = value;
        var timeStart = +new Date();
        obj.applyFilters();
        var timeEnd = +new Date();
        var dimString = canvas.getActiveObject().width + ' x ' +
            canvas.getActiveObject().height;
        $('bench').innerHTML = dimString + 'px ' +
            parseFloat(timeEnd - timeStart) + 'ms';
        canvas.renderAll();
    }
}

fabric.Object.prototype.padding = 5;
fabric.Object.prototype.transparentCorners = false;

    f = fabric.Image.filters;

canvas.on({
    'selection:created': function () {
        fabric.util.toArray(document.getElementsByTagName('input'))
            .forEach(function (el) { el.disabled = false; })

        var filters = ['grayscale', 'invert', 'remove-color', 'sepia', 'brownie',
            'brightness', 'contrast', 'saturation', 'noise', 'vintage',
            'pixelate', 'blur', 'sharpen', 'emboss', 'technicolor',
            'polaroid', 'blend-color', 'gamma', 'kodachrome',
            'blackwhite', 'blend-image', 'hue', 'resize'];

        for (var i = 0; i < filters.length; i++) {
            $(filters[i]) && (
                $(filters[i]).checked = !!canvas.getActiveObject().filters[i]);
        }
    },
    // 'selection:cleared': function () {
    //     fabric.util.toArray(document.getElementsByTagName('input'))
    //         .forEach(function (el) { el.disabled = true; })
    // }
});

var indexF;
document.querySelector('#webgl').onclick = function () {
    if (this.checked) {
        fabric.filterBackend = webglBackend;
    } else {
        fabric.filterBackend = canvas2dBackend;
    }
};

document.querySelector('#brownie').addEventListener('click', function () {
    let tick = this.nextElementSibling.style.display;
    if(tick === 'block') {
        this.nextElementSibling.style.display = 'none';
    } else {
        this.nextElementSibling.style.display = 'block';
    }
    applyFilter(4, this.checked && new f.Brownie());
});
document.querySelector('#polaroid').addEventListener('click', function () {
    let tick = this.nextElementSibling.style.display;
    if(tick === 'block') {
        this.nextElementSibling.style.display = 'none';
    } else {
        this.nextElementSibling.style.display = 'block';
    }
    applyFilter(15, this.checked && new f.Polaroid());
});
document.querySelector('#technicolor').addEventListener('click', function () {
    let tick = this.nextElementSibling.style.display;
    if(tick === 'block') {
        this.nextElementSibling.style.display = 'none';
    } else {
        this.nextElementSibling.style.display = 'block';
    }
    applyFilter(14, this.checked && new f.Technicolor());
});
document.querySelector('#kodachrome').addEventListener('click', function () {
    let tick = this.nextElementSibling.style.display;
    if(tick === 'block') {
        this.nextElementSibling.style.display = 'none';
    } else {
        this.nextElementSibling.style.display = 'block';
    }
    applyFilter(18, this.checked && new f.Kodachrome());
});
document.querySelector('#grayscale').addEventListener('click', function () {
    let tick = this.nextElementSibling.style.display;
    if(tick === 'block') {
        this.nextElementSibling.style.display = 'none';
    } else {
        this.nextElementSibling.style.display = 'block';
    }
    applyFilter(0, this.checked && new f.Grayscale());
});
document.querySelector('#sharpen').addEventListener('click', function () {
    let tick = this.nextElementSibling.style.display;
    if(tick === 'block') {
        this.nextElementSibling.style.display = 'none';
    } else {
        this.nextElementSibling.style.display = 'block';
    }
    applyFilter(12, this.checked && new f.Convolute({
        matrix: [0, -1, 0,
            -1, 5, -1,
            0, -1, 0]
    }));
});
document.querySelector('#emboss').addEventListener('click', function () {
    let tick = this.nextElementSibling.style.display;
    if(tick === 'block') {
        this.nextElementSibling.style.display = 'none';
    } else {
        this.nextElementSibling.style.display = 'block';
    }
    applyFilter(13, this.checked && new f.Convolute({
        matrix: [1, 1, 1,
            1, 0.7, -1,
            -1, -1, -1]
    }));
});

