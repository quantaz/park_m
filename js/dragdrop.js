// 拖拽功能核心实现
document.addEventListener('DOMContentLoaded', function() {
    initializeDragDropFeatures();
});

function initializeDragDropFeatures() {
    // 检查当前页面是否是项目配置器
    const isProjectConfigurator = document.querySelector('#dropZone');
    if (!isProjectConfigurator) return;
    
    const resourceItems = document.querySelectorAll('.resource-item');
    const dropZone = document.getElementById('dropZone');
    const emptyDropZone = document.getElementById('emptyDropZone');
    const addedResources = document.getElementById('addedResources');
    
    // 初始化拖拽事件
    resourceItems.forEach(item => {
        item.setAttribute('draggable', 'true');
        
        item.addEventListener('dragstart', function(e) {
            this.classList.add('dragging');
            e.dataTransfer.setData('text/plain', this.dataset.id);
        });
        
        item.addEventListener('dragend', function() {
            this.classList.remove('dragging');
        });
    });
    
    // 初始化放置区
    if (dropZone) {
        dropZone.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.classList.add('active');
        });
        
        dropZone.addEventListener('dragleave', function() {
            this.classList.remove('active');
        });
        
        dropZone.addEventListener('drop', function(e) {
            e.preventDefault();
            this.classList.remove('active');
            
            const resourceId = e.dataTransfer.getData('text/plain');
            processDroppedResource(resourceId, emptyDropZone, addedResources);
        });
    }
}

function processDroppedResource(resourceId, emptyDropZone, addedResources) {
    const draggedItem = document.querySelector(`[data-id="${resourceId}"]`);
    
    if (draggedItem) {
        // 显示已添加资源区
        emptyDropZone.classList.add('hidden');
        addedResources.classList.remove('hidden');
        
        // 获取资源信息
        const resourceType = draggedItem.dataset.type;
        const resourceName = draggedItem.querySelector('h3').textContent;
        
        // 根据资源类型选择不同的图标和颜色
        let iconClass = getIconByResourceType(resourceType);
        let colorClass = getColorByResourceType(resourceType);
        
        // 创建资源项
        addResourceItem(resourceName, resourceType, iconClass, colorClass, addedResources, emptyDropZone);
    }
}

function getIconByResourceType(resourceType) {
    // 根据资源类型返回对应图标
    switch(resourceType) {
        case '厂房': return 'fas fa-building';
        case '库房': return 'fas fa-warehouse';
        case '办公楼': return 'fas fa-building';
        case '停车场': return 'fas fa-parking';
        case '供电设施': return 'fas fa-bolt';
        case '人力资源': return 'fas fa-user-shield';
        case '管网设施': return 'fas fa-water';
        case '宿舍楼': return 'fas fa-home';
        default: return 'fas fa-cube';
    }
}

function getColorByResourceType(resourceType) {
    // 根据资源类型返回对应颜色类
    switch(resourceType) {
        case '厂房': return 'bg-blue-100 text-blue-600';
        case '库房': return 'bg-amber-100 text-amber-600';
        case '办公楼': return 'bg-emerald-100 text-emerald-600';
        case '停车场': return 'bg-gray-100 text-gray-600';
        case '供电设施': return 'bg-yellow-100 text-yellow-600';
        case '人力资源': return 'bg-purple-100 text-purple-600';
        case '管网设施': return 'bg-blue-100 text-blue-600';
        case '宿舍楼': return 'bg-indigo-100 text-indigo-600';
        default: return 'bg-gray-100 text-gray-600';
    }
}

function addResourceItem(resourceName, resourceType, iconClass, colorClass, addedResources, emptyDropZone) {
    const newItem = document.createElement('div');
    newItem.className = 'p-3 border rounded-lg flex items-center bg-blue-50 border-blue-200';
    newItem.innerHTML = `
        <div class="w-8 h-8 ${colorClass} rounded-full flex items-center justify-center mr-2">
            <i class="${iconClass}"></i>
        </div>
        <div class="flex-1">
            <h3 class="font-medium text-gray-800">${resourceName}</h3>
            <span class="text-xs text-gray-500">${resourceType}</span>
        </div>
        <button class="text-red-500 hover:text-red-700 remove-resource">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    addedResources.appendChild(newItem);
    
    // 添加移除事件
    newItem.querySelector('.remove-resource').addEventListener('click', function() {
        newItem.remove();
        if (addedResources.children.length === 0) {
            emptyDropZone.classList.remove('hidden');
            addedResources.classList.add('hidden');
        }
    });
}