import React from 'react';
import { useCalculations } from '../context/CalculationContext';
import { ShieldAlert } from 'lucide-react';

export default function ScenarioEval() {
  const { evalScenario, setEvalScenario, results } = useCalculations();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvalScenario(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  return (
    <div className="scenario-card glass-panel animate-fade-in delay-1">
      <div className="section-header">
        <ShieldAlert className="section-icon" />
        <h2>场景 5：评估与实验 (Evaluation & Experimentation)</h2>
      </div>

      <div className="info-box">
        <p><strong>💡 场景特点与参数参考：</strong></p>
        <p>包括红队测试、模型打榜、提示词回归测试等。这类需求在初期的算力盘点中极其容易被漏算，导致后期可用算力被不断挤占。</p>
        <ul>
          <li><strong>重跑因子 (Rerun Factor)：</strong> 实验往往需要多次重跑验证统计显著性或修改参数，填入 <code>1.5 - 3.0</code> 以覆盖这些不可见的试错成本。</li>
        </ul>
      </div>
      
      <div className="form-grid" style={{marginBottom: '24px'}}>
        <div className="form-group">
          <label>每月评估任务数</label>
          <input type="number" name="runsPerMonth" value={evalScenario.runsPerMonth} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>单任务提示词/样本数</label>
          <input type="number" name="promptsPerRun" value={evalScenario.promptsPerRun} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>横向对比的模型数量</label>
          <input type="number" name="modelsPerComparison" value={evalScenario.modelsPerComparison} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>重跑因子 (重试/修改乘数)</label>
          <input type="number" step="0.1" name="rerunFactor" value={evalScenario.rerunFactor} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>单个样本平均 Tokens</label>
          <input type="number" name="tokensPerUnit" value={evalScenario.tokensPerUnit} onChange={handleChange} />
        </div>
      </div>

      <div style={{ padding: '16px', background: '#f8f9fa', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
        <h3 style={{fontSize: '0.9rem', marginBottom: '12px', color: 'var(--text-muted)'}}>单场景推演结果</h3>
        <div style={{display: 'flex', gap: '24px'}}>
          <div><strong>月度 Tokens 总量:</strong> {(results.s5.monthlyTokens / 1000000).toFixed(1)}M</div>
          <div style={{color: 'var(--primary-accent)'}}><strong>需安装 GPU:</strong> {Math.ceil(results.s5.installedGPUs)} 张 (均摊至月度)</div>
        </div>
      </div>
    </div>
  );
}
