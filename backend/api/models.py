from django.db import models
from django.contrib.auth.models import AbstractBaseUser , BaseUserManager

# Create your models here.

class UserManager(BaseUserManager):
    def create_user(self ,name, email, password=None):
        if not email:
            raise ValueError("User must have a email")

        email = self.normalize_email(email)
        email  = email.lower()
        user = self.model(
            email = self.normalize_email(email),
            name  = name,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self ,name, email, password):
        user = self.create_user(
            email = email,
            name  = name,
            password = password,
        )

        user.is_admin = True
        user.is_staff = True
        user.is_active = True
        user.is_verified = True
        user.is_superuser = True
        user.save(using=self._db)
        return user

class UserAccount(AbstractBaseUser):
    name = models.CharField(max_length = 50,blank=False)
    email  = models.EmailField(max_length = 100, unique = True,blank=False)
    image = models.ImageField(upload_to='profiles/', blank=True,null=True)
    date_joined = models.DateTimeField(auto_now_add = True)
    last_login = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    is_block = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=True)
    is_administrator = models.BooleanField(default=True)
    is_sc = models.BooleanField(default=False)
    is_cc = models.BooleanField(default=False)
    is_mentor = models.BooleanField(default=False)
    is_verified = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    objects = UserManager()
    def __str__(self):
        return self.email
    def has_perm(self, perm, obj=None):
      return self.is_admin
    
    def has_module_perms(self, app_label):
        return True
    
class Administrator(models.Model):
    user = models.OneToOneField(UserAccount, on_delete=models.CASCADE)
    company = models.CharField(max_length=150)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.user.name} - {self.company}'

class Batch(models.Model):
    user_id = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    batch_num = models.CharField(max_length=50)
    is_active = models.BooleanField(default=True)
    
    def __str__(self):
        return f'{self.batch_num} - {self.is_active}'
    
class Intern(models.Model):
    user = models.OneToOneField(UserAccount, on_delete=models.CASCADE)
    batch_id = models.ForeignKey(Batch,on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.user}-{self.batch_id}'