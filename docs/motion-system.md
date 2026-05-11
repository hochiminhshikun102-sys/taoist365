# Taoist365 Motion System

## Motion Intent
Motion should feel breathing, quiet, and grounded.

## Allowed Motion
- Slow transitions: 220ms to 420ms
- Low-frequency ambient movement
- Micro-float with very small travel distance
- Soft opacity fades and gentle scale (0.98 to 1.00)
- Ease curves: ease-out or custom soft cubic-bezier

## Avoid Motion
- Flashy attention grabs
- Bounce/spring-heavy interaction
- Aggressive entrance movement
- Game-like kinetic patterns
- Rapid repeated loops

## Motion Tokens (initial)
- `motion.duration.fast`: 180ms
- `motion.duration.base`: 280ms
- `motion.duration.slow`: 420ms
- `motion.easing.soft`: cubic-bezier(0.22, 0.61, 0.36, 1)
- `motion.float.distance`: 4px
- `motion.fade.from`: 0.0
- `motion.fade.to`: 1.0

## Accessibility
- Respect `prefers-reduced-motion`
- Provide non-motion fallback for all critical feedback
