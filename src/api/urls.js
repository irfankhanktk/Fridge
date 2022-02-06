export default {
   base_url: 'http://192.168.43.47/Fridge_API/api',
   // 192.168.43.137 mobile ip
   //192.168.100.56 irfan ip
   signin: 'Auth/Signin',
   signup: 'Auth/Signup',
   users: 'Pair/GetUsers?id=',
   pair_user: 'Pair/PairUser',
   //get cateogries item by category id
   get_items_by_cat_id: 'items/getitems?category_id=',
   //update qty of items
   update_item: 'items/update_item',
   //search item
   search_item: 'items/SearchItem?text=',
   //search item
   ingradients: 'items/GetIngredients',
   //add new dish
   add_dish: 'Dishes/AddDish',
   //cookdish clear
   cook_dish: 'Dishes/CookDish?id=',
   //get notifications
   notifications: 'notifications/Getnotifications',
   //get counter
   notificationsCounter: 'notifications/GetNotificationsCounter',

}