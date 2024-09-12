const { recoveryFile } = require("./recoveryFile");

// function loops on the products list if the list is not empty 

const loopProducts = async (products) =>{
    const newProducts =  await Promise.all(products.map(async (product) => {
        const newFile = await recoveryFile(product.nameFile);
        return { ...product.toObject(), file: newFile };
    }));
    
    return newProducts;
}

module.exports = {loopProducts};