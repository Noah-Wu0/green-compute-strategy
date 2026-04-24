import React from 'react';
import { useCalculations } from '../context/CalculationContext';
import { Cpu } from 'lucide-react';

export default function ScenarioFinetune() {
  const { finetune, setFinetune, results } = useCalculations();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFinetune(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  return (
    <div className="scenario-card glass-panel animate-fade-in delay-2">
      <div className="section-header">
        <Cpu className="section-icon" />
        <h2>场景 4：模型微调与适配 (Fine Tuning)</h2>
      </div>

      <div className="info-box">
        <p><strong>💡 场景特点与参数参考：</strong></p>
        <p>用于特定领域的专家模型训练或定期知识刷新。请注意，这类需求往往是“阵发性”的爆发需求。</p>
        <ul>
          <li><strong>目标训练窗口 (Hours)：</strong> 定义多长时间内必须跑完一轮微调。此值直接决定所需的 GPU 并发数量。</li>
          <li><strong>评估开销 (Eval Overhead)：</strong> 在训练过程中穿插的 Checkpoint 评估所带来的算力损耗，通常在 <code>10% - 20% (0.1 - 0.2)</code>。</li>
        </ul>
      </div>
      
      <div className="form-grid" style={{marginBottom: '24px'}}>
        <div className="form-group">
          <label>每季度运行次数</label>
          <input type="number" name="runsPerQuarter" value={finetune.runsPerQuarter} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>数据集大小 (Tokens/Samples)</label>
          <input type="number" name="datasetSize" value={finetune.datasetSize} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>训练轮次 (Epochs)</label>
          <input type="number" name="epochs" value={finetune.epochs} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>评估开销占比 (%)</label>
          <input type="number" step="0.01" name="evalOverhead" value={finetune.evalOverhead} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>单次任务目标窗口 (小时)</label>
          <input type="number" name="targetWindowHours" value={finetune.targetWindowHours} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>资源利用率目标 (%)</label>
          <input type="number" step="0.01" name="utilizationTarget" value={finetune.utilizationTarget} onChange={handleChange} />
        </div>
      </div>

      <div style={{ padding: '16px', background: '#f8f9fa', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
        <h3 style={{fontSize: '0.9rem', marginBottom: '12px', color: 'var(--text-muted)'}}>单场景推演结果</h3>
        <div style={{display: 'flex', gap: '24px'}}>
          <div><strong>月度折算算力量:</strong> {(results.s4.totalWork / 1000000000).toFixed(2)}B 单位</div>
          <div style={{color: 'var(--primary-accent)'}}><strong>需预留 GPU:</strong> {Math.ceil(results.s4.installedGPUs)} 张 (训练窗口期内)</div>
        </div>
      </div>
    </div>
  );
}
