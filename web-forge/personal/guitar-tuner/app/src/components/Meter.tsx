import styles from './Meter.module.css';
import { TUNER_CONSTANTS } from '../types/tuner';

interface Props {
  cents: number;
  active: boolean;
}

// Tick marks along the arc: value in cents, label, and type
const TICKS: Array<{ value: number; label: string; type: 'major' | 'minor' | 'center' }> = [
  { value: -50, label: '-50', type: 'major' },
  { value: -40, label: '', type: 'minor' },
  { value: -30, label: '', type: 'minor' },
  { value: -20, label: '-20', type: 'major' },
  { value: -10, label: '', type: 'minor' },
  { value: 0, label: '0', type: 'center' },
  { value: 10, label: '', type: 'minor' },
  { value: 20, label: '+20', type: 'major' },
  { value: 30, label: '', type: 'minor' },
  { value: 40, label: '', type: 'minor' },
  { value: 50, label: '+50', type: 'major' },
];

// Arc geometry: needle pivots from bottom-center, ticks spread across +-40 degrees
const ARC_DEGREES = 40;
const NEEDLE_LENGTH = 105;
const TICK_RADIUS = 115; // slightly outside needle reach

export function Meter({ cents, active }: Props) {
  const clampedCents = Math.max(-TUNER_CONSTANTS.NEEDLE_MAX_CENTS, Math.min(TUNER_CONSTANTS.NEEDLE_MAX_CENTS, cents));
  const needleDeg = (clampedCents / TUNER_CONSTANTS.NEEDLE_MAX_CENTS) * ARC_DEGREES;

  return (
    <div className={styles.meter}>
      <svg
        className={styles.meterSvg}
        viewBox="0 0 300 160"
        preserveAspectRatio="xMidYMax meet"
      >
        {/* Tick marks rendered along an arc */}
        {TICKS.map((tick) => {
          const angleDeg = (tick.value / TUNER_CONSTANTS.NEEDLE_MAX_CENTS) * ARC_DEGREES;
          const angleRad = ((angleDeg - 90) * Math.PI) / 180;
          const cx = 150;
          const cy = 155;

          const tickLength = tick.type === 'center' ? 20 : tick.type === 'major' ? 14 : 8;
          const innerR = TICK_RADIUS - tickLength;

          const x1 = cx + innerR * Math.cos(angleRad);
          const y1 = cy + innerR * Math.sin(angleRad);
          const x2 = cx + TICK_RADIUS * Math.cos(angleRad);
          const y2 = cy + TICK_RADIUS * Math.sin(angleRad);

          // Label position
          const labelR = innerR - 10;
          const lx = cx + labelR * Math.cos(angleRad);
          const ly = cy + labelR * Math.sin(angleRad);

          return (
            <g key={tick.value}>
              <line
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke={tick.type === 'center' ? '#b7c3ad' : '#545f4c'}
                strokeWidth={tick.type === 'center' ? 2 : 1}
              />
              {tick.label && (
                <text
                  x={lx} y={ly}
                  fill={tick.type === 'center' ? '#b7c3ad' : '#545f4c'}
                  fontSize={tick.type === 'center' ? 11 : 9}
                  fontFamily="'Space Grotesk', sans-serif"
                  fontWeight={tick.type === 'center' ? 700 : 400}
                  textAnchor="middle"
                  dominantBaseline="central"
                >
                  {tick.label}
                </text>
              )}
            </g>
          );
        })}

        {/* Needle */}
        <g
          style={{
            transform: `rotate(${active ? needleDeg : 0}deg)`,
            transformOrigin: '150px 155px',
            transition: 'transform 0.12s ease-out',
          }}
        >
          <line
            x1={150} y1={155}
            x2={150} y2={155 - NEEDLE_LENGTH}
            stroke={active ? '#b7c3ad' : '#545f4c'}
            strokeWidth={1.5}
            strokeLinecap="round"
          />
          {/* Pivot dot */}
          <circle
            cx={150} cy={155}
            r={3}
            fill={active ? '#b7c3ad' : '#545f4c'}
          />
        </g>
      </svg>
    </div>
  );
}
