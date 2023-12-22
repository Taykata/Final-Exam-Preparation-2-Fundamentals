function theImitationGame(input) {

    let text = input.shift();

    while (input.length != 1) {
        let commandAsString = input.shift();
        let commandData = commandAsString.split('|');
        let command = commandData[0];

        if (command === 'ChangeAll') {
            let substring = commandData[1];
            let replacement = commandData[2];

            while (text.includes(substring)) {
                text = text.replace(substring, replacement);
            }
        } else if (command === 'Insert') {
            let index = Number(commandData[1]);
            let value = commandData[2];

            let firstHalf = '';
            let secondHalf = '';

            for (let i = 0; i < text.length; i++) {
                if (i < index) {
                    firstHalf += text[i];
                } else {
                    secondHalf += text[i];
                }
            }
            text = firstHalf + value + secondHalf;
        } else if (command === 'Move') {
            let moves = Number(commandData[1]);
            let arr = text.split('');

            for (let i = 0; i < moves; i++) {
                let ch = arr.shift();
                arr.push(ch);
            }
            text = arr.join('');
        }
    }

    console.log(`The decrypted message is: ${text}`);

}

theImitationGame(['zzHe',
    'ChangeAll|z|l',
    'Insert|2|o',
    'Move|3',
    'Decode']);