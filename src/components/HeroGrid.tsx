"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";

export default function HeroGrid() {
  const [gridSize, setGridSize] = useState({ cols: 24, rows: 14, cellSize: 68 });
  const [activeCells, setActiveCells] = useState<{ [key: string]: number }>({});
  const timerRefs = useRef<{ [key: string]: NodeJS.Timeout[] }>({});

  useEffect(() => {
    const calculateGrid = () => {
      const cellSize = window.innerWidth < 640 ? 56 : 68;
      const width = window.innerWidth;
      const height = window.innerHeight * 1.35;
      const cols = Math.ceil(width / cellSize) + 1;
      const rows = Math.ceil(height / cellSize) + 1;
      setGridSize({ cols, rows, cellSize });
    };

    calculateGrid();
    window.addEventListener("resize", calculateGrid);
    return () => window.removeEventListener("resize", calculateGrid);
  }, []);

  const triggerRingRipple = useCallback((clickRow: number, clickCol: number) => {
    const { rows, cols } = gridSize;
    const maxRadius = 8.5;
    const rippleId = `${Date.now()}-${Math.random()}`;
    timerRefs.current[rippleId] = [];

    const minR = Math.max(0, Math.floor(clickRow - maxRadius));
    const maxR = Math.min(rows - 1, Math.ceil(clickRow + maxRadius));
    const minC = Math.max(0, Math.floor(clickCol - maxRadius));
    const maxC = Math.min(cols - 1, Math.ceil(clickCol + maxRadius));

    for (let r = minR; r <= maxR; r++) {
      for (let c = minC; c <= maxC; c++) {
        const dist = Math.sqrt(Math.pow(r - clickRow, 2) + Math.pow(c - clickCol, 2));
        if (dist <= maxRadius) {
          const intensity = Math.pow((maxRadius - dist) / maxRadius, 1.25);
          if (intensity <= 0.03) continue;

          const delay = dist * 58;
          const key = `${r}-${c}`;

          const timer = setTimeout(() => {
            setActiveCells((prev) => ({
              ...prev,
              [key]: intensity,
            }));

            // Smooth fadeout duration
            const fadeTimer = setTimeout(() => {
              setActiveCells((prev) => {
                const next = { ...prev };
                delete next[key];
                return next;
              });
            }, 850);

            if (timerRefs.current[rippleId]) {
              timerRefs.current[rippleId].push(fadeTimer);
            }
          }, delay);

          if (timerRefs.current[rippleId]) {
            timerRefs.current[rippleId].push(timer);
          }
        }
      }
    }
  }, [gridSize]);

  useEffect(() => {
    return () => {
      Object.values(timerRefs.current).forEach((timers) => {
        timers.forEach((t) => clearTimeout(t));
      });
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-auto select-none bg-black">
      {/* Grid container with delicate, clearly visible square boxes */}
      <div
        className="grid w-full h-full"
        style={{
          gridTemplateColumns: `repeat(${gridSize.cols}, ${gridSize.cellSize}px)`,
          gridTemplateRows: `repeat(${gridSize.rows}, ${gridSize.cellSize}px)`,
          justifyContent: "center",
        }}
      >
        {Array.from({ length: gridSize.rows }).map((_, r) =>
          Array.from({ length: gridSize.cols }).map((_, c) => {
            const key = `${r}-${c}`;
            const intensity = activeCells[key] || 0;
            const isLit = intensity > 0;

            return (
              <div
                key={key}
                onClick={() => triggerRingRipple(r, c)}
                className="border border-white/[0.045] transition-all duration-700 ease-out cursor-pointer hover:bg-white/[0.06] hover:border-white/[0.16]"
                style={{
                  width: `${gridSize.cellSize}px`,
                  height: `${gridSize.cellSize}px`,
                  backgroundColor: isLit
                    ? `rgba(255, 255, 255, ${0.035 + intensity * 0.065})`
                    : undefined,
                  borderColor: isLit
                    ? `rgba(255, 255, 255, ${0.07 + intensity * 0.14})`
                    : undefined,
                  boxShadow: isLit
                    ? `0 0 16px rgba(255, 255, 255, ${intensity * 0.06})`
                    : undefined,
                }}
              />
            );
          })
        )}
      </div>

      {/* Subtle radial blend */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_95%_75%_at_50%_35%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.4)_75%,#000000_100%)]" />
    </div>
  );
}
