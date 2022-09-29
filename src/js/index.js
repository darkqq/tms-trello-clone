import {
    handleBeforeWindowClose,
    handleClickChangeCategory,
    handleClickCloseStatusList,
    handleClickHideModal, handleClickItemEdit, handleClickNewItem,
    handleClickOpenModalEdit,
    handleClickOpenStatusList, handleClickRemoveItem,
    handleInputSearch
} from "./modules/handlers";
import {ItemActor, TodoItem, TodoItemContainer} from "./modules/itemModels";
import {CategoryType} from "./modules/constants";
import {renderItems} from "./modules/pageService";
import {LocalStorageAdapter} from "./modules/DataStorage";

let todoItemContainer = new TodoItemContainer(LocalStorageAdapter.getCategoriesList());
todoItemContainer.setItemMap(LocalStorageAdapter.loadItems());

new ItemActor(todoItemContainer);

const root = document.querySelector('.bar-holder');
const search = document.querySelector('#search');

renderItems(root, todoItemContainer);

search.addEventListener('input', handleInputSearch);

window.addEventListener('beforeunload', handleBeforeWindowClose);

document.body.addEventListener('click', handleClickHideModal);

document.body.addEventListener('click', handleClickOpenModalEdit)

document.body.addEventListener('click', handleClickChangeCategory)

document.body.addEventListener("click", handleClickOpenStatusList);

document.body.addEventListener('click', handleClickCloseStatusList);

document.body.addEventListener('click', handleClickItemEdit);

document.body.addEventListener('click', handleClickNewItem);

document.body.addEventListener('click', handleClickRemoveItem);


