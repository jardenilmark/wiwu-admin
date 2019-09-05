import Board from 'react-trello'
import React, { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { getEmergencies } from '../../actions/emergency/getEmergencies.action'

const dummyData = {
  lanes: [
    {
      id: 'pending',
      title: 'Pending',
      droppable: false,
      label: '2/2',
      cards: [
        {
          id: 'Card1',
          title: 'Write Blog',
          description: 'Can AI make memes',
          label: '30 mins'
        },
        {
          id: 'Card2',
          title: 'Pay Rent',
          description: 'Transfer via NEFT',
          label: '5 mins'
        }
      ]
    },
    {
      id: 'completed',
      title: 'Completed',
      label: '0/1',
      cards: []
    }
  ]
}

const EmergencyList = () => {
  // STILL UNDER CONSTRUCTION
  const [boardData, setBoardData] = useState(dummyData)
  const dispatch = useDispatch()

  return (
    <Board
      data={boardData}
      onCardMoveAcrossLanes={(from, to, cardId, index) => {
        console.log(from, to, cardId, index)
        if (from === 'pending' && to === 'completed') {
        }
        console.log(boardData)
      }}
    />
  )
}

const styles = {}

export default EmergencyList
