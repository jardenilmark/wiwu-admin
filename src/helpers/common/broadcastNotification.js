import { sendNotification } from '../emergency-request/sendNotification'

import { message } from 'antd'

export const broadcastNotification = (notificationMessage, filters) => {
  const data = {
    app_id: process.env.REACT_APP_ONE_SIGNAL_API_KEY,
    contents: {
      en: notificationMessage
    },
    android_group: ['All']
  }

  if (filters) {
    data.filters = filters
  } else {
    data.included_segments = ['All']
  }
  console.log(data)
  sendNotification(data)

  message.success('Emergency was broadcast!', 2)
}
