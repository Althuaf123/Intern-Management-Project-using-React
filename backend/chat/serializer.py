from rest_framework import serializers
from .models import *
from api.models import *
from api.serializer import *

from rest_framework import serializers
from .models import ChatMessage

class ChatSerializer(serializers.ModelSerializer):
    sender = UserSerializer()

    class Meta:
        model = ChatMessage
        fields = ('sender', 'message' ,'time')
class MessageSerializer(serializers.ModelSerializer):
    sender = UserSerializer()

    class Meta:
        model = ChatMessage
        fields = ('id', 'room', 'sender', 'message', 'time')