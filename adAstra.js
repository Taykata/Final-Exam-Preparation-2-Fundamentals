function adAstra([input]) {

    let pattern = /([#|])(?<itemName>[A-Za-z\s]+)\1(?<expirationDate>\d{2}\/\d{2}\/\d{2})\1(?<calories>\d+)\1/g;

    let match = pattern.exec(input);

    let totalCalories = 0;

    let itemName = '';
    let expirationDate = '';
    let calories = 0;

    let foodItems = [];

    while (match != null) {
        itemName = match.groups.itemName;
        expirationDate = match.groups.expirationDate;
        calories = Number(match.groups.calories);
        
        totalCalories += calories;

        foodItems.push({itemName, expirationDate, calories});

        match = pattern.exec(input);
    }

    let days = Math.floor(totalCalories / 2000);
    console.log(`You have food to last you for: ${days} days!`);

    for (let item of foodItems) {
        console.log(`Item: ${item.itemName}, Best before: ${item.expirationDate}, Nutrition: ${item.calories}`);
    }
}

adAstra(['#Bread#19/03/21#4000#|Invalid|03/03.20||Apples|08/10/20|200||Carrots|06/08/20|500||Not right|6.8.20|5|']);