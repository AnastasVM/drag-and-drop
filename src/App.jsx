import React, { useState } from 'react'
import './App.css'

const App = () => {
	const [cardList, setCardList] = useState([
		{ id: 1, order: 3, text: 'КАРТОЧКА 3' },
		{ id: 2, order: 1, text: 'КАРТОЧКА 1' },
		{ id: 3, order: 2, text: 'КАРТОЧКА 2' },
		{ id: 4, order: 4, text: 'КАРТОЧКА 4' },
	])

	// нужно запоминать взятую/текущую карточку
	const [currentCard, setCurrentCard] = useState(null)

	function dragStartHandler(e, card) {
		// console.log('drag', card)
		setCurrentCard(card)
	}

	function dragEndHandler(e) {
		e.target.style.background = 'white'
	}

	function dragOverHandler(e) {
		e.preventDefault()
		e.target.style.background = 'lightgray'
	}
	function dropHandler(e, card) {
		e.preventDefault()
		// console.log('drop', card)
		// делаем сортировку массива карточек/меняем порядок объектов, чтобы все работало далее нужна сортировка по новому порядку карточек
		setCardList(
			cardList.map(c => {
				// если текущей элемент массива равен карточки в которую мы закидываем, то этой карточке (она находится снизу) будем присваивать порядок той карточки которую мы держим
				if (c.id === card.id) {
					return { ...c, order: currentCard.order }
				}
				// если id текущего элемента равен карточки которую мы держим, то у него порядок мы меняем на ту карточку, которая снизу
				if (c.id === currentCard.id) {
					return { ...c, order: card.order }
				}
				return c
			})
		)
		e.target.style.background = 'white'
	}
	// принимает два объекта - это как раз две наши карточки
	const sortCards = (a, b) => {
		if (a.order > b.order) {
			return 1
		} else {
			return -1
		}
	}

	return (
		<div className='app'>
			{cardList.sort(sortCards).map(card => (
				<div
					// слушатель срабатывает в момент, когда взяли карточку
					onDragStart={e => dragStartHandler(e, card)}
					// срабатывает, если мы вышли за пределы другой карточки
					onDragLeave={e => dragEndHandler(e)}
					// если отпустили перемещение
					onDragEnd={e => dragEndHandler(e)}
					// если мы находимся над каким-то другим объектом
					onDragOver={e => dragOverHandler(e)}
					// отпустили карточку и рассчитываем, что должно произойти какое-то связанное с этим действие
					onDrop={e => dropHandler(e, card)}
					// включаем перемещение карточек
					draggable={true}
					className='card'
				>
					{card.text}
				</div>
			))}
		</div>
	)
}

export default App
