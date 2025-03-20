document.addEventListener('DOMContentLoaded', function() {
    // 初始化通用功能
    initializeCommonFeatures();
});

function initializeCommonFeatures() {
    // 处理导航菜单的切换
    const menuItems = document.querySelectorAll('.sidebar a');
    if (menuItems.length > 0) {
        menuItems.forEach(item => {
            item.addEventListener('click', function(e) {
                menuItems.forEach(i => i.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }
    
    // 初始化AI助手按钮
    const aiAssistantBtn = document.querySelector('button:has(.fa-robot)');
    if (aiAssistantBtn) {
        aiAssistantBtn.addEventListener('click', function() {
            openAIAssistant();
        });
    }
}

function openAIAssistant() {
    // 显示AI助手对话框
    alert('AI助手正在加载中...');
    
    // 这里可以集成实际的AI接口
    // 实际项目中应该替换为真实的AI服务调用
    setTimeout(() => {
        const assistantDialog = document.createElement('div');
        assistantDialog.className = 'fixed bottom-4 right-4 w-80 bg-white rounded-xl shadow-lg overflow-hidden';
        assistantDialog.innerHTML = `
            <div class="bg-indigo-600 text-white px-4 py-3 flex justify-between">
                <h3 class="font-medium flex items-center"><i class="fas fa-robot mr-2"></i> AI助手</h3>
                <button id="closeAssistant" class="text-white hover:text-gray-200"><i class="fas fa-times"></i></button>
            </div>
            <div class="p-4 h-80 overflow-y-auto">
                <div class="mb-4">
                    <div class="bg-indigo-100 text-indigo-800 p-3 rounded-lg mb-2 max-w-[80%]">
                        您好，我是您的AI助手。有什么可以帮助您的吗？
                    </div>
                </div>
                <div class="flex justify-end mb-4">
                    <div class="bg-gray-200 p-3 rounded-lg mb-2 max-w-[80%]">
                        如何创建新项目？
                    </div>
                </div>
                <div class="mb-4">
                    <div class="bg-indigo-100 text-indigo-800 p-3 rounded-lg mb-2 max-w-[80%]">
                        您可以点击"项目配置器"页面上的"保存项目"按钮来创建新项目。在此之前，您需要添加项目名称并通过拖拽方式添加资源。
                    </div>
                </div>
            </div>
            <div class="p-3 border-t flex">
                <input type="text" class="flex-1 border rounded-lg px-3 py-2 mr-2" placeholder="输入问题...">
                <button class="bg-indigo-600 text-white px-4 py-2 rounded-lg"><i class="fas fa-paper-plane"></i></button>
            </div>
        `;
        document.body.appendChild(assistantDialog);
        
        document.getElementById('closeAssistant').addEventListener('click', function() {
            document.body.removeChild(assistantDialog);
        });
    }, 1000);
}