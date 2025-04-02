# from django.db import models

# # Register function
# class User(models.Model):
#     ROLE_CHOICES = [
#         ('employee', 'Employee'),
#         ('company', 'Company'),
#     ]

#     name = models.CharField(max_length=100)
#     email = models.EmailField(unique=True)
#     password = models.CharField(max_length=255)  # Store hashed password
#     dob = models.DateField()
#     phone = models.CharField(max_length=15)
#     address = models.TextField()
#     security_question = models.TextField()
#     security_answer = models.TextField()
#     role = models.CharField(max_length=10, choices=ROLE_CHOICES)

#     def __str__(self):
#         return self.name

from django.db import models

class User(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)
    date_of_birth = models.DateField()
    phone_number = models.CharField(max_length=20)
    address = models.TextField()
    security_question = models.CharField(max_length=255)
    security_answer = models.CharField(max_length=255)
    role = models.CharField(max_length=10, choices=[('employee', 'Employee'), ('company', 'Company')])

    def __str__(self):
        return self.name
