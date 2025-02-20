from sentry.api.serializers import Serializer, register
from sentry.users.models.userip import UserIP


@register(UserIP)
class UserIPSerializer(Serializer):
    def serialize(self, obj, attrs, user, **kwargs):
        return {
            "id": str(obj.id),
            "ipAddress": obj.ip_address,
            "countryCode": obj.country_code,
            "regionCode": obj.region_code,
            "lastSeen": obj.last_seen,
            "firstSeen": obj.first_seen,
        }
