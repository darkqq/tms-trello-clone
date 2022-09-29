const CategoryType = {
    BACKLOG: {
        id: 1,
        color: "#2E2E2E",
        name: "Backlog"
    },
    PENDING: {
        id: 2,
        color: '#04a9f4',
        name: "Pending"
    },
    IN_WORK: {
        id: 3,
        color: '#1bbc9c',
        name: 'In Work'
    },
    CLOSED: {
        id: 4,
        color: '#6bc950',
        name: 'Closed'
    },
    REVIEW: {
        id: 5,
        color: '#f9d900',
        name: 'Review'
    },

    getStatusById: function (statusId) {
        return this[Object.getOwnPropertyNames(this).find(item => this[item].id.toString() === statusId.toString())] || JSON.parse(JSON.stringify(this.BACKLOG));
    },

    values() {
        return Object.getOwnPropertyNames(JSON.parse(JSON.stringify(this))).map(e => this[e]);
    }
}

export {CategoryType};
