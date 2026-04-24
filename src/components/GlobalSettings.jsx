import React from 'react';
import { useCalculations } from '../context/CalculationContext';
import { Settings } from 'lucide-react';

export default function GlobalSettings() {
  const { global, setGlobal } = useCalculations();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGlobal(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  return (
    <div className="scenario-card glass-panel animate-fade-in">
      <div className="section-header">
        <Settings className="section-icon" />
        <h2>全局假设与基准参数</h2>
      </div>

      <div className="info-box">
        <p><strong>💡 填写指南与参数参考：</strong></p>
        <p>此处的参数将作为基础因子，影响所有后续场景的电力与碳排计算。</p>
        <ul>
          <li><strong>PUE (电源使用效率)：</strong> 衡量数据中心能效的核心指标。越接近 1.0 越好。传统风冷数据中心通常在 <code>1.3 - 1.5</code> 之间；如果在 Pilbara 部署新一代高密度液冷 (DLC) 机架，建议填入 <code>1.1 - 1.2</code> 之间。</li>
          <li><strong>GPU 平均功耗：</strong> 注意，不要填最大热设计功耗 (TDP)。这里填的是实际运行时的平均消耗。例如，Rubin 级别的显卡可按 <code>1.2 - 1.6</code> kW 估算。</li>
          <li><strong>非 GPU 的 IT 开销：</strong> 包含 CPU、网络交换机、存储系统的额外功耗占比，通常经验值为 <code>20% (0.2)</code> 左右。</li>
        </ul>
      </div>
      
      <div className="form-grid">
        <div className="form-group">
          <label>设施 PUE (电源使用效率)</label>
          <input type="number" step="0.01" name="pue" value={global.pue} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>单张 GPU 平均功耗 (kW)</label>
          <input type="number" step="0.1" name="gpuPowerKw" value={global.gpuPowerKw} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>非 GPU 的 IT 开销比例 (%)</label>
          <input type="number" step="0.01" name="nonGpuOverhead" value={global.nonGpuOverhead} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>硬件吞吐基准 (tokens/秒/张)</label>
          <input type="number" step="1000" name="rubinThroughput" value={global.rubinThroughput} onChange={handleChange} />
        </div>
      </div>
    </div>
  );
}
