const ItemCtrl = (() => {
    class Item {
        constructor(id, name, calories) {
            this.id = id
            this.name = name
            this.calories = calories
        }
    }

    const data = {
        items: [
            // {id: 0, name: 'Steak Dinner', calories: 1200},
            // {id: 1, name: 'Chicken Thighs', calories: 600},
            // {id: 2, name: 'Apple', calories: 150}
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
        },
        getTotalCalories: () => {
            let total = 0

            data.items.forEach(item => {
                total += item.calories
            })

            data.totalCalories = total

            return data.totalCalories
        },
        getItemById: (id) => {
            let found = null

            data.items.forEach(item => {
                if (item.id === id) {
                    found = item
                }
            })
            return found
        },
        setCurrentItem: (item) => {
            data.currentItem = item
        },
        getCurrentItem: () => {
            return data.currentItem
        },
        updateItem: (name, calories) => {
            calories = parseInt(calories)

            let found = null

            data.items.forEach(item => {
                if (item.id === data.currentItem.id) {
                    item.name = name
                    item.calories = calories
                    found = item
                }
            })
            return found
        },
        deleteItem: (id) => {

            const ids = data.items.map(item => {
                return item.id
            })

            const index = ids.indexOf(id)

            data.items.splice(index, 1)
        },
        clearAllItems: () => {
            data.items = []
        }
    }
})()

const UICtrl = (() => {
    const UISelectors = {
        itemList: '#item-list',
        listItems: '#item-list li',
        addBtn: '.add-btn',
        updateBtn: '.update-btn',
        deleteBtn: '.delete-btn',
        backBtn: '.back-btn',
        clearBtn: '.clear-btn',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories',
        totalCalories: '.total-calories'
    }
    return {
        populateItemList: (items) => {
            let html = ''

            items.forEach(item => {
                html += `<li class="collection-item" id="item-${item.id}">
                <strong>${item.name}:</strong> <em>${item.calories} Calories</em>
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
        },
        addListItem: (item) => {
            document.querySelector(UISelectors.itemList).style.display = 'block'

            const li = document.createElement('li')

            li.className = 'collection-item'

            li.id = `item-${item.id}`

            li.innerHTML = `<strong>${item.name}:</strong> <em>${item.calories} Calories</em>
            <a href="#" class="secondary-content">
                <i class="edit-item fa fa-pencil"></i>
            </a>`
            document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li)
        },
        clearInput: () => {
            document.querySelector(UISelectors.itemNameInput).value = ''
            document.querySelector(UISelectors.itemCaloriesInput).value = ''
        },
        hideList: () => {
            document.querySelector(UISelectors.itemList).style.display = 'none'
        },
        showTotalCalories: (totalCalories) => {
            document.querySelector(UISelectors.totalCalories).textContent = totalCalories
        },
        clearEditState: () => {
            UICtrl.clearInput()
            document.querySelector(UISelectors.updateBtn).style.display = 'none'
            document.querySelector(UISelectors.deleteBtn).style.display = 'none'
            document.querySelector(UISelectors.backBtn).style.display = 'none'
            document.querySelector(UISelectors.addBtn).style.display = 'inline'

        },
        addItemToForm: () => {
            document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name
            document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories
            UICtrl.showEditState()
        },
        showEditState: () => {
            document.querySelector(UISelectors.updateBtn).style.display = 'inline'
            document.querySelector(UISelectors.deleteBtn).style.display = 'inline'
            document.querySelector(UISelectors.backBtn).style.display = 'inline'
            document.querySelector(UISelectors.addBtn).style.display = 'none'
        },
        updateListItem: (item) => {
            let listItems = document.querySelectorAll(UISelectors.listItems)

            listItems = Array.from(listItems)

            listItems.forEach(listItem => {
                const itemID = listItem.getAttribute('id')

                if (itemID === `item-${item.id}`) {
                    document.querySelector(`#${itemID}`).innerHTML = `<strong>${item.name}:</strong> <em>${item.calories} Calories</em>
                    <a href="#" class="secondary-content">
                        <i class="edit-item fa fa-pencil"></i>
                    </a>`
                }
            })
        },
        deleteListItem: (id) => {
            const itemID = `#item-${id}`

            const item = document.querySelector(itemID)

            item.remove()
        },
        removeItems: () => {
            let listItems = document.querySelectorAll(UISelectors.listItems)

            listsItems = Array.from(listItems)

            listItems.forEach(item => {
                item.remove()
            })
        }
    }
})()

const AppCtrl = ((ItemCtrl, UICtrl) => {
    const loadEventListeners = () => {

        const UISelectors = UICtrl.getSelectors()

        document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit)

        document.addEventListener('keypress', (e) => {
            if (e.code === 13 || e.key === 'Enter') {
                e.preventDefault()
                return false
            }
        })

        document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick)

        document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit)

        document.querySelector(UISelectors.backBtn).addEventListener('click', UICtrl.clearEditState)

        document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit)

        document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItemsClick)
    }

    const clearAllItemsClick = () => {
        ItemCtrl.clearAllItems()

        const totalCalories = ItemCtrl.getTotalCalories()

        UICtrl.showTotalCalories(totalCalories)

        UICtrl.clearEditState()

        UICtrl.removeItems()

        UICtrl.hideList()
        
    }

    const itemDeleteSubmit = (e) => {
        const currentItem = ItemCtrl.getCurrentItem()

        ItemCtrl.deleteItem(currentItem.id)

        UICtrl.deleteListItem(currentItem.id)

        const totalCalories = ItemCtrl.getTotalCalories()

        UICtrl.showTotalCalories(totalCalories)

        UICtrl.clearEditState()

        e.preventDefault()
    }

    const itemUpdateSubmit = (e) => {
        const input = UICtrl.getItemInput()

        const updatedItem = ItemCtrl.updateItem(input.name, input.calories)

        UICtrl.updateListItem(updatedItem)

        const totalCalories = ItemCtrl.getTotalCalories()

        UICtrl.showTotalCalories(totalCalories)

        UICtrl.clearEditState()


        e.preventDefault()
    }

    const itemEditClick = (e) => {
        if (e.target.classList.contains('edit-item')) {
            const listId = e.target.parentNode.parentNode.id
            
            const listIdArr = listId.split('-')

            const id = parseInt(listIdArr[1])

            const itemToEdit = ItemCtrl.getItemById(id)

            ItemCtrl.setCurrentItem(itemToEdit)

            UICtrl.addItemToForm()
        }
        e.preventDefault()
    }

    const itemAddSubmit = (e) => {
        const input = UICtrl.getItemInput()

        if (input.name !== '' && input.calories !== '') {
            const newItem = ItemCtrl.addItem(input.name, input.calories)

            UICtrl.addListItem(newItem)

            const totalCalories = ItemCtrl.getTotalCalories()

            UICtrl.showTotalCalories(totalCalories)

            UICtrl.clearInput()
        }

        e.preventDefault()
    }
    return {
        init: () => {
            UICtrl.clearEditState()

            const items = ItemCtrl.getItems()

            if (items.length === 0) {
                UICtrl.hideList()
            } else {
                UICtrl.populateItemList(items)
            }

            const totalCalories = ItemCtrl.getTotalCalories()

            UICtrl.showTotalCalories(totalCalories)

            loadEventListeners()
        }
    }
})(ItemCtrl, UICtrl)

AppCtrl.init()