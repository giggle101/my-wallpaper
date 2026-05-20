// Wait until the HTML document is fully loaded before executing
document.addEventListener('DOMContentLoaded', () => {
  
  // Grab all elements with the 'parallax-layer' class
  const layers = document.querySelectorAll('.parallax-layer');

  // Track the mouse movement across the desktop screen
  document.addEventListener('mousemove', (event) => {
    
    // 1. Find the exact center point of the user's viewport
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    // 2. Calculate how far the cursor is from that center point
    // If cursor is left of center, moveX is negative. If right, it's positive.
    const moveX = event.clientX - centerX;
    const moveY = event.clientY - centerY;

    // 3. Loop through every single layer and update its position
    layers.forEach((layer) => {
      
      // Pull the unique numerical weight value from the HTML data attribute
      const depth = parseFloat(layer.getAttribute('data-depth')) || 0;

      /* 
         MULTIPLIER MATH ENGINE
         We multiply the cursor offset distance by the layer's depth weight.
         - Lower depths (e.g., 0.1) move the layer very slightly (feels far away).
         - Higher depths (e.g., 0.6) make it track closer to the cursor (feels close).
         
         Note: Changing the '*' to a '-' will invert the motion direction!
      */
      const translateX = moveX * depth;
      const translateY = moveY * depth;

      // 4. Inject the calculated coordinate values directly into the CSS Transform
      layer.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`;
    });
  });
});
