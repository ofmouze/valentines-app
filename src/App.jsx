import React, { useState } from 'react'
import Telegram from 'node-telegram-bot-api'
import heart from './heart.svg'
import './App.css'

function App() {
	document.addEventListener('DOMContentLoaded', function () {
		Telegram.WebApp.ready()()
	})

	// Когда страница готова к отображению:
	Telegram.WebApp.expand() // Раскрывает окно на всю высоту.

	const [isDarkMode, setIsDarkMode] = useState(false)
	const [headerText, setHeaderText] = useState('Ты меня любишь?')
	const [yesButtonText, setYesButtonText] = useState('ДА')
	const [showLightContainer, setShowLightContainer] = useState(false)
	const [isSubContainerVisible, setIsSubContainerVisible] = useState(true)
	const handleYesClick = () => {
		setIsSubContainerVisible(false)
		document.querySelector('.main-container').classList.add('light')

		setTimeout(() => {
			setShowLightContainer(true)
			// Запускаем сердечки после появления контейнера
			setTimeout(() => {
				startInfiniteHearts()
			}, 100)
		}, 500)
	}

	const handleNoClick = () => {
		const noBtn = document.getElementById('nobtn')
		const yesBtn = document.getElementById('yesbtn')

		yesBtn.classList.add('expanded')
		noBtn.classList.add('hidden')

		setHeaderText('В смысле нет???')
		setYesButtonText('Ой да =)')
		setIsDarkMode(!isDarkMode)
	}

	const createHeart = () => {
		const heartElement = document.createElement('img')
		heartElement.src = heart // используем импортированную переменную
		heartElement.className = 'big-heart mini-heart'

		const size = Math.random() * 70 + 20
		heartElement.style.width = `${size}px`
		heartElement.style.height = `${size}px`

		heartElement.style.left = Math.random() * 100 + '%'

		const duration = Math.random() + 3
		heartElement.style.animation = `fall ${duration}s linear`

		const mainContainer = document.querySelector('.main-container')
		mainContainer.insertBefore(heartElement, mainContainer.firstChild)

		heartElement.addEventListener('animationend', () => {
			heartElement.remove()
		})
	}

	const startInfiniteHearts = () => {
		const createHeartInterval = setInterval(() => {
			createHeart()
		}, 300)

		// Сохраняем ID интервала в атрибуте для возможности остановки
		document
			.querySelector('.main-container')
			.setAttribute('data-hearts-interval', createHeartInterval)
	}

	return (
		<div className={`main-container ${isDarkMode ? 'dark' : ''}`}>
			{!showLightContainer ? (
				<div
					className={`sub-container ${isSubContainerVisible ? '' : 'fade-out'}`}
				>
					<img
						className={`big-heart ${isDarkMode ? 'dark' : ''}`}
						src={heart}
						alt='Heart'
					/>

					<div className={`box-change ${isDarkMode ? 'dark' : ''}`}>
						<div className={`text-header ${isDarkMode ? 'dark' : ''}`}>
							<p className='fade-text'>{headerText}</p>
						</div>
						<div className='btns-box'>
							<button
								id='yesbtn'
								onClick={handleYesClick}
								className='yes-btn fade-btn'
							>
								{yesButtonText}
							</button>
							<button
								id='nobtn'
								onClick={handleNoClick}
								className='no-btn fade-btn'
							>
								НЕТ
							</button>
						</div>
					</div>
				</div>
			) : (
				<div className='light-container'>
					<div className='header-text'>
						<p>С днем</p>
						<p>Святого Валентина</p>
					</div>
					<div className='footer-text'>
						<p>Я люблю тебя ❤️</p>
						<p>Ты самое лучшее</p>
						<p>что у меня есть ❤️</p>
					</div>
				</div>
			)}
		</div>
	)
}

export default App
