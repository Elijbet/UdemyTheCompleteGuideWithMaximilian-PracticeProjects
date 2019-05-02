import React from 'react';
import classes from './Burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
	let transformedIngredients = Object.keys(props.ingredients)
		.map(igKey => {
			//[...Array(3)] will return an array with 3 empty elements
			return [...Array(props.ingredients[igKey])].map((_, i) => {
				return <BurgerIngredient key={igKey + i} type={igKey}/>;
			})
	})
	// transformedIngredients will be an array of empty arrays, making impossible to check for no ingredients. We need this to display "Please add ingredients". Reduce will flatten the array.
	.reduce((arr, el) => {
		return arr.concat(el)
	}, []);
	if (transformedIngredients.length === 0){
		transformedIngredients = <p>Please start adding ingredients!</p>
	}
	return(
		<div className={classes.Burger}>
			<BurgerIngredient type="bread-top"/>
				{transformedIngredients}
			<BurgerIngredient type="bread-bottom"/>
		</div>
	)
}

export default burger;