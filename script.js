// Current Date and Time
function updateDateTime() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    document.getElementById('datetime').textContent = now.toLocaleDateString('en-US', options);
}

// Breaking News Ticker
function updateBreakingNews() {
    const breakingNews = [
        "Major earthquake hits coastal region - Rescue operations underway",
        "Stock markets reach all-time high amid economic recovery",
        "Breaking: Peace treaty signed between conflicting nations",
        "Tech giant unveils revolutionary new product line",
        "Health officials announce breakthrough in vaccine research"
    ];
    
    const randomNews = breakingNews[Math.floor(Math.random() * breakingNews.length)];
    document.getElementById('breakingNewsContent').textContent = randomNews;
}

// Mobile Menu Toggle
function setupMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const mainMenu = document.querySelector('.main-menu');
    
    menuBtn.addEventListener('click', () => {
        mainMenu.classList.toggle('active');
    });
}

// Newsletter Form Submission
function setupNewsletter() {
    const form = document.getElementById('newsletterForm');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = form.querySelector('input').value;
        alert(`Thank you for subscribing with ${email}! You'll receive our daily newsletter.`);
        form.reset();
    });
}

// Load News Data
function loadNewsData() {
    // Featured Story
    const featured = newsData.find(item => item.featured);
    if (featured) {
        document.getElementById('featuredTitle').textContent = featured.title;
        document.getElementById('featuredExcerpt').textContent = featured.excerpt;
        document.querySelector('.featured-image img').src = featured.image;
        document.querySelector('.featured-image img').alt = featured.title;
        document.querySelector('.category-label').className = `category-label ${featured.category}`;
        document.querySelector('.featured-content .read-more').href = `article.html?id=${featured.id}`;
        document.querySelector('.featured-content .meta span:first-child').innerHTML = `<i class="far fa-user"></i> ${featured.author}`;
    }
    
    // News Grid
    const gridContainer = document.getElementById('newsGrid');
    const nonFeaturedNews = newsData.filter(item => !item.featured).slice(0, 6);
    
    nonFeaturedNews.forEach(news => {
        const newsCard = document.createElement('div');
        newsCard.className = 'news-card';
        newsCard.innerHTML = `
            <img src="${news.image}" alt="${news.title}">
            <div class="news-content">
                <div class="category-label ${news.category}">${news.category.charAt(0).toUpperCase() + news.category.slice(1)}</div>
                <h3>${news.title}</h3>
                <p>${news.excerpt}</p>
                <div class="meta">
                    <span><i class="far fa-user"></i> ${news.author}</span>
                    <span><i class="far fa-clock"></i> ${news.time}</span>
                </div>
                <a href="article.html?id=${news.id}" class="read-more">Read More <i class="fas fa-arrow-right"></i></a>
            </div>
        `;
        gridContainer.appendChild(newsCard);
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    updateDateTime();
    updateBreakingNews();
    setupMobileMenu();
    setupNewsletter();
    loadNewsData();
    
    // Update time every minute
    setInterval(updateDateTime, 60000);
});