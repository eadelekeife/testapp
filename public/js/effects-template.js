//effects
// function () {
// manually initialize 2 filter backend to give ability to switch:
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
    if(canvas.getActiveObject()) {
        var obj = canvas.getActiveObject();
        obj.filters[index] = filter;
        var timeStart = +new Date();
        obj.applyFilters();
        var timeEnd = +new Date();
        var dimString = canvas.getActiveObject().width + ' x ' +
            canvas.getActiveObject().height;
        document.querySelector('#bench').innerHTML = dimString + 'px ' +
            parseFloat(timeEnd - timeStart) + 'ms';
        canvas.renderAll();
    }
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
        document.querySelector('#bench').innerHTML = dimString + 'px ' +
            parseFloat(timeEnd - timeStart) + 'ms';
        canvas.renderAll();
    }
}

fabric.Object.prototype.padding = 5;
fabric.Object.prototype.transparentCorners = false;

// var canvas = this.__canvas = new fabric.Canvas('c'),
f = fabric.Image.filters;

canvas.on({
    'selection:created': function () {
        if (canvas.getActiveObject().get('type') === 'image') {
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
        }
    },
    // 'selection:cleared': function () {
    //     fabric.util.toArray(document.getElementsByTagName('input'))
    //         .forEach(function (el) { el.disabled = true; });
    // },
});

var indexF;
document.querySelector('#webgl').onclick = function () {
    if (this.checked) {
        fabric.filterBackend = webglBackend;
    } else {
        fabric.filterBackend = canvas2dBackend;
    }
};

document.querySelector('#brightness').addEventListener('click', function () {
    applyFilter(5, this.checked && new f.Brightness({
        brightness: parseFloat(document.querySelector('#brightness-value').value)
    }));
});
document.querySelector('#brightness-value').addEventListener('input', function () {
    applyFilterValue(5, 'brightness', parseFloat(this.value));
});

document.querySelector('#contrast').addEventListener('click', function () {
    applyFilter(6, this.checked && new f.Contrast({
        contrast: parseFloat(document.querySelector('#contrast-value').value)
    }));
});
document.querySelector('#contrast-value').addEventListener('input', function () {
    applyFilterValue(6, 'contrast', parseFloat(this.value));
});

document.querySelector('#saturation').addEventListener('click', function () {
    applyFilter(7, this.checked && new f.Saturation({
        saturation: parseFloat(document.querySelector('#saturation-value').value)
    }));
});
document.querySelector('#saturation-value').addEventListener('input', function () {
    applyFilterValue(7, 'saturation', parseFloat(this.value));
});

document.querySelector('#pixelate').addEventListener('click', function () {
    applyFilter(10, this.checked && new f.Pixelate({
        blocksize: parseInt(document.querySelector('#pixelate-value').value, 10)
    }));
});
document.querySelector('#pixelate-value').addEventListener('input', function () {
    applyFilterValue(10, 'blocksize', parseInt(this.value, 10));
});

document.querySelector('#blur').addEventListener('click', function () {
    applyFilter(11, this.checked && new f.Blur({
        value: parseFloat(document.querySelector('#blur-value').value)
    }));
});
document.querySelector('#blur-value').addEventListener('input', function () {
    applyFilterValue(11, 'blur', parseFloat(this.value, 10));
});

document.querySelector('#hue').addEventListener('click', function () {
    applyFilter(21, this.checked && new f.HueRotation({
        rotation: document.getElementById('hue-value').value,
    }));
});

document.querySelector('#hue-value').addEventListener('input', function () {
    applyFilterValue(21, 'rotation', this.value);
});

document.querySelector('#vintage').addEventListener('click', function () {
    applyFilter(9, this.checked && new f.Vintage());
});
document.querySelector('#blackwhite').addEventListener('click', function () {
    applyFilter(19, this.checked && new f.BlackWhite());
});
document.querySelector('#invert').addEventListener('click', function () {
    applyFilter(1, this.checked && new f.Invert());
});
document.querySelector('#sepia').addEventListener('click', function () {
    applyFilter(3, this.checked && new f.Sepia());
});
// };
