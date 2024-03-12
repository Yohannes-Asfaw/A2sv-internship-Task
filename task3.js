const store=[
    {itemname:"banana",price:20,quantity:10},
    {itemname:"bottleofwater",price:20,quantity:5},
    {itemname:"packedcoffee",price:20,quantity:3},
    {itemname:"bottleofmilk",price:20,quantity:30}
]
let cart=[]
function isPositve(value){
    return Number.isInteger(value) && value>0;
}
function addItemToCart(item,quantity){
    if (!isPositve(quantity)) {
        alert('Quantity must be a positive integer.');
        return;
      }
    
      const existingItemIndex = store.findIndex(i => i.name === item.name);
    
      if (existingItemIndex === -1) {
        alert(`Item '${item.itemname}' is not available.`);
        return;
      }
    
      if (store[existingItemIndex].quantity < quantity) {
        alert(`Not enough '${item.itemname}' in stock.`);
        return;
      }
    
      store[existingItemIndex].quantity -= quantity;
    
      const existingCartItemIndex = cart.findIndex(i => i.name === item.name);
      if (existingCartItemIndex !== -1) {
        cart[existingCartItemIndex].quantity += quantity;
      } else {
        const cartItem = { ...item, quantity };
        cart.push(cartItem);
      }
      alert(`Added ${quantity} ${item.itemname}(s) to the cart.`);
      updateCartDisplay();
}
function addItem(){
    const itemName=document.getElementById('itemName').value;
    const quantity=parseInt(document.getElementById('quantity').value,10);
    if(!itemName || isNaN(quantity) || quantity<=0){
        alert('Please enter a valid item name and quantitiy');
        return;
    }
    const item=store.find(item=>item.itemname===itemName);
    if (!item){
        alert(`Item ${itemName} is not available`);
        return;
    }
    addItemToCart(item,quantity);
    updateCartDisplay();
}
function removeItem() {
    const itemName = document.getElementById('removeItemName').value;
    const removeQuantity = parseInt(document.getElementById('removeQuantity').value, 10);
  
    if (!itemName || isNaN(removeQuantity) || removeQuantity <= 0) {
      alert('Please enter a valid item name and quantity to remove.');
      return;
    }
  
    removeItemFromCart(itemName, removeQuantity);
    updateCartDisplay();
  }
  
function updateItem(){
    const itemName=document.getElementById('updateItem').value;
    const newQuantity=parseInt(document.getElementById('newQuantity').value,10);
    if (!itemName || isNaN(newQuantity) || newQuantity<=0){
        alert('Please enter a valid item name and quantity');
        return;
    
    }
    updateItemsQuantityInTheCart(itemName,newQuantity);
    updateCartDisplay();
}
function removeItemFromCart(itemName,quantityTORemove ){
    const indexToRemove=cart.findIndex(item=>item.itemname===itemName)
    if (indexToRemove!==-1){
        const removedItem=cart[indexToRemove];
        if (quantityTORemove>=removedItem.quantity){
            cart.splice(indexToRemove,1)
        }
        else{
            cart[indexToRemove].quantity-=quantityTORemove; 
        }
        let storeItem=store.find(i=> i.itemname===itemName);
        if (storeItem){
            storeItem.quantity+=quantityTORemove;
        }
        else{
            store.push({...removedItem,quantity:quantityTORemove})
        }
        console.log(`Removed ${quantityTORemove} ${itemName} from the cart `)
        }
        else{
            alert(`Item ${itemName} is not in the cart .`)

        }

}
function updateItemsQuantityInTheCart(itemName,newQuantity){
    if(!isPositve(newQuantity)){
        console.log('Quantity must be a positive number');
        return;
    }
    const cartItem=cart.find(item=>item.itemname===itemName);
    if (cartItem){
        const availableQuantity=store.find(item=>item.itemname===itemName).quantity
        const quantityDifference=newQuantity-cartItem.quantity;
        if (availableQuantity<quantityDifference){
            console.log(`Not enought ${itemName} in stock.` );
            return;
        }
        cartItem.quantity=newQuantity;
        store.find(item=>item.itemname===itemName).quantity-=quantityDifference;
        console.log(`Updated ${itemName} quantity ot ${newQuantity}`);
    }else{
        alert(`Item ${itemName} is not in the cart`)
    }
}

function viewCart(){
    updateCartDisplay();
}
function calculateTotal(){
    let total=0
    cart.forEach(item=>{
        total+=item.price * item.quantity

    })
    console.log(`Total Price: $${total}`);
}
function updateCartDisplay(){
    const cartContents=document.getElementById('cartContents');
    cartContents.innerHTML='';
    cart.forEach(item=>{
        const itemDiv=document.createElement('div');
        itemDiv.textContent=`${item.itemname} - Quantity: ${item.quantity} - Price: $${item.price * item.quantity}`;
        cartContents.appendChild(itemDiv);
    });
    calculateTotal();
}
const banana = store.find(item => item.itemname === 'banana');
const  bottleofwater= store.find(item => item.itemname === 'bottleofwater');
const packedcoffee = store.find(item => item.itemname === 'packedcoffee');


// addItemToCart(banana, 2);
// addItemToCart(bottleofwater, 3);
// addItemToCart(packedcoffee, 2);
// addItemToCart({itemname: 'Hat', price: 15, quantity: 2}, 1); // Item not available
// addItemToCart(banana, 20); // Not enough in stock

// viewCart();
// calculateTotal();









