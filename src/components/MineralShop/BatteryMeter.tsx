import Tooltip from '../common/Tooltip';

interface Props {
  battery: number;
  maxBattery: number;
}

export default function BatteryMeter({ battery, maxBattery }: Props) {
  const pct = Math.max(0, battery / maxBattery);
  const color = pct > 0.5 ? '#40f090' : pct > 0.25 ? '#f0c040' : '#f04040';
  const bars = 10;
  const filledBars = Math.round(pct * bars);

  return (
    <div className="flex items-center gap-2">
      <Tooltip tip="Your energy supply — each square you dig costs 1 charge. When it runs out, you head back to the shop.">
        <span className="text-sm text-purple-300 font-display">Battery</span>
      </Tooltip>
      <div className="flex gap-0.5 items-center">
        {Array.from({ length: bars }, (_, i) => (
          <div
            key={i}
            className="w-3 h-5 rounded-sm transition-all duration-300"
            style={{
              backgroundColor: i < filledBars ? color : 'rgba(255,255,255,0.1)',
              boxShadow: i < filledBars ? `0 0 4px ${color}80` : 'none',
            }}
          />
        ))}
        <div
          className="w-1.5 h-3 rounded-r ml-0.5"
          style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
        />
      </div>
      <span className="text-xs font-mono" style={{ color }}>
        {battery}/{maxBattery}
      </span>
    </div>
  );
}
