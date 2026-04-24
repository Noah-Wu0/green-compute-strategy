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

  // Strategic assumptions for Kazakhstan Pivot
  const costDomesticPerKw = 140; // US$/kW/month (国内一线/新加坡/传统公有云估算)
  const costKazakhstanPerKw = 70;    // US$/kW/month (哈萨克斯坦自建中心估算)
  
  const allDomesticCost = results.totals.peakKw * costDomesticPerKw;
  const splitPortfolioCost = (results.portfolio.realtimeKw * costDomesticPerKw) + (results.portfolio.queueableKw * costKazakhstanPerKw);
  const monthlySavings = allDomesticCost - splitPortfolioCost;

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
        <h1 style={{ fontSize: '2rem', marginBottom: '8px', color: '#111827' }}>高管决策参考：中企 AI 算力出海与哈萨克斯坦投资战略报告 (Overseas SteerCo Report)</h1>
        <p style={{ color: 'var(--text-muted)' }}>生成日期: {new Date().toLocaleDateString()} | 密级: 内部参考</p>
      </div>

      <p style={{ marginBottom: '32px', fontSize: '1rem', lineHeight: '1.6', color: '#4b5563' }}>
        <strong>摘要 (Executive Summary)：</strong>
        随着国内高端 GPU 供应链承压与 AI Token 出海需求的爆发，本报告旨在评估在**哈萨克斯坦**投资建设离岸算力中心的商业可行性。通过区分“延迟敏感型”与“可排队型”负载，本报告为您揭示基础设施冷却红线、算力出海选址矩阵及 TCO 资金测算。
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
            传统的风冷数据中心 (PUE 1.3-1.5) 冷却极限通常在 30-40 kW。如果要在哈萨克斯坦建设新一代出海算力中心，<strong>直接芯片液冷 (Direct-to-Chip Liquid Cooling, DLC) 已不再是可选项，而是必须的基准工程前提。</strong> 请在接下来的数据中心 RFP 采购中，强制要求具备液冷环路设计。
          </div>
        </div>
      </section>

      {/* 2. 算力资产的“冷热分离”与放置策略 */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '1.4rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: '#111827' }}>
          <MapPin size={24} color="var(--primary-accent)" />
          2. 出海算力分流与选址矩阵 (Placement Portfolio)
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '12px', color: '#1f2937' }}>🔴 实时交互型 (Real-time)</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '12px' }}>
              包含：Copilots、代理工作流、多模态视觉。<br/>
              特点：低延迟要求，直接向 C 端/B 端客户吐出 Token。
            </p>
            <p style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--text-main)', marginBottom: '8px' }}>
              {Math.ceil(results.portfolio.realtimeKw).toLocaleString()} <span style={{fontSize:'1rem', fontWeight:'normal'}}>kW</span>
            </p>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>
              <strong>部署建议：</strong> 哈萨克斯坦亚欧海缆/陆缆核心节点，或保留部分国内/新加坡边缘节点。通过极低延迟服务中东和欧洲市场，同时满足部分数据不出境的合规需求。
            </p>
          </div>
          <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '12px', color: '#1f2937' }}>🔵 可排队溢出型 (Queueable)</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '12px' }}>
              包含：批处理推理、大模型微调、评估实验。<br/>
              特点：延迟容忍度高，高吞吐的数据清洗与训练。
            </p>
            <p style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--text-main)', marginBottom: '8px' }}>
              {Math.ceil(results.portfolio.queueableKw).toLocaleString()} <span style={{fontSize:'1rem', fontWeight:'normal'}}>kW</span>
            </p>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>
              <strong>部署建议：</strong> 全面部署于哈萨克斯坦（如阿斯塔纳及北部地区）。利用其极其低廉的电力成本和漫长冬季的天然冷源，建立大规模、低成本的大模型训练/微调基地。
            </p>
          </div>
        </div>
      </section>

      {/* 3. 商业 TCO 估算 */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '1.4rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: '#111827' }}>
          <DollarSign size={24} color="#f59e0b" />
          3. 哈国出海战略的 TCO 回报测算 (Commercial Value)
        </h2>
        <p style={{ marginBottom: '16px', fontSize: '0.95rem', color: '#4b5563' }}>
          基于基准分析：国内一线或新加坡等热门云网核心区域的托管均价约 <strong>$140/kW/月</strong>，而哈萨克斯坦自建或合资算力中心的成本仅约 <strong>$70/kW/月</strong>。如果我们将溢出算力放置在哈国，财务预测如下：
        </p>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '1rem', border: '1px solid #e5e7eb' }}>
          <tbody>
            <tr style={{ background: '#f9fafb' }}>
              <td style={{ padding: '16px', borderBottom: '1px solid #e5e7eb' }}>方案 A: 传统高价区全量部署 (国内/新加坡)</td>
              <td style={{ padding: '16px', textAlign: 'right', borderBottom: '1px solid #e5e7eb', fontWeight: 'bold' }}>
                {formatCurrency(allDomesticCost)} / 月
              </td>
            </tr>
            <tr style={{ background: '#fff' }}>
              <td style={{ padding: '16px', borderBottom: '1px solid #e5e7eb' }}>方案 B: 出海混合投资组合 (核心区 + 哈萨克斯坦)</td>
              <td style={{ padding: '16px', textAlign: 'right', borderBottom: '1px solid #e5e7eb', fontWeight: 'bold', color: 'var(--primary-accent)' }}>
                {formatCurrency(splitPortfolioCost)} / 月
              </td>
            </tr>
            <tr style={{ background: '#f0fdf4' }}>
              <td style={{ padding: '16px', fontWeight: '600', color: '#065f46' }}>投资哈萨克斯坦中心带来的 TCO 资金节省</td>
              <td style={{ padding: '16px', textAlign: 'right', fontWeight: 'bold', color: '#065f46', fontSize: '1.2rem' }}>
                {formatCurrency(monthlySavings)} / 月
              </td>
            </tr>
          </tbody>
        </table>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '8px' }}>*此成本仅包含设施电力与托管费 (Colo & Power)，不包含 GPU 硬件采购 CapEx 本身。</p>
      </section>

      {/* 4. 地缘、绿电与 CBAM 防御 */}
      <section>
        <h2 style={{ fontSize: '1.4rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: '#111827' }}>
          <ShieldCheck size={24} color="#2563eb" />
          4. 供应链地缘与 CBAM 碳关税防线 (Compliance)
        </h2>
        <div style={{ padding: '20px', background: '#eff6ff', borderRadius: '8px', borderLeft: '4px solid #2563eb' }}>
          <p style={{ fontSize: '1.1rem', marginBottom: '12px', fontWeight: '600', color: '#1e3a8a' }}>
            双重避险：高端 GPU 供应链与对欧 Token 输出
          </p>
          <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: '#1e40af', marginBottom: '12px' }}>
            根据本次测算，设施的月度能源消耗底线为 <strong>{formatNumber(results.totals.monthlyKwh)} kWh</strong>。
          </p>
          <ul style={{ paddingLeft: '20px', color: '#1e40af', fontSize: '0.95rem', lineHeight: '1.6' }}>
            <li><strong>供应链突围</strong>：在哈萨克斯坦合规建立离岸数据中心，有助于缓解直接向国内进口高算力 GPU 的合规压力与地缘摩擦，为企业的算力底座提供缓冲空间。</li>
            <li><strong>CBAM 碳壁垒应对</strong>：如果产生的 Token 服务最终客户在欧洲，哈国现有的煤电结构将带来极其严重的 Scope 2/3 碳足迹，并面临欧盟 CBAM 的天价惩罚。<strong>强烈建议在哈萨克斯坦的项目中，捆绑投资当地的风光新能源项目</strong>，实现基于遥测的 24/7 无碳电力 (CFE) 抵消，而非购买劣质的年度 RECs。</li>
          </ul>
        </div>
      </section>

    </div>
  );
}
