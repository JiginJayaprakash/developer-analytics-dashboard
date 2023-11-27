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
    id = fields.IntegerField(attr='id')
    user_id = fields.IntegerField(
        fields={
            'raw':{
                'type': 'constant_keyword',
            }
            
        }
    )
    timestamp = fields.DateField(
        fields={
            'date': {
                'type': 'date',
                
            }
        },
    )
    class Django(object):
        model = Rest_Api