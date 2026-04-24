import React, { createContext, useState, useContext, useMemo } from 'react';

const CalculationContext = createContext();

export const useCalculations = () => useContext(CalculationContext);

export const CalculationProvider = ({ children }) => {
  const [global, setGlobal] = useState({ pue: 1.3, gpuPowerKw: 1.5, nonGpuOverhead: 0.2, rubinThroughput: 80000 });
  const [assistants, setAssistants] = useState({ eligibleUsers: 10000, adoptionRate: 0.6, monthlyActiveRate: 0.8, promptsPerUser: 150, avgInputTokens: 1200, avgOutputTokens: 800, peakHourShare: 0.15, utilizationTarget: 0.7 });
  const [workflows, setWorkflows] = useState({ activeUsers: 5000, workflowsPerUser: 40, stepsPerWorkflow: 5, modelCallsPerStep: 3, retryFactor: 1.2, avgTokensPerCall: 2500, peakConcurrencyFactor: 1.5, utilizationTarget: 0.75 });
  const [batch, setBatch] = useState({ jobsPerMonth: 100, itemsPerJob: 50000, tokensPerItem: 2000, targetWindowHours: 72, utilizationTarget: 0.85 });
  const [finetune, setFinetune] = useState({ runsPerQuarter: 4, datasetSize: 50000000, epochs: 3, targetWindowHours: 48, evalOverhead: 0.2, utilizationTarget: 0.9 });
  const [evalScenario, setEvalScenario] = useState({ runsPerMonth: 20, promptsPerRun: 1000, modelsPerComparison: 3, rerunFactor: 1.5, tokensPerUnit: 1500 });
  const [vision, setVision] = useState({ mediaItemsPerMonth: 500000, preProcSec: 0.5, inferenceSec: 2.0, postProcSec: 0.5, targetWindowHours: 240, utilizationTarget: 0.8 });

  const results = useMemo(() => {
    // S1: Assistants
    const s1_monthlyTokens = assistants.eligibleUsers * assistants.adoptionRate * assistants.monthlyActiveRate * assistants.promptsPerUser * (assistants.avgInputTokens + assistants.avgOutputTokens);
    const s1_peakTokensPerSec = ((s1_monthlyTokens / 30) * assistants.peakHourShare) / 3600;
    const s1_installedGPUs = (s1_peakTokensPerSec / global.rubinThroughput) / assistants.utilizationTarget;
    const s1_gpuHours = s1_monthlyTokens / (global.rubinThroughput * 3600);

    // S2: Workflows
    const s2_monthlyTokens = workflows.activeUsers * workflows.workflowsPerUser * workflows.stepsPerWorkflow * workflows.modelCallsPerStep * workflows.retryFactor * workflows.avgTokensPerCall;
    const s2_peakTokensPerSec = ((s2_monthlyTokens / (30 * 24)) * workflows.peakConcurrencyFactor) / 3600;
    const s2_installedGPUs = (s2_peakTokensPerSec / global.rubinThroughput) / workflows.utilizationTarget;
    const s2_gpuHours = s2_monthlyTokens / (global.rubinThroughput * 3600);

    // S3: Batch
    const s3_monthlyTokens = batch.jobsPerMonth * batch.itemsPerJob * batch.tokensPerItem;
    const s3_requiredThroughput = s3_monthlyTokens / (batch.targetWindowHours * 3600);
    const s3_installedGPUs = (s3_requiredThroughput / global.rubinThroughput) / batch.utilizationTarget;
    const s3_gpuHours = s3_monthlyTokens / (global.rubinThroughput * 3600);

    // S4: Fine Tuning (Calculated as monthly equivalent for energy)
    const s4_runsPerMonth = finetune.runsPerQuarter / 3;
    const s4_totalWork = s4_runsPerMonth * finetune.datasetSize * finetune.epochs * (1 + finetune.evalOverhead);
    const s4_gpuHours = s4_totalWork / (global.rubinThroughput * 3600);
    // GPUs needed during the actual target window
    const s4_installedGPUs = (s4_gpuHours / (finetune.targetWindowHours * (s4_runsPerMonth > 0 ? 1 : 0) || 1)) / finetune.utilizationTarget;

    // S5: Evaluation
    const s5_monthlyTokens = evalScenario.runsPerMonth * evalScenario.promptsPerRun * evalScenario.modelsPerComparison * evalScenario.rerunFactor * evalScenario.tokensPerUnit;
    const s5_gpuHours = s5_monthlyTokens / (global.rubinThroughput * 3600);
    // Assume spread over the month for installed calculation (approx)
    const s5_installedGPUs = s5_gpuHours / (30 * 24); 

    // S6: Vision
    const s6_totalRuntimeSec = vision.mediaItemsPerMonth * (vision.preProcSec + vision.inferenceSec + vision.postProcSec);
    const s6_gpuHours = s6_totalRuntimeSec / 3600;
    const s6_installedGPUs = (s6_gpuHours / vision.targetWindowHours) / vision.utilizationTarget;

    // Aggregation
    const totalInstalledGPUs = Math.ceil(s1_installedGPUs + s2_installedGPUs + s3_installedGPUs + s4_installedGPUs + s5_installedGPUs + s6_installedGPUs);
    const totalGpuHours = s1_gpuHours + s2_gpuHours + s3_gpuHours + s4_gpuHours + s5_gpuHours + s6_gpuHours;
    
    // Portfolio Separation
    const realtimeGPUs = Math.ceil(s1_installedGPUs + s2_installedGPUs + s6_installedGPUs); // Vision (s6) is often real-time
    const queueableGPUs = Math.ceil(s3_installedGPUs + s4_installedGPUs + s5_installedGPUs); // Batch, Finetune, Eval are queueable
    
    // Power & Energy (Refined based on GPU-hours for accuracy)
    const peakKw = totalInstalledGPUs * global.gpuPowerKw * (1 + global.nonGpuOverhead) * global.pue;
    const realtimeKw = realtimeGPUs * global.gpuPowerKw * (1 + global.nonGpuOverhead) * global.pue;
    const queueableKw = queueableGPUs * global.gpuPowerKw * (1 + global.nonGpuOverhead) * global.pue;

    const monthlyITKwh = totalGpuHours * global.gpuPowerKw * (1 + global.nonGpuOverhead);
    const monthlyKwh = monthlyITKwh * global.pue;

    return {
      s1: { monthlyTokens: s1_monthlyTokens, peakTokensPerSec: s1_peakTokensPerSec, installedGPUs: s1_installedGPUs },
      s2: { monthlyTokens: s2_monthlyTokens, peakTokensPerSec: s2_peakTokensPerSec, installedGPUs: s2_installedGPUs },
      s3: { monthlyTokens: s3_monthlyTokens, installedGPUs: s3_installedGPUs },
      s4: { totalWork: s4_totalWork, installedGPUs: s4_installedGPUs },
      s5: { monthlyTokens: s5_monthlyTokens, installedGPUs: s5_installedGPUs },
      s6: { gpuHours: s6_gpuHours, installedGPUs: s6_installedGPUs },
      portfolio: { realtimeGPUs, queueableGPUs, realtimeKw, queueableKw },
      totals: { installedGPUs: totalInstalledGPUs, peakKw, monthlyKwh }
    };
  }, [global, assistants, workflows, batch, finetune, evalScenario, vision]);

  return (
    <CalculationContext.Provider value={{
      global, setGlobal, assistants, setAssistants, workflows, setWorkflows,
      batch, setBatch, finetune, setFinetune, evalScenario, setEvalScenario, vision, setVision,
      results
    }}>
      {children}
    </CalculationContext.Provider>
  );
};
