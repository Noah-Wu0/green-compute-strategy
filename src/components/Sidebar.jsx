import React from 'react';
import { Settings, MessageSquare, Workflow, HardDrive, ShieldAlert, Cpu, Camera, FileText } from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    { id: 'global', label: '全局假设与基准', icon: <Settings size={20} /> },
    { id: 'assistant', label: '场景 1：交互式助手', icon: <MessageSquare size={20} /> },
    { id: 'workflow', label: '场景 2：代理工作流', icon: <Workflow size={20} /> },
    { id: 'batch', label: '场景 3：批处理推理', icon: <HardDrive size={20} /> },
    { id: 'finetune', label: '场景 4：模型微调', icon: <Cpu size={20} /> },
    { id: 'eval', label: '场景 5：评估与实验', icon: <ShieldAlert size={20} /> },
    { id: 'vision', label: '场景 6：视觉多模态', icon: <Camera size={20} /> },
  ];

  return (
    <div className="sidebar">
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '1.2rem', color: 'var(--primary-accent)' }}>绿色计算</h2>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>容量与碳排放规划平台</p>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {menuItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              background: activeTab === item.id ? '#f3f4f6' : 'transparent',
              border: 'none',
              borderRadius: '8px',
              color: activeTab === item.id ? 'var(--primary-accent)' : 'var(--text-muted)',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'var(--transition)',
              fontFamily: 'var(--font-body)',
              fontWeight: activeTab === item.id ? '600' : '500',
            }}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      
        <div style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid var(--border-color)' }}>
          <button
            onClick={() => setActiveTab('report')}
            style={{
              display: 'flex', alignItems: 'center', gap: '12px', width: '100%',
              padding: '12px 16px', background: activeTab === 'report' ? 'rgba(16, 185, 129, 0.1)' : '#f0fdf4',
              border: '1px solid var(--primary-accent)', borderRadius: '8px',
              color: 'var(--primary-accent)', cursor: 'pointer', textAlign: 'left',
              transition: 'var(--transition)', fontFamily: 'var(--font-body)', fontWeight: '600',
            }}
          >
            <FileText size={20} />
            生成汇总报告
          </button>
        </div>
      </nav>
    </div>
  );
}
