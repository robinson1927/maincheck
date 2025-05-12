def custom_variable(request):
    
    context = {}

    if request.user.is_authenticated:
        
        user_group = request.user.groups.first()
        context.update({
            'user_group': user_group.name if user_group else None
        })
 
    return  context
