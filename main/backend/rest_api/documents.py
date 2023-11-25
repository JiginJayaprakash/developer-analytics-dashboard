from django_elasticsearch_dsl import (
    Document ,
    fields,
    Index,
)
from .models import Rest_Api
PUBLISHER_INDEX = Index('log_data')

PUBLISHER_INDEX.settings(
    number_of_shards=1,
    number_of_replicas=1
)




@PUBLISHER_INDEX.doc_type
class LogDataDocument(Document):

    class Django(object):
        model = Rest_Api