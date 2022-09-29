import {TemplateBuilder} from "./TemplateBuilder";
import {CategoryType} from "./constants";

function renderItems(rootElement, itemContainer) {
    rootElement.innerHTML = '';

    itemContainer.getItemsMap().forEach(((value, key) => {
        rootElement.innerHTML += TemplateBuilder.buildItemBar(value, CategoryType.getStatusById(key));
    }))
}

function renderEditModal(item) {
    document.querySelector('#editItemModal').innerHTML = TemplateBuilder.buildEditItemModal(CategoryType.values(), item);
}

function renderModalCategory(categoryId) {
    document.querySelector('.modal__current-status-wrapper').innerHTML = TemplateBuilder.buildModalStatus(CategoryType.values(), categoryId);
}

export {renderItems, renderEditModal, renderModalCategory};