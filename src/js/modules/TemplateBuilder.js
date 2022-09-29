import {CategoryType} from "./constants";
import {ItemActor} from "./itemModels";

class TemplateBuilder {

    static buildItemBar(todoItemList, {id, color, name}) {
        let newCardItem = this.buildCardHolderNewCard(id);
        let categoryHeader = this.buildCardHolderHeader(name);
        let formattedItems = [...todoItemList].map(item => this.buildItem(item, color)).join('\n');


        return `<div class="card-item-holder">
                    ${categoryHeader}
                    ${formattedItems}
                    ${newCardItem}
                </div>`;
    }

    static buildItem(item, categoryColor) {
        let image = item.image ? `<img src="${item.image}" alt="image_${item.id}">` : "";

        return `<div class="card-item" draggable="true">
                    <div class="card-item-head" style="background: ${categoryColor}"></div>
                    <div class="card-item-body">
                            ${image}
                            <div class="card-item-body__text">
                                <p class="card-body-header">${item.title}</p>
                                <p class="card-body-description">${item.description}</p>
                            </div>
                            <div class="card-item-actions">
            
                                <a class="card-item__button-edit modal-open-btn" data-target="editItemModal" data-id="${item.id}">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                                         class="bi bi-pencil modal-open-btn" data-target="editItemModal" data-id="${item.id}" viewBox="0 0 24 24">
                                        <path data-target="editItemModal" data-id="${item.id}"
                                            d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                                    </svg>
                                </a>
            
                                <a class="card-item__button-remove --remove-item" data-id="${item.id}">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                                         class="bi bi-trash3 --remove-item" data-id="${item.id}" viewBox="0 0 24 24">
                                        <path class="--remove-item" data-id="${item.id}"
                                            d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                                    </svg>
                                </a>
                            </div>
                    </div>
                </div>`
    }

    static buildCardHolderNewCard(categoryId) {
        return `<div class="card-item__new" data-target="${categoryId}">
                    <p style="z-index: -5">+ Add new card</p>
                </div>`
    }

    static buildCardHolderHeader(categoryName) {
        return `<div class="card-item-holder__header">
                    <p>${categoryName}</p>
                    <svg width="24" height="6" viewBox="0 0 24 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                              d="M3 6C4.65685 6 6 4.65685 6 3C6 1.34315 4.65685 0 3 0C1.34315 0 0 1.34315 0 3C0 4.65685 1.34315 6 3 6ZM12 6C13.6569 6 15 4.65685 15 3C15 1.34315 13.6569 0 12 0C10.3431 0 9 1.34315 9 3C9 4.65685 10.3431 6 12 6ZM24 3C24 4.65685 22.6569 6 21 6C19.3431 6 18 4.65685 18 3C18 1.34315 19.3431 0 21 0C22.6569 0 24 1.34315 24 3Z"
                              fill="#CDCCCA"/>
                    </svg>
                </div>`
    }

    static buildCategoryItem({id, name, color}) {
        return ` <div class="change-status__item">
                     <div class="change-status__item__content" data-target="${id}">
                         <div class="change-status__item-color" style="background: ${color}">
                         </div>
                         ${name}
                     </div>
                  </div>`
    }

    static buildModalStatus(categories, selectedId) {
        let items = categories.map(category => this.buildCategoryItem(category)).join('\n');

        let category;
        if(selectedId){
            category = CategoryType.getStatusById(selectedId.toString());
        }

        return ` <div class="modal__current-status --open-status-list" style="z-index: -1000">
                    <p class="--open-status-list" style="background: ${category.color || CategoryType.BACKLOG.color}; z-index: -1000">${category.name || CategoryType.BACKLOG.name}</p>
                    <div class="modal__change-status --open-status-list" style="z-index: -1000">
                       ${items}
                    </div>
                </div>
                <div class="modal__current-status-action --open-status-list" style="background: ${category.color || CategoryType.BACKLOG.color}; z-index: -1000">
                    >
                </div>`
    }

    static buildEditItemModal(categories, {
        id = null,
        category = CategoryType.BACKLOG,
        title = '',
        description = '',
        createdAt = new Date()
    }) {


        let modalCategory = this.buildModalStatus(categories, category.id)

        return `<div class="modal default">
        <div class="modal-header">
            <div class="modal__current-status-wrapper --open-status-list" style="z-index: 1000">
               ${modalCategory}
            </div>
            <button class="modal-close-btn" data-target="editItemModal"
               style="display: flex; align-items: center; justify-content: center;">
                <svg style="z-index: -5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-x"
                     viewBox="0 0 16 16">
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
            </button>
        </div>
        <div class="modal-body">
            <div class="modal-body-main">
                <form class="modal-body__form" id="editForm">

                    <input type="hidden" id="editItemId" name="id" ${id ? `value="${id}"` : ""}>

                    <div class="card-title-container">
                            <textarea  placeholder="Task title..." id="editTaskTitle" rows="1" aria-label="Edit task name"
                                      class="cdk-textarea-autosize card-title"
                                      style="text-indent: 0px; min-height: 34px; max-height: 170px; height: 34px;">${title || ""}</textarea>
                                    
                    </div>
                    <div class="card-description-container">
                            <textarea placeholder="Task description..." id="editTaskDescription" aria-label="Edit task description"
                                      class="cdk-textarea-autosize card-description">${description || ''}</textarea>
                                    
                            
                    </div>

                    <button type="button" id="editSaveButton" class="btn btn-success">Save</button>

                </form>
            </div>
            <div class="modal-body-secondary">
                <p class="text-muted">${createdAt && (title || description) ? `Created at: ${createdAt}` : 'New item incoming!'} </p>
            </div>
        </div>
    </div>`
    }
}


export {
    TemplateBuilder
};


