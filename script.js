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
        },
        addItem: (name, calories) => {
            let ID 
            if (data.items.length > 0) {
                ID = data.items[data.items.length - 1].id + 1
            } else {
                ID = 0
            }
            calories = parseInt(calories)

            newItem = new Item(ID, name, calories)

            data.items.push(newItem)

            return newItem
        }
    }
})()

const UICtrl = (() => {
    const UISelectors = {
        itemList: '#item-list',
        addBtn: '.add-btn',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories'
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
        },
        getSelectors: () => {
            return UISelectors
        },
        getItemInput: () => {
            return {
                name: document.querySelector(UISelectors.itemNameInput).value,
                calories: document.querySelector(UISelectors.itemCaloriesInput).value
            }
        }
    }
})()

const AppCtrl = ((ItemCtrl, UICtrl) => {
    const loadEventListeners = () => {
        const UISelectors = UICtrl.getSelectors()

        document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit)
    }

    const itemAddSubmit = (e) => {
        const input = UICtrl.getItemInput()

        if (input.name !== '' && input.calories !== '') {
            const newItem = ItemCtrl.addItem(input.name, input.calories)
        }

        e.preventDefault()
    }
    return {
        init: () => {
            const items = ItemCtrl.getItems()
            
            UICtrl.populateItemList(items)

            loadEventListeners()
        }
    }
})(ItemCtrl, UICtrl)

AppCtrl.init()