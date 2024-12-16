const DashboardController = {
    init() {
        this.newAutomationBtn = document.getElementById('newAutomationBtn');
        this.automationModal = document.getElementById('automationModal');
        this.cancelBtn = document.getElementById('cancelBtn');
        this.automationForm = document.getElementById('automationForm');
        this.automationList = document.getElementById('automationList');
        this.deleteConfirmModal = document.getElementById('deleteConfirmModal');
        this.cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
        this.confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
        this.currentDeletionTarget = null;

        this.bindEvents();
},

bindEvents() {
    // Bind all event listeners
    this.newAutomationBtn.addEventListener('click', () => this.openModal(this.automationModal));
    this.cancelBtn.addEventListener('click', () => this.closeModal(this.automationModal));
    this.cancelDeleteBtn.addEventListener('click', () => this.closeModal(this.deleteConfirmModal));
    
    // Use once: true to ensure the form submit handler only runs once per submission
    this.automationForm.addEventListener('submit', (e) => this.handleFormSubmit(e), { once: false });

    this.confirmDeleteBtn.addEventListener('click', () => this.handleDelete());

    // Modal background click handlers
    this.automationModal.addEventListener('click', (e) => {
        if (e.target === this.automationModal) this.closeModal(this.automationModal);
    });

    this.deleteConfirmModal.addEventListener('click', (e) => {
        if (e.target === this.deleteConfirmModal) this.closeModal(this.deleteConfirmModal);
    });
},

openModal(modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    modal.querySelector('.bg-white').classList.add('scale-100', 'opacity-100');
    modal.querySelector('.bg-white').classList.remove('scale-95', 'opacity-0');
},

closeModal(modal) {
    modal.querySelector('.bg-white').classList.add('scale-95', 'opacity-0');
    modal.querySelector('.bg-white').classList.remove('scale-100', 'opacity-100');
    setTimeout(() => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }, 300);
},

handleFormSubmit(e) {
    e.preventDefault();
    e.stopPropagation(); // Prevent event bubbling

    const websiteUrl = document.getElementById('websiteUrl').value;
    const automationType = document.getElementById('automationType').value;

    const automationItem = document.createElement('div');
    automationItem.className = 'bg-secondary rounded-xl p-6 shadow-md transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg';
    automationItem.innerHTML = `
        <div class="flex justify-between items-start mb-4">
            <div class="bg-primary bg-opacity-10 text-primary text-xs font-semibold px-3 py-1 rounded-full">
                ${automationType === 'scrape' ? 'Scraping' : 'Automating'}
            </div>
            <button class="text-gray-400 hover:text-red-600 transition duration-200 delete-btn">
                <i class="ri-delete-bin-line"></i>
            </button>
        </div>
        <h3 class="font-semibold text-lg mb-2 truncate" title="${websiteUrl}">${websiteUrl}</h3>
        <div class="flex items-center text-sm text-gray-600">
            <i class="ri-time-line mr-2"></i>
            <span>Created ${new Date().toLocaleDateString()}</span>
        </div>
    `;

    // Add delete functionality
    const deleteBtn = automationItem.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => {
        this.currentDeletionTarget = automationItem;
        this.openModal(this.deleteConfirmModal);
    });

    // Add to list
    this.automationList.appendChild(automationItem);
    automationItem.classList.add('scale-100', 'opacity-100');

    // Close modal and reset form
    this.closeModal(this.automationModal);
    this.automationForm.reset();
},

handleDelete() {
    if (this.currentDeletionTarget) {
        this.currentDeletionTarget.classList.add('scale-95', 'opacity-0');
        setTimeout(() => {
            this.currentDeletionTarget.remove();
            this.currentDeletionTarget = null;
        }, 300);
    }
    this.closeModal(this.deleteConfirmModal);
}
};

// Initialize the dashboard controller when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
DashboardController.init();
});