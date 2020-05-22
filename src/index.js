const promotions = ['SINGLE LOOK', 'DOUBLE LOOK', 'TRIPLE LOOK', 'FULL LOOK'];

const getShoppingCart = (ids, productsList) => {
	const selectedProducts = getSelectedProducts(ids, productsList);
	const promotion = getPromotion(selectedProducts);

	const result = selectedProducts.reduce((obj, product) => {
		const {name, category, regularPrice} = product;
		const formatedProduct = { name, category};
		const promotionValue = getPriceByPromotion(product, promotion);
		const productDiscountValue = regularPrice - promotionValue;
		
		obj.products.push(formatedProduct);
		obj.totalPrice += promotionValue;
		obj.discountValue += productDiscountValue;
		

		return obj;
	}, {
		products: [],
		promotion,
		totalPrice: 0,
		discountValue: 0,
	});

	result.discount = (result.discountValue * 100 / (result.totalPrice + result.discountValue)).toFixed(2) + "%";
	result.totalPrice = result.totalPrice.toFixed(2);
	result.discountValue = result.discountValue.toFixed(2);

	return result;
}

const getPriceByPromotion = (product, promotion) => {
	const { promotions, regularPrice } = product;

	const promotionFound = promotions.find(p => p.looks.includes(promotion));
	
	if (promotionFound) return promotionFound.price;

	return regularPrice;
}

const getPromotion = (selectedProducts) => {
	const selectedCategories = [];

	selectedProducts.forEach(product => {
		if(!selectedCategories.includes(product.category)) 
			selectedCategories.push(product.category);
	})

	const categoryIndex = selectedCategories.length - 1;

	return promotions[categoryIndex];
}

const getSelectedProducts = (ids, productsList) => {
	const selectedProducts = [];

	ids.forEach(id => {
		const product = productsList.find(p => p.id === id);

		selectedProducts.push(product);
	});

	return selectedProducts;
}

// Teste
const { products } = require('../src/data/products');
getShoppingCart([110, 120, 130, 140], products);
//getShoppingCart([120], products);

module.exports = { getShoppingCart };
