import React, { useRef, useEffect } from 'react';

interface InteractiveBackgroundProps {
  className?: string;
  theme?: 'light' | 'dark';
}

const darkThemeColors = {
    background: '#0f172a', // slate-900
    skyGradientStart: '#1e293b', // slate-800
    skyGradientEnd: '#0f172a', // slate-900
    baseLine: (opacity: number) => `rgba(51, 65, 85, ${opacity})`, // slate-700
    accent: (opacity: number) => `rgba(102, 65, 0, ${opacity})`, // amber-500
    shootingStar: '#fde68a', // amber-200
};
const lightThemeColors = {
    background: '#f1f5f9', // slate-100
    skyGradientStart: '#e2e8f0', // slate-200
    skyGradientEnd: '#f1f5f9', // slate-100
    baseLine: (opacity: number) => `rgba(148, 163, 184, ${opacity})`, // slate-400
    accent: (opacity: number) => `rgba(217, 119, 6, ${opacity})`, // amber-600
    shootingStar: '#475569', // slate-600
};

const InteractiveBackground: React.FC<InteractiveBackgroundProps> = ({ className, theme = 'dark' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const colors = theme === 'light' ? lightThemeColors : darkThemeColors;
    const mouse = { x: -1000, y: -1000, radius: 180 }; // Increased radius for more pronounced glow effect
    const parallax = { 
        current: {x: 0, y: 0}, 
        target: {x: 0, y: 0}, 
        factor: 0.08, // Increased factor for more noticeable movement
        smoothing: 0.05 // Controls how smoothly the parallax effect moves
    };
    
    let buildings: any[] = [];
    let shootingStars: any[] = [];

    const generateBuildings = () => {
        const buildingData = [
            // Far background layer (z=0.2)
            { x: 0.1, h: 0.3, w: 0.05, z: 0.2, details: 2 },
            { x: 0.18, h: 0.35, w: 0.04, z: 0.2, details: 2 },
            { x: 0.25, h: 0.4, w: 0.06, z: 0.2, details: 2 },
            { x: 0.75, h: 0.45, w: 0.05, z: 0.2, details: 2 },
            { x: 0.82, h: 0.35, w: 0.05, z: 0.2, details: 2 },
            { x: 0.9, h: 0.25, w: 0.04, z: 0.2, details: 2 },
            { x: 0.58, h: 0.3, w: 0.05, z: 0.2, details: 2 },

            // Mid-background layer (z=0.5)
            { x: 0.05, h: 0.4, w: 0.08, z: 0.5, details: 5 },
            { x: 0.28, h: 0.65, w: 0.11, z: 0.5, details: 8 },
            { x: 0.85, h: 0.68, w: 0.13, z: 0.5, details: 8 },
            { x: 0.95, h: 0.5, w: 0.07, z: 0.5, details: 5 },
            { x: 0.52, h: 0.5, w: 0.06, z: 0.5, details: 6 },
            { x: 0.38, h: 0.45, w: 0.07, z: 0.5, details: 5 },
            { x: 0.78, h: 0.6, w: 0.08, z: 0.5, details: 7 },

            // Main layer (z=1.0) - The iconic towers
            { x: 0.15, h: 0.55, w: 0.12, z: 1.0, details: 10, pattern: 'diamond' }, // GCC Bank
            { x: 0.45, h: 0.92, w: 0.08, z: 1.0, details: 25, pattern: 'pif' }, // PIF Tower
            { x: 0.68, h: 0.78, w: 0.1, z: 1.0, details: 15, pattern: 'twist' }, // WTC
            
            // Near-foreground layer (z=1.5) - Large and fast moving
            { x: -0.05, h: 0.3, w: 0.1, z: 1.5, details: 8 },
            { x: 1.05, h: 0.4, w: 0.12, z: 1.5, details: 10 },
            { x: 0.3, h: 0.2, w: 0.15, z: 1.5, details: 6 },
            { x: 0.8, h: 0.25, w: 0.13, z: 1.5, details: 7 },
        ];

        buildings = buildingData.map(b => {
            const lines: any[] = [];
            
            // Vertical lines are common
            lines.push({ x1: -0.5, y1: 0, x2: -0.5, y2: -1 });
            lines.push({ x1: 0.5, y1: 0, x2: 0.5, y2: -1 });

            switch (b.pattern) {
                case 'pif':
                    lines.push({ x1: -0.5, y1: -0.85, x2: 0, y2: -1 });
                    lines.push({ x1: 0.5, y1: -0.85, x2: 0, y2: -1 });
                    for (let i = 0; i <= b.details * 3; i++) {
                        const y = -i / (b.details * 3.3);
                        lines.push({ x1: -0.5, y1: y, x2: 0.5, y2: y });
                    }
                    break;
                case 'twist':
                    for (let i = 0; i <= b.details * 2; i++) {
                        const p = i / (b.details*2);
                        const twist = 0.2 * Math.sin(p * Math.PI * 1.5);
                        lines.push({ x1: -0.5 + twist, y1: -p, x2: 0.5 + twist, y2: -p });
                    }
                    break;
                case 'diamond':
                    lines.push({ x1: -0.5, y1: -1, x2: 0.5, y2: -1 });
                    for (let i = -b.details; i < b.details; i++) {
                        const yOffset = i * 0.1;
                        if (yOffset > -1 && yOffset < 0) {
                            lines.push({ x1: -0.5, y1: yOffset, x2: 0.5, y2: yOffset - 0.2 });
                            lines.push({ x1: 0.5, y1: yOffset, x2: -0.5, y2: yOffset - 0.2 });
                        }
                    }
                    break;
                default:
                     lines.push({ x1: -0.5, y1: -1, x2: 0.5, y2: -1 });
                     for (let i = 1; i < b.details * 2; i++) {
                        lines.push({ x1: -0.5, y1: -i / (b.details*2), x2: 0.5, y2: -i / (b.details*2) });
                    }
                    break;
            }

            return { ...b, lines };
        });
    };
    
    const generateStars = () => {
        shootingStars = []; // Clear previous stars
        for(let i = 0; i < 3; i++) {
            shootingStars.push({
                x: Math.random() * canvas.width * 2 - canvas.width,
                y: Math.random() * canvas.height * 0.4,
                len: Math.random() * 80 + 20,
                speed: Math.random() * 3 + 2,
                opacity: Math.random() * 0.5 + 0.5,
                reset: () => {
                    const self = shootingStars[i];
                    self.x = Math.random() * canvas.width * 2 - canvas.width;
                    self.y = Math.random() * canvas.height * 0.4;
                }
            });
        }
    };


    const handleMouseMove = (event: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        
        // Get mouse position relative to canvas
        mouse.x = event.clientX - rect.left;
        mouse.y = event.clientY - rect.top;
        
        // Calculate parallax offset from center
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        
        // Enhanced parallax effect with easing
        const distanceFromCenter = Math.sqrt(
            Math.pow(mouse.x - centerX, 2) + 
            Math.pow(mouse.y - centerY, 2)
        );
        const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);
        const easing = Math.pow(distanceFromCenter / maxDistance, 1.5);
        
        parallax.target.x = (mouse.x - centerX) * parallax.factor * easing;
        parallax.target.y = (mouse.y - centerY) * parallax.factor * easing;
    };
    const handleMouseLeave = () => { 
      mouse.x = -1000; 
      mouse.y = -1000;
      parallax.target.x = 0;
      parallax.target.y = 0;
    };
    // Listen on the window so mouse moves are captured even when the canvas
    // is visually behind other DOM elements (the main content overlays the canvas).
    // We keep the canvas pointer-events disabled so it doesn't block UI interactions.
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    
    function distToSegmentSquared(p: {x:number, y:number}, v: {x:number, y:number}, w: {x:number, y:number}) {
        const l2 = (v.x - w.x)**2 + (v.y - w.y)**2;
        if (l2 === 0) return (p.x - v.x)**2 + (p.y - v.y)**2;
        let t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
        t = Math.max(0, Math.min(1, t));
        return (p.x - (v.x + t * (w.x - v.x)))**2 + (p.y - (v.y + t * (w.y - v.y)))**2;
    }


    function animate() {
      if (!ctx) return;

      // Smooth parallax movement
      parallax.current.x += (parallax.target.x - parallax.current.x) * parallax.smoothing;
      parallax.current.y += (parallax.target.y - parallax.current.y) * parallax.smoothing;
      
      // Clear canvas with gradient
      const skyGradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 0.7);
      skyGradient.addColorStop(0, colors.skyGradientStart);
      skyGradient.addColorStop(1, colors.skyGradientEnd);
      ctx.fillStyle = skyGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Animate stars
      shootingStars.forEach(star => {
          star.x += star.speed;
          if(star.x - star.len > canvas.width) {
              star.reset();
          }
          ctx.beginPath();
          const gradient = ctx.createLinearGradient(star.x, star.y, star.x - star.len, star.y);
          gradient.addColorStop(0, `${colors.shootingStar}`);
          gradient.addColorStop(1, `rgba(253, 230, 138, 0)`);
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 1;
          ctx.moveTo(star.x, star.y);
          ctx.lineTo(star.x - star.len, star.y);
          ctx.stroke();
      });


      buildings.sort((a, b) => a.z - b.z).forEach(b => {
          const w = canvas.width;
          const h = canvas.height;
          
          const buildingParallaxX = parallax.current.x * b.z;
          const buildingParallaxY = parallax.current.y * b.z;
          
          ctx.save();
          ctx.translate(buildingParallaxX, buildingParallaxY);

          b.lines.forEach((line: any) => {
              const x1 = b.x * w + line.x1 * b.w * w * 0.8;
              const y1 = h + line.y1 * b.h * h;
              const x2 = b.x * w + line.x2 * b.w * w * 0.8;
              const y2 = h + line.y2 * b.h * h;

              const distSq = distToSegmentSquared({x: mouse.x - buildingParallaxX, y: mouse.y - buildingParallaxY}, {x: x1, y: y1}, {x: x2, y: y2});
              let finalOpacity = 0.3 * b.z; // Base opacity scaled by depth
              let finalWidth = 1;
              let finalColor = colors.baseLine;
              
              // Enhanced glow effect
              if (distSq < mouse.radius**2) {
                  const distance = Math.sqrt(distSq);
                  const mouseFactor = Math.pow(1 - distance / mouse.radius, 1.5); // More pronounced falloff
                  finalOpacity = Math.max(finalOpacity, mouseFactor * 1); // Increased max opacity
                  finalWidth = 1 + mouseFactor * 2; // More pronounced width variation
                  finalColor = colors.accent;
                  
                  // Add subtle pulse effect based on time
                  const pulse = Math.sin(Date.now() * 0.005) * 0.1 + 0.9;
                  finalOpacity *= pulse;
              }
              
              if (finalOpacity > 0) {
                  ctx.beginPath();
                  ctx.moveTo(x1, y1);
                  ctx.lineTo(x2, y2);
                  ctx.strokeStyle = finalColor(finalOpacity);
                  ctx.lineWidth = finalWidth;
                  ctx.stroke();
              }
          });
          ctx.restore();
      });
      
      animationFrameId.current = requestAnimationFrame(animate);
    }
    
    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        canvas.width = width;
        canvas.height = height;
        generateBuildings();
        generateStars();
      }
    });

    if (canvas.parentElement) {
        resizeObserver.observe(canvas.parentElement);
        const parent = canvas.parentElement;
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
        generateBuildings();
        generateStars();
        animate();
    }

        return () => {
            if(animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
            resizeObserver.disconnect();
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
        };
  }, [theme]);

    const bgColor = theme === 'light' ? lightThemeColors.background : darkThemeColors.background;
    // Make canvas ignore pointer events so it doesn't block page interactions;
    // we still capture mouse position via window listeners above.
    return <canvas ref={canvasRef} className={className} style={{ backgroundColor: bgColor, pointerEvents: 'none' }} />;
};

export default InteractiveBackground;