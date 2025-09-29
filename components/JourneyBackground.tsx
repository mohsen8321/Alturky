import React, { useRef, useEffect } from 'react';

const JourneyBackground: React.FC<{ className?: string }> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const mouse = { x: -1000, y: -1000 };
    let milestones: { x: number; y: number }[] = [];
    let totalPathLength = 0;
    const pulses: { progress: number; speed: number; }[] = [];

    const handleMouseMove = (event: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = event.clientX - rect.left;
        mouse.y = event.clientY - rect.top;
    };

    const handleMouseLeave = () => {
        mouse.x = -1000;
        mouse.y = -1000;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    function createPath() {
        milestones = [];
        const w = canvas.width;
        const h = canvas.height;
        milestones.push({ x: w * 0.3, y: h * 0.1 });
        milestones.push({ x: w * 0.7, y: h * 0.25 });
        milestones.push({ x: w * 0.4, y: h * 0.5 });
        milestones.push({ x: w * 0.6, y: h * 0.75 });
        milestones.push({ x: w * 0.3, y: h * 0.9 });
        
        totalPathLength = 0;
        for (let i = 0; i < milestones.length - 1; i++) {
            const p1 = milestones[i];
            const p2 = milestones[i+1];
            totalPathLength += Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
        }

        pulses.length = 0; // Clear existing pulses
        for (let i = 0; i < 3; i++) {
           pulses.push({ progress: i * 0.33, speed: 0.0003 + Math.random() * 0.0002 });
        }
    }

    function drawGrid(ctx: CanvasRenderingContext2D) {
      const gridSize = 40;
      ctx.strokeStyle = 'rgba(51, 65, 85, 0.5)'; // slate-700
      ctx.lineWidth = 0.5;
      for (let x = 0; x <= canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y <= canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    }

    function getPointOnPath(progress: number) {
        const distance = progress * totalPathLength;
        let travelled = 0;

        for (let i = 0; i < milestones.length - 1; i++) {
            const p1 = milestones[i];
            const p2 = milestones[i+1];
            const segmentLength = Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
            if (travelled + segmentLength >= distance) {
                const segmentProgress = (distance - travelled) / segmentLength;
                return {
                    x: p1.x + (p2.x - p1.x) * segmentProgress,
                    y: p1.y + (p2.y - p1.y) * segmentProgress,
                };
            }
            travelled += segmentLength;
        }
        return milestones[milestones.length - 1]; // Fallback
    }

    function animate() {
      if (!ctx || milestones.length === 0) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      drawGrid(ctx);

      // Mouse Interaction: Highlight grid lines
      if (mouse.x > 0) {
          ctx.strokeStyle = 'rgba(16, 185, 129, 0.3)';
          ctx.lineWidth = 1;
          const nearestX = Math.round(mouse.x / 40) * 40;
          const nearestY = Math.round(mouse.y / 40) * 40;
          
          ctx.beginPath();
          ctx.moveTo(nearestX, 0);
          ctx.lineTo(nearestX, canvas.height);
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(0, nearestY);
          ctx.lineTo(canvas.width, nearestY);
          ctx.stroke();
      }

      // Draw full path faintly
      ctx.beginPath();
      ctx.moveTo(milestones[0].x, milestones[0].y);
      for (let i = 1; i < milestones.length; i++) {
        ctx.lineTo(milestones[i].x, milestones[i].y);
      }
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.1)';
      ctx.lineWidth = 1;
      ctx.stroke();
      
      // Draw milestone nodes
      milestones.forEach(point => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(16, 185, 129, 0.2)';
        ctx.fill();
      });

      // Update and draw pulses
      pulses.forEach(pulse => {
        pulse.progress = (pulse.progress + pulse.speed) % 1;
        const pos = getPointOnPath(pulse.progress);

        if(pos) {
            const glow = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, 12);
            glow.addColorStop(0, 'rgba(52, 211, 153, 0.7)'); // emerald-400
            glow.addColorStop(1, 'rgba(52, 211, 153, 0)');
            ctx.fillStyle = glow;
            ctx.beginPath();
            ctx.arc(pos.x, pos.y, 12, 0, Math.PI * 2);
            ctx.fill();

            ctx.beginPath();
            ctx.arc(pos.x, pos.y, 2, 0, Math.PI * 2);
            ctx.fillStyle = 'white';
            ctx.fill();
        }
      });
      

      animationFrameId = requestAnimationFrame(animate);
    }
    
    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        canvas.width = width;
        canvas.height = height;
        createPath();
      }
    });

    if (canvas.parentElement) {
        resizeObserver.observe(canvas.parentElement);
        const parent = canvas.parentElement;
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
        createPath();
        animate();
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} />;
};

export default JourneyBackground;
