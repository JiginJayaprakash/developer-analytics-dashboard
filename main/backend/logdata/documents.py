from django_elasticsearch_dsl import (
    Document ,
    fields,
    Index
)
from .models import LogData

PUBLISHER_INDEX = Index('log_data')

PUBLISHER_INDEX.settings(
    number_of_shards=1,
    number_of_replicas=1
)

@PUBLISHER_INDEX.doc_type
class LogDataDocument(Document):
    id = fields.IntegerField(attr='id')
    user_id = fields.IntegerField()
    timestamp = fields.DateField()
    status = fields.BooleanField()
    error_message = fields.TextField()
    request = fields.TextField()
    response = fields.TextField()

    class Django(object):
        model = LogData