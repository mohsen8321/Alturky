import React, { useRef, useEffect } from 'react';

interface InteractiveBackgroundProps {
  className?: string;
  theme?: 'light' | 'dark';
}

// Ultra-detailed KAFD skyline data with programmatic generation for high density
const generateKafdData = () => {
    const buildings: { baseX: number, baseY: number, width: number, height: number, lines: {x: number, y: number}[][] }[] = [];
    
    // --- PIF Tower (very detailed) ---
    const pif: any = { baseX: 0.45, baseY: 1.0, width: 0.08, height: 0.92, lines: [] };
    pif.lines.push([{x: -0.5, y: 0}, {x: -0.5, y: -0.85}], [{x: 0.5, y: 0}, {x: 0.5, y: -0.85}]);
    pif.lines.push([{x: -0.5, y: -0.85}, {x: 0, y: -1}], [{x: 0.5, y: -0.85}, {x: 0, y: -1}]);
    for (let i = 0; i <= 85; i++) {
        const y = -i / 92; 
        pif.lines.push([{x: -0.5, y: y}, {x: 0.5, y: y}]);
    }
    for (let i = 0; i <= 10; i++) {
        const y_start = -i * 0.08;
        const y_mid = y_start - 0.04;
        const y_end = y_start - 0.08;
        if (y_end >= -1) {
          pif.lines.push([{x: -0.5, y: y_start}, {x: 0, y: y_mid}], [{x: 0.5, y: y_start}, {x: 0, y: y_mid}]);
          pif.lines.push([{x: 0, y: y_mid}, {x: -0.5, y: y_end}], [{x: 0, y: y_mid}, {x: 0.5, y: y_end}]);
        }
    }
    buildings.push(pif);


    // --- KAFD World Trade Center (Twisted tower, very detailed) ---
    const wtc: any = { baseX: 0.68, baseY: 1.0, width: 0.1, height: 0.78, lines: [] };
    wtc.lines.push([{x: -0.5, y: 0}, {x: -0.1, y: -1}], [{x: 0.5, y: 0}, {x: 0.9, y: -1}]);
    wtc.lines.push([{x: -0.5, y: 0}, {x: 0.9, y: -1}], [{x: 0.5, y: 0}, {x: -0.1, y: -1}]);
    for (let i = 0; i <= 60; i++) {
        const progress = i / 60;
        const twist = 0.5 * Math.sin(progress * Math.PI);
        wtc.lines.push([{x: -0.5 + twist, y: -progress}, {x: 0.5 + twist, y: -progress}]);
    }
    for (let j = 0; j < 5; j++) {
        const x_start = -0.5 + (j * 0.25);
        const points = [];
        for (let i = 0; i <= 60; i++) {
            const progress = i / 60;
            const twist = 0.5 * Math.sin(progress * Math.PI);
            points.push({x: x_start + twist, y: -progress});
        }
        for (let i = 0; i < points.length - 1; i++) {
            wtc.lines.push([points[i], points[i+1]]);
        }
    }
    buildings.push(wtc);

    // --- GCC Bank HQ (Diamond pattern, very detailed) ---
    const gcc: any = { baseX: 0.15, baseY: 1.0, width: 0.12, height: 0.55, lines: [] };
    gcc.lines.push([{x: -0.5, y: 0}, {x: -0.5, y: -0.8}], [{x: 0.5, y: 0}, {x: 0.5, y: -0.8}]);
    gcc.lines.push([{x: -0.5, y: -0.8}, {x: 0, y: -1}], [{x: 0.5, y: -0.8}, {x: 0, y: -1}]);
    for (let i = 0; i < 30; i++) {
        gcc.lines.push([{x: -0.5, y: -i * 0.026}, {x: 0.5, y: -i * 0.026}]);
    }
    for (let i = -15; i < 15; i++) {
        gcc.lines.push([{x: -0.5, y: i * 0.08}, {x: 0.5, y: (i * 0.08) - 0.16}]);
        gcc.lines.push([{x: 0.5, y: i * 0.08}, {x: -0.5, y: (i * 0.08) - 0.16}]);
    }
    buildings.push(gcc);
    
    // --- Detailed supporting buildings ---
    const blp: any = { baseX: 0.28, baseY: 1.0, width: 0.11, height: 0.65, lines: [] };
    blp.lines.push([{x: -0.5, y: 0}, {x: -0.5, y: -1}], [{x: 0.5, y: 0}, {x: 0.5, y: -1}], [{x: -0.5, y: -1}, {x: 0.5, y: -1}]);
    for(let i=1; i < 50; i++) { blp.lines.push([{x: -0.5, y: -i*0.02}, {x: 0.5, y: -i*0.02}]); }
    for(let i=1; i < 6; i++) { blp.lines.push([{x: -0.5 + i*0.166, y: 0}, {x: -0.5 + i*0.166, y: -1}]); }
    buildings.push(blp);

    const brw: any = { baseX: 0.85, baseY: 1.0, width: 0.13, height: 0.68, lines: [] };
    brw.lines.push([{x: -0.5, y: 0}, {x: -0.5, y: -1}], [{x: 0.5, y: 0}, {x: 0.5, y: -0.8}], [{x: -0.5, y: -1}, {x: 0.5, y: -0.8}]);
    for(let i=1; i < 55; i++) {
        const p = i/55;
        brw.lines.push([{x: -0.5, y: -p}, {x: 0.5, y: -p * 0.8}]);
    }
    buildings.push(brw);

    const bfl: any = { baseX: 0.05, baseY: 1.0, width: 0.08, height: 0.4, lines: [] };
    bfl.lines.push([{x: -0.5, y: 0}, {x: -0.5, y: -1}], [{x: 0.5, y: 0}, {x: 0.5, y: -1}]);
    for(let i=1; i < 30; i++) { bfl.lines.push([{x: -0.5, y: -i*0.033}, {x: 0.5, y: -i*0.033}]); }
    buildings.push(bfl);

    const bfr: any = { baseX: 0.95, baseY: 1.0, width: 0.07, height: 0.5, lines: [] };
    bfr.lines.push([{x: -0.5, y: 0}, {x: -0.2, y: -1}], [{x: 0.5, y: 0}, {x: 0.2, y: -1}], [{x: -0.2, y: -1}, {x: 0.2, y: -1}]);
    for(let i=1; i < 35; i++) {
        const p = i/35;
        bfr.lines.push([{x: -0.5 + p*0.3, y: -p}, {x: 0.5 - p*0.3, y: -p}]);
    }
    buildings.push(bfr);
    
    return { buildings };
}

const { buildings: kafdSkylineData } = generateKafdData();


const darkThemeColors = {
    background: '#111827', // gray-900
    baseLine: (opacity: number) => `rgba(71, 85, 105, ${opacity})`, // slate-600
    accent: (opacity: number) => `rgba(16, 185, 129, ${opacity})`, // emerald-500
};
const lightThemeColors = {
    background: '#f8fafc', // slate-50
    baseLine: (opacity: number) => `rgba(203, 213, 225, ${opacity})`, // slate-300
    accent: (opacity: number) => `rgba(5, 150, 105, ${opacity})`, // emerald-600
};

const InteractiveBackground: React.FC<InteractiveBackgroundProps> = ({ className, theme = 'dark' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const linesRef = useRef<any[]>([]);
  const pulsesRef = useRef<any[]>([]);
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const colors = theme === 'light' ? lightThemeColors : darkThemeColors;
    const mouse = { x: -1000, y: -1000, radius: 150 };
    const parallax = { current: {x: 0, y: 0}, target: {x: 0, y: 0}, factor: 0.02 };

    const handleMouseMove = (event: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = event.clientX - rect.left;
        mouse.y = event.clientY - rect.top;
        parallax.target.x = (mouse.x - canvas.width / 2) * parallax.factor;
        parallax.target.y = (mouse.y - canvas.height / 2) * parallax.factor;
    };
    const handleMouseLeave = () => { 
      mouse.x = -1000; 
      mouse.y = -1000;
      parallax.target.x = 0;
      parallax.target.y = 0;
    };
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    function generateLinesAndPulses() {
        const w = canvas.width;
        const h = canvas.height;
        linesRef.current = [];
        kafdSkylineData.forEach(shape => {
            shape.lines.forEach(line => {
                linesRef.current.push({
                    x1: shape.baseX * w + line[0].x * shape.width * w * 0.8,
                    y1: shape.baseY * h + line[0].y * shape.height * h,
                    x2: shape.baseX * w + line[1].x * shape.width * w * 0.8,
                    y2: shape.baseY * h + line[1].y * shape.height * h,
                    opacity: 0,
                    fadeSpeed: 0.005 + Math.random() * 0.01,
                    delay: Math.random() * 200,
                    state: 'fading-in',
                });
            });
        });
        
        pulsesRef.current = [];
        for (let i = 0; i < 50; i++) {
          pulsesRef.current.push({
            lineIndex: Math.floor(Math.random() * linesRef.current.length),
            progress: Math.random(),
            speed: 0.001 + Math.random() * 0.002,
            delay: Math.random() * 500,
          });
        }
    }

    function distToSegmentSquared(p: {x:number, y:number}, v: {x:number, y:number}, w: {x:number, y:number}) {
        const l2 = (v.x - w.x)**2 + (v.y - w.y)**2;
        if (l2 === 0) return (p.x - v.x)**2 + (p.y - v.y)**2;
        let t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
        t = Math.max(0, Math.min(1, t));
        return (p.x - (v.x + t * (w.x - v.x)))**2 + (p.y - (v.y + t * (w.y - v.y)))**2;
    }

    function animate() {
      if (!ctx) return;

      parallax.current.x += (parallax.target.x - parallax.current.x) * 0.05;
      parallax.current.y += (parallax.target.y - parallax.current.y) * 0.05;
      
      ctx.fillStyle = colors.background;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.save();
      ctx.translate(parallax.current.x, parallax.current.y);

      linesRef.current.forEach(line => {
        if (line.delay > 0) {
          line.delay--;
        } else {
          if (line.state === 'fading-in') {
            line.opacity += line.fadeSpeed;
            if (line.opacity >= 0.5) { line.opacity = 0.5; line.state = 'visible'; line.delay = 100 + Math.random() * 200; }
          } else if (line.state === 'fading-out') {
            line.opacity -= line.fadeSpeed;
            if (line.opacity <= 0) { line.opacity = 0; line.state = 'hidden'; line.delay = 200 + Math.random() * 300; }
          }
           if(line.delay <= 0) {
               if (line.state === 'visible') line.state = 'fading-out';
               else if (line.state === 'hidden') line.state = 'fading-in';
           }
        }
        
        const distSq = distToSegmentSquared({x: mouse.x - parallax.current.x, y: mouse.y - parallax.current.y}, {x: line.x1, y: line.y1}, {x: line.x2, y: line.y2});
        let finalOpacity = line.opacity;
        let finalWidth = 1;
        let finalColor = colors.baseLine;

        if (distSq < mouse.radius**2) {
            const mouseFactor = 1 - Math.sqrt(distSq) / mouse.radius;
            finalOpacity = Math.max(finalOpacity, mouseFactor * 0.9);
            finalWidth = 1 + mouseFactor * 1.5;
            finalColor = colors.accent;
        }
        
        if (finalOpacity > 0) {
            ctx.beginPath();
            ctx.moveTo(line.x1, line.y1);
            ctx.lineTo(line.x2, line.y2);
            ctx.strokeStyle = finalColor(finalOpacity);
            ctx.lineWidth = finalWidth;
            ctx.stroke();
        }
      });

      pulsesRef.current.forEach(pulse => {
        if (pulse.delay > 0) {
            pulse.delay--;
            return;
        }
        
        pulse.progress += pulse.speed;
        if (pulse.progress > 1) {
            pulse.progress = 0;
            pulse.lineIndex = Math.floor(Math.random() * linesRef.current.length);
        }
        
        const line = linesRef.current[pulse.lineIndex];
        if (line && line.opacity > 0.1) {
            const x = line.x1 + (line.x2 - line.x1) * pulse.progress;
            const y = line.y1 + (line.y2 - line.y1) * pulse.progress;
            
            ctx.beginPath();
            ctx.arc(x, y, 1.5, 0, Math.PI * 2);
            ctx.fillStyle = colors.accent(0.8);
            ctx.fill();
        }
      });
      
      ctx.restore();
      animationFrameId.current = requestAnimationFrame(animate);
    }
    
    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        canvas.width = width;
        canvas.height = height;
        generateLinesAndPulses();
      }
    });

    if (canvas.parentElement) {
        resizeObserver.observe(canvas.parentElement);
        const parent = canvas.parentElement;
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
        generateLinesAndPulses();
        animate();
    }

    return () => {
      if(animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      resizeObserver.disconnect();
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [theme]);

  const bgColor = theme === 'light' ? lightThemeColors.background : darkThemeColors.background;
  return <canvas ref={canvasRef} className={className} style={{ backgroundColor: bgColor }} />;
};

export default InteractiveBackground;