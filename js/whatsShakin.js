(function() {
  'use strict';

  var $dropdown = $('#dropdown1');
  var liquorType;
  var ingredients;
  var drinkName;
  var $drinkIngredients = $('#drinkIngredients');

  function generateDrink(event){
    liquorType = event.target.id;
    var $xhr = $.getJSON(`http://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${liquorType}`);

 $('.scrollspy').scrollSpy();

    $xhr.done(function(data) {
      if ($xhr.status !== 200) {
        return;
      }

      var drinkResults = data.drinks;
      var randomDrinkNumber = Math.floor((Math.random() * drinkResults.length));
      var randomDrink = data.drinks[randomDrinkNumber].strDrink;
      var randomDrinkId = data.drinks[randomDrinkNumber].idDrink;
      var $drinkName = $('#drinkName');
      $drinkName.append(randomDrink);

      var $moreXhr = $.getJSON('http://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + randomDrinkId);

      $moreXhr.done(function(data2){
        if ($xhr.status !== 200) {
          return;
        }

      var drink = data2.drinks[0];
      var recipe = data2.drinks[0].strInstructions;

      var $recipe = $('#strRecipe');
      $recipe.append(recipe);

      var ingredients = [];
      for (var n = 1; n <= 15; n++) {

      var ingredient = data2.drinks[0]['strIngredient' + n];
      var measurement = data2.drinks[0]['strMeasure' + n].trim();

      if (ingredient !== '') {
        let ingredientObj = {
          'ingredient': ingredient,
          'measurement': measurement
          };
            ingredients.push(ingredientObj);
        }

      var $ingredientTable = $('#ingredientTable');
        }
        for (var i = 0; i < ingredients.length; i++) {
          $ingredientTable.append('<tr><td>' + ingredients[i].ingredient + '</td><td>' + ingredients[i].measurement + '</td></tr>');
        }
      })

      $moreXhr.fail(function(err) {
        console.log(err);
      });
    });
    event.preventDefault();

    $("#ingredientTable > tbody").html("");
    $("#strRecipe").html("");
    $("#drinkName").html("");
  }

  $dropdown.on('click', generateDrink);
})();
