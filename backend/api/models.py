from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=255)
    category_id = models.IntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    
    def __str__(self):
        return self.name

class History(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    month = models.CharField(max_length=50)
    quantity = models.IntegerField()
    total_price = models.DecimalField(max_digits=10, decimal_places=2, blank=True)
    
    def save(self, *args, **kwargs):
        # Acessa o preço do produto e multiplica pela quantidade
        self.total_price = self.product.price * self.quantity
        super().save(*args, **kwargs) # Chama o método save original
    
    def __str__(self):
        return f"Histórico de {self.product.name} ({self.month})"