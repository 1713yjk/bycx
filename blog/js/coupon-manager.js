/**
 * 优惠券管理系统
 * 管理优惠券的兑换、使用和查询
 * 版本: 1.0
 */

// ========== 优惠券配置 ==========
const COUPON_CONFIG = [
    {
        id: "coupon_50",
        name: "50元优惠券",
        type: "discount",
        value: 50,
        pointsCost: 100,
        validDays: 30,
        description: "可用于购买任何产品",
        icon: "🎁"
    },
    {
        id: "coupon_100",
        name: "100元优惠券",
        type: "discount",
        value: 100,
        pointsCost: 200,
        validDays: 30,
        description: "可用于购买任何产品",
        icon: "💎"
    },
    {
        id: "coupon_150",
        name: "150元优惠券",
        type: "discount",
        value: 150,
        pointsCost: 300,
        validDays: 30,
        description: "可用于购买任何产品",
        icon: "👑"
    },
    {
        id: "coupon_200",
        name: "200元优惠券",
        type: "discount",
        value: 200,
        pointsCost: 400,
        validDays: 30,
        description: "可用于购买任何产品",
        icon: "💰"
    }
];

// ========== 优惠券管理类 ==========
class CouponManager {
    constructor() {
        this.userId = this.getUserId();
        this.storageKey = 'user_coupons';
        this.init();
    }
    
    // 初始化
    init() {
        console.log('🎁 优惠券管理系统已初始化');
        console.log('👤 用户ID:', this.userId);
        
        // 自动检查过期优惠券
        this.checkExpired();
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
    
    // 获取可兑换优惠券列表
    getAvailableCoupons() {
        const userBalance = window.pointsManager ? window.pointsManager.getBalance() : 0;
        
        return COUPON_CONFIG.map(config => ({
            ...config,
            canAfford: userBalance >= config.pointsCost,
            userBalance: userBalance
        }));
    }
    
    // 兑换优惠券
    exchangeCoupon(couponConfigId) {
        // 查找优惠券配置
        const config = COUPON_CONFIG.find(c => c.id === couponConfigId);
        if (!config) {
            return { success: false, message: '优惠券不存在' };
        }
        
        // 检查积分是否足够
        if (!window.pointsManager) {
            return { success: false, message: '积分管理器未加载' };
        }
        
        const balance = window.pointsManager.getBalance();
        if (balance < config.pointsCost) {
            return { 
                success: false, 
                message: `积分不足！需要 ${config.pointsCost} 分，当前只有 ${balance} 分` 
            };
        }
        
        // 扣除积分
        const spendResult = window.pointsManager.spendPoints(
            config.pointsCost,
            `兑换${config.name}`,
            null,  // couponId 稍后生成
            config.name
        );
        
        if (!spendResult.success) {
            return spendResult;
        }
        
        // 创建优惠券实例
        const coupon = {
            id: this.generateCouponId(),
            configId: config.id,
            name: config.name,
            type: config.type,
            value: config.value,
            pointsCost: config.pointsCost,
            status: 'available',  // available | used | expired
            earnedAt: Date.now(),
            usedAt: null,
            expiredAt: Date.now() + (config.validDays * 24 * 60 * 60 * 1000),
            code: this.generateCouponCode(),
            userId: this.userId,
            description: config.description,
            icon: config.icon
        };
        
        // 保存优惠券
        const coupons = this.getMyCoupons('all');
        coupons.push(coupon);
        localStorage.setItem(this.storageKey, JSON.stringify(coupons));
        
        console.log(`✅ 优惠券兑换成功: ${config.name}`);
        console.log(`🎟️ 优惠券代码: ${coupon.code}`);
        
        return { 
            success: true, 
            message: '兑换成功！', 
            coupon: coupon,
            newBalance: spendResult.newBalance
        };
    }
    
    // 使用优惠券
    useCoupon(couponId) {
        const coupons = this.getMyCoupons('all');
        const coupon = coupons.find(c => c.id === couponId);
        
        if (!coupon) {
            return { success: false, message: '优惠券不存在' };
        }
        
        if (coupon.status === 'used') {
            return { success: false, message: '优惠券已使用' };
        }
        
        if (coupon.status === 'expired') {
            return { success: false, message: '优惠券已过期' };
        }
        
        // 标记为已使用
        coupon.status = 'used';
        coupon.usedAt = Date.now();
        
        // 保存
        localStorage.setItem(this.storageKey, JSON.stringify(coupons));
        
        console.log(`✅ 优惠券已使用: ${coupon.name}`);
        
        return { success: true, message: '优惠券已使用', coupon: coupon };
    }
    
    // 获取我的优惠券列表
    getMyCoupons(status = 'all') {
        const coupons = localStorage.getItem(this.storageKey);
        let records = coupons ? JSON.parse(coupons) : [];
        
        // 过滤状态
        if (status !== 'all') {
            records = records.filter(c => c.status === status);
        }
        
        // 按时间倒序排列（最新的在前面）
        records.sort((a, b) => b.earnedAt - a.earnedAt);
        
        return records;
    }
    
    // 获取可用优惠券数量
    getAvailableCount() {
        return this.getMyCoupons('available').length;
    }
    
    // 生成优惠券ID
    generateCouponId() {
        return `coupon_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
    
    // 生成优惠券代码
    generateCouponCode() {
        const prefix = "AZ";
        const timestamp = Date.now().toString(36).toUpperCase();
        const random = Math.random().toString(36).substring(2, 6).toUpperCase();
        return `${prefix}${timestamp}${random}`;
    }
    
    // 检查优惠券是否过期
    checkExpired() {
        const coupons = this.getMyCoupons('all');
        let expiredCount = 0;
        
        coupons.forEach(coupon => {
            if (coupon.status === 'available' && Date.now() > coupon.expiredAt) {
                coupon.status = 'expired';
                expiredCount++;
            }
        });
        
        if (expiredCount > 0) {
            localStorage.setItem(this.storageKey, JSON.stringify(coupons));
            console.log(`⏰ ${expiredCount} 张优惠券已过期`);
        }
        
        return expiredCount;
    }
    
    // 获取优惠券统计
    getStatistics() {
        const all = this.getMyCoupons('all');
        const available = all.filter(c => c.status === 'available');
        const used = all.filter(c => c.status === 'used');
        const expired = all.filter(c => c.status === 'expired');
        
        // 计算总价值
        const totalValue = all.reduce((sum, c) => sum + c.value, 0);
        const availableValue = available.reduce((sum, c) => sum + c.value, 0);
        const usedValue = used.reduce((sum, c) => sum + c.value, 0);
        
        return {
            total: all.length,
            available: available.length,
            used: used.length,
            expired: expired.length,
            totalValue: totalValue,
            availableValue: availableValue,
            usedValue: usedValue
        };
    }
    
    // 格式化日期
    formatDate(timestamp) {
        const date = new Date(timestamp);
        return date.toISOString().split('T')[0];
    }
    
    // 计算剩余天数
    getRemainingDays(expiredAt) {
        const now = Date.now();
        if (now > expiredAt) return 0;
        
        const diffMs = expiredAt - now;
        return Math.ceil(diffMs / (24 * 60 * 60 * 1000));
    }
    
    // 清空所有优惠券数据（慎用）
    clearAllData() {
        if (confirm('⚠️ 此操作不可恢复！确定要清空所有优惠券数据吗？')) {
            localStorage.removeItem(this.storageKey);
            console.log('✅ 优惠券数据已清空');
            return true;
        }
        return false;
    }
    
    // 导出优惠券数据
    exportData() {
        const data = {
            version: '1.0',
            userId: this.userId,
            exportDate: new Date().toISOString(),
            coupons: this.getMyCoupons('all'),
            statistics: this.getStatistics()
        };
        
        return data;
    }
}

// 自动初始化全局实例
if (typeof window !== 'undefined') {
    window.couponManager = new CouponManager();
    console.log('✅ 优惠券管理器已全局加载');
}

