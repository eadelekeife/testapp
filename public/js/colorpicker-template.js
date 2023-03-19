const pickr = Pickr.create({
    el: '.color-picker',
    theme: 'monolith', // or 'monolith', or 'nano'
    default: '#fff',
  
    swatches: [
        'rgba(244, 67, 54, 1)',
        'rgba(233, 30, 99, 0.95)',
        'rgba(156, 39, 176, 0.9)',
        'rgba(103, 58, 183, 0.85)',
        'rgba(63, 81, 181, 0.8)',
        'rgba(33, 150, 243, 0.75)',
        'rgba(3, 169, 244, 0.7)',
        'rgba(0, 188, 212, 0.7)',
        'rgba(0, 150, 136, 0.75)',
        'rgba(76, 175, 80, 0.8)',
        'rgba(139, 195, 74, 0.85)',
        'rgba(205, 220, 57, 0.9)',
        'rgba(255, 235, 59, 0.95)',
        'rgba(255, 193, 7, 1)'
    ],
  
    components: {
  
        // Main components
        preview: true,
        opacity: true,
        hue: true,
  
        // Input / output Options
        interaction: {
            input: true,
            clear: true,
            save: false,
        }
    }
  });
  
  pickr.on('change', (color, instance) => {
    if (canvas.getActiveObject().getSelectedText()) {
      pickr.on('change', (color, instance) => {
        canvas.getActiveObject().setSelectionStyles({ fill: color.toHEXA().toString() });
      })
    } else {
      canvas.getActiveObject().set({fill: color.toHEXA().toString()})
    }
    save()
  })
  
  const backgroundPicker = Pickr.create({
    el: '.colorPick',
    theme: 'monolith', // or 'monolith', or 'nano'
    default: '#fff',
  
    swatches: [
        'rgba(244, 67, 54, 1)',
        'rgba(233, 30, 99, 0.95)',
        'rgba(156, 39, 176, 0.9)',
        'rgba(103, 58, 183, 0.85)',
        'rgba(63, 81, 181, 0.8)',
        'rgba(33, 150, 243, 0.75)',
        'rgba(3, 169, 244, 0.7)',
        'rgba(0, 188, 212, 0.7)',
        'rgba(0, 150, 136, 0.75)',
        'rgba(76, 175, 80, 0.8)',
        'rgba(139, 195, 74, 0.85)',
        'rgba(205, 220, 57, 0.9)',
        'rgba(255, 235, 59, 0.95)',
        'rgba(255, 193, 7, 1)'
    ],
  
    components: {
  
        // Main components
        preview: true,
        opacity: true,
        hue: true,
  
        // Input / output Options
        interaction: {
            input: true,
            clear: true,
            save: false
        }
    }
  });
  backgroundPicker.on('change', (color, instance) => {
      canvas.backgroundImage = false
      canvas.backgroundColor = color.toHEXA().toString();
      canvas.renderAll();
  })
  
  const layerPicker = Pickr.create({
    el: '.layerPicker',
    theme: 'monolith', // or 'monolith', or 'nano'
    default: '#fff',
  
    swatches: [
        'rgba(244, 67, 54, 1)',
        'rgba(233, 30, 99, 0.95)',
        'rgba(156, 39, 176, 0.9)',
        'rgba(103, 58, 183, 0.85)',
        'rgba(63, 81, 181, 0.8)',
        'rgba(33, 150, 243, 0.75)',
        'rgba(3, 169, 244, 0.7)',
        'rgba(0, 188, 212, 0.7)',
        'rgba(0, 150, 136, 0.75)',
        'rgba(76, 175, 80, 0.8)',
        'rgba(139, 195, 74, 0.85)',
        'rgba(205, 220, 57, 0.9)',
        'rgba(255, 235, 59, 0.95)',
        'rgba(255, 193, 7, 1)'
    ],
  
    components: {
  
        // Main components
        preview: true,
        opacity: true,
        hue: true,
  
        // Input / output Options
        interaction: {
            input: true,
            clear: true,
            save: true
        }
    }
  });
  layerPicker.on('change', (color, instance) => {
    if(canvas.getActiveObject()) { 
      if(canvas.getActiveObject().get('type') === 'rect') {
        canvas.getActiveObject().set({fill: color.toHEXA().toString()});
        canvas.renderAll();
      }
    }
  })
  
  const shapePicker = Pickr.create({
    el: '.shapePicker',
    theme: 'monolith', // or 'monolith', or 'nano'
    default: '#fff',
  
    swatches: [
        'rgba(244, 67, 54, 1)',
        'rgba(233, 30, 99, 0.95)',
        'rgba(156, 39, 176, 0.9)',
        'rgba(103, 58, 183, 0.85)',
        'rgba(63, 81, 181, 0.8)',
        'rgba(33, 150, 243, 0.75)',
        'rgba(3, 169, 244, 0.7)',
        'rgba(0, 188, 212, 0.7)',
        'rgba(0, 150, 136, 0.75)',
        'rgba(76, 175, 80, 0.8)',
        'rgba(139, 195, 74, 0.85)',
        'rgba(205, 220, 57, 0.9)',
        'rgba(255, 235, 59, 0.95)',
        'rgba(255, 193, 7, 1)'
    ],
  
    components: {
  
        // Main components
        preview: true,
        opacity: true,
        hue: true,
  
        // Input / output Options
        interaction: {
            input: true,
            clear: true,
            save: true
        }
    }
  });
  shapePicker.on('change', (color, instance) => {
    if(canvas.getActiveObject()) { 
      if(canvas.getActiveObject().fill === 'rgba(0,0,0,0)') {
        canvas.getActiveObject().set({stroke: color.toHEXA().toString()});
        canvas.renderAll()
      } else {
        canvas.getActiveObject().set({fill: color.toHEXA().toString()});
        canvas.renderAll()
      }
    }
  })
  
  const borderPicker = Pickr.create({
    el: '.borderPicker',
    theme: 'monolith', // or 'monolith', or 'nano'
    default: '#fff',
  
    swatches: [
        'rgba(244, 67, 54, 1)',
        'rgba(233, 30, 99, 0.95)',
        'rgba(156, 39, 176, 0.9)',
        'rgba(103, 58, 183, 0.85)',
        'rgba(63, 81, 181, 0.8)',
        'rgba(33, 150, 243, 0.75)',
        'rgba(3, 169, 244, 0.7)',
        'rgba(0, 188, 212, 0.7)',
        'rgba(0, 150, 136, 0.75)',
        'rgba(76, 175, 80, 0.8)',
        'rgba(139, 195, 74, 0.85)',
        'rgba(205, 220, 57, 0.9)',
        'rgba(255, 235, 59, 0.95)',
        'rgba(255, 193, 7, 1)'
    ],
  
    components: {
  
        // Main components
        preview: true,
        opacity: true,
        hue: true,
  
        // Input / output Options
        interaction: {
            input: true,
            clear: true,
            save: false
        }
    }
  });
  borderPicker.on('change', (color, instance) => {
    if(canvas.getActiveObject()) { 
        canvas.getActiveObject().set({stroke: color.toHEXA().toString()});
        canvas.renderAll()
    }
  })
  
  