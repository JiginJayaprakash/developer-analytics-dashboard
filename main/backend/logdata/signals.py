# from django_elasticsearch_dsl.signals import RealTimeSignalProcessor
# # from django.db.models.signals import post_save, post_delete
# # from django.dispatch import receiver

# # from django_elasticsearch_dsl.registries import registry


# # @receiver(post_save)
# # def update_document(sender, **kwargs):
# #     """Update document on added/changed records.
# #     """
# #     app_label = sender._meta.app_label
# #     model_name = sender._meta.model_name
# #     instance = kwargs['instance']

# #     instances = instance.logdata.all()
# #     for _instance in instances:
# #         registry.update(_instance)

# class ElasticSignalProcessor: RealTimeSignalProcessor
#     def setup(self):
#         # super().setup