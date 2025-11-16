// ============================================
// CONFIGURATION - LANGFLOW EMBED CONFIGURED
// ============================================

const LANGFLOW_CONFIG = {
    // Langflow Widget Configuration
    widgetScriptUrl: 'https://cdn.jsdelivr.net/gh/logspace-ai/langflow-embedded-chat@v1.0.7/dist/build/static/js/bundle.min.js',
    windowTitle: 'StudyBot',
    flowId: '',
    hostUrl: '',
    chatPosition: 'center'
};

// ============================================
// EMBED LANGFLOW WIDGET
// ============================================

function embedLangflowWidget() {
    const chatContainer = document.getElementById('langflow-chat');
    
    showLoading();
    
    // Load the Langflow widget script
    const script = document.createElement('script');
    script.src = LANGFLOW_CONFIG.widgetScriptUrl;
    script.type = 'text/javascript';
    
    script.onload = () => {
        console.log('✅ Langflow widget script loaded successfully');
        
        // Create the langflow-chat element
        const langflowChat = document.createElement('langflow-chat');
        langflowChat.setAttribute('window_title', LANGFLOW_CONFIG.windowTitle);
        langflowChat.setAttribute('flow_id', LANGFLOW_CONFIG.flowId);
        langflowChat.setAttribute('host_url', LANGFLOW_CONFIG.hostUrl);
        langflowChat.setAttribute('chat_position', LANGFLOW_CONFIG.chatPosition);
        
        // Style the widget to fit perfectly
        langflowChat.style.width = '100%';
        langflowChat.style.height = '100%';
        langflowChat.style.position = 'relative';
        
        chatContainer.innerHTML = '';
        chatContainer.appendChild(langflowChat);
        
        // Hide loading after a short delay to ensure widget renders
        setTimeout(() => {
            hideLoading();
            console.log('✅ StudyBot is ready!');
        }, 1000);
    };
    
    script.onerror = () => {
        console.error('❌ Failed to load Langflow widget script');
        showError('Failed to load Langflow widget. Please ensure Langflow is running on http://localhost:7860');
    };
    
    document.head.appendChild(script);
}

// ============================================
// UI HELPER FUNCTIONS
// ============================================

function showLoading() {
    const chatContainer = document.getElementById('langflow-chat');
    chatContainer.innerHTML = `
        <div class="loading-container">
            <div class="loading-spinner"></div>
            <div class="loading-text">Loading StudyBot...</div>
        </div>
    `;
}

function hideLoading() {
    const loadingContainer = document.querySelector('.loading-container');
    if (loadingContainer) {
        loadingContainer.remove();
    }
}

function showError(message) {
    const chatContainer = document.getElementById('langflow-chat');
    chatContainer.innerHTML = `
        <div class="error-container">
            <div class="error-icon">⚠️</div>
            <div class="error-title">Connection Issue</div>
            <div class="error-message">${message}</div>
            <div style="margin-top: 20px; padding: 15px; background: #f0f0f0; border-radius: 8px; text-align: left; max-width: 500px;">
                <strong>Quick Fix:</strong><br>
                1. Make sure Langflow is running<br>
                2. Start Langflow: <code>langflow run</code><br>
                3. Verify it's on: <a href="http://localhost:7860" target="_blank">http://localhost:7860</a><br>
                4. Click retry below
            </div>
            <button class="retry-button" onclick="initializeLangflow()">Retry Connection</button>
        </div>
    `;
}

// ============================================
// INITIALIZATION
// ============================================

function initializeLangflow() {
    console.log('🚀 Initializing StudyBot with Langflow...');
    console.log('📍 Flow ID:', LANGFLOW_CONFIG.flowId);
    console.log('🌐 Host URL:', LANGFLOW_CONFIG.hostUrl);
    
    embedLangflowWidget();
}

// ============================================
// AUTO-INITIALIZE ON PAGE LOAD
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('📚 StudyBot - AI Learning Assistant');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    initializeLangflow();
});

// ============================================
// DEBUGGING HELPERS
// ============================================

window.checkLangflowConfig = function() {
    console.log('═══════════════════════════════════');
    console.log('📋 Langflow Configuration Check');
    console.log('═══════════════════════════════════');
    console.log('Widget Script:', LANGFLOW_CONFIG.widgetScriptUrl);
    console.log('Flow ID:', LANGFLOW_CONFIG.flowId);
    console.log('Host URL:', LANGFLOW_CONFIG.hostUrl);
    console.log('Window Title:', LANGFLOW_CONFIG.windowTitle);
    console.log('═══════════════════════════════════');
    
    // Check if Langflow is accessible
    fetch(LANGFLOW_CONFIG.hostUrl)
        .then(() => {
            console.log('✅ Langflow server is accessible');
        })
        .catch(() => {
            console.error('❌ Cannot reach Langflow server at', LANGFLOW_CONFIG.hostUrl);
            console.log('💡 Make sure Langflow is running: langflow run');
        });
};

// Check if langflow-chat custom element is defined
window.checkLangflowWidget = function() {
    if (customElements.get('langflow-chat')) {
        console.log('✅ Langflow widget is loaded');
    } else {
        console.log('⏳ Langflow widget not loaded yet');
    }
};

// Run config check
setTimeout(() => {
    window.checkLangflowConfig();
}, 1000);