import React from 'react';
import { useCalculations } from '../context/CalculationContext';
import { HardDrive } from 'lucide-react';

export default function ScenarioBatch() {
  const { batch, setBatch, results } = useCalculations();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBatch(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  return (
    <div className="scenario-card glass-panel animate-fade-in delay-1">
      <div className="section-header">
        <HardDrive className="section-icon" />
        <h2>场景 3：批处理推理 (Batch Inference)</h2>
      </div>

      <div className="info-box">
        <p><strong>💡 场景特点与参数参考：</strong></p>
        <p>如文档分析、日志清洗等对延迟不敏感的后台大批量任务。这部分负载是最适合进行**可排队调度 (Queueable)** 的，也是“削峰填谷”和使用廉价绿电的绝佳候选。</p>
        <ul>
          <li><strong>目标完成窗口 (Hours)：</strong> 你希望这批任务在多长时间内跑完。如果填得越小（如 12 小时），则瞬间需要的算力极大；如果拉长（如 72 小时），则峰值平滑。</li>
          <li><strong>利用率目标 (%)：</strong> 批处理任务通常跑在专用的队列里，可以承受较高的满载率，建议填写 <code>0.8 - 0.95</code>。</li>
        </ul>
      </div>
      
      <div className="form-grid" style={{marginBottom: '24px'}}>
        <div className="form-group">
          <label>每月作业数 (Jobs/Mo)</label>
          <input type="number" name="jobsPerMonth" value={batch.jobsPerMonth} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>单个作业平均项目数 (Items)</label>
          <input type="number" name="itemsPerJob" value={batch.itemsPerJob} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>单个项目平均 Tokens</label>
          <input type="number" name="tokensPerItem" value={batch.tokensPerItem} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>目标完成窗口 (小时)</label>
          <input type="number" name="targetWindowHours" value={batch.targetWindowHours} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>资源利用率目标 (%)</label>
          <input type="number" step="0.01" name="utilizationTarget" value={batch.utilizationTarget} onChange={handleChange} />
        </div>
      </div>

      <div style={{ padding: '16px', background: '#f8f9fa', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
        <h3 style={{fontSize: '0.9rem', marginBottom: '12px', color: 'var(--text-muted)'}}>单场景推演结果</h3>
        <div style={{display: 'flex', gap: '24px'}}>
          <div><strong>月度 Tokens 总量:</strong> {(results.s3.monthlyTokens / 1000000000).toFixed(2)}B</div>
          <div style={{color: 'var(--primary-accent)'}}><strong>需安装 GPU:</strong> {Math.ceil(results.s3.installedGPUs)} 张</div>
        </div>
      </div>
    </div>
  );
}
