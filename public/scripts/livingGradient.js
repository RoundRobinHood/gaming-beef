document.addEventListener('DOMContentLoaded', () => {
  function linGradient(canvas, container) {

    const width = container.clientWidth, height = container.clientHeight;
    const startColor = JSON.parse(container.getAttribute('data-start-color') ?? '[1.0, 0.0, 0.5]');
    const endColor = JSON.parse(container.getAttribute('data-end-color') ?? '[0.2, 0.0, 1.0]');
    const resolution = JSON.parse(container.getAttribute('data-resolution') ?? '[10.0, 10.0]');
    let angle = +(container.getAttribute('data-angle') || '0');
    if(![0, 45, 90, 135, 180, 225, 270, 315].includes(angle))
    {
      console.error(`Invalid data-angle (val: ${angle})`);
      return null;
    }
    angle *= Math.PI / 180;
    const origin = [
      Math.cos(angle) > 0 ? 0 : 1,
      Math.sin(angle) >= 0 ? 0 : 1
    ];
    // const origin = angle > 180 ? [0,0] : [0,1];

    console.log(startColor, endColor, resolution);
    return function sketch(p) {
      let myShader;
      p.preload = () => {
        myShader = p.loadShader('/shaders/shader.vert', '/shaders/shader.frag');
      }

      p.setup = () => {
        p.createCanvas(width, height, p.WEBGL, canvas);
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

        myShader.setUniform('angle', 360 - angle);
        myShader.setUniform('origin', origin);

        p.rect(-width/2, -height/2, width, height);
      }

      window.addEventListener('resize', () => {
        p.resizeCanvas(container.clientWidth, container.clientHeight);
      });
    }
  }

  document.querySelectorAll('.lin-gradient').forEach(container => {
    const canvas = document.createElement('canvas');

    container.appendChild(canvas);
    const handler = linGradient(canvas, container);
    if(handler)
      new p5(handler);
  });
});
