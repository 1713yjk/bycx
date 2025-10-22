/**
 * AI分析辅助函数
 * 用于调用百炼AI API进行健康分析
 */

/**
 * 调用百炼AI API
 * @param {string} prompt - 提示词
 * @returns {Promise<object>} AI响应
 */
export async function callBailianAPI(prompt) {
    try {
        console.log('[AI] 开始调用百炼AI API...');
        console.log('[AI] Prompt长度:', prompt.length);
        
        // 发送POST请求到Vercel API Route
        const response = await fetch('/api/bailian', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt })
        });
        
        console.log('[AI] API响应状态:', response.status);
        
        if (!response.ok) {
            const errorData = await response.json();
            console.error('[AI] API错误:', errorData);
            throw new Error(`API调用失败: ${errorData.message || response.statusText}`);
        }
        
        const data = await response.json();
        console.log('[AI] API调用成功');
        
        // 百炼API返回格式
        // {
        //   output: {
        //     text: "AI生成的文本"
        //   }
        // }
        
        return data;
        
    } catch (error) {
        console.error('[AI] 调用失败:', error);
        throw error;
    }
}

/**
 * 解析百炼AI响应为标准格式
 * @param {object} response - 百炼API响应
 * @returns {object} 标准化的分析结果
 */
export function parseAIResponse(response) {
    try {
        // 从百炼API响应中提取文本
        const aiText = response.output?.text || response.output?.choices?.[0]?.message?.content || '';
        
        if (!aiText) {
            throw new Error('AI响应格式错误');
        }
        
        console.log('[AI] 开始解析AI响应...');
        console.log('[AI] 响应长度:', aiText.length);
        
        // 尝试从AI文本中提取结构化信息
        // 这里需要根据实际AI返回格式调整
        
        const lines = aiText.split('\n').filter(line => line.trim());
        
        // 简单的解析逻辑（可根据实际返回格式优化）
        const result = {
            analysis: '',
            suggestions: [],
            productRecommendations: []
        };
        
        let currentSection = 'analysis';
        
        for (const line of lines) {
            const trimmed = line.trim();
            
            // 检测建议部分
            if (trimmed.includes('建议') || trimmed.includes('suggestion')) {
                currentSection = 'suggestions';
                continue;
            }
            
            // 检测产品推荐部分
            if (trimmed.includes('功能') || trimmed.includes('产品') || trimmed.includes('AZ Ring')) {
                currentSection = 'product';
                continue;
            }
            
            // 添加内容
            if (currentSection === 'analysis') {
                result.analysis += trimmed + ' ';
            } else if (currentSection === 'suggestions') {
                // 去掉列表标记
                const suggestion = trimmed.replace(/^[0-9\-\*\.\)]+\s*/, '');
                if (suggestion.length > 5) {
                    result.suggestions.push(suggestion);
                }
            }
        }
        
        // 如果没有提取到产品推荐，使用默认的
        if (result.productRecommendations.length === 0) {
            result.productRecommendations = [
                {
                    icon: "fa-spa",
                    title: "冥想与正念练习",
                    description: "APP内置多种冥想课程，帮助您快速放松，缓解压力"
                },
                {
                    icon: "fa-heart-pulse",
                    title: "HRV压力监测",
                    description: "实时监测心率变异性，客观了解身体的压力状态"
                },
                {
                    icon: "fa-moon",
                    title: "睡眠质量分析",
                    description: "优质睡眠是缓解压力的关键，戒指帮您全面监测睡眠"
                }
            ];
        }
        
        console.log('[AI] 解析完成');
        console.log('[AI] 分析长度:', result.analysis.length);
        console.log('[AI] 建议数量:', result.suggestions.length);
        
        return result;
        
    } catch (error) {
        console.error('[AI] 解析失败:', error);
        throw error;
    }
}

/**
 * 带重试机制的AI调用
 * @param {string} prompt - 提示词
 * @param {number} maxRetries - 最大重试次数
 * @returns {Promise<object>} AI响应
 */
export async function callAIWithRetry(prompt, maxRetries = 2) {
    for (let i = 0; i <= maxRetries; i++) {
        try {
            const response = await callBailianAPI(prompt);
            return parseAIResponse(response);
        } catch (error) {
            console.warn(`[AI] 第 ${i + 1} 次尝试失败:`, error.message);
            
            if (i === maxRetries) {
                console.error('[AI] 所有重试都失败，使用备用分析');
                throw error;
            }
            
            // 等待一段时间后重试
            await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
        }
    }
}

