# 绿色计算容量与碳排放规划平台 (Green Compute Platform)

本平台旨在将 AI 算力需求从抽象的业务指标（如请求数、Tokens）转化为真实的物理与商业指标（GPU 数量、Peak kW、月度能耗 kWh）。通过建立科学的换算模型，辅助企业高管 (SteerCo) 及 IT 团队制定“脱碳、基建、选址与采购”的战略规划。

## 🎯 核心功能

*   **全场景建模引擎**：覆盖交互式助手 (Copilot)、代理工作流 (Agentic Workflow)、批处理推理 (Batch)、模型微调 (Fine Tuning)、评估实验 (Evaluation) 与视觉多模态 (Vision) 六大主流 AI 业务场景。
*   **物理红线预警**：根据算力规模自动计算所需的机柜密度。当密度超过传统风冷极限时（如逼近 120kW/Rack），强制预警引入直接芯片液冷 (DLC) 方案。
*   **算力冷热分离**：基于业务属性，智能拆分“延迟敏感型 (Real-time)”与“可排队溢出型 (Queueable)”算力，并为其推荐最适合的地理与能源位置。
*   **商业 TCO 估算**：对比本地部署与海外高绿电区（如冰岛/北欧）托管的成本差异，直观呈现混合投资组合的财务回报。
*   **24/7 CFE 防线与 CBAM 合规**：强调基于 API 硬件遥测的小时级无碳电力匹配，防御由 Scope 2/3 带来的欧盟 CBAM 碳关税风险。

## 🚀 快速启动

本项目基于 React + Vite 构建，具有极轻量、毫秒级热更新的特点。

### 环境要求
*   [Node.js](https://nodejs.org/) (建议 v18 及以上版本)
*   npm 或 yarn

### 安装与运行

1. 克隆代码仓库到本地：
```bash
git clone <your-github-repo-url>
cd green-compute-app
```

2. 安装依赖：
```bash
npm install
```

3. 启动本地开发服务器：
```bash
npm run dev
```

4. 在浏览器中访问：`http://localhost:5173/`

## 📦 打包部署

如果您需要将应用部署到内网服务器或静态托管平台（如 Vercel, Netlify, GitHub Pages），请运行：

```bash
npm run build
```
这将在 `dist/` 目录下生成用于生产环境的优化过的静态资源。

## 📄 报告导出

在平台中完成各项参数假设后，可点击左侧导航栏的 **“生成汇总报告”**，一键输出排版精美、可供直接打印或导出为 PDF 的战略分析报告。

## 🤝 协作与贡献

本项目用于辅助企业内部的基础设施与脱碳规划。如果底层物理参数（如 PUE、单卡功耗、托管基准价格）发生变动，可直接修改 `src/context/CalculationContext.jsx` 和 `src/components/ReportView.jsx` 中的默认值。

---
*Created for Green Compute & Decarbonization Strategy Planning.*
