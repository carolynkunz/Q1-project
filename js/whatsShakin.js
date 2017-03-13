(function() {
  'use strict';

  const $dropdown1 = $('#dropdown1');
  const $dropdown2 = $('#dropdown2');

  let liquorType;

  function generateDrink(event) {
    liquorType = $(event.target).data('liquor');
    const $xhr = $.getJSON(`http://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${liquorType}`);

    $xhr.done(function(data) {
      if ($xhr.status !== 200) {
        return;
      }

      const drinkResults = data.drinks;
      const randomDrinkNumber = Math.floor((Math.random() * drinkResults.length));
      const randomDrink = data.drinks[randomDrinkNumber].strDrink;
      const randomDrinkId = data.drinks[randomDrinkNumber].idDrink;
      const $drinkName = $('#drinkName');

      $drinkName.append(randomDrink);

      $.getJSON('http://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + randomDrinkId).done(function(data2) {
        if ($xhr.status !== 200) {
          return;
        }

        const recipe = data2.drinks[0].strInstructions;
        const $recipe = $('#strRecipe');

        $recipe.append(recipe);

        const ingredients = [];

        for (let i = 1; i <= 15; i++) {
          const ingredient = data2.drinks[0]['strIngredient' + i];
          const measurement = data2.drinks[0]['strMeasure' + i].trim();

          if (ingredient !== '') {
            const ingredientObj = {
              'ingredient': ingredient,
              'measurement': measurement
            };

            ingredients.push(ingredientObj);
          }
        }
        const $ingredientTable = $('#ingredientTable > tbody');

        $ingredientTable.empty();

        for (let j = 0; j < ingredients.length; j++) {
          $ingredientTable.append('<tr><td>' +
            ingredients[j].ingredient + '</td><td>' +
            ingredients[j].measurement + '</td></tr>');
        }
      }).fail(function(err) {
        console.log(err);
      });
    });
    event.preventDefault();

    $('#ingredientTable > tbody').html('');
    $('#strRecipe').html('');
    $('#drinkName').html('');
  }

  $dropdown1.on('click', generateDrink);
  $dropdown2.on('click', generateDrink);

})();
