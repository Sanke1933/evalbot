//ВНИМАНИЕ!
//Код этого бота свободен для исползования (open-source)

const Discord = require('discord.js'); //Подключение пакета discord.js
const client = new Discord.Client({disableEveryone : true}); //Создание клиента бота

const whitelist = ['242975403512168449', '406343162651738112', '401739659945967626', '421030089732653057']; //Вайтлист
const prefix = '!' //Префикс

/** @namespace process.env.BOT_TOKEN */ //Переменные среды

client.on('ready', () => { //Событие запуска клиента

    //Вывод информации о боте в консоль
    console.log(`Бот запущен.\nСервера: ${client.guilds.size}.`);
    //Бот будет показывать сколкьо памяти занимает его процесс
    setInterval(() => client.user.setActivity(`${Math.round(process.memoryUsage().rss / 1024 / 1024 )}/1024 МБ`, { type: 'PLAYING' }), 16000);

});

client.on('message', (message) => { //Событие отправки сообщения

    //Игнорирование типов каналов и ботов
    if(message.channel.type !== 'text' || message.author.bot || !message.content.startsWith(prefix)) return;

    //Константы args и command
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    
    if (message.content.match(/<@421030089732653057>/) && !whitelist.includes(message.author.id)) {
        message.reply('Ты чо сука Бога упоминаешь, не ахуел ли ты? А если я тебя тоже так?').then(() => {
            for (let i = 0; i < 5; i++) message.channel.send(`<@${message.author.id}>`);
        })
    }

    //Основная команда eval
    if ([/*'beval', */'eval', 'js'].includes(command)) {

        try {

            if (!whitelist.includes(message.author.id) && ['eval', 'js'].includes(command)) return message.reply('САСАТБ');
        
            const code = args.join(' '); //Константа с кодом

            let output //Переменная с эмуляцией кода

            if (['eval', 'js'].includes(command)) output = eval(code);
            //else output = client._eval(code);
            
            if (output.length < 1950) message.channel.send(output, {code : 'js'}).then(() => message.react("✅")); //Отправка результатов симуляции
            
            else message.channel.send(output, {split : '\n', code : 'js'}).then(() => message.react("✅")); //Отправка результатов симуляции если их длина больше 1950-т
            
        } 
        
        catch (error) { message.author.send(`Чот не робит: \`\`\`js\n${error}\`\`\``).then(() => message.react("❎")) }; //Отправка ошибки
        
    }

})

//Авторизация бота
client.login(process.env.BOT_TOKEN); 
//Защита от кражи через !beval
process.env.BOT_TOKEN = undefined
