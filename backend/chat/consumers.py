import json
from channels.generic.websocket import AsyncWebsocketConsumer
from asgiref.sync import sync_to_async
from .models import ChatRoom, ChatMessage
from api.models import UserAccount
from .serializer import MessageSerializer
from django.core.exceptions import ObjectDoesNotExist



class ChatConsumer(AsyncWebsocketConsumer):
    print("sample")
    
    async def connect(self):
        print("hi")
        room_id = self.scope['url_route']['kwargs']['room_id']
        self.room_group_name = f'chat_{room_id}'

        exists = await sync_to_async(ChatRoom.objects.filter(id=room_id).exists)()

        if exists:
            self.room_name = room_id
            self.scope['room_id'] = room_id

            await self.channel_layer.group_add(
                self.room_group_name,
                self.channel_name
            )

            await self.accept()
        else:

            await self.close()
        
    async def disconnect(self, close_code):

        print("ROOM NAME")

        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )
    async def receive(self, text_data):
        print("RECEIVE")
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        sender_id = text_data_json['sender_id']

        sender = await sync_to_async(UserAccount.objects.get)(id=sender_id)

        room = await sync_to_async(ChatRoom.objects.get)(id=self.room_name)

        chat_message = await sync_to_async(ChatMessage.objects.create)(
            room=room,
            sender=sender,
            message=message
        )

        serializer = MessageSerializer(chat_message)


        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': serializer.data
            }
        )

    async def chat_message(self, event):
        message = event['message']

        await self.send(text_data=json.dumps({
            'message': message
        }))
