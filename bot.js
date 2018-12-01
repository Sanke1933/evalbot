//ВНИМАНИЕ!
//Код этого бота свободен для исползования (open-source)

const Discord = require('discord.js'); //Подключение пакета discord.js
const client = new Discord.Client(); //Создание клиента бота

const creator = '242975403512168449'; //Мой id
const prefix = '.' //Префикс

/** @namespace process.env.BOT_TOKEN */ //process.env

client.on('ready', () => { //Событие запуска клиента

    //Вывод информации о боте в консоль
    console.log(`Бот запущен.\nСервера: ${client.guilds.size}.`);

});

client.on('message', (message) => { //Событие отправки сообщения

    //Игнорирование типов каналов, ботов и других людей
    if(message.channel.type !== `text` || message.author.bot || message.author.id !== creator) return;

    //Константы args и command
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    //Команда eval
    if (command === 'js') {

        const code = args.join(" "); //Константа с ботом

        try {

            let output = eval(code); //Константа с эмуляцией кода
            
            if (output.length < 1950) message.author.send(`\`\`\`js\n${output}\n\`\`\``).then(() => {message.react("✅")}); //Отправка результатов симуляции
            
            else message.author.send(`${output}`, {split:"\n", code:"js"}); //Отправка результатов симуляции если их длина больше 1950-ти
        
        } 
        
        catch (error) { message.author.send(`Анхэндлэд промайз риджекшн ворнинг \`\`\`js\n${error}\`\`\``).then(() => message.react("❎")) }; //Отправка ошибки
        
    }


})

//Реистрация клиента
client.login(process.env.BOT_TOKEN); 
