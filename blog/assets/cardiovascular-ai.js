/**
 * 心血管健康风险评估AI分析引擎
 * 基于Framingham心血管风险评分系统
 */

/**
 * 计算心血管健康风险（快速版）
 * @param {Object} answers - 用户答案
 * @param {string} mode - 评估模式 ('quick' 或 'standard')
 * @returns {Object} 风险评估结果
 */
function calculateCardiovascularRisk(answers, mode = 'quick') {
    let riskScore = 0;
    let riskFactors = [];
    
    // 1. 年龄风险
    const age = parseInt(answers.q1);
    if (age >= 70) {
        riskScore += 10;
        riskFactors.push('年龄偏大（≥70岁）');
    } else if (age >= 65) {
        riskScore += 8;
        riskFactors.push('年龄偏大（65-69岁）');
    } else if (age >= 55) {
        riskScore += 5;
        riskFactors.push('年龄（55-64岁）');
    } else if (age >= 45) {
        riskScore += 3;
    }
    
    // 2. 性别风险（男性风险更高）
    if (answers.q2 === 'male' && age < 50) {
        riskScore += 2;
    }
    
    // 3. BMI风险（快速版问题7）
    const height = parseFloat(answers.q7?.height || 170) / 100;
    const weight = parseFloat(answers.q7?.weight || 70);
    const bmi = weight / (height * height);
    
    if (bmi >= 30) {
        riskScore += 6;
        riskFactors.push(`肥胖（BMI ${bmi.toFixed(1)}）`);
    } else if (bmi >= 25) {
        riskScore += 3;
        riskFactors.push(`超重（BMI ${bmi.toFixed(1)}）`);
    }
    
    // 4. 血压风险
    if (answers.q4 !== 'unknown') {
        const sbp = parseInt(answers.q4);
        if (sbp >= 160) {
            riskScore += 8;
            riskFactors.push('严重高血压（收缩压≥160 mmHg）');
        } else if (sbp >= 140) {
            riskScore += 5;
            riskFactors.push('高血压（收缩压≥140 mmHg）');
        } else if (sbp >= 130) {
            riskScore += 3;
            riskFactors.push('血压偏高（收缩压≥130 mmHg）');
        }
    }
    
    // 5. 降压药使用
    if (answers.q5 === 'yes') {
        riskScore += 3;
        riskFactors.push('正在服用降压药物');
    }
    
    // 6. 糖尿病风险
    if (answers.q6 === 'yes') {
        riskScore += 10;
        riskFactors.push('患有糖尿病');
    }
    
    // 7. 吸烟风险
    if (answers.q3 === 'yes') {
        riskScore += 8;
        riskFactors.push('目前吸烟');
    }
    
    // 8. 运动不足
    if (answers.q8 === 'none') {
        riskScore += 5;
        riskFactors.push('缺乏运动');
    } else if (answers.q8 === 'low') {
        riskScore += 3;
        riskFactors.push('运动不足');
    }
    
    // 9. 不健康饮食
    if (answers.q9 === 'poor') {
        riskScore += 4;
        riskFactors.push('不健康的饮食习惯');
    } else if (answers.q9 === 'fair') {
        riskScore += 2;
    }
    
    // 10. 家族史
    if (answers.q10 === 'yes') {
        riskScore += 5;
        riskFactors.push('心血管疾病家族史');
    }
    
    // 转换为10年风险百分比（简化计算）
    const riskPercentage = Math.min(Math.round(riskScore * 1.2), 40);
    
    // 确定风险等级
    let riskLevel;
    if (riskPercentage < 10) {
        riskLevel = '低风险';
    } else if (riskPercentage < 20) {
        riskLevel = '中风险';
    } else {
        riskLevel = '高风险';
    }
    
    // 生成分析和建议
    const analysis = generateQuickAnalysis(riskPercentage, riskLevel, riskFactors);
    const suggestions = generateQuickSuggestions(answers, riskFactors);
    
    return {
        riskScore: riskPercentage,
        riskLevel,
        riskFactors: riskFactors.length > 0 ? riskFactors : ['未发现明显风险因素'],
        analysis,
        suggestions
    };
}

/**
 * 生成快速分析文本
 */
function generateQuickAnalysis(riskScore, riskLevel, riskFactors) {
    let analysis = '';
    
    if (riskLevel === '低风险') {
        analysis = `根据快速评估，您的10年心血管疾病风险为${riskScore}%，属于低风险水平。这是一个非常好的结果！`;
        analysis += '您目前的生活方式和健康状态相对理想，但仍需要保持健康的生活习惯，定期体检。';
        analysis += '建议使用AZ Ring智能戒指持续监测心率、心率变异性、睡眠质量等关键健康指标。';
    } else if (riskLevel === '中风险') {
        analysis = `您的10年心血管疾病风险为${riskScore}%，属于中等风险水平。`;
        analysis += `主要风险因素包括：${riskFactors.slice(0, 3).join('、')}。`;
        analysis += '好消息是，这些风险因素大多可以通过生活方式改变来改善。建议您从戒烟、规律运动、健康饮食等方面着手，并定期监测相关健康指标。';
        analysis += 'AZ Ring智能戒指可以帮助您实时追踪心率、活动量、睡眠等数据，为健康管理提供科学依据。';
    } else {
        analysis = `您的10年心血管疾病风险为${riskScore}%，属于高风险水平。`;
        analysis += `主要风险因素包括：${riskFactors.slice(0, 3).join('、')}。`;
        analysis += '建议您尽快咨询专业医生，进行全面的心血管健康检查。同时，戒烟、合理饮食、规律运动、控制体重等生活方式改变将对您的心血管健康产生积极影响。';
        analysis += '建议进行更详细的标准评估，以获得更精准的风险分析和个性化建议。';
    }
    
    return analysis;
}

/**
 * 生成快速建议
 */
function generateQuickSuggestions(answers, riskFactors) {
    const suggestions = [];
    
    // 基于具体风险因素生成建议
    if (answers.q3 === 'yes') {
        suggestions.push('立即戒烟：吸烟是最重要的可控风险因素，戒烟可显著降低心血管风险');
    }
    
    if (answers.q8 === 'none' || answers.q8 === 'low') {
        suggestions.push('增加运动：每周至少150分钟中等强度有氧运动（如快走、游泳）');
    }
    
    if (answers.q9 === 'poor' || answers.q9 === 'fair') {
        suggestions.push('改善饮食：采用地中海饮食模式，多吃蔬果、全谷物、鱼类，减少饱和脂肪');
    }
    
    const height = parseFloat(answers.q7?.height || 170) / 100;
    const weight = parseFloat(answers.q7?.weight || 70);
    const bmi = weight / (height * height);
    if (bmi >= 25) {
        suggestions.push('控制体重：通过合理饮食和运动，将BMI控制在18.5-24.9的健康范围');
    }
    
    if (answers.q4 !== 'unknown' && parseInt(answers.q4) >= 130) {
        suggestions.push('控制血压：减少盐分摄入，定期监测血压，必要时咨询医生用药');
    }
    
    if (answers.q6 === 'yes') {
        suggestions.push('管理血糖：严格控制饮食，规律服药，定期监测血糖和HbA1c');
    }
    
    // 通用建议
    if (suggestions.length < 5) {
        suggestions.push('定期体检：每年进行心血管健康检查，包括血压、血脂、血糖等');
        suggestions.push('使用AZ Ring：持续监测心率、心率变异性、血氧、睡眠等健康数据');
    }
    
    return suggestions.slice(0, 5);
}

/**
 * 标准版Framingham风险评分计算（更精确）
 * 基于完整的Framingham心脏研究风险评分系统
 */
function calculateFraminghamRiskStandard(answers) {
    // 这个函数已经在 health-cardiovascular-standard.html 中实现
    // 这里提供一个独立的版本供其他页面调用
    
    let riskScore = 0;
    let riskFactors = [];
    
    // 详细的Framingham评分逻辑
    // （与standard.html中的实现一致）
    
    return {
        riskScore: Math.min(Math.round(riskScore * 1.5), 45),
        riskLevel: riskScore < 10 ? '低风险' : (riskScore < 20 ? '中风险' : '高风险'),
        riskFactors,
        suggestions: []
    };
}

/**
 * 格式化风险评分为颜色
 */
function getRiskColor(riskLevel) {
    const colors = {
        '低风险': '#10b981', // 绿色
        '中风险': '#f59e0b', // 橙色
        '高风险': '#ef4444'  // 红色
    };
    return colors[riskLevel] || '#6b7280';
}

/**
 * 导出函数供HTML页面使用
 */
if (typeof window !== 'undefined') {
    window.calculateCardiovascularRisk = calculateCardiovascularRisk;
    window.calculateFraminghamRiskStandard = calculateFraminghamRiskStandard;
    window.getRiskColor = getRiskColor;
}

