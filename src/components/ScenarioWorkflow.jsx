import React from 'react';
import { useCalculations } from '../context/CalculationContext';
import { Workflow } from 'lucide-react';

export default function ScenarioWorkflow() {
  const { workflows, setWorkflows, results } = useCalculations();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWorkflows(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  return (
    <div className="scenario-card glass-panel animate-fade-in delay-2">
      <div className="section-header">
        <Workflow className="section-icon" />
        <h2>场景 2：代理工作流 (Agentic Workflows)</h2>
      </div>

      <div className="info-box">
        <p><strong>💡 场景特点与参数参考：</strong></p>
        <p>与简单的“一问一答”交互不同，代理工作流（如自动化研究、工具调用代理）的资源消耗会被**隐性放大**，通常这也是算力预测最容易低估的地方。</p>
        <ul>
          <li><strong>重试因子 (Retry Factor)：</strong> 代理在调用外部工具或执行复杂任务失败时，往往会触发重新生成。该系数通常大于 1.0，如 <code>1.2 - 1.5</code>。</li>
          <li><strong>峰值并发因子 (Peak Concurrency)：</strong> 由于工作流通常是后台异步执行的，因此其并发分布可能不如前台助手那样高度集中于某一时段。这里采用“并发乘数”（相较于均值的倍数）来估算，参考值可设为 <code>1.5 - 2.0</code>。</li>
        </ul>
      </div>
      
      <div className="form-grid" style={{marginBottom: '24px'}}>
        <div className="form-group">
          <label>活跃用户基数</label>
          <input type="number" name="activeUsers" value={workflows.activeUsers} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>人均每月工作流数量</label>
          <input type="number" name="workflowsPerUser" value={workflows.workflowsPerUser} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>单个工作流平均步骤数</label>
          <input type="number" name="stepsPerWorkflow" value={workflows.stepsPerWorkflow} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>每步骤模型调用次数</label>
          <input type="number" name="modelCallsPerStep" value={workflows.modelCallsPerStep} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>重试因子 (重试放大倍数)</label>
          <input type="number" step="0.1" name="retryFactor" value={workflows.retryFactor} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>单次调用平均 Tokens</label>
          <input type="number" name="avgTokensPerCall" value={workflows.avgTokensPerCall} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>峰值并发因子 (Multiplier)</label>
          <input type="number" step="0.1" name="peakConcurrencyFactor" value={workflows.peakConcurrencyFactor} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>资源利用率目标 (%)</label>
          <input type="number" step="0.01" name="utilizationTarget" value={workflows.utilizationTarget} onChange={handleChange} />
        </div>
      </div>

      <div style={{ padding: '16px', background: '#f8f9fa', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
        <h3 style={{fontSize: '0.9rem', marginBottom: '12px', color: 'var(--text-muted)'}}>单场景推演结果</h3>
        <div style={{display: 'flex', gap: '24px'}}>
          <div><strong>月度 Tokens 总量:</strong> {(results.s2.monthlyTokens / 1000000).toFixed(1)}M</div>
          <div><strong>峰值吞吐量:</strong> {Math.ceil(results.s2.peakTokensPerSec).toLocaleString()} tokens/s</div>
          <div style={{color: 'var(--primary-accent)'}}><strong>需安装 GPU:</strong> {Math.ceil(results.s2.installedGPUs)} 张</div>
        </div>
      </div>
    </div>
  );
}
