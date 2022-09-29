import {ItemActor, TodoItem, TodoItemContainer} from "./itemModels";
import {renderEditModal, renderItems, renderModalCategory} from "./pageService";
import {CategoryType} from "./constants";
import {LocalStorageAdapter} from "./DataStorage";

function handleClickHideModal(event) {
    if (event.target.classList && event.target.classList.contains('modal-close-btn')) {
        let selector = event.target.dataset['target'];
        document.querySelector(`#${selector}`).classList.add('modal-hidden');
    }
}

function handleClickOpenModalEdit(event) {
    if (event.target.classList && event.target.classList.contains('modal-open-btn')) {
        let selector = event.target.dataset['target'];
        let id = event.target.dataset['id'];
        renderEditModal(TodoItemContainer.INSTANCE.findItem(id));
        document.querySelector(`#${selector}`).classList.remove('modal-hidden');
    }
}

function handleInputSearch() {
    let search = document.querySelector('#search');
    let string = search.value;
    renderItems(document.querySelector('.bar-holder'), TodoItemContainer.INSTANCE.getFilteredItems(string))
}

function handleClickOpenStatusList(event) {

    if (event.target.classList && event.target.classList.contains('--open-status-list')) {

        if (!document.querySelector('.modal__change-status').classList.contains('status-list--show')) {

            setTimeout(function () {
                document.querySelector('.modal__change-status').classList.add('status-list--show')
            }, 5);
        }
    }
}

function handleClickCloseStatusList(event) {
    if (event.target.classList && !event.target.classList.contains('modal__change-status')) {
        if (document.querySelector('.modal__change-status') && document.querySelector('.modal__change-status').classList.contains('status-list--show')) {
            document.querySelector('.modal__change-status').classList.remove('status-list--show')
        }
    }
}

function handleClickChangeCategory(event) {
    if (event.target.classList && event.target.classList.contains('change-status__item__content')) {
        let newCategoryId = event.target.dataset['target'];
        let itemId = document.querySelector('.modal-body__form input').value;
        let item = TodoItemContainer.INSTANCE.findItem(itemId);
        ItemActor.INSTANCE.changeItemCategory(itemId, newCategoryId);
        renderModalCategory(event.target.dataset['target']);
        if (item.title || item.description) {
            renderItems(document.querySelector('.bar-holder'), TodoItemContainer.INSTANCE);
        }
    }
}

function handleClickItemEdit(event) {
    if (event.target.id === 'editSaveButton') {
        let form = document.querySelector('#editForm');
        let id = form.querySelector('#editItemId').value;
        let title = form.querySelector('#editTaskTitle').value;
        let description = form.querySelector('#editTaskDescription').value;

        ItemActor.INSTANCE.changeItemTitle(id, title);
        ItemActor.INSTANCE.changeItemDescription(id, description);
        renderItems(document.querySelector('.bar-holder'), TodoItemContainer.INSTANCE);

        document.querySelector(`#editItemModal`).classList.add('modal-hidden');
    }
}

function handleClickNewItem(event) {
    if (event.target.classList && event.target.classList.contains('card-item__new')) {

        let category = CategoryType.getStatusById(event.target.dataset['target']);
        let item = new TodoItem()
            .setCategory(category);

        ItemActor.INSTANCE.addItem(item);

        renderEditModal(item);

        document.querySelector(`#editItemModal`).classList.remove('modal-hidden');
    }
}

function handleClickRemoveItem(event) {
    if (event.target.classList && event.target.classList.contains('--remove-item')){
        ItemActor.INSTANCE.removeItem(event.target.dataset['id']);
        renderItems(document.querySelector('.bar-holder'), TodoItemContainer.INSTANCE);
    }
}

function handleBeforeWindowClose(){
    LocalStorageAdapter.saveItems(TodoItemContainer.INSTANCE.itemMap);
    LocalStorageAdapter.saveCategories(CategoryType);
}


export {
    handleClickHideModal,
    handleClickOpenModalEdit,
    handleInputSearch,
    handleClickCloseStatusList,
    handleClickOpenStatusList,
    handleClickChangeCategory,
    handleClickItemEdit,
    handleClickNewItem,
    handleClickRemoveItem,
    handleBeforeWindowClose
}