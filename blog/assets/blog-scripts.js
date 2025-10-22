// Blog Scripts - 博客专用JavaScript功能

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initBlogSearch();
    initBlogFilters();
    initReadingProgress();
    initCodeHighlighting();
    initImageLazyLoading();
    initShareButtons();
    initMobileMenu();
});

// 博客搜索功能
function initBlogSearch() {
    const searchInput = document.getElementById('blog-search');
    if (!searchInput) return;

    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const articles = document.querySelectorAll('.blog-card');
        
        articles.forEach(article => {
            const title = article.querySelector('.blog-card-title').textContent.toLowerCase();
            const excerpt = article.querySelector('.blog-card-excerpt').textContent.toLowerCase();
            const tags = Array.from(article.querySelectorAll('.blog-card-tag')).map(tag => tag.textContent.toLowerCase());
            
            const matches = title.includes(searchTerm) || 
                           excerpt.includes(searchTerm) || 
                           tags.some(tag => tag.includes(searchTerm));
            
            article.style.display = matches ? 'block' : 'none';
        });
    });
}

// 博客筛选功能
function initBlogFilters() {
    const categoryLinks = document.querySelectorAll('.blog-category');
    const tagLinks = document.querySelectorAll('.blog-tag');
    
    // 分类筛选
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.getAttribute('data-category');
            filterArticlesByCategory(category);
            
            // 更新活跃状态
            categoryLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // 标签筛选
    tagLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const tag = this.textContent.toLowerCase();
            filterArticlesByTag(tag);
        });
    });
}

// 按分类筛选文章
function filterArticlesByCategory(category) {
    const articles = document.querySelectorAll('.blog-card');
    
    articles.forEach(article => {
        const articleCategory = article.getAttribute('data-category');
        if (category === 'all' || articleCategory === category) {
            article.style.display = 'block';
        } else {
            article.style.display = 'none';
        }
    });
}

// 按标签筛选文章
function filterArticlesByTag(tag) {
    const articles = document.querySelectorAll('.blog-card');
    
    articles.forEach(article => {
        const tags = Array.from(article.querySelectorAll('.blog-card-tag')).map(t => t.textContent.toLowerCase());
        if (tags.includes(tag)) {
            article.style.display = 'block';
        } else {
            article.style.display = 'none';
        }
    });
}

// 阅读进度条
function initReadingProgress() {
    const progressBar = document.getElementById('reading-progress');
    if (!progressBar) return;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        progressBar.style.width = scrollPercent + '%';
    });
}

// 代码高亮
function initCodeHighlighting() {
    const codeBlocks = document.querySelectorAll('pre code');
    
    codeBlocks.forEach(block => {
        // 添加行号
        const lines = block.textContent.split('\n');
        const lineNumbers = document.createElement('div');
        lineNumbers.className = 'line-numbers';
        
        lines.forEach((line, index) => {
            const lineNumber = document.createElement('span');
            lineNumber.textContent = index + 1;
            lineNumbers.appendChild(lineNumber);
        });
        
        block.parentNode.insertBefore(lineNumbers, block);
        
        // 添加复制按钮
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-code-btn';
        copyButton.innerHTML = '<i class="fas fa-copy"></i>';
        copyButton.addEventListener('click', function() {
            navigator.clipboard.writeText(block.textContent).then(() => {
                this.innerHTML = '<i class="fas fa-check"></i>';
                setTimeout(() => {
                    this.innerHTML = '<i class="fas fa-copy"></i>';
                }, 2000);
            });
        });
        
        block.parentNode.appendChild(copyButton);
    });
}

// 图片懒加载
function initImageLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// 分享按钮功能
function initShareButtons() {
    const shareButtons = document.querySelectorAll('.share-btn');
    
    shareButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.getAttribute('data-platform');
            const url = encodeURIComponent(window.location.href);
            const title = encodeURIComponent(document.title);
            
            let shareUrl = '';
            
            switch(platform) {
                case 'weibo':
                    shareUrl = `https://service.weibo.com/share/share.php?url=${url}&title=${title}`;
                    break;
                case 'wechat':
                    // 微信分享需要特殊处理，这里显示二维码
                    showWechatQR();
                    return;
                case 'linkedin':
                    shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
                    break;
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
                    break;
            }
            
            if (shareUrl) {
                window.open(shareUrl, '_blank', 'width=600,height=400');
            }
        });
    });
}

// 显示微信分享二维码
function showWechatQR() {
    const modal = document.createElement('div');
    modal.className = 'wechat-share-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <h3>微信分享</h3>
            <p>请使用微信扫描二维码分享</p>
            <div class="qr-code">
                <!-- 这里可以放置动态生成的二维码 -->
                <div class="qr-placeholder">二维码</div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // 关闭模态框
    modal.querySelector('.close').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

// 移动端菜单
function initMobileMenu() {
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileToggle && mobileMenu) {
        mobileToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
        });
    }
}

// 平滑滚动
function smoothScrollTo(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// 文章阅读时间估算
function calculateReadingTime(content) {
    const wordsPerMinute = 200;
    const wordCount = content.trim().split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return readingTime;
}

// 更新文章阅读时间
function updateReadingTimes() {
    const articles = document.querySelectorAll('.blog-card');
    
    articles.forEach(article => {
        const excerpt = article.querySelector('.blog-card-excerpt').textContent;
        const readingTime = calculateReadingTime(excerpt);
        const timeElement = article.querySelector('.reading-time');
        
        if (timeElement) {
            timeElement.textContent = `${readingTime} 分钟阅读`;
        }
    });
}

// 相关文章推荐
function loadRelatedArticles(currentArticleId) {
    // 这里可以根据当前文章ID加载相关文章
    // 实际实现中可能需要从服务器获取数据
    console.log('Loading related articles for:', currentArticleId);
}

// 文章统计
function trackArticleView(articleId) {
    // 这里可以添加文章浏览统计
    console.log('Article viewed:', articleId);
}

// 导出函数供其他脚本使用
window.BlogUtils = {
    smoothScrollTo,
    calculateReadingTime,
    updateReadingTimes,
    loadRelatedArticles,
    trackArticleView
}; 