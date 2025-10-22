/**
 * 健康数据管理系统
 * 统一管理所有健康测试的数据存储、读取和展示
 * 版本: 1.0
 */

// ========== 健康数据管理类 ==========
class HealthDataManager {
    constructor() {
        this.userId = this.getOrCreateUserId();
        this.init();
    }
    
    // 初始化
    init() {
        console.log('💊 健康数据管理系统已初始化');
        console.log('👤 用户ID:', this.userId);
    }
    
    // 获取或创建用户ID
    getOrCreateUserId() {
        let userId = localStorage.getItem('health_user_id');
        if (!userId) {
            userId = this.generateUUID();
            localStorage.setItem('health_user_id', userId);
            console.log('✨ 新用户ID已创建');
        }
        return userId;
    }
    
    // 生成UUID
    generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    
    // 保存测试结果
    saveTestResult(testType, testName, score, level, details = {}) {
        const record = {
            id: Date.now(),
            testType: testType,
            testName: testName,
            score: score,
            level: level,
            date: new Date().toISOString().split('T')[0],
            timestamp: Date.now(),
            details: details
        };
        
        const history = this.getHistory();
        const isFirstTest = history.length === 0;
        
        history.push(record);
        localStorage.setItem('health_history', JSON.stringify(history));
        
        console.log('✅ 测试结果已保存:', record);
        
        return record;
    }
    
    // 获取历史记录
    getHistory(testType = null) {
        const history = JSON.parse(localStorage.getItem('health_history') || '[]');
        return testType ? history.filter(h => h.testType === testType) : history;
    }
    
    // 获取最新记录
    getLatestRecord(testType) {
        const records = this.getHistory(testType);
        return records.length > 0 ? records[records.length - 1] : null;
    }
    
    // 获取上一次记录（用于对比）
    getPreviousRecord(testType) {
        const records = this.getHistory(testType);
        return records.length > 1 ? records[records.length - 2] : null;
    }
    
    // 获取统计信息
    getStatistics() {
        const history = this.getHistory();
        const sleepRecords = history.filter(h => h.testType === 'sleep');
        const cardiovascularRecords = history.filter(h => h.testType === 'cardiovascular');
        const stressRecords = history.filter(h => h.testType === 'stress');
        const tcmRecords = history.filter(h => h.testType === 'tcm');
        
        return {
            totalTests: history.length,
            sleepCount: sleepRecords.length,
            cardiovascularCount: cardiovascularRecords.length,
            stressCount: stressRecords.length,
            tcmCount: tcmRecords.length,
            lastTestDate: history.length > 0 ? history[history.length - 1].date : null,
            completionRate: Math.round((new Set(history.map(h => h.testType)).size / 4) * 100)
        };
    }
    
    // 计算综合健康评分
    calculateOverallScore() {
        const latest = {
            sleep: this.getLatestRecord('sleep'),
            cardiovascular: this.getLatestRecord('cardiovascular'),
            stress: this.getLatestRecord('stress'),
            tcm: this.getLatestRecord('tcm')
        };
        
        const scores = [];
        if (latest.sleep) scores.push(latest.sleep.score);
        if (latest.cardiovascular) scores.push(latest.cardiovascular.score);
        if (latest.stress) scores.push(100 - latest.stress.score); // 压力越高分数越低
        if (latest.tcm) scores.push(latest.tcm.score);
        
        if (scores.length === 0) return 0;
        return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
    }
    
    // 计算综合评分趋势
    calculateOverallTrend() {
        const history = this.getHistory();
        if (history.length < 2) return { change: 0, direction: 'stable' };
        
        // 获取最近两次所有测试的平均分
        const recentTests = history.slice(-4); // 最近4次测试
        const olderTests = history.slice(-8, -4); // 之前4次测试
        
        if (recentTests.length === 0) return { change: 0, direction: 'stable' };
        
        const recentAvg = recentTests.reduce((sum, t) => {
            const score = t.testType === 'stress' ? (100 - t.score) : t.score;
            return sum + score;
        }, 0) / recentTests.length;
        
        const olderAvg = olderTests.length > 0 
            ? olderTests.reduce((sum, t) => {
                const score = t.testType === 'stress' ? (100 - t.score) : t.score;
                return sum + score;
            }, 0) / olderTests.length
            : recentAvg;
        
        const change = Math.round(recentAvg - olderAvg);
        const direction = change > 0 ? 'up' : change < 0 ? 'down' : 'stable';
        
        return { change, direction };
    }
    
    // 生成健康建议
    generateRecommendations() {
        const recommendations = [];
        const latest = {
            sleep: this.getLatestRecord('sleep'),
            cardiovascular: this.getLatestRecord('cardiovascular'),
            stress: this.getLatestRecord('stress'),
            tcm: this.getLatestRecord('tcm')
        };
        
        if (latest.sleep && latest.sleep.score < 70) {
            recommendations.push('您的睡眠质量需要改善，建议每晚保持7-8小时睡眠，睡前避免使用电子设备。');
        }
        
        if (latest.cardiovascular && latest.cardiovascular.score < 60) {
            recommendations.push('心血管风险偏高，建议增加有氧运动，控制饮食，定期体检。');
        }
        
        if (latest.stress && latest.stress.score > 60) {
            recommendations.push('压力水平较高，建议尝试冥想、瑜伽等放松方式，保持规律作息。');
        }
        
        if (!latest.sleep || !latest.cardiovascular || !latest.stress || !latest.tcm) {
            recommendations.push('建议完成所有测试类型，以获得更全面的健康评估。');
        }
        
        if (recommendations.length === 0) {
            recommendations.push('您的健康状况良好！继续保持健康的生活方式。');
        }
        
        return recommendations;
    }
    
    // 导出数据
    exportData() {
        const data = {
            version: '1.0',
            userId: this.userId,
            exportDate: new Date().toISOString(),
            history: this.getHistory(),
            settings: JSON.parse(localStorage.getItem('health_settings') || '{}')
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `health_data_${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
        
        alert('✅ 健康数据已导出！');
    }
    
    // 导入数据
    importData(jsonData) {
        try {
            const data = JSON.parse(jsonData);
            
            if (!data.userId || !data.history) {
                throw new Error('数据格式错误');
            }
            
            if (confirm('导入数据会覆盖当前所有记录，是否继续？')) {
                localStorage.setItem('health_user_id', data.userId);
                localStorage.setItem('health_history', JSON.stringify(data.history));
                if (data.settings) {
                    localStorage.setItem('health_settings', JSON.stringify(data.settings));
                }
                
                alert('✅ 数据导入成功！');
                location.reload();
                return true;
            }
        } catch (error) {
            alert('❌ 数据导入失败：' + error.message);
            return false;
        }
    }
    
    // 清空所有数据
    clearAllData() {
        if (confirm('⚠️ 此操作不可恢复！确定要清空所有健康数据吗？')) {
            if (confirm('最后确认：真的要删除吗？')) {
                localStorage.removeItem('health_user_id');
                localStorage.removeItem('health_history');
                localStorage.removeItem('health_settings');
                localStorage.removeItem('fab_guide_shown');
                alert('✅ 所有数据已清空');
                location.reload();
            }
        }
    }
    
    // 数据迁移：从旧格式迁移到统一格式
    migrateOldData() {
        console.log('🔄 检查旧数据格式...');
        
        const migrations = [
            // 压力测试
            {
                oldKey: 'stressQuickResult',
                testType: 'stress',
                testName: '压力快速评估',
                mapper: (data) => ({
                    score: data.stressScore || 0,
                    level: data.stressLevel || '未知',
                    details: data
                })
            },
            {
                oldKey: 'stressStandardResult',
                testType: 'stress',
                testName: '压力标准评估',
                mapper: (data) => ({
                    score: data.stressScore || 0,
                    level: data.stressLevel || '未知',
                    details: data
                })
            },
            {
                oldKey: 'stressDeepResult',
                testType: 'stress',
                testName: '压力深度评估',
                mapper: (data) => ({
                    score: data.stressScore || 0,
                    level: data.stressLevel || '未知',
                    details: data
                })
            },
            // 睡眠测试
            {
                oldKey: 'sleepQuickAssessmentResult',
                testType: 'sleep',
                testName: '睡眠快速评估',
                mapper: (data) => ({
                    score: data.result?.score || data.score || 0,
                    level: data.result?.level || data.level || '未知',
                    details: data
                })
            },
            {
                oldKey: 'sleepDeepResult',
                testType: 'sleep',
                testName: '睡眠深度评估',
                mapper: (data) => ({
                    score: data.psqiScore || data.score || 0,      // 优先读取 psqiScore
                    level: data.level || '未知',
                    details: data
                })
            },
            // 心血管测试
            {
                oldKey: 'cardiovascularQuickResult',
                testType: 'cardiovascular',
                testName: '心血管快速评估',
                mapper: (data) => ({
                    score: data.riskScore || 0,
                    level: data.riskLevel || '未知',
                    details: data
                })
            },
            {
                oldKey: 'cardiovascularStandardResult',
                testType: 'cardiovascular',
                testName: '心血管标准评估',
                mapper: (data) => ({
                    score: data.riskScore || 0,
                    level: data.riskLevel || '未知',
                    details: data
                })
            },
            // 中医体质测试
            {
                oldKey: 'quickAssessmentResult',
                testType: 'tcm',
                testName: '体质快速评估',
                mapper: (data) => {
                    // 体质测试数据结构：{scores: {pinghe: 38, qixu: 97, ...}, ...}
                    if (data.scores) {
                        const topConstitution = Object.entries(data.scores).sort((a, b) => b[1] - a[1])[0];
                        const constitutionNames = {
                            'pinghe': '平和质',
                            'qixu': '气虚质',
                            'yangxu': '阳虚质',
                            'yinxu': '阴虚质',
                            'tanshi': '痰湿质',
                            'shire': '湿热质',
                            'xueyu': '血瘀质',
                            'qiyu': '气郁质',
                            'tebing': '特禀质'
                        };
                        return {
                            score: topConstitution[1],
                            level: constitutionNames[topConstitution[0]] || topConstitution[0],
                            details: data
                        };
                    }
                    return {
                        score: data.dominantScore || 0,
                        level: data.dominantType || '未知',
                        details: data
                    };
                }
            },
            {
                oldKey: 'standardAssessmentResult',
                testType: 'tcm',
                testName: '体质标准评估',
                mapper: (data) => {
                    // 体质测试数据结构：{scores: {pinghe: 38, qixu: 97, ...}, ...}
                    if (data.scores) {
                        const topConstitution = Object.entries(data.scores).sort((a, b) => b[1] - a[1])[0];
                        const constitutionNames = {
                            'pinghe': '平和质',
                            'qixu': '气虚质',
                            'yangxu': '阳虚质',
                            'yinxu': '阴虚质',
                            'tanshi': '痰湿质',
                            'shire': '湿热质',
                            'xueyu': '血瘀质',
                            'qiyu': '气郁质',
                            'tebing': '特禀质'
                        };
                        return {
                            score: topConstitution[1],
                            level: constitutionNames[topConstitution[0]] || topConstitution[0],
                            details: data
                        };
                    }
                    return {
                        score: data.dominantScore || 0,
                        level: data.dominantType || '未知',
                        details: data
                    };
                }
            },
            {
                oldKey: 'deepAssessmentResult',
                testType: 'tcm',
                testName: '体质深度评估',
                mapper: (data) => {
                    // 体质测试数据结构：{scores: {pinghe: 38, qixu: 97, ...}, ...}
                    if (data.scores) {
                        const topConstitution = Object.entries(data.scores).sort((a, b) => b[1] - a[1])[0];
                        const constitutionNames = {
                            'pinghe': '平和质',
                            'qixu': '气虚质',
                            'yangxu': '阳虚质',
                            'yinxu': '阴虚质',
                            'tanshi': '痰湿质',
                            'shire': '湿热质',
                            'xueyu': '血瘀质',
                            'qiyu': '气郁质',
                            'tebing': '特禀质'
                        };
                        return {
                            score: topConstitution[1],
                            level: constitutionNames[topConstitution[0]] || topConstitution[0],
                            details: data
                        };
                    }
                    return {
                        score: data.dominantScore || 0,
                        level: data.dominantType || '未知',
                        details: data
                    };
                }
            }
        ];
        
        let migratedCount = 0;
        const history = this.getHistory();
        
        migrations.forEach(migration => {
            const oldData = localStorage.getItem(migration.oldKey);
            if (oldData) {
                try {
                    const parsed = JSON.parse(oldData);
                    const mapped = migration.mapper(parsed);
                    
                    // 验证映射后的数据
                    if (!mapped.score && mapped.score !== 0) {
                        console.warn(`⚠️ ${migration.testName} 映射失败：无法获取分数`, { parsed, mapped });
                    }
                    
                    // 检查是否已经迁移过（避免重复）
                    // 使用更可靠的判重机制
                    const timestamp = parsed.timestamp ? new Date(parsed.timestamp).getTime() : Date.now();
                    const alreadyMigrated = history.some(h => 
                        h.testType === migration.testType && 
                        h.testName === migration.testName &&
                        Math.abs(h.timestamp - timestamp) < 1000  // 1秒内的记录视为重复
                    );
                    
                    if (!alreadyMigrated) {
                        this.saveTestResult(
                            migration.testType,
                            migration.testName,
                            mapped.score,
                            mapped.level,
                            mapped.details
                        );
                        migratedCount++;
                        console.log(`✅ 已迁移: ${migration.testName} (分数: ${mapped.score}, 等级: ${mapped.level})`);
                        
                        // 可选：删除旧数据
                        // localStorage.removeItem(migration.oldKey);
                    } else {
                        console.log(`⏭️ 跳过已迁移: ${migration.testName}`);
                    }
                } catch (error) {
                    console.warn(`❌ 迁移 ${migration.oldKey} 失败:`, error);
                }
            }
        });
        
        if (migratedCount > 0) {
            console.log(`✅ 成功迁移 ${migratedCount} 条旧数据`);
            return true;
        } else {
            console.log('✓ 没有需要迁移的旧数据');
            return false;
        }
    }
}

// 自动初始化全局实例
if (typeof window !== 'undefined') {
    window.healthDataManager = new HealthDataManager();
    
    // 自动执行数据迁移
    window.healthDataManager.migrateOldData();
}

