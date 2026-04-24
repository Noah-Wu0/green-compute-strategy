import React from 'react';
import { useCalculations } from '../context/CalculationContext';
import { Zap, Cpu, Leaf } from 'lucide-react';

export default function Dashboard() {
  const { results } = useCalculations();

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(2) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
    return Math.ceil(num).toLocaleString();
  };

  return (
    <div className="dashboard-grid animate-fade-in delay-1">
      <div className="metric-card glass-panel">
        <div className="metric-title">
          <Cpu className="section-icon" size={16} style={{display: 'inline', marginRight: '6px'}}/>
          所需 GPU 容量
        </div>
        <div className="metric-value">
          {formatNumber(results.totals.installedGPUs)} 
          <span className="metric-unit">张</span>
        </div>
      </div>
      
      <div className="metric-card glass-panel accent-blue">
        <div className="metric-title">
          <Zap className="section-icon" size={16} style={{display: 'inline', marginRight: '6px', color: 'var(--secondary-accent)'}}/>
          峰值设施负载 (Peak kW)
        </div>
        <div className="metric-value">
          {formatNumber(results.totals.peakKw)} 
          <span className="metric-unit">kW</span>
        </div>
      </div>

      <div className="metric-card glass-panel" style={{borderColor: 'var(--primary-accent)'}}>
        <div className="metric-title">
          <Leaf className="section-icon" size={16} style={{display: 'inline', marginRight: '6px'}}/>
          月度能源消耗 (24/7 CFE目标)
        </div>
        <div className="metric-value" style={{color: 'var(--primary-accent)'}}>
          {formatNumber(results.totals.monthlyKwh)} 
          <span className="metric-unit">kWh/月</span>
        </div>
      </div>
    </div>
  );
}
