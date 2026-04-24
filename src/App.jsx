import React, { useState } from 'react'
import { CalculationProvider } from './context/CalculationContext'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import GlobalSettings from './components/GlobalSettings'
import ScenarioAssistant from './components/ScenarioAssistant'
import ScenarioWorkflow from './components/ScenarioWorkflow'
import ScenarioBatch from './components/ScenarioBatch'
import ScenarioFinetune from './components/ScenarioFinetune'
import ScenarioEval from './components/ScenarioEval'
import ScenarioVision from './components/ScenarioVision'
import ReportView from './components/ReportView'
import './App.css'
import './index.css'

function AppContent() {
  const [activeTab, setActiveTab] = useState('global');

  const renderContent = () => {
    switch (activeTab) {
      case 'global': return <GlobalSettings />;
      case 'assistant': return <ScenarioAssistant />;
      case 'workflow': return <ScenarioWorkflow />;
      case 'batch': return <ScenarioBatch />;
      case 'finetune': return <ScenarioFinetune />;
      case 'eval': return <ScenarioEval />;
      case 'vision': return <ScenarioVision />;
      case 'report': return <ReportView />;
      default: return <GlobalSettings />;
    }
  };

  return (
    <div className="app-container">
      <div className="no-print"><Sidebar activeTab={activeTab} setActiveTab={setActiveTab} /></div>
      
      <main className="main-content print-full-width">
        <header className="top-bar animate-fade-in no-print">
          <h1>绿色计算容量与碳排放规划平台</h1>
          <div style={{
            padding: '8px 16px', 
            background: 'rgba(16, 185, 129, 0.1)', 
            border: '1px solid rgba(16, 185, 129, 0.2)',
            borderRadius: '20px',
            color: 'var(--primary-accent)',
            fontSize: '0.85rem',
            fontWeight: '600',
            letterSpacing: '0.05em'
          }}>
            MVP 测试版
          </div>
        </header>

        {activeTab !== 'report' && <Dashboard />}
        
        <div style={{ minHeight: '400px' }}>
          {renderContent()}
        </div>
      </main>
    </div>
  )
}

function App() {
  return (
    <CalculationProvider>
      <AppContent />
    </CalculationProvider>
  )
}

export default App
