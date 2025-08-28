from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Product, History
from .serializers import ProductSerializer, HistorySerializer
from rest_framework import status
from django.db.models import Q

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
    try:
        product = Product.objects.get(pk=pk)
    except Product.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ProductSerializer(product)
        return Response(serializer.data)
    
    elif request.method == 'PUT' or request.method == 'PATCH':
        serializer = ProductSerializer(product, data=request.data)
        if serializer.is_valid():
            serializer.save()
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
                Q(product_id__icontains=query) | 
                Q(month__icontains=query) |
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