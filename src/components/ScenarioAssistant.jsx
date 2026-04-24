import React from 'react';
import { useCalculations } from '../context/CalculationContext';
import { MessageSquare } from 'lucide-react';

export default function ScenarioAssistant() {
  const { assistants, setAssistants, results } = useCalculations();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAssistants(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  return (
    <div className="scenario-card glass-panel animate-fade-in">
      <div className="section-header">
        <MessageSquare className="section-icon" />
        <h2>场景 1：交互式助手 (Copilots 等)</h2>
      </div>

      <div className="info-box">
        <p><strong>💡 场景特点与参数参考：</strong></p>
        <p>此场景代表对**延迟极度敏感**的实时交互应用（如企业内部 Copilot、问答机器人）。规划此类需求时，主要关注**高峰期的并发承载能力**。</p>
        <ul>
          <li><strong>高峰时段需求占比：</strong> 日常办公场景下，一天中的请求往往集中在某几个小时（如早晨集中登录时段）。这里可填入 <code>0.15 (15%)</code> 或更高，用来压测峰值算力需求。</li>
          <li><strong>利用率目标 (%)：</strong> 交互式推理（Inference）不应该按 100% 满载来规划，否则高峰期会导致延迟激增甚至宕机。建议安全冗余目标填入 <code>0.6 - 0.75</code> 之间。</li>
        </ul>
      </div>
      
      <div className="form-grid" style={{marginBottom: '24px'}}>
        <div className="form-group">
          <label>符合条件的用户基数</label>
          <input type="number" name="eligibleUsers" value={assistants.eligibleUsers} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>预期采用率 (%)</label>
          <input type="number" step="0.01" name="adoptionRate" value={assistants.adoptionRate} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>月度活跃率 (%)</label>
          <input type="number" step="0.01" name="monthlyActiveRate" value={assistants.monthlyActiveRate} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>人均每月提示词量 (Prompts)</label>
          <input type="number" name="promptsPerUser" value={assistants.promptsPerUser} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>平均输入 Tokens / 次</label>
          <input type="number" name="avgInputTokens" value={assistants.avgInputTokens} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>平均输出 Tokens / 次</label>
          <input type="number" name="avgOutputTokens" value={assistants.avgOutputTokens} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>高峰时段需求占比 (%)</label>
          <input type="number" step="0.01" name="peakHourShare" value={assistants.peakHourShare} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>资源利用率目标 (%)</label>
          <input type="number" step="0.01" name="utilizationTarget" value={assistants.utilizationTarget} onChange={handleChange} />
        </div>
      </div>

      <div style={{ padding: '16px', background: '#f8f9fa', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
        <h3 style={{fontSize: '0.9rem', marginBottom: '12px', color: 'var(--text-muted)'}}>单场景推演结果</h3>
        <div style={{display: 'flex', gap: '24px'}}>
          <div><strong>月度请求总量:</strong> {(results.s1.monthlyRequests / 1000).toFixed(1)}k</div>
          <div><strong>峰值吞吐量:</strong> {Math.ceil(results.s1.peakTokensPerSec).toLocaleString()} tokens/s</div>
          <div style={{color: 'var(--primary-accent)'}}><strong>需安装 GPU:</strong> {Math.ceil(results.s1.installedGPUs)} 张</div>
        </div>
      </div>
    </div>
  );
}
