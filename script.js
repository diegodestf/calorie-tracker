const ItemCtrl = (function() {
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
        logData: function() {
            return data
        }
    }
})()

const UICtrl = (function() {
    console.log('itemcontroller')
})()

const AppCtrl = (function(ItemCtrl, UICtrl) {
    return {
        init: function() {
            console.log('Initializing app...')
        }
    }
})(ItemCtrl, UICtrl)

AppCtrl.init()