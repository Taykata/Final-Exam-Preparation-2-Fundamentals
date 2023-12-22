function pirates(input) {

    let targetList = {};
    let command = input.shift();

    let cityName = '';
    let population = 0;
    let gold = 0;

    while (command != 'Sail') {
        [cityName, population, gold] = command.split('||');
        population = Number(population);
        gold = Number(gold);

        if (cityName in targetList) {
            targetList[cityName].population += population;
            targetList[cityName].gold += gold;
        } else {
            targetList[cityName] = {
                population: population,
                gold: gold
            }
        }
        command = input.shift();
    }

    command = input.shift();

    while (command != 'End') {
        let tokens = command.split('=>');
        let otherCommand = tokens[0];

        if (otherCommand === 'Plunder') {
            let town = tokens[1];
            let killedPeople = Number(tokens[2]);
            let stealedGold = Number(tokens[3]);

            targetList[town].population -= killedPeople;
            targetList[town].gold -= stealedGold;
            console.log(`${town} plundered! ${stealedGold} gold stolen, ${killedPeople} citizens killed.`);

            if (targetList[town].population <= 0 || targetList[town].gold <= 0) {
                delete targetList[town];
                console.log(`${town} has been wiped off the map!`);
            }
        } else if (otherCommand === 'Prosper') {
            let town = tokens[1];
            let addedGold = Number(tokens[2]);

            if (addedGold < 0) {
                console.log('Gold added cannot be a negative number!');
            } else {
                targetList[town].gold += addedGold;
                console.log(`${addedGold} gold added to the city treasury. ${town} now has ${targetList[town].gold} gold.`);
            }
        }

        command = input.shift();
    }

    let count = Object.keys(targetList).length;

    if (count != 0) {
        console.log(`Ahoy, Captain! There are ${count} wealthy settlements to go to:`);

        let entries = Object.entries(targetList);

        for (let [city, object] of entries) {
            console.log(`${city} -> Population: ${object.population} citizens, Gold: ${object.gold} kg`);
        }
    } else {
        console.log('Ahoy, Captain! All targets have been plundered and destroyed!');
    }

}

// pirates(["Tortuga||345000||1250",
//     "Santo Domingo||240000||630",
//     "Havana||410000||1100",
//     "Sail",
//     "Plunder=>Tortuga=>75000=>380",
//     "Prosper=>Santo Domingo=>180",
//     "End"]);

pirates(["Nassau||95000||1000",
    "San Juan||930000||1250",
    "Campeche||270000||690",
    "Port Royal||320000||1000",
    "Port Royal||100000||2000",
    "Sail",
    "Prosper=>Port Royal=>-200",
    "Plunder=>Nassau=>94000=>750",
    "Plunder=>Nassau=>1000=>150",
    "Plunder=>Campeche=>150000=>690",
    "End"]);