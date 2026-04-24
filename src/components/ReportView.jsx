import React from 'react';
import { useCalculations } from '../context/CalculationContext';
import { Printer, MapPin, DollarSign, ThermometerSnowflake, ShieldCheck, CheckCircle } from 'lucide-react';

export default function ReportView() {
  const { global, results } = useCalculations();

  const handlePrint = () => {
    window.print();
  };

  const formatCurrency = (num) => {
    if (num >= 1000000) return '$' + (num / 1000000).toFixed(2) + 'M';
    return '$' + Math.ceil(num).toLocaleString();
  };

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(2) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
    return Math.ceil(num).toLocaleString();
  };

  // Hardcoded commercial baselines from the PRD Analysis Section 5.1
  const costAustraliaPerKw = 140; // US$/kW/month (midpoint of 130-150)
  const costIcelandPerKw = 90;    // US$/kW/month (midpoint of 80-95)
  
  const allAustraliaCost = results.totals.peakKw * costAustraliaPerKw;
  const splitPortfolioCost = (results.portfolio.realtimeKw * costAustraliaPerKw) + (results.portfolio.queueableKw * costIcelandPerKw);
  const monthlySavings = allAustraliaCost - splitPortfolioCost;

  // Rack calculation (Assuming 72 GPUs per NVL72 rack)
  const rackCount = Math.ceil(results.totals.installedGPUs / 72) || 1;
  const rackDensityKw = results.totals.peakKw / rackCount;

  return (
    <div className="report-container animate-fade-in" style={{ background: '#fff', padding: '40px', borderRadius: '12px', border: '1px solid #e5e7eb', color: '#1f2937' }}>
      
      <div className="no-print" style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '24px' }}>
        <button onClick={handlePrint} style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          background: 'var(--primary-accent)', color: '#fff',
          border: 'none', padding: '10px 20px', borderRadius: '8px',
          cursor: 'pointer', fontWeight: '600', fontSize: '0.9rem',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <Printer size={18} />
          打印 / 导出战略报告
        </button>
      </div>

      <div style={{ borderBottom: '2px solid var(--primary-accent)', paddingBottom: '24px', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '8px', color: '#111827' }}>高管决策参考：绿色计算容量与脱碳战略分析 (SteerCo Report)</h1>
        <p style={{ color: 'var(--text-muted)' }}>生成日期: {new Date().toLocaleDateString()} | 密级: 内部参考</p>
      </div>

      <p style={{ marginBottom: '32px', fontSize: '1rem', lineHeight: '1.6', color: '#4b5563' }}>
        <strong>摘要 (Executive Summary)：</strong>
        本次分析将 AI 算力需求转化为真实的物理与商业指标。通过区分“延迟敏感型”与“可排队型”负载，本报告为您揭示基础设施冷却红线、选址商业矩阵及 24/7 CFE 脱碳防线。
      </p>

      {/* 1. 物理设施与热力学红线 */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '1.4rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: '#111827' }}>
          <ThermometerSnowflake size={24} color="#e11d48" />
          1. 物理设施与热力学红线 (Thermodynamic Reality)
        </h2>
        <div style={{ padding: '20px', background: '#fff1f2', borderRadius: '8px', borderLeft: '4px solid #e11d48' }}>
          <p style={{ fontSize: '1rem', marginBottom: '12px', color: '#9f1239' }}>
            根据预测，总负载为 <strong>{Math.ceil(results.totals.peakKw).toLocaleString()} kW</strong>，需要部署约 <strong>{rackCount}</strong> 个高密机架 (以 NVL72 为基准估算)。单机架功耗密度逼近 <strong>{rackDensityKw.toFixed(1)} kW/Rack</strong>。
          </p>
          <div style={{ background: 'rgba(225, 29, 72, 0.1)', padding: '12px', borderRadius: '6px' }}>
            <strong>🚨 基础设施警告：</strong>
            传统的风冷数据中心 (PUE 1.3-1.5) 冷却极限通常在 30-40 kW。面对预测的超高密度，<strong>直接芯片液冷 (Direct-to-Chip Liquid Cooling, DLC) 已不再是可选项，而是必须的基准工程前提。</strong> 请在接下来的数据中心 RFP 采购中，强制要求供应商提供液冷 PUE (1.1-1.2) 及水资源消耗声明。
          </div>
        </div>
      </section>

      {/* 2. 算力资产的“冷热分离”与放置策略 */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '1.4rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: '#111827' }}>
          <MapPin size={24} color="var(--primary-accent)" />
          2. 算力资产的冷热分离与放置组合 (Placement Portfolio)
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '12px', color: '#1f2937' }}>🔴 实时交互型 (Real-time)</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '12px' }}>
              包含：Copilots、代理工作流、多模态视觉。<br/>
              特点：低延迟要求，不可随意中断，数据敏感性高。
            </p>
            <p style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--text-main)', marginBottom: '8px' }}>
              {Math.ceil(results.portfolio.realtimeKw).toLocaleString()} <span style={{fontSize:'1rem', fontWeight:'normal'}}>kW</span>
            </p>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>
              <strong>部署建议：</strong> 澳大利亚本土 (澳洲公有云或近场托管)。确保极低的网络延迟并完全符合《原住民数据治理框架》与数据主权要求。
            </p>
          </div>
          <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '12px', color: '#1f2937' }}>🔵 可排队溢出型 (Queueable)</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '12px' }}>
              包含：批处理推理、大模型微调、评估实验。<br/>
              特点：延迟容忍度高，可跨时区异步调度。
            </p>
            <p style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--text-main)', marginBottom: '8px' }}>
              {Math.ceil(results.portfolio.queueableKw).toLocaleString()} <span style={{fontSize:'1rem', fontWeight:'normal'}}>kW</span>
            </p>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>
              <strong>部署建议：</strong> 海外高绿电区 (如北欧/冰岛) 或 Pilbara。利用冰岛等地的天然冷却与廉价地热/水电资源，或利用 Pilbara 吸收日间被弃用的太阳能 (作为虚拟电池)。
            </p>
          </div>
        </div>
      </section>

      {/* 3. 商业 TCO 估算 */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '1.4rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: '#111827' }}>
          <DollarSign size={24} color="#f59e0b" />
          3. 组合策略的商业 TCO 回报 (Commercial Value)
        </h2>
        <p style={{ marginBottom: '16px', fontSize: '0.95rem', color: '#4b5563' }}>
          基于基准分析：澳大利亚托管平均成本约 <strong>$140/kW/月</strong>，而冰岛等高绿电凉爽地带成本仅约 <strong>$90/kW/月</strong>。如果我们采用“冷热分离组合放置”，而非单一的全澳洲云部署，财务预测如下：
        </p>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '1rem', border: '1px solid #e5e7eb' }}>
          <tbody>
            <tr style={{ background: '#f9fafb' }}>
              <td style={{ padding: '16px', borderBottom: '1px solid #e5e7eb' }}>方案 A: 全盘澳洲本土托管 (All-in-AU)</td>
              <td style={{ padding: '16px', textAlign: 'right', borderBottom: '1px solid #e5e7eb', fontWeight: 'bold' }}>
                {formatCurrency(allAustraliaCost)} / 月
              </td>
            </tr>
            <tr style={{ background: '#fff' }}>
              <td style={{ padding: '16px', borderBottom: '1px solid #e5e7eb' }}>方案 B: 混合投资组合 (AU + 冰岛)</td>
              <td style={{ padding: '16px', textAlign: 'right', borderBottom: '1px solid #e5e7eb', fontWeight: 'bold', color: 'var(--primary-accent)' }}>
                {formatCurrency(splitPortfolioCost)} / 月
              </td>
            </tr>
            <tr style={{ background: '#f0fdf4' }}>
              <td style={{ padding: '16px', fontWeight: '600', color: '#065f46' }}>通过策略性分流可实现的月度资金节省</td>
              <td style={{ padding: '16px', textAlign: 'right', fontWeight: 'bold', color: '#065f46', fontSize: '1.2rem' }}>
                {formatCurrency(monthlySavings)} / 月
              </td>
            </tr>
          </tbody>
        </table>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '8px' }}>*此成本仅包含设施电力与托管费 (Colo & Power)，不包含 GPU 硬件采购 CapEx 本身。</p>
      </section>

      {/* 4. 24/7 CFE 与绿洗防御 */}
      <section>
        <h2 style={{ fontSize: '1.4rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: '#111827' }}>
          <ShieldCheck size={24} color="#2563eb" />
          4. 脱碳红线与合规审查 (Anti-Greenwashing & Compliance)
        </h2>
        <div style={{ padding: '20px', background: '#eff6ff', borderRadius: '8px', borderLeft: '4px solid #2563eb' }}>
          <p style={{ fontSize: '1.1rem', marginBottom: '12px', fontWeight: '600', color: '#1e3a8a' }}>
            目标：防御欧盟 CBAM 与强化 "Real Zero" 品牌
          </p>
          <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: '#1e40af', marginBottom: '12px' }}>
            根据本次测算，设施的月度能源消耗底线为 <strong>{formatNumber(results.totals.monthlyKwh)} kWh</strong>。AI 计算是 24/7 全天候运行的工业负载，绝不能容忍通过购买廉价的“年度可再生能源证书 (RECs)”来在账面上抵消夜间消耗的化石燃料电力。
          </p>
          <ul style={{ paddingLeft: '20px', color: '#1e40af', fontSize: '0.95rem', lineHeight: '1.6' }}>
            <li><strong>招标强制门槛</strong>：未来的数据中心或云供应商，必须能够出具基于 API 硬件级遥测 (Telemetry) 的 <strong>24/7 小时级无碳电力 (CFE) 匹配证明</strong>。</li>
            <li><strong>排放核算</strong>：任何未实现 24/7 CFE 匹配的 “脏算力”，其 Scope 2/3 碳足迹将被直接计入 Fortescue 出口铁矿石的全生命周期评估 (LCA) 中，这将面临极其严厉的欧洲碳关税 (CBAM) 惩罚。</li>
          </ul>
        </div>
      </section>

    </div>
  );
}
