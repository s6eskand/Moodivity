from rest_framework import serializers
from ..models import UserLogs


class UserLogsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserLogs
        fields = '__all__'
