const canvas = new fabric.Canvas("demoCanvas", {
    hoverCursor: 'pointer',
    preserveObjectStacking: true,
    selection: true,
    enableRetinaScaling: true,
    controlsAboveOverlay: false,
    selectionCompatibility: true,
  });
  fabric.Object.NUM_FRACTION_DIGITS = 17;
  
  
  ( function getFonts() {
    var fonts = ["Josefin Slab", "Open Sans", "Poppins", "Lato", "DM Sans", "Dosis", "Barlow Condensed", "Roboto","Nixie One", "Montez", "Lobster", "Josefin Sans", "Shadows Into Light", "Pacifico", "Amatic SC", "Orbitron", "Rokkitt", "Righteous", "Dancing Script", "Bangers", "Chewy",
      "Sigmar One", "Architects Daughter", "Abril Fatface", "Covered By Your Grace", "Kaushan Script", "Gloria Hallelujah", "Satisfy", "Lobster Two", "Comfortaa", "Cinzel", "Courgette"];
    fonts.forEach(datum => {
  
      // const family = datum.family.replace(/ /g, '-').toLowerCase();
      // console.log(family)
  
      const options = document.createElement('option');
      options.text = datum;
      options.style.fontFamily = datum;
      if (datum === 'Josefin Sans') {
        options.setAttribute('selected', true);
      }
      options.setAttribute('data-value', datum);
  
      document.querySelector('#fontOptions').appendChild(options)
      document.querySelector('#pageLoader').style.display = 'none';
    })
  }())
  
  
  
  function resize() {
    let winWidth = getComputedStyle(document.querySelector('.canvas .flex-three .page')).width;
    let size = +winWidth.slice(0, -2);
  
    let width = size * 0.70;
    height = width / 1.77778;
    canvas.setWidth(width);
    canvas.setHeight(height);
    canvas.calcOffset();
  }
  resize();
  window.addEventListener('resize', resize)
  
  canvas.renderAll();
  
  canvas.backgroundColor = '#ffffff';
  const navToHide = ['defaultView', 'backgroundControls', 'effectsControls', 'textsControls', 'cinemaControls', 'shapesControls',
    'borderControls', 'secondContact', 'foregroundControls', 'patternControls', 'uploadControls', 'brushControls'];
  for (let hideMe of navToHide) {
    const getElement = document.getElementById(hideMe)
    getElement.classList.add('toHide')
  }
  const editNav = {
    allRows: [...navToHide],
    navToHide: [...navToHide],
    showNav(e) {
      if (document.getElementsByClassName('btn-white')) {
        for (removeClass of document.getElementsByClassName('btn-white')) {
          removeClass.classList.remove('btn-white')
        }
      }
      const getTarget = e.getAttribute('data-target');
      if (this.navToHide.includes(getTarget)) {
        for (let row of this.allRows) {
          if (this.navToHide.indexOf(row) === -1) {
            this.navToHide.push(row);
            e.classList.remove('btn-white');
            document.getElementById(row).classList.add('toHide');
          }
        }
        e.classList.add('btn-white');
        const targetIndex = this.navToHide.indexOf(getTarget);
        this.navToHide.splice(targetIndex, 1);
        document.querySelector(`#${getTarget}`).classList.remove('toHide');
      }
    }
  }
  let newEditNav = {
    showNav(e) {
      const getTarget = e;
      if (editNav.navToHide.includes(getTarget)) {
        for (let row of editNav.allRows) {
          if (editNav.navToHide.indexOf(row) === -1) {
            editNav.navToHide.push(row);
            document.getElementById(row).classList.add('toHide');
          }
        }
        const targetIndex = editNav.navToHide.indexOf(getTarget);
        editNav.navToHide.splice(targetIndex, 1);
        document.querySelector(`#${getTarget}`).classList.remove('toHide');
      }
    }
  }
  newEditNav.showNav('defaultView')
  const textNav = {
    allRows: ['firstContact', 'secondContact'],
    navToHide: ['firstContact', 'secondContact'],
    showFirstContact() {
      let nav = this.navToHide;
      const getFirst = document.getElementById(nav[0]);
      const getSecond = document.getElementById(nav[1]);
      getFirst.classList.remove('toHide');
      getSecond.classList.add('toHide');
    },
    showSecondContact() {
      let nav = this.navToHide;
      const getFirst = document.getElementById(nav[0]);
      const getSecond = document.getElementById(nav[1]);
      getSecond.classList.remove('toHide');
      getFirst.classList.add('toHide');
    },
  }
  function callImage(e) {
    images.showImage(e)
  }
  
  const getParent = document.querySelector('.flex-one ul').children;
  for (let child of getParent) {
    child.addEventListener('click', function () {
      editNav.showNav(this)
    })
  }
  
  // let effectsSlider = document.getElementsByClassName('effectsSlider');
  // for (let i = 0; i < effectsSlider.length; i++) {
  //   effectsSlider[i].disabled = true
  //   effectsSlider[i].setAttribute('data-toggle', 'tooltip');
  //   effectsSlider[i].setAttribute('data-placement', 'top');
  // }
  function checkActiveImage() {
    let effectsSlider = document.getElementsByClassName('effectsSlider');
    for (let i = 0; i < effectsSlider.length; i++) {
      effectsSlider[i].disabled = true;
      effectsSlider[i].setAttribute('data-toggle', 'tooltip');
      effectsSlider[i].setAttribute('data-placement', 'top');
    }
  }
  function showTextStyling() {
    const active = canvas.getActiveObject();
    // document.querySelector('#charSpacing').setAttribute('value', active.charSpacing);
    // document.querySelector('#charSpacingDisplay').innerHTML = active.charSpacing;
    // document.querySelector('#lineHeight').setAttribute('value', active.lineHeight);
    // document.querySelector('#lineHeightDisplay').innerHTML = active.lineHeight;
    document.querySelector('#textOpacity').removeAttribute('value');
    document.querySelector('#textOpacity').value = active.opacity;
    document.querySelector('#textOpacityDisplay').innerHTML = active.opacity;
  
    document.querySelector('#lineHeight').removeAttribute('value');
    document.querySelector('#lineHeight').value = active.lineHeight;
    document.querySelector('#lineHeightDisplay').innerHTML = active.lineHeight;
  
    let obj = canvas.getActiveObject();
    for (let fonts of document.getElementById('fontSize').children) {
      fonts.removeAttribute('selected')
      if (+fonts.textContent === obj.fontSize) {
        fonts.setAttribute('selected', 'true');
      }
    }
    for (let fonts of document.getElementById('fontOptions').children) {
      fonts.removeAttribute('selected')
      if (fonts.textContent == obj.fontFamily) {
        fonts.setAttribute('selected', 'true');
      }
    }
    if (obj.getStyleAtPosition(obj.selectionStart).fontStyle === 'italic') {
      document.getElementById('italic').classList.add('bold');
    } else {
      document.getElementById('italic').classList.remove('bold');
    }
    if (obj.getStyleAtPosition(obj.selectionStart).fontWeight === 'Bold') {
      document.getElementById('bold').classList.add('bold');
    } else {
      document.getElementById('bold').classList.remove('bold');
    }
    if (obj.getStyleAtPosition(obj.selectionStart).underline === true) {
      document.getElementById('underline').classList.add('bold');
    } else {
      document.getElementById('underline').classList.remove('bold');
    }
    if (obj.getStyleAtPosition(obj.selectionStart).fontCharacterStyle === 'Caps') {
      document.getElementById('fontCharacterStyle').classList.add('bold');
    } else {
      document.getElementById('fontCharacterStyle').classList.remove('bold');
    }
  
    if (obj.getStyleAtPosition(obj.selectionStart).fontStyle === 'italic') {
      document.getElementById('italic').classList.add('bold');
    } else {
      document.getElementById('italic').classList.remove('bold');
    }
    if (obj.getStyleAtPosition(obj.selectionStart).fontWeight === 'Bold') {
      document.getElementById('bold').classList.add('bold');
    } else {
      document.getElementById('bold').classList.remove('bold');
    }
    if (obj.getStyleAtPosition(obj.selectionStart).underline === true) {
      document.getElementById('underline').classList.add('bold');
    } else {
      document.getElementById('underline').classList.remove('bold');
    }
  }
  
  canvas.on('selection:created', () => {
    const active = canvas.getActiveObject().get('type');
    if (active === 'textbox') {
      textNav.showSecondContact();
      newEditNav.showNav('textsControls')
      checkActiveImage()
      showTextStyling()
    }
    else textNav.showFirstContact();
  })
  canvas.on('selection:cleared', () => {
    textNav.showFirstContact();
    checkActiveImage()
  })
  canvas.on('selection:updated', () => {
    const active = canvas.getActiveObject().get('type');
    if (active === 'textbox') {
      textNav.showSecondContact();
      newEditNav.showNav('textsControls')
      checkActiveImage()
      showTextStyling()
    }
    else textNav.showFirstContact();
  })
  
  
  var state;
  // past states
  var undo = [];
  // reverted states
  var redo = [];
  
  /**
  * Push the current state into the undo stack and then capture the current state
  */
  function save() {
    // clear the redo stack
    redo = [];
    // initial call won't have a state
    if (state) {
      undo.push(state);
      // document.querySelector('#undo').disabled = false;
    }
    state = JSON.stringify(canvas);
  }
  
  
  save()
  
  //Add Text to Canvas
  document.querySelector('#heading').addEventListener('click', () => {
    let text = new fabric.Textbox('Add a heading',
      {
        left: 0,
        top: 200,
        width: 450,
        fontSize: 72,
        fontFamily: 'Josefin Sans'
      });
    canvas.add(text);
    save()
    canvas.renderAll();
  })
  document.querySelector('#sub').addEventListener('click', () => {
    let text = new fabric.Textbox('Add a subheading',
      {
        left: 300,
        top: 200,
        width: 250,
        fontSize: 30,
        fontFamily: 'Josefin Sans'
      });
    canvas.add(text);
    save()
    canvas.renderAll();
  })
  document.querySelector('#text').addEventListener('click', () => {
    let text = new fabric.Textbox('add a little bit of body text',
      {
        left: 300,
        top: 200,
        width: 250,
        fontSize: 20,
        fontFamily: 'Josefin Sans'
      });
    canvas.add(text);
    save()
    canvas.renderAll();
  })
  function addSampleText(e) {
    let text = new fabric.Textbox('Sample',
      {
        left: 0,
        top: 200,
        width: 450,
        fontSize: 72,
        fontFamily: e.getAttribute('data-family')
      });
    canvas.add(text);
    save()
    canvas.renderAll();
  }
  
  //Add Border to Canvas
  // console.log(document.querySelectorAll('.bord'))
  document.querySelector('.fullBorder').addEventListener('click', () => {
    var rect = new fabric.Rect({
      top: 100,
      left: 100,
      width: 300,
      fill: "transparent",
      height: 50,
      stroke: 'black',
      strokeDashArray: [0, 0],
      strokeWidth: 3
    });
    canvas.add(rect);
    save()
    canvas.renderAll();
  })
  document.querySelector('.dashedBorder').addEventListener('click', () => {
    var rect = new fabric.Rect({
      top: 100,
      left: 100,
      width: 300,
      fill: "transparent",
      height: 50,
      stroke: 'black',
      strokeDashArray: [3, 3],
      strokeWidth: 3
    });
    canvas.add(rect);
    save()
    canvas.renderAll();
  })
  document.querySelector('.smalldashedBorder').addEventListener('click', () => {
    var rect = new fabric.Rect({
      top: 100,
      left: 100,
      width: 300,
      fill: "transparent",
      height: 50,
      stroke: 'black',
      strokeDashArray: [2, 2],
      strokeWidth: 2
    });
    canvas.add(rect);
    save()
    canvas.renderAll();
  })
  document.querySelector('.smalldottedBorder').addEventListener('click', () => {
    var rect = new fabric.Rect({
      top: 100,
      left: 100,
      width: 300,
      fill: "transparent",
      height: 50,
      stroke: 'black',
      strokeDashArray: [1, 1],
      strokeWidth: 1
    });
    canvas.add(rect);
    save()
    canvas.renderAll();
  })
  
  //Add Shapes to Canvas
  document.querySelector('#shapeOpacity').addEventListener('input', e => {
    if (canvas.getActiveObject()) {
      let shape = canvas.getActiveObject();
      shape.opacity = e.target.value;
      canvas.renderAll();
      document.querySelector('#shapeOpacityDisplay').innerHTML = shape.opacity;
    }
  })
  document.getElementById('addSquare').addEventListener('click', () => {
    let square = new fabric.Rect({
      width: 150,
      height: 150,
      left: 200,
      top: 200,
      fill: '#000'
    });
    canvas.add(square);
    save()
    canvas.renderAll();
  })
  document.getElementById('addCircle').addEventListener('click', () => {
    let circle = new fabric.Circle({
      left: 200,
      top: 150,
      radius: 30,
      fill: "#000",
    });
    circle.hasRotatingPoint = true;
    canvas.add(circle);
    save()
    canvas.renderAll();
  })
  document.getElementById('addRectangle').addEventListener('click', () => {
    let rectangle = new fabric.Rect({
      width: 250,
      height: 100,
      left: 200,
      top: 200,
      fill: '#000'
    });
    canvas.add(rectangle);
    save()
    canvas.renderAll();
  })
  document.getElementById('addTriangle').addEventListener('click', () => {
    let triangle = new fabric.Triangle({
      left: 130,
      top: 150,
      strokeWidth: 1,
      width: 70,
      height: 60,
      fill: '#000',
      selectable: true,
      originX: 'center'
    });
    triangle.hasRotatingPoint = true;
    canvas.add(triangle);
    save()
    canvas.renderAll();
  })
  document.getElementById('addPolygon').addEventListener('click', () => {
    let points = regularPolygonPoints(6, 30);
    let myPoly = new fabric.Polygon(points, {
      stroke: 'black',
      left: 10,
      top: 10,
      strokeWidth: 2,
      strokeLineJoin: 'bevil'
    }, false);
    canvas.add(myPoly)
    save()
    canvas.renderAll();
  })
  document.getElementById('addStar').addEventListener('click', () => {
    let points = starPolygonPoints(5, 50, 25);
    let star = new fabric.Polygon(points, {
      stroke: 'black',
      left: 100,
      top: 10,
      strokeWidth: 2,
      strokeLineJoin: 'bevil'
    }, false);
    canvas.add(star);
    save()
    canvas.renderAll();
  })
  document.getElementById('addCircleStroke').addEventListener('click', () => {
    let stroke = new fabric.Circle({
      top: 0,
      left: 0,
      radius: 100,
      stroke: '#000',
      strokeWidth: 5,
      fill: 'rgba(0,0,0,0)'
    });
    canvas.add(stroke);
    save()
    canvas.renderAll();
  })
  document.getElementById('addSquareStroke').addEventListener('click', () => {
    let square = new fabric.Rect({
      width: 150,
      height: 150,
      left: 200,
      top: 200,
      stroke: '#000',
      strokeWidth: 5,
      fill: 'rgba(0,0,0,0)'
    });
    canvas.add(square);
    save()
    canvas.renderAll();
  })
  document.getElementById('addRectangleStroke').addEventListener('click', () => {
    let rectangle = new fabric.Rect({
      width: 250,
      height: 100,
      left: 200,
      top: 200,
      stroke: '#000',
      strokeWidth: 5,
      fill: 'rgba(0,0,0,0)'
    });
    canvas.add(rectangle);
    save()
    canvas.renderAll();
  })
  document.getElementById('addRoundedRectangle').addEventListener('click', () => {
    let rectangle = new fabric.Rect({
      width: 250,
      height: 100,
      left: 200,
      top: 200,
      stroke: '#000',
      strokeWidth: 5,
      rx: 10,
      ry: 10
    });
    canvas.add(rectangle);
    save()
    canvas.renderAll();
  })
  function regularPolygonPoints(sideCount, radius) {
    var sweep = Math.PI * 2 / sideCount;
    var cx = radius;
    var cy = radius;
    var points = [];
    for (var i = 0; i < sideCount; i++) {
      var x = cx + radius * Math.cos(i * sweep);
      var y = cy + radius * Math.sin(i * sweep);
      points.push({ x: x, y: y });
    }
    return (points);
  }
  function starPolygonPoints(spikeCount, outerRadius, innerRadius) {
    var rot = Math.PI / 2 * 3;
    var cx = outerRadius;
    var cy = outerRadius;
    var sweep = Math.PI / spikeCount;
    var points = [];
    var angle = 0;
  
    for (var i = 0; i < spikeCount; i++) {
      var x = cx + Math.cos(angle) * outerRadius;
      var y = cy + Math.sin(angle) * outerRadius;
      points.push({ x: x, y: y });
      angle += sweep;
  
      x = cx + Math.cos(angle) * innerRadius;
      y = cy + Math.sin(angle) * innerRadius;
      points.push({ x: x, y: y });
      angle += sweep
    }
    return (points);
  }
  
  //layers
  document.getElementById('addTopLayerBackground').addEventListener('click', () => {
    let square = new fabric.Rect({
      width: 900,
      height: 70,
      left: 0,
      selectable: false,
      top: -20,
      fill: '#000'
    });
    canvas.add(square);
    save();
    canvas.renderAll();
  })
  document.getElementById('addBottomLayerBackground').addEventListener('click', () => {
    let square = new fabric.Rect({
      width: 900,
      height: 70,
      left: 0,
      selectable: false,
      top: 400,
      fill: '#000'
    });
    canvas.add(square);
    save();
    canvas.renderAll();
  })
  
  //images
  document.getElementById('addBackground').addEventListener('change', e => {
    fabric.Image.fromURL(URL.createObjectURL(e.target.files[0]), function (img) {
      img.scaleX = canvas.width / img.width;
      img.scaleY = canvas.height / img.height;
      canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas))
      canvas.requestRenderAll();
      save()
    }, { crossOrigin: 'anonymous' });
  })
  document.getElementById('addforeground').addEventListener('change', e => {
    fabric.Image.fromURL(URL.createObjectURL(e.target.files[0]), (img) => {
      img.set({
        left: 0,
        top: 0
      });
      img.scaleToHeight(400);
      img.scaleToWidth(400);
      canvas.add(img);
      save()
      canvas.requestRenderAll();
    })
  })
  function searchItem(e) {
    let displayTab = e.getAttribute('data-target');
    let loader = e.getAttribute('data-loader');
    let searchBox = e.getAttribute('data-value');
    if (displayTab === 'bodyImage') {
      document.getElementById('showBodyNext').style.display = 'none';
    } else {
      document.getElementById('showNextImages').style.display = 'none';
    }
    document.querySelector('#' + loader).style.display = 'block';
    document.querySelector('#' + displayTab).style.display = 'none';
    fetch('https://api.unsplash.com/search/photos?client_id=Xiikpb9mqxFUMAwXDFycIIHVIlgPO3uvwsr40RlenPE&w=600&h=400&page=1&per_page=50&query=' + document.getElementById(searchBox).value)
      .then(response => response.json())
      .then(data => {
        var body = '';
        data.results.forEach(datum => {
          datum.crossOrigin = "Anonymous";
          body += `<img onclick="add${loader}(this)" data-value="${datum.urls.regular}" src="${datum.urls.regular}" />`;
        })
        document.getElementById(displayTab).innerHTML = body
        document.querySelector('#' + loader).style.display = 'none';
        document.querySelector('#' + displayTab).style.display = 'block';
  
      })
      .catch(err => {
        document.getElementById(displayTab).innerHTML = "An error occurred. Please reload browser to continue or try later"
      })
  }
  const getRandomItem = (function () {
    fetch('https://api.unsplash.com/photos?page=1&client_id=Xiikpb9mqxFUMAwXDFycIIHVIlgPO3uvwsr40RlenPE&w=600&h=400&query=background&per_page=8')
      .then(response => response.json())
      .then(data => {
        var body = '';
        data.forEach(datum => {
          datum.crossOrigin = "Anonymous";
          const imageReceived = datum.urls.regular;
          body += `<img onclick="addbackground(this)" data-value="${datum.urls.regular}" src="${datum.urls.regular}" />`;
        })
        document.querySelector('#pageLoader').style.display = 'none';
        document.querySelector('#background').style.display = 'none';
        document.getElementById('bodyImage').innerHTML = body
        document.getElementById('showBodyNext').innerHTML = '<button class="btn btn-def" id="moreImages" data-page="2" onclick="getMoreRandomItem(this)">more images....</button>'
      })
      .catch(err => {
        console.log(err)
        document.getElementById('bodyImage').innerHTML = "An error occurred. Please reload browser to continue or try later"
      })
  })()
  const getRandomForegroundItem = (function () {
    fetch('https://api.unsplash.com/photos?page=1&client_id=Xiikpb9mqxFUMAwXDFycIIHVIlgPO3uvwsr40RlenPE&w=600&h=400&query=foreground&per_page=8')
      .then(response => response.json())
      .then(data => {
        var body = '';
        data.forEach(datum => {
          datum.crossOrigin = "Anonymous";
          const imageReceived = datum.urls.regular;
          body += `<img onclick="addforeground(this)" data-value="${datum.urls.regular}" src="${datum.urls.regular}" />`;
        })
  
        document.querySelector('#pageLoader').style.display = 'none';
  
        document.querySelector('#foreground').style.display = 'none';
        document.getElementById('foregroundImage').innerHTML = body
        document.getElementById('showNextImages').innerHTML = '<button class="btn btn-def" data-page="2" onclick="getMoreRandomForegroundItem(this)">more images....</button>'
      })
      .catch(err => {
        document.getElementById('foregroundImage').innerHTML = "An error occurred. Please reload browser to continue or try later"
      })
  })()
  const getMoreRandomItem = function (e) {
    let count = e.getAttribute('data-page');
    fetch(`https://api.unsplash.com/photos?page=${count}&client_id=Xiikpb9mqxFUMAwXDFycIIHVIlgPO3uvwsr40RlenPE&w=600&h=400&&query=background&per_page=8`)
      .then(response => response.json())
      .then(data => {
        var body = [];
        var createImage = '';
        data.forEach(datum => {
          datum.crossOrigin = "Anonymous";
          const imageReceived = datum.urls.regular;
          createImage = document.createElement('img');
          createImage.setAttribute('onclick', "addbackground(this)");
          createImage.setAttribute('data-value', datum.urls.regular);
          createImage.setAttribute('src', datum.urls.regular);
          body.push(createImage);
        })
        document.querySelector('#background').style.display = 'none';
  
        body.forEach(bod => {
          document.getElementById('bodyImage').appendChild(bod);
        })
        const raise = ++count;
        document.getElementById('showBodyNext').innerHTML = `<button class ="btn btn-def" id="moreImages" data-page=${raise} onclick="getMoreRandomItem(this)">more images....</button>`
      })
      .catch(err => {
        document.getElementById('bodyImage').innerHTML = "An error occurred. Please reload browser to continue or try later"
      })
  }
  const getMoreRandomForegroundItem = function (e) {
    let count = e.getAttribute('data-page');
    fetch(`https://api.unsplash.com/photos?page=${count}&client_id=Xiikpb9mqxFUMAwXDFycIIHVIlgPO3uvwsr40RlenPE&w=600&h=400&query=foreground&per_page=8`)
      .then(response => response.json())
      .then(data => {
        var body = [];
        var createImage = '';
        data.forEach(datum => {
          datum.crossOrigin = "Anonymous";
          const imageReceived = datum.urls.regular;
          createImage = document.createElement('img');
          createImage.setAttribute('onclick', "addforeground(this)");
          createImage.setAttribute('data-value', datum.urls.regular);
          createImage.setAttribute('src', datum.urls.regular);
          body.push(createImage);
        })
        document.querySelector('#foreground').style.display = 'none';
  
        body.forEach(bod => {
          document.getElementById('foregroundImage').appendChild(bod);
        })
        const raise = ++count;
        document.getElementById('showNextImages').innerHTML = `<button class ="btn btn-def" data-page=${raise} onclick="getMoreRandomForegroundItem(this)">more images....</button>`
      })
      .catch(err => {
        document.getElementById('foregroundImage').innerHTML = "An error occurred. Please reload browser to continue or try later"
      })
  }
  
  function addbackground(e) {
    fabric.Image.fromURL(e.getAttribute('data-value'), function (img) {
      img.scaleX = canvas.width / img.width;
      img.scaleY = canvas.height / img.height;
      canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas))
      canvas.requestRenderAll();
      save()
    }, { crossOrigin: 'anonymous' });
  }
  function addforeground(e) {
    fabric.Image.fromURL(e.getAttribute('data-value'), function (img) {
      img.scaleToHeight(400);
      img.scaleToWidth(400);
      img.selectable = true;
      canvas.add(img);
      canvas.requestRenderAll();
    }, { crossOrigin: 'anonymous' });
  }
  document.getElementById('foregroundForm').addEventListener('submit', (e) => {
    e.preventDefault()
    document.querySelector('#foreground').style.display = 'block';
    fetch('https://api.unsplash.com/search/photos?client_id=Xiikpb9mqxFUMAwXDFycIIHVIlgPO3uvwsr40RlenPE&w=600&h=400&page=1&per_page=50&query=' + document.getElementById('foregroundBox').value)
      .then(response => response.json())
      .then(data => {
        var body = '';
        data.results.forEach(datum => {
          datum.crossOrigin = "Anonymous";
          body += `<img onclick="addforeground(this)" data-value="${datum.urls.regular}" src="${datum.urls.regular}" />`;
        })
        document.querySelector('#pageLoader').style.display = 'none';
  
        document.querySelector('#foreground').style.display = 'none';
        document.getElementById('foregroundImage').innerHTML = body;
  
        document.getElementById('showNextImages').innerHTML = "";
  
  
      })
      .catch(err => {
        console.log(err)
        document.getElementById('foregroundImage').innerHTML = "An error occurred. Please reload browser to continue or try later"
      })
  })
  document.getElementById('searchForeground').addEventListener('click', (e) => {
    e.preventDefault()
    document.querySelector('#foreground').style.display = 'block';
    fetch('https://api.unsplash.com/search/photos?client_id=Xiikpb9mqxFUMAwXDFycIIHVIlgPO3uvwsr40RlenPE&w=600&h=400&page=1&per_page=50&query=' + document.getElementById('foregroundBox').value)
      .then(response => response.json())
      .then(data => {
        var body = '';
        data.results.forEach(datum => {
          datum.crossOrigin = "Anonymous";
          body += `<img onclick="addforeground(this)" data-value="${datum.urls.regular}" src="${datum.urls.regular}" />`;
        })
        document.querySelector('#pageLoader').style.display = 'none';
  
        document.querySelector('#foreground').style.display = 'none';
        document.getElementById('foregroundImage').innerHTML = body;
  
        document.getElementById('showNextImages').innerHTML = "";
  
      })
      .catch(err => {
        console.log(err)
        document.getElementById('foregroundImage').innerHTML = "An error occurred. Please reload browser to continue or try later"
      })
  })
  document.getElementById('backgroundForm').addEventListener('submit', e => {
    e.preventDefault();
    document.querySelector('#background').style.display = 'block';
    fetch('https://api.unsplash.com/search/photos?client_id=Xiikpb9mqxFUMAwXDFycIIHVIlgPO3uvwsr40RlenPE&w=600&h=400&page=1&per_page=50&query=' + document.getElementById('backgroundBox').value)
      .then(response => response.json())
      .then(data => {
        var body = '';
        data.results.forEach(datum => {
          datum.crossOrigin = "Anonymous";
          const imageReceived = datum.urls.regular;
          body += `<img onclick="addbackground(this)" data-value="${datum.urls.regular}" src="${datum.urls.regular}" />`;
        })
        document.querySelector('#pageLoader').style.display = 'none';
        document.querySelector('#background').style.display = 'none';
        document.getElementById('bodyImage').innerHTML = body;
        document.getElementById('showBodyNext').innerHTML = "";
      })
      .catch(err => {
        console.log(err)
        document.getElementById('bodyImage').innerHTML = "An error occurred. Please reload browser to continue or try later"
      })
  })
  document.getElementById('searchBackground').addEventListener('click', e => {
    e.preventDefault();
    document.querySelector('#background').style.display = 'block';
    fetch('https://api.unsplash.com/search/photos?client_id=Xiikpb9mqxFUMAwXDFycIIHVIlgPO3uvwsr40RlenPE&w=600&h=400&page=1&per_page=50&query=' + document.getElementById('backgroundBox').value)
      .then(response => response.json())
      .then(data => {
        var body = '';
        data.results.forEach(datum => {
          datum.crossOrigin = "Anonymous";
          const imageReceived = datum.urls.regular;
          body += `<img onclick="addbackground(this)" data-value="${datum.urls.regular}" src="${datum.urls.regular}" />`;
        })
        document.querySelector('#pageLoader').style.display = 'none';
        document.querySelector('#background').style.display = 'none';
        document.getElementById('bodyImage').innerHTML = body;
        document.getElementById('showBodyNext').innerHTML = "";
      })
      .catch(err => {
        console.log(err)
        document.getElementById('bodyImage').innerHTML = "An error occurred. Please reload browser to continue or try later"
      })
  })
  
  
  
  //text edits
  // document.getElementById('charSpacing').addEventListener('input', e => {
  //     const range = document.getElementById('charSpacing');
  //     const rangeV = document.getElementById('charSpacingDisplay');
  //     rangeV.innerHTML = `<span>${range.value}</span>`;
  
  //     const textValue = document.getElementById('charSpacing').value;
  
  //     const obj = canvas.getActiveObject();
  //     obj.setSelectionStyles({ 'charSpacing': textValue });
  //     save()
  //     canvas.renderAll();
  // })
  // document.getElementById('lineHeight').addEventListener('input', e => {
  //     const range = document.getElementById('lineHeight');
  //     const rangeV = document.getElementById('lineHeightDisplay');
  //     rangeV.innerHTML = `<span>${range.value}</span>`;
  
  //     const obj = canvas.getActiveObject();
  //     obj.setSelectionStyles({ 'lineHeight': event.target.value });
  //     save()
  //     canvas.renderAll();
  // })
  document.getElementById('textOpacity').addEventListener('change', e => {
    const range = document.getElementById('textOpacity');
    const rangeV = document.getElementById('textOpacityDisplay');
    rangeV.innerHTML = `<span>${range.value}</span>`;
  
    const obj = canvas.getActiveObject();
    obj.set({
      opacity: e.target.value
    });
    save()
    canvas.renderAll();
  })
  document.getElementById('lineHeight').addEventListener('change', e => {
    const range = document.getElementById('lineHeight');
    const rangeV = document.getElementById('lineHeightDisplay');
    rangeV.innerHTML = `<span>${range.value}</span>`;
  
    const obj = canvas.getActiveObject();
    obj.set({
      lineHeight: e.target.value
    });
    save()
    canvas.renderAll();
  })
  document.getElementById('bold').addEventListener('click', e => {
  
    const obj = canvas.getActiveObject();
    obj.setSelectionStyles({ 'fontWeight': 'Bold' });
    // if (obj.getStyleAtPosition(obj.selectionStart).fontWeight !== 'Bold') {
    //   obj.setSelectionStyles({ 'fontWeight': 'Bold' });
    //   document.getElementById('bold').classList.add('bold');
    //   save()
    //   canvas.renderAll();
    // } else {
    //   obj.setSelectionStyles({ 'fontWeight': 'normal' });
    //   document.getElementById('bold').classList.remove('bold')
    //   save()
    //   canvas.renderAll();
    // }
  })
  document.getElementById('italic').addEventListener('click', e => {
    const obj = canvas.getActiveObject();
    if (obj.getStyleAtPosition(obj.selectionStart).fontStyle !== 'italic') {
      obj.setSelectionStyles({ 'fontStyle': 'italic' });
      document.getElementById('italic').classList.add('bold');
      save()
      canvas.renderAll();
    } else {
      obj.setSelectionStyles({ 'fontStyle': 'normal' });
      document.getElementById('italic').classList.remove('bold')
      save()
      canvas.renderAll();
    }
  })
  document.getElementById('underline').addEventListener('click', e => {
    const obj = canvas.getActiveObject();
    if (obj.getStyleAtPosition(obj.selectionStart).underline !== true) {
      obj.setSelectionStyles({ underline: true });
      document.getElementById('underline').classList.add('bold');
      save()
      canvas.renderAll();
    } else {
      obj.setSelectionStyles({ underline: false });
      document.getElementById('underline').classList.remove('bold')
      save()
      canvas.renderAll();
    }
  })
  // document.getElementById('lowercaseStyle').addEventListener('click', e => {
  //     const obj = canvas.getActiveObject();
  //     if (obj.getStyleAtPosition(obj.selectionStart).lowercaseStyle !== 'Caps') {
  //         obj.toUpperCase();
  //         document.getElementById('lowercaseStyle').classList.add('bold');
  //         save()
  //         canvas.renderAll();
  //         // console.log(obj.getStyleAtPosition(obj.selectionStart))
  //     } else {
  //         obj.setSelectionStyles({ lowercaseStyle: 'normal' });
  //         document.getElementById('lowercaseStyle').classList.remove('bold')
  //         save()
  //         canvas.renderAll();
  //     }
  // })
  document.getElementById('alignLeft').addEventListener('click', e => {
    if (canvas.getActiveObject().textAlign !== 'left') {
      canvas.getActiveObject().textAlign = 'left';
      document.getElementById('alignLeft').classList.add('bold')
      document.getElementById('alignCenter').classList.remove('bold')
      document.getElementById('alignRight').classList.remove('bold');
      save()
      canvas.renderAll();
    } else {
      canvas.getActiveObject().textAlign = 'left';
      document.getElementById('alignLeft').classList.remove('bold')
      save()
      canvas.renderAll();
    }
  })
  document.getElementById('alignRight').addEventListener('click', e => {
    if (canvas.getActiveObject().textAlign !== 'right') {
      canvas.getActiveObject().textAlign = 'right';
      document.getElementById('alignLeft').classList.remove('bold')
      document.getElementById('alignCenter').classList.remove('bold')
      document.getElementById('alignRight').classList.add('bold');
      save()
      canvas.renderAll();
    } else {
      canvas.getActiveObject().textAlign = 'left';
      document.getElementById('alignRight').classList.remove('bold')
      save()
      canvas.renderAll();
    }
  })
  document.getElementById('alignCenter').addEventListener('click', e => {
    if (canvas.getActiveObject().textAlign !== 'center') {
      canvas.getActiveObject().textAlign = 'center';
      document.getElementById('alignLeft').classList.remove('bold')
      document.getElementById('alignRight').classList.remove('bold')
      document.getElementById('alignCenter').classList.add('bold');
      save()
      canvas.renderAll();
    } else {
      canvas.getActiveObject().textAlign = 'left';
      document.getElementById('alignCenter').classList.remove('bold')
      save()
      canvas.renderAll();
    }
  })
  function changeTextSize(e) {
    const obj = canvas.getActiveObject();
    if (obj.getSelectedText()) {
      obj.setSelectionStyles({ 'fontSize': e.target.value });
    } else {
      obj.set({ 'fontSize': event.target.value })
    }
    obj.setSelectionStyles({ 'fontSize': e.target.value });
    save()
    canvas.renderAll();
  }
  function changeTextColor(event) {
    let obj = canvas.getActiveObject();
    if (obj) {
      if (obj.isEditing) {
        pickr.on('change', (color, instance) => {
          canvas.getActiveObject().setSelectionStyles({ 'fill': color.toHEXA().toString() });
        })
      } else {
        obj.setColor(event.target.value)
      }
      save()
      canvas.renderAll();
    }
    // canvas.getActiveObject().set({fill: event.target.value})
    // document.getElementById('colorCode').value = '';
    //   canvas.renderAll();
  }
  function changeFontFamily(event) {
    let obj = canvas.getActiveObject();
    if (obj) {
      if (obj.getSelectedText()) {
        canvas.getActiveObject().setSelectionStyles({ 'fontFamily': event.target.value });
      } else {
        obj.set({ fontFamily: event.target.value })
      }
      canvas.renderAll();
    }
  }
  
  
  
  
  // saving image
  // document.getElementById('saveImage').addEventListener('click', e => {
  //     e.preventDefault()
  //     var save = document.getElementById('demoCanvas');
  //     // document.querySelector('#pageLoader').style.display = 'block';
  //     // document.querySelector('#canvasLoader').style.display = 'block';
  //     const canvasFile = canvas.toDataURL({
  //         format: 'png',
  //         quality: 1,
  //         multiplier: 2,
  //         left: 0,
  //         top: 0,
  //         width: 600,
  //         height: 350
  //     });
  //     var link = document.getElementById('link');
  //     link.setAttribute('download', 'MintyPaper.png');
  //     link.setAttribute('href', canvasFile.replace("image/png", "image/octet-stream", { multiplier: 2 }));
  //     link.click();
  
  //     fetch('https://thumbvids.herokuapp.com/saveDesign', {
  //         method: 'POST',
  //         headers: {
  //             "Content-Type": "application/json"
  //         },
  //         body: JSON.stringify({
  //             message: canvasFile,
  //             svgFile: canvas.toJSON(),
  //             // type: e.getAttribute('data-type')
  //         })
  //     })
  //         .then(() => {
  //             window.location.href = '/';
  //         })
  //         .catch(err => console.log(err))
  //     // saveAs(blob, "yournewfile.png");
  // })
  
  
  //save template
  
  // document.getElementById('saveTemplate').addEventListener('click', () => {
  //     var save = document.getElementById('demoCanvas');
  //     // document.querySelector('#pageLoader').style.display = 'block';
  //     // document.querySelector('#canvasLoader').style.display = 'block';
  //     const canvasFile = canvas.toDataURL({
  //         format: 'png',
  //         quality: 1,
  //         multiplier: 2,
  //         left: 0,
  //         top: 0,
  //         width: 600,
  //         height: 400
  //     });
  //     // https://thumbvids.herokuapp.com/saveTemplate
  //     fetch('http://localhost:8000/saveTemplate', {
  //         method: 'POST',
  //         headers: {
  //             "Content-Type": "application/json"
  //         },
  //         body: JSON.stringify({
  //             message: canvasFile,
  //             svgFile: canvas.toJSON(),
  //         })
  //     })
  //         .then(() => {
  //             window.location.href = '/';
  //         })
  //         .catch(err => console.log(err))
  //     // saveAs(blob, "yournewfile.png");
  // })
  
  
  // undo 
  function replay(playStack, saveStack, buttonsOn) {
    saveStack.push(state);
    state = playStack.pop();
    var on = document.getElementById(buttonsOn);
    // var off = document.getElementById(buttonsOff);
    // turn both buttons off for the moment to prevent rapid clicking
    on.disabled = true;
    // off.disabled = true;
    canvas.clear();
    canvas.loadFromJSON(state, function () {
      canvas.renderAll();
      // now turn the buttons back on if applicable
      on.disabled = false;
      // if (playStack.length) {
      //   off.disabled = false;
      // }
    });
  }
  document.querySelector('#undo').addEventListener('click', function () {
    replay(undo, redo, 'undo');
  });
  
  
  // saving image
  // document.getElementById('saveImage').addEventListener('click', e => {
  //     e.preventDefault()
  //     var save = document.getElementById('demoCanvas');
  //     // document.querySelector('#pageLoader').style.display = 'block';
  //     // document.querySelector('#canvasLoader').style.display = 'block';
  //     const canvasFile = canvas.toDataURL({
  //         format: 'png',
  //         quality: 1,
  //         multiplier: 2,
  //         left: 0,
  //         top: 0,
  //         width: 600,
  //         height: 350
  //     });
  //     var link = document.getElementById('link');
  //     link.setAttribute('download', 'MintyPaper.png');
  //     link.setAttribute('href', canvasFile.replace("image/png", "image/octet-stream", { multiplier: 2 }));
  //     link.click();
  
  //     fetch('https://thumbvids.herokuapp.com/saveDesign', {
  //         method: 'POST',
  //         headers: {
  //             "Content-Type": "application/json"
  //         },
  //         body: JSON.stringify({
  //             message: canvasFile,
  //             svgFile: canvas.toJSON(),
  //             // type: e.getAttribute('data-type')
  //         })
  //     })
  //         .then(() => {
  //             window.location.href = '/';
  //         })
  //         .catch(err => console.log(err))
  //     // saveAs(blob, "yournewfile.png");
  // })
  
  
  //save template
  function getVideos() {
    document.getElementById('modalAccounts').innerHTML = '';
    document.getElementById('modalCardHeader').innerHTML = 'Fetching Videos';
    fetch('https://thumbvids.herokuapp.com/videos')
      .then(response => response.json())
      .then(data => {
        if (data.length === 0) {
          document.getElementById('youtubeSpinner').style.display = 'none';
          document.getElementById('modalAccounts').innerHTML = 'You have no videos yet. Please save your design and upload your video on YouTube to continue';
        } else {
          let body = '';
          console.log(data)
          data.items.forEach(datum => {
            body += `<div class="row modalAccounts" onclick="uploadThumbnails(this)" data-value="${datum.contentDetails.videoId}">
                      <div class="col-lg-4 col-md-4">
                        <img src="${datum.snippet.thumbnails.default.url}" class="img-fluid modalImage" /> 
                      </div>
                      <div class="col-lg-8 col-md-8">
                        ${datum.snippet.title}
                      </div>
                    </div><hr>
                  `
          })
          document.getElementById('youtubeSpinner').style.display = 'none';
          document.getElementById('modalAccounts').style.display = 'block';
          document.getElementById('modalAccounts').innerHTML = body;
          document.getElementById('modalCardHeader').innerHTML = 'Select Video';
        }
      })
      .catch(err => console.log(err))
  }
  // document.getElementById('getVideos').addEventListener('click', () => {
  // 
  // })
  function saveVideos() {
    let factor = 1280 / canvas.width;
    const canvasFile = canvas.toDataURL({
      format: 'png',
      quality: 1,
      multiplier: factor,
      left: 0,
      top: 0
    });
    var link = document.getElementById('link');
    link.setAttribute('download', 'MintyPaper.png');
    link.setAttribute('href', canvasFile.replace("image/png", "image/octet-stream"));
    link.click();
  
    window.location.href = "/templates"
  }
  function uploadThumbnails(e) {
    document.getElementById('modalCardHeader').innerHTML = 'Select Video';
    document.getElementById('youtubeSpinner').style.display = 'block';
    document.getElementById('modalAccounts').style.display = 'none';
    var save = document.getElementById('demoCanvas');
    // var blob = new Blob([save], {
    //   type: "image/png"
    // });
  
    const canvasFile = canvas.toDataURL({
      format: 'png',
      quality: 1,
      multiplier: 2,
      left: 0,
      top: 0,
      width: 600,
      height: 350
    });
    // var link = document.getElementById('link');
    // link.setAttribute('download', 'MintyPaper.png');
    // link.setAttribute('href', canvasFile.replace("image/png", "image/octet-stream", { multiplier: 2 }));
    // link.click();
  
    fetch('https://thumbvids.herokuapp.com/uploadThumbnail', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        videoId: e.getAttribute('data-value'),
        message: canvasFile,
        svgFile: canvas.toJSON(),
      })
    })
      .then(response => response.json())
      .then(data => {
        //  console.log(data)
        if (data === 'success') {
          console.log(data)
          window.location.pathname = '/success';
        } else {
          console.log(data)
          window.location.pathname = '/';
        }
      })
      .catch(err => console.log(err))
  
  
  }
  
  
  document.getElementById('toBack').addEventListener('click', () => {
    const active = canvas.getActiveObject();
    canvas.sendToBack(active);
    canvas.renderAll();
  })
  document.getElementById('toFront').addEventListener('click', () => {
    const active = canvas.getActiveObject();
    canvas.bringToFront(active);
    canvas.renderAll();
  })
  document.getElementById('backwards').addEventListener('click', () => {
    const active = canvas.getActiveObject();
    canvas.sendBackwards(active);
    canvas.renderAll();
  })
  document.querySelector('#delete').addEventListener('click', function (e) {
    if (canvas.getActiveObject()) {
      if (!canvas.getActiveObject().isEditing) {
        deleteSelectedObjectsFromCanvas();
        save()
      }
    }
  });
  
  function deleteSelectedObjectsFromCanvas() {
    var selection = canvas.getActiveObject();
    if (selection.type === 'activeSelection') {
      selection.forEachObject(function (element) {
        console.log(element);
        canvas.remove(element);
      });
    }
    else {
      canvas.remove(selection);
    }
    canvas.discardActiveObject();
    canvas.requestRenderAll();
  }
  
  // searchBackground  backgroundBox
  
  //searchForeground  foregroundBox