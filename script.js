// DOM 元素
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const backToTop = document.getElementById('back-to-top');
const audioPlayer = document.getElementById('audio-player');
const playBtn = document.getElementById('play-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const progress = document.getElementById('progress');
const currentTime = document.getElementById('current-time');
const duration = document.getElementById('duration');
const trackTitle = document.getElementById('track-title');
const trackArtist = document.getElementById('track-artist');
const contactForm = document.getElementById('contact-form');

// 全局变量
let currentTrack = 0;
let isPlaying = false;
let tracks = [
    {
        title: "Piano Solo Collection",
        artist: "Sirui Wang",
        src: "audio/track1.mp3"
    },
    {
        title: "String Quartet",
        artist: "String Quartet Ensemble",
        src: "audio/track2.mp3"
    },
    {
        title: "Symphony No. 1",
        artist: "Symphony Orchestra",
        src: "audio/track3.mp3"
    }
];

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeScrollEffects();
    initializeWorkFilters();
    initializeMusicPlayer();
    initializeEmailJS();
    initializeContactForm();
    initializeAnimations();
    initializePhotoGallery();
    fetchYouTubeTitle();
});

// 导航功能初始化
function initializeNavigation() {
    // 汉堡菜单切换
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // 移动端关闭菜单
                if (navMenu.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            }
        });
    });

    // 活跃导航链接高亮
    window.addEventListener('scroll', updateActiveNavLink);
}

// 滚动效果初始化
function initializeScrollEffects() {
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        
        // 导航栏滚动效果
        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // 返回顶部按钮显示/隐藏
        if (backToTop) {
            if (scrollTop > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }
    });

    // 返回顶部功能
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// 更新活跃导航链接
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        if (window.pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

// 作品筛选功能初始化
function initializeWorkFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const workItems = document.querySelectorAll('.work-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // 更新按钮状态
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            // 筛选作品项
            workItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // 作品播放按钮
    document.querySelectorAll('.play-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const audioId = btn.getAttribute('data-audio');
            // 这里可以添加音频播放逻辑
            showNotification('Playing audio...');
        });
    });
}

// 音乐播放器初始化
function initializeMusicPlayer() {
    // 检查音乐播放器元素是否存在
    if (!audioPlayer || !playBtn || !prevBtn || !nextBtn) {
        console.log('Music player elements not found, skipping music player initialization');
        return;
    }
    
    // 播放/暂停按钮
    playBtn.addEventListener('click', togglePlay);
    
    // 上一曲/下一曲
    prevBtn.addEventListener('click', previousTrack);
    nextBtn.addEventListener('click', nextTrack);
    
    // 进度条点击
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        progressBar.addEventListener('click', setProgress);
    }
    
    // 音频事件监听
    audioPlayer.addEventListener('timeupdate', updateProgress);
    audioPlayer.addEventListener('ended', nextTrack);
    audioPlayer.addEventListener('loadedmetadata', updateDuration);
    
    // 播放列表项点击
    document.querySelectorAll('.playlist-item').forEach((item, index) => {
        item.addEventListener('click', () => {
            currentTrack = index;
            loadTrack();
            if (isPlaying) {
                audioPlayer.play();
            }
        });
    });
    
    // 加载第一首曲目
    loadTrack();
}

// 播放/暂停切换
function togglePlay() {
    if (isPlaying) {
        audioPlayer.pause();
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
        isPlaying = false;
    } else {
        audioPlayer.play().then(() => {
            playBtn.innerHTML = '<i class="fas fa-pause"></i>';
            isPlaying = true;
        }).catch(error => {
            console.log('播放失败:', error);
            showNotification('Audio file not found, this is a demo version');
        });
    }
}

// 上一曲
function previousTrack() {
    currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
    loadTrack();
    if (isPlaying) {
        audioPlayer.play();
    }
}

// 下一曲
function nextTrack() {
    currentTrack = (currentTrack + 1) % tracks.length;
    loadTrack();
    if (isPlaying) {
        audioPlayer.play();
    }
}

// 加载曲目
function loadTrack() {
    const track = tracks[currentTrack];
    trackTitle.textContent = track.title;
    trackArtist.textContent = track.artist;
    audioPlayer.src = track.src;
    
    // 更新播放列表高亮
    document.querySelectorAll('.playlist-item').forEach((item, index) => {
        if (index === currentTrack) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// 设置进度
function setProgress(e) {
    const progressBar = e.currentTarget;
    const clickX = e.offsetX;
    const width = progressBar.offsetWidth;
    const duration = audioPlayer.duration;
    
    if (duration) {
        audioPlayer.currentTime = (clickX / width) * duration;
    }
}

// 更新进度
function updateProgress() {
    const current = audioPlayer.currentTime;
    const total = audioPlayer.duration;
    
    if (total) {
        const progressPercent = (current / total) * 100;
        progress.style.width = progressPercent + '%';
    }
    
    currentTime.textContent = formatTime(current);
}

// 更新总时长
function updateDuration() {
    duration.textContent = formatTime(audioPlayer.duration);
}

// 时间格式化
function formatTime(time) {
    if (isNaN(time)) return '0:00';
    
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}

// 初始化EmailJS
function initializeEmailJS() {
    // 初始化EmailJS (使用公共密钥)
    emailjs.init("YOUR_PUBLIC_KEY"); // 需要替换为实际的公共密钥
}

// 联系表单初始化
function initializeContactForm() {
    if (!contactForm) {
        console.log('Contact form not found, skipping contact form initialization');
        return;
    }
    
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // 简单验证
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // 显示发送中状态
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        try {
            // 使用EmailJS发送邮件
            const templateParams = {
                from_name: name,
                from_email: email,
                subject: subject,
                message: message,
                to_email: 'siruiw67@gmail.com' // 接收邮件的地址
            };
            
            // 发送邮件 (需要配置Service ID和Template ID)
            const response = await emailjs.send(
                'YOUR_SERVICE_ID',    // 需要替换为实际的服务ID
                'YOUR_TEMPLATE_ID',   // 需要替换为实际的模板ID
                templateParams
            );
            
            console.log('Email sent successfully:', response);
            showNotification('Message sent successfully! We will get back to you soon.', 'success');
            contactForm.reset();
            
        } catch (error) {
            console.error('Email sending failed:', error);
            
            // 如果EmailJS失败，提供备用方案 - mailto链接
            const mailtoLink = `mailto:siruiw67@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
                `From: ${name} (${email})\n\n${message}`
            )}`;
            
            showNotification('Opening your email client to send the message...', 'info');
            window.open(mailtoLink);
            contactForm.reset();
        } finally {
            // 恢复按钮状态
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

// 邮箱验证
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// 显示通知
function showNotification(message, type = 'info') {
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // 添加样式
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    document.body.appendChild(notification);
    
    // 显示动画
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // 自动隐藏
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// 初始化动画
function initializeAnimations() {
    // 创建交叉观察器用于滚动动画
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.1
    });

    // 观察需要动画的元素
    document.querySelectorAll('.work-item, .highlight-item, .playlist-item').forEach(el => {
        observer.observe(el);
    });
}

// 键盘快捷键
document.addEventListener('keydown', (e) => {
    // 空格键播放/暂停
    if (e.code === 'Space' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        togglePlay();
    }
    
    // 左右箭头键切换曲目
    if (e.code === 'ArrowLeft') {
        e.preventDefault();
        previousTrack();
    }
    
    if (e.code === 'ArrowRight') {
        e.preventDefault();
        nextTrack();
    }
});

// 页面可见性变化时暂停音频
document.addEventListener('visibilitychange', () => {
    if (document.hidden && isPlaying) {
        audioPlayer.pause();
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
        isPlaying = false;
    }
});

// 防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 节流函数
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// 优化滚动性能
const debouncedScroll = debounce(() => {
    updateActiveNavLink();
}, 10);

window.addEventListener('scroll', debouncedScroll);

// 响应式处理
function handleResize() {
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
}

window.addEventListener('resize', debounce(handleResize, 250));

// 错误处理
window.addEventListener('error', (e) => {
    console.error('Page error:', e.error);
});

// 音频错误处理
if (audioPlayer) {
    audioPlayer.addEventListener('error', (e) => {
        console.error('Audio loading error:', e);
        showNotification('Audio file loading failed', 'error');
    });
}

// 图片懒加载（如果有真实图片的话）
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
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

// 页面加载完成后执行懒加载
window.addEventListener('load', lazyLoadImages);

// 添加页面加载动画
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// 预加载关键资源
function preloadResources() {
    const criticalImages = [
        // 在这里添加需要预加载的图片路径
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// 开始预加载
preloadResources();

// 照片轮播变量
let currentSlideIndex = 0;
let photoSlides = [];
let autoSlideInterval = null;

// 照片画廊初始化
function initializePhotoGallery() {
    // 在函数内部获取元素，确保DOM已经加载完成
    photoSlides = document.querySelectorAll('.slide');
    console.log('Found slides:', photoSlides.length); // 调试信息
    
    if (photoSlides.length > 0) {
        // 启动自动播放
        startAutoSlide();
        
        // 添加点击切换功能
        const slideshowContainer = document.querySelector('.slideshow-container');
        if (slideshowContainer) {
            slideshowContainer.addEventListener('click', () => {
                changePhotoSlide();
                resetAutoSlide(); // 重新开始计时
                console.log('Manual slide change triggered by click - timer reset');
            });
            
            // 初始化第一张图片的容器尺寸
            const firstImg = photoSlides[0]?.querySelector('img');
            if (firstImg) {
                if (firstImg.complete) {
                    adjustContainerSize(firstImg, slideshowContainer);
                } else {
                    firstImg.onload = () => adjustContainerSize(firstImg, slideshowContainer);
                }
            }
        }
        
        // 立即执行一次切换，确保功能正常
        setTimeout(() => {
            changePhotoSlide();
        }, 1000);
    } else {
        console.log('No slides found!'); // 调试信息
    }
}

// 启动自动播放
function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        changePhotoSlide();
        console.log('Auto slide change');
    }, 6000);
}

// 重置自动播放计时器
function resetAutoSlide() {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
    }
    startAutoSlide();
}

// 切换照片幻灯片
function changePhotoSlide() {
    console.log('Changing slide from', currentSlideIndex); // 调试信息
    
    // 移除当前活跃状态
    if (photoSlides[currentSlideIndex]) {
        photoSlides[currentSlideIndex].classList.remove('active');
    }
    
    // 计算新的索引
    currentSlideIndex = (currentSlideIndex + 1) % photoSlides.length;
    
    // 添加新的活跃状态
    if (photoSlides[currentSlideIndex]) {
        photoSlides[currentSlideIndex].classList.add('active');
        
        // 动态调整容器尺寸
        const activeImg = photoSlides[currentSlideIndex].querySelector('img');
        const container = document.querySelector('.slideshow-container');
        
        if (activeImg && container) {
            // 等待图片加载完成后调整容器尺寸
            if (activeImg.complete) {
                adjustContainerSize(activeImg, container);
            } else {
                activeImg.onload = () => adjustContainerSize(activeImg, container);
            }
        }
    }
    
    console.log('Changed to slide', currentSlideIndex); // 调试信息
}

function adjustContainerSize(img, container) {
    // 设置容器尺寸为图片的自然尺寸（但不超过最大宽度）
    const maxWidth = Math.min(img.naturalWidth, 500); // 最大宽度500px
    const aspectRatio = img.naturalHeight / img.naturalWidth;
    const height = maxWidth * aspectRatio;
    
    container.style.width = maxWidth + 'px';
    container.style.height = height + 'px';
}

// 获取YouTube视频标题
async function fetchYouTubeTitle() {
    // 所有视频的ID数组
    const videoIds = [
        'y4wZw7rsjjw',  // 第1个视频
        '5qV_UcvyZmU',  // 第2个视频
        'Vlh8_vNmNQw',  // 第3个视频
        'PhM9uuDyMOI',  // 第4个视频
        'EGTLbJZlAws',  // 第5个视频
        'FZtKu7IVd3M'   // 第6个视频
    ];
    
    // 视频ID对应的索引 (第1,2,3,4,5,6个视频分别对应的videoIds索引)
    const videoMapping = [0, 1, 2, 3, 4, 5]; // 每个视频都有独特的ID
    
    const videoTitles = document.querySelectorAll('.video-info h4');
    
    // 为每个视频获取标题
    for (let i = 0; i < videoTitles.length; i++) {
        const videoIdIndex = videoMapping[i];
        const videoId = videoIds[videoIdIndex];
        
        try {
            // 使用YouTube oEmbed API获取视频信息
            const response = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`);
            const data = await response.json();
            
            if (data && data.title) {
                videoTitles[i].textContent = data.title;
                console.log(`Video ${i+1} title updated:`, data.title);
            }
        } catch (error) {
            console.log(`Failed to fetch title for video ${i+1}, using fallback`);
            videoTitles[i].textContent = 'Piano Performance Video';
        }
    }
}
