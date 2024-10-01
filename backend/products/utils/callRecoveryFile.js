const { recoveryFile } = require("./recoveryFile");

// function loops on the products list if the list is not empty 

const loopProducts = async (products) =>{
    const newProducts =  await Promise.all(products.map(async (product) => {
        return  fileProduct(product)
    }));
    
    return newProducts;
}

const fileProduct = async (product)=>{
    const newFile = await recoveryFile(product.nameFile);
    return {...product.toObject(), file: newFile };
}
module.exports = {loopProducts, fileProduct};