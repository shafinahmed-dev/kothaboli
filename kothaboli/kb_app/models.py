from django.db import models
from django.core.exceptions import ValidationError

# Create your models here.

def validate_not_empty(value):
    """
    Custom validator to ensure the field is not an empty string or just whitespace.
    """
    if not value or value.strip() == '':
        raise ValidationError('This field cannot be empty.')

class Post(models.Model):
    title = models.CharField(
        max_length=200, 
        validators=[validate_not_empty],
        error_messages={'required': 'Post title is required.'}
    )
    content = models.TextField(
        validators=[validate_not_empty],
        error_messages={'required': 'Post content is required.'}
    )
    user_name = models.CharField(max_length=50, default='Anonymous')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

    def clean(self):
        """
        Additional model-level validation.
        """
        # Validate that title and content are not just whitespace
        if not self.title or self.title.strip() == '':
            raise ValidationError({'title': 'Post title cannot be empty.'})
        
        if not self.content or self.content.strip() == '':
            raise ValidationError({'content': 'Post content cannot be empty.'})

class Comment(models.Model):
    post = models.ForeignKey(Post, related_name='comments', on_delete=models.CASCADE)
    content = models.TextField(
        validators=[validate_not_empty],
        error_messages={'required': 'Comment content is required.'}
    )
    user_name = models.CharField(max_length=50, default='Anonymous')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Comment by {self.user_name} on {self.post.title}"

    def clean(self):
        """
        Additional model-level validation for comments.
        """
        # Validate that content is not just whitespace
        if not self.content or self.content.strip() == '':
            raise ValidationError({'content': 'Comment content cannot be empty.'})