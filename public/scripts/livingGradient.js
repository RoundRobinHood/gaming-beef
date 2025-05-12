document.addEventListener('DOMContentLoaded', () => {
  function linGradient(container) {
    const w = container.clientWidth, h = container.clientHeight;
    let width = w, height = h;
    const startColor = JSON.parse(container.getAttribute('data-start-color') ?? '[1.0, 0.0, 0.5]');
    const endColor = JSON.parse(container.getAttribute('data-end-color') ?? '[0.2, 0.0, 1.0]');
    const noiseAmplitude = +(container.getAttribute('data-noise-amplitude') || '0.2');

    const resolution = JSON.parse(container.getAttribute('data-resolution') ?? '[10.0, 10.0]');
    let angle = +(container.getAttribute('data-angle') || '0');
    if(![0, 45, 90, 135, 180, 225, 270, 315].includes(angle))
    {
      console.error(`Invalid data-angle (val: ${angle})`);
      return null;
    }
    angle *= Math.PI / 180;
    angle = 2 * Math.PI - angle;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const origin = [
      cos >= 0 ? 0 : 1,
      sin >= 0 ? 0 : 1
    ];
    
    let tDiv = 1;
    [[0, 1], [1, 0], [1, 1]].forEach(x => {
      const tVal = x[0] * cos + x[1] * sin;
      if(tVal > tDiv)
        tDiv = tVal;
    });

    console.log(startColor, endColor, resolution, tDiv);
    return function sketch(p) {
      let myShader;
      p.preload = () => {
        myShader = p.loadShader('/shaders/shader.vert', '/shaders/shader.frag');
      }

      p.setup = () => {
        const canvas = document.createElement('canvas');
        container.appendChild(canvas);
        p.createCanvas(width, height, p.WEBGL, canvas);

        const resizer = () => {
          p.remove();
          width = container.clientWidth, height = container.clientHeight;
          window.removeEventListener('resize', resizer);
          new p5(sketch);
        }
        window.addEventListener('resize', resizer);
      }

      p.draw = () => {
        // p.background(255);
        p.noStroke();

        // Use our custom shader
        p.shader(myShader);

        myShader.setUniform('time', p.millis());

        myShader.setUniform('colorA', startColor);
        myShader.setUniform('colorB', endColor);

        myShader.setUniform('resolution', resolution);

        myShader.setUniform('angle', angle);
        myShader.setUniform('origin', origin);
        myShader.setUniform('tDiv', tDiv);

        myShader.setUniform('noiseAmplitude', noiseAmplitude);

        p.rect(-width/2, -height/2, width, height);
      }
    }
  }

  document.querySelectorAll('.lin-gradient').forEach(container => {
    const handler = linGradient(container);
    if(handler)
      new p5(handler);
  });
});
