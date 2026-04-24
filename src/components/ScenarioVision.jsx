import React from 'react';
import { useCalculations } from '../context/CalculationContext';
import { Camera } from 'lucide-react';

export default function ScenarioVision() {
  const { vision, setVision, results } = useCalculations();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVision(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  return (
    <div className="scenario-card glass-panel animate-fade-in delay-2">
      <div className="section-header">
        <Camera className="section-icon" />
        <h2>场景 6：视觉与多模态 (Vision & Multimodal)</h2>
      </div>

      <div className="info-box">
        <p><strong>💡 场景特点与参数参考：</strong></p>
        <p>处理图片检查、视频审核等任务。这类任务的特点是输入体积大、不仅消耗算力，对显存和网络 I/O 的冲击也极大。</p>
        <ul>
          <li><strong>运行时间估算法：</strong> 与文本处理按 token 计算不同，视觉处理通常直接根据各阶段的“秒数”来进行折算更准确。</li>
        </ul>
      </div>
      
      <div className="form-grid" style={{marginBottom: '24px'}}>
        <div className="form-group">
          <label>每月处理媒体文件数 (个)</label>
          <input type="number" name="mediaItemsPerMonth" value={vision.mediaItemsPerMonth} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>预处理平均耗时 (秒/个)</label>
          <input type="number" step="0.1" name="preProcSec" value={vision.preProcSec} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>推理平均耗时 (秒/个)</label>
          <input type="number" step="0.1" name="inferenceSec" value={vision.inferenceSec} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>后处理平均耗时 (秒/个)</label>
          <input type="number" step="0.1" name="postProcSec" value={vision.postProcSec} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>调度周期/ SLA (小时)</label>
          <input type="number" name="targetWindowHours" value={vision.targetWindowHours} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>资源利用率目标 (%)</label>
          <input type="number" step="0.01" name="utilizationTarget" value={vision.utilizationTarget} onChange={handleChange} />
        </div>
      </div>

      <div style={{ padding: '16px', background: '#f8f9fa', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
        <h3 style={{fontSize: '0.9rem', marginBottom: '12px', color: 'var(--text-muted)'}}>单场景推演结果</h3>
        <div style={{display: 'flex', gap: '24px'}}>
          <div><strong>月度 GPU 耗时:</strong> {Math.ceil(results.s6.gpuHours).toLocaleString()} 小时</div>
          <div style={{color: 'var(--primary-accent)'}}><strong>需安装 GPU:</strong> {Math.ceil(results.s6.installedGPUs)} 张</div>
        </div>
      </div>
    </div>
  );
}
