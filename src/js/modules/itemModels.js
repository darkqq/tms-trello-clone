import {CategoryType} from "./constants";

class TodoItem {
    constructor() {
        let date = new Date();
        this.id = date.getTime();
        this.createdAt = date;
        this.category = CategoryType.BACKLOG;
    }

    setTitle(title) {
        this.title = title;
        return this;
    }

    setDescription(description) {
        this.description = description;
        return this;
    }

    setImage(image) {
        this.image = image;
        return this;
    }

    setCategory(status) {
        this.category = status;
        return this;
    }
}

class TodoItemLogger {
    constructor() {
        this.logMap = new Map();
    }

    log(item, log) {
        if (!this.logMap.get(item.id)) {
            this.logMap.set(item.id, []);
        }
        this.logMap.get(item.id).push(new LogItem(log));
    }

    clearLogs(id) {
        this.logMap.delete(id);
    }

    getLogs(id) {
        return this.logMap.get(id);
    }

}

class LogItem {
    constructor(message) {
        this.date = new Date();
        this.message = message;
    }
}

class ItemActor {
    static INSTANCE;

    constructor(itemContainer) {
        this.itemContainer = itemContainer;
        this.logger = new TodoItemLogger();
        if (!ItemActor.INSTANCE) {
            ItemActor.INSTANCE = this;
        }
    }

    changeItemCategory(itemId, newCategoryId) {
        let item = this.itemContainer.findItem(itemId);

        this.removeItem(itemId);
        let oldCategory = item.category.name;

        item.category = CategoryType.getStatusById(newCategoryId);


        this.itemContainer.addItem(item);

        this.logger.log(item, `Changed status from ${oldCategory} to ${item.category.name}`);
    }

    changeItemTitle(itemId, newTitle) {
        let item = this.itemContainer.findItem(itemId);
        let oldTitle = item.title;
        item.title = newTitle;
        this.logger.log(item, `Changed title from ${oldTitle} to ${item.title}`);
    }

    changeItemDescription(itemId, newDescription) {
        let item = this.itemContainer.findItem(itemId);
        let oldDesc = item.description;
        if (oldDesc && oldDesc.length >= 30) {
            oldDesc = oldDesc.slice(0, 26) + '...';
        }
        item.description = newDescription;

        if (newDescription.length >= 30) {
            newDescription = newDescription.slice(0, 26) + '...';
        }

        this.logger.log(item, `Changed description from ${oldDesc || 'Empty'} to ${newDescription}`);
    }

    removeItem(id) {
        this.itemContainer.removeItem(id);
        this.logger.clearLogs(id);
    }

    addItem(item) {
        this.itemContainer.addItem(item);
    }
}

class TodoItemContainer {
    static INSTANCE; //cringe todo fix

    setItemMap(itemMap){
        this.itemMap = itemMap;
    }

    constructor(categories) {
        this.itemMap = new Map();

        if (categories) {
            [...categories].forEach(category => {
                this.itemMap.set(category.id, []);
            })
            TodoItemContainer.INSTANCE = this;
        }
    }

    clear() {
        this.itemMap = new Map();
    }


    removeItem(id) {

        let itemToRemove = this.findItem(id);

        let itemIndex = [...this.itemMap.get(itemToRemove.category.id)].indexOf(itemToRemove);
        if (itemIndex > -1) {
            this.itemMap.get(itemToRemove.category.id).splice(itemIndex, 1);
        }
    }

    addItem(item) {
        if (!this.itemMap.get(item.category.id)) {
            this.itemMap.set(item.category.id, []);
        }
        this.itemMap.get(item.category.id).push(item);
    }

    findItem(id) {
        for (const key of this.itemMap.keys()) {
            for (const item of this.itemMap.get(key)) {
                if (item.id.toString() === id.toString()) {
                    return item;
                }
            }
        }
    }

    getItemsMap() {
        return this.itemMap;
    }

    getItemsByCategoryId(categoryId) {
        return [...this.itemMap.get(categoryId)]
    }

    getCategories() {
        return [...this.itemMap.keys()];
    }

    getFilteredItems(searchCriteria) {

        if (!searchCriteria || searchCriteria.length === 0) {
            return this;
        }

        let resultSet = new Map();
        this.itemMap.forEach((value, key) => {
            let items = value.filter(item => item.title.toLowerCase().includes(searchCriteria.toLowerCase())
                || item.description.toLowerCase().includes(searchCriteria.toLowerCase()));
            if (items.length !== 0) {
                resultSet.set(key, items);
            }
        })

        let cringe = new TodoItemContainer();
        cringe.itemMap = resultSet;

        return cringe;
    }
}

export {TodoItem, TodoItemContainer, ItemActor};