"use client";

import React, { useEffect, useState } from 'react';
import { useTrail, animated, useSpring, SpringValue } from '@react-spring/web';

interface FloatingElement {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  color: string;
}

interface AnimatedStyle {
  opacity: SpringValue<number>;
  scale: SpringValue<number>;
}

export default function OrganicFloatingElements() {
  const [elements, setElements] = useState<FloatingElement[]>([]);

  useEffect(() => {
    // Criar elementos aleatórios
    const newElements: FloatingElement[] = [];
    const elementCount = 12; // Número de elementos flutuantes
    const colors = [
      'rgba(232, 247, 192, 0.4)', // Verde claro
      'rgba(194, 164, 255, 0.3)', // Roxo claro
      'rgba(255, 226, 255, 0.3)', // Rosa claro
      'rgba(200, 230, 255, 0.3)', // Azul claro
    ];

    for (let i = 0; i < elementCount; i++) {
      newElements.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 80 + 30,
        delay: Math.random() * 5000,
        duration: 20000 + Math.random() * 15000,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    setElements(newElements);
  }, []);

  const trail = useTrail(elements.length, {
    from: { opacity: 0, scale: 0 },
    to: { opacity: 1, scale: 1 },
    config: { mass: 1, tension: 280, friction: 60 },
  });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {trail.map((style, index) => {
        const element = elements[index];
        if (!element) return null;

        return (
          <FloatingBubble
            key={element.id}
            element={element}
            style={style}
          />
        );
      })}
      
      {/* Elementos maiores de fundo */}
      <LargeBackgroundElements />
    </div>
  );
}

function FloatingBubble({ element, style }: { element: FloatingElement; style: AnimatedStyle }) {
  const [{ xy }, api] = useSpring(() => ({
    xy: [0, 0],
    config: { mass: 10, tension: 550, friction: 140 },
  }));

  useEffect(() => {
    const animate = () => {
      api.start({
        xy: [
          (Math.random() - 0.5) * 100,
          (Math.random() - 0.5) * 100,
        ],
      });
    };

    animate();
    const interval = setInterval(animate, element.duration);

    return () => clearInterval(interval);
  }, [api, element.duration]);

  return (
    <animated.div
      style={{
        ...style,
        position: 'absolute',
        left: `${element.x}%`,
        top: `${element.y}%`,
        width: `${element.size}px`,
        height: `${element.size}px`,
        transform: xy.to((x, y) => `translate3d(${x}px, ${y}px, 0) scale(${style.scale})`),
      }}
    >
      <div
        className="w-full h-full rounded-full animate-pulse"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${element.color}, transparent)`,
          filter: 'blur(1px)',
          backdropFilter: 'blur(3px)',
          boxShadow: `0 4px 20px ${element.color}`,
        }}
      />
    </animated.div>
  );
}

function LargeBackgroundElements() {
  return (
    <>
      {[...Array(4)].map((_, i) => {
        const props = useSpring({
          from: { 
            x: Math.random() * 100,
            y: Math.random() * 100,
            scale: 0.8,
          },
          to: async (next) => {
            while (true) {
              await next({
                x: Math.random() * 100,
                y: Math.random() * 100,
                scale: Math.random() * 0.3 + 0.8,
              });
            }
          },
          config: { duration: 30000 + i * 10000 },
        });

        return (
          <animated.div
            key={`large-${i}`}
            className="absolute"
            style={{
              left: props.x.to(x => `${x}%`),
              top: props.y.to(y => `${y}%`),
              transform: props.scale.to(s => `scale(${s})`),
            }}
          >
            <div
              className="rounded-full animate-pulse"
              style={{
                width: `${200 + i * 50}px`,
                height: `${200 + i * 50}px`,
                background: `radial-gradient(circle at 40% 40%, rgba(232, 247, 192, 0.15), transparent)`,
                filter: 'blur(10px)',
              }}
            />
          </animated.div>
        );
      })}
    </>
  );
} 