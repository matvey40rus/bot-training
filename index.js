const TelegramApi = require('node-telegram-bot-api')

const token = '2115996776:AAE_iwoQzlBseIFXBQTK9liP5SzYVnuiqEk'

const bot = new TelegramApi(token, { polling: true })

const chats = {}

const gameOptions = {
	reply_markup: JSON.stringify({
		inline_keyboard: [
			[{ text: '1', callback_data: '1' }],
			[{ text: '2', callback_data: '2' }],
			[{ text: '3', callback_data: '3' }],
		]
	})
}

const start = () => {
	bot.setMyCommands([
		{ command: '/start', description: 'Начальное приветствие' },
		{ command: '/info', description: 'Окно информации' },
		{ command: '/game', description: 'Поиграем немного' },
	])

	bot.on('message', async msg => {
		const text = msg.text;
		const chatId = msg.chat.id;

		if (text === '/start') {
			await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/f80/4f2/f804f23c-2691-332d-92e2-78bff6b9d47e/4.webp')
			return bot.sendMessage(chatId, 'Приветствую Тебя, дорогой Друг!')
		}
		if (text === '/info') {
			return bot.sendMessage(chatId, 'Как тебя зовут?')
		}
		if (text === '/game') {
			await bot.sendMessage(chatId, 'Сейчас я загадаю цифру от 0 до 9, а ты попробуй её угадать!')
			const randomNumber = Math.floor(Math.random * 10)
			chats[chatId] = randomNumber;
			return bot.sendMessage(chatId, 'Отгадывай!', gameOptions)
		}
		return bot.sendMessage(chatId, 'Я тебя не понимаю, давай попробуем ещё раз!')
	})
	bot.on('callback_query', msg => {
		const data = msg.data;
		const chatId = msg.message.chat.id;

		bot.sendMessage(chatId, 'Ты выбрал цифру alert(data)')
		console.log(msg)
	})
}

start()