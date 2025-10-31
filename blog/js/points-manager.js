/**
 * 积分管理系统
 * 管理用户积分的获取、消费和查询
 * 版本: 1.0
 */

// ========== 积分管理类 ==========
class PointsManager {
    constructor() {
        this.userId = this.getUserId();
        this.storageKey = {
            balance: 'points_balance',
            earned: 'points_earned_history',
            spent: 'points_spent_history'
        };
        this.init();
    }
    
    // 初始化
    init() {
        console.log('💰 积分管理系统已初始化');
        console.log('👤 用户ID:', this.userId);
        console.log('💎 当前积分:', this.getBalance());
    }
    
    // 获取用户ID
    getUserId() {
        let userId = localStorage.getItem('health_user_id');
        if (!userId) {
            userId = this.generateUUID();
            localStorage.setItem('health_user_id', userId);
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
    
    // 获取积分余额
    getBalance() {
        const balance = localStorage.getItem(this.storageKey.balance);
        return balance ? parseInt(balance) : 0;
    }
    
    // 设置积分余额（内部方法）
    _setBalance(amount) {
        localStorage.setItem(this.storageKey.balance, amount.toString());
    }
    
    // 添加积分（完成问卷）
    addPoints(amount, source, testType, testName, relatedRecordId) {
        if (amount <= 0) {
            console.warn('积分数量必须大于0');
            return false;
        }
        
        // 检查是否已经获得过该问卷的积分
        if (this.hasEarnedPointsForTest(testType, testName)) {
            console.log(`⚠️ 已经获得过"${testName}"的积分，不重复发放`);
            return false;
        }
        
        // 创建积分记录
        const record = {
            id: `earn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            timestamp: Date.now(),
            amount: amount,
            source: source,
            testType: testType,
            testName: testName,
            relatedRecordId: relatedRecordId,
            userId: this.userId
        };
        
        // 保存到获取历史
        const earned = this.getEarnedHistory();
        earned.push(record);
        localStorage.setItem(this.storageKey.earned, JSON.stringify(earned));
        
        // 更新余额
        const newBalance = this.getBalance() + amount;
        this._setBalance(newBalance);
        
        console.log(`✅ 积分已添加: +${amount} 分`);
        console.log(`💰 当前余额: ${newBalance} 分`);
        
        return record;
    }
    
    // 消费积分（兑换优惠券）
    spendPoints(amount, purpose, couponId = null, couponName = null) {
        if (amount <= 0) {
            console.warn('消费积分数量必须大于0');
            return { success: false, message: '消费积分数量必须大于0' };
        }
        
        const balance = this.getBalance();
        if (balance < amount) {
            console.warn('积分余额不足');
            return { success: false, message: `积分不足！当前余额: ${balance}分，需要: ${amount}分` };
        }
        
        // 创建消费记录
        const record = {
            id: `spend_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            timestamp: Date.now(),
            amount: amount,
            purpose: purpose,
            couponId: couponId,
            couponName: couponName,
            userId: this.userId
        };
        
        // 保存到消费历史
        const spent = this.getSpentHistory();
        spent.push(record);
        localStorage.setItem(this.storageKey.spent, JSON.stringify(spent));
        
        // 更新余额
        const newBalance = balance - amount;
        this._setBalance(newBalance);
        
        console.log(`✅ 积分已消费: -${amount} 分`);
        console.log(`💰 当前余额: ${newBalance} 分`);
        
        return { success: true, message: '兑换成功！', record: record, newBalance: newBalance };
    }
    
    // 检查是否已获得过该问卷的积分
    hasEarnedPointsForTest(testType, testName) {
        const earned = this.getEarnedHistory();
        return earned.some(record => 
            record.testType === testType && 
            record.testName === testName
        );
    }
    
    // 获取积分获取历史
    getEarnedHistory(limit = 1000) {
        const history = localStorage.getItem(this.storageKey.earned);
        const records = history ? JSON.parse(history) : [];
        
        // 按时间倒序排列（最新的在前面）
        records.sort((a, b) => b.timestamp - a.timestamp);
        
        return limit ? records.slice(0, limit) : records;
    }
    
    // 获取积分消费历史
    getSpentHistory(limit = 1000) {
        const history = localStorage.getItem(this.storageKey.spent);
        const records = history ? JSON.parse(history) : [];
        
        // 按时间倒序排列
        records.sort((a, b) => b.timestamp - a.timestamp);
        
        return limit ? records.slice(0, limit) : records;
    }
    
    // 获取总积分统计
    getStatistics() {
        const earned = this.getEarnedHistory();
        const spent = this.getSpentHistory();
        
        const totalEarned = earned.reduce((sum, r) => sum + r.amount, 0);
        const totalSpent = spent.reduce((sum, r) => sum + r.amount, 0);
        
        // 今日获得积分
        const today = new Date().toISOString().split('T')[0];
        const todayEarned = earned.filter(r => {
            const recordDate = new Date(r.timestamp).toISOString().split('T')[0];
            return recordDate === today;
        }).reduce((sum, r) => sum + r.amount, 0);
        
        // 本周获得积分
        const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
        const weekEarned = earned.filter(r => r.timestamp >= weekAgo)
            .reduce((sum, r) => sum + r.amount, 0);
        
        return {
            balance: this.getBalance(),
            totalEarned: totalEarned,
            totalSpent: totalSpent,
            todayEarned: todayEarned,
            weekEarned: weekEarned,
            earnedCount: earned.length,
            spentCount: spent.length
        };
    }
    
    // 获取积分获取来源统计
    getSourceStatistics() {
        const earned = this.getEarnedHistory();
        const stats = {};
        
        earned.forEach(record => {
            const key = record.testType || 'other';
            if (!stats[key]) {
                stats[key] = {
                    count: 0,
                    totalPoints: 0,
                    testType: record.testType,
                    records: []
                };
            }
            stats[key].count++;
            stats[key].totalPoints += record.amount;
            stats[key].records.push(record);
        });
        
        return stats;
    }
    
    // 清空所有积分数据（慎用）
    clearAllData() {
        if (confirm('⚠️ 此操作不可恢复！确定要清空所有积分数据吗？')) {
            localStorage.removeItem(this.storageKey.balance);
            localStorage.removeItem(this.storageKey.earned);
            localStorage.removeItem(this.storageKey.spent);
            console.log('✅ 积分数据已清空');
            return true;
        }
        return false;
    }
    
    // 导出积分数据
    exportData() {
        const data = {
            version: '1.0',
            userId: this.userId,
            exportDate: new Date().toISOString(),
            balance: this.getBalance(),
            earnedHistory: this.getEarnedHistory(),
            spentHistory: this.getSpentHistory(),
            statistics: this.getStatistics()
        };
        
        return data;
    }
    
    // 导入积分数据
    importData(data) {
        try {
            if (!data.userId || !data.earnedHistory) {
                throw new Error('数据格式错误');
            }
            
            if (confirm('导入数据会覆盖当前所有积分记录，是否继续？')) {
                localStorage.setItem(this.storageKey.balance, data.balance.toString());
                localStorage.setItem(this.storageKey.earned, JSON.stringify(data.earnedHistory));
                localStorage.setItem(this.storageKey.spent, JSON.stringify(data.spentHistory || []));
                
                alert('✅ 积分数据导入成功！');
                location.reload();
                return true;
            }
        } catch (error) {
            alert('❌ 积分数据导入失败：' + error.message);
            return false;
        }
    }
}

// 自动初始化全局实例
if (typeof window !== 'undefined') {
    window.pointsManager = new PointsManager();
    console.log('✅ 积分管理器已全局加载');
}

