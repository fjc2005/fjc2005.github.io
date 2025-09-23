// DOM元素选择器
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-link');
const ctaButtons = document.querySelectorAll('.cta-btn');

const scrollIndicator = document.querySelector('.scroll-indicator');
const resultCards = document.querySelectorAll('.result-card');
const abstractCards = document.querySelectorAll('.abstract-card');
const resourceCards = document.querySelectorAll('.resource-card');
const authorLinks = document.querySelectorAll('.author-link');
const langButtons = document.querySelectorAll('.lang-btn');
const backToTopBtn = document.getElementById('back-to-top');

// 全局语言变量
let currentLanguage = 'en'; // 默认英文

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    setupEventListeners();
    createParticleEffect();
    setupScrollEffects();
    initializeLanguage();
    initializeComparisonSliders();
    initializeLazyLoading();
    initializeVersionCarousel();
    setupStickyNavbar();
});

// 初始化动画效果
function initializeAnimations() {
    // 添加页面加载动画
    document.body.classList.add('loaded');
    
    // 设置交错动画延迟
    abstractCards.forEach((card, index) => {
        card.style.animationDelay = `${0.2 + index * 0.2}s`;
    });
    
    resultCards.forEach((card, index) => {
        card.style.animationDelay = `${0.1 + index * 0.2}s`;
    });
    
    resourceCards.forEach((card, index) => {
        card.style.animationDelay = `${0.2 + index * 0.2}s`;
    });
}

// 设置事件监听器
function setupEventListeners() {
    // 导航链接平滑滚动
    navLinks.forEach(link => {
        link.addEventListener('click', smoothScrollTo);
    });
    
    // CTA按钮事件
    const paperBtn = document.getElementById('paper-btn');
    const paperChineseBtn = document.getElementById('paper-chinese-btn');
    const arxivBtn = document.getElementById('arxiv-btn');
    const codeBtn = document.getElementById('code-btn');
    const hfBtn = document.getElementById('hf-btn');
    const modelBtn = document.getElementById('model-btn');
    
    if (paperBtn) {
        paperBtn.addEventListener('click', downloadEnglishPaper);
    }
    
    if (paperChineseBtn) {
        paperChineseBtn.addEventListener('click', downloadChinesePaper);
    }
    
    if (arxivBtn) {
        arxivBtn.addEventListener('click', showArxivAlert);
    }
    
    if (codeBtn) {
        codeBtn.addEventListener('click', showCodeAlert);
    }
    
    if (hfBtn) {
        hfBtn.addEventListener('click', openHuggingFace);
    }
    
    if (modelBtn) {
        modelBtn.addEventListener('click', openHuggingFaceModel);
    }
    
    // 结果卡片点击事件
    resultCards.forEach(card => {
        card.addEventListener('click', handleResultCardClick);
    });
    
    // 作者链接悬停效果
    authorLinks.forEach(link => {
        link.addEventListener('mouseenter', handleAuthorLinkHover);
        link.addEventListener('mouseleave', handleAuthorLinkLeave);
    });
    
    // 资源按钮事件
    document.querySelectorAll('.resource-btn').forEach(btn => {
        btn.addEventListener('click', handleResourceClick);
    });
    
    // 滚动指示器点击事件
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', scrollToAbstract);
    }
    
    // 键盘事件
    document.addEventListener('keydown', handleKeyPress);
    
    // 语言切换按钮事件
    langButtons.forEach(btn => {
        btn.addEventListener('click', handleLanguageSwitch);
    });
    
    // 复制BibTeX按钮事件
    const copyBibtexBtn = document.getElementById('copy-bibtex');
    if (copyBibtexBtn) {
        copyBibtexBtn.addEventListener('click', copyBibtexToClipboard);
    }
    
    // 回到顶部按钮事件
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', scrollToTop);
    }
}

// 平滑滚动功能
function smoothScrollTo(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
        const offsetTop = targetElement.offsetTop - 80; // 导航栏高度补偿
        
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
        
        // 添加激活状态
        navLinks.forEach(link => link.classList.remove('active'));
        this.classList.add('active');
    }
}

// 滚动到摘要部分
function scrollToAbstract() {
    const abstractSection = document.getElementById('abstract');
    if (abstractSection) {
        abstractSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// 回到顶部功能
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    
    // 显示通知
    const messages = {
        'en': '⬆️ Scrolled to top',
        'zh': '⬆️ 已回到顶部'
    };
    showNotification(messages[currentLanguage], 'success');
}

// 处理滚动事件
function setupStickyNavbar() {
    const navbar = document.querySelector('.navbar');
    const backToTopBtn = document.getElementById('back-to-top');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!navbar) return;

    let stickyPoint = navbar.offsetTop;

    function handleScroll() {
        const scrollY = window.scrollY;

        if (!navbar.classList.contains('sticky')) {
            stickyPoint = navbar.offsetTop;
        }
        
        if (window.pageYOffset >= stickyPoint) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }

        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100; //- 100 as offset
            if (scrollY >= sectionTop) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkHref = link.getAttribute('href');
            if (linkHref && linkHref.substring(1) === currentSectionId) {
                link.classList.add('active');
            }
        });

        if (scrollIndicator) {
            if (scrollY > 100) {
                scrollIndicator.style.opacity = '0';
            } else {
                scrollIndicator.style.opacity = '0.7';
            }
        }
        
        if (backToTopBtn) {
            if (scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        }
    }

    window.addEventListener('scroll', handleScroll);
}


// 这些函数已在文件末尾重新定义以支持多语言



// 这个函数已在文件末尾重新定义以支持多语言

// 卡片悬停效果


// 作者链接交互
function handleAuthorLinkHover() {
    this.style.transform = 'scale(1.05)';
    this.style.transition = 'all 0.3s ease';
}

function handleAuthorLinkLeave() {
    this.style.transform = '';
}

// 这个函数已在文件末尾重新定义以支持多语言

// 键盘事件处理
function handleKeyPress(e) {
    // 空格键滚动到下一部分
    if (e.key === ' ') {
        e.preventDefault();
        scrollToNext();
    }
}

// 滚动到下一部分
function scrollToNext() {
    const sections = ['#abstract', '#results', '#code'];
    const currentScroll = window.scrollY;
    
    for (let section of sections) {
        const element = document.querySelector(section);
        if (element && element.offsetTop > currentScroll + 100) {
            element.scrollIntoView({ behavior: 'smooth' });
            break;
        }
    }
}

// 创建粒子效果
function createParticleEffect() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    `;
    
    for (let i = 0; i < 30; i++) {
        createParticle(particleContainer);
    }
    
    document.body.appendChild(particleContainer);
}

// 创建单个粒子
function createParticle(container) {
    const particle = document.createElement('div');
    const size = Math.random() * 4 + 2;
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const duration = Math.random() * 20 + 10;
    
    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 50%;
        left: ${x}px;
        top: ${y}px;
        animation: particleFloat ${duration}s infinite linear;
    `;
    
    container.appendChild(particle);
    
    // 粒子动画
    const keyframes = `
        @keyframes particleFloat {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    
    if (!document.querySelector('#particle-keyframes')) {
        const style = document.createElement('style');
        style.id = 'particle-keyframes';
        style.textContent = keyframes;
        document.head.appendChild(style);
    }
}

// 导航栏滚动观察器
// 设置滚动效果
function setupScrollEffects() {
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    const targets = document.querySelectorAll('.scroll-target');
    targets.forEach(target => observer.observe(target));
}



// 通知系统
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 15px;
        padding: 1rem 1.5rem;
        z-index: 10000;
        transform: translateX(400px);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        max-width: 400px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
    `;
    
    // 设置通知内容样式
    const notificationContent = notification.querySelector('.notification-content');
    notificationContent.style.cssText = `
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    `;
    
    // 设置关闭按钮样式
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: rgba(255, 255, 255, 0.8);
        font-size: 1.1rem;
        cursor: pointer;
        padding: 0.3rem;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
        flex-shrink: 0;
    `;
    
    // 关闭按钮悬停效果
    closeBtn.addEventListener('mouseenter', () => {
        closeBtn.style.background = 'rgba(255, 255, 255, 0.2)';
        closeBtn.style.color = 'rgba(255, 255, 255, 1)';
        closeBtn.style.transform = 'scale(1.1)';
    });
    
    closeBtn.addEventListener('mouseleave', () => {
        closeBtn.style.background = 'none';
        closeBtn.style.color = 'rgba(255, 255, 255, 0.8)';
        closeBtn.style.transform = 'scale(1)';
    });
    
    if (type === 'success') {
        notification.style.background = 'rgba(76, 175, 80, 0.95)';
        notification.style.color = 'white';
    } else if (type === 'info') {
        notification.style.background = 'rgba(33, 150, 243, 0.95)';
        notification.style.color = 'white';
    }
    
    document.body.appendChild(notification);
    
    // 显示动画
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // 关闭按钮事件
    closeBtn.addEventListener('click', () => {
        closeNotification(notification);
    });
    
    // 自动关闭
    setTimeout(() => {
        closeNotification(notification);
    }, 5000);
}

// 关闭通知
function closeNotification(notification) {
    notification.style.transform = 'translateX(400px)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// 页面性能优化
function optimizePerformance() {
    // 延迟加载图片
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // 防抖滚动事件
    let scrollTimeout;
    const originalScrollHandler = handleScroll;
    handleScroll = function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(originalScrollHandler, 16); // 60fps
    };
}

// 初始化性能优化
document.addEventListener('DOMContentLoaded', optimizePerformance);

// 页面可见性变化处理
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // 页面不可见时暂停动画
        document.body.style.animationPlayState = 'paused';
    } else {
        // 页面可见时恢复动画
        document.body.style.animationPlayState = 'running';
    }
});

// 语言切换功能
function initializeLanguage() {
    // 检查本地存储中是否有语言偏好
    const savedLanguage = localStorage.getItem('preferred-language');
    if (savedLanguage) {
        currentLanguage = savedLanguage;
        // 只有当保存的语言不是默认英文时才更新内容
        if (savedLanguage !== 'en') {
            updateLanguageContent(currentLanguage);
        }
    }
    
    // 设置语言按钮状态
    updateLanguageButtons(currentLanguage);
}

function handleLanguageSwitch() {
    const targetLanguage = this.getAttribute('data-lang');
    
    if (targetLanguage !== currentLanguage) {
        currentLanguage = targetLanguage;
        
        // 保存语言偏好到本地存储
        localStorage.setItem('preferred-language', currentLanguage);
        
        // 更新内容和按钮状态
        updateLanguageContent(currentLanguage);
        updateLanguageButtons(currentLanguage);

        // Re-render MathJax formulas after language switch
        if (typeof MathJax !== 'undefined' && MathJax.typesetPromise) {
            MathJax.typesetPromise();
        }
        
        // 显示切换通知
        const messages = {
            'en': '🌍 Language switched to English',
            'zh': '🌍 语言已切换为中文'
        };
        showNotification(messages[currentLanguage], 'success');
    }
}

function updateLanguageContent(lang) {
    // 获取所有有多语言数据的元素
    const multiLangElements = document.querySelectorAll('[data-en][data-zh]');
    
    multiLangElements.forEach(element => {
        const content = element.getAttribute(`data-${lang}`);
        if (content) {
            // 直接替换内容，避免重复
            if (content.includes('<')) {
                element.innerHTML = content;
            } else {
                element.textContent = content;
            }
        }
    });
    
    // 更新HTML语言属性
    document.documentElement.lang = lang === 'en' ? 'en' : 'zh-CN';
}

function updateLanguageButtons(lang) {
    langButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });
}

// 下载英文版论文
function downloadEnglishPaper() {
    const fileName = 'DetectAnyLLM.pdf';
    const filePath = fileName;
    
    // 创建下载链接
    const link = document.createElement('a');
    link.href = filePath;
    link.download = fileName;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // 显示下载通知
    const messages = {
        'en': '📄 Downloading English paper...',
        'zh': '📄 正在下载英文版论文...'
    };
    showNotification(messages[currentLanguage], 'success');
}

// 下载中文版论文
function downloadChinesePaper() {
    const fileName = 'DetectAnyLLM_ZH.pdf';
    const filePath = fileName;
    
    // 创建下载链接
    const link = document.createElement('a');
    link.href = filePath;
    link.download = fileName;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // 显示下载通知
    const messages = {
        'en': '📄 Downloading Chinese paper...',
        'zh': '📄 正在下载中文版论文...'
    };
    showNotification(messages[currentLanguage], 'success');
}

function showArxivAlert() {
    // 跳转到Arxiv主页
    window.open('https://arxiv.org/abs/2509.14268', '_blank');
    
    // 显示跳转消息
    const messages = {
        'en': '📄 Opening Arxiv...',
        'zh': '📄 正在跳转到Arxiv...'
    };
    showNotification(messages[currentLanguage], 'success');
}

function showCodeAlert() {
    // 跳转到GitHub代码仓库
    window.open('https://github.com/fjc2005/DetectAnyLLM', '_blank');
    
    // 显示跳转消息
    const messages = {
        'en': '💻 Opening GitHub repository...',
        'zh': '💻 正在打开GitHub代码仓库...'
    };
    showNotification(messages[currentLanguage], 'success');
}

function openHuggingFace() {
    // 跳转到Hugging Face页面
    window.open('https://huggingface.co/spaces/JiachenFu/DetectAnyLLM', '_blank');
    
    // 显示跳转消息
    const messages = {
        'en': '🤗 Opening Hugging Face demo page...',
        'zh': '🤗 正在打开Hugging Face演示页面...'
    };
    showNotification(messages[currentLanguage], 'success');
}

function openHuggingFaceModel() {
    // 跳转到Hugging Face模型页面
    window.open('https://huggingface.co/JiachenFu/Qwen2-0.5B-detectanyllm-detector-en', '_blank');
    
    // 显示跳转消息
    const messages = {
        'en': '🤗 Opening Hugging Face model page...',
        'zh': '🤗 正在打开Hugging Face模型页面...'
    };
    showNotification(messages[currentLanguage], 'success');
}

// 更新结果卡片点击消息
function handleResultCardClick() {
    const resultType = this.getAttribute('data-result');
    const messages = {
        'en': {
            'indoor': '🏠 Indoor Depth Estimation: High-precision 3D perception in complex indoor environments',
            'outdoor': '🌳 Outdoor Depth Estimation: Adapts to various outdoor lighting and weather conditions',
            'night': '🌙 Night Depth Estimation: Stable performance under extremely low lighting conditions',
            'weather': '⛈️ Adverse Weather: Robust performance under extreme weather conditions like rain, snow, and fog'
        },
        'zh': {
            'indoor': '🏠 室内深度估计：在复杂室内环境中实现高精度3D感知',
            'outdoor': '🌳 户外深度估计：适应各种户外光照和天气条件',
            'night': '🌙 夜间深度估计：在极低光照条件下保持稳定性能',
            'weather': '⛈️ 恶劣天气：在雨雪雾等极端天气下的鲁棒性表现'
        }
    };
    
    const message = messages[currentLanguage][resultType] || 'Experimental result details';
    showNotification(message, 'success');
    
    // 添加点击动画
    this.style.transform = 'scale(0.95)';
    setTimeout(() => {
        this.style.transform = '';
    }, 150);
}

// 更新资源按钮点击消息
function handleResourceClick(e) {
    e.preventDefault();
    const btn = e.currentTarget;
    const resourceCard = btn.closest('.resource-card');
    const title = resourceCard.querySelector('h3').textContent;
    const link = resourceCard.querySelector('a') ? resourceCard.querySelector('a').href : null;

    const messages = {
        'GitHub Repository': {
            'en': 'Redirecting to GitHub...',
            'zh': '正在跳转到 GitHub...'
        },
        'Datasets': {
            'en': 'Opening dataset link...',
            'zh': '正在打开数据集链接...'
        },
        'Pre-trained Models': {
            'en': 'Opening model download link...',
            'zh': '正在打开模型下载链接...'
        },
        'GitHub 代码库': {
            'en': 'Redirecting to GitHub...',
            'zh': '正在跳转到 GitHub...'
        },
        '数据集': {
            'en': 'Opening dataset link...',
            'zh': '正在打开数据集链接...'
        },
        '预训练模型': {
            'en': 'Opening model download link...',
            'zh': '正在打开模型下载链接...'
        }
    };
    
    const message = messages[title] ? messages[title][currentLanguage] : 'Opening link...';
    showNotification(message, 'info');

    if (link) {
        setTimeout(() => {
            window.open(link, '_blank');
        }, 1000);
    } else {
        // Handle cases where there is no 'a' tag if necessary
        const defaultLinks = {
            'GitHub Repository': 'https://github.com/fjc2005/DetectAnyLLM',
            'Datasets': '#',
            'GitHub 代码库': 'https://github.com/fjc2005/DetectAnyLLM',
            '数据集': '#'
        };
        const defaultLink = defaultLinks[title] || '#';
        if (defaultLink !== '#') {
            setTimeout(() => {
                window.open(defaultLink, '_blank');
            }, 1000);
        } else {
            showNotification('Link not available.', 'error');
        }
    }
}

// 复制BibTeX到剪贴板
function copyBibtexToClipboard() {
    const bibtexText = document.getElementById('bibtex-text').textContent;
    const copyBtn = document.getElementById('copy-bibtex');
    const originalContent = copyBtn.innerHTML;

    navigator.clipboard.writeText(bibtexText).then(() => {
        const messages = {
            'en': '<i class="fas fa-check"></i> Copied!',
            'zh': '<i class="fas fa-check"></i> 已复制！'
        };
        copyBtn.innerHTML = messages[currentLanguage];
        copyBtn.classList.add('copied');
        
        setTimeout(() => {
            copyBtn.innerHTML = originalContent;
            copyBtn.classList.remove('copied');
        }, 2000);
        
        const notificationMessages = {
            'en': '📋 BibTeX citation copied to clipboard.',
            'zh': '📋 BibTeX 引用已复制到剪贴板。'
        };
        showNotification(notificationMessages[currentLanguage], 'success');
    }, (err) => {
        console.error('Failed to copy BibTeX: ', err);
        const notificationMessages = {
            'en': '❌ Failed to copy citation.',
            'zh': '❌ 复制引用失败。'
        };
        showNotification(notificationMessages[currentLanguage], 'error');
    });
}


// 初始化对比滑块
function initializeComparisonSliders() {
    const sliders = document.querySelectorAll('.comparison-slider');
    sliders.forEach(slider => {
        setupSliderInteraction(slider);
    });
    checkAndShowSliderHints(sliders);
}

// 设置滑块交互
function setupSliderInteraction(slider) {
    const afterImage = slider.querySelector('.after-image');
    const handle = slider.querySelector('.slider-handle');
    let isDragging = false;
    let sliderRect;

    function updateSliderRect() {
        sliderRect = slider.getBoundingClientRect();
    }

    function updateSlider(x) {
        if (!sliderRect) return;
        let percentage = ((x - sliderRect.left) / sliderRect.width) * 100;
        percentage = Math.max(0, Math.min(100, percentage));
        
        afterImage.style.clipPath = `polygon(${percentage}% 0, 100% 0, 100% 100%, ${percentage}% 100%)`;
        handle.style.left = `${percentage}%`;
        
        updateLabelsVisibility(percentage);
    }

    function updateLabelsVisibility(percentage) {
        const labelLeft = slider.querySelector('.label-left');
        const labelRight = slider.querySelector('.label-right');
        if (labelLeft && labelRight) {
            labelLeft.style.opacity = percentage > 15 ? 1 : 0;
            labelRight.style.opacity = percentage < 85 ? 1 : 0;
        }
    }

    function handleMouseEnter(e) {
        slider.classList.remove('show-hint');
    }

    function handleMouseMove(e) {
        if (!isDragging) return;
        requestAnimationFrame(() => updateSlider(e.clientX));
    }
    
    function handleMouseLeave() {
        isDragging = false;
    }
    
    function handleTouchStart(e) {
        isDragging = true;
        updateSliderRect();
        slider.classList.remove('show-hint');
    }
    
    function handleTouchMove(e) {
        if (!isDragging) return;
        const touch = e.touches[0];
        requestAnimationFrame(() => updateSlider(touch.clientX));
    }

    slider.addEventListener('mousedown', (e) => {
        isDragging = true;
        updateSliderRect();
        e.preventDefault();
    });
    
    document.addEventListener('mouseup', () => isDragging = false);
    slider.addEventListener('mouseenter', handleMouseEnter);
    slider.addEventListener('mousemove', handleMouseMove);
    slider.addEventListener('mouseleave', handleMouseLeave);
    slider.addEventListener('touchstart', handleTouchStart, { passive: true });
    slider.addEventListener('touchmove', handleTouchMove, { passive: true });
    slider.addEventListener('touchend', () => isDragging = false);

    window.addEventListener('resize', updateSliderRect);
    updateSliderRect();
    updateLabelsVisibility(50);
}

// 检查并显示滑块提示
function checkAndShowSliderHints(sliders) {
    const HINT_KEY = 'sliderHintShown';
    const hintShown = localStorage.getItem(HINT_KEY);
    
    if (!hintShown) {
        sliders.forEach(slider => {
            slider.classList.add('show-hint');
        });
        
        setTimeout(() => {
            localStorage.setItem(HINT_KEY, 'true');
            
            sliders.forEach(slider => {
                slider.classList.remove('show-hint');
            });
        }, 4000);
    }
}

function initializeLazyLoading() {
    const lazyImages = document.querySelectorAll('.lazy-load');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    if (img.complete) {
                        img.classList.add('loaded');
                        const placeholder = img.nextElementSibling;
                        if (placeholder && placeholder.classList.contains('image-placeholder')) {
                            placeholder.style.display = 'none';
                        }
                    } else {
                        img.addEventListener('load', function() {
                            this.classList.add('loaded');
                            const placeholder = this.nextElementSibling;
                            if (placeholder && placeholder.classList.contains('image-placeholder')) {
                                placeholder.style.display = 'none';
                            }
                        }, { once: true });
                    }
                    
                    observer.unobserve(img);
                }
            });
        }, { rootMargin: "0px 0px 100px 0px" });

        lazyImages.forEach(img => {
            observer.observe(img);
        });
    } else {
        lazyImages.forEach(img => {
            img.classList.add('loaded');
            const placeholder = img.nextElementSibling;
            if (placeholder && placeholder.classList.contains('image-placeholder')) {
                placeholder.style.display = 'none';
            }
        });
    }
}


// 预加载关键图片，例如Teaser图
function preloadCriticalImages() {
    const criticalImages = [
        'image/teaser.png'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// 初始化版本轮播控制器
function initializeVersionCarousel() {
    const carousel = document.querySelector('.preview-carousel');
    const carouselInner = document.querySelector('.carousel-inner');
    const versionTabs = document.querySelectorAll('.version-tab');
    const indicators = document.querySelectorAll('.indicator');
    const pages = document.querySelectorAll('.carousel-page');
    
    if (!carousel || !carouselInner) return;
    
    let currentVersion = 'v1';
    let isTransitioning = false;
    
    // 版本切换函数
    function switchToVersion(version) {
        if (isTransitioning || version === currentVersion) return;
        
        isTransitioning = true;
        const previousVersion = currentVersion;
        currentVersion = version;
        
        // 更新活跃状态
        updateActiveStates(version);
        
        // 切换轮播页面
        switchCarouselPage(version, previousVersion);
        
        // 重新初始化新页面的对比滑块
        setTimeout(() => {
            initializePageSliders(version);
            isTransitioning = false;
        }, 600);
        
        // 显示通知
        const messages = {
            'v1': {
                'en': '🔄 Switched to DepthAnything V1 comparison',
                'zh': '🔄 已切换到 DepthAnything V1 对比'
            },
            'v2': {
                'en': '🔄 Switched to DepthAnything V2 comparison', 
                'zh': '🔄 已切换到 DepthAnything V2 对比'
            },
            'pro': {
                'en': '🔄 Switched to DepthPro comparison',
                'zh': '🔄 已切换到 DepthPro 对比'
            }
        };
        showNotification(messages[version][currentLanguage], 'success');
    }
    
    // 更新活跃状态
    function updateActiveStates(version) {
        // 更新标签页状态
        versionTabs.forEach(tab => {
            tab.classList.toggle('active', tab.dataset.version === version);
        });
        
        // 更新指示器状态
        indicators.forEach(indicator => {
            indicator.classList.toggle('active', indicator.dataset.version === version);
        });
        
        // 更新页面状态
        pages.forEach(page => {
            page.classList.toggle('active', page.dataset.page === version);
        });
    }
    
    // 切换轮播页面
    function switchCarouselPage(version, previousVersion) {
        let offset = 0;
        if (version === 'v1') offset = 0;
        else if (version === 'v2') offset = -33.33;
        else if (version === 'pro') offset = -66.66;
        
        carouselInner.style.transform = `translateX(${offset}%)`;
        
        // 添加切换动画类
        carousel.classList.add('switching');
        
        setTimeout(() => {
            carousel.classList.remove('switching');
        }, 600);
    }
    
    // 初始化页面滑块
    function initializePageSliders(version) {
        const activePage = document.querySelector(`.carousel-page[data-page="${version}"]`);
        if (!activePage) return;
        
        const sliders = activePage.querySelectorAll('.comparison-slider');
        sliders.forEach(slider => {
            setupSliderInteraction(slider);
        });
        
        // 延迟加载图片
        const lazyImages = activePage.querySelectorAll('.lazy-load:not(.loaded)');
        lazyImages.forEach(img => {
            loadImage(img);
        });
    }
    
    // 绑定事件监听器
    versionTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            switchToVersion(tab.dataset.version);
        });
    });
    
    indicators.forEach(indicator => {
        indicator.addEventListener('click', () => {
            switchToVersion(indicator.dataset.version);
        });
    });
    
    // 键盘导航支持
    document.addEventListener('keydown', (e) => {
        if (e.target.closest('.preview-section')) {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                if (currentVersion === 'v2') switchToVersion('v1');
                else if (currentVersion === 'pro') switchToVersion('v2');
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                if (currentVersion === 'v1') switchToVersion('v2');
                else if (currentVersion === 'v2') switchToVersion('pro');
            }
        }
    });
    
    // 触摸滑动支持
    let startX = 0;
    let endX = 0;
    
    carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });
    
    carousel.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const threshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                // 向左滑动，切换到下一个版本
                if (currentVersion === 'v1') switchToVersion('v2');
                else if (currentVersion === 'v2') switchToVersion('pro');
            } else if (diff < 0) {
                // 向右滑动，切换到上一个版本
                if (currentVersion === 'v2') switchToVersion('v1');
                else if (currentVersion === 'pro') switchToVersion('v2');
            }
        }
    }
    
    // 初始化时加载V1页面的滑块
    initializePageSliders('v1');
    
    // 预加载V2和DepthPro页面的图片
    setTimeout(() => {
        const v2Images = document.querySelectorAll('.carousel-page[data-page="v2"] .lazy-load:not(.loaded)');
        v2Images.forEach(img => {
            loadImage(img);
        });
    }, 2000);
    
    setTimeout(() => {
        const proImages = document.querySelectorAll('.carousel-page[data-page="pro"] .lazy-load:not(.loaded)');
        proImages.forEach(img => {
            loadImage(img);
        });
    }, 4000);
}

// 导出主要函数（如果需要在其他地方使用）
window.PageInteractions = {
    showNotification,
    scrollToAbstract,
    scrollToTop,
    switchLanguage: handleLanguageSwitch,
    getCurrentLanguage: () => currentLanguage,
    copyBibtex: copyBibtexToClipboard,
    initializeComparisonSliders,
    initializeLazyLoading,
    preloadCriticalImages,
    initializeVersionCarousel
}; 