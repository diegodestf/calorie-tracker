const ItemCtrl = (() => {
    class Item {
        constructor(id, name, item) {
            this.id = id
            this.name = name
            this.item = item
        }
    }

    const data = {
        items: [
            {id: 0, name: 'Steak Dinner', calories: 1200},
            {id: 1, name: 'Chicken Thighs', calories: 600},
            {id: 2, name: 'Apple', calories: 150}
        ],
        currentItem: null,
        totalCalories: 0
    }

    return { 
        getItems: () => {
            return data.items
        },
        logData: () => {
            return data
        }
    }
})()

const UICtrl = (() => {
    const UISelectors = {
        itemList: '#item-list'
    }
    return {
        populateItemList: (items) => {
            let html = ''

            items.forEach(item => {
                html += `<li class="collection-item" id="item-${item.id}">
                <strong>${item.name}: <em>${item.calories} Calories</em></strong>
                <a href="#" class="secondary-content">
                    <i class="edit-item fa fa-pencil"></i>
                </a>
            </li>`
            });

            document.querySelector(UISelectors.itemList).innerHTML = html
        }
    }
})()

const AppCtrl = ((ItemCtrl, UICtrl) => {
    return {
        init: () => {
            const items = ItemCtrl.getItems()
            
            UICtrl.populateItemList(items)
        }
    }
})(ItemCtrl, UICtrl)

AppCtrl.init()