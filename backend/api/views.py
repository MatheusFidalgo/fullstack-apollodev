from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Product, History
from .serializers import ProductSerializer, HistorySerializer
from rest_framework import status
from django.db.models import Q
from django.shortcuts import get_object_or_404
from datetime import date

@api_view(['GET', 'POST'])
def product_list(request):
    if request.method == 'GET':
        query = request.GET.get('search', '')
        if query:
            products = Product.objects.filter(
                Q(id__icontains=query) | Q(name__icontains=query)
            )
        else:
            products = Product.objects.all()
        
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    elif request.method == 'POST':
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'PATCH', 'DELETE'])
def product_detail(request, pk):
    product = get_object_or_404(Product, pk=pk)
    
    if request.method == 'GET':
        serializer = ProductSerializer(product)
        return Response(serializer.data)
    
    elif request.method == 'PUT' or request.method == 'PATCH':
        old_quantity = product.quantity
        old_price = product.price
        
        serializer = ProductSerializer(product, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            
            new_quantity = serializer.validated_data.get('quantity')
            new_price = serializer.validated_data.get('price')
            
            if (new_quantity is not None and new_quantity != old_quantity) or \
               (new_price is not None and new_price != old_price):
                
                try:
                    history_record = History.objects.get(product=product.id)
                    history_record.month = date.today().strftime("%B")
                    history_record.quantity = new_quantity if new_quantity is not None else old_quantity
                    history_record.save()

                except History.DoesNotExist:
                    history_data = {
                        'product': product.id,
                        'month': date.today().strftime("%B"),
                        'quantity': new_quantity if new_quantity is not None else old_quantity,
                    }
                    history_serializer = HistorySerializer(data=history_data)
                    if history_serializer.is_valid():
                        history_serializer.save()
            
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        product.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'POST'])
def history_list(request):
    if request.method == 'GET':
        query = request.GET.get('search', '')
        if query:
            histories = History.objects.filter(
                Q(month__icontains=query) |
                Q(product__id__icontains=query) |
                Q(quantity__icontains=query)
            )
        else:
            histories = History.objects.all()
            
        serializer = HistorySerializer(histories, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    elif request.method == 'POST':
        serializer = HistorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)