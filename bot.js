//ВНИМАНИЕ!
//Код этого бота свободен для исползования (open-source)

const Discord = require('discord.js'); //Подключение пакета discord.js
const hastebinGen = require('hastebin-gen');
const client = new Discord.Client({disableEveryone : true}); //Создание клиента бота

const creators = ['242975403512168449', '406343162651738112']; //Мой id
const prefix = '!' //Префикс

/** @namespace process.env.BOT_TOKEN */ //process.env

client.on('ready', () => { //Событие запуска клиента

    //Вывод информации о боте в консоль
    console.log(`Бот запущен.\nСервера: ${client.guilds.size}.`);
    //Установка presence
    client.user.setActivity('Мега токсичное быдло',{ type: 3 });

});

client.on('message', (message) => { //Событие отправки сообщения

    //Игнорирование типов каналов, ботов и других людей
    if(message.channel.type !== `text` || !creators.includes(message.author.bot)) return;

    //Константы args и command
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    //Основная команда eval
    if (['fun', 'eval', 'js'].includes(command)) {
        
        if (command === 'fun') message.delete(); //Сообщение будет удаляться, если команда равна fun
        const code = args.join(' '); //Константа с кодом

        try {

            let output = eval(code); //Константа с эмуляцией кода
            
            if (output.length < 1950) message.channel.send(output, {code : 'js'}).then(() => message.react("✅")); //Отправка результатов симуляции
            
            else message.channel.send(output, {split : '\n', code : 'js'}).then(() => message.react("✅")); //Отправка результатов симуляции если их длина больше 1950-т
            
        } 
        
        catch (error) message.author.send(`Чот не робит: \`\`\`js\n${error}\`\`\``).then(() => message.react("❎")); //Отправка ошибки
        
    }


})

//Токен
client.login(process.env.BOT_TOKEN); 
