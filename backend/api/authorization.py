from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.crypto import constant_time_compare, salted_hmac
from django.utils.http import base36_to_int, int_to_base36
from django.utils import six
# from django.utils.six.moves import range
from django.conf import settings
from datetime import datetime, timedelta

class CustomToken(PasswordResetTokenGenerator):
    def _make_hash_value(self, user: AbstractBaseUser, timestamp):
        return six.text_type(user.id) + six.text_type(timestamp) + six.text_type(user.is_active)
    
    def make_token(self, user):
        timestamp = int(datetime.timestamp(datetime.now() + timedelta(hours=24)))
        hash_value = self._make_hash_value(user, timestamp)
        return self._make_token_with_timestamp(user, timestamp, hash_value)
    
    def check_token(self, user, token):
        if not (user and token):
            return False
        
        try:
            ts_b36, _ = token.split('-')
            timestamp = base36_to_int(ts_b36)
        except ValueError:
            return False

        if not constant_time_compare(self._make_token_with_timestamp(user, timestamp, self._make_hash_value(user, timestamp)), token):
            return False

        # Check if the token has not expired
        return datetime.now() <= datetime.fromtimestamp(timestamp)
        

