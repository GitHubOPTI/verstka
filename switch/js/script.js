class ItcTabs {
    constructor(target, config) {
        const defaultConfig = {};
        this._config = Object.assign(defaultConfig, config);
        this._elTabs = typeof target === 'string' ? document.querySelector(target) : target;
        this._elButtons = this._elTabs.querySelectorAll('.stage-item-text');
        this._elPanes = this._elTabs.querySelectorAll('.stage-caption-item');
        this._eventShow = new Event('tab.itc.change');
        this._init();
        this._events();
    }
    _init() {
        this._elTabs.setAttribute('role', 'tablist');
        this._elButtons.forEach((el, index) => {
            el.dataset.index = index;
            el.setAttribute('role', 'tab');
            this._elPanes[index].setAttribute('role', 'tabpanel');
        });
    }
    show(elLinkTarget) {
        const elPaneTarget = this._elPanes[elLinkTarget.dataset.index];
        const elLinkActive = this._elTabs.querySelector('.stage-item-active');
        const elPaneShow = this._elTabs.querySelector('.active-in');
        if (elLinkTarget === elLinkActive) {
            return;
        }
        elLinkActive ? elLinkActive.classList.remove('stage-item-active') : null;
        elPaneShow ? elPaneShow.classList.remove('active-in') : null;
        elLinkTarget.classList.add('stage-item-active');
        elPaneTarget.classList.add('active-in');
        this._elTabs.dispatchEvent(this._eventShow);
        elLinkTarget.focus();
    }
    showByIndex(index) {
        const elLinkTarget = this._elButtons[index];
        elLinkTarget ? this.show(elLinkTarget) : null;
    };
    _events() {
        this._elTabs.addEventListener('click', (e) => {
            const target = e.target.closest('.stage-item-text');
            if (target) {
                e.preventDefault();
                this.show(target);
            }
        });
    }
}

// инициализация .tabs как табов
new ItcTabs('.stages-flex-container');