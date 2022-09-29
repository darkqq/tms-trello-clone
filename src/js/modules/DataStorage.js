class LocalStorageAdapter {


    static saveCategories(categories) {
        localStorage.setItem('categories', JSON.stringify(categories));
    }

    static getCategories() {
        return JSON.parse(localStorage.getItem('categories'));
    }

    static getCategoriesList() {
        let categoriesList = [];
        Object.getOwnPropertyNames(this.getCategories()).forEach(category => {
            categoriesList.push(this.getCategories()[category]);
        })
        return categoriesList;
    }

    static saveItems(items) {
        items.forEach((value, key) => {
            localStorage.setItem(key, JSON.stringify(value));
        })
    }

    static loadItems() {
        let itemMap = new Map();
        let categories = this.getCategories();
        [...Object.getOwnPropertyNames(categories)].forEach(category => {
            let item = JSON.parse(localStorage.getItem(categories[category].id));
            itemMap.set(categories[category].id, item);
        })

        console.log(itemMap);
        return itemMap;
    }

}

export {LocalStorageAdapter};