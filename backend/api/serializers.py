from rest_framework import serializers
from .models import Product, History

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class HistorySerializer(serializers.ModelSerializer):
    product_name = serializers.StringRelatedField(source='product', read_only=True)
    category_id = serializers.IntegerField(source='product.category_id', read_only=True)
    product = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all())
    
    class Meta:
        model = History
        fields = '__all__'