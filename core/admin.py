from django.contrib import admin
from .models import Account, Item, Classes, TimeStamp

admin.site.register(Account)
admin.site.register(Item)
admin.site.register(Classes)
admin.site.register(TimeStamp)
