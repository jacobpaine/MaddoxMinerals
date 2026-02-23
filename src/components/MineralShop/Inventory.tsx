import type { InventoryItem } from '../../types/mineral';
import { calculateSellValue } from '../../utils/mineralUtils';
import Tooltip from '../common/Tooltip';

interface Props {
  inventory: InventoryItem[];
  totalValue: number;
}

export default function Inventory({ inventory, totalValue }: Props) {
  if (inventory.length === 0) {
    return (
      <div className="panel text-center py-4">
        <div className="text-purple-500 text-sm">No minerals collected yet</div>
        <div className="text-purple-600 text-xs mt-1">Dig to find minerals!</div>
      </div>
    );
  }

  return (
    <div className="panel">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-bold text-purple-400 uppercase tracking-wide">Inventory</span>
        <span className="text-xs text-mineral-gold font-bold">Total: {totalValue} coins</span>
      </div>
      <div className="space-y-1 max-h-48 overflow-y-auto">
        {inventory.map((item, i) => {
          const sellVal = calculateSellValue(item);
          return (
            <div key={i} className="flex items-center gap-2 py-1 border-b border-white/5 last:border-0">
              <div
                className="w-4 h-4 rounded-sm flex-shrink-0"
                style={{
                  background: `linear-gradient(135deg, ${item.mineral.color[0]}, ${item.mineral.color[item.mineral.color.length - 1]})`,
                }}
              />
              <div className="flex-1 min-w-0">
                <div className="text-xs text-white truncate">
                  {item.identified ? item.mineral.name : '??? (unidentified)'}
                </div>
                {!item.identified && (
                  <div className="text-xs text-purple-500">
                    <Tooltip tip="You didn't identify this mineral, so the shop pays less — only 30% of its full value">30% value penalty</Tooltip>
                  </div>
                )}
              </div>
              <div className="text-xs text-mineral-gold font-bold flex-shrink-0">
                {sellVal}c
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
