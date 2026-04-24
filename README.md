# 中企 AI 算力出海与中亚投资测算平台 (Overseas Compute Strategy Platform)

本平台旨在将 AI 算力需求从抽象的业务指标（如请求数、Tokens）转化为真实的物理与商业指标（GPU 数量、Peak kW、月度能耗 kWh）。通过建立科学的换算模型，辅助企业高管 (SteerCo) 制定**“在哈萨克斯坦等海外节点建设算力中心，向全球输出 Token”**的基建、脱碳与出海投资战略。

## 🎯 核心战略功能

*   **全场景建模引擎**：覆盖交互式助手 (Copilot)、代理工作流 (Agentic Workflow)、批处理推理 (Batch)、模型微调 (Fine Tuning)、评估实验 (Evaluation) 与视觉多模态 (Vision) 六大主流 AI 业务场景。
*   **物理红线预警**：根据算力规模自动计算所需的机柜密度。当密度超过传统风冷极限时（如逼近 120kW/Rack），强制预警引入直接芯片液冷 (DLC) 方案。
*   **出海算力冷热分离**：基于业务属性，智能拆分“延迟敏感型 (Real-time)”与“可排队溢出型 (Queueable)”算力。建议将高吞吐任务全面部署于哈萨克斯坦，利用其廉价电力与天然冷源；而低延迟任务则视合规要求部署于海陆缆核心节点。
*   **商业 TCO 估算**：硬核对比传统公有云全量部署（如国内/新加坡节点）与投资哈萨克斯坦算力中心的成本差异，直观呈现出海投资的庞大财务节省（TCO）。
*   **地缘合规与 CBAM 防线**：面对高端 GPU 供应链封锁风险，出海建算力池是有效突围策略；同时强调必须在哈国投资捆绑风光新能源，以 24/7 CFE 抵御欧盟碳边境调节机制 (CBAM) 的高额惩罚。

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

## 📄 出海决策报告导出

在平台中完成各项参数假设后，可点击左侧导航栏的 **“生成汇总报告”**，一键输出排版精美、可供直接打印或导出为 PDF 的高管战略分析报告。

## 🤝 协作与贡献

本项目用于辅助企业内部的算力出海投资测算。如果底层物理参数（如 PUE、单卡功耗、哈萨克斯坦与国内的托管基准价格差）发生变动，可直接修改 `src/context/CalculationContext.jsx` 和 `src/components/ReportView.jsx` 中的默认值。

---
*Created for Global AI Expansion & Decarbonization Strategy Planning.*
