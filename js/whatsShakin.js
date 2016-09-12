(function() {
  'use strict';

  var $dropdown = $('#dropdown1');
  var liquorType;

  function generateDrink(event) {
    liquorType = event.target.id;
    var $xhr = $.getJSON(`http://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${liquorType}`);

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

      $moreXhr.done(function(data2) {
        if ($xhr.status !== 200) {
          return;
        }

        var recipe = data2.drinks[0].strInstructions;
        var $recipe = $('#strRecipe');

        $recipe.append(recipe);

        var ingredients = [];

        for (var i = 1; i <= 15; i++) {
          var ingredient = data2.drinks[0]['strIngredient' + i];
          var measurement = data2.drinks[0]['strMeasure' + i].trim();

          if (ingredient !== '') {
            let ingredientObj = {
              'ingredient': ingredient,
              'measurement': measurement
            };

            ingredients.push(ingredientObj);
          }

          var $ingredientTable = $('#ingredientTable');
        }
        for (var j = 0; j < ingredients.length; j++) {
          $ingredientTable.append('<tr><td>' +
            ingredients[j].ingredient + '</td><td>' +
            ingredients[j].measurement + '</td></tr>');
        }
      });

      $moreXhr.fail(function(err) {
        console.log(err);
      });
    });
    event.preventDefault();

    $('#ingredientTable > tbody').html('');
    $('#strRecipe').html('');
    $('#drinkName').html('');
  }

  $dropdown.on('click', generateDrink);
})();
