import Pusher from 'pusher'
import ClientPusher from 'pusher-js'

export const serverPusher = new Pusher({
  appId: process.env.PUSHER_SERVER_ID!,
  key: 'df4cf62f3f844dd378d5',
  secret: process.env.PUSHER_SERVER_SECRET!,
  cluster: 'sa1',
  useTLS: true
})

export const clientPusher = new ClientPusher('df4cf62f3f844dd378d5', {
  cluster: 'sa1'
});
